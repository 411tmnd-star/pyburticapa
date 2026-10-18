// Minimal Chrome DevTools Protocol driver for the preview checks (Microsoft Edge, headless). No dependencies.
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function launch({ port = 9444, width = 1280, height = 820, args = [] } = {}) {
  const profile = mkdtempSync(join(tmpdir(), "edge-sq-"));
  const proc = spawn(
    EDGE,
    ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--autoplay-policy=no-user-gesture-required", "--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream", `--window-size=${width},${height}`, "--disable-gpu", ...args, "about:blank"],
    { stdio: "ignore" },
  );
  let ws;
  let nextId = 1;
  const pending = new Map();
  const events = [];
  const listeners = [];
  for (let i = 0; i < 300 && !ws; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) {
        ws = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise((res, rej) => ((ws.onopen = res), (ws.onerror = rej)));
      }
    } catch {
      await sleep(100);
    }
  }
  if (!ws) throw new Error("could not connect to Edge");
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.method === "Runtime.exceptionThrown") events.push({ kind: "exception", text: d.params.exceptionDetails.exception?.description ?? d.params.exceptionDetails.text });
    if (d.method === "Runtime.consoleAPICalled" && (d.params.type === "error" || d.params.type === "warning")) events.push({ kind: d.params.type, text: d.params.args.map((a) => a.value ?? a.description).join(" ") });
    for (const l of listeners) l(d);
    if (d.id && pending.has(d.id)) {
      const p = pending.get(d.id);
      pending.delete(d.id);
      d.error ? p.rej(new Error(JSON.stringify(d.error))) : p.res(d.result);
    }
  };
  const send = (method, params = {}) =>
    new Promise((res, rej) => {
      const id = nextId++;
      pending.set(id, { res, rej });
      ws.send(JSON.stringify({ id, method, params }));
    });
  const js = async (expression) => {
    const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + " " + (r.exceptionDetails.exception?.description ?? ""));
    return r.result.value;
  };
  await send("Page.enable");
  await send("Runtime.enable");

  const api = {
    send, js, events, proc,
    onEvent: (fn) => listeners.push(fn),
    async goto(url, ready = "true") {
      await send("Page.navigate", { url });
      for (let i = 0; i < 150; i++) {
        try {
          if (await js(ready)) return;
        } catch {
          /* page still loading */
        }
        await sleep(100);
      }
      throw new Error("page did not become ready: " + url);
    },
    async viewport(width, height, mobile = false, dpr = 1) {
      await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: dpr, mobile });
      if (mobile) await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
    },
    async rect(sel) {
      return js(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, disabled: !!e.disabled }; })()`);
    },
    async mouse(type, x, y, buttons = 0, extra = {}) {
      await send("Input.dispatchMouseEvent", { type, x, y, button: type === "mouseMoved" && !buttons ? "none" : "left", buttons, clickCount: 1, ...extra });
    },
    /** A real mouse click at the element's centre (scrolled into view first). */
    async click(sel) {
      await js(`document.querySelector(${JSON.stringify(sel)})?.scrollIntoView({block:'center'})`);
      const r = await api.rect(sel);
      if (!r) throw new Error("no element " + sel);
      if (r.disabled) throw new Error(sel + " is disabled");
      const x = r.x + r.w / 2, y = r.y + r.h / 2;
      await api.mouse("mouseMoved", x, y);
      await api.mouse("mousePressed", x, y, 1);
      await api.mouse("mouseReleased", x, y, 0);
    },
    async drag(from, to, steps = 12, stepMs = 16) {
      await api.mouse("mouseMoved", from.x, from.y);
      await api.mouse("mousePressed", from.x, from.y, 1);
      for (let i = 1; i <= steps; i++) {
        await api.mouse("mouseMoved", from.x + ((to.x - from.x) * i) / steps, from.y + ((to.y - from.y) * i) / steps, 1);
        await sleep(stepMs);
      }
      await api.mouse("mouseReleased", to.x, to.y, 0);
    },
    async touch(type, points) {
      await send("Input.dispatchTouchEvent", { type, touchPoints: points.map((p, i) => ({ x: p.x, y: p.y, id: i })) });
    },
    async key(key, code = key, text) {
      await send("Input.dispatchKeyEvent", { type: "keyDown", key, code, text, windowsVirtualKeyCode: key === " " ? 32 : key === "ArrowRight" ? 39 : key === "ArrowLeft" ? 37 : key.toUpperCase().charCodeAt(0) });
      await send("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode: key === " " ? 32 : key === "ArrowRight" ? 39 : key === "ArrowLeft" ? 37 : key.toUpperCase().charCodeAt(0) });
    },
    async setFile(sel, path) {
      const r = await send("Runtime.evaluate", { expression: `document.querySelector(${JSON.stringify(sel)})` });
      await send("DOM.setFileInputFiles", { files: [path], objectId: r.result.objectId });
    },
    async shot(path, clip) {
      const r = await send("Page.captureScreenshot", { format: "png", ...(clip ? { clip: { ...clip, scale: 1 } } : {}) });
      writeFileSync(path, Buffer.from(r.data, "base64"));
      return path;
    },
    async close() {
      try {
        ws.close();
      } catch {
        /* closed */
      }
      proc.kill();
      await sleep(300);
      try {
        rmSync(profile, { recursive: true, force: true });
      } catch {
        /* profile still locked by Edge; the OS temp cleanup will remove it */
      }
    },
  };
  return api;
}
