"""
Step 1: turn X/Twitter status links into one markdown note per tweet in output_notes/.

Input only: there is no built-in link list. Pass X links and/or paths to text
files that contain X links:
    python extractor.py https://x.com/someone/status/123 more_links.txt
Notes that already exist are skipped, so it is safe to stop and re-run.

Each note holds: author, dates, engagement, full text, alt-text captions, the
quoted post (text + its images/videos), and every image/video URL. Later steps:
    fetch_articles.py   -> full X Article text + cover/inline images
    download_videos.py  -> saves videos AND images locally, relinks the notes
    transcribe_notes.py -> transcripts for every video

Data comes from the vxtwitter API; if it fails, the fxtwitter API is used instead.
Failures go to failed_links.txt.
"""
import re
import sys
import time
import requests
import os
from datetime import datetime

# Configuration
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "output_notes")
FAILED_FILE = os.path.join(SCRIPT_DIR, "failed_links.txt")
REQUEST_TIMEOUT = 20
MAX_RETRIES = 4
SLEEP_BETWEEN = 2

URL_PATTERN = re.compile(
    r'https?://(?:www\.)?(?:twitter\.com|x\.com)/([^/\s]+)/status/(\d+)'
)
IMAGE_EXTS = ('.jpg', '.jpeg', '.png', '.webp', '.gif')
HEADERS = {"User-Agent": "Mozilla/5.0"}


def extract_x_urls(inputs):
    """Unique X/Twitter status URLs found in `inputs`.

    Each input is either a link itself or a path to a text file containing links.
    """
    seen = {}
    for item in inputs or []:
        if os.path.isfile(item):
            with open(item, 'r', encoding='utf-8') as f:
                content = f.read()
        else:
            content = item
        for m in URL_PATTERN.finditer(content):
            user, tweet_id = m.group(1), m.group(2)
            seen.setdefault(tweet_id, f"https://x.com/{user}/status/{tweet_id}")
    return list(seen.values())


def parse_date(raw):
    """vxTwitter dates look like 'Tue Oct 07 12:00:00 +0000 2025'. Returns (iso_date, full_string)."""
    if not raw:
        return "Unknown Date", "Unknown Date"
    for fmt in ("%a %b %d %H:%M:%S %z %Y", "%Y-%m-%dT%H:%M:%S%z", "%Y-%m-%d %H:%M:%S"):
        try:
            dt = datetime.strptime(raw, fmt)
            return dt.strftime("%Y-%m-%d"), dt.strftime("%Y-%m-%d %H:%M:%S")
        except ValueError:
            continue
    return raw[:10], raw


def is_image(media_url):
    base = media_url.split('?', 1)[0].lower()
    return base.endswith(IMAGE_EXTS) or "/media/" in base and "video" not in base and not base.endswith(".mp4")


def _get_json(url):
    """GET with retries on 429/5xx/network errors. Returns (json_or_None, error_str)."""
    last_err = "unknown error"
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.get(url, timeout=REQUEST_TIMEOUT, headers=HEADERS)
            if response.status_code == 200:
                try:
                    return response.json(), None
                except ValueError:
                    return None, "invalid JSON in response"
            if response.status_code == 429 or response.status_code >= 500:
                last_err = f"Status {response.status_code}"
                retry_after = response.headers.get("Retry-After", "")
                wait = int(retry_after) if retry_after.isdigit() else 5 * (2 ** attempt)
                time.sleep(wait)
                continue
            return None, f"Status {response.status_code}"
        except requests.RequestException as e:
            last_err = str(e)
            time.sleep(5 * (2 ** attempt))
    return None, last_err


def _fx_media(m):
    """fxtwitter media dict -> (mediaURLs, media_extended) in vxtwitter's shape."""
    urls, ext = [], []
    for p in (m or {}).get("photos", []) or []:
        urls.append(p.get("url"))
        ext.append({"url": p.get("url"), "type": "image", "altText": p.get("altText")})
    for v in (m or {}).get("videos", []) or []:
        urls.append(v.get("url"))
        ext.append({"url": v.get("url"), "type": v.get("type", "video"), "altText": v.get("altText"),
                    "thumbnail_url": v.get("thumbnail_url")})
    return [u for u in urls if u], ext


def fx_to_vx(t):
    """Map an fxtwitter tweet dict onto the fields build_note() reads."""
    urls, ext = _fx_media(t.get("media"))
    author = t.get("author") or {}
    out = {
        "user_name": author.get("name"), "user_screen_name": author.get("screen_name"),
        "text": t.get("text", ""), "date": t.get("created_at"),
        "mediaURLs": urls, "media_extended": ext,
        "likes": t.get("likes"), "retweets": t.get("retweets"), "replies": t.get("replies"),
        "qrt": None,
    }
    art = t.get("article")
    if art:
        cover = (art.get("cover_media") or {}).get("media_info", {}).get("original_img_url")
        out["article"] = {"title": art.get("title"), "image": cover, "preview_text": art.get("preview_text")}
    q = t.get("quote")
    if q:
        qurls, qext = _fx_media(q.get("media"))
        qa = q.get("author") or {}
        out["qrt"] = {"user_name": qa.get("name"), "user_screen_name": qa.get("screen_name"),
                      "tweetURL": q.get("url"), "text": q.get("text", ""),
                      "mediaURLs": qurls, "media_extended": qext}
    return out


def fetch_tweet(user, tweet_id):
    """vxtwitter first, fxtwitter as fallback. Returns (data_in_vx_shape_or_None, error_str)."""
    data, err = _get_json(f"https://api.vxtwitter.com/{user}/status/{tweet_id}")
    if data is not None:
        return data, None
    fx, err2 = _get_json(f"https://api.fxtwitter.com/{user}/status/{tweet_id}")
    if fx is not None and fx.get("tweet"):
        return fx_to_vx(fx["tweet"]), None
    return None, f"vxtwitter: {err}; fxtwitter: {err2}"


def _media_lines(urls, extended):
    """Markdown for a list of media URLs, with alt-text captions when present."""
    alts = {}
    for m in extended or []:
        if m.get("url") and m.get("altText"):
            alts[m["url"]] = m["altText"].strip()
    lines = ""
    for media in urls or []:
        alt = alts.get(media)
        if is_image(media):
            label = re.sub(r"[\[\]\r\n]+", " ", alt)[:80] if alt else "Image"
            lines += f"![{label}]({media})\n"
        else:
            lines += f"- [Media Link]({media})\n"
        if alt:
            lines += f"  _Caption/alt text: {alt}_\n"
    return lines


def build_note(url, data):
    author = data.get('user_name') or 'Unknown Author'
    handle = data.get('user_screen_name') or 'unknown'
    text = data.get('text') or ''
    short_date, full_date = parse_date(data.get('date'))

    stats = []
    for key, label in (("likes", "likes"), ("retweets", "reposts"), ("replies", "replies")):
        if data.get(key) is not None:
            stats.append(f"{data[key]} {label}")

    note = f"""# {author} (@{handle}) - {short_date}

**Source:** {url}
**Posted:** {full_date}
**Captured:** {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
"""
    if stats:
        note += f"**Engagement:** {', '.join(stats)}\n"
    note += f"""
---

### Content
{text}

"""
    # X Article preview (the full text is added later by fetch_articles.py)
    art = data.get('article')
    if isinstance(art, dict) and (art.get('title') or art.get('image')):
        note += f"### Article Preview\n**{art.get('title') or ''}**\n"
        if art.get('preview_text'):
            note += f"\n{art['preview_text']}\n"
        if art.get('image'):
            note += f"\n![Article cover]({art['image']})\n"
        note += "\n"

    # Quoted post, with its own media
    qrt = data.get('qrt')
    if isinstance(qrt, dict):
        note += (
            "### Quoted Post\n"
            f"**{qrt.get('user_name', 'Unknown')} (@{qrt.get('user_screen_name', 'unknown')})**"
            f" - {qrt.get('tweetURL', '')}\n\n"
            f"{qrt.get('text', '')}\n\n"
        )
        qmedia = _media_lines(qrt.get('mediaURLs'), qrt.get('media_extended'))
        if qmedia:
            note += "#### Quoted Media\n" + qmedia + "\n"

    media = _media_lines(data.get('mediaURLs'), data.get('media_extended'))
    if media:
        note += "\n### Media\n" + media
    return note


def process_links(inputs):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    urls = extract_x_urls(inputs)
    print(f"Found {len(urls)} unique X links.")

    failed = []
    saved = skipped = 0

    for i, url in enumerate(urls, 1):
        m = URL_PATTERN.match(url)
        user, tweet_id = m.group(1), m.group(2)
        filename = os.path.join(OUTPUT_DIR, f"{tweet_id}.md")

        if os.path.exists(filename):
            print(f"[{i}/{len(urls)}] Skipping {tweet_id} (already saved)")
            skipped += 1
            continue

        data, err = fetch_tweet(user, tweet_id)
        if data is None:
            print(f"[{i}/{len(urls)}] Failed to fetch {url}: {err}")
            failed.append(url)
        else:
            try:
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(build_note(url, data))
                print(f"[{i}/{len(urls)}] Successfully saved {tweet_id}")
                saved += 1
            except Exception as e:
                print(f"[{i}/{len(urls)}] Error saving {url}: {e}")
                failed.append(url)

        # Sleep to avoid hitting rate limits on the APIs
        if i < len(urls):
            time.sleep(SLEEP_BETWEEN)

    print(f"\nDone. Saved: {saved}, skipped: {skipped}, failed: {len(failed)}")
    if failed:
        with open(FAILED_FILE, 'w', encoding='utf-8') as f:
            f.write("\n".join(failed) + "\n")
        print(f"Failed links written to {FAILED_FILE} (re-run to retry them).")
    elif os.path.exists(FAILED_FILE):
        os.remove(FAILED_FILE)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extractor.py LINK_OR_FILE [LINK_OR_FILE ...]")
        sys.exit(2)
    process_links(sys.argv[1:])
