// Visual evidence capture for Constellation Core. Reuses the existing GPU launcher and the harness's window.__core API.
// Input is scripted SYNTHETIC audio or the 120 BPM synthetic demo, never real music. Writes only new cc-* files here
// and refuses to overwrite. Run with the harness served on :5354 and the bundle built.
import { launchGpu, sleep } from "file:///C:/Users/USER/Desktop/audio_lab_work/2026-10-13_accretion-v0/audio_lab/web_kit/preview/cdp-lib-gpu.mjs";
import { writeFileSync, existsSync } from "node:fs";

const EV = "C:/Users/USER/Desktop/audio_lab_work/2026-10-13_accretion-v0/evidence-core/";
const READY = "!!(window.__core && window.__core.debug() && window.__core.debug().frames > 5)";
const C = "window.__core";
const SUSTAINED = "{ bass: 0.45, mid: 0.6, high: 0.35, rms: 0.55, onset: 0.2, scene: 'active' }";
const HITBASE = "{ bass: 0.3, mid: 0.5, high: 0.25, rms: 0.45, onset: 0.15, scene: 'active' }";
const data = { startedAt: new Date().toISOString(), shots: [], runs: {} };
const b = await launchGpu({ port: 9650, width: 1280, height: 900 });

const REC = `(() => {
  const d0 = ${C}.debug(); const gl = d0.host.three.getContext();
  const rec = { on: false, rows: [], buf: null, key: '' };
  ${C}.pipeline.onFrame(() => {
    if (!rec.on) return;
    const d = ${C}.debug(); if (!d || d.host.status !== 'ready') { rec.rows.push([performance.now(), null]); return; }
    const g = d.host.three.getContext(); const w = g.drawingBufferWidth, h = g.drawingBufferHeight;
    if (rec.key !== w + 'x' + h) { rec.buf = new Uint8Array(w * h * 4); rec.key = w + 'x' + h; }
    g.readPixels(0, 0, w, h, g.RGBA, g.UNSIGNED_BYTE, rec.buf);
    let s = 0, n = 0; const p = rec.buf;
    for (let i = 0; i < p.length; i += 16) { s += 0.2126 * p[i] + 0.7152 * p[i + 1] + 0.0722 * p[i + 2]; n++; }
    const a = d.anim;
    rec.rows.push([performance.now(), s / n / 255, a.beam, a.pulse, a.phase, a.exposure, a.glow, a.pulsesAccepted, a.pulsesRejected]);
  });
  window.__rec = rec; return true;
})()`;

async function fresh({ vw = 1280, vh = 900, dpr = 1, reduced = false }) {
  await b.emulateMotion(reduced); await b.viewport(vw, vh, dpr);
  await b.goto("http://localhost:5354/core?ev=" + Date.now(), READY);
  await b.js(REC); await sleep(600);
}
async function snap(name, note) {
  const p = EV + "cc-" + name + ".png";
  if (existsSync(p)) throw new Error("refusing to overwrite " + p);
  const t0 = await b.js("performance.now()");
  const before = await b.js(`(() => { const a = ${C}.debug().anim; return { beam: a.beam, pulse: a.pulse, phase: a.phase, glow: a.glow, exposure: a.exposure, motion: a.motion, accepted: a.pulsesAccepted, ring: a.pulseRing }; })()`);
  await b.shot(p);
  const rec = { name, file: "cc-" + name + ".png", note, t: t0, before };
  data.shots.push(rec); return rec;
}
const startRec = () => b.js("window.__rec.rows = []; window.__rec.on = true");
const stopRec = async () => { await b.js("window.__rec.on = false"); return b.js("window.__rec.rows"); };
const mouse = (type, x, y, buttons) => b.send("Input.dispatchMouseEvent", { type, x, y, button: type === "mouseMoved" && !buttons ? "none" : "left", buttons, clickCount: 1 });
async function drag(from, to, steps = 15) {
  await mouse("mouseMoved", from.x, from.y, 0); await mouse("mousePressed", from.x, from.y, 1);
  for (let i = 1; i <= steps; i++) { await mouse("mouseMoved", from.x + ((to.x - from.x) * i) / steps, from.y + ((to.y - from.y) * i) / steps, 1); await sleep(16); }
  await mouse("mouseReleased", to.x, to.y, 0);
}
function lumStats(rows, t0, t1) {
  const r = rows.filter((x) => x[1] !== null && x[0] >= t0 && x[0] <= t1);
  if (r.length < 3) return null;
  const m = r.map((x) => x[1]);
  const steps = m.slice(1).map((x, i) => Math.abs(x - m[i]));
  // largest change in frame-mean relative luminance within any ~100 ms window
  let win = 0; for (let i = 0; i < r.length; i++) { const sub = r.filter((x) => x[0] >= r[i][0] && x[0] <= r[i][0] + 100).map((x) => x[1]); if (sub.length > 1) win = Math.max(win, Math.max(...sub) - Math.min(...sub)); }
  const ints = r.slice(1).map((x, i) => x[0] - r[i][0]);
  return { frames: r.length, meanLum: m.reduce((s, x) => s + x, 0) / m.length, minLum: Math.min(...m), maxLum: Math.max(...m), maxFrameStep: Math.max(...steps), maxChange100ms: win, intervalMedian: ints.slice().sort((a, b) => a - b)[Math.floor(ints.length / 2)], intervalMax: Math.max(...ints) };
}

try {
  // A. rest
  await fresh({});
  await startRec(); await sleep(3000); let t = await b.js("performance.now()");
  data.runs.rest = { shot: await snap("A1-rest-silent", "no source, idle pipeline frame") };
  data.runs.rest.lum = lumStats(await stopRec(), t - 2500, t);
  await b.js(`${C}.script({ bass: 0.1, mid: 0.12, high: 0.05, rms: 0.12, onset: 0.05, scene: 'rest' })`); await sleep(4000);
  data.runs.restLow = { shot: await snap("A2-rest-low-energy", "scripted constant: rms .12 bass .10 mid .12 high .05") };

  // B. sustained: three stills about 0.5 s apart (stills, not a sequence), plus the synthetic demo
  await fresh({});
  await b.js(`${C}.script(${SUSTAINED})`); await startRec(); await sleep(4000);
  const s1 = await snap("B1-sustained-a", "scripted constant: rms .55 bass .45 mid .60 high .35, no hits, no beats");
  await sleep(500); const s2 = await snap("B2-sustained-b", "about +0.5 s");
  await sleep(500); const s3 = await snap("B3-sustained-c", "about +1 s"); await sleep(2000);
  t = await b.js("performance.now()");
  data.runs.sustained = { shots: [s1, s2, s3], lum: lumStats(await stopRec(), s1.t, t) };
  await fresh({}); await b.js(`${C}.demo()`); await sleep(5000);
  const d1 = await snap("B4-demo-synthetic-a", "harness demo source, 120 BPM synthetic (kick on every beat)"); await sleep(1300);
  const d2 = await snap("B5-demo-synthetic-b", "same session +1.3 s"); data.runs.demo = { shots: [d1, d2] };

  // C. one controlled bass event: before, burst, after (consecutive stills of ONE event)
  await fresh({});
  await b.js(`${C}.script(${HITBASE})`); await startRec(); await sleep(3500);
  const pre = await snap("C0-bass-pre", "scripted constant; no hit yet");
  const tHit = await b.js(`${C}.hit(1)`);
  const burst = [];
  for (let i = 0; i < 8; i++) { const s = await snap("C" + (i + 1) + "-bass-burst", "burst after hit(1) at page t=" + tHit.toFixed(0)); s.afterHitMs = s.t - tHit; burst.push(s); }
  await sleep(Math.max(0, 3000 - ((await b.js("performance.now()")) - tHit)));
  const post = await snap("C9-bass-post-3s", "about 3 s after the hit"); await sleep(400);
  t = await b.js("performance.now()");
  const recC = await stopRec();
  data.runs.bass = { tHit, pre, burst, post, curve: recC.filter((r) => r[1] !== null && r[0] >= tHit - 100 && r[0] <= tHit + 2400).filter((_, i) => i % 5 === 0).map((r) => [Math.round(r[0] - tHit), +r[2].toFixed(3), +r[1].toFixed(4), +r[6].toFixed(3)]), lumBefore: lumStats(recC, pre.t - 1500, tHit - 50), lumDuring: lumStats(recC, tHit, tHit + 600), lumAfter: lumStats(recC, post.t - 400, t) };

  // D. onset: one beat, then a 20-beat train
  await fresh({});
  await b.js(`${C}.script(${HITBASE})`); await startRec(); await sleep(3500);
  const opre = await snap("D0-onset-pre", "scripted constant; no beat yet");
  const tBeat = await b.js(`${C}.beat(0.9)`);
  const oburst = [];
  for (let i = 0; i < 4; i++) { const s = await snap("D" + (i + 1) + "-onset-burst", "burst after one beat(0.9) at page t=" + tBeat.toFixed(0)); s.afterBeatMs = s.t - tBeat; oburst.push(s); }
  await sleep(2200);
  const tTrain = await b.js(`${C}.train(20, 60, 0.9)`); await sleep(450);
  const otrain = await snap("D5-onset-train-mid", "during a scripted train of 20 beat frames, 60 ms apart"); await sleep(2800);
  t = await b.js("performance.now()");
  const recD = await stopRec();
  data.runs.onset = { tBeat, tTrain, pre: opre, burst: oburst, train: otrain, trainLum: lumStats(recD, tTrain, tTrain + 1700), lumBefore: lumStats(recD, opre.t - 1500, tBeat - 50),
    trainCounts: recD.filter((r) => r[1] !== null && r[0] >= tTrain && r[0] <= tTrain + 2600).map((r) => [r[7], r[8]]).slice(-1)[0] };

  // E. normal vs reduced under the same scripted sequence (fresh page each, same viewport)
  async function seq(label, reduced) {
    await fresh({ reduced });
    const info = await b.js(`({ hostReduced: ${C}.debug().host.reducedMotion })`);
    await b.js(`${C}.script(${SUSTAINED})`); await startRec(); await sleep(4500);
    const a = await snap("E-" + label + "-1-sustained", "scripted SUSTAINED input, " + label);
    await sleep(700); const tH = await b.js(`${C}.hit(1)`); await sleep(90);
    const h = await snap("E-" + label + "-2-hit", "about 0.1 s after hit(1), " + label); h.afterHitMs = h.t - tH;
    await sleep(2500); const tB = await b.js(`${C}.beat(0.9)`); await sleep(70);
    const be = await snap("E-" + label + "-3-beat", "about 0.1 s after beat(0.9), " + label); be.afterBeatMs = be.t - tB;
    await sleep(1500); const rec = await stopRec();
    const peaks = rec.filter((r) => r[1] !== null);
    return { info, a, h, be, beamPeak: Math.max(...peaks.map((r) => r[2])), pulsePeak: Math.max(...peaks.map((r) => r[3])), lum: lumStats(rec, a.t - 2500, a.t) };
  }
  data.runs.normal = await seq("normal", false);
  data.runs.reduced = await seq("reduced", true);
  await b.emulateMotion(false);

  // F. composition
  data.runs.composition = [];
  for (const [vw, vh, dpr] of [[1280, 720, 1], [1920, 1080, 1], [1280, 900, 1], [768, 1024, 1], [390, 844, 1]]) {
    await fresh({ vw, vh, dpr }); await b.js(`${C}.script(${SUSTAINED})`); await sleep(3500);
    const dims = await b.js(`(() => { const cv = document.querySelector('canvas'); return { client: [cv.clientWidth, cv.clientHeight], fit: ${C}.fits() }; })()`);
    const s = await snap("F-comp-" + vw + "x" + vh, "scripted sustained input, DPR " + dpr);
    data.runs.composition.push({ vw, vh, dpr, dims, shot: s.file });
  }

  // F2. depth views by drag (recorded input)
  await fresh({});
  await b.js(`${C}.script(${HITBASE})`); await sleep(3500);
  const rect = await b.js("(() => { const r = document.querySelector('canvas').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; })()");
  const cx = rect.x + rect.w / 2, cy = rect.y + rect.h * 0.35;
  await drag({ x: cx, y: cy }, { x: cx, y: cy + 150 }); await sleep(1500);
  data.runs.elevated = await snap("F2a-view-elevated", "drag down 150 px: elevation +0.6 rad on top of the default 0.35, clamped");
  await b.js(`${C}.hit(1)`); await sleep(100);
  data.runs.elevatedHit = await snap("F2b-view-elevated-hit", "same view about 0.1 s after hit(1)"); await sleep(2500);
  await drag({ x: cx, y: cy + 150 }, { x: cx, y: cy - 400 }, 20); await sleep(1500);
  data.runs.lowView = await snap("F2c-view-low", "drag up: elevation clamped low");
  data.consoleEvents = b.events.slice(0, 20);
} catch (e) { data.error = String(e && e.stack || e); console.error("FAILED", data.error); }
finally { writeFileSync(EV + "cc-evidence-data.json", JSON.stringify(data, null, 1)); await b.close(); }
console.log("done; shots:", data.shots.length, "error:", data.error ?? "none");
