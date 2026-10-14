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
PORT = 9335
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



JS = open(os.environ["CDP_JS_FILE"], encoding="utf-8").read()
WAIT = int(os.environ.get("CDP_WAIT_SECONDS", "40"))

async def main():
    proc = subprocess.Popen([CHROME, "--headless=new", f"--remote-debugging-port={PORT}", f"--user-data-dir={PROFILE}",
                             "--no-first-run", "--no-default-browser-check", *os.environ.get("CDP_EXTRA_FLAGS", "").split(),
                             "--window-size=1366,900", "about:blank"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        ver = None
        for _ in range(60):
            try: ver = json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version", timeout=2)); break
            except Exception: time.sleep(0.5)
        ua = ver["User-Agent"].replace("HeadlessChrome", "Chrome")
        page = next(t for t in json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json")) if t["type"] == "page")
        async with websockets.connect(page["webSocketDebuggerUrl"], max_size=None) as ws:
            cdp = Cdp(ws); rt = asyncio.create_task(cdp.reader())
            await cdp.send("Page.enable"); await cdp.send("Emulation.setUserAgentOverride", {"userAgent": ua})
            await cdp.send("Page.navigate", {"url": os.environ.get("CDP_URL", URL)})
            await asyncio.sleep(WAIT)
            r = await cdp.send("Runtime.evaluate", {"expression": JS, "returnByValue": True, "awaitPromise": True})
            val = r["result"].get("value", r)
            out = os.environ.get("CDP_OUT")
            txt = val if isinstance(val, str) else json.dumps(val, indent=2, ensure_ascii=False)
            if out: open(out, "w", encoding="utf-8").write(txt)
            print(txt[:6000])
            rt.cancel()
    finally:
        proc.terminate()
        try: proc.wait(10)
        except Exception: proc.kill()
        time.sleep(1); shutil.rmtree(PROFILE, ignore_errors=True)

asyncio.run(main())
