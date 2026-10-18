// Browser verification of the audio pipeline, driven through the Chrome DevTools Protocol.
// Run from the project root:
//   node --import ./tests/resolve-ts.mjs --experimental-transform-types preview/cdp-check.mjs
// Needs the preview server (node preview/serve.mjs 5353) and Microsoft Edge. Uses real mouse events,
// a real file chosen through the page's file input, a real (fake-device) microphone stream, and a real AnalyserNode.
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { loadOfflineSource } from "../src/lib/pipeline/index.ts";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9333;
const SITE = "http://localhost:5353/instrument";
const SHOTS = join(root, "shots");
mkdirSync(SHOTS, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const profileDir = mkdtempSync(join(tmpdir(), "edge-cdp-"));
const edge = spawn(
  EDGE,
  [
    "--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profileDir}`,
    "--autoplay-policy=no-user-gesture-required", "--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream",
    "--window-size=1100,860", "--disable-gpu", "about:blank",
  ],
  { stdio: "ignore" },
);

let ws;
let nextId = 1;
const pending = new Map();
const send = (method, params = {}) =>
  new Promise((res, rej) => {
    const id = nextId++;
    pending.set(id, { res, rej });
    ws.send(JSON.stringify({ id, method, params }));
  });

async function connect() {
  for (let i = 0; i < 100; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) {
        ws = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise((res, rej) => {
          ws.onopen = res;
          ws.onerror = rej;
        });
        ws.onmessage = (m) => {
          const d = JSON.parse(m.data);
          if (d.method === "Runtime.exceptionThrown") console.log("      [page exception]", d.params.exceptionDetails.exception?.description ?? d.params.exceptionDetails.text);
          if (d.method === "Runtime.consoleAPICalled" && d.params.type === "error") console.log("      [page console.error]", d.params.args.map((a) => a.value ?? a.description).join(" "));
          if (d.id && pending.has(d.id)) {
            const p = pending.get(d.id);
            pending.delete(d.id);
            d.error ? p.rej(new Error(JSON.stringify(d.error))) : p.res(d.result);
          }
        };
        return;
      }
    } catch {
      /* not up yet */
    }
    await sleep(100);
  }
  throw new Error("could not connect to Edge");
}

const js = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + " " + JSON.stringify(r.exceptionDetails.exception?.description));
  return r.result.value;
};

async function open(query = "") {
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Page.navigate", { url: SITE + query });
  for (let i = 0; i < 100; i++) {
    // Wait for the pre-computed songs to appear in the picker too: they shift the layout when they load.
    if (await js(`!!window.__diag && !!window.__pipeline && !!document.querySelector('[data-source="song:detty"]')`)) {
      await sleep(200);
      return;
    }
    await sleep(100);
  }
  throw new Error("page did not mount");
}

/** A real mouse click at the element's centre. */
async function click(sel) {
  const box = await js(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; e.scrollIntoView({block:'center'}); const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, disabled: !!e.disabled }; })()`);
  if (!box) throw new Error(`no element ${sel}`);
  if (box.disabled) throw new Error(`${sel} is disabled`);
  for (const type of ["mouseMoved", "mousePressed", "mouseReleased"]) {
    await send("Input.dispatchMouseEvent", { type, x: box.x, y: box.y, button: "left", buttons: type === "mousePressed" ? 1 : 0, clickCount: 1 });
  }
}

async function shot(name) {
  const r = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(join(SHOTS, name), Buffer.from(r.data, "base64"));
}

const summary = () =>
  js(`(() => { const d = window.__diag, s = d.series, st = window.__pipeline.getState(); const mx = (k) => s.length ? Math.max(...s.map((x) => x[k])) : 0;
    return { kind: st.source?.kind ?? null, label: st.source?.label ?? null, canSeek: st.source?.canSeek ?? null, isPlaying: st.isPlaying, duration: st.duration, error: st.error, latencyMs: st.latencyMs,
      frames: d.frames, beats: d.beats, samples: s.length, max: { bass: mx('bass'), mid: mx('mid'), high: mx('high'), rms: mx('rms'), hit: mx('hit') },
      scenes: [...new Set(s.map((x) => x.scene))], lastTime: s.length ? s[s.length - 1].time : 0, heading: document.querySelector('#instrument-title')?.textContent, dataScene: document.querySelector('section')?.getAttribute('data-scene') }; })()`);

const results = {};
const check = (name, ok, detail) => {
  results[name] = ok;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  " + detail : ""}`);
};

// ---- offline reference, for comparing the live path against --------------------------------------
function serveFromDisk() {
  globalThis.fetch = (async (url) => {
    try {
      return new Response(readFileSync(join(root, "public", String(url).replace(/^\//, ""))), { status: 200 });
    } catch {
      return new Response("not found", { status: 404 });
    }
  });
}
const pearson = (a, b) => {
  const n = a.length;
  const ma = a.reduce((x, y) => x + y, 0) / n;
  const mb = b.reduce((x, y) => x + y, 0) / n;
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < n; i++) {
    num += (a[i] - ma) * (b[i] - mb);
    da += (a[i] - ma) ** 2;
    db += (b[i] - mb) ** 2;
  }
  return da > 0 && db > 0 ? num / Math.sqrt(da * db) : 0;
};

try {
  await connect();

  // 1. Demo source, a real click, then swap the visual without touching the audio.
  await open();
  await click('[data-source="demo"]');
  await sleep(4000);
  let s = await summary();
  check("demo: plays through the pipeline", s.kind === "synthetic" && s.isPlaying && s.frames > 100, `kind=${s.kind} frames=${s.frames}`);
  check("demo: beats and a strong bass hit reach the consumer", s.beats >= 4 && s.max.hit > 0.7, `beats=${s.beats} maxHit=${s.max.hit.toFixed(2)}`);
  await shot("pipe_demo_constellation.png");
  const t0 = (await summary()).lastTime;
  await click('[data-visual="particles"]');
  await sleep(1500);
  s = await summary();
  check("visual swap: constellation to particles, same source, uninterrupted", s.heading === "Particle field" && s.kind === "synthetic" && s.isPlaying && s.lastTime > t0, `heading=${s.heading} time ${t0.toFixed(1)} -> ${s.lastTime.toFixed(1)}`);
  await shot("pipe_demo_particles.png");

  // 2. A pre-computed track, with a real click.
  await open();
  await click('[data-source="song:seyi"]');
  await sleep(3500);
  s = await summary();
  check("offline: pre-computed track loads and plays", s.kind === "offline" && s.isPlaying && s.canSeek === true && Math.round(s.duration) === 78, `kind=${s.kind} duration=${s.duration}`);
  check("offline: features reach the consumer", s.max.bass > 0.2 && s.beats >= 2 && s.scenes.length >= 1, `maxBass=${s.max.bass.toFixed(2)} beats=${s.beats} scenes=${s.scenes}`);
  await js(`window.__pipeline.seek(40)`);
  await sleep(1200);
  s = await summary();
  check("offline: seek jumps the playhead", s.lastTime > 39.5 && s.lastTime < 43, `time=${s.lastTime.toFixed(2)}`);
  await shot("pipe_offline_seyi.png");

  // 3. A file through the page's own file picker (live path, real AnalyserNode), compared with the offline analysis of the same audio.
  await open();
  const doc = await send("DOM.getDocument");
  const input = await send("DOM.querySelector", { nodeId: doc.root.nodeId, selector: 'input[type="file"]' });
  await send("DOM.setFileInputFiles", { files: [join(root, "preview/_test/detty_40_60.wav")], nodeId: input.nodeId });
  await sleep(800);
  await click("[data-play]");
  await sleep(500);
  await js(`window.__diag.reset()`);
  await sleep(11000);
  s = await summary();
  check("live file: analysed in a real browser", s.kind === "live" && s.isPlaying && s.max.bass > 0.3 && s.max.mid > 0.2 && s.max.high > 0.05, `max bass=${s.max.bass.toFixed(2)} mid=${s.max.mid.toFixed(2)} high=${s.max.high.toFixed(2)}`);
  check("live file: onsets and bass hits detected", s.beats >= 8 && s.max.hit > 0.5, `beats=${s.beats} maxHit=${s.max.hit.toFixed(2)}`);
  const live = await js(`window.__diag.series.filter((x) => x.playing)`);
  await shot("pipe_live_file.png");
  serveFromDisk();
  // Sample the offline analysis at (excerpt start + live time) using its own clock via seek and a fake time source.
  const clock = { ms: 0 };
  const off2 = await loadOfflineSource({ manifestUrl: "/motion/manifest.json", songId: "detty", now: () => clock.ms });
  await off2.play();
  const fields = [["bass", "bass"], ["mid", "mid"], ["high", "high"], ["rmsEnergy", "rms"], ["bassHit", "hit"]];
  const settled = live.filter((x) => x.time > 5);
  const lagged = (lagS) => {
    const out = {};
    for (const [of, lf] of fields) {
      const a = [], b = [];
      for (const x of settled) {
        clock.ms = 0;
        off2.seek(40 + x.time - lagS);
        const f = off2.sample(0);
        a.push(f[of]);
        b.push(x[lf]);
      }
      out[of] = pearson(a, b);
    }
    return out;
  };
  let best = { lag: 0, c: lagged(0) };
  for (const lag of [-0.2, -0.15, -0.1, -0.05, 0.05, 0.1, 0.15, 0.2]) {
    const c = lagged(lag);
    if (c.bass + c.mid + c.rmsEnergy > best.c.bass + best.c.mid + best.c.rmsEnergy) best = { lag, c };
  }
  console.log("      live vs offline analysis of the same audio (Pearson r, best lag " + (best.lag * 1000).toFixed(0) + " ms, " + settled.length + " samples):", Object.entries(best.c).map(([k, v]) => `${k} ${v.toFixed(2)}`).join(", "));
  check("live vs offline agree on band levels", best.c.bass > 0.8 && best.c.mid > 0.8 && best.c.rmsEnergy > 0.8, `bass ${best.c.bass.toFixed(2)} mid ${best.c.mid.toFixed(2)} rms ${best.c.rmsEnergy.toFixed(2)}`);
  writeFileSync(join(SHOTS, "pipe_live_vs_offline.json"), JSON.stringify({ lagMs: best.lag * 1000, pearson: best.c }, null, 1));

  // 4. The microphone (a fake capture device that emits a repeating tone), then switch back to a pre-computed track on the same page.
  await open();
  await click('[data-source="mic"]');
  await sleep(5000);
  s = await summary();
  check("mic: a live stream drives the same pipeline", s.kind === "live" && s.label === "Microphone" && s.isPlaying && s.canSeek === false, `label=${s.label} canSeek=${s.canSeek} error=${s.error}`);
  check("mic: audio energy reaches the consumer", s.max.rms > 0.05 && s.frames > 30, `maxRms=${s.max.rms.toFixed(2)} frames=${s.frames}`);
  await shot("pipe_mic.png");
  await click('[data-source="song:detty"]');
  await sleep(3000);
  s = await summary();
  check("switch mic to pre-computed track with no change to the page", s.kind === "offline" && s.isPlaying && s.label?.startsWith("Detty"), `kind=${s.kind} label=${s.label}`);
  await click('[data-source="demo"]');
  await sleep(1500);
  s = await summary();
  check("switch to demo again", s.kind === "synthetic" && s.isPlaying, `kind=${s.kind}`);
} finally {
  try { ws?.close(); } catch { /* ignore */ }
  edge.kill();
  await sleep(500);
  try { rmSync(profileDir, { recursive: true, force: true }); } catch { /* ignore */ }
}

const failed = Object.entries(results).filter(([, ok]) => !ok).map(([k]) => k);
console.log(failed.length ? `\n${failed.length} FAILED` : `\nall ${Object.keys(results).length} browser checks passed`);
process.exit(failed.length ? 1 : 0);
