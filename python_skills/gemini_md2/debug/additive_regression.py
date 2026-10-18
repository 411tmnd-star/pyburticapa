import difflib, hashlib, importlib.util, json, re, sys, datetime
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")
HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
sys.path.insert(0, str(ROOT))
import gemini_parse as new

spec = importlib.util.spec_from_file_location("gp_old", HERE / "backup" / "gemini_parse_before_additive_changes.py")
old = importlib.util.module_from_spec(spec); spec.loader.exec_module(old)

TESTS = [
    ("Test 1", "debug/python_replay_response.bin", "https://share.gemini.google/HYSCokmDqznN", "verified", "output/prototype_gemini_conversation.md"),
    ("Test 2", "debug/test2_response.bin", "https://share.gemini.google/ruuLsONveleq", "self_checked", "output/test2_gemini_conversation.md"),
    ("Test 3", "debug/test3_regression_response.bin", "https://share.gemini.google/FVKTq1yB2ca7", "self_checked", "output/test3_regression_conversation.md"),
    ("Test 4", "debug/test4_response.bin", "https://share.gemini.google/DVoVO95EK1Nx", "verified", "output/test4_conversation.md"),
]
outdir = ROOT / "output" / "regression"
outdir.mkdir(exist_ok=True)
URL_RE = re.compile(r"https?://[^\s)\]>*]+")
res = {"recorded_at": datetime.datetime.now(datetime.timezone.utc).isoformat(), "tests": {}}


def classify(line):
    s = line
    if s.startswith("> **Attachment:** `") and not re.search(r"`\s+\(", s) and "http" not in s:
        return "name_only_attachment"
    if s.startswith("> **Action card:**") or s.startswith("> **Actions:**"):
        return "action_card"
    return None


for name, resp, url, status, existing in TESTS:
    inner = new.rpc_payloads(new.parse_batchexecute((ROOT / resp).read_bytes()), "ujx1Bf")[0]
    co, cn = old.extract_conversation(inner), new.extract_conversation(inner)
    mo, mn = old.render_markdown(co, url, status), new.render_markdown(cn, url, status)
    (outdir / f"{name.lower().replace(' ', '')}_additive_regression.md").write_text(mn, encoding="utf-8")
    a, b = mo.splitlines(), mn.splitlines()
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    added, removed = [], []
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op in ("replace", "delete"): removed += a[i1:i2]
        if op in ("replace", "insert"): added += b[j1:j2]
    # classify added lines: blockquote lines belonging to the two authorized representations, plus the description line directly after "Action card:"
    cls_added, other_added = [], []
    prev = None
    for l in added:
        c = classify(l)
        if c is None and prev == "action_card" and l.startswith("> ") and not l.startswith("> **"):
            c = "action_card"            # the card description line
        if c is None and l.strip() == "":
            c = "blank"
        (cls_added if c else other_added).append((c, l))
        prev = c if c != "blank" else prev
    removed_nonblank = [l for l in removed if l.strip()]
    t = {"turns_old": len(co["turns"]), "turns_new": len(cn["turns"]),
         "added_by_class": {k: sum(1 for c, _ in cls_added if c == k) for k in ("name_only_attachment", "action_card", "blank")},
         "added_other": [l[:140] for _, l in other_added], "removed_lines": [l[:140] for l in removed_nonblank]}
    # semantic identity
    same = lambda f: all(f(x) == f(y) for x, y in zip(co["turns"], cn["turns"]))
    t["identical"] = {
        "user_text": same(lambda x: x["user_text"]), "gemini_text": same(lambda x: x["gemini_text"]),
        "url_attachments": same(lambda x: x["attachments"]), "video_cards": same(lambda x: x["cards"]),
        "response_ids_and_order": same(lambda x: (x["index"], x["response_id"], x["conversation_id"], x["timestamp_utc"])),
        "metadata": all(co[k] == cn[k] for k in ("title", "model", "share_id", "published_utc"))}
    t["urls_lost"] = sorted(set(URL_RE.findall(mo)) - set(URL_RE.findall(mn)))
    t["code_fence_lines"] = (len(re.findall(r"^```", mo, re.M)), len(re.findall(r"^```", mn, re.M)))
    t["table_rows"] = (len(re.findall(r"^\|.*\|\s*$", mo, re.M)), len(re.findall(r"^\|.*\|\s*$", mn, re.M)))
    t["images_attachment_lines"] = (mo.count("(image/"), mn.count("(image/"))
    t["video_card_lines"] = (mo.count("Embedded video card"), mn.count("Embedded video card"))
    th = []
    for tt in inner[0][1]:
        try:
            for it in (tt[3][0][0][37][1] or []):
                if isinstance(it, list) and len(it) > 6: th += [s for s in (it[5], it[6]) if isinstance(s, str) and len(s) > 25]
        except Exception: pass
    t["reasoning_strings_in_new_markdown"] = sum(1 for s in th if s in mn)
    t["reasoning_strings_checked"] = len(th)
    ex = (ROOT / existing).read_bytes()
    t["new_equals_existing_output_on_disk_(crlf-normalised)"] = ex.replace(b"\r\n", b"\n") == mn.encode("utf-8")
    t["new_equals_old_parser_render"] = (mo == mn)
    t["name_only_attachments"] = [a["name"] for x in cn["turns"] for a in x["attachment_refs"] if not a["url"]]
    t["action_cards"] = [{"turn": x["index"] + 1, **c} for x in cn["turns"] for c in x["action_cards"]]
    t["video_cards"] = sum(len(x["cards"]) for x in cn["turns"]); t["distinct_videos"] = len({c["url"][-11:] for x in cn["turns"] for c in x["cards"]})
    t["url_attachments"] = sum(len(x["attachments"]) for x in cn["turns"])
    t["attachment_only_turns"] = [x["index"] + 1 for x in cn["turns"] if not x["user_text"].strip() and x["attachment_refs"]]
    t["unexpected_difference"] = bool(other_added or removed_nonblank or not all(t["identical"].values()) or t["urls_lost"]
                                      or t["code_fence_lines"][0] != t["code_fence_lines"][1] or t["table_rows"][0] != t["table_rows"][1]
                                      or t["video_card_lines"][0] != t["video_card_lines"][1] or t["reasoning_strings_in_new_markdown"])
    res["tests"][name] = t

(ROOT / "logs" / "additive_regression_offline.json").write_text(json.dumps(res, indent=2, ensure_ascii=False), encoding="utf-8")
for name, t in res["tests"].items():
    print(f"\n=== {name} === turns {t['turns_old']}->{t['turns_new']} | identical: {t['identical']}")
    print(f"  Markdown diff vs previous parser: added {t['added_by_class']} | other added: {t['added_other']} | removed: {t['removed_lines']}")
    print(f"  urls lost: {t['urls_lost']} | fences {t['code_fence_lines']} | table rows {t['table_rows']} | image att lines {t['images_attachment_lines']} | video-card lines {t['video_card_lines']} | reasoning in MD: {t['reasoning_strings_in_new_markdown']}/{t['reasoning_strings_checked']}")
    print(f"  new == existing output on disk: {t['new_equals_existing_output_on_disk_(crlf-normalised)']} | new == old-parser render: {t['new_equals_old_parser_render']}")
    print(f"  name-only attachments: {t['name_only_attachments']} | action cards: {t['action_cards']} | video cards {t['video_cards']} ({t['distinct_videos']} distinct) | url attachments {t['url_attachments']} | attachment-only turns {t['attachment_only_turns']}")
    print(f"  UNEXPECTED DIFFERENCE: {t['unexpected_difference']}")
