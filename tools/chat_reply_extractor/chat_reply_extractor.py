"""Chat reply extractor: strip prompts and metadata, keep only the LLM's replies.

Usage:
    python -I -X utf8 chat_reply_extractor.py SRC_DIR [--out OUT_DIR]

SRC_DIR  folder holding the chat-export .md files (e.g. .../markdown_files)
OUT_DIR  default: <SRC_DIR>/../markdown_files_cleaned
         chat_replies/        cleaned reply files
         documents_unchanged/ files that contain no prompts (copied as-is)
         audit/               one *_dropped.txt per cleaned file (what was removed)

The originals are never modified.

Handlers (one per export format)
  chatgpt_json  ChatGPT JSON export embedded in a .md file. Keeps assistant
                text parts only. Exact: relies on the role field, no guessing.
  perplexity    Perplexity-style export. A prompt is an H1 line that directly
                follows a '---' separator (or the logo / file start), outside
                code fences, plus any blank or '>' lines right after it.
  untitled      Slices out the reply passage by its first and last sentence.
  pdf_layout    PDF extraction with text-block bounding boxes. User bubbles
                are right-aligned (x0 ~ 202.28); replies start at x0 ~ 28.5.
  branch        Browser print of a shared ChatGPT chat (no layout data).
                BEST EFFORT: collapsed user bubbles ("..." + "Show more") are
                located by line width (bubble lines wrap near 66 chars, replies
                near 95), then duplicated table copies are collapsed. Check the
                audit file; some duplicate lines or bubble edges can remain.

Not covered: 'Define Research Prompt.md' (a HARPA chat print) was extracted by
hand from its full-page text blocks, so there is no script for it.
"""
import argparse
import glob
import hashlib
import json
import os
import re
import shutil
import sys

# --------------------------------------------------------------- config
CHATGPT_JSON_FILES = ["1.md", "411{.md", "422{.md", "kkk{.md", "qqa{.md", "qqq{.md", "{.md"]
UNCHANGED_DOCS = [
    "medium_research_access_engine_decision.md",
    "candidate_universe_reconciliation.md",
    "research_sources.md",
    "ure_research_source_pool_50.md",
    "requirements-medium-extractor.md",
]
YOUTUBE_GLOB = "https___youtu.be_638GQZ9UZ4w_si=*.md"
LOGO = re.compile(r"^<img src=\"https://r2cdn\.perplexity\.ai")


# --------------------------------------------------------------- helpers
def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read().replace("\r\n", "\n")


def write(path, text):
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)


def squeeze(lines):
    """Collapse runs of blank lines and trim the ends."""
    out, blank = [], 0
    for ln in lines:
        if ln.strip() == "":
            blank += 1
            if blank > 1:
                continue
        else:
            blank = 0
        out.append(ln)
    return "\n".join(out).strip() + "\n"


def norm(s):
    return re.sub(r"\s+", " ", s).strip()


# ------------------------------------------------------------ chatgpt_json
def chatgpt_json_name(name):
    base = name[:-3] if name.endswith(".md") else name
    return base.replace("{", "").strip() + "_replies.md"


def chatgpt_json(text):
    start = text.index("```json")
    body_start = text.index("\n", start) + 1
    body_end = text.index("\n```", body_start)
    data = json.loads(text[body_start:body_end])
    replies, total = [], 0
    for msg in data.get("messages", []):
        if (msg.get("author") or {}).get("role") != "assistant":
            continue
        total += 1
        content = msg.get("content") or {}
        if content.get("content_type") not in ("text", "multimodal_text"):
            continue
        parts = content.get("parts") or []
        body = "\n".join(p for p in parts if isinstance(p, str)).strip()
        if not body:
            meta = msg.get("metadata") or {}
            body = ((meta.get("model_dil_v2") or {}).get("fallbackMarkdown") or "").strip()
        if body:
            replies.append(body)
    lines = [f"# {data.get('title') or 'chat'}", ""]
    for i, body in enumerate(replies, 1):
        lines += [f"## Reply {i}", "", body, "", "---", ""]
    note = f"assistant messages={total}, replies kept={len(replies)}"
    return "\n".join(lines), note


# --------------------------------------------------------------- perplexity
def perplexity(text):
    lines = text.split("\n")
    kept, dropped = [], []
    in_fence = False
    last_nb = None
    i, n = 0, len(lines)
    while i < n:
        ln = lines[i]
        if LOGO.match(ln):
            dropped.append(("logo", [ln]))
            last_nb = "LOGO"
            i += 1
            continue
        if re.match(r"^\s*```", ln):
            in_fence = not in_fence
        is_prompt = (
            not in_fence
            and ln.startswith("# ")
            and last_nb in (None, "LOGO", "---")
        )
        if is_prompt:
            block = [ln]
            i += 1
            while i < n and (lines[i].strip() == "" or lines[i].startswith(">")):
                block.append(lines[i])
                i += 1
            while block and block[-1].strip() == "":
                block.pop()
            dropped.append(("prompt", block))
            kept.append("")
            last_nb = "PROMPT"
            continue
        kept.append(ln)
        if ln.strip():
            last_nb = ln.strip()
        i += 1
    return squeeze(kept), dropped


# ----------------------------------------------------------------- untitled
def untitled(text):
    lines = text.split("\n")
    start = next(i for i, l in enumerate(lines) if l.startswith("Yes—we need to preserve"))
    end = next(i for i, l in enumerate(lines) if "Is this the distinction you were pointing to" in l)
    dropped = [("outside reply (links, notes, pasted search URL)", lines[:start] + lines[end + 1:])]
    return squeeze(lines[start:end + 1]), dropped


# ------------------------------------------------------------------- x_post
def x_post(text):
    """The file opens with a pasted X post; the LLM replies follow it.
    Drops the leading post (up to and including its closing line)."""
    lines = text.split("\n")
    marker = "Your potential customers are literally telling you what they need help with"
    end = next((i for i, l in enumerate(lines[:60]) if l.strip().startswith(marker)), None)
    if end is None:
        raise ValueError("X-post closing line not found; refusing to guess")
    return squeeze(lines[end + 1:]), [("pasted X post", lines[: end + 1])]


# --------------------------------------------------------------- pdf_layout
BLOCK = re.compile(
    r"<!-- text block (\d+); bbox=\(([\d.]+), ([\d.]+), ([\d.]+), ([\d.]+)\) -->\n(.*?)(?=\n<!-- text block|\Z)",
    re.S,
)
TS = re.compile(r"^(Yesterday|Today|Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b.*\d+:\d+\s*[AP]M\s*$")
LABELS = {"Plain text", "JSON", "Markdown", "Python", "Bash"}


def pdf_layout(text):
    pages = re.split(r"\n## Page (\d+)\n", text)
    elems, dropped = [], []
    for k in range(1, len(pages), 2):
        pno, body = int(pages[k]), pages[k + 1]
        a = body.find("### Extracted text blocks")
        b = body.find("### Full-page text extraction")
        for m in BLOCK.finditer(body[a:b]):
            x0, y0 = float(m.group(2)), float(m.group(3))
            t = m.group(6).strip("\n")
            if not t.strip():
                continue
            if y0 < 27 or y0 > 810:  # page header / footer
                continue
            if t.strip() in LABELS or TS.match(t.strip()):
                continue
            if abs(x0 - 202.28) < 1.0:  # right-aligned user bubble
                dropped.append((f"user bubble p{pno}", [t]))
                continue
            elems.append((pno, x0, y0, t, abs(x0 - 41.25) < 1.0))
    out, para, in_code, prev = [], None, False, None
    for pno, x0, y0, t, code in elems:
        if code:
            if not in_code:
                if para is not None:
                    out.append(para)
                    para = None
                out.append("```")
                in_code = True
            out.extend(t.split("\n"))
            prev = (pno, x0, y0)
        else:
            if in_code:
                out.append("```")
                out.append("")
                in_code = False
            joinable = (
                para is not None
                and prev is not None
                and prev[0] == pno
                and (y0 - prev[2]) <= 22
                and not re.match(r"^(\d+\.|[-•*])\s", t)
            )
            if joinable:
                para += (" " if not para.endswith("\n") else "") + t
            else:
                if para is not None:
                    out.append(para)
                    out.append("")
                para = t
            prev = (pno, x0, y0)
    if para is not None:
        out.append(para)
    if in_code:
        out.append("```")
    return squeeze(out), dropped


# ------------------------------------------------------------------- branch
STAMP = re.compile(r"^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \w{3} \d+ at \d+:\d+ [AP]M$")
OPENER = re.compile(r"^(Yes|No|Good|Exactly|This is|The |Here|Right|Understood)\b")
CHAIN = {"…", "Show more"}
UILABELS = {"Markdown", "Plain text", "JSON", "Python", "Bash", "Text"}


def branch(text):
    raw = text.split("\n")
    dropped = []
    # 1. page chrome
    step = []
    for ln in raw:
        s = ln.strip()
        if ln.startswith("# Branch"):
            continue
        if re.match(r"^## Page \d+$", ln):
            continue
        if re.match(r"^\d+/\d+/\d+, \d+:\d+ [AP]M Branch", ln):
            continue
        if re.match(r"^https://chatgpt\.com/share/\S+ \d+/\d+$", s):
            continue
        step.append(ln)
    # 2. flatten the table copies
    flat, i, n = [], 0, len(step)
    while i < n:
        ln = step[i]
        if ln.lstrip().startswith("|"):
            row = [ln]
            while not row[-1].rstrip().endswith("|") and i + 1 < n:
                i += 1
                row.append(step[i])
            i += 1
            joined = "\n".join(row).strip()
            if re.fullmatch(r"\|?[\s:\-|]+\|?", joined) and "---" in joined:
                continue
            joined = re.sub(r"^\|\s?", "", joined)
            joined = re.sub(r"\s?\|$", "", joined)
            for cell_line in joined.split("\n"):
                cell_line = re.sub(r"\s\|\s*$", "", cell_line)
                cell_line = cell_line.replace(" |  | ", " ")
                flat.append(cell_line)
            continue
        flat.append(ln)
        i += 1
    flat = [l for l in flat if l.strip() and l.strip() not in UILABELS
            and not re.fullmatch(r"[\s|]*\d+/\d+[\s|]*", l)]
    flat = [re.sub(r"\s*\|\s*$", "", l) for l in flat]
    flat = [l for l in flat if l.strip() and l.strip() != "g"]
    # 3. user bubbles (before de-duplication so each copy stays contiguous)
    keep = [True] * len(flat)
    i = 0
    while i < len(flat):
        s = flat[i].strip()
        if s == "Show more" and i > 0 and flat[i - 1].strip() == "…":
            # bubble lines wrap near 66 chars; assistant lines near 95
            j = i - 2
            while j >= 0 and len(flat[j].rstrip()) <= 72:
                j -= 1
            lo = j + 1
            note = ""
            if (i - 1 - lo) > 17:
                lo = i - 1 - 17
                note = " (capped)"
            elif (
                lo <= i - 2
                and j >= 0
                and len(flat[lo].strip()) < 55
                and len(flat[j].rstrip()) > 80
            ):
                note = f" (kept as reply tail: {flat[lo].strip()[:40]})"
                lo += 1
            for t in range(lo, i + 1):
                keep[t] = False
            dropped.append(("collapsed user bubble" + note, flat[lo:i + 1]))
        elif STAMP.match(s):
            hit = None
            for t in range(i + 1, min(len(flat), i + 9)):
                if OPENER.match(flat[t].strip()):
                    hit = t
                    break
            keep[i] = False
            if hit is not None and hit > i:
                for t in range(i, hit):
                    keep[t] = False
                dropped.append(("short user bubble", flat[i:hit]))
            else:
                dropped.append(("timestamp", [flat[i]]))
        i += 1
    flat = [l for l, k in zip(flat, keep) if k]
    # 4. collapse copied runs (>= 3 repeated long lines)
    seen, dup = set(), []
    for l in flat:
        k = norm(l)
        if len(k) >= 20:
            dup.append(k in seen)
            seen.add(k)
        else:
            dup.append(None)  # neutral
    remove = [False] * len(flat)
    i = 0
    while i < len(flat):
        if dup[i] is True:
            j, cnt, last = i, 0, i
            while j < len(flat) and (dup[j] is True or dup[j] is None):
                if dup[j] is True:
                    cnt += 1
                    last = j
                j += 1
            if cnt >= 3:
                end = last
                while end + 1 < len(flat) and norm(flat[end + 1]) in CHAIN:
                    end += 1
                for t in range(i, end + 1):
                    remove[t] = True
                dropped.append(("duplicate copy", flat[i:end + 1]))
            i = j
        else:
            i += 1
    flat = [l for l, r in zip(flat, remove) if not r]
    return squeeze(flat), dropped


# --------------------------------------------------------------------- runner
def write_audit(aud_dir, name, dropped):
    parts = []
    for kind, block in dropped:
        parts.append(f"### {kind}")
        parts.extend(block)
        parts.append("")
    write(os.path.join(aud_dir, name + "_dropped.txt"), "\n".join(parts))


def main(argv=None):
    ap = argparse.ArgumentParser(description="Keep only the LLM replies from chat-export .md files.")
    ap.add_argument("src", help="folder with the chat-export .md files")
    ap.add_argument("--out", help="output folder (default: <src>/../markdown_files_cleaned)")
    ap.add_argument("--only", help="process only source files whose name contains this text")
    args = ap.parse_args(argv)
    only = args.only

    src = os.path.abspath(args.src)
    dst = os.path.abspath(args.out or os.path.join(src, "..", "markdown_files_cleaned"))
    out_dir = dst  # all cleaned .md files go flat into one folder
    doc_dir = dst
    aud_dir = os.path.join(dst, "audit")
    for d in (out_dir, doc_dir, aud_dir):
        os.makedirs(d, exist_ok=True)

    report = []

    def run(label, src_name, out_name, fn):
        if only and only not in src_name:
            return
        path = os.path.join(src, src_name)
        if not os.path.exists(path):
            report.append(f"{label}: SKIPPED, not found: {src_name}")
            return
        out, dropped = fn(read(path))
        write(os.path.join(out_dir, out_name), out)
        write_audit(aud_dir, out_name[:-3], dropped)
        kinds = {}
        for k, _ in dropped:
            key = k.split(" p")[0]
            kinds[key] = kinds.get(key, 0) + 1
        report.append(f"{label}: wrote {out_name} ({len(out)} chars); dropped {kinds}")

    for name in CHATGPT_JSON_FILES:
        if only and only not in name:
            continue
        path = os.path.join(src, name)
        if not os.path.exists(path):
            report.append(f"{name}: SKIPPED, not found")
            continue
        out, note = chatgpt_json(read(path))
        out_name = chatgpt_json_name(name)
        write(os.path.join(out_dir, out_name), out)
        report.append(f"{name}: wrote {out_name}; {note}")

    for name in UNCHANGED_DOCS:
        if only and only not in name:
            continue
        path = os.path.join(src, name)
        if os.path.exists(path):
            shutil.copyfile(path, os.path.join(doc_dir, name))
            report.append(f"{name}: copied unchanged")

    run("kaka", "kaka.md", "kaka_replies.md", perplexity)
    run("Deliverable A", "Deliverable A — Inventory Integrity Report.md",
        "Deliverable_A_Inventory_Integrity_Report_replies.md", perplexity)

    yt = sorted(glob.glob(os.path.join(src, YOUTUBE_GLOB)))
    if yt:
        digests = {hashlib.sha256(open(p, "rb").read()).hexdigest() for p in yt}
        report.append(f"YouTube copies: {len(yt)} file(s), identical={len(digests) == 1}")
        run("YouTube notes", os.path.basename(yt[0]), "youtu_638GQZ9UZ4w_replies.md", perplexity)

    run("Untitled document", "Untitled document.md", "Untitled_document_replies.md", untitled)
    run("X post + replies", "This is my favorite hack for findin.md",
        "This_is_my_favorite_hack_replies.md", x_post)
    run("Content Discovery Engine", "Content Discovery Engine.md",
        "Content_Discovery_Engine_replies.md", pdf_layout)

    branch_files = glob.glob(os.path.join(src, "Branch*.md"))
    if branch_files:
        run("Branch chat", os.path.basename(branch_files[0]),
            "Branch_Validate_Registry_Architecture_replies.md", branch)

    print("\n".join(report))
    return 0


if __name__ == "__main__":
    sys.exit(main())
