"""Discovery-only: load ONE Gemini share URL in real Chrome (CDP, fresh empty profile) and log network traffic.

No credentials are used (fresh profile). Cookie/authorization header values and anti-forgery body values are redacted
before anything is written. No discovered endpoint is replayed.
"""
import asyncio, base64, json, os, re, shutil, subprocess, sys, tempfile, time, urllib.request
from pathlib import Path
from urllib.parse import parse_qsl, urlsplit

import websockets

sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")
HERE = Path(__file__).resolve().parent
URL = "https://share.gemini.google/FVKTq1yB2ca7"
CHROME = os.environ.get("CDP_BROWSER", r"C:\Program Files\Google\Chrome\Application\chrome.exe")
PORT = 9334
PROFILE = Path(tempfile.mkdtemp(prefix="gemini_cdp_profile_"))

SECRET_HEADERS = {"cookie", "authorization", "set-cookie", "x-goog-authuser", "proxy-authorization"}
SKIP_BODY_TYPES = {"Image", "Font", "Stylesheet", "Media", "Script", "Manifest", "TextTrack"}
REDACT_FORM = {"at", "f.sid", "bl", "sid", "token", "xsrf"}


def redact_headers(h):
    return {k: ("<redacted>" if k.lower() in SECRET_HEADERS else v) for k, v in (h or {}).items()}


def summarize_post(body, ctype):
    if not body:
        return None
    out = {"length": len(body)}
    if "x-www-form-urlencoded" in (ctype or ""):
        fields = {}
        for k, v in parse_qsl(body, keep_blank_values=True):
            fields[k] = "<redacted>" if k.lower() in REDACT_FORM else (v if len(v) <= 3000 else v[:3000] + f"...[+{len(v)-3000}]")
        out["form_fields"] = fields
    else:
        out["preview"] = body[:1500]
    return out


class Cdp:
    def __init__(self, ws):
        self.ws, self.n, self.pending, self.events = ws, 0, {}, asyncio.Queue()

    async def send(self, method, params=None, session=None):
        self.n += 1
        msg = {"id": self.n, "method": method, "params": params or {}}
        if session:
            msg["sessionId"] = session
        fut = asyncio.get_event_loop().create_future()
        self.pending[self.n] = fut
        await self.ws.send(json.dumps(msg))
        return await asyncio.wait_for(fut, 30)

    async def reader(self):
        async for raw in self.ws:
            m = json.loads(raw)
            if "id" in m and m["id"] in self.pending:
                f = self.pending.pop(m["id"])
                f.set_exception(RuntimeError(str(m["error"]))) if "error" in m else f.set_result(m.get("result", {}))
            else:
                await self.events.put(m)


async def main():
    proc = subprocess.Popen([CHROME, "--headless=new", f"--remote-debugging-port={PORT}", f"--user-data-dir={PROFILE}",
                             "--no-first-run", "--no-default-browser-check", *os.environ.get("CDP_EXTRA_FLAGS", "").split(), "--window-size=1366,900", "about:blank"],
                            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        ver = None
        for _ in range(60):
            try:
                ver = json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version", timeout=2)); break
            except Exception:
                time.sleep(0.5)
        if not ver:
            sys.exit("Chrome CDP endpoint did not come up")
        browser_name = ver["Browser"]
        ua = ver["User-Agent"].replace("HeadlessChrome", "Chrome")
        targets = json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json"))
        page = next(t for t in targets if t["type"] == "page")
        async with websockets.connect(page["webSocketDebuggerUrl"], max_size=None) as ws:
            cdp = Cdp(ws)
            rt = asyncio.create_task(cdp.reader())
            await cdp.send("Network.enable", {"maxTotalBufferSize": 100_000_000, "maxResourceBufferSize": 50_000_000})
            await cdp.send("Page.enable")
            await cdp.send("Emulation.setUserAgentOverride", {"userAgent": ua})
            await cdp.send("Target.setAutoAttach", {"autoAttach": True, "waitForDebuggerOnStart": False, "flatten": True})

            reqs = {}  # (session, requestId) -> dict
            t0 = time.time()
            await cdp.send("Page.navigate", {"url": URL})

            async def pump(duration, stop_when_stable=None):
                end = time.time() + duration
                while time.time() < end:
                    try:
                        m = await asyncio.wait_for(cdp.events.get(), 0.5)
                    except asyncio.TimeoutError:
                        continue
                    sess, meth, p = m.get("sessionId"), m.get("method"), m.get("params", {})
                    if meth == "Target.attachedToTarget":
                        s = p["sessionId"]
                        try:
                            await cdp.send("Network.enable", {}, session=s)
                            await cdp.send("Runtime.runIfWaitingForDebugger", {}, session=s)
                        except Exception:
                            pass
                    elif meth == "Network.requestWillBeSent":
                        r = reqs.setdefault((sess, p["requestId"]), {})
                        rq = p["request"]
                        r.update(url=rq["url"], method=rq["method"], type=p.get("type"), t=round(time.time() - t0, 2),
                                 req_headers=redact_headers(rq.get("headers")), post=rq.get("postData"),
                                 has_post=rq.get("hasPostData"), initiator=p.get("initiator", {}).get("type"),
                                 initiator_url=(p.get("initiator", {}).get("url") or
                                                next((f.get("url") for f in p.get("initiator", {}).get("stack", {}).get("callFrames", [])), None)))
                        if "redirectResponse" in p:
                            r.setdefault("redirected_from", p["redirectResponse"].get("url"))
                    elif meth == "Network.responseReceived":
                        r = reqs.setdefault((sess, p["requestId"]), {})
                        rs = p["response"]
                        r.update(status=rs["status"], mime=rs.get("mimeType"), resp_headers=redact_headers(rs.get("headers")),
                                 protocol=rs.get("protocol"), remote=rs.get("remoteIPAddress"))
                    elif meth == "Network.loadingFinished":
                        r = reqs.setdefault((sess, p["requestId"]), {})
                        r["encoded_bytes"] = p.get("encodedDataLength"); r["finished"] = True
                    elif meth == "Network.loadingFailed":
                        r = reqs.setdefault((sess, p["requestId"]), {})
                        r["failed"] = p.get("errorText")
                    elif meth == "Network.webSocketCreated":
                        reqs.setdefault((sess, p["requestId"]), {}).update(url=p["url"], method="WS", type="WebSocket")
                    if stop_when_stable and stop_when_stable():
                        return

            # wait for load, then poll rendered text until stable
            await pump(12)
            texts, final_text = [], ""
            for i in range(int(os.environ.get("CDP_WAIT_SECONDS", "30"))):
                await pump(1.0)
                r = await cdp.send("Runtime.evaluate", {"expression": "document.body ? document.body.innerText : ''", "returnByValue": True})
                final_text = r["result"].get("value", "")
                texts.append(len(final_text))
                if len(texts) >= int(os.environ.get("CDP_STABLE_N", "5")) and len(set(texts[-int(os.environ.get("CDP_STABLE_N", "5")) + 1:])) == 1 and texts[-1] > int(os.environ.get("CDP_MIN_CHARS", "400")):
                    break
            await pump(3)
            doc_title = (await cdp.send("Runtime.evaluate", {"expression": "document.title", "returnByValue": True}))["result"].get("value")
            doc_url = (await cdp.send("Runtime.evaluate", {"expression": "location.href", "returnByValue": True}))["result"].get("value")
            shot = await cdp.send("Page.captureScreenshot", {"format": "png"})
            (HERE / "test3_browser_render_screenshot.png").write_bytes(base64.b64decode(shot["data"]))
            (HERE / "test3_browser_rendered_text.txt").write_text(final_text, encoding="utf-8")

            # fetch bodies of non-static requests
            bodies = {}
            for key, r in reqs.items():
                if not r.get("finished") or r.get("type") in SKIP_BODY_TYPES or r.get("status") is None:
                    continue
                try:
                    b = await cdp.send("Network.getResponseBody", {"requestId": key[1]}, session=key[0])
                    bodies[key] = base64.b64decode(b["body"]) if b.get("base64Encoded") else b["body"].encode("utf-8")
                except Exception as e:
                    r["body_error"] = str(e)[:120]

            # probe phrases from what the browser rendered
            lines = [l.strip() for l in final_text.splitlines()]
            probes = []
            for l in lines:
                if 40 <= len(l) <= 140 and re.fullmatch(r"[A-Za-z0-9 ,.\-()'/:;?!%]+", l) and l not in probes:
                    probes.append(l)
            probes = probes[:25]
            for key, body in bodies.items():
                txt = body.decode("utf-8", errors="replace")
                hits = sum(1 for p in probes if p in txt)
                reqs[key]["probe_hits"] = hits
                reqs[key]["body_bytes"] = len(body)

            rt.cancel()

        # ---------- write outputs ----------
        rows = []
        for (sess, rid), r in sorted(reqs.items(), key=lambda kv: kv[1].get("t", 0)):
            if "url" not in r:
                continue
            ct = r.get("req_headers", {}).get("Content-Type") or r.get("req_headers", {}).get("content-type")
            row = {k: r.get(k) for k in ("t", "method", "url", "type", "status", "mime", "initiator", "initiator_url", "encoded_bytes",
                                         "body_bytes", "probe_hits", "failed", "redirected_from", "protocol")}
            row["req_content_type"] = ct
            row["req_headers"] = r.get("req_headers")
            row["resp_content_type"] = (r.get("resp_headers") or {}).get("content-type")
            post = r.get("post")
            row["post_summary"] = summarize_post(post, ct)
            rows.append(row)
        summary = {"browser": browser_name, "automation": "Chrome DevTools Protocol over websockets (headless=new, fresh empty profile)",
                   "requested_url": URL, "final_location_href": doc_url, "document_title": doc_title,
                   "rendered_text_chars": len(final_text), "rendered_text_stability_samples": texts,
                   "total_requests_observed": len(rows), "probe_phrase_count": len(probes), "probes": probes, "requests": rows}
        (HERE / "test3_network_log.json").write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8")

        # save best candidate bodies (those containing rendered-chat probes)
        saved = []
        for key, body in bodies.items():
            r = reqs[key]
            if r.get("probe_hits", 0) > 0:
                name = "test3_candidate_response_" + re.sub(r"[^A-Za-z0-9]+", "_", urlsplit(r["url"]).path.strip("/"))[-60:] + f"_{len(saved)+1}.bin"
                (HERE / name).write_bytes(body)
                saved.append((name, r["url"], r["probe_hits"], len(body)))
        print(json.dumps({k: v for k, v in summary.items() if k not in ("requests", "probes")}, indent=2))
        print("saved candidates:", saved)
        print(f"rendered text first 300: {final_text[:300]!r}")
    finally:
        proc.terminate()
        try:
            proc.wait(10)
        except Exception:
            proc.kill()
        time.sleep(1)
        shutil.rmtree(PROFILE, ignore_errors=True)


asyncio.run(main())


# redact the session id from the saved log
import re as _re
_p = HERE / "test3_network_log.json"
_p.write_text(_re.sub(r"f\.sid=[-\d]+", "f.sid=<redacted>", _p.read_text(encoding="utf-8")), encoding="utf-8")
