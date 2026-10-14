"""
Step 1: turn X/Twitter status links into one markdown note per tweet in output_notes/.

Links come from the built-in LINKS_127 list AND from the old extraction file
(x-chat-extraction_Oct9_to_Oct1.md, or a path passed as argv[1]). Notes that
already exist are skipped, so it is safe to stop and re-run.

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
INPUT_FILE = os.path.join(SCRIPT_DIR, "x-chat-extraction_Oct9_to_Oct1.md")  # or pass a path as argv[1]
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "output_notes")
FAILED_FILE = os.path.join(SCRIPT_DIR, "failed_links.txt")
REQUEST_TIMEOUT = 20
MAX_RETRIES = 4
SLEEP_BETWEEN = 2

# The 127 links to process, as "handle/tweet-id". Add more here (or pass a file path as argv[1]).
LINKS_127 = """
kashvi/2108104494345322812
Jeffar_AI/2108047803914367273
precisox/2108313026931704110
irabukht/2108364924464546088
antinertia/2108173188827922680
nurijanian/2108234466753970664
kalashnikovapv/2108086030402269296
AkterBrist39045/2108152640396054909
dsqjaffa/2108141562521670116
rossaxbt/2108208425708454247
coreyhainesco/2013272998191812906
charliejhills/2034205896298107167
rubenhassid/2031667053371732044
maxwellcopy/2106158536917156187
ihteshamali/2039342079957164145
dsqjaffa/2107866686594380241
CEO_Vlad/2107553198609146343
rubenhassid/2042558212990292013
boringmarketer/1925334915383538077
Mohiniuni/2107772729575587954
irabukht/2107618232945504605
irabukht/2107618234816143528
Graphed/2107818235731087773
iamrichygold/2101757701642502550
SEONAWAF/2106963591022743801
himanshubuildss/2108540618553356666
RiverKhan/2108603405103235330
ihteshamali/2108920149801586769
dsqjaffa/2108643981600911622
thegreatest_sv/2108529912537661559
0xCodez/2077758938938818714
twoclipping/2103835273813496100
OBAxbt/2108835430925738045
sergiorocaa/2099871638548361280
Bharambe2Kiran/2109121949855265155
beamnxw/2108616740846420354
Marlenuii/2109323814672724093
beamnxw/2109304262597443724
MikuBTC/2109330548267040809
0xKiyoro/2109242059492081860
N01ennn/2109230605908975962
0xbobaaa/2109207788803027407
grokkedd/2109334638967607404
undefinedKi/2109296112968384824
0xCodila/2107119130239185232
flxrnc/2105311836190978392
renproton/2109329800565506227
0xMovez/2109334686488990093
0xForce_/2109081839579120089
VibeEverything/2109293698836205573
francescoinweb3/2109379528787374560
alex_prompter/2109218702264815684
IamKhanPhD/2109260787546038726
thegreatest_sv/2109253932979732719
0xCarnagee/2109399139280716281
elessarqq/2109341740163375456
_heyfaisal/2109114430361575639
0xbobaaa/2109318248277651853
AndyL5cc/2109133876702703805
Voxyz_ai/2109358372873183564
0xWast3/2109343932681171125
rossaxbt/2109323251004428562
PrajwalTomar_/2109267986527969468
KanaWorks_AI/2109458972646502432
0xCarnagee/2109317788678439148
deanwperkins/2109357283327037930
0xCodez/2104978308421091737
0xCodez/2104556525805089151
0xCodez/2104257855142474136
0xMovez/2104216919033192746
0xMovez/2105768550711558491
claudeai/2102435511222890900
Talsiach/2105631873783210125
rexan_wong/2103707054108299437
MengTo/2103491024287084744
AndrewOnXYZ/2103865359988125706
neropursue/2105535981135007824
bearlyai/2105784343960629738
cambreedesigns/2104999693113766152
konstantinsaifo/2108953956168687770
konstantinsaifo/2106859262836437326
jasonugc/2104266492204417448
benabmathew/2109340846294474770
minchoi/2104227722377757031
VullnetAdemaj/2104169192438296889
chhddavid/2102666619029999989
leomeethewoo/2103601512786333928
Avenoxai/2102500841097756743
Artedeingenio/2105749426115371028
ridark_eth/2106479297989136561
humzaakhalid/2106327155873636836
humzaakhalid/2107399283121209708
seeconvm/2106406061066342876
berlified/2106642408121479558
berlified/2107021117064204427
warraich_Ai2/2106927945587794301
Nexoxh/2104950064837751031
Nexoxh/2104858904576545234
dsqjaffa/2107643263180042264
0xMfox/2108301207710191660
gregisenberg/2106184476300574911
gregisenberg/2108188646973313195
moritzkremb/2108283825440575951
VibeMarketer_/2108257927211426298
shannholmberg/2108327831243788456
earthtojake/2106120308037947785
observie/2106301475261423651
DeRonin_/2105975830799102390
seejayhess/2106054961469567084
MaziyarPanahi/2106368674500358351
himanshubuildss/2106449317406056903
iamtanzil_/2108066324907962575
allen_lattimer/2108222137412854244
Bencera/2106256893266260327
mehdi_made/2106715509450493993
AmirMushich/2106716622761189875
adskFusion/2106613306215510024
MecAgent/2107093936363717046
LinusEkenstam/2106356911859814862
KateCaballero_/2105674407234720148
carlosbannon/2106139082116174197
Minsi_AI/2106391117155770427
AmitSha77280075/2106998674433990936
ishverduzco/2107998499891728837
Thecreativemena/2108151856425730353
wheresryan22/2106476722463900105
MustafyOf/2106189075350700333
""".split()

URL_PATTERN = re.compile(
    r'https?://(?:www\.)?(?:twitter\.com|x\.com)/([^/\s]+)/status/(\d+)'
)
IMAGE_EXTS = ('.jpg', '.jpeg', '.png', '.webp', '.gif')
HEADERS = {"User-Agent": "Mozilla/5.0"}


def extract_x_urls(filepath):
    """Unique X/Twitter status URLs: LINKS_127 first, then any found in `filepath`."""
    seen = {}
    for item in LINKS_127:
        user, tweet_id = item.split("/")
        seen.setdefault(tweet_id, f"https://x.com/{user}/status/{tweet_id}")
    if filepath and os.path.isfile(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
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


def process_links(input_file):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    urls = extract_x_urls(input_file)
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
    path = sys.argv[1] if len(sys.argv) > 1 else INPUT_FILE
    process_links(path)
