// Second capture script: the depth views (drag-to-orbit). review-capture.mjs reached this section but the GPU launcher has no
// drag helper, so the drag is dispatched here through CDP Input.dispatchMouseEvent. New review-* files only; never overwrites.
import { launchGpu, sleep } from "file:///C:/Users/USER/Desktop/audio_lab_work/2026-10-13_accretion-v0/audio_lab/web_kit/preview/cdp-lib-gpu.mjs";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const EV = "C:/Users/USER/Desktop/audio_lab_work/2026-10-13_accretion-v0/evidence/";
const src = readFileSync(EV + "review-capture.mjs", "utf8");
const HELPERS = src.slice(src.indexOf("const HELPERS = `") + "const HELPERS = ".length, src.indexOf("`;", src.indexOf("const HELPERS = `")) + 1).slice(1, -1);
const READY = "!!(window.__accretion && window.__accretion.debug() && window.__accretion.debug().frames > 5)";
const data = { startedAt: new Date().toISOString(), shots: [], runs: {} };
const b = await launchGpu({ port: 9613, width: 1280, height: 900 });
const mouse = (type, x, y, buttons) => b.send("Input.dispatchMouseEvent", { type, x, y, button: type === "mouseMoved" && !buttons ? "none" : "left", buttons, clickCount: 1 });
async function drag(from, to, steps = 15) {
  await mouse("mouseMoved", from.x, from.y, 0); await mouse("mousePressed", from.x, from.y, 1);
  for (let i = 1; i <= steps; i++) { await mouse("mouseMoved", from.x + ((to.x - from.x) * i) / steps, from.y + ((to.y - from.y) * i) / steps, 1); await sleep(16); }
  await mouse("mouseReleased", to.x, to.y, 0);
}
async function snap(name, note) {
  const p = EV + "review-" + name + ".png";
  if (existsSync(p)) throw new Error("refusing to overwrite " + p);
  const before = await b.js("window.__rv.snapState()");
  await b.shot(p);
  const rec = { name, file: "review-" + name + ".png", note, before, after: await b.js("window.__rv.snapState()") };
  data.shots.push(rec); return rec;
}
try {
  await b.emulateMotion(false); await b.viewport(1280, 900, 1);
  await b.goto("http://localhost:5354/accretion?review=" + Date.now(), READY);
  await b.js(HELPERS); await sleep(700);
  await b.js("window.__rv.use()");
  await b.js(`window.__rv.set({ bass: 0.3, mid: 0.5, high: 0.25, rms: 0.45, onset: 0.15, scene: 'active' })`);
  await sleep(3500);
  const rect = await b.js("(() => { const r = document.querySelector('canvas').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; })()");
  const cx = rect.x + rect.w / 2, cy = rect.y + rect.h * 0.35;
  data.runs.canvasRect = rect;
  await drag({ x: cx, y: cy }, { x: cx, y: cy + 150 }); await sleep(1500);
  data.runs.elevated = await snap("F2a-view-elevated", "scripted hit-base input; drag down 150 px: elevation about +0.6 rad");
  await b.js("window.__rv.hit(1)"); await sleep(100);
  data.runs.elevatedHit = await snap("F2b-view-elevated-hit", "same view about 0.1 s after hit(1)");
  await sleep(2500);
  await drag({ x: cx, y: cy + 150 }, { x: cx, y: cy - 400 }, 20); await sleep(1500);
  data.runs.lowEdge = await snap("F2c-view-low-edge-on", "drag up; elevation clamps at -0.15: near edge-on");
  await drag({ x: cx - 200, y: cy }, { x: cx + 300, y: cy }, 20); await sleep(1200);
  data.runs.azimuth = await snap("F2d-view-azimuth-shifted", "horizontal drag 500 px: azimuth shifted by about 3 rad");
  data.consoleEvents = b.events.slice(0, 20);
} catch (e) { data.error = String(e && e.stack || e); console.error("FAILED", data.error); }
finally { writeFileSync(EV + "review-data-views.json", JSON.stringify(data, null, 1)); await b.close(); }
console.log("done; shots:", data.shots.length, "error:", data.error ?? "none");
