#!/usr/bin/env python3
"""
mht_to_md.py - Google AI Mode .mht/.mhtml -> Markdown, in the same format as convert.py (ChatGPT JSON -> MD).

Only the conversation is extracted (your prompts + the AI replies). The AI Mode history sidebar, share/feedback
widgets and every other part of the page are ignored. Source files are only read, never modified.

Output per file:
    # <title>

    > **Messages:** N

    ---

    ## You
    <prompt>

    ---

    ## Google AI
    <reply>

    ---

Usage:
    python mht_to_md.py                      # converts *.mht / *.mhtml in this folder -> .\\converted
    python mht_to_md.py <file-or-folder> [--out <folder>]
"""

import argparse
import email
import email.policy
import re
import sys
from pathlib import Path

from bs4 import BeautifulSoup
from markdownify import markdownify as html_to_markdown

SPEAKER_USER = "You"
SPEAKER_AI = "Google AI"
JUNK_TAGS = ["script", "style", "noscript", "svg", "button", "form", "iframe", "link", "meta"]


def decode_part(part) -> str:
    raw = part.get_payload(decode=True)
    if raw is None:
        payload = part.get_payload()
        return payload if isinstance(payload, str) else ""
    for enc in [part.get_content_charset(), "utf-8", "cp1252", "latin-1"]:
        if not enc:
            continue
        try:
            return raw.decode(enc)
        except (LookupError, UnicodeDecodeError):
            continue
    return raw.decode("utf-8", errors="replace")


def read_html(path: Path) -> str:
    msg = email.message_from_bytes(path.read_bytes(), policy=email.policy.compat32)
    for part in msg.walk():
        if part.get_content_type() == "text/html":
            return decode_part(part)  # first text/html part is the page itself
    return ""


def clean_text(text: str) -> str:
    text = text.replace("\r\n", "\n").replace("\r", "\n").replace(" ", " ")
    text = "\n".join(line.rstrip() for line in text.split("\n"))
    return re.sub(r"\n{3,}", "\n\n", text).strip()


# Page furniture that Google renders inside/after a reply (share dialog, feedback form). Everything from the
# first of these lines to the end of the reply is dropped.
REPLY_TAIL_MARKERS = re.compile(
    r"^(#+\s*Share public link|Thanks for letting us know|Good response|Bad response|"
    r"This public link shares a thread)",
    re.IGNORECASE | re.MULTILINE,
)


def to_md(node) -> str:
    for dlg in node.find_all(attrs={"role": ["dialog", "menu", "listbox"]}):
        dlg.decompose()
    return clean_text(html_to_markdown(str(node), heading_style="ATX", bullets="-"))


def cut_reply_tail(text: str) -> str:
    m = REPLY_TAIL_MARKERS.search(text)
    if m:
        text = text[: m.start()]
    return re.sub(r"(\s*\n---\s*)+$", "", text).strip()


def find_title(soup) -> str:
    h1 = find_heading(soup, "h1", r"^AI Mode conversation:")
    if h1:
        return re.sub(r"^\s*AI Mode conversation:\s*", "", h1.get_text(" ", strip=True))
    if soup.title and soup.title.string:
        return re.sub(r"\s*-\s*Google Search\s*$", "", soup.title.string.strip())
    return ""


def find_heading(root, tag, prefix_re):
    """First <tag> under root whose full text starts with prefix_re (text may be split across child tags)."""
    pat = re.compile(prefix_re)
    for el in root.find_all(tag):
        if pat.match(el.get_text(" ", strip=True)):
            return el
    return None


def extract_turns(soup):
    """Return [(speaker, markdown)] in page order. One 'turn' block holds a prompt and its reply."""
    messages = []
    for turn in soup.find_all(attrs={"data-scope-id": "turn"}):
        h2 = find_heading(turn, "h2", r"^You said:")
        if h2:
            # the prompt text is the block that follows the "You said:" heading
            body = h2.find_next_sibling("div")
            text = to_md(body) if body else re.sub(r"^\s*You said:\s*", "", h2.get_text(" ", strip=True))
            if body:  # drop the time stamp (e.g. "13:15") that sits next to the prompt text
                for stamp in body.find_all(string=re.compile(r"^\d{1,2}:\d{2}$")):
                    stamp.extract()
                text = to_md(body)
            if text:
                messages.append((SPEAKER_USER, text))
        h3 = find_heading(turn, "h3", r"^AI Mode reply for")
        if h3:
            container = h3.parent
            reply = container.find(attrs={"jsname": "KFl8ub"}) or h3.find_next_sibling("div")
            text = cut_reply_tail(to_md(reply)) if reply else ""
            if text:
                messages.append((SPEAKER_AI, text))
    return messages


def convert_file(path: Path, out_dir: Path):
    try:
        html = read_html(path)
        if not html:
            raise ValueError("no text/html part in file")
        soup = BeautifulSoup(html, "html.parser")
        for tag_name in JUNK_TAGS:
            for tag in soup.find_all(tag_name):
                tag.decompose()
        messages = extract_turns(soup)
        if not messages:
            raise ValueError("no AI Mode conversation found")
        title = find_title(soup) or path.stem

        out = [f"# {title}", "", f"> **Messages:** {len(messages)}", "", "---", ""]
        for speaker, text in messages:
            out += [f"## {speaker}", "", text, "", "---", ""]

        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / f"{path.stem}.md"
        out_file.write_text("\n".join(out), encoding="utf-8", newline="\n")
        return len(messages), out_file
    except Exception as e:  # noqa: BLE001
        print(f"❌ FAILED: {path.name}")
        print(f"   {e}")
        return None, None


def main() -> int:
    ap = argparse.ArgumentParser(description="Google AI Mode MHT -> Markdown (convert.py format).")
    ap.add_argument("input", nargs="?", default=".", help="file or folder (default: current folder)")
    ap.add_argument("--out", default="converted", help="output folder (default: .\\converted)")
    args = ap.parse_args()
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    src = Path(args.input)
    files = [src] if src.is_file() else sorted(
        f for f in src.rglob("*") if f.is_file() and f.suffix.lower() in (".mht", ".mhtml")
    )
    out_dir = Path(args.out)

    print()
    print("=" * 55)
    print(" Google AI Mode MHT → Markdown BULK CONVERTER")
    print("=" * 55)
    print(f"Found: {len(files)} MHT files")
    print()

    ok = failed = 0
    for f in files:
        count, out_file = convert_file(f, out_dir)
        if out_file:
            ok += 1
            print(f"✓ {f.name} → {out_file.name} ({count} messages)")
        else:
            failed += 1

    print()
    print("=" * 55)
    print(" BULK CONVERSION COMPLETE")
    print("=" * 55)
    print(f"Successful: {ok}")
    print(f"Failed:     {failed}")
    print(f"Output:     {out_dir.resolve()}")
    print("=" * 55)
    return 0 if ok and not failed else 1


if __name__ == "__main__":
    raise SystemExit(main())
