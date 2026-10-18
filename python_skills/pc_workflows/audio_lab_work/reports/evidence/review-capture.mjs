// Visual-review capture for Accretion v0. Read-only with respect to the project: it reuses the existing GPU launcher and
// the harness's exposed pipeline, injects a scripted (synthetic) FeatureSource through pipeline.setSource, and writes
// ONLY new files named review-* into this evidence folder. Refuses to overwrite anything.
import { launchGpu, sleep } from "file:///C:/Users/USER/Desktop/audio_lab_work/2026-10-13_accretion-v0/audio_lab/web_kit/preview/cdp-lib-gpu.mjs";
import { writeFileSync, existsSync } from "node:fs";

const EV = "C:/Users/USER/Desktop/audio_lab_work/2026-10-13_accretion-v0/evidence/";
const URL0 = "http://localhost:5354/accretion";
const READY = "!!(window.__accretion && window.__accretion.debug() && window.__accretion.debug().frames > 5)";
const data = { startedAt: new Date().toISOString(), runs: {}, shots: [] };

const b = await launchGpu({ port: 9612, width: 1280, height: 900 });

const HELPERS = `(() => {
  const A = window.__accretion;
  const ctl = { bass: 0, mid: 0, high: 0, rms: 0, onset: 0, onsetPeak: 0, scene: 'rest', beatQ: 0, hitAt: -1e9, hitLevel: 0, log: [] };
  const status = { playing: true, duration: null, error: null };
  const src = {
    id: 'review-ctl', kind: 'synthetic', label: 'Review scripted input (synthetic)', canSeek: false, latencyMs: 0,
    sample(nowS) {
      const hit = ctl.hitLevel * Math.exp(-Math.max(0, nowS - ctl.hitAt) / 0.15);
      const beat = ctl.beatQ > 0; if (beat) ctl.beatQ--;
      return Object.freeze({ time: nowS, progress: 0, isPlaying: true, bass: Math.min(1, ctl.bass + 0.5 * hit), mid: ctl.mid, high: ctl.high,
        rmsEnergy: ctl.rms, onsetStrength: beat ? ctl.onsetPeak : ctl.onset, beatDetected: beat, currentSceneState: ctl.scene, bassHit: hit });
    },
    play() { return Promise.resolve(); }, pause() {}, seek() {}, status() { return status; }, onStatus() { return () => {}; }, dispose() {},
  };
  const rv = { ctl, rec: [], recording: false, unsub: null, bufs: {} };
  rv.use = () => { A.pipeline.setSource(src); return A.pipeline.play().then(() => true); };
  rv.set = (o) => { Object.assign(ctl, o); ctl.log.push([performance.now(), 'set', o]); };
  rv.hit = (l = 1) => { ctl.hitLevel = l; ctl.hitAt = performance.now() / 1000; ctl.log.push([performance.now(), 'hit', l]); return performance.now(); };
  rv.beat = (s = 0.9) => { ctl.onsetPeak = s; ctl.beatQ = 1; ctl.log.push([performance.now(), 'beat', s]); return performance.now(); };
  rv.train = (n, ms, s = 0.9) => { let k = 0; const id = setInterval(() => { rv.beat(s); if (++k >= n) clearInterval(id); }, ms); return performance.now(); };
  const lum = (a, i) => (0.2126 * a[i] + 0.7152 * a[i + 1] + 0.0722 * a[i + 2]) / 255;
  const proj = (cam, dx) => { const V = cam.matrixWorldInverse.elements, P = cam.projectionMatrix.elements;
    const vx = V[12] + dx, vy = V[13], vz = V[14];
    const x = P[0] * vx + P[4] * vy + P[8] * vz + P[12], y = P[1] * vx + P[5] * vy + P[9] * vz + P[13], w = P[3] * vx + P[7] * vy + P[11] * vz + P[15];
    return [x / w, y / w]; };
  function onFrame() {
    if (!rv.recording) return;
    const d = A.debug(); const r = d && d.host.three;
    if (!r || d.host.status !== 'ready') { rv.rec.push([performance.now(), null]); return; }
    const gl = r.getContext(); const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
    const cam = d.scene.camera;
    const c = proj(cam, 0); const radius = 1 + 0.04 * d.anim.horizon; const e = proj(cam, radius);
    const cx = (c[0] * 0.5 + 0.5) * w, cy = (c[1] * 0.5 + 0.5) * h, R = Math.abs(e[0] - c[0]) * 0.5 * w;
    const key = w + 'x' + h; if (rv.bufs.key !== key) { rv.bufs = { key, row: new Uint8Array(w * 4), col: new Uint8Array(h * 4) }; }
    const xi = Math.min(w - 1, Math.max(0, Math.round(cx))), yi = Math.min(h - 1, Math.max(0, Math.round(cy)));
    gl.readPixels(0, yi, w, 1, gl.RGBA, gl.UNSIGNED_BYTE, rv.bufs.row);
    gl.readPixels(xi, 0, 1, h, gl.RGBA, gl.UNSIGNED_BYTE, rv.bufs.col);
    const { row, col } = rv.bufs;
    const meanCol = (a, b2) => { let s = 0, n = 0, mx = 0; for (let y = Math.max(0, Math.round(a)); y <= Math.min(h - 1, Math.round(b2)); y++) { const v = lum(col, y * 4); s += v; n++; if (v > mx) mx = v; } return n ? [s / n, mx] : [NaN, NaN]; };
    const meanRow = (a, b2) => { let s = 0, n = 0; for (let x = Math.max(0, Math.round(a)); x <= Math.min(w - 1, Math.round(b2)); x++) { s += lum(row, x * 4); n++; } return n ? s / n : NaN; };
    const centre = meanCol(cy + 0.1 * R, cy + 0.7 * R)[0];
    const ring = meanCol(cy + 0.9 * R, cy + 1.2 * R)[1];
    const jet = meanCol(cy + 2 * R, cy + 6 * R);
    const disk = (meanRow(cx + 2.2 * R, cx + 5 * R) + meanRow(cx - 5 * R, cx - 2.2 * R)) / 2;
    const bg = (meanRow(0, w * 0.08) + meanRow(w * 0.92, w - 1)) / 2;
    const a = d.anim;
    rv.rec.push([performance.now(), { jet: a.jet, flare: a.flare, expo: a.exposure, rim: a.rimGlow, hor: a.horizon, spd: a.diskSpeed, mot: a.motion, ph: a.diskPhase,
      cLum: centre, rLum: ring, dLum: disk, jLum: jet[0], jMax: jet[1], bgLum: bg, fa: a.flaresAccepted, fr: a.flaresRejected, R, scn: a.sceneLevel }]);
  }
  rv.startRec = () => { rv.rec = []; if (!rv.unsub) rv.unsub = A.pipeline.onFrame(onFrame); rv.recording = true; };
  rv.stopRec = () => { rv.recording = false; const out = rv.rec; rv.rec = []; return out; };
  rv.snapState = () => { const d = A.debug(); const a = d.anim; return { t: performance.now(), jet: a.jet, flare: a.flare, expo: a.exposure, rim: a.rimGlow, hor: a.horizon, mot: a.motion, spd: a.diskSpeed, ph: a.diskPhase,
    colour: a.diskColour, fa: a.flaresAccepted, fr: a.flaresRejected, status: d.host.status, params: d.lastParams }; };
  window.__rv = rv;
  return true;
})()`;

async function fresh({ vw, vh, dpr = 1, reduced = false }) {
  await b.emulateMotion(reduced);
  await b.viewport(vw, vh, dpr);
  await b.goto(URL0 + "?review=" + Date.now(), READY);
  await b.js(HELPERS);
  await sleep(700);
}

async function snap(name, note = "") {
  const p = EV + "review-" + name + ".png";
  if (existsSync(p)) throw new Error("refusing to overwrite " + p);
  const before = await b.js("window.__rv.snapState()");
  await b.shot(p);
  const after = await b.js("window.__rv.snapState()");
  const rec = { name, file: "review-" + name + ".png", note, before, after };
  data.shots.push(rec);
  return rec;
}

const now = () => b.js("performance.now()");
const SUSTAINED = { bass: 0.45, mid: 0.6, high: 0.35, rms: 0.55, onset: 0.2, scene: "active" };
const HITBASE = { bass: 0.3, mid: 0.5, high: 0.25, rms: 0.45, onset: 0.15, scene: "active" };
const set = (o) => b.js(`window.__rv.set(${JSON.stringify(o)})`);

function summarise(rec, t0, t1) {
  const rows = rec.filter((r) => r[1] && r[0] >= t0 && r[0] <= t1);
  if (!rows.length) return null;
  const col = (k) => rows.map((r) => r[1][k]).filter(Number.isFinite);
  const mean = (a) => a.reduce((s, x) => s + x, 0) / (a.length || 1);
  const sd = (a) => { const m = mean(a); return Math.sqrt(mean(a.map((x) => (x - m) ** 2))); };
  const maxStep = (a) => a.slice(1).reduce((m, x, i) => Math.max(m, Math.abs(x - a[i])), 0);
  const ints = rows.slice(1).map((r, i) => r[0] - rows[i][0]);
  const out = { frames: rows.length, intervalMs: { median: ints.slice().sort((x, y) => x - y)[Math.floor(ints.length / 2)], max: Math.max(...ints) } };
  for (const k of ["jet", "flare", "cLum", "rLum", "dLum", "jLum", "jMax", "bgLum", "expo", "rim", "R"]) { const c = col(k); out[k] = { mean: mean(c), min: Math.min(...c), max: Math.max(...c), sd: sd(c), maxFrameStep: maxStep(c) }; }
  const ph = col("ph"); out.phaseRate = ph.length > 1 ? (ph[ph.length - 1] - ph[0]) / ((rows[rows.length - 1][0] - rows[0][0]) / 1000) : null;
  return out;
}

try {
  // ---------- Provenance ----------
  await fresh({ vw: 1280, vh: 900 });
  const prov = await b.js(`(async () => {
    const A = window.__accretion, d = A.debug(), gl = d.host.three.getContext(), cv = gl.canvas;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const buf = await (await fetch('/accretion.js', { cache: 'no-store' })).arrayBuffer();
    const h = await crypto.subtle.digest('SHA-256', buf);
    const scripts = [...document.scripts].map((s) => s.src);
    return { href: location.href, scripts, bundleBytes: buf.byteLength, bundleSha256: [...new Uint8Array(h)].map((x) => x.toString(16).padStart(2, '0')).join(''),
      ua: navigator.userAgent, renderer: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : null, vendor: ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) : null,
      glVersion: gl.getParameter(gl.VERSION), isWebGL2: (typeof WebGL2RenderingContext !== 'undefined') && gl instanceof WebGL2RenderingContext,
      innerW: innerWidth, innerH: innerHeight, dpr: devicePixelRatio, canvasAttr: [cv.width, cv.height], canvasClient: [cv.clientWidth, cv.clientHeight],
      drawingBuffer: [gl.drawingBufferWidth, gl.drawingBufferHeight], pixelRatioInUse: d.host.pixelRatioInUse,
      reducedMotionMedia: matchMedia('(prefers-reduced-motion: reduce)').matches, hostReduced: d.host.reducedMotion, hostStatus: d.host.status,
      sourceKind: A.pipeline.getState().source?.kind ?? 'none (silent)', frames: d.frames, programs: d.host.three.info.programs?.length, geometries: d.host.three.info.memory.geometries, hidden: document.hidden };
  })()`);
  const brw = await b.send("Browser.getVersion");
  prov.browserVersion = brw.product; prov.browserRevision = brw.revision; prov.jsVersion = brw.jsVersion;
  // stability: frames advance and intervals settle
  await b.js("window.__accretion.mark()"); await sleep(2000);
  prov.stability = await b.js("window.__accretion.timing()");
  data.provenance = prov;
  console.log("provenance", JSON.stringify(prov));

  // ---------- A. Resting ----------
  await fresh({ vw: 1280, vh: 900 });
  await b.js("window.__rv.startRec()"); await sleep(4000);
  let t = await now();
  data.runs.restSilent = { shot: await snap("A1-rest-silent", "no source, pipeline idle frame"), summary: null };
  await sleep(1500);
  data.runs.restSilent.shot2 = await snap("A1b-rest-silent-plus1p5s", "same session 1.5 s later");
  data.runs.restSilent.summary = summarise(await b.js("window.__rv.stopRec()"), t - 3000, t + 2000);

  await fresh({ vw: 1280, vh: 900 });
  await b.js("window.__rv.use()"); await set({ bass: 0.1, mid: 0.12, high: 0.05, rms: 0.12, onset: 0.05, scene: "rest" });
  await b.js("window.__rv.startRec()"); await sleep(4500); t = await now();
  data.runs.restLow = { shot: await snap("A2-rest-low-energy", "scripted constant: bass .10 mid .12 high .05 rms .12 scene rest") };
  data.runs.restLow.summary = summarise(await b.js("window.__rv.stopRec()"), t - 3000, t);

  // ---------- B. Sustained ----------
  await fresh({ vw: 1280, vh: 900 });
  await b.js("window.__rv.use()"); await set(SUSTAINED);
  await b.js("window.__rv.startRec()"); await sleep(4500);
  await b.js("window.__accretion.mark()");
  const s1 = await snap("B1-sustained-a", "scripted constant: bass .45 mid .6 high .35 rms .55 scene active, no hits, no beats");
  await sleep(500);
  const s2 = await snap("B2-sustained-b", "same session, burst ~0.5 s later");
  await sleep(500);
  const s3 = await snap("B3-sustained-c", "same session, burst ~1 s after first");
  await sleep(2500); t = await now();
  data.runs.sustained = { shots: [s1, s2, s3], timing: await b.js("window.__accretion.timing()"), summary: summarise(await b.js("window.__rv.stopRec()"), s1.before.t, t) };

  // synthetic demo (kick every beat, 120 BPM, mixed features), shown separately and labelled synthetic
  await fresh({ vw: 1280, vh: 900 });
  await b.js("window.__accretion.demo()"); await sleep(5000);
  const d1 = await snap("B4-demo-synthetic-a", "harness demo source, 120 BPM synthetic (kick on every beat)");
  await sleep(1300);
  const d2 = await snap("B5-demo-synthetic-b", "same session 1.3 s later");
  data.runs.demo = { shots: [d1, d2] };

  // ---------- C. Bass impulse (dense) ----------
  await fresh({ vw: 1280, vh: 900 });
  await b.js("window.__rv.use()"); await set(HITBASE);
  await b.js("window.__rv.startRec()"); await sleep(3500);
  const pre = await snap("C0-bass-pre", "scripted constant, no hit yet");
  const tHit = await b.js("window.__rv.hit(1)");
  const burst = [];
  for (let i = 0; i < 9; i++) { const s = await snap("C" + (i + 1) + "-bass-burst", "burst after hit(1) at page t=" + tHit.toFixed(0)); s.afterHitMs = s.before.t - tHit; burst.push(s); }
  await sleep(Math.max(0, 3000 - ((await now()) - tHit)));
  const post = await snap("C10-bass-post-3s", "about 3 s after the hit");
  await sleep(500); t = await now();
  const recC = await b.js("window.__rv.stopRec()");
  data.runs.bass = { tHit, pre, burst, post, summaryPre: summarise(recC, pre.before.t - 1500, tHit - 50), summaryPost: summarise(recC, post.before.t - 500, t),
    jetCurve: recC.filter((r) => r[1] && r[0] >= tHit - 100 && r[0] <= tHit + 2500).map((r) => [Math.round(r[0] - tHit), +r[1].jet.toFixed(3), +r[1].jLum.toFixed(4), +r[1].rLum.toFixed(3), +r[1].dLum.toFixed(3), +r[1].rim.toFixed(3), +r[1].hor.toFixed(3)]) };

  // ---------- D. Onset / flare ----------
  await fresh({ vw: 1280, vh: 900 });
  await b.js("window.__rv.use()"); await set(HITBASE);
  await b.js("window.__rv.startRec()"); await sleep(3500);
  const opre = await snap("D0-onset-pre", "scripted constant, no beat yet");
  const stateBefore = await b.js("window.__rv.snapState()");
  const tBeat = await b.js("window.__rv.beat(0.9)");
  const oburst = [];
  for (let i = 0; i < 4; i++) { const s = await snap("D" + (i + 1) + "-onset-burst", "burst after single beat(0.9) at page t=" + tBeat.toFixed(0)); s.afterBeatMs = s.before.t - tBeat; oburst.push(s); }
  await sleep(2000);
  const stateMid = await b.js("window.__rv.snapState()");
  const tTrain = await b.js("window.__rv.train(20, 60, 0.9)"); // 20 onset frames, one every ~60 ms (about 16 per second) for ~1.2 s
  await sleep(450);
  const otrain1 = await snap("D5-onset-train-mid", "during a scripted train of 20 beat frames (60 ms apart)");
  await sleep(1800);
  const stateAfter = await b.js("window.__rv.snapState()");
  const otrain2 = await snap("D6-onset-train-after", "about 2 s after the train started");
  t = await now();
  const recD = await b.js("window.__rv.stopRec()");
  data.runs.onset = { tBeat, tTrain, stateBefore, stateMid, stateAfter, pre: opre, burst: oburst, train: [otrain1, otrain2],
    trainWindow: summarise(recD, tTrain, tTrain + 1700),
    flareCurve: recD.filter((r) => r[1] && r[0] >= tBeat - 100 && r[0] <= tBeat + 1500).map((r) => [Math.round(r[0] - tBeat), +r[1].flare.toFixed(3), +r[1].dLum.toFixed(3), +r[1].rLum.toFixed(3)]),
    trainFlareCurve: recD.filter((r) => r[1] && r[0] >= tTrain - 100 && r[0] <= tTrain + 2200).map((r) => [Math.round(r[0] - tTrain), +r[1].flare.toFixed(3), r[1].fa, r[1].fr, +r[1].dLum.toFixed(3)]),
    pre: summarise(recD, opre.before.t - 1500, tBeat - 50) };

  // ---------- E. Reduced motion vs normal (identical scripted sequence, fresh page each) ----------
  async function sequence(label, reduced) {
    await fresh({ vw: 1280, vh: 900, reduced });
    const info = await b.js("({ hostReduced: window.__accretion.debug().host.reducedMotion, media: matchMedia('(prefers-reduced-motion: reduce)').matches })");
    await b.js("window.__rv.use()"); await set(SUSTAINED);
    await b.js("window.__rv.startRec()"); await sleep(4500);
    const t0 = await now();
    const sus = await snap("E-" + label + "-1-sustained", "scripted SUSTAINED input, " + label);
    await sleep(800);
    const tH = await b.js("window.__rv.hit(1)"); await sleep(90);
    const hit = await snap("E-" + label + "-2-hit", "about 0.1 s after hit(1), " + label); hit.afterHitMs = hit.before.t - tH;
    await sleep(2500);
    const tB = await b.js("window.__rv.beat(0.9)"); await sleep(70);
    const bt = await snap("E-" + label + "-3-beat", "about 0.1 s after beat(0.9), " + label); bt.afterBeatMs = bt.before.t - tB;
    await sleep(1500); const t1 = await now();
    const rec = await b.js("window.__rv.stopRec()");
    return { info, sus, hit, bt, tH, tB, sustainedWindow: summarise(rec, t0 - 2500, t0), whole: summarise(rec, t0 - 2500, t1),
      afterHit: summarise(rec, tH, tH + 1500), afterBeat: summarise(rec, tB, tB + 1200),
      jetPeak: Math.max(...rec.filter((r) => r[1]).map((r) => r[1].jet)), flarePeak: Math.max(...rec.filter((r) => r[1]).map((r) => r[1].flare)) };
  }
  data.runs.normal = await sequence("normal", false);
  data.runs.reduced = await sequence("reduced", true);

  // transition normal -> reduced -> normal while sustained, per-frame stability
  await fresh({ vw: 1280, vh: 900, reduced: false });
  await b.js("window.__rv.use()"); await set(SUSTAINED); await b.js("window.__rv.startRec()"); await sleep(3500);
  const tA = await now(); await b.emulateMotion(true); await sleep(4000);
  const tBm = await now(); await b.emulateMotion(false); await sleep(4000); const tC = await now();
  const recT = await b.js("window.__rv.stopRec()");
  data.runs.transition = { normalA: summarise(recT, tA - 2500, tA), toReduced: summarise(recT, tA, tBm), backToNormal: summarise(recT, tBm, tC),
    motCurve: recT.filter((r) => r[1] && (Math.abs(r[0] - tA) < 3000 || Math.abs(r[0] - tBm) < 3000)).filter((_, i) => i % 6 === 0).map((r) => [Math.round(r[0] - tA), +r[1].mot.toFixed(3), +r[1].spd.toFixed(3), +r[1].dLum.toFixed(3), +r[1].rLum.toFixed(3)]) };
  await b.emulateMotion(false);

  // ---------- F. Composition across viewports ----------
  data.runs.composition = [];
  for (const [vw, vh, dpr] of [[1280, 720, 1], [1920, 1080, 1], [1280, 900, 1], [1280, 900, 1.5], [768, 1024, 1], [390, 844, 1]]) {
    await fresh({ vw, vh, dpr });
    await b.js("window.__rv.use()"); await set(SUSTAINED); await sleep(4000);
    const dims = await b.js("(() => { const cv = document.querySelector('canvas'), gl = window.__accretion.debug().host.three.getContext(); return { inner: [innerWidth, innerHeight], dpr: devicePixelRatio, client: [cv.clientWidth, cv.clientHeight], attr: [cv.width, cv.height], buffer: [gl.drawingBufferWidth, gl.drawingBufferHeight], page: [document.documentElement.scrollWidth, document.documentElement.scrollHeight] }; })()");
    const s = await snap("F-comp-" + vw + "x" + vh + "-dpr" + String(dpr).replace(".", "p"), "scripted SUSTAINED input");
    data.runs.composition.push({ vw, vh, dpr, dims, shot: s.file });
  }

  // ---------- F2. Depth views (drag-to-orbit, recorded input) ----------
  await fresh({ vw: 1280, vh: 900 });
  await b.js("window.__rv.use()"); await set(HITBASE); await sleep(3500);
  const rect = await b.js("(() => { const r = document.querySelector('canvas').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; })()");
  const cx = rect.x + rect.w / 2, cy = rect.y + rect.h * 0.35;
  data.runs.views = { canvasRect: rect };
  await b.drag({ x: cx, y: cy }, { x: cx, y: cy + 150 }, 15, 16); await sleep(1500); // elevation about +0.6 rad
  data.runs.views.elevated = await snap("F2a-view-elevated", "drag down 150 px: elevation +0.6 rad (clamped to 0.9), hit base input");
  await b.js("window.__rv.hit(1)"); await sleep(100);
  data.runs.views.elevatedHit = await snap("F2b-view-elevated-hit", "same view about 0.1 s after hit(1)");
  await sleep(2500);
  await b.drag({ x: cx, y: cy + 150 }, { x: cx, y: cy - 400 }, 20, 16); await sleep(1500); // clamps at -0.15
  data.runs.views.lowEdge = await snap("F2c-view-low-edge-on", "drag up (elevation clamped at -0.15): near edge-on");
  await b.drag({ x: cx - 200, y: cy }, { x: cx + 300, y: cy }, 20, 16); await sleep(1200);
  data.runs.views.azimuth = await snap("F2d-view-azimuth-shifted", "horizontal drag 500 px: azimuth shifted by about 3 rad");

  data.consoleEvents = b.events.slice(0, 20);
  data.finishedAt = new Date().toISOString();
} catch (e) {
  data.error = String(e && e.stack || e);
  console.error("FAILED", data.error);
} finally {
  const jp = EV + "review-data.json";
  writeFileSync(existsSync(jp) ? EV + "review-data-" + Date.now() + ".json" : jp, JSON.stringify(data, null, 1));
  await b.close();
}
console.log("done; shots:", data.shots.length, "error:", data.error ?? "none");
