"""
Step 2: fetch the full text of X Articles for each note in output_notes/ and append
it under "### Article", WITH the cover image and every inline image (plus article
links and code blocks). Free: uses the public fxtwitter API, no key, no Claude usage.

Works even when the note text has no /i/article/ link: the note's own source tweet is
checked and, if it is an article, it is fetched (notes checked with no article are
remembered in articles_checked.txt so re-runs don't re-ask).

Notes whose article was fetched by an older version of this script (text only) get an
extra "### Article Images" section with the cover + inline images, in reading order.
Images are remote URLs here; download_videos.py saves them locally and relinks the notes.

Usage:
    python fetch_articles.py --dry-run     # list notes that would be updated
    python fetch_articles.py --limit 3     # test on 3 notes first
    python fetch_articles.py               # everything

Safe to stop and re-run. Failures are logged to failed_articles.txt.
"""

import argparse
import re
import sys
import time
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parent
NOTES_DIR = ROOT / "output_notes"
FAILED_LOG = ROOT / "failed_articles.txt"
CHECKED_LOG = ROOT / "articles_checked.txt"

MARKER = "### Article"
IMG_MARKER = "<!-- article-images -->"
HAS_ARTICLE_RE = re.compile(r"^### Article(?!\s+(?:Images|Preview))", re.M)
ARTICLE_RE = re.compile(r"https?://(?:www\.)?(?:x|twitter)\.com/i/article/(\d+)")
STATUS_RE = re.compile(r"https?://(?:www\.)?(?:x|twitter)\.com/([^/\s)>\]]+)/status/(\d+)")
SLEEP_BETWEEN = 1.5
MAX_RETRIES = 4


def fetch_status(user: str, tweet_id: str):
    """Return the tweet dict from fxtwitter, or None. Retries on 429/5xx/network errors."""
    url = f"https://api.fxtwitter.com/{user}/status/{tweet_id}"
    for attempt in range(MAX_RETRIES):
        try:
            r = requests.get(url, timeout=20, headers={"User-Agent": "Mozilla/5.0"})
            if r.status_code == 200:
                return r.json().get("tweet")
            if r.status_code == 429 or r.status_code >= 500:
                time.sleep(5 * (2 ** attempt))
                continue
            return None
        except (requests.RequestException, ValueError):
            time.sleep(5 * (2 ** attempt))
    return None


# --------------------------------------------------------------------------- images

def _media_url(entity: dict):
    """Best URL for one article media entity (image, or video/gif if that's what it is)."""
    info = (entity or {}).get("media_info") or {}
    if info.get("original_img_url"):
        return info["original_img_url"]
    variants = info.get("variants") or []
    mp4 = [v for v in variants if v.get("url") and "mp4" in (v.get("content_type") or v.get("type") or "mp4")]
    if mp4:
        return max(mp4, key=lambda v: v.get("bit_rate") or v.get("bitrate") or 0)["url"]
    return info.get("preview_image", {}).get("original_img_url") if isinstance(info.get("preview_image"), dict) else None


def _media_map(article: dict) -> dict:
    """media_id -> URL for every media entity of the article."""
    out = {}
    for ent in article.get("media_entities") or []:
        url = _media_url(ent)
        if url:
            out[str(ent.get("media_id"))] = url
    return out


def _entity_map(article: dict) -> dict:
    """entityMap arrives as [{key, value}, ...] (or a dict); normalise to {str(key): value}."""
    raw = (article.get("content") or {}).get("entityMap") or []
    if isinstance(raw, dict):
        return {str(k): v for k, v in raw.items()}
    return {str(e.get("key")): e.get("value") or {} for e in raw if isinstance(e, dict)}


def _cover_url(article: dict):
    return _media_url(article.get("cover_media") or {})


def _atomic_media_urls(block: dict, entities: dict, media: dict) -> list:
    """Image/video URLs referenced by one `atomic` block."""
    urls = []
    for r in block.get("entityRanges") or []:
        ent = entities.get(str(r.get("key"))) or {}
        if ent.get("type") != "MEDIA":
            continue
        for item in (ent.get("data") or {}).get("mediaItems") or []:
            url = media.get(str(item.get("mediaId")))
            if url:
                urls.append(url)
    return urls


def article_image_urls(article: dict) -> list:
    """Cover first, then inline images in reading order (no duplicates)."""
    entities, media = _entity_map(article), _media_map(article)
    urls = []
    cover = _cover_url(article)
    if cover:
        urls.append(cover)
    for b in (article.get("content") or {}).get("blocks", []):
        if b.get("type") == "atomic":
            urls.extend(_atomic_media_urls(b, entities, media))
    return list(dict.fromkeys(urls))


# --------------------------------------------------------------------------- text

def _link_text(block: dict, entities: dict) -> str:
    """Block text with LINK entities turned into [text](url). Offsets are UTF-16 units."""
    text = block.get("text") or ""
    ranges = []
    for r in block.get("entityRanges") or []:
        ent = entities.get(str(r.get("key"))) or {}
        url = (ent.get("data") or {}).get("url")
        if ent.get("type") == "LINK" and url:
            ranges.append((r.get("offset", 0), r.get("length", 0), url))
    if not ranges:
        return text
    raw = text.encode("utf-16-le")
    for off, length, url in sorted(ranges, reverse=True):
        a, b = off * 2, (off + length) * 2
        if length <= 0 or b > len(raw):
            continue
        label = raw[a:b].decode("utf-16-le", errors="ignore")
        raw = raw[:a] + f"[{label}]({url})".encode("utf-16-le") + raw[b:]
    return raw.decode("utf-16-le", errors="ignore")


def article_to_markdown(article: dict) -> str:
    """Convert fxtwitter's draft-js style blocks into markdown, keeping images and links."""
    entities, media = _entity_map(article), _media_map(article)
    out, n, img_no = [], 0, 0
    cover = _cover_url(article)
    if cover:
        out.append(f"![Article cover]({cover})")
    for b in (article.get("content") or {}).get("blocks", []):
        kind = b.get("type", "unstyled")
        if kind != "ordered-list-item":
            n = 0
        if kind == "atomic":
            for url in _atomic_media_urls(b, entities, media):
                if url == cover and img_no == 0:
                    continue  # cover already shown at the top
                img_no += 1
                out.append(f"![Article image {img_no}]({url})")
            for r in b.get("entityRanges") or []:  # embedded code / markdown blocks
                ent = entities.get(str(r.get("key"))) or {}
                md = (ent.get("data") or {}).get("markdown")
                if ent.get("type") == "MARKDOWN" and md:
                    out.append(md.strip())
            continue
        text = _link_text(b, entities).strip()
        if not text:
            continue
        if kind == "header-one":
            out.append(f"## {text}")
        elif kind == "header-two":
            out.append(f"### {text}")
        elif kind.startswith("header"):
            out.append(f"#### {text}")
        elif kind == "unordered-list-item":
            out.append(f"- {text}")
        elif kind == "ordered-list-item":
            n += 1
            out.append(f"{n}. {text}")
        elif kind == "blockquote":
            out.append(f"> {text}")
        elif kind == "code-block":
            out.append(f"```\n{text}\n```")
        else:
            out.append(text)
    # Join list items tightly, everything else as separate paragraphs.
    md, prev_list = "", False
    for line in out:
        is_list = line.startswith("- ") or re.match(r"\d+\. ", line) is not None
        md += ("\n" if (is_list and prev_list) else "\n\n") + line if md else line
        prev_list = is_list
    return md


def images_section(article: dict) -> str:
    """Images-only section, appended to notes whose article text was fetched earlier."""
    urls = article_image_urls(article)
    if not urls:
        return ""
    lines = [f"{MARKER} Images", IMG_MARKER, "_Images from the article above, in reading order._", ""]
    for i, url in enumerate(urls):
        lines.append(f"![{'Article cover' if i == 0 and url == _cover_url(article) else f'Article image {i}'}]({url})")
    return "\n".join(lines)


# --------------------------------------------------------------------------- notes

def log_failure(note: Path, reason: str) -> None:
    with open(FAILED_LOG, "a", encoding="utf-8") as f:
        f.write(f"{note.name}\t{reason}\n")


def load_checked() -> set:
    if CHECKED_LOG.exists():
        return set(CHECKED_LOG.read_text(encoding="utf-8").split())
    return set()


def mark_checked(note: Path) -> None:
    with open(CHECKED_LOG, "a", encoding="utf-8") as f:
        f.write(note.stem + "\n")


def candidate_statuses(text: str):
    """The note's own source tweet first, then any other tweet it links (e.g. a quoted post)."""
    seen = []
    m = re.search(r"\*\*Source:\*\*\s*(\S+)", text)
    if m:
        sm = STATUS_RE.search(m.group(1))
        if sm:
            seen.append(sm.groups())
    for user, tid in STATUS_RE.findall(text):
        if (user, tid) not in seen:
            seen.append((user, tid))
    return seen


def plan(note: Path, checked: set):
    """Return (mode, ids) or None. mode: 'full' (add text+images) or 'images' (old note, add images)."""
    text = note.read_text(encoding="utf-8")
    has_text = HAS_ARTICLE_RE.search(text) is not None
    if has_text and IMG_MARKER in text:
        return None
    ids = list(dict.fromkeys(ARTICLE_RE.findall(text)))
    if has_text:
        return ("images", ids)  # text came from an older run; add the pictures
    if ids:
        return ("full", ids)
    if note.stem in checked:
        return None
    return ("full", [])  # no article link in the text: look at the source tweet itself


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--limit", type=int, default=None, help="process at most N notes")
    ap.add_argument("--dry-run", action="store_true", help="list notes to update, do nothing else")
    args = ap.parse_args()

    if not NOTES_DIR.is_dir():
        sys.exit(f"Notes folder not found: {NOTES_DIR}")

    checked = load_checked()
    todo = []
    for note in sorted(NOTES_DIR.glob("*.md")):
        p = plan(note, checked)
        if p:
            todo.append((note, *p))
    if args.limit:
        todo = todo[: args.limit]

    print(f"{len(todo)} note(s) to check/update.")
    if args.dry_run:
        for note, mode, ids in todo:
            print(f"  {note.name}  [{mode}] {('article ' + ', '.join(ids)) if ids else '(checking source tweet)'}")
        return

    tweets = {}  # (user, tweet id) -> tweet dict or None, so each tweet is fetched once
    done = failed = none = 0
    for i, (note, mode, ids) in enumerate(todo, 1):
        print(f"[{i}/{len(todo)}] {note.name}")
        text = note.read_text(encoding="utf-8")
        cands = candidate_statuses(text)
        if not ids:
            cands = cands[:1]  # only the note's own tweet when there's no article link
        found = {}  # article id -> article dict
        for key in cands:
            if key not in tweets:
                tweets[key] = fetch_status(*key)
                time.sleep(SLEEP_BETWEEN)
            art = (tweets[key] or {}).get("article")
            if art and (art.get("content") or {}).get("blocks"):
                aid = str(art.get("id"))
                if not ids or aid in ids:
                    found[aid] = art
            if ids and all(a in found for a in ids):
                break
        if not ids and not found:
            mark_checked(note)  # plain tweet, no article
            none += 1
            print("  no article")
            continue
        wanted = ids or list(found)
        sections = []
        for aid in wanted:
            art = found.get(aid)
            if not art:
                print(f"  could not fetch article {aid}")
                log_failure(note, f"article {aid} not retrievable")
                continue
            if mode == "images":
                sec = images_section(art)
                if sec:
                    sections.append(sec)
                else:
                    sections.append(f"{MARKER} Images\n{IMG_MARKER}\n_(this article has no images)_")
            else:
                title = (art.get("title") or "").strip()
                head = f"{MARKER}: {title}" if title else MARKER
                sections.append(f"{head}\n_Article: https://x.com/i/article/{aid}_\n{IMG_MARKER}\n\n{article_to_markdown(art)}")
        if not sections:
            failed += 1
            continue
        tmp = note.with_suffix(".md.tmp")
        tmp.write_text(text.rstrip() + "\n\n---\n\n" + "\n\n".join(sections) + "\n", encoding="utf-8")
        tmp.replace(note)  # atomic: a crash never leaves a half-written note
        done += 1
        print("  done")

    print(f"Finished. {done} updated, {none} had no article, {failed} failed. Failures are in {FAILED_LOG.name}")


if __name__ == "__main__":
    main()
