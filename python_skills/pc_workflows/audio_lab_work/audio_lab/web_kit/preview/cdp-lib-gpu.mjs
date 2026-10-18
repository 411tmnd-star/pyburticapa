// GPU-enabled launcher for the WebGL host checks. A separate file: the shared cdp-lib.mjs forces --disable-gpu and is
// left unchanged. Launches Microsoft Edge headless WITHOUT --disable-gpu and reports which GPU Chromium actually used.
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function launchGpu({ port = 9600, width = 1100, height = 760 } = {}) {
  const profile = mkdtempSync(join(tmpdir(), "edge-gpu-"));
  const proc = spawn(EDGE, [
    "--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
    "--autoplay-policy=no-user-gesture-required", `--window-size=${width},${height}`, "about:blank",
  ], { stdio: "ignore" });
  let ws;
  for (let i = 0; i < 100 && !ws; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) {
        ws = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise((res, rej) => ((ws.onopen = res), (ws.onerror = rej)));
      }
    } catch { await sleep(100); }
  }
  if (!ws) { proc.kill(); throw new Error("could not connect to Edge (GPU launcher)"); }
  let nextId = 1;
  const pending = new Map();
  const events = [];
  const listeners = [];
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.method === "Runtime.exceptionThrown") events.push({ kind: "exception", text: d.params.exceptionDetails.exception?.description ?? d.params.exceptionDetails.text });
    if (d.method === "Runtime.consoleAPICalled" && (d.params.type === "error" || d.params.type === "warning")) events.push({ kind: d.params.type, text: d.params.args.map((a) => a.value ?? a.description).join(" ") });
    if (d.method === "Log.entryAdded" && (d.params.entry.level === "error" || d.params.entry.level === "warning")) events.push({ kind: "log-" + d.params.entry.level, text: d.params.entry.text });
    for (const l of listeners) l(d);
    if (d.id && pending.has(d.id)) { const p = pending.get(d.id); pending.delete(d.id); d.error ? p.rej(new Error(JSON.stringify(d.error))) : p.res(d.result); }
  };
  const send = (method, params = {}) => new Promise((res, rej) => { const id = nextId++; pending.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); });
  const js = async (expression) => {
    const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + " " + (r.exceptionDetails.exception?.description ?? ""));
    return r.result.value;
  };
  await send("Page.enable"); await send("Runtime.enable"); await send("Log.enable");
  return {
    send, js, events, proc, listeners,
    async goto(url, ready = "true") {
      await send("Page.navigate", { url });
      for (let i = 0; i < 200; i++) { try { if (await js(ready)) return; } catch { /* still loading */ } await sleep(100); }
      throw new Error("page did not become ready: " + url);
    },
    async viewport(width, height, dpr = 1) {
      await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: dpr, mobile: false });
    },
    async emulateMotion(reduce) {
      await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: reduce ? "reduce" : "no-preference" }] });
    },
    async shot(path) {
      const r = await send("Page.captureScreenshot", { format: "png" });
      writeFileSync(path, Buffer.from(r.data, "base64"));
      return path;
    },
    async close() {
      try { ws.close(); } catch { /* closed */ }
      proc.kill();
      await sleep(300);
      try { rmSync(profile, { recursive: true, force: true }); } catch { /* locked */ }
    },
  };
}
