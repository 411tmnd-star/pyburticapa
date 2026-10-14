#!/usr/bin/env python3
"""Batch conversion of the remaining Gemini shared chats (Phases: classify -> fetch/extract -> dedupe -> verify -> manifest).

* Existing parser (gemini_parse.py) and replay helpers (gemini_replay.py) are imported unchanged.
* Reads TXT link files READ-ONLY; never writes to them.
* Google AI Mode links are listed but never fetched or sent to the Gemini extractor.
* Duplicate detection uses a normalized hash of the reconstructed conversation text, not URLs/share ids.
* Writes only under Gemini MD2: output/batch/, debug/batch/, logs/.
"""
import datetime, hashlib, json, os, re, subprocess, sys, time, unicodedata
from collections import Counter
from pathlib import Path
from urllib.parse import urlsplit

import requests

import gemini_parse as gp
import gemini_replay as gr

sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")

ROOT = Path(__file__).resolve().parent
X = ROOT.parent.parent
DEBUG, LOGS, OUT, RAW = ROOT / "debug", ROOT / "logs", ROOT / "output" / "batch", ROOT / "debug" / "batch"
MANIFEST, REPORT = LOGS / "gemini_batch_manifest.json", LOGS / "GEMINI_BATCH_REPORT.md"
USE_BROWSER = "--no-browser" not in sys.argv
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
for p in (MANIFEST, REPORT):
    if p.exists():
        sys.exit(f"refusing to overwrite {p}")
for d in (OUT, RAW):
    d.mkdir(parents=True, exist_ok=True)

sha_b = lambda b: hashlib.sha256(b).hexdigest()
sha_f = lambda p: sha_b(Path(p).read_bytes())
PARSER_SHA = sha_f(ROOT / "gemini_parse.py")
NOW = lambda: datetime.datetime.now(datetime.timezone.utc).isoformat()

# ------------------------------------------------------------------ previously tested chats (by URL, not by filename)
TESTED = {
    "https://share.gemini.google/HYSCokmDqznN": dict(test="Test 1", resp="debug/python_replay_response.bin", out="output/prototype_gemini_conversation.md",
                                                       result="logs/python_replay_result.json", browser="debug/browser_rendered_text.txt"),
    "https://share.gemini.google/ruuLsONveleq": dict(test="Test 2", resp="debug/test2_response.bin", out="output/test2_gemini_conversation.md",
                                                       result="logs/test2_validation_result.json", browser=None),
    "https://share.gemini.google/FVKTq1yB2ca7": dict(test="Test 3", resp="debug/test3_additive_response.bin", out="output/test3_additive_conversation.md",
                                                       result="logs/test3_additive_validation_result.json", browser="debug/test3_browser_rendered_text.txt"),
    "https://share.gemini.google/DVoVO95EK1Nx": dict(test="Test 4", resp="debug/test4_additive_response.bin", out="output/test4_additive_conversation.md",
                                                       result="logs/test4_additive_validation_result.json", browser="debug/test4_browser_rendered_text.txt"),
}


# ------------------------------------------------------------------ helpers
def norm_text(s):
    s = unicodedata.normalize("NFC", s).replace("\r\n", "\n").replace("\r", "\n")
    return "\n".join(l.rstrip() for l in s.split("\n")).strip()


def turn_hashes(conv):
    return [sha_b((norm_text(t["user_text"]) + "\x00" + norm_text(t["gemini_text"])).encode("utf-8")) for t in conv["turns"]]


def content_hash(conv):
    return sha_b(json.dumps([[norm_text(t["user_text"]), norm_text(t["gemini_text"])] for t in conv["turns"]],
                            ensure_ascii=False, separators=(",", ":")).encode("utf-8"))


def structure_hash(conv):
    return sha_b(json.dumps([[len(t["attachment_refs"]), [a["name"] for a in t["attachment_refs"]], [c["url"][-11:] for c in t["cards"]],
                              [(c["title"], tuple(c["actions"])) for c in t["action_cards"]]] for t in conv["turns"]],
                            ensure_ascii=False).encode("utf-8"))


def slug(s):
    s = re.sub(r"[^A-Za-z0-9]+", "-", unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()).strip("-").lower()
    return (s[:60] or "chat")


def split_fences(text):
    out, inside, blocks = [], False, 0
    for line in text.split("\n"):
        if line.lstrip().startswith("```"):
            if not inside: blocks += 1
            inside = not inside
            continue
        if not inside: out.append(line)
    return "\n".join(out), blocks


def table_blocks(text):
    outside, _ = split_fences(text)
    tables, cur = [], []
    for line in outside.split("\n") + [""]:
        if re.match(r"^\s*\|.*\|\s*$", line): cur.append(line.strip())
        else:
            if len(cur) >= 2 and any(re.fullmatch(r"\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?", r) for r in cur): tables.append(cur)
            cur = []
    return tables


def sget(x, *p):
    try:
        for i in p: x = x[i]
        return x
    except Exception:
        return None


def thought_strings(inner):
    out = []
    for t in sget(inner, 0, 1) or []:
        for it in (sget(t, 3, 0, 0, 37, 1) or []):
            if isinstance(it, list) and len(it) > 6:
                out += [s for s in (it[5], it[6]) if isinstance(s, str) and len(s) > 25]
    return out


def structures(conv, inner):
    gem = "\n".join(t["gemini_text"] for t in conv["turns"]); alltext = "\n".join(t["user_text"] + "\n" + t["gemini_text"] for t in conv["turns"])
    tabs = table_blocks(gem); _, fences = split_fences(gem)
    s = ["text"]
    if tabs: s.append(f"tables({len(tabs)})")
    if fences: s.append(f"code_blocks({fences})")
    imgs = sum(1 for t in conv["turns"] for a in t["attachment_refs"] if a["mime"] and a["mime"].startswith("image/"))
    other = Counter(a["mime"] for t in conv["turns"] for a in t["attachment_refs"] if a["mime"] and not a["mime"].startswith("image/"))
    if imgs: s.append(f"user_images({imgs})")
    for m, n in other.items(): s.append(f"user_attachments[{m}]({n})")
    named = sum(1 for t in conv["turns"] for a in t["attachment_refs"] if not a["url"])
    if named: s.append(f"name_only_attachments({named})")
    vc = sum(len(t["cards"]) for t in conv["turns"])
    if vc: s.append(f"video_cards({vc})")
    ac = sum(len(t["action_cards"]) for t in conv["turns"])
    if ac: s.append(f"action_cards({ac})")
    ao = [t["index"] + 1 for t in conv["turns"] if not t["user_text"].strip() and t["attachment_refs"]]
    if ao: s.append(f"attachment_only_turns({len(ao)})")
    if re.search(r"\[cite: ?[\d, ]+\]", alltext): s.append("cite_markers")
    if re.search(r"^#{1,6} ", alltext, re.M): s.append("headings")
    if re.search(r"https?://", alltext): s.append("urls")
    th = sum(1 for t in (sget(inner, 0, 1) or []) for it in (sget(t, 3, 0, 0, 37, 1) or []) if isinstance(it, list) and len(it) > 6 and (it[5] or it[6]))
    if th: s.append(f"reasoning_summaries_observed_excluded({th})")
    return s


BENIGN = [r"^\[3\]\[0\]\[0\]\[37\]", r"^\[3\]\[12\]", r"^\[3\]\[4\]", r"^\[3\]\[5\]", r"^\[3\]\[0\]\[0\]\[2\]", r"^\[3\]\[0\]\[0\]\[30\]", r"^\[3\]\[0\]\[0\]\[28\]"]
KNOWN_CAND = {0, 1, 2, 8, 9, 12, 28, 30, 37}; KNOWN_T3 = {0, 3, 4, 5, 9, 12, 14, 17, 24, 25}
KNOWN_PLACEHOLDERS = {"youtube", "action_card"}


def findings(inner, conv):
    f = []
    turns = sget(inner, 0, 1) or []
    texts = "\n".join(t["gemini_text"] for t in conv["turns"])
    kinds = Counter(re.findall(r"googleusercontent\.com/(\w+?)_content/", texts))
    unknown = {k: n for k, n in kinds.items() if k not in KNOWN_PLACEHOLDERS}
    if unknown: f.append({"kind": "unknown_content_placeholder", "detail": unknown, "risk": "content_loss"})
    for i, t in enumerate(turns):
        t3, cand = sget(t, 3), sget(t, 3, 0, 0)
        media = list(gp._find_lists(t3, gp._is_attachment)) if isinstance(t3, list) else []
        if media: f.append({"kind": "gemini_side_media", "turn": i + 1, "detail": f"{len(media)} attachment-like record(s) in the Gemini response", "risk": "content_loss"})
        recs = sget(t, 2, 0, 4, 0, 3) or []
        if isinstance(recs, list) and len(recs) != len(conv["turns"][i]["attachment_refs"]):
            f.append({"kind": "attachment_records_not_all_represented", "turn": i + 1, "detail": f"{len(recs)} records vs {len(conv['turns'][i]['attachment_refs'])} extracted", "risk": "content_loss"})
        ns = sorted({k for k, v in enumerate(cand or []) if v not in (None, [], "")} - KNOWN_CAND)
        if ns: f.append({"kind": "new_candidate_slots", "turn": i + 1, "detail": ns, "risk": "info"})
        n3 = sorted({k for k, v in enumerate(t3 or []) if v not in (None, [], "")} - KNOWN_T3)
        if n3: f.append({"kind": "new_turn_response_slots", "turn": i + 1, "detail": n3, "risk": "info"})
        if not conv["turns"][i]["gemini_text"].strip(): f.append({"kind": "empty_gemini_text", "turn": i + 1, "risk": "content_loss"})
    # prose in the payload that is neither extracted nor in a known-benign location
    used = norm_text("\n".join(t["user_text"] + "\n" + t["gemini_text"] + "\n" + " ".join(c["title"] + " " + c["channel"] for c in t["cards"])
                               + " " + " ".join(a["name"] for a in t["attachment_refs"]) + " " + " ".join(c["title"] + " " + c["description"] + " " + " ".join(c["actions"]) for c in t["action_cards"])
                               for t in conv["turns"]))
    flat = lambda s: re.sub(r"\s+", " ", re.sub(r"[*#`>_\-]", "", re.sub(r"\[cite: ?[\d, ]+\]", "", s))).lower().strip()
    nused = flat(used)
    pat = {}
    for i, t in enumerate(turns):
        def walk(x, path):
            if isinstance(x, list):
                for k, v in enumerate(x): walk(v, path + (k,))
            elif isinstance(x, dict):
                for k, v in x.items(): walk(v, path + (k,))
            elif isinstance(x, str) and len(x) >= 30 and x.count(" ") >= 3 and not x.startswith("http") and flat(x) not in nused:
                key = "".join(f"[{k}]" for k in path[:6])
                if not any(re.match(b, key) for b in BENIGN): pat.setdefault(key, [0, x[:70]])[0] += 1
        walk(t, ())
    for k, (n, smp) in pat.items(): f.append({"kind": "unextracted_prose", "path_pattern": "turn" + k, "count": n, "sample": smp, "risk": "content_loss"})
    return f


def payload_checks(conv, md, url, share_id, nrecords):
    c = {}
    chk = lambda name, cond, detail="": c.__setitem__(name, {"pass": bool(cond), "detail": detail})
    turns = conv["turns"]
    gem = "\n".join(t["gemini_text"] for t in turns); alltext = "\n".join(t["user_text"] + "\n" + t["gemini_text"] for t in turns)
    chk("turn_count_matches_payload", len(turns) == nrecords, f"{len(turns)} vs {nrecords}")
    split = gp.split_md_turns(md)
    chk("markdown_blocks_recovered", len(split) == len(turns) and all(split), f"{len(split)} blocks")
    chk("role_order_user_then_gemini", [m.group(1) for m in re.finditer(r"^## (User|Gemini)$", md, re.M)] == ["User", "Gemini"] * len(turns))
    bad = [t["index"] + 1 for t, b in zip(turns, split) if b and ((t["user_text"].strip() and t["user_text"].rstrip() not in b[0]) or t["gemini_text"].rstrip() not in b[1])]
    chk("payload_text_verbatim_per_turn", not bad, f"mismatched turns {bad}")
    chk("source_url_in_front_matter", f"source_url: {gp._yaml(url)}" in md.split("\n---\n", 1)[0] + "\n", url)
    chk("share_id_matches", conv["share_id"] == share_id, f"{conv['share_id']} vs {share_id}")
    fa, fm = len(re.findall(r"^```", alltext, re.M)), len(re.findall(r"^```", md, re.M))
    chk("code_fences_preserved", fa == fm, f"{fa} vs {fm}")
    chk("code_fences_balanced", not [t["index"] + 1 for t in turns if len(re.findall(r"^```", t["gemini_text"], re.M)) % 2])
    tabs = table_blocks(gem)
    chk("tables_well_formed", all(len({len(r.strip().strip('|').split('|')) for r in tb}) == 1 for tb in tabs), f"{len(tabs)} table(s)")
    chk("tables_identical_in_markdown", tabs == table_blocks(md))
    urls_src = set(re.findall(r"https?://[^\s)\]>*]+", alltext)) | {x["url"] for t in turns for x in t["cards"]} | {a["url"] for t in turns for a in t["attachment_refs"] if a["url"]}
    chk("urls_preserved", urls_src <= set(re.findall(r"https?://[^\s)\]>*]+", md)), f"{len(urls_src)} URLs")
    chk("name_only_attachments_in_markdown", all(f"`{a['name']}`" in md for t in turns for a in t["attachment_refs"] if not a["url"]))
    chk("action_cards_in_markdown", all(x["title"] in md and all(l in md for l in x["actions"]) for t in turns for x in t["action_cards"]))
    chk("video_cards_in_markdown", md.count("Embedded video card") == sum(len(t["cards"]) for t in turns))
    chk("turn_order_matches_payload_ids", [m.group(1) for m in re.finditer(r"<!-- turn \d+ \| response_id (\S+)", md)] == [t["response_id"] for t in turns])
    return c


EXPLAINED = {"pdf", "jpg", "jpeg", "png", "gif", "webp", "cite", "docx", "xlsx", "csv", "txt", "zip", "mp4", "mp3"}


def browser_level(conv, md, rendered, url):
    try:
        v = gp.verify(conv, md, rendered, url, expected_turns=len(conv["turns"]))
    except Exception as e:
        return "SELF_CONSISTENT_WITH_PAYLOAD", {"browser_error": f"{type(e).__name__}: {e}"}
    detail = {"existing_verifier": v["verified"], "coverage": v["checks"].get("rendered_text_covered_by_markdown", {}).get("detail")}
    if v["verified"]:
        return "VERIFIED_AGAINST_BROWSER", detail
    failing = [k for k, x in v["checks"].items() if not x["pass"]]
    detail["failing_checks"] = failing
    if failing == ["rendered_text_covered_by_markdown"]:
        end = rendered.index("\nSign in\n\nGemini may display") if "\nSign in\n\nGemini may display" in rendered else len(rendered)
        body = "\n".join(l for l in rendered[rendered.index("You said "):end].split("\n") if not l.startswith("You said "))
        mdtok = set(gp._tok(gp._CITE.sub("", md)))
        resid = Counter(w for w in gp._tok(body) if w not in mdtok)
        detail["residual_tokens"] = dict(resid)
        unexplained = {w: n for w, n in resid.items() if w not in EXPLAINED and not re.fullmatch(r"\d+(\.\d+)?[km]", w)}
        if not unexplained:
            return "BROWSER_COMPARED_RESIDUAL_EXPLAINED", detail
        detail["unexplained_tokens"] = unexplained
        return "BROWSER_COMPARED_UNEXPLAINED_GAP", detail
    return "BROWSER_COMPARED_FAILED", detail


def browser_render(url, prefix, expected_chars):
    """Render the share page in Edge (fresh profile, no sign-in); return the rendered text or None."""
    env = dict(os.environ, CDP_URL=url, CDP_PREFIX=prefix, CDP_BROWSER=EDGE, CDP_EXTRA_FLAGS="--disable-quic", CDP_PORT="9340",
               CDP_MIN_CHARS=str(max(300, min(60000, int(expected_chars * 0.55)))), CDP_STABLE_N="8",
               CDP_WAIT_SECONDS=str(300 if expected_chars > 60000 else 150), PYTHONIOENCODING="utf-8")
    try:
        subprocess.run([sys.executable, str(DEBUG / "cdp_capture_generic.py")], env=env, cwd=str(DEBUG), timeout=int(env["CDP_WAIT_SECONDS"]) + 150,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception:
        pass
    p = DEBUG / f"{prefix}_browser_rendered_text.txt"
    return p.read_text(encoding="utf-8") if p.exists() else None


# ------------------------------------------------------------------ inventory (read-only)
txts = []
for p in sorted(list((X / "TXT_OUT").glob("https_share.g*.txt")) + list(ROOT.parent.glob("https_share.g*.txt")), key=lambda p: (p.name, str(p))):
    txts.append({"file": p.name, "location": str(p.parent.relative_to(X)), "urls": re.findall(r"https?://\S+", p.read_text(encoding="utf-8-sig")), "sha256": sha_f(p)})
by_url = {}
for t in txts:
    if len(t["urls"]) == 1:
        by_url.setdefault(t["urls"][0], [])
        if t["file"] not in [x["file"] for x in by_url[t["urls"][0]]]: by_url[t["urls"][0]].append(t)
gem_urls = sorted((u for u in by_url if urlsplit(u).hostname == "share.gemini.google"), key=lambda u: by_url[u][0]["file"])
ai_urls = sorted((u for u in by_url if "share.google/aimode/" in u), key=lambda u: by_url[u][0]["file"])
other_urls = [u for u in by_url if u not in gem_urls and u not in ai_urls]
print(f"inventory: {len(txts)} TXT files | {len(by_url)} unique URLs | Gemini {len(gem_urls)} | AI Mode {len(ai_urls)} | other {len(other_urls)}")

entries = {}       # url -> manifest entry
convs = {}         # url -> (conv, inner, md_for_verification)
for u in gem_urls:
    entries[u] = {"source_filename": by_url[u][0]["file"], "source_url": u, "classification": "GEMINI_SHARE", "status": None, "final_url": None, "share_id": None,
                  "output_path": None, "content_hash": None, "structure_hash": None, "duplicate_of": None, "turn_count": None, "structure_types": [],
                  "verification_level": None, "parser_sha256": PARSER_SHA, "error": None, "findings": [], "tested_as": TESTED.get(u, {}).get("test")}

# ------------------------------------------------------------------ Phase A: tested chats from saved payloads, remaining chats fetched live
session_headers = {"User-Agent": gr.UA, "Accept-Language": "en-US,en;q=0.9"}
for u in gem_urls:
    e = entries[u]
    try:
        if u in TESTED:
            T = TESTED[u]
            raw = (ROOT / T["resp"]).read_bytes()
            r = json.loads((ROOT / T["result"]).read_text(encoding="utf-8"))
            e["final_url"] = r.get("final_url"); e["share_id"] = r.get("share_id")
            e["note"] = f"previously validated as {T['test']}; canonical output re-used, payload re-parsed from saved response"
        else:
            s = requests.Session(); s.headers.update(session_headers)
            try:
                r1, _ = gr.with_retries(lambda: s.get(u, timeout=30, headers={"Accept": "text/html,application/xhtml+xml,*/*;q=0.8"}))
            except Exception as ex:
                raise RuntimeError("FETCH_FAILURE|" + f"{type(ex).__name__}: {ex}")
            e["final_url"] = r1.url
            m = re.fullmatch(r"/share/([A-Za-z0-9_-]+)", urlsplit(r1.url).path)
            if r1.status_code != 200 or urlsplit(r1.url).hostname != "gemini.google.com" or not m:
                raise RuntimeError(f"FETCH_FAILURE|not a Gemini share page (HTTP {r1.status_code}, final {urlsplit(r1.url).hostname}{urlsplit(r1.url).path})")
            e["share_id"] = m.group(1)
            bl, fsid = gr.wiz_value(r1.text, "cfb2h"), gr.wiz_value(r1.text, "FdrFJe")
            if not (bl and fsid): raise RuntimeError("FETCH_FAILURE|page parameters (bl / f.sid) not found in shell")
            freq = json.dumps([[[gr.RPC_ID, json.dumps([None, e["share_id"], [4]], separators=(",", ":")), None, "generic"]]], separators=(",", ":"))
            try:
                r2, _ = gr.with_retries(lambda: s.post("https://gemini.google.com/_/BardChatUi/data/batchexecute",
                    params={"rpcids": gr.RPC_ID, "source-path": f"/share/{e['share_id']}", "bl": bl, "f.sid": fsid, "hl": "en-US", "rt": "c"}, data={"f.req": freq}, timeout=60,
                    headers={"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", "X-Same-Domain": "1", "Referer": "https://gemini.google.com/", "Origin": "https://gemini.google.com", "Accept": "*/*"}))
            except Exception as ex:
                raise RuntimeError("FETCH_FAILURE|" + f"{type(ex).__name__}: {ex}")
            if r2.status_code != 200: raise RuntimeError(f"FETCH_FAILURE|ujx1Bf HTTP {r2.status_code}")
            raw = r2.content
            (RAW / f"{e['share_id']}.bin").write_bytes(raw)
            e["response_bytes"] = len(raw); time.sleep(1)
        try:
            pl = gp.rpc_payloads(gp.parse_batchexecute(raw), gr.RPC_ID)
            if len(pl) != 1: raise ValueError(f"{len(pl)} wrb.fr payloads for {gr.RPC_ID}")
            inner = pl[0]; nrec = len(gp._get(inner, 0, 1))
        except Exception as ex:
            raise RuntimeError("PAYLOAD_PARSE_FAILURE|" + f"{type(ex).__name__}: {ex}")
        try:
            conv = gp.extract_conversation(inner)
            if len(conv["turns"]) != nrec: raise ValueError("turn count mismatch")
        except Exception as ex:
            raise RuntimeError("EXTRACTION_FAILURE|" + f"{type(ex).__name__}: {ex}")
        e["turn_count"] = len(conv["turns"]); e["title"] = conv["title"]
        e["content_hash"] = content_hash(conv); e["structure_hash"] = structure_hash(conv)
        e["structure_types"] = structures(conv, inner)
        e["findings"] = findings(inner, conv)
        e["_turn_hashes"] = turn_hashes(conv); e["_nrec"] = nrec
        convs[u] = (conv, inner)
        print(f"  ok   {e['source_filename']:22} {e['share_id']} turns={e['turn_count']:<3} hash={e['content_hash'][:10]} {e['structure_types']}")
    except RuntimeError as ex:
        kind, _, msg = str(ex).partition("|")
        e["status"] = kind; e["error"] = msg
        print(f"  FAIL {e['source_filename']:22} {kind}: {msg[:100]}")

# ------------------------------------------------------------------ Phase B: deduplication by content hash
by_hash = {}
for u in gem_urls:
    h = entries[u]["content_hash"]
    if h: by_hash.setdefault(h, []).append(u)
order = {u: (0 if u in TESTED else 1, (list(TESTED).index(u) if u in TESTED else 0), entries[u]["source_filename"]) for u in gem_urls}
dup_groups = []
for h, us in by_hash.items():
    us = sorted(us, key=lambda x: order[x])
    if len(us) > 1:
        canon = us[0]
        dup_groups.append({"content_hash": h, "canonical_source_filename": entries[canon]["source_filename"], "canonical_url": canon, "duplicates": [entries[x]["source_filename"] for x in us[1:]]})
        for x in us[1:]:
            entries[x]["status"] = "DUPLICATE"; entries[x]["duplicate_of"] = {"source_filename": entries[canon]["source_filename"], "url": canon, "share_id": entries[canon]["share_id"]}
# subset / continuation relationships (not duplicates, but worth knowing)
relations = []
us = [u for u in gem_urls if entries[u].get("_turn_hashes")]
for a in us:
    for b in us:
        if a != b and entries[a]["content_hash"] != entries[b]["content_hash"]:
            ta, tb = entries[a]["_turn_hashes"], entries[b]["_turn_hashes"]
            if len(ta) < len(tb) and tb[:len(ta)] == ta:
                relations.append({"shorter": entries[a]["source_filename"], "is_prefix_of": entries[b]["source_filename"], "turns": [len(ta), len(tb)]})
print(f"dedupe: {len(dup_groups)} duplicate group(s): {[(g['canonical_source_filename'], g['duplicates']) for g in dup_groups]} | prefix relations: {relations}")

# ------------------------------------------------------------------ Phase C: unique remaining chats -> Markdown, checks, browser verification
for u in gem_urls:
    e = entries[u]
    if u in TESTED or e["status"] in ("DUPLICATE",) or u not in convs: continue
    conv, inner = convs[u]
    md = gp.render_markdown(conv, u, "self_checked")
    chk = payload_checks(conv, md, u, e["share_id"], e["_nrec"])
    e["payload_checks"] = {k: v["pass"] for k, v in chk.items()}
    failed = [k for k, v in chk.items() if not v["pass"]]
    leak = sum(1 for s in thought_strings(inner) if s in md)
    if leak: failed.append("reasoning_summaries_leaked_into_markdown")
    level, bdetail = "SELF_CONSISTENT_WITH_PAYLOAD", {}
    rendered = None
    if USE_BROWSER and not failed:
        total = sum(len(t["user_text"]) + len(t["gemini_text"]) for t in conv["turns"])
        rendered = browser_render(u, f"b_{e['share_id']}", total)
        if rendered and len(rendered) > 0.3 * total:
            level, bdetail = browser_level(conv, md, rendered, u)
        else:
            bdetail = {"browser": "render unavailable or incomplete; payload-level verification only", "rendered_chars": len(rendered or "")}
    e["verification_level"] = level; e["verification_detail"] = bdetail
    risky = [x for x in e["findings"] if x["risk"] == "content_loss"]
    if failed:
        e["status"] = "VERIFICATION_FAILURE"; e["error"] = f"payload checks failed: {failed}"
    elif level in ("BROWSER_COMPARED_UNEXPLAINED_GAP", "BROWSER_COMPARED_FAILED") or risky:
        e["status"] = "UNSUPPORTED_STRUCTURE"
        e["error"] = ("browser render contains tokens absent from the Markdown: " + str(bdetail.get("unexplained_tokens"))) if bdetail.get("unexplained_tokens") else f"content-loss-risk findings: {[x['kind'] for x in risky]}"
    else:
        e["status"] = "SUCCESS"
    final_status = "verified" if level == "VERIFIED_AGAINST_BROWSER" else "self_checked"
    if e["status"] in ("SUCCESS", "UNSUPPORTED_STRUCTURE", "VERIFICATION_FAILURE"):
        path = OUT / f"{e['share_id']}__{slug(conv['title'])}.md"
        if path.exists(): sys.exit(f"refusing to overwrite {path}")
        path.write_text(gp.render_markdown(conv, u, final_status), encoding="utf-8")
        e["output_path"] = str(path.relative_to(ROOT)); e["output_complete"] = e["status"] == "SUCCESS"
    print(f"  {e['status']:22} {e['source_filename']:22} level={level} out={e['output_path']}")

# ------------------------------------------------------------------ tested chats: canonical outputs + verification level (from existing evidence)
for u in gem_urls:
    if u not in TESTED: continue
    e, T = entries[u], TESTED[u]
    e["output_path"] = T["out"]; e["status"] = e["status"] or "SUCCESS"
    if u in convs:
        conv, inner = convs[u]
        md = gp.render_markdown(conv, u, "self_checked")
        if T["browser"] and (ROOT / T["browser"]).exists():
            lvl, det = browser_level(conv, md, (ROOT / T["browser"]).read_text(encoding="utf-8"), u)
        else:
            lvl, det = "SELF_CONSISTENT_WITH_PAYLOAD", {"note": "no browser reference captured for this chat"}
        e["verification_level"] = lvl; e["verification_detail"] = det
        e["output_complete"] = not [x for x in e["findings"] if x["risk"] == "content_loss"]

# ------------------------------------------------------------------ manifest
base = json.loads((LOGS / "parser_fix_baseline.json").read_text(encoding="utf-8"))["txt_sources_sha256"]
now_txt = {str(Path(t["location"]) / t["file"]): t["sha256"] for t in txts}
txt_unchanged = all(now_txt.get(k) == v for k, v in base.items()) and set(base) == set(now_txt)
ai_prior = json.loads((LOGS / "google_ai_mode_classification.json").read_text(encoding="utf-8"))
ai_entries = [{"source_filename": by_url[u][0]["file"], "source_url": u, "classification": "GOOGLE_AI_MODE_SHARE", "status": "SEPARATE_ADAPTER_REQUIRED",
               "note": "not fetched or processed in this batch"} for u in ai_urls]
for u, e in entries.items():
    e.pop("_turn_hashes", None); e.pop("_nrec", None)
statuses = Counter(e["status"] for e in entries.values())
uniq_hashes = {e["content_hash"] for e in entries.values() if e["content_hash"]}
manifest = {
    "generated_at": NOW(), "parser": {"file": "gemini_parse.py", "sha256": PARSER_SHA, "replay_script_sha256": sha_f(ROOT / "gemini_replay.py")},
    "totals": {"gemini_links": len(gem_urls), "previously_tested": len(TESTED), "newly_processed": len([u for u in gem_urls if u not in TESTED]),
               "status_counts": dict(statuses), "unique_conversations": len(uniq_hashes), "duplicate_groups": len(dup_groups),
               "ai_mode_links_not_processed": len(ai_urls), "other_links": len(other_urls)},
    "duplicate_groups": dup_groups, "prefix_relations": relations,
    "txt_sources": {"files_checked": len(now_txt), "all_byte_identical_to_baseline": txt_unchanged},
    "entries": [entries[u] for u in gem_urls], "google_ai_mode_entries": ai_entries,
}
MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
print("manifest written:", MANIFEST)
print("status counts:", dict(statuses), "| unique conversations:", len(uniq_hashes), "| TXT sources unchanged:", txt_unchanged)
