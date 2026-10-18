import difflib, hashlib, json, re, sys, datetime
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")
HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
sys.path.insert(0, str(ROOT))
import gemini_parse as gp

URL = "https://share.gemini.google/FVKTq1yB2ca7"
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()
reg = json.loads((ROOT / "logs" / "test3_regression_validation_result.json").read_text(encoding="utf-8"))
base = json.loads((ROOT / "logs" / "test3_gemini_validation_result.json").read_text(encoding="utf-8"))
baseline_hashes = json.loads((ROOT / "logs" / "parser_fix_baseline.json").read_text(encoding="utf-8"))["files"]

inner_new = gp.rpc_payloads(gp.parse_batchexecute((HERE / "test3_regression_response.bin").read_bytes()), "ujx1Bf")[0]
inner_old = gp.rpc_payloads(gp.parse_batchexecute((HERE / "test3_gemini_response.bin").read_bytes()), "ujx1Bf")[0]
conv = gp.extract_conversation(inner_new)
md_new = (ROOT / "output" / "test3_regression_conversation.md").read_text(encoding="utf-8")
md_old = (ROOT / "output" / "test3_gemini_conversation.md").read_text(encoding="utf-8")
rendered = (HERE / "test3_browser_rendered_text.txt").read_text(encoding="utf-8")

# ---------- video cards ----------
cards = [(t["index"] + 1, c) for t in conv["turns"] for c in t["cards"]]
distinct = sorted({c["url"] for _, c in cards})
video_rows = [{"turn": n, "title": c["title"], "channel": c["channel"], "views": c["views"], "duration": c["duration"],
               "published": c["published"], "url": c["url"]} for n, c in cards]
caption_pairs = [("Victoria and Albert Museum", "188K views"), ("Film First", "4K views"), ("Blender Base Camp", "6.9K views")]
captions = []
for chan, views in caption_pairs:
    in_render = any(chan in l and views in l for l in rendered.split("\n"))
    in_md = any(chan in l for l in md_new.split("\n") if "Embedded video card" in l)
    captions.append({"rendered_caption": f"{chan} · {views}", "in_render": in_render, "channel_in_markdown_card": in_md})

# ---------- diff vs baseline Markdown (only authorized change should appear) ----------
a, b = md_old.splitlines(), md_new.splitlines()
changes = [l for l in difflib.unified_diff(a, b, lineterm="", n=0) if l[:1] in "+-" and l[:3] not in ("+++", "---")]
added = [l[1:] for l in changes if l[0] == "+"]
removed = [l[1:] for l in changes if l[0] == "-"]

# ---------- payload equality ----------
payload_same = json.dumps(inner_old) == json.dumps(inner_new)

# ---------- coverage: strict (existing verifier, raw render) and adjusted (UI chip lines removed from reference) ----------
strict = gp.verify(conv, md_new, rendered, URL, expected_turns=len(conv["turns"]))
cov_strict = strict["checks"]["rendered_text_covered_by_markdown"]
chip_re = re.compile(r"^(JPG|PDF|PNG|\+ \d+)$")
kept, dropped = [], []
for ln in rendered.split("\n"):
    (dropped if chip_re.match(ln.strip()) else kept).append(ln)
adjusted_ref = "\n".join(kept)
(HERE / "test3_browser_rendered_text_nochips.txt").write_text(adjusted_ref, encoding="utf-8")
adj = gp.verify(conv, md_new, adjusted_ref, URL, expected_turns=len(conv["turns"]))

# residual missing tokens under the strict reference
tok = lambda s: re.findall(r"[a-z0-9']{3,}", s.lower())
body = rendered[rendered.index("You said "):rendered.index("\nSign in\n\nGemini may display")]
body = "\n".join(l for l in body.split("\n") if not l.startswith("You said "))
mdtok = set(tok(re.sub(r"\[cite: ?[\d, ]+\]", "", md_new)))
missing = [w for w in tok(body) if w not in mdtok]
from collections import Counter
resid = Counter(missing)

# ---------- reasoning summaries still excluded ----------
th = []
for t in inner_new[0][1]:
    for it in (t[3][0][0][37][1] if t[3][0][0][37] else []):
        if isinstance(it, list) and len(it) > 6:
            th += [x for x in (it[5], it[6]) if isinstance(x, str) and len(x) > 25]
leaked = sum(1 for s in th if s in md_new)

rb = reg["browser_verification"]
result = {
    "test": "3-regression", "recorded_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    "source_url": URL, "final_url": reg["final_url"], "share_id": reg["share_id"], "http_status_page": reg["step1_status"],
    "http_status_ujx1Bf": reg["http_status"], "response_size_bytes": reg["response_size_bytes"], "wrb_fr_parsed": reg["wrb_fr_parsed"],
    "turn_count": reg["turn_count"], "parser_result": reg["parser_result"],
    "payload_identical_to_baseline_test3": payload_same,
    "video_cards": {"extracted": len(cards), "baseline_extracted": 1, "distinct_videos": len(distinct), "dom_embeds": 4, "dom_distinct_videos": 3, "cards": video_rows, "caption_check": captions},
    "markdown_diff_vs_baseline": {"lines_added": added, "lines_removed": removed},
    "coverage_existing_verifier_raw_render": cov_strict,
    "coverage_with_ui_chip_lines_removed_from_reference": {"result": adj["checks"]["rendered_text_covered_by_markdown"], "chip_lines_removed": len(dropped),
                                                          "removed_line_values": dict(Counter(l.strip() for l in dropped)),
                                                          "existing_verifier_overall_verified": adj["verified"]},
    "existing_verifier_overall_verified_raw_render": strict["verified"],
    "residual_missing_tokens_raw_render": dict(resid),
    "driver_self_checks_all_pass": all(v["pass"] for v in reg["verification_checks"].values()),
    "dom_checks": rb.get("dom_checks"),
    "tables": reg["tables_outside_code"], "code_fence_lines": reg["feature_inventory"]["code_fence_markers_gemini"],
    "user_attachments": reg["feature_inventory"]["images_or_attachments_user_side"],
    "reasoning_summaries": {"items": reg["observed_unclassified_payload_features"]["reasoning_summary_items_at_turn[3][0][0][37][1]"], "strings_found_in_markdown": leaked, "excluded": leaked == 0},
    "verification_result_driver": reg["verification_result"],
    "output_file": reg["output_file"],
    "original_test3_evidence_unchanged": {k: sha(ROOT / baseline_hashes[k]["path"]) == baseline_hashes[k]["sha256"]
                                          for k in ("test3_output_baseline", "test3_result_baseline", "test3_response", "test3_browser_text", "test3_dom_turns")},
}
(ROOT / "logs" / "test3_regression_result.json").write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")

print("payload identical to baseline Test 3 payload:", payload_same)
print(f"page {reg['step1_status']} | ujx1Bf {reg['http_status']} | {reg['response_size_bytes']} bytes | share {reg['share_id']} | wrb.fr {reg['wrb_fr_parsed']} | turns {reg['turn_count']} | parser {reg['parser_result']}")
print(f"video cards: {len(cards)} extracted (baseline 1) | distinct videos {len(distinct)} (DOM 3 distinct, 4 embeds)")
for r in video_rows: print(f"   turn {r['turn']}: {r['title'][:55]!r} | {r['channel']} | {r['views']} views | {r['url']}")
print("captions:", captions)
print("\nMarkdown diff vs baseline Test 3 output: +%d / -%d lines" % (len(added), len(removed)))
for l in added: print("  +", l[:170])
for l in removed: print("  -", l[:170])
print("\nexisting verifier, raw render: ", cov_strict["pass"], cov_strict["detail"][:160])
print("existing verifier, overall verified:", strict["verified"], "| failing:", [k for k, v in strict["checks"].items() if not v["pass"]])
print("with chip lines removed:       ", adj["checks"]["rendered_text_covered_by_markdown"]["pass"], adj["checks"]["rendered_text_covered_by_markdown"]["detail"][:160], "| removed", dict(Counter(l.strip() for l in dropped)))
print("overall verified (adjusted ref):", adj["verified"], "| failing:", [k for k, v in adj["checks"].items() if not v["pass"]])
print("residual missing tokens (raw render):", dict(resid))
print("driver self-checks all pass:", result["driver_self_checks_all_pass"], "| dom checks:", rb.get("dom_checks"), "| driver verdict:", reg["verification_result"])
print("reasoning summaries: strings", len(th), "found in Markdown:", leaked)
print("original Test 3 evidence unchanged:", result["original_test3_evidence_unchanged"])
