#!/usr/bin/env python3
"""Phases 1-3: inventory, classify and structurally survey remaining share links. READ-ONLY w.r.t. TXT files.

* Resolves every untested link (GET, follow redirects).
* Gemini shares only: performs the same `ujx1Bf` POST as Tests 1/2 and scans the payload for structural features.
* AI Mode links are classified and NEVER sent to the Gemini extractor.
* Saves feature summaries only (no raw chats, no Markdown, no cookies/f.sid) to logs/test3_candidate_survey.json.
"""
import datetime, json, re, sys
from collections import Counter
from pathlib import Path
from urllib.parse import urlsplit, parse_qs

import requests

import gemini_parse as gp
import gemini_replay as gr

ROOT = Path(__file__).resolve().parent
X = ROOT.parent.parent
OUTJSON = ROOT / "logs" / "test3_candidate_survey.json"
if OUTJSON.exists():
    sys.exit(f"refusing to overwrite {OUTJSON}")

TEST1_URL = "https://share.gemini.google/HYSCokmDqznN"
TEST2_URL = "https://share.gemini.google/ruuLsONveleq"


def sget(x, *p):
    try:
        for i in p:
            x = x[i]
        return x
    except Exception:
        return None


def nn(l):
    return tuple(i for i, v in enumerate(l) if v not in (None, [], "")) if isinstance(l, list) else None


def table_stats(text):
    rows = re.findall(r"^\s*\|.*\|\s*$", text, re.M)
    seps = re.findall(r"^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)*\|?\s*$", text, re.M)
    return len(rows), len(seps)


def scan(inner):
    """Feature scan independent of gp.extract_conversation (so shapes the extractor cannot handle are still visible)."""
    turns = sget(inner, 0, 1) or []
    f = {"turns": len(turns), "sigs": {"turn": set(), "user_top": set(), "user_block": set(), "t3": set(), "cand": set()},
         "candidate_slots": set(), "mimes_user": Counter(), "mimes_candidate": Counter(), "tables_rows": 0, "table_separators": 0,
         "user_attachments": 0, "candidate_media": 0, "video_cards": 0, "code_fences": 0, "code_langs": Counter(),
         "empty_user": [], "empty_gemini": [], "gemini_text_missing": [], "multi_candidate_turns": [], "thought_items": 0,
         "thought_turns": 0, "bare_urls": 0, "md_links": 0, "headings": 0, "chars": 0, "cite_markers": 0, "non_image_user_mimes": [],
         "t3_extra_slots": set(), "per_turn": []}
    for i, t in enumerate(turns):
        ub, t3, cand = sget(t, 2, 0), sget(t, 3), sget(t, 3, 0, 0)
        ut, gt = sget(ub, 0), sget(cand, 1, 0)
        f["sigs"]["turn"].add(nn(t)); f["sigs"]["user_top"].add(nn(sget(t, 2))); f["sigs"]["user_block"].add(nn(ub))
        f["sigs"]["t3"].add(nn(t3)); f["sigs"]["cand"].add(nn(cand))
        for s in (nn(cand) or ()): f["candidate_slots"].add(s)
        ut = ut if isinstance(ut, str) else ""
        gt_ok = isinstance(gt, str)
        if not ut.strip(): f["empty_user"].append(i + 1)
        if not gt_ok: f["gemini_text_missing"].append(i + 1)
        elif not gt.strip(): f["empty_gemini"].append(i + 1)
        gt = gt if gt_ok else ""
        if isinstance(sget(t, 3, 0), list) and len(t[3][0]) > 1: f["multi_candidate_turns"].append(i + 1)
        ua = list(gp._find_lists(ub[4:5], gp._is_attachment)) if isinstance(ub, list) else []
        ca = list(gp._find_lists(t3, gp._is_attachment)) if isinstance(t3, list) else []
        f["user_attachments"] += len(ua); f["candidate_media"] += len(ca)
        for a in ua:
            f["mimes_user"][a[11]] += 1
            if not str(a[11]).startswith("image/"): f["non_image_user_mimes"].append(a[11])
        for a in ca: f["mimes_candidate"][a[11]] += 1
        f["video_cards"] += len({c[2] for c in gp._find_lists(cand, gp._is_video_card)}) if cand else 0
        th = sget(cand, 37, 1)
        if isinstance(th, list):
            items = [x for x in th if isinstance(x, list) and len(x) > 6 and (x[5] or x[6])]
            f["thought_items"] += len(items); f["thought_turns"] += bool(items)
        txt = ut + "\n" + gt
        r, sp = table_stats(txt); f["tables_rows"] += r; f["table_separators"] += sp
        fences = re.findall(r"^```(\w*)", txt, re.M)
        f["code_fences"] += len(fences); f["code_langs"].update(l for l in fences if l)
        f["bare_urls"] += len(re.findall(r"https?://[^\s)\]>*]+", txt))
        f["md_links"] += len(re.findall(r"\[[^\]]+\]\([^)]+\)", txt))
        f["headings"] += len(re.findall(r"^#{1,6} ", txt, re.M))
        f["cite_markers"] += len(re.findall(r"\[cite: ?[\d, ]+\]", txt))
        f["chars"] += len(txt)
    return f


def jsonable(f):
    o = {}
    for k, v in f.items():
        if k == "sigs": o[k] = {a: sorted(map(list, (s for s in b if s is not None))) for a, b in v.items()}
        elif isinstance(v, set): o[k] = sorted(v)
        elif isinstance(v, Counter): o[k] = dict(v)
        else: o[k] = v
    return o


# ---------------- known coverage from Tests 1 and 2 ----------------
known = {"sigs": {k: set() for k in ("turn", "user_top", "user_block", "t3", "cand")}, "cand_slots": set(), "mimes": set()}
for p in (ROOT / "debug" / "python_replay_response.bin", ROOT / "debug" / "test2_response.bin"):
    k = scan(gp.rpc_payloads(gp.parse_batchexecute(p.read_bytes()), "ujx1Bf")[0])
    for a in known["sigs"]: known["sigs"][a] |= k["sigs"][a]
    known["cand_slots"] |= k["candidate_slots"]; known["mimes"] |= set(k["mimes_user"]) | set(k["mimes_candidate"])

# ---------------- inventory ----------------
txts = []
for p in sorted(list((X / "TXT_OUT").glob("https_share.g*.txt")) + list((ROOT.parent).glob("https_share.g*.txt")), key=lambda p: (p.name, str(p))):
    urls = re.findall(r"https?://\S+", p.read_text(encoding="utf-8-sig"))
    txts.append({"file": p.name, "location": str(p.parent.relative_to(X)) if p.parent != X else ".", "urls": urls})
by_url = {}
for t in txts:
    if len(t["urls"]) == 1:
        by_url.setdefault(t["urls"][0], []).append(f"{t['location']}\\{t['file']}")
inventory = {"txt_files_seen": len(txts), "unique_urls": len(by_url),
             "duplicate_urls": {u: f for u, f in by_url.items() if len(f) > 1 and len({x.split(chr(92))[-1] for x in f}) > 1}}

# ---------------- classify + survey ----------------
prior_aimode = json.loads((ROOT / "logs" / "test3_validation_result.json").read_text(encoding="utf-8"))
records = []
for url, files in sorted(by_url.items(), key=lambda kv: kv[1][0].split("\\")[-1]):
    rec = {"url": url, "txt_files": files}
    if url == TEST1_URL: rec.update(status="ALREADY_TESTED", test="Test 1", classification="GEMINI_SHARE"); records.append(rec); continue
    if url == TEST2_URL: rec.update(status="ALREADY_TESTED", test="Test 2", classification="GEMINI_SHARE"); records.append(rec); continue
    rec["status"] = "CANDIDATE"
    try:
        if url == prior_aimode.get("original_url"):  # already resolved during the failed Test 3 attempt; do not re-fetch
            fu = prior_aimode["final_url"]; rec["resolution_source"] = "reused from logs/test3_validation_result.json"
            host, path, q = urlsplit(fu).hostname, urlsplit(fu).path, parse_qs(urlsplit(fu).query)
            rec.update(final_host=host, final_path=path, http_status=200)
            rec["classification"] = "GOOGLE_AI_MODE_SHARE" if (host or "").endswith("google.com") and "50" in q.get("udm", []) else "OTHER"
            records.append(rec); continue
        s = requests.Session(); s.headers.update({"User-Agent": gr.UA, "Accept-Language": "en-US,en;q=0.9"})
        is_gemini_form = urlsplit(url).hostname == "share.gemini.google"
        r1, n1 = gr.with_retries(lambda: s.get(url, timeout=30, stream=not is_gemini_form,
                                               headers={"Accept": "text/html,application/xhtml+xml,*/*;q=0.8"}))
        sp = urlsplit(r1.url); q = parse_qs(sp.query)
        rec.update(http_status=r1.status_code, final_host=sp.hostname, final_path=sp.path, redirects=len(r1.history))
        m = re.fullmatch(r"/share/([A-Za-z0-9_-]+)", sp.path)
        if sp.hostname == "gemini.google.com" and m:
            rec["classification"] = "GEMINI_SHARE"; rec["share_id"] = m.group(1)
        elif (sp.hostname or "").endswith("google.com") and ("50" in q.get("udm", []) or "/aimode/" in url):
            rec["classification"] = "GOOGLE_AI_MODE_SHARE"
        elif r1.status_code == 200:
            rec["classification"] = "OTHER"
        else:
            rec["classification"] = "INVALID/UNRESOLVED"
        if rec["classification"] != "GEMINI_SHARE":
            r1.close(); records.append(rec); continue
        # Gemini only: same ujx1Bf request, feature scan, no Markdown
        bl, fsid = gr.wiz_value(r1.text, "cfb2h"), gr.wiz_value(r1.text, "FdrFJe")
        if not (bl and fsid): raise ValueError("page parameters missing")
        freq = json.dumps([[[gr.RPC_ID, json.dumps([None, rec["share_id"], [4]], separators=(",", ":")), None, "generic"]]], separators=(",", ":"))
        r2, n2 = gr.with_retries(lambda: s.post("https://gemini.google.com/_/BardChatUi/data/batchexecute",
                                                params={"rpcids": gr.RPC_ID, "source-path": f"/share/{rec['share_id']}", "bl": bl, "f.sid": fsid, "hl": "en-US", "rt": "c"},
                                                data={"f.req": freq}, timeout=60,
                                                headers={"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", "X-Same-Domain": "1",
                                                         "Referer": "https://gemini.google.com/", "Origin": "https://gemini.google.com", "Accept": "*/*"}))
        rec.update(ujx1Bf_status=r2.status_code, response_bytes=len(r2.content))
        if r2.status_code != 200: raise ValueError(f"ujx1Bf HTTP {r2.status_code}")
        pl = gp.rpc_payloads(gp.parse_batchexecute(r2.content), gr.RPC_ID)
        rec["wrb_fr_payloads"] = len(pl)
        if len(pl) != 1: raise ValueError(f"{len(pl)} wrb.fr payloads")
        inner = pl[0]
        rec["title"] = sget(inner, 0, 2, 1)
        f = scan(inner)
        # would the existing, unmodified extractor handle it?
        try:
            conv = gp.extract_conversation(inner); rec["existing_parser_prediction"] = "OK"
        except Exception as e:
            rec["existing_parser_prediction"] = f"FAIL: {type(e).__name__}: {e}"
        # novelty vs Tests 1/2
        new_sigs = {a: [list(s) for s in f["sigs"][a] if s is not None and s not in known["sigs"][a]] for a in f["sigs"]}
        new_slots = sorted(f["candidate_slots"] - known["cand_slots"])
        new_mimes = sorted((set(f["mimes_user"]) | set(f["mimes_candidate"])) - known["mimes"])
        score, why = 0.0, []
        def add(pts, reason):
            global score
            score += pts; why.append(f"+{pts} {reason}")
        if f["tables_rows"]: add(4, f"markdown tables ({f['tables_rows']} rows, {f['table_separators']} separators)")
        if f["candidate_media"]: add(4, f"media on the Gemini side ({f['candidate_media']}; mimes {dict(f['mimes_candidate'])})")
        if new_mimes: add(4, f"new attachment mime types {new_mimes}")
        if f["non_image_user_mimes"]: add(2, f"non-image user attachments {sorted(set(f['non_image_user_mimes']))}")
        if f["user_attachments"]: add(1, f"user attachments ({f['user_attachments']}; already seen in Test 1)")
        if f["video_cards"]: add(1, f"video cards ({f['video_cards']}; already seen in Test 1)")
        if f["empty_gemini"] or f["gemini_text_missing"]: add(3, f"empty/missing Gemini text in turns {f['empty_gemini'] + f['gemini_text_missing']}")
        if f["multi_candidate_turns"]: add(3, f"multiple response candidates in turns {f['multi_candidate_turns']}")
        ns = sum(len(v) for v in new_sigs.values())
        if ns: add(min(6, 2 * ns), f"{ns} new turn/slot shape signature(s)")
        if new_slots: add(min(6, 3 * len(new_slots)), f"new candidate slots non-null {new_slots}")
        if f["code_fences"]: add(0.5, f"code fences ({f['code_fences']}; covered by Test 2)")
        if rec["existing_parser_prediction"] != "OK": add(5, "existing parser predicted to FAIL (genuinely new structure)")
        rec.update(features=jsonable(f), new_signatures=new_sigs, new_candidate_slots=new_slots, new_mimes=new_mimes,
                   novelty_score=score, novelty_reasons=why)
    except Exception as e:
        rec["classification"] = rec.get("classification", "INVALID/UNRESOLVED"); rec["error"] = f"{type(e).__name__}: {e}"
    records.append(rec)

cls = Counter(r.get("classification") for r in records)
out = {"generated_at": datetime.datetime.now(datetime.timezone.utc).isoformat(), "inventory": inventory, "txt_files": txts,
       "known_coverage_from_tests_1_2": {"candidate_slots": sorted(known["cand_slots"]), "mimes": sorted(known["mimes"]),
                                         "signature_counts": {k: len(v) for k, v in known["sigs"].items()}},
       "classification_counts": dict(cls), "records": records}
OUTJSON.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")

print("classification counts:", dict(cls))
for r in records:
    line = f"{r['txt_files'][0].split(chr(92))[-1]:22} {r.get('classification'):22} {r['status']:15}"
    if "novelty_score" in r:
        f = r["features"]
        line += f" score={r['novelty_score']:<5} turns={f['turns']:<3} tbl={f['tables_rows']:<3} uatt={f['user_attachments']:<2} cmedia={f['candidate_media']:<2} vid={f['video_cards']:<2} code={f['code_fences']:<3} empty_g={len(f['empty_gemini']) + len(f['gemini_text_missing'])} thoughts={f['thought_items']:<3} parser={r['existing_parser_prediction'][:30]}"
    if r.get("error"): line += " ERROR " + r["error"][:80]
    print(line)
