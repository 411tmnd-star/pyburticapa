#!/usr/bin/env python3
"""Prototype: fetch ONE Gemini shared-chat URL and save the raw response + fetch metadata.

Usage:
    python gemini_to_md.py "<URL>"
    python gemini_to_md.py            # reads the single URL from the lone TXT in the parent folder

Stage 1 (this file, so far): fetch only. Extraction is added after the response is analysed.
"""
import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
DEBUG = HERE / "debug"
URL_RE = re.compile(r"https?://\S+")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
RELEVANT_HEADERS = ["content-type", "content-length", "content-encoding", "transfer-encoding", "location",
                    "set-cookie", "cache-control", "server", "x-frame-options", "content-security-policy",
                    "vary", "link", "x-robots-tag"]


def url_from_txt():
    txts = list(HERE.parent.glob("*.txt"))
    if len(txts) != 1:
        sys.exit(f"expected exactly 1 TXT in {HERE.parent}, found {len(txts)}")
    urls = URL_RE.findall(txts[0].read_text(encoding="utf-8-sig"))
    if len(urls) != 1:
        sys.exit(f"expected exactly 1 URL in {txts[0].name}, found {len(urls)}")
    return urls[0]


def fetch(url, timeout=30):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,application/xhtml+xml,*/*;q=0.8",
                                               "Accept-Language": "en-US,en;q=0.9"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            body, status, final, headers = r.read(), r.status, r.geturl(), r.headers
    except urllib.error.HTTPError as e:
        body, status, final, headers = e.read(), e.code, e.geturl(), e.headers
    meta = {
        "requested_url": url, "http_status": status, "final_url": final,
        "content_type": headers.get("Content-Type"), "response_bytes": len(body),
        "headers": {k: headers.get_all(k) for k in {h.lower() for h in headers.keys()}
                    if k in RELEVANT_HEADERS},
        "all_header_names": sorted({h.lower() for h in headers.keys()}),
    }
    return body, meta


def main():
    url = sys.argv[1] if len(sys.argv) > 1 else url_from_txt()
    body, meta = fetch(url)
    ctype = (meta["content_type"] or "").lower()
    ext = ".html" if "html" in ctype or not ctype else (".json" if "json" in ctype else ".txt" if "text" in ctype else ".bin")
    raw_path = DEBUG / f"prototype_response{ext}"
    if raw_path.exists():
        sys.exit(f"refusing to overwrite {raw_path}")
    raw_path.write_bytes(body)
    meta["raw_response_file"] = str(raw_path)
    (DEBUG / "prototype_fetch_meta.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
    print(json.dumps({k: v for k, v in meta.items() if k != "all_header_names"}, indent=2))


if __name__ == "__main__":
    main()
