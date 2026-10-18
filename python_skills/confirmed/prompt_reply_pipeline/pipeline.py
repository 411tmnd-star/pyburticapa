"""Prompt/reply pipeline: separate prompts from replies in chat-export .md/.json files,
prepare the replies for an LLM, call a local Ollama model, and verify its output in code.

Usage (run with:  python -I -X utf8 pipeline.py <command> ...):
  separate  SRC_DIR OUT_DIR     stage 1: replies/ prompts/ unsure/ logs/   (no model)
  prepare   OUT_DIR             stage 2: sections, dedup, facts, index     (no model)
  llm       OUT_DIR --model M   stage 3: Ollama classifies each section    (needs Ollama)
  verify    OUT_DIR             stage 4: quote/label checks, counts        (no model)
  all       SRC_DIR OUT_DIR     stages 1+2 (add --model to include 3+4)
  selftest  SRC_DIR             golden checks; exits non-zero on any failure

Guarantees (what the code enforces, not what a model promises)
  * Originals are only read. Their SHA-256 is recorded and re-checked at the end.
  * Every message/block gets exactly one label; the counts must add up or the run fails.
  * Labels:  certain  = an explicit marker proves it (ChatGPT JSON `role` field)
             rule     = a text rule decided it (printed Perplexity-style Markdown)
             unsure   = nothing proved it; goes to unsure/, never to replies/
  * Unknown structure is refused and sent to unsure/, never guessed.
  * Same input => byte-identical output (no randomness in stages 1, 2, 4).
"""
import argparse
import csv
import glob
import hashlib
import json
import os
import re
import sys
import urllib.request

VERSION = "1.0"
LOGO = re.compile(r'^<img src="https://r2cdn\.perplexity\.ai')
FOOT = re.compile(r"\[\^\d+_\d+\]")
FENCE_JSON = re.compile(r"```json[ \t]*\n(.*?)\n```", re.S)
LABELS = ("question", "pain", "objection", "workaround", "buying_signal", "product_gap",
          "claim", "decision", "constraint", "tool", "none")
STATUSES = ("VERIFIED", "SOURCE-REPORTED", "INFERRED", "PROPOSED", "UNKNOWN", "CONFLICTING", "DEFERRED")


# ----------------------------------------------------------------- helpers
def sha256_bytes(b):
    return hashlib.sha256(b).hexdigest()


def read_text(path):
    with open(path, encoding="utf-8") as f:
        return f.read().replace("\r\n", "\n")


def write_text(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)


def write_json(path, obj):
    write_text(path, json.dumps(obj, ensure_ascii=False, indent=1, sort_keys=True) + "\n")


def norm(s):
    return re.sub(r"\s+", " ", s).strip()


def stem(name):
    base = os.path.splitext(name)[0]
    return re.sub(r"[^\w.-]+", "_", base).strip("_") or "file"


def list_inputs(src):
    out = []
    for p in sorted(glob.glob(os.path.join(src, "*"))):
        if os.path.isfile(p) and p.lower().endswith((".md", ".json", ".txt")):
            out.append(p)
    return out


# ------------------------------------------------------------ stage 1 handlers
def _chat_messages(data):
    """Return list of (role, content_type, text) from a ChatGPT export, or raise ValueError."""
    msgs = []
    if isinstance(data.get("messages"), list):
        raw = data["messages"]
    elif isinstance(data.get("mapping"), dict):
        nodes = [n["message"] for n in data["mapping"].values() if n.get("message")]
        raw = sorted(nodes, key=lambda m: (m.get("create_time") or 0))
    else:
        raise ValueError("no 'messages' list or 'mapping' tree")
    for m in raw:
        role = (m.get("author") or {}).get("role")
        if role not in ("user", "assistant", "system", "tool"):
            raise ValueError(f"unknown role {role!r}")
        c = m.get("content") or {}
        parts = c.get("parts") or []
        text = "\n".join(p for p in parts if isinstance(p, str)).strip()
        if not text:
            text = (((m.get("metadata") or {}).get("model_dil_v2") or {}).get("fallbackMarkdown") or "").strip()
        msgs.append((role, c.get("content_type"), text))
    return msgs


def handle_chatgpt_json(text):
    m = FENCE_JSON.search(text) if "```json" in text[:600] else None
    body = m.group(1) if m else (text if text.lstrip().startswith("{") else None)
    if body is None:
        raise ValueError("no JSON block")
    data = json.loads(body)
    msgs = _chat_messages(data)
    res = {"replies": [], "prompts": [], "other": [], "empty": []}
    for i, (role, ctype, t) in enumerate(msgs, 1):
        if not t:
            res["empty"].append({"n": i, "role": role, "content_type": ctype})
        elif role == "assistant":
            res["replies"].append({"n": i, "text": t, "certainty": "certain"})
        elif role == "user":
            res["prompts"].append({"n": i, "text": t, "certainty": "certain"})
        else:
            res["other"].append({"n": i, "role": role, "chars": len(t)})
    res["title"] = data.get("title")
    res["total"] = len(msgs)
    return res


def handle_perplexity(text):
    """A prompt is an H1 line directly after the logo, a '---' line, or file start (outside
    code fences), plus blank / '>' lines right after it. Everything else is reply text."""
    lines = text.split("\n")
    replies, prompts = [], []
    cur, in_fence, last_nb, i, n = [], False, None, 0, len(lines)

    def flush():
        nonlocal cur
        body = "\n".join(cur).strip()
        if body:
            replies.append({"n": len(replies) + 1, "text": body, "certainty": "rule"})
        cur = []

    while i < n:
        ln = lines[i]
        if LOGO.match(ln):
            last_nb = "LOGO"
            i += 1
            continue
        if re.match(r"^\s*```", ln):
            in_fence = not in_fence
        if not in_fence and ln.startswith("# ") and last_nb in (None, "LOGO", "---"):
            flush()
            block = [ln]
            i += 1
            while i < n and (lines[i].strip() == "" or lines[i].startswith(">")):
                block.append(lines[i])
                i += 1
            prompts.append({"n": len(prompts) + 1, "text": "\n".join(block).strip(), "certainty": "rule"})
            last_nb = "PROMPT"
            continue
        cur.append(ln)
        if ln.strip():
            last_nb = ln.strip()
        i += 1
    flush()
    return {"replies": replies, "prompts": prompts, "other": [], "empty": [], "total": len(replies) + len(prompts)}


# ------------------------------------------------- speaker_md (converter output)
# Markdown written by the existing converters (knowledge_extraction/v2/convert.py, jsonl_to_md.py,
# mht_to_md.py). Shape: "# title", "> **Messages:** N", then one "## <Speaker>" block per message.
# Accepted only if every speaker heading is known AND their count equals N; otherwise refused.
SPEAKER_ROLE = {"You": "prompt", "User": "prompt", "ChatGPT": "reply", "Claude": "reply",
                "Google AI": "reply", "Assistant": "reply"}
MSG_COUNT = re.compile(r"^> \*\*Messages:\*\* (\d+)\s*$", re.M)


def is_speaker_md(text):
    head = text[:4000]
    return bool(re.match(r"\s*# [^\n]+\n", head)) and MSG_COUNT.search(head) is not None


def handle_speaker_md(text):
    m = MSG_COUNT.search(text)
    if not m:
        raise ValueError("no '> **Messages:** N' header")
    declared = int(m.group(1))
    body = text[m.end():]
    # Only KNOWN speaker headings start a message. Any other "## " line is reply text (real assistant
    # replies contain their own headings). A reply that contains a speaker-named heading inflates the
    # count and is refused by the count check below, so it is never silently mis-split.
    blocks, cur = [], None
    for line in body.split("\n"):
        h = re.match(r"^## (.+?)\s*$", line)
        if h and h.group(1) in SPEAKER_ROLE:
            cur = {"speaker": h.group(1), "lines": []}
            blocks.append(cur)
        elif cur is not None:
            cur["lines"].append(line)
    if len(blocks) != declared:
        raise ValueError(f"header declares {declared} messages but {len(blocks)} speaker blocks found; refused, not guessed")
    res = {"replies": [], "prompts": [], "other": [], "empty": [], "total": len(blocks)}
    for i, b in enumerate(blocks, 1):
        t = "\n".join(b["lines"]).strip()
        t = re.sub(r"(\s*\n---\s*)+$", "", t).strip()
        if not t:
            res["empty"].append({"n": i, "role": b["speaker"], "content_type": None})
            continue
        kind = SPEAKER_ROLE[b["speaker"]]
        res["replies" if kind == "reply" else "prompts"].append({"n": i, "text": t, "certainty": "certain"})
    return res


def detect(text):
    head = text[:600]
    if "```json" in head or head.lstrip().startswith("{"):
        return "chatgpt_json"
    if is_speaker_md(text):
        return "speaker_md"
    if LOGO.match(text.split("\n", 1)[0]) or len(FOOT.findall(text)) >= 3:
        return "perplexity"
    return "unknown"


def separate_one(path, out):
    name = os.path.basename(path)
    raw = open(path, "rb").read()
    text = raw.decode("utf-8").replace("\r\n", "\n")
    st = stem(name)
    log = {"file": name, "sha256": sha256_bytes(raw), "bytes": len(raw), "pipeline": VERSION}
    kind = detect(text)
    log["format"] = kind
    try:
        if kind == "chatgpt_json":
            res = handle_chatgpt_json(text)
        elif kind == "perplexity":
            res = handle_perplexity(text)
        elif kind == "speaker_md":
            res = handle_speaker_md(text)
        else:
            # DOCUMENT_BUCKET: no role markers and no known export format. By decision these are treated as
            # documents: kept byte-for-byte, never split into prompts/replies, never claimed to be replies.
            log["status"] = "document"
            log["reason"] = "no role markers; treated as a document by decision (may contain prompts)"
            write_text(os.path.join(out, "documents", st + ".md"), text)
            write_json(os.path.join(out, "logs", st + ".json"), log)
            return log
    except Exception as e:  # unknown structure: send everything to unsure, never guess
        log["status"] = "refused"
        log["reason"] = str(e)
        write_text(os.path.join(out, "unsure", st + ".md"),
                   f"# {name}\n\nREFUSED: {e}\n\n(Whole file not classified; see the original.)\n")
        write_json(os.path.join(out, "logs", st + ".json"), log)
        return log
    for kind_dir, key in (("replies", "replies"), ("prompts", "prompts")):
        if res[key]:
            body = [f"# {name} — {kind_dir}", ""]
            for item in res[key]:
                body += [f"## {'Reply' if kind_dir == 'replies' else 'Prompt'} {item['n']} [{item['certainty']}]", "", item["text"], "", "---", ""]
            write_text(os.path.join(out, kind_dir, st + ".md"), "\n".join(body))
    counts = {k: len(res[k]) for k in ("replies", "prompts", "other", "empty")}
    log.update({"status": "ok", "counts": counts, "total_blocks": res["total"],
                "other": res["other"], "empty": res["empty"], "title": res.get("title")})
    if kind == "chatgpt_json" and sum(counts.values()) != res["total"]:
        raise SystemExit(f"COUNT MISMATCH in {name}: {counts} vs {res['total']}")
    write_json(os.path.join(out, "logs", st + ".json"), log)
    return log


def cmd_separate(src, out):
    logs = [separate_one(p, out) for p in list_inputs(src)]
    summary = [{"file": l["file"], "format": l["format"], "status": l["status"],
                **(l.get("counts") or {}), "reason": l.get("reason", "")} for l in logs]
    write_json(os.path.join(out, "logs", "_summary.json"), summary)
    write_json(os.path.join(out, "logs", "_input_hashes.json"), {l["file"]: l["sha256"] for l in logs})
    return summary


# ------------------------------------------------------------ stage 2: prepare
URL = re.compile(r"https?://[^\s)\]>\"'`]+")
DATE = re.compile(r"\b(?:\d{4}-\d{2}-\d{2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.? \d{1,2},? \d{4})\b")
PRICE = re.compile(r"[$€£]\s?\d[\d,]*(?:\.\d+)?(?:/\w+| per \w+)?")
VERSION_RE = re.compile(r"\bv?\d+\.\d+(?:\.\d+)?\b")
LICENCE = re.compile(r"\b(?:MIT|Apache-2\.0|AGPL-3\.0|GPL-[123](?:\.\d)?|LGPL-\d(?:\.\d)?|BSD-[23](?:-Clause)?|MPL-2\.0|CC-BY-NC-4\.0|CC0|ELv2)\b")


def sections_of(md_text):
    """Split a replies/prompts file into blocks, keeping the reply number and block number."""
    out, reply = [], None
    for blk in re.split(r"\n\s*\n", md_text):
        b = blk.strip()
        if not b or b == "---":
            continue
        m = re.match(r"^## (?:Reply|Prompt) (\d+)", b)
        if m:
            reply = int(m.group(1))
            continue
        if b.startswith("# "):
            continue
        out.append((reply, b))
    return out


def cmd_prepare(out):
    rows, seen, dups, facts = [], {}, [], []
    for p in sorted(glob.glob(os.path.join(out, "replies", "*.md"))):
        st = os.path.splitext(os.path.basename(p))[0]
        for k, (reply, b) in enumerate(sections_of(read_text(p)), 1):
            sid = f"{st}:r{reply}:b{k}"
            h = sha256_bytes(norm(b).lower().encode())
            if h in seen:
                dups.append({"section": sid, "duplicate_of": seen[h]})
                continue
            seen[h] = sid
            rows.append({"id": sid, "source": st, "reply": reply, "block": k, "sha": h, "text": b})
            for kind, rx in (("url", URL), ("date", DATE), ("price", PRICE), ("version", VERSION_RE), ("licence", LICENCE)):
                for v in sorted(set(rx.findall(b))):
                    facts.append({"section": sid, "kind": kind, "value": v})
    write_text(os.path.join(out, "prepared", "sections.jsonl"),
               "".join(json.dumps(r, ensure_ascii=False, sort_keys=True) + "\n" for r in rows))
    write_json(os.path.join(out, "prepared", "duplicates.json"), dups)
    with open(os.path.join(out, "prepared", "facts.csv"), "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["section", "kind", "value"], lineterminator="\n")
        w.writeheader()
        w.writerows(facts)
    idx = {}
    for r in rows:
        idx.setdefault(r["source"], 0)
        idx[r["source"]] += 1
    write_json(os.path.join(out, "prepared", "index.json"), {"sections_per_source": idx, "unique_sections": len(rows),
                                                              "duplicates_removed": len(dups), "facts": len(facts)})
    return {"unique_sections": len(rows), "duplicates_removed": len(dups), "facts": len(facts)}


# --------------------------------------------------------- stage 3: Ollama (LLM)
PROMPT_VERSION = "p1"
INSTRUCTIONS = (
    "You classify one passage from an AI assistant's reply. Return ONLY JSON with keys: "
    "label (one of %s), status (one of %s), quote (an EXACT contiguous copy of up to 300 characters "
    "from the passage that supports the label, or empty if label is none), note (max 20 words). "
    "Never paraphrase the quote. Never invent text. Do not count anything." % (list(LABELS), list(STATUSES))
)


def ollama_generate(model, prompt, host="http://localhost:11434", seed=42, timeout=300):
    body = json.dumps({"model": model, "prompt": prompt, "stream": False, "format": "json",
                       "options": {"temperature": 0, "seed": seed}}).encode()
    req = urllib.request.Request(host + "/api/generate", data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read())["response"]


def cmd_llm(out, model, generate=ollama_generate, limit=None):
    cache_dir = os.path.join(out, "llm_cache")
    os.makedirs(cache_dir, exist_ok=True)
    rows = [json.loads(l) for l in open(os.path.join(out, "prepared", "sections.jsonl"), encoding="utf-8")]
    if limit:
        rows = rows[:limit]
    done = 0
    lines = []
    for r in rows:
        prompt = INSTRUCTIONS + "\n\nPASSAGE:\n" + r["text"][:6000]
        key = sha256_bytes((model + PROMPT_VERSION + prompt).encode())
        cp = os.path.join(cache_dir, key + ".json")
        if os.path.exists(cp):
            raw = json.load(open(cp, encoding="utf-8"))["raw"]
        else:
            raw = generate(model, prompt)  # raises if Ollama is unreachable: no silent fallback
            write_json(cp, {"model": model, "prompt_version": PROMPT_VERSION, "raw": raw})
            done += 1
        lines.append(json.dumps({"section": r["id"], "model": model, "raw": raw}, ensure_ascii=False, sort_keys=True))
    write_text(os.path.join(out, "llm_rows.jsonl"), "\n".join(lines) + ("\n" if lines else ""))
    return {"rows": len(rows), "new_calls": done}


# ------------------------------------------------------------ stage 4: verify
def cmd_verify(out):
    secs = {}
    for l in open(os.path.join(out, "prepared", "sections.jsonl"), encoding="utf-8"):
        r = json.loads(l)
        secs[r["id"]] = r
    accepted, rejected = [], []
    for l in open(os.path.join(out, "llm_rows.jsonl"), encoding="utf-8"):
        row = json.loads(l)
        sid = row["section"]
        try:
            d = json.loads(row["raw"])
            assert isinstance(d, dict)
        except Exception:
            rejected.append({"section": sid, "reason": "not valid JSON"})
            continue
        label, status, quote = d.get("label"), d.get("status"), d.get("quote", "")
        if label not in LABELS:
            rejected.append({"section": sid, "reason": f"label {label!r} not allowed"})
        elif label != "none" and status not in STATUSES:
            rejected.append({"section": sid, "reason": f"status {status!r} not allowed"})
        elif label != "none" and (not quote or norm(quote) not in norm(secs[sid]["text"])):
            rejected.append({"section": sid, "reason": "quote not found verbatim in source section"})
        else:
            accepted.append({"section": sid, "source": secs[sid]["source"], "label": label,
                             "status": status, "quote": quote, "note": d.get("note", "")})
    counts = {}
    for a in accepted:
        key = (a["source"], a["label"])
        counts[key] = counts.get(key, 0) + 1
    write_text(os.path.join(out, "verified", "accepted.jsonl"),
               "".join(json.dumps(a, ensure_ascii=False, sort_keys=True) + "\n" for a in accepted))
    write_text(os.path.join(out, "verified", "rejected.jsonl"),
               "".join(json.dumps(a, ensure_ascii=False, sort_keys=True) + "\n" for a in rejected))
    write_json(os.path.join(out, "verified", "counts.json"),
               {"accepted": len(accepted), "rejected": len(rejected),
                "by_source_label": {f"{s}|{l}": n for (s, l), n in sorted(counts.items())}})
    return {"accepted": len(accepted), "rejected": len(rejected)}


# ---------------------------------------------------------------- self-test
def selftest(src):
    import shutil
    import tempfile
    fails = []

    def check(cond, msg):
        print(("PASS " if cond else "FAIL ") + msg)
        if not cond:
            fails.append(msg)

    before = {os.path.basename(p): sha256_bytes(open(p, "rb").read()) for p in list_inputs(src)}
    with tempfile.TemporaryDirectory() as t1, tempfile.TemporaryDirectory() as t2:
        s1 = cmd_separate(src, t1)
        cmd_separate(src, t2)
        cmd_prepare(t1)
        cmd_prepare(t2)

        def tree(root):
            h = {}
            for dp, _, fs in os.walk(root):
                for f in fs:
                    p = os.path.join(dp, f)
                    h[os.path.relpath(p, root)] = sha256_bytes(open(p, "rb").read())
            return h
        check(tree(t1) == tree(t2), "two runs give byte-identical output")
        for row in s1:
            if row["format"] == "chatgpt_json" and row["status"] == "ok":
                tot = row["replies"] + row["prompts"] + row["other"] + row["empty"]
                log = json.load(open(os.path.join(t1, "logs", stem(row["file"]) + ".json"), encoding="utf-8"))
                check(tot == log["total_blocks"], f"{row['file']}: every message labelled exactly once ({tot})")
        # quote check: a fabricated quote must be rejected, a real one accepted
        secs = [json.loads(l) for l in open(os.path.join(t1, "prepared", "sections.jsonl"), encoding="utf-8")]
        if secs:
            real = secs[0]["text"][:40]
            rows = [
                {"section": secs[0]["id"], "model": "fake", "raw": json.dumps({"label": "claim", "status": "SOURCE-REPORTED", "quote": real, "note": ""})},
                {"section": secs[0]["id"], "model": "fake", "raw": json.dumps({"label": "claim", "status": "SOURCE-REPORTED", "quote": "this text was never written", "note": ""})},
                {"section": secs[0]["id"], "model": "fake", "raw": json.dumps({"label": "bogus", "status": "VERIFIED", "quote": real, "note": ""})},
                {"section": secs[0]["id"], "model": "fake", "raw": "not json"},
            ]
            write_text(os.path.join(t1, "llm_rows.jsonl"), "".join(json.dumps(r) + "\n" for r in rows))
            res = cmd_verify(t1)
            check(res == {"accepted": 1, "rejected": 3}, f"verify accepts real quote, rejects 3 bad rows ({res})")
    after = {os.path.basename(p): sha256_bytes(open(p, "rb").read()) for p in list_inputs(src)}
    check(before == after, "originals unchanged (SHA-256 identical)")
    print("RESULT:", "ALL PASS" if not fails else f"{len(fails)} FAILED")
    return 1 if fails else 0


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("command", choices=["separate", "prepare", "llm", "verify", "all", "selftest"])
    ap.add_argument("paths", nargs="*")
    ap.add_argument("--model")
    ap.add_argument("--limit", type=int)
    a = ap.parse_args(argv)
    c, p = a.command, a.paths
    if c == "selftest":
        return selftest(p[0])
    if c == "separate":
        print(json.dumps(cmd_separate(p[0], p[1]), indent=1)); return 0
    if c == "prepare":
        print(cmd_prepare(p[0])); return 0
    if c == "llm":
        print(cmd_llm(p[0], a.model, limit=a.limit)); return 0
    if c == "verify":
        print(cmd_verify(p[0])); return 0
    if c == "all":
        src, out = p
        before = {os.path.basename(x): sha256_bytes(open(x, "rb").read()) for x in list_inputs(src)}
        cmd_separate(src, out)
        print(cmd_prepare(out))
        if a.model:
            print(cmd_llm(out, a.model, limit=a.limit))
            print(cmd_verify(out))
        after = {os.path.basename(x): sha256_bytes(open(x, "rb").read()) for x in list_inputs(src)}
        if before != after:
            raise SystemExit("ORIGINALS CHANGED")
        print("originals unchanged")
        return 0


if __name__ == "__main__":
    sys.exit(main())
