#!/usr/bin/env python3
"""One-link prototype: reproduce the observed Gemini shared-chat `ujx1Bf` batchexecute request in plain Python.

Usage:
    python gemini_replay.py "https://share.gemini.google/<id>" [--fetch-only] [--out DIR] [--reference FILE]

  --out DIR        write debug/, logs/ and output/ under DIR (default: this script's folder)
  --reference FILE browser-rendered text of the same chat (ground truth). With it the Markdown is verified against
                   the browser page; without it the Markdown is written as "unverified" (no browser comparison).

Requests made (nothing else):
  1. GET  <original share URL>  (follows redirects to https://gemini.google.com/share/<share_id>)
  2. POST https://gemini.google.com/_/BardChatUi/data/batchexecute?rpcids=ujx1Bf ...  (the observed request)

Cookies live only in the in-memory session; they, authorization headers and `f.sid` are never written to disk.
"""
import datetime
import json
import re
import sys
import time
from pathlib import Path
from urllib.parse import urlsplit

import requests

import gemini_parse as gp

HERE = Path(__file__).resolve().parent
OUT_BASE = HERE                                  # changed by --out
DEBUG, LOGS = OUT_BASE / "debug", OUT_BASE / "logs"
REFERENCE = None                                 # set by --reference
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
      "Chrome/154.0.0.0 Safari/537.36")
RPC_ID = "ujx1Bf"
SECRET_HEADERS = {"cookie", "set-cookie", "authorization", "proxy-authorization"}


def redact_headers(h):
    return {k: ("<redacted>" if k.lower() in SECRET_HEADERS else v) for k, v in dict(h).items()}


def with_retries(fn, attempts=3):
    """Retry the identical request only on transport-level errors (this network resets connections intermittently)."""
    last = None
    for i in range(attempts):
        try:
            return fn(), i + 1
        except (requests.ConnectionError, requests.Timeout) as e:
            last = e
            time.sleep(2 * (i + 1))
    raise last


def wiz_value(html, key):
    m = re.search(r'"%s":"([^"]*)"' % re.escape(key), html)
    return m.group(1) if m else None


def _opt(name):
    """Value of `--name VALUE` in sys.argv, or None."""
    if name in sys.argv:
        i = sys.argv.index(name)
        if i + 1 < len(sys.argv):
            return sys.argv[i + 1]
        sys.exit(f"{name} needs a value")
    return None


def main():
    global OUT_BASE, DEBUG, LOGS, REFERENCE
    out_opt, ref_opt = _opt("--out"), _opt("--reference")
    if out_opt:
        OUT_BASE = Path(out_opt).resolve()
        DEBUG, LOGS = OUT_BASE / "debug", OUT_BASE / "logs"
    REFERENCE = Path(ref_opt) if ref_opt else None
    values = {out_opt, ref_opt} - {None}
    args = [a for a in sys.argv[1:] if not a.startswith("--") and a not in values]
    if len(args) != 1:
        sys.exit('usage: python gemini_replay.py "<share URL>" [--fetch-only] [--out DIR] [--reference FILE]')
    original_url = args[0]
    meta = {"original_url": original_url, "rpc_id": RPC_ID, "started_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "warnings": [], "errors": []}
    s = requests.Session()
    s.headers.update({"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"})

    # ---- 1. shell page ----
    r1, n1 = with_retries(lambda: s.get(original_url, timeout=30, headers={"Accept": "text/html,application/xhtml+xml,*/*;q=0.8"}))
    meta["step1_get"] = {"status": r1.status_code, "attempts": n1, "redirect_chain": [h.url for h in r1.history] + [r1.url],
                         "content_type": r1.headers.get("Content-Type"), "bytes": len(r1.content)}
    final_url = r1.url
    meta["final_url"] = final_url
    m = re.fullmatch(r"/share/([A-Za-z0-9_-]+)", urlsplit(final_url).path)
    if not m:
        meta["errors"].append("final URL is not /share/<id>")
        return finish(meta, 1)
    share_id = m.group(1)
    meta["share_id"] = share_id

    html = r1.text
    bl = wiz_value(html, "cfb2h")
    fsid = wiz_value(html, "FdrFJe")
    meta["page_parameters_found"] = {"bl": bl, "f.sid": "<redacted>" if fsid else None,
                                     "hl": "en-US (observed constant)"}
    if not bl or not fsid:
        meta["errors"].append(f"missing page parameters: bl={bool(bl)} f.sid={bool(fsid)}")
        return finish(meta, 1)
    if "--fetch-only" in sys.argv:
        return finish(meta, 0)

    # ---- 2. the observed ujx1Bf request ----
    url = "https://gemini.google.com/_/BardChatUi/data/batchexecute"
    params = {"rpcids": RPC_ID, "source-path": f"/share/{share_id}", "bl": bl, "f.sid": fsid, "hl": "en-US", "rt": "c"}
    freq = json.dumps([[[RPC_ID, json.dumps([None, share_id, [4]], separators=(",", ":")), None, "generic"]]], separators=(",", ":"))
    headers = {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", "X-Same-Domain": "1",
               "Referer": "https://gemini.google.com/", "Origin": "https://gemini.google.com", "Accept": "*/*"}
    r2, n2 = with_retries(lambda: s.post(url, params=params, data={"f.req": freq}, headers=headers, timeout=60))
    resp = r2.content
    DEBUG.mkdir(exist_ok=True)
    (DEBUG / "python_replay_response.bin").write_bytes(resp)
    meta["step2_post"] = {
        "url_path": urlsplit(r2.request.url).path,
        "query_params_sent": {k: ("<redacted>" if k == "f.sid" else v) for k, v in params.items()},
        "request_headers_sent": redact_headers({k: v for k, v in r2.request.headers.items()}),
        "form_fields_sent": {"f.req": freq},
        "attempts": n2, "status": r2.status_code, "content_type": r2.headers.get("Content-Type"),
        "response_bytes": len(resp), "response_headers": redact_headers(r2.headers),
        "starts_with_xssi_prefix": resp.startswith(b")]}'"),
        "contains_wrb_fr": b"wrb.fr" in resp, "contains_rpc_id": RPC_ID.encode() in resp,
    }
    meta["cookies_in_session"] = {"count": len(s.cookies), "stored_to_disk": False}
    if r2.status_code != 200:
        meta["errors"].append(f"batchexecute returned HTTP {r2.status_code}")
        return finish(meta, 1)
    return post_process(meta, resp, original_url, share_id, final_url)


def post_process(meta, resp, original_url, share_id, final_url):
    """Phases 2-5: compare with browser capture, parse, reconstruct Markdown, verify, write result log."""
    result = {"original_url": original_url, "final_url": final_url, "share_id": share_id,
              "http_status": meta["step2_post"]["status"], "response_size_bytes": len(resp),
              "response_content_type": meta["step2_post"]["content_type"], "rpc_id": RPC_ID,
              "wrb_fr_parsed": False, "turn_count": None, "extracted_character_count": None,
              "output_file": None, "verification_result": "NOT_RUN", "warnings": [], "errors": []}
    try:
        inner = gp.rpc_payloads(gp.parse_batchexecute(resp), RPC_ID)
        if len(inner) != 1:
            raise ValueError(f"expected exactly 1 wrb.fr payload for {RPC_ID}, found {len(inner)}")
        inner = inner[0]
        result["wrb_fr_parsed"] = True

        browser = DEBUG / "candidate_response__BardChatUi_data_batchexecute_1.bin"
        if browser.exists():
            b_inner = gp.rpc_payloads(gp.parse_batchexecute(browser.read_bytes()), RPC_ID)[0]
            result["comparison_with_browser_capture"] = {
                "browser_bytes": browser.stat().st_size, "python_bytes": len(resp),
                "same_rpc_id": True, "inner_payload_identical": json.dumps(b_inner) == json.dumps(inner),
                "browser_turns": len(b_inner[0][1]), "python_turns": len(inner[0][1]),
                "same_turn_ids_in_order": [t[0] for t in b_inner[0][1]] == [t[0] for t in inner[0][1]]}

        conv = gp.extract_conversation(inner)
        result["turn_count"] = len(conv["turns"])
        if conv["share_id"] != share_id:
            result["warnings"].append(f"payload share_id {conv['share_id']} differs from URL share id {share_id}")
        out = OUT_BASE / "output" / "prototype_gemini_conversation.md"
        if REFERENCE is None:
            # No browser ground truth for this chat: write the Markdown, clearly labelled unverified.
            out.parent.mkdir(parents=True, exist_ok=True)
            if out.exists():
                raise FileExistsError(f"refusing to overwrite {out}")
            out.write_text(gp.render_markdown(conv, original_url, "unverified"), encoding="utf-8")
            result["output_file"] = str(out)
            result["verification_result"] = "UNVERIFIED_NO_REFERENCE"
            result["warnings"].append("no --reference given: Markdown not compared with the browser-rendered page")
        else:
            rendered = REFERENCE.read_text(encoding="utf-8")
            md = gp.render_markdown(conv, original_url, "unverified")
            v = gp.verify(conv, md, rendered, original_url)
            result["verification_checks"] = v["checks"]
            result["warnings"] += v["warnings"]
            result["extracted_character_count"] = v["extracted_characters"]
            result["rendered_reference_characters"] = v["rendered_reference_characters"]
            result["verification_result"] = "VERIFIED" if v["verified"] else "FAILED"
            if v["verified"]:
                out.parent.mkdir(parents=True, exist_ok=True)
                if out.exists():
                    raise FileExistsError(f"refusing to overwrite {out}")
                out.write_text(gp.render_markdown(conv, original_url, "verified"), encoding="utf-8")
                result["output_file"] = str(out)
            else:
                DEBUG.mkdir(parents=True, exist_ok=True)
                (DEBUG / "unverified_conversation.md").write_text(md, encoding="utf-8")
                result["warnings"].append("verification failed; Markdown NOT written to output/ (saved to debug/unverified_conversation.md)")
    except Exception as e:
        result["errors"].append(f"{type(e).__name__}: {e}")
        result["verification_result"] = "FAILED"
    LOGS.mkdir(exist_ok=True)
    (LOGS / "python_replay_result.json").write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")
    meta["result_summary"] = {k: result[k] for k in ("verification_result", "turn_count", "output_file", "errors")}
    print("RESULT:", json.dumps({k: v for k, v in result.items() if k != "verification_checks"}, indent=2, ensure_ascii=False))
    for k, v in result.get("verification_checks", {}).items():
        print(("  PASS " if v["pass"] else "  FAIL ") + k, "-", v["detail"])
    return finish(meta, 0 if result["verification_result"] in ("VERIFIED", "UNVERIFIED_NO_REFERENCE") else 1)


def finish(meta, code):
    meta["finished_at"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
    DEBUG.mkdir(exist_ok=True)
    (DEBUG / "python_replay_meta.json").write_text(json.dumps(meta, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({k: v for k, v in meta.items() if k not in ("step2_post",)}, indent=2, ensure_ascii=False))
    if "step2_post" in meta:
        sp = meta["step2_post"]
        print("POST:", {k: sp[k] for k in ("status", "content_type", "response_bytes", "contains_wrb_fr", "contains_rpc_id", "attempts")})
    return code


if __name__ == "__main__":
    sys.exit(main())
