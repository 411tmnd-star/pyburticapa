#!/usr/bin/env python3
"""Test 3 regression (after http(s) video-card fix) validation driver. Reuses gemini_replay.py helpers and gemini_parse.py UNMODIFIED; writes only test3_regression_* files.

Requests made: GET <share URL>, then the single `ujx1Bf` batchexecute POST (same as Test 1). Nothing else.
Verification uses a browser capture (debug/test3_browser_rendered_text.txt, debug/test3_dom_turns.json) when present.
"""
import datetime, json, re, sys
from collections import Counter
from pathlib import Path
from urllib.parse import urlsplit

import requests

import gemini_parse as gp
import gemini_replay as gr

URL = sys.argv[1] if len(sys.argv) > 1 else "https://share.gemini.google/FVKTq1yB2ca7"
HERE = Path(__file__).resolve().parent
DEBUG, LOGS, OUT = HERE / "debug", HERE / "logs", HERE / "output"
RESP, META = DEBUG / "test3_regression_response.bin", DEBUG / "test3_regression_meta.json"
MD, RESULT = OUT / "test3_regression_conversation.md", LOGS / "test3_regression_validation_result.json"
for p in (RESP, META, MD, RESULT):
    if p.exists():
        sys.exit(f"refusing to overwrite existing {p}")

res = {"test": 3, "original_url": URL, "started_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
       "parser_modified": False, "errors": [], "warnings": []}

# ---------------- requests (same two as Test 1) ----------------
s = requests.Session()
s.headers.update({"User-Agent": gr.UA, "Accept-Language": "en-US,en;q=0.9"})
r1, n1 = gr.with_retries(lambda: s.get(URL, timeout=30, headers={"Accept": "text/html,application/xhtml+xml,*/*;q=0.8"}))
chain = [h.url for h in r1.history] + [r1.url]
res.update(step1_status=r1.status_code, redirect_chain=chain, final_url=r1.url, step1_attempts=n1)
m = re.fullmatch(r"/share/([A-Za-z0-9_-]+)", urlsplit(r1.url).path)
if not m:
    res["errors"].append("final URL is not /share/<id>")
    res["verification_result"] = "NOT_RUN"
    RESULT.write_text(json.dumps(res, indent=2), encoding="utf-8"); print(json.dumps(res, indent=2)); sys.exit(1)
share_id = m.group(1); res["share_id"] = share_id
bl, fsid = gr.wiz_value(r1.text, "cfb2h"), gr.wiz_value(r1.text, "FdrFJe")
res["page_parameters_found"] = {"bl": bl, "f.sid": bool(fsid)}
if not bl or not fsid:
    res["errors"].append("page parameters missing"); res["verification_result"] = "NOT_RUN"
    RESULT.write_text(json.dumps(res, indent=2), encoding="utf-8"); print(json.dumps(res, indent=2)); sys.exit(1)

params = {"rpcids": gr.RPC_ID, "source-path": f"/share/{share_id}", "bl": bl, "f.sid": fsid, "hl": "en-US", "rt": "c"}
freq = json.dumps([[[gr.RPC_ID, json.dumps([None, share_id, [4]], separators=(",", ":")), None, "generic"]]], separators=(",", ":"))
r2, n2 = gr.with_retries(lambda: s.post("https://gemini.google.com/_/BardChatUi/data/batchexecute", params=params,
                                        data={"f.req": freq}, timeout=60,
                                        headers={"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", "X-Same-Domain": "1",
                                                 "Referer": "https://gemini.google.com/", "Origin": "https://gemini.google.com", "Accept": "*/*"}))
resp = r2.content
RESP.write_bytes(resp)
res.update(http_status=r2.status_code, response_size_bytes=len(resp), response_content_type=r2.headers.get("Content-Type"),
           rpc_id=gr.RPC_ID, step2_attempts=n2, contains_wrb_fr=b"wrb.fr" in resp, starts_with_xssi=resp.startswith(b")]}'"))
META.write_text(json.dumps({"original_url": URL, "final_url": r1.url, "share_id": share_id, "status": r2.status_code,
                            "bytes": len(resp), "content_type": res["response_content_type"],
                            "query_sent": {k: ("<redacted>" if k == "f.sid" else v) for k, v in params.items()},
                            "form_f_req": freq, "cookies_stored_to_disk": False}, indent=2), encoding="utf-8")


def finish(code):
    res["finished_at"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
    LOGS.mkdir(exist_ok=True)
    RESULT.write_text(json.dumps(res, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(res, indent=2, ensure_ascii=False))
    sys.exit(code)


if r2.status_code != 200:
    res["errors"].append(f"ujx1Bf returned HTTP {r2.status_code}"); res["verification_result"] = "NOT_RUN"; finish(1)

# ---------------- parse (existing parser, unmodified) ----------------
try:
    chunks = gp.parse_batchexecute(resp)
    pl = gp.rpc_payloads(chunks, gr.RPC_ID)
    res["chunks"] = len(chunks); res["wrb_fr_payloads"] = len(pl)
    if len(pl) != 1:
        raise ValueError(f"expected 1 wrb.fr payload for {gr.RPC_ID}, found {len(pl)}")
    inner = pl[0]
    res["wrb_fr_parsed"] = True
    res["turn_records_in_payload"] = len(gp._get(inner, 0, 1))
except Exception as e:
    res["wrb_fr_parsed"] = False
    res["errors"].append(f"framing/payload failure: {type(e).__name__}: {e}")
    res["verification_result"] = "NOT_RUN"; res["parser_result"] = "FAILED_AT_FRAMING"; finish(1)

try:
    conv = gp.extract_conversation(inner)
    res["parser_result"] = "OK_UNMODIFIED"
except Exception as e:
    res["parser_result"] = "FAILED"
    res["errors"].append(f"extract_conversation: {type(e).__name__}: {e}")
    # diagnose per turn which accessor paths differ, without changing the parser
    diag = []
    for i, t in enumerate(gp._get(inner, 0, 1)):
        probe = {"user_text": ("t", 2, 0, 0), "gemini_text": ("t", 3, 0, 0, 1, 0), "ids": ("t", 0), "timestamp": ("t", 4)}
        row = {"turn": i}
        for name, path in probe.items():
            try:
                v = t
                for k in path[1:]: v = v[k]
                row[name] = f"{type(v).__name__}" + (f"({len(v)})" if isinstance(v, (str, list)) else "")
            except Exception as ex:
                row[name] = f"MISSING at index path {list(path[1:])}: {type(ex).__name__}"
        row["top_level_len"] = len(t); row["non_null_slots"] = [k for k, v in enumerate(t) if v is not None]
        diag.append(row)
    res["failure_diagnosis"] = diag
    res["verification_result"] = "NOT_RUN"; finish(1)

res["turn_count"] = len(conv["turns"])
res["title"] = conv["title"]; res["model"] = conv["model"]
if conv["share_id"] != share_id:
    res["warnings"].append(f"payload share_id {conv['share_id']} != URL share id {share_id}")

# ---------------- feature inventory ----------------
turns = conv["turns"]
alltext = "\n".join(t["user_text"] + "\n" + t["gemini_text"] for t in turns)
gem_all = "\n".join(t["gemini_text"] for t in turns)
usr_all = "\n".join(t["user_text"] for t in turns)
langs = Counter(re.findall(r"^```(\w*)", gem_all, re.M))
inv = {
    "turns": len(turns),
    "empty_user_turns": [t["index"] + 1 for t in turns if not t["user_text"].strip()],
    "empty_gemini_turns": [t["index"] + 1 for t in turns if not t["gemini_text"].strip()],
    "code_fence_markers_gemini": len(re.findall(r"^```", gem_all, re.M)),
    "code_fence_markers_user": len(re.findall(r"^```", usr_all, re.M)),
    "code_fence_languages": dict(langs),
    "inline_code_spans": len(re.findall(r"`[^`\n]+`", gem_all)),
    "table_rows_gemini": len(re.findall(r"^\|.*\|\s*$", gem_all, re.M)),
    "table_rows_user": len(re.findall(r"^\|.*\|\s*$", usr_all, re.M)),
    "markdown_links": len(re.findall(r"\[[^\]]+\]\([^)]+\)", alltext)),
    "bare_urls": len(re.findall(r"(?<!\()https?://[^\s)\]>*]+", alltext)),
    "headings": len(re.findall(r"^#{1,6} ", alltext, re.M)),
    "bullets": len(re.findall(r"^\s*[*-] ", alltext, re.M)),
    "numbered_items": len(re.findall(r"^\s*\d+\. ", alltext, re.M)),
    "blockquote_lines": len(re.findall(r"^>", alltext, re.M)),
    "math_latex_markers": len(re.findall(r"\$\$|\\\(|\\\[", alltext)),
    "cite_markers": len(re.findall(r"\[cite: ?[\d, ]+\]", alltext)),
    "images_or_attachments_user_side": sum(len(t["attachments"]) for t in turns),
    "attachment_mimes": dict(Counter(a["mime"] for t in turns for a in t["attachments"])),
    "video_cards": sum(len(t["cards"]) for t in turns),
    "chars_user": len(usr_all), "chars_gemini": len(gem_all),
    "largest_turn_chars": max(len(t["user_text"]) + len(t["gemini_text"]) for t in turns),
    "markdown_image_syntax": len(re.findall(r"!\[[^\]]*\]\([^)]+\)", alltext)),
    "googleusercontent_placeholders": len(re.findall(r"googleusercontent\.com/\w+_content/\d+", alltext)),
}
res["feature_inventory"] = inv

# ---------------- structural scan: payload strings the extractor does NOT use ----------------
norm = lambda x: re.sub(r"\s+", " ", re.sub(r"[*#`>_\-]", "", re.sub(r"\[cite: ?[\d, ]+\]", "", x))).lower().strip()
nused = norm(alltext + "\n" + "\n".join(c["title"] + " " + c["channel"] for t in turns for c in t["cards"]))
raw_turns = gp._get(inner, 0, 1)
leftover = Counter(); samples = {}
shape_sigs = Counter()
def walk(x, path):
    if isinstance(x, list):
        for i, v in enumerate(x): walk(v, path + (i,))
    elif isinstance(x, str) and len(x) >= 30 and x.count(" ") >= 3 and not x.startswith("http"):
        if norm(x) not in nused:
            key = "t[T]" + "".join(f"[{i}]" for i in path[1:8])
            leftover[key] += 1; samples.setdefault(key, x[:80])
for i, t in enumerate(raw_turns):
    walk(t, (i,))
    shape_sigs[(len(t), tuple(k for k, v in enumerate(t) if v is not None),
                tuple(k for k, v in enumerate(t[3][0][0]) if v is not None) if t[3] and t[3][0] and t[3][0][0] else None)] += 1
res["unextracted_prose_strings_in_payload"] = {k: {"count": n, "sample": samples[k]} for k, n in leftover.most_common(15)}
res["turn_shape_signatures"] = [{"turn_slots_non_null": list(sig[1]), "candidate_slots_non_null": list(sig[2]) if sig[2] else None, "turns": n}
                                for sig, n in shape_sigs.items()]

# ---------------- reconstruction (existing renderer, unmodified) ----------------
def split_fences(text):
    """Return (text outside fenced code, number of fenced blocks)."""
    out, inside, blocks = [], False, 0
    for line in text.split("\n"):
        if line.lstrip().startswith("```"):
            if not inside:
                blocks += 1
            inside = not inside
            continue
        if not inside:
            out.append(line)
    return "\n".join(out), blocks


def table_blocks(text):
    """Markdown tables outside code fences: consecutive pipe rows that include a separator row."""
    outside, _ = split_fences(text)
    tables, cur = [], []
    for line in outside.split("\n") + [""]:
        if re.match(r"^\s*\|.*\|\s*$", line):
            cur.append(line.strip())
        else:
            if len(cur) >= 2 and any(re.fullmatch(r"\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?", r) for r in cur):
                tables.append(cur)
            cur = []
    return tables


rendered_p, dom_p = DEBUG / "test3_browser_rendered_text.txt", DEBUG / "test3_dom_turns.json"
rendered = rendered_p.read_text(encoding="utf-8") if rendered_p.exists() else None
dom = json.loads(dom_p.read_text(encoding="utf-8")) if dom_p.exists() else None

md_unv = gp.render_markdown(conv, URL, "self_checked")
checks = {}


def check(name, cond, detail=""):
    checks[name] = {"pass": bool(cond), "detail": detail}


check("turn_count_matches_payload", len(turns) == res["turn_records_in_payload"], f"{len(turns)} vs {res['turn_records_in_payload']}")
split = gp.split_md_turns(md_unv)
check("markdown_blocks_recovered", len(split) == len(turns) and all(split), f"{len(split)} blocks")
check("role_order_user_then_gemini", [x.group(1) for x in re.finditer(r"^## (User|Gemini)$", md_unv, re.M)] == ["User", "Gemini"] * len(turns))
bad = [t["index"] + 1 for t, b in zip(turns, split) if b and ((t["user_text"].strip() and t["user_text"].rstrip() not in b[0]) or t["gemini_text"].rstrip() not in b[1])]
check("payload_text_verbatim_per_turn", not bad, f"mismatched turns: {bad}")
check("source_url_in_front_matter", f'source_url: {gp._yaml(URL)}' in md_unv.split("\n---\n", 1)[0] + "\n", URL)
check("share_id_matches", conv["share_id"] == share_id, f"{conv['share_id']} vs {share_id}")
fm, fb = len(re.findall(r"^```", alltext, re.M)), len(re.findall(r"^```", md_unv, re.M))
check("code_fences_preserved", fm == fb, f"{fm} fence lines in payload text, {fb} in Markdown")
bal = [t["index"] + 1 for t in turns if len(re.findall(r"^```", t["gemini_text"], re.M)) % 2]
check("code_fences_balanced_per_gemini_turn", not bal, f"unbalanced turns: {bal}")
check("table_rows_preserved", len(re.findall(r"^\|.*\|\s*$", alltext, re.M)) == len(re.findall(r"^\|.*\|\s*$", md_unv, re.M)))
urls_src = set(re.findall(r"https?://[^\s)\]>*]+", alltext)) | {c["url"] for t in turns for c in t["cards"]} | {a["url"] for t in turns for a in t["attachments"]}
check("urls_preserved", urls_src <= set(re.findall(r"https?://[^\s)\]>*]+", md_unv)), f"{len(urls_src)} URLs")
check("nonempty_gemini_in_every_turn", not inv["empty_gemini_turns"], f"empty Gemini turns: {inv['empty_gemini_turns']}")

# table integrity: structure, not just row counts
tabs = table_blocks(gem_all)
tab_detail = []
for tb in tabs:
    ncells = [len(r.strip().strip("|").split("|")) for r in tb]
    tab_detail.append({"rows": len(tb), "cells_per_row": sorted(set(ncells)), "header": tb[0][:100]})
res["tables_outside_code"] = tab_detail
res["pipe_rows_inside_code_fences"] = len(re.findall(r"^\s*\|.*\|\s*$", gem_all, re.M)) - sum(len(t) for t in tabs)
check("tables_well_formed", all(len(d["cells_per_row"]) == 1 for d in tab_detail), f"{len(tabs)} table(s): {tab_detail}")
check("tables_identical_in_markdown", tabs == table_blocks(md_unv), f"{len(tabs)} table(s) in payload text vs {len(table_blocks(md_unv))} in Markdown")

# observed, unclassified payload feature: reasoning summaries (recorded only, never rendered)
thoughts = 0
thought_turns = []
for i, t in enumerate(gp._get(inner, 0, 1)):
    items = []
    try:
        items = [x for x in t[3][0][0][37][1] if isinstance(x, list) and len(x) > 6 and (x[5] or x[6])]
    except Exception:
        pass
    thoughts += len(items)
    if items:
        thought_turns.append(i + 1)
res["observed_unclassified_payload_features"] = {
    "reasoning_summary_items_at_turn[3][0][0][37][1]": thoughts, "turns_with_them": thought_turns,
    "treatment": "recorded only; NOT added to Markdown"}

res["verification_checks"] = checks
core_ok = all(v["pass"] for k, v in checks.items() if k != "nonempty_gemini_in_every_turn")

# browser verification: existing verifier (unmodified) + DOM ground truth
browser = {"available": rendered is not None}
if rendered:
    try:
        v = gp.verify(conv, md_unv, rendered, URL, expected_turns=res["turn_records_in_payload"])
        browser.update(verified=v["verified"], checks=v["checks"], warnings=v["warnings"],
                       rendered_reference_characters=v["rendered_reference_characters"])
    except Exception as e:
        browser.update(verified=False, error=f"{type(e).__name__}: {e}")
    rtok = set(re.findall(r"[a-z0-9']{2,}", rendered.lower()))
    cells = [c.strip() for tb in tabs for r in tb if not re.fullmatch(r"\|?\s*:?-{3,}[\s|:-]*", r) for c in r.strip().strip("|").split("|")]
    miss = [c for c in cells if not all(w in rtok for w in re.findall(r"[a-z0-9']{2,}", re.sub(r"[*_`]", "", c).lower()))]
    browser["table_cells_checked"] = len(cells)
    browser["table_cells_missing_in_render"] = miss[:10]
if dom:
    dtabs = sum(t["tables"] for t in dom["turns"])
    drows = sum(t["table_rows"] for t in dom["turns"])
    dcode = sum(t["code_block_elems"] for t in dom["turns"])
    dimg = sum(1 for t in dom["turns"] for i in t["imgs"] if "Uploaded image preview" in i)
    demb = sum(len(t["iframes"]) for t in dom["turns"])
    dvids = sorted({re.search(r"embed/([\w-]{6,})", f).group(1) for t in dom["turns"] for f in t["iframes"] if "embed/" in f})
    browser["dom_comparison"] = {
        "dom_turn_viewers": dom["turn_viewers"], "payload_turns": len(turns),
        "dom_tables": dtabs, "dom_table_rows_tr": drows, "payload_tables_outside_code": len(tabs),
        "payload_table_rows_outside_code": sum(len(t) for t in tabs),
        "dom_code_blocks": dcode, "payload_fenced_blocks": fm // 2,
        "dom_uploaded_image_previews": dimg, "payload_user_attachments": inv["images_or_attachments_user_side"],
        "dom_youtube_embeds": demb, "dom_distinct_youtube_videos": dvids, "extractor_video_cards": inv["video_cards"],
        "user_chars_dom_vs_payload_by_turn": [(t["turn"], t["user_chars"], len(turns[t["turn"] - 1]["user_text"]))
                                               for t in dom["turns"] if t["turn"] <= len(turns)]}
    browser["dom_checks"] = {
        "turn_count": dom["turn_viewers"] == len(turns),
        "tables": dtabs == len(tabs),
        "code_blocks": dcode == fm // 2,
        "user_images": dimg == inv["images_or_attachments_user_side"],
        "all_youtube_videos_extracted_as_cards": len(dvids) <= inv["video_cards"]}
res["browser_verification"] = browser

gating = {k: v for k, v in browser.get("dom_checks", {}).items() if k != "all_youtube_videos_extracted_as_cards"}
browser_ok = bool(browser.get("verified")) and bool(gating) and all(gating.values())
if core_ok and browser_ok:
    res["verification_result"] = "VERIFIED_AGAINST_BROWSER"
elif core_ok:
    res["verification_result"] = "SELF_CONSISTENT_WITH_PAYLOAD"
else:
    res["verification_result"] = "FAILED"
res["extracted_character_count"] = inv["chars_user"] + inv["chars_gemini"]
res["extraction_gaps"] = []
if browser.get("dom_checks") and not browser["dom_checks"]["all_youtube_videos_extracted_as_cards"]:
    res["extraction_gaps"].append(
        f"video embeds: browser shows {len(dvids)} distinct YouTube videos in {demb} embeds; "
        f"extractor produced {inv['video_cards']} video card(s) (video links may still survive inside the Gemini text)")
if core_ok:
    OUT.mkdir(exist_ok=True)
    final = gp.render_markdown(conv, URL, "verified" if res["verification_result"] == "VERIFIED_AGAINST_BROWSER" else "self_checked")
    MD.write_text(final, encoding="utf-8")
    res["output_file"] = str(MD)
else:
    (DEBUG / "test3_regression_unverified.md").write_text(md_unv, encoding="utf-8")
    res["output_file"] = None
    res["warnings"].append("self-checks failed; Markdown saved to debug/, not output/")
finish(0 if core_ok else 1)
