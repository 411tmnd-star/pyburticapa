"""Parser, extractor, Markdown renderer and verifier for the observed Gemini `ujx1Bf` batchexecute response.

Field paths were derived from one response and checked against the browser-rendered page
(see debug/payload_mapping.md). Every accessor fails loudly if the shape differs, so a changed
payload cannot be silently mis-extracted.
"""
import datetime
import json
import re


# ---------------------------------------------------------------- batchexecute framing
def parse_batchexecute(raw):
    """Return the list of JSON chunks (each a list of entries) from a batchexecute response body."""
    text = raw.decode("utf-8") if isinstance(raw, (bytes, bytearray)) else raw
    if text.startswith(")]}'"):
        text = text[4:]
    chunks = []
    for line in text.split("\n"):
        line = line.strip()
        if not line or line.isdigit():
            continue
        if line[0] == "[":
            chunks.append(json.loads(line))
    return chunks


def rpc_payloads(chunks, rpc_id):
    """Decoded inner JSON for every `wrb.fr` entry of the given RPC id."""
    out = []
    for chunk in chunks:
        for entry in chunk:
            if isinstance(entry, list) and len(entry) > 2 and entry[0] == "wrb.fr" and entry[1] == rpc_id:
                out.append(json.loads(entry[2]) if isinstance(entry[2], str) else entry[2])
    return out


# ---------------------------------------------------------------- field extraction
def _get(x, *path):
    for i in path:
        try:
            x = x[i]
        except (IndexError, TypeError, KeyError):
            raise ValueError(f"payload shape differs at path {list(path)} (failed on index {i})")
    return x


def _find_lists(x, pred):
    """Depth-first yield of every list in x satisfying pred."""
    if isinstance(x, list):
        if pred(x):
            yield x
        for v in x:
            yield from _find_lists(v, pred)


def _is_attachment(l):
    return (len(l) > 11 and isinstance(l[2], str) and isinstance(l[3], str) and l[3].startswith("http")
            and isinstance(l[11], str) and "/" in l[11])


def _is_video_card(l):
    return (len(l) > 9 and isinstance(l[0], str) and isinstance(l[2], str)
            and re.match(r"https?://www\.youtube\.com/watch\?v=", l[2] or "") and isinstance(l[3], str))


def _is_name_only_attachment(l):
    """Attachment/reference record that has a name but no URL and no MIME type (e.g. a Notebook reference)."""
    return (isinstance(l, list) and len(l) > 2 and isinstance(l[1], int) and not isinstance(l[1], bool)
            and isinstance(l[2], str) and l[2].strip() != ""
            and not (len(l) > 3 and isinstance(l[3], str) and l[3].startswith("http"))
            and not (len(l) > 11 and isinstance(l[11], str)))


def _action_labels(x):
    """Button labels from a list of [label, ...] entries, else []."""
    if not isinstance(x, list):
        return []
    return [e[0] for e in x if isinstance(e, list) and e and isinstance(e[0], str) and e[0].strip()]


def _is_action_card(l):
    """Confirmation/action card record: [null, title, description, ..., [[primary label,..]], null, [[secondary label,..]], ...]."""
    return (isinstance(l, list) and len(l) > 8 and l[0] is None and isinstance(l[1], str) and l[1].strip() != ""
            and isinstance(l[2], str) and bool(_action_labels(l[6]) + _action_labels(l[8])))


def _dict_values(x):
    """Every value held by a JSON object anywhere inside x."""
    if isinstance(x, dict):
        for v in x.values():
            yield v
            yield from _dict_values(v)
    elif isinstance(x, list):
        for v in x:
            yield from _dict_values(v)


def _fmt_views(n):
    if not isinstance(n, int): return None
    return f"{n/1000:.1f}K views" if n >= 1000 else f"{n} views"


def _iso(ts):
    return datetime.datetime.fromtimestamp(ts[0], datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def extract_conversation(inner):
    head = _get(inner, 0)
    turns_raw = _get(head, 1)
    meta = _get(head, 2)
    conv = {"title": meta[1] if isinstance(meta[1], str) else "",
            "model": _get(meta, 7, 2) if len(meta) > 7 and meta[7] else None,
            "share_id": _get(head, 3), "published_utc": _iso(_get(head, 4)), "turns": []}
    for i, t in enumerate(turns_raw):
        ids = _get(t, 0)
        user_block = _get(t, 2, 0)
        user_text = user_block[0] if isinstance(user_block[0], str) else ""
        cand = _get(t, 3, 0, 0)
        gem_text = _get(cand, 1, 0)
        if not isinstance(gem_text, str):
            raise ValueError(f"turn {i}: Gemini text is not a string")
        found = list(_find_lists(user_block[4:5], _is_attachment))
        atts = [{"name": a[2], "mime": a[11], "url": a[3]} for a in found]
        refs = atts
        try:
            records = user_block[4][0][3]
        except (IndexError, TypeError, KeyError):
            records = None
        if isinstance(records, list) and any(_is_name_only_attachment(r) for r in records):
            refs, used = [], set()
            for r in records:
                if _is_name_only_attachment(r):
                    refs.append({"name": r[2], "mime": None, "url": None})
                else:
                    for a in found:
                        if a is r:
                            refs.append({"name": a[2], "mime": a[11], "url": a[3]})
                            used.add(id(a))
            refs += [{"name": a[2], "mime": a[11], "url": a[3]} for a in found if id(a) not in used]
        action_cards, seen_ac = [], set()
        for v in _dict_values(cand):
            if _is_action_card(v):
                labels = _action_labels(v[6]) + _action_labels(v[8])
                key = (v[1], v[2], tuple(labels))
                if key not in seen_ac:
                    seen_ac.add(key)
                    action_cards.append({"title": v[1], "description": v[2], "actions": labels})
        cards, seen = [], set()
        for c in _find_lists(cand, _is_video_card):
            if c[2] in seen: continue
            seen.add(c[2])
            cards.append({"title": c[0], "url": c[2], "channel": c[3], "views": c[7] if len(c) > 7 else None,
                          "duration": c[9] if len(c) > 9 else None, "published": c[10] if len(c) > 10 else None})
        conv["turns"].append({"index": i, "conversation_id": ids[0], "response_id": ids[1],
                              "user_text": user_text, "attachments": atts, "attachment_refs": refs,
                              "gemini_text": gem_text, "cards": cards, "action_cards": action_cards,
                              "timestamp_utc": _iso(_get(t, 4))})
    return conv


# ---------------------------------------------------------------- Markdown rendering
def _yaml(s):
    return '"' + str(s).replace("\\", "\\\\").replace('"', '\\"') + '"'


def render_markdown(conv, source_url, status):
    L = ["---", "source_type: gemini_shared_chat", f"source_url: {_yaml(source_url)}", f"share_id: {_yaml(conv['share_id'])}",
         f"conversion_status: {status}", f"title: {_yaml(conv['title'])}"]
    if conv["model"]: L.append(f"model: {_yaml(conv['model'])}")
    L += [f"published_utc: {_yaml(conv['published_utc'])}", f"turn_count: {len(conv['turns'])}", "---", "",
          "# Gemini Conversation", ""]
    for t in conv["turns"]:
        L += [f"<!-- turn {t['index'] + 1} | response_id {t['response_id']} | {t['timestamp_utc']} -->", "", "## User", ""]
        if t["user_text"].strip():
            L += [t["user_text"].rstrip(), ""]
        refs = t.get("attachment_refs", t["attachments"])
        for a in refs:
            if a["url"]:
                L += [f"> **Attachment:** `{a['name']}` ({a['mime']}) {a['url']}", ""]
            else:
                L += [f"> **Attachment:** `{a['name']}`", ""]
        if not t["user_text"].strip() and not refs:
            L += ["*(empty)*", ""]
        L += ["## Gemini", "", t["gemini_text"].rstrip(), ""]
        for c in t["cards"]:
            bits = [c["channel"], _fmt_views(c["views"]), c["duration"], c["published"]]
            L += [f"> **Embedded video card:** [{c['title']}]({c['url']}) — " + " · ".join(b for b in bits if b), ""]
        for c in t.get("action_cards", []):
            L += [f"> **Action card:** {c['title']}", f"> {c['description']}", f"> **Actions:** " + " · ".join(c["actions"]), ""]
    return "\n".join(L).rstrip() + "\n"


# ---------------------------------------------------------------- verification
_tok = lambda s: re.findall(r"[a-z0-9']{3,}", s.lower())
_CITE = re.compile(r"\[cite: ?[\d, ]+\]")


def split_md_turns(md):
    """Split rendered Markdown back into per-turn (user, gemini) text using the turn comment markers."""
    parts = re.split(r"^<!-- turn (\d+) \|[^>]*-->\s*$", md, flags=re.M)
    out = []
    for k in range(1, len(parts), 2):
        body = parts[k + 1]
        m = re.match(r"\s*## User\n(.*?)\n## Gemini\n(.*)\Z", body, re.S)
        if not m:
            out.append(None); continue
        out.append((m.group(1), m.group(2)))
    return out


def verify(conv, md, rendered, source_url, expected_turns=None, min_markdown_chars=5000):
    """expected_turns=None means no expected count was supplied (the check then only requires >= 1 turn)."""
    checks, warnings = {}, []
    ok = True

    def check(name, cond, detail=""):
        nonlocal ok
        checks[name] = {"pass": bool(cond), "detail": detail}
        ok = ok and bool(cond)

    turns = conv["turns"]
    if expected_turns is None:
        check("turn_count", len(turns) >= 1, f"{len(turns)} turns extracted (no expected count supplied)")
    else:
        check("turn_count", len(turns) == expected_turns, f"{len(turns)} turns extracted, expected {expected_turns}")
    check("source_url_in_front_matter", f'source_url: {_yaml(source_url)}' in md.split("\n---\n", 1)[0] + "\n", source_url)
    check("markdown_nonempty", len(md) > min_markdown_chars, f"{len(md)} chars")

    split = split_md_turns(md)
    check("markdown_turn_blocks", len(split) == len(turns) and all(split), f"{len(split)} blocks recovered from Markdown")
    check("role_order_user_then_gemini", md.count("\n## User\n") == len(turns) and md.count("\n## Gemini\n") == len(turns)
          and [m.group(1) for m in re.finditer(r"^## (User|Gemini)$", md, re.M)] == ["User", "Gemini"] * len(turns))

    # lossless round trip: every payload string is in the Markdown, in its own turn block, unchanged
    mismatch = []
    for t, blk in zip(turns, split):
        if not blk: continue
        if t["user_text"].strip() and t["user_text"].rstrip() not in blk[0]: mismatch.append((t["index"], "user"))
        if t["gemini_text"].rstrip() not in blk[1]: mismatch.append((t["index"], "gemini"))
    check("payload_text_preserved_verbatim_per_turn", not mismatch, f"mismatches: {mismatch}")

    # ordering vs browser-rendered "You said" markers
    marks = re.findall(r"^You said (.*)$", rendered, re.M)
    nonempty_users = [t for t in turns if t["user_text"].strip()]
    check("rendered_user_turn_count", len(marks) == len(nonempty_users),
          f"{len(marks)} 'You said' markers in render vs {len(nonempty_users)} non-empty user turns "
          f"({len(turns) - len(nonempty_users)} attachment-only turn(s))")
    order_ok = all(_tok(m)[:6] == _tok(t["user_text"])[:6] for m, t in zip(marks, nonempty_users))
    check("user_turn_order_matches_render", order_ok, "first words of each user turn match the rendered order")

    # token coverage, rendered -> markdown (nothing visible in the browser is missing)
    r_start = rendered.index("You said ")
    r_end = rendered.index("\nSign in\n\nGemini may display") if "\nSign in\n\nGemini may display" in rendered else len(rendered)
    r_body = rendered[r_start:r_end]
    # the page's "You said <preview>" headers are UI labels (often ellipsised), not conversation text
    r_body = "\n".join(l for l in r_body.split("\n") if not l.startswith("You said "))
    md_tokens = set(_tok(_CITE.sub("", md)))
    r_tokens = _tok(r_body)
    missing = [w for w in r_tokens if w not in md_tokens]
    cov = 1 - len(missing) / max(len(r_tokens), 1)
    check("rendered_text_covered_by_markdown", cov >= 0.995, f"{cov:.4%} of {len(r_tokens)} rendered word tokens present; missing sample {sorted(set(missing))[:10]}")
    # reverse: markdown content words not in render (cite markers, urls, metadata expected)
    md_content = "\n".join(t["user_text"] + "\n" + t["gemini_text"] for t in turns)
    md_content = _CITE.sub("", re.sub(r"https?://\S+", "", md_content))
    rset = set(_tok(rendered))
    extra = [w for w in _tok(md_content) if w not in rset]
    rcov = 1 - len(extra) / max(len(_tok(md_content)), 1)
    check("markdown_content_present_in_render", rcov >= 0.99, f"{rcov:.4%} of markdown word tokens appear in render; extra sample {sorted(set(extra))[:10]}")

    # distinctive phrases
    phrases = [l.strip() for l in r_body.splitlines() if 50 <= len(l.strip()) <= 140 and re.fullmatch(r"[A-Za-z0-9 ,.\-()'/:;?!%]+", l.strip())]
    phrases = phrases[:: max(1, len(phrases) // 40)][:40]
    norm = lambda s: re.sub(r"\s+", " ", re.sub(r"[*#`>_]", "", _CITE.sub("", s))).lower()
    nmd = norm(md)
    found = sum(norm(p) in nmd for p in phrases)
    check("distinctive_phrases_preserved", found >= int(0.9 * len(phrases)), f"{found}/{len(phrases)} sampled rendered lines found verbatim (formatting-normalised)")

    # code / tables / links
    src_text = "\n".join(t["user_text"] + "\n" + t["gemini_text"] for t in turns)
    fences_src, fences_md = len(re.findall(r"^```", src_text, re.M)), len(re.findall(r"^```", md, re.M))
    check("code_fences_match", fences_src == fences_md, f"{fences_src} fenced-code markers in payload text, {fences_md} in Markdown")
    if fences_src == 0:
        warnings.append("This conversation contains no fenced code blocks, so code preservation is untested by this sample.")
    tbl_src, tbl_md = len(re.findall(r"^\|.*\|\s*$", src_text, re.M)), len(re.findall(r"^\|.*\|\s*$", md, re.M))
    check("table_rows_match", tbl_src == tbl_md, f"{tbl_src} vs {tbl_md}")
    if tbl_src == 0:
        warnings.append("This conversation contains no tables, so table preservation is untested by this sample.")
    urls_src = set(re.findall(r"https?://[^\s)\]>*]+", src_text)) | {c["url"] for t in turns for c in t["cards"]} | {a["url"] for t in turns for a in t["attachments"]}
    urls_md = set(re.findall(r"https?://[^\s)\]>*]+", md))
    check("urls_preserved", urls_src <= urls_md, f"{len(urls_src)} payload URLs, {len(urls_src & urls_md)} present in Markdown")
    mdl_src = len(re.findall(r"\[[^\]]+\]\([^)]+\)", src_text))
    mdl_md = len(re.findall(r"\[[^\]]+\]\([^)]+\)", md))
    check("markdown_links_preserved", mdl_md >= mdl_src, f"{mdl_src} markdown links in payload text, {mdl_md} in output")

    # substantive content
    chars = sum(len(t["user_text"]) + len(t["gemini_text"]) for t in turns)
    check("substantive_content", chars > 0.9 * len(r_body) * 0.5, f"{chars} extracted characters vs {len(r_body)} rendered characters")
    cites = len(_CITE.findall(src_text))
    if cites:
        warnings.append(f"{cites} Gemini-internal '[cite: N]' source markers kept verbatim in Gemini text (the page renders them as file chips such as 'JPG').")
    if any(t["attachments"] for t in turns):
        warnings.append("Attachment filenames are masked by Gemini ('•••••••••.jpg'); attachment URLs are googleusercontent links that may expire.")
    return {"verified": ok, "checks": checks, "warnings": warnings, "extracted_characters": chars,
            "rendered_reference_characters": len(r_body)}
