// Acceptance checks for the Spectrum Matrix (band terrain v0) scene, on a GPU-enabled Edge (preview/cdp-lib-gpu.mjs).
// From web_kit/, with the harness served (node preview/serve-gl.mjs 5354) and the bundle built:
//   node preview/matrix-check.mjs [screenshotDir]
// Input is scripted SYNTHETIC audio or the 120 BPM synthetic demo; no real music is used. Thresholds were written in
// SPECTRUM-MATRIX-PLAN.md before the scene was measured. Exit 0 only if every section completed and every check passed.
import { join } from "node:path";
import { launchGpu, sleep } from "./cdp-lib-gpu.mjs";

const SHOTS = process.argv[2] || null;
const URL_BASE = "http://localhost:5354";
const results = [];
const measurements = {};
let completed = false;
const check = (name, ok, detail = "") => {
  results.push({ name, ok: !!ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  " + detail : ""}`);
};
let bref = null;
const allConsole = [];
const section = async (t) => {
  console.log(`\n== ${t} ==`);
  if (bref) {
    try {
      const d = await bref.js(`(() => { const d = window.__matrix && window.__matrix.debug(); if (!d) return 'no scene mounted'; const g = d.host.three && d.host.three.getContext(); return { status: d.host.status, frames: d.host.frameCount, contextLost: g ? g.isContextLost() : null, animTime: +d.anim.time.toFixed(2) }; })()`);
      console.log(`      [state] ${JSON.stringify(d)}`);
    } catch (e) { console.log(`      [state] unavailable: ${e.message}`); }
  }
};
const f3 = (x) => (typeof x === "number" ? x.toFixed(3) : String(x));
const waitFor = async (b, expr, ms) => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try { if (await b.js(expr)) return true; } catch { /* not yet */ }
    await sleep(50);
  }
  return false;
};
const M = "window.__matrix";
/** Luminance of the clear colour 0x02030a, the one constant part of every frame. */
const CLEAR_LUM = (0.2126 * 2 + 0.7152 * 3 + 0.0722 * 10) / 255;
const SUSTAINED = "{ bass: 0.7, mid: 0.5, high: 0.4, rms: 0.55, onset: 0.2, scene: 'active' }";
const sample = (b) => b.js(`(() => { const s = ${M}.sample(); return s && { w: s.w, h: s.h, left: s.left, centre: s.centre, right: s.right, background: s.background, frameMean: s.frameMean, anim: s.anim, params: s.params }; })()`);
const anim = (b) => b.js(`(() => { const d = ${M}.debug(); return d && { time: d.anim.time, scroll: d.anim.scroll, serial: d.anim.serial, ridge: d.anim.ridge, exposure: d.anim.exposure, motion: d.anim.motion, glow: d.anim.glow }; })()`);
const shot = async (b, name) => { if (SHOTS) await b.shot(join(SHOTS, `matrix-${name}.png`)); };
const poll = (b, expr, frames) => b.js(`new Promise((res) => { const out = []; let n = 0; (function f() { out.push(${expr}); if (++n < ${frames}) requestAnimationFrame(f); else res(out); })(); })`);
const countListeners = async (b, objectExpr, type) => {
  const r = await b.send("Runtime.evaluate", { expression: objectExpr });
  const l = await b.send("DOMDebugger.getEventListeners", { objectId: r.result.objectId, depth: 0 });
  return l.listeners.filter((x) => x.type === type).length;
};
const heapUsed = async (b) => { await b.send("HeapProfiler.collectGarbage"); return (await b.send("Runtime.getHeapUsage")).usedSize; };
const scrollRate = async (b, ms) => { const a0 = await anim(b); await sleep(ms); const a1 = await anim(b); return (a1.scroll - a0.scroll) / (a1.time - a0.time); };
const lit = (s) => s.frameMean - CLEAR_LUM;

const b = await launchGpu({ port: 9710, width: 1280, height: 900 });
bref = b;
b.listeners.push((d) => {
  const t = d.method === "Runtime.consoleAPICalled" ? `${d.params.type}: ${d.params.args.map((a) => a.value ?? a.description).join(" ")}` : d.method === "Log.entryAdded" ? `log-${d.params.entry.level}: ${d.params.entry.text}` : null;
  if (t && /webgl|gpu|context|three/i.test(t)) allConsole.push(t.slice(0, 200));
});
try {
  await section("0. hardware");
  await b.send("HeapProfiler.enable");
  await b.viewport(1280, 900, 1);
  await b.goto(URL_BASE + "/matrix", `!!(${M} && ${M}.debug())`);
  const gpu = await b.js(`(() => { const g = ${M}.debug().host.three.getContext(); const e = g.getExtension('WEBGL_debug_renderer_info'); return { renderer: e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : g.getParameter(g.RENDERER), version: g.getParameter(g.VERSION) }; })()`);
  measurements.gpu = gpu;
  console.log(`renderer: ${gpu.renderer} | ${gpu.version}`);
  check("hardware GPU in use (not software rendering)", /Intel|NVIDIA|AMD|Radeon|GeForce/i.test(gpu.renderer) && !/Basic Render|SwiftShader/i.test(gpu.renderer), gpu.renderer);

  await section("1. initialization");
  check("host status is 'ready'", await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'ready'`, 4000));
  const st0 = await b.js(`({ scene: ${M}.sceneStats, host: ${M}.hostStats })`);
  check("exactly one live scene and one live host", st0.scene.created - st0.scene.disposed === 1 && st0.host.created - st0.host.disposed === 1, JSON.stringify(st0));
  const mem0 = await b.js(`${M}.memory()`);
  check("the scene owns 3 geometries, 0 textures", mem0.geometries === 3 && mem0.textures === 0, JSON.stringify(mem0));
  const f0 = await b.js(`${M}.debug().frames`);
  await sleep(600);
  check("frames are drawn through the shared pipeline", (await b.js(`${M}.debug().frames`)) - f0 > 15);

  await section("2. silence: the resting state");
  await sleep(2500);
  const S0 = await sample(b);
  await shot(b, "silent");
  measurements.silent = { frameMean: S0.frameMean, sceneLight: lit(S0), left: S0.left, centre: S0.centre, right: S0.right };
  console.log(`      silent: frame mean ${f3(S0.frameMean)}, scene light above the clear colour ${f3(lit(S0))}, strips L ${f3(S0.left)} C ${f3(S0.centre)} R ${f3(S0.right)}`);
  check("silence is calm (params report calm)", S0.params && S0.params.calm === true);
  check("no ridge in silence", S0.anim.ridge < 0.01);
  check("R1 rest floor: the grid is readable in silence (scene light above the clear colour >= 0.006)", lit(S0) >= 0.006, f3(lit(S0)));
  const h0 = await b.js(`${M}.heights()`);
  check("the resting terrain is low but not flat (tallest value between 0.01 and 0.15)", h0.all > 0.01 && h0.all < 0.15, f3(h0.all));

  await section("3. audio response (scripted synthetic input)");
  check("the scripted source starts and is labelled synthetic", (await b.js(`${M}.script(${SUSTAINED})`)) === "synthetic");
  await sleep(6000);
  const S1 = await sample(b);
  await shot(b, "sustained");
  measurements.sustained = { frameMean: S1.frameMean, sceneLight: lit(S1) };
  check("R3 sustained input is clearly more active than rest (scene light >= 1.8x silence)", lit(S1) >= 1.8 * lit(S0), `${f3(lit(S1))} vs ${f3(lit(S0))} = ${(lit(S1) / lit(S0)).toFixed(2)}x`);
  check("params are not calm and exposure follows loudness above the floor (0.2 + 0.8 x 0.55 = 0.64)", S1.params.calm === false && Math.abs(S1.anim.exposure - 0.64) < 0.03, f3(S1.anim.exposure));
  const rate1 = await scrollRate(b, 2000);
  check("the terrain scrolls at the full rate while playing (about 14 rows per second)", rate1 > 11 && rate1 < 15, `${rate1.toFixed(1)} rows/s`);

  // band mapping: one band at a time, long enough for the terrain in view to be replaced
  const bands = {};
  for (const [name, src] of [["bass", "{ bass: 0.9, mid: 0.05, high: 0.05, rms: 0.5, onset: 0.1, scene: 'active' }"], ["high", "{ bass: 0.05, mid: 0.05, high: 0.9, rms: 0.5, onset: 0.1, scene: 'active' }"], ["mid", "{ bass: 0.05, mid: 0.9, high: 0.05, rms: 0.5, onset: 0.1, scene: 'active' }"]]) {
    await b.js(`${M}.script(${src})`);
    await sleep(5500);
    bands[name] = await sample(b);
    await shot(b, "band-" + name);
  }
  measurements.bands = Object.fromEntries(Object.entries(bands).map(([k, v]) => [k, { left: v.left, centre: v.centre, right: v.right }]));
  for (const [k, v] of Object.entries(bands)) console.log(`      ${k}-only: strips L ${f3(v.left)} C ${f3(v.centre)} R ${f3(v.right)}`);
  check("bass alone lights the left strip >= 1.5x the right strip", bands.bass.left >= 1.5 * bands.bass.right, `${f3(bands.bass.left)} vs ${f3(bands.bass.right)}`);
  check("high alone lights the right strip >= 1.5x the left strip", bands.high.right >= 1.5 * bands.high.left, `${f3(bands.high.right)} vs ${f3(bands.high.left)}`);
  check("mid alone lights the centre strip >= 1.5x each side", bands.mid.centre >= 1.5 * bands.mid.left && bands.mid.centre >= 1.5 * bands.mid.right, `C ${f3(bands.mid.centre)} L ${f3(bands.mid.left)} R ${f3(bands.mid.right)}`);

  // ridge: one controlled bass hit
  await b.js(`${M}.script(${SUSTAINED})`);
  await sleep(3000);
  const preHeights = await poll(b, `${M}.heights().newest`, 30);
  const preMax = Math.max(...preHeights);
  const preMin = Math.max(...(await poll(b, `${M}.heights().newestMin`, 30)));
  // One poll, starting at the hit, so the ridge, the row maximum and the row minimum are seen at the same moments (a later poll
  // would start after the ridge has decayed).
  await b.js(`${M}.hit(1)`);
  const series = await poll(b, `[${M}.debug().anim.ridge, ${M}.heights().newest, ${M}.heights().newestMin]`, 48);
  const ridgeSeries = series.map((x) => x[0]);
  const injectedPeak = Math.max(...series.map((x) => x[1]));
  const injectedMin = Math.max(...series.map((x) => x[2]));
  const allHeights = await b.js(`${M}.heights()`);
  measurements.ridge = { first4: ridgeSeries.slice(0, 4), injectedPeak, preMax, injectedMin, preMin, all: allHeights.all };
  console.log(`      ridge after the hit (first frames): ${ridgeSeries.slice(0, 8).map((x) => x.toFixed(2)).join(" ")}; newest row max ${preMax.toFixed(2)} before, ${injectedPeak.toFixed(2)} after; row minimum ${preMin.toFixed(2)} before, ${injectedMin.toFixed(2)} after`);
  check("a bass hit raises the ridge above 0.3 within 4 frames", Math.max(...ridgeSeries.slice(0, 4)) > 0.3, f3(Math.max(...ridgeSeries.slice(0, 4))));
  // Plan wording: the highest injected row rises and stays at or below 1. (A fixed +0.25 margin on the row maximum was my own addition
  // and flapped with the noise texture, so the ridge is also judged by what it does to the whole row: it lifts the row minimum.)
  check("the injected row rises above the pre-hit row and never exceeds 1", injectedPeak > preMax && injectedPeak <= 1, `${f3(injectedPeak)} vs ${f3(preMax)}`);
  check("the ridge spans the whole row: the row minimum rises by >= 0.3", injectedMin >= preMin + 0.3, `${f3(injectedMin)} vs ${f3(preMin)}`);
  check("no height anywhere exceeds 1", allHeights.all <= 1);
  await sleep(1800);
  const aAfter = await anim(b);
  check("the ridge decays back (< 0.05 within 1.8 s)", aAfter.ridge < 0.05, f3(aAfter.ridge));
  await shot(b, "after-ridge");

  // return to rest: the terrain history is replaced at the calm scroll rate (0.25x), so allow most of a full pass
  await b.js(`${M}.silence()`);
  await sleep(17000);
  const Srest = await sample(b);
  check("after the source stops the scene returns to the calm resting state", Srest.params.calm === true && Math.abs(Srest.anim.exposure - 0.2) < 0.02 && Srest.anim.ridge < 0.01 && lit(Srest) < 1.4 * lit(S0) + 0.002, `scene light ${f3(lit(Srest))} vs ${f3(lit(S0))}`);

  await section("4. reduced motion");
  await b.js(`${M}.script(${SUSTAINED})`);
  await sleep(3500);
  const normalRate = await scrollRate(b, 3000);
  const normalLit = lit(await sample(b));
  await b.emulateMotion(true);
  await b.goto(URL_BASE + "/matrix?reduced=" + Date.now(), `!!(${M} && ${M}.debug() && ${M}.debug().frames > 5)`);
  check("the host reports reduced motion", await b.js(`${M}.debug().host.reducedMotion === true`));
  await b.js(`${M}.script(${SUSTAINED})`);
  await sleep(6000);
  const redRate = await scrollRate(b, 3000);
  const ratio = redRate / normalRate;
  measurements.reduced = { normalRate, redRate, ratio };
  console.log(`      scroll rate: normal ${normalRate.toFixed(2)} rows/s, reduced ${redRate.toFixed(2)}, ratio ${f3(ratio)}`);
  check("the terrain scrolls at about 0.35x of the normal rate (0.25 to 0.45)", ratio > 0.25 && ratio < 0.45, f3(ratio));
  const Sr = await sample(b);
  await shot(b, "reduced");
  check("params report motion 0.35", Math.abs(Sr.params.motion - 0.35) < 1e-6, f3(Sr.params.motion));
  await b.js(`${M}.hit(1)`);
  const redRidge = Math.max(...(await poll(b, `${M}.debug().anim.ridge`, 60)));
  check("no ridge under reduced motion", redRidge === 0, f3(redRidge));
  check("brightness and identity are retained (scene light >= 70% of normal)", lit(Sr) >= 0.7 * normalLit, `${f3(lit(Sr))} vs ${f3(normalLit)}`);
  await b.emulateMotion(false);

  await section("5. resize and framing (the three lobes must be inside the canvas)");
  await b.goto(URL_BASE + "/matrix?fit=" + Date.now(), `!!(${M} && ${M}.debug() && ${M}.debug().frames > 5)`);
  await b.js(`${M}.script(${SUSTAINED})`);
  measurements.fit = [];
  for (const [vw, vh, dpr] of [[1280, 720, 1], [1920, 1080, 1], [1280, 900, 1.5], [768, 1024, 1], [390, 844, 1]]) {
    await b.viewport(vw, vh, dpr);
    await sleep(900);
    const r = await b.js(`(() => { const cv = document.querySelector('canvas'), box = cv.parentElement.getBoundingClientRect(), gl = ${M}.debug().host.three.getContext(); return { client: [cv.clientWidth, cv.clientHeight], box: [Math.round(box.width), Math.round(box.height)], buffer: [gl.drawingBufferWidth, gl.drawingBufferHeight], pr: ${M}.debug().host.pixelRatioInUse, fit: ${M}.fits() }; })()`);
    measurements.fit.push({ vw, vh, dpr, ...r });
    check(`${vw}x${vh} DPR ${dpr}: canvas fills its container and the buffer matches`, r.client[0] === r.box[0] && r.client[1] === r.box[1] && r.buffer[0] === Math.floor(r.client[0] * r.pr) && r.buffer[1] === Math.floor(r.client[1] * r.pr), `client ${r.client} buffer ${r.buffer} pr ${r.pr}`);
    check(`${vw}x${vh} DPR ${dpr}: the three lobe centres are inside the canvas (max |x| < 1)`, r.fit.maxAbsX < 1, `max |x| ${f3(r.fit.maxAbsX)}, distance ${f3(r.fit.distance)}`);
    await sleep(2500);
    await shot(b, `viewport-${vw}x${vh}-dpr${String(dpr).replace(".", "p")}`);
  }
  await b.viewport(1280, 720, 1); await sleep(600);
  const sz1 = await b.js(`[document.querySelector('canvas').clientWidth, document.querySelector('canvas').clientHeight]`);
  await b.viewport(1000, 700, 1); await sleep(400); await b.viewport(1280, 720, 1); await sleep(600);
  const sz2 = await b.js(`[document.querySelector('canvas').clientWidth, document.querySelector('canvas').clientHeight]`);
  check("resizing away and back gives the same size (no feedback growth)", sz1[0] === sz2[0] && sz1[1] === sz2[1], `${sz1} then ${sz2}`);

  await section("6. context loss and restore");
  const geoBefore = (await b.js(`${M}.memory()`)).geometries;
  const cornerPx = () => b.js(`(() => { const d = ${M}.debug(), gl = d.host.three.getContext(); d.host.render(d.scene.scene, d.scene.camera); const h = gl.drawingBufferHeight; const a = new Uint8Array(4); gl.readPixels(5, h - 6, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, a); return Array.from(a); })()`);
  const cornerBefore = await cornerPx();
  const evBefore = b.events.length;
  await b.js(`(() => { window.__lose = ${M}.debug().host.three.getContext().getExtension('WEBGL_lose_context'); window.__lose.loseContext(); })()`);
  check("status becomes 'lost'", await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'lost'`, 3000));
  const fLost0 = await b.js(`${M}.debug().host.frameCount`);
  await sleep(500);
  check("nothing is drawn while the context is lost", (await b.js(`${M}.debug().host.frameCount`)) === fLost0);
  await b.js(`window.__lose.restoreContext()`);
  check("status returns to 'ready'", await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'ready'`, 4000));
  await sleep(800);
  const geoAfter = (await b.js(`${M}.memory()`)).geometries;
  check("all geometries are uploaded again after the restore", geoAfter === geoBefore, `${geoBefore} to ${geoAfter}`);
  const fR = await b.js(`${M}.debug().host.frameCount`);
  await sleep(1000);
  check("drawing resumes (frames advance)", (await b.js(`${M}.debug().host.frameCount`)) - fR > 10);
  const Sres = await sample(b);
  await shot(b, "after-restore");
  check("the terrain is visible after the restore (scene light above the clear colour > the resting level)", lit(Sres) > lit(S0), `${f3(lit(Sres))} vs ${f3(lit(S0))}`);
  const cornerAfter = await cornerPx();
  check("the background clear colour survives the restore (sky corner pixel within 2 levels)", cornerBefore.every((v, i) => Math.abs(v - cornerAfter[i]) <= 2), `${JSON.stringify(cornerBefore)} then ${JSON.stringify(cornerAfter)}`);
  const warnings = b.events.slice(evBefore).filter((e) => /does not belong|INVALID_|GL_/i.test(e.text));
  check("no WebGL 'does not belong to this context' warnings", warnings.length === 0, warnings.map((w) => w.text).slice(0, 2).join(" | "));

  await section("7. repeated mount and unmount (30 cycles)");
  await b.viewport(1280, 720, 1); await sleep(400);
  const winBefore = await countListeners(b, "window", "resize");
  const docBefore = await countListeners(b, "document", "visibilitychange");
  const heap0 = await heapUsed(b);
  const s0 = await b.js(`({ scene: ${M}.sceneStats, host: ${M}.hostStats })`);
  for (let i = 0; i < 30; i++) {
    await b.js(`${M}.set(false)`); await sleep(60);
    await b.js(`${M}.set(true)`); await waitFor(b, `!!${M}.debug() && ${M}.debug().frames > 2`, 3000);
  }
  await sleep(500);
  const s1 = await b.js(`({ scene: ${M}.sceneStats, host: ${M}.hostStats })`);
  check("30 scenes and 30 hosts were created and disposed", s1.scene.created - s0.scene.created === 30 && s1.scene.disposed - s0.scene.disposed === 30 && s1.host.created - s0.host.created === 30 && s1.host.disposed - s0.host.disposed === 30, JSON.stringify({ s0, s1 }));
  check("one scene and one host are live afterwards", s1.scene.created - s1.scene.disposed === 1 && s1.host.created - s1.host.disposed === 1);
  check("window resize and document visibility listeners return to baseline", (await countListeners(b, "window", "resize")) === winBefore && (await countListeners(b, "document", "visibilitychange")) === docBefore, `window ${winBefore}, document ${docBefore}`);
  const heap1 = await heapUsed(b);
  measurements.heapGrowthMB = (heap1 - heap0) / 1048576;
  check("heap growth after 30 cycles is under 5 MB", heap1 - heap0 < 5 * 1048576, `${measurements.heapGrowthMB.toFixed(2)} MB`);
  check("exactly one canvas remains and the scene is drawing", (await b.js(`document.querySelectorAll('canvas').length`)) === 1 && (await b.js(`${M}.debug().host.status`)) === "ready");

  await section("8. hidden tab");
  await b.js(`(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); })()`);
  check("status becomes 'hidden'", await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'hidden'`, 2000));
  const fH = await b.js(`${M}.debug().host.frameCount`);
  await sleep(400);
  check("nothing is drawn while hidden", (await b.js(`${M}.debug().host.frameCount`)) === fH);
  await b.js(`(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => false }); document.dispatchEvent(new Event('visibilitychange')); })()`);
  check("status returns to 'ready' and drawing resumes", await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'ready'`, 2000) && (await sleep(500), (await b.js(`${M}.debug().host.frameCount`)) - fH > 5));

  await section("9. frame pacing and GPU time (synthetic demo, 120 BPM). Pacing needs AC power: on battery Windows throttles to about 30 fps");
  await b.viewport(1280, 720, 1); await sleep(400);
  await b.js(`${M}.demo()`); await sleep(3000);
  await b.js(`${M}.mark()`); await sleep(10000);
  const T = await b.js(`${M}.timing()`);
  const G = await b.js(`${M}.gpuTime(120)`);
  measurements.perf = { T, G };
  console.log(`      1280x720 DPR1 canvas ${G.buffer}: interval median ${f3(T.intervals.median)} p95 ${f3(T.intervals.p95)} p99 ${f3(T.intervals.p99)} max ${f3(T.intervals.max)} over33 ${(T.intervals.over33 * 100).toFixed(2)}% | main thread median ${f3(T.cpu.median)} p95 ${f3(T.cpu.p95)} | GPU sync median ${f3(G.median)} p95 ${f3(G.p95)}`);
  check("1280x720 DPR 1 (10 s): interval median <= 16.9 ms and p95 <= 20 ms", T.intervals.median <= 16.9 && T.intervals.p95 <= 20, `${f3(T.intervals.median)} / ${f3(T.intervals.p95)}`);
  check("p99 <= 33 ms and under 1% of frames over 33 ms", T.intervals.p99 <= 33 && T.intervals.over33 < 0.01, `${f3(T.intervals.p99)}, ${(T.intervals.over33 * 100).toFixed(2)}%`);
  check("main-thread time per frame median <= 4 ms", T.cpu.median <= 4, f3(T.cpu.median));
  check("synchronized GPU time median <= 8 ms at DPR 1", G.median <= 8, f3(G.median));
  await shot(b, "demo");
  await b.viewport(1920, 1080, 1); await sleep(800);
  const G2 = await b.js(`${M}.gpuTime(80)`);
  await b.viewport(1280, 720, 1.5); await sleep(800);
  const G3 = await b.js(`${M}.gpuTime(80)`);
  measurements.perfOther = { fullHdViewport: G2, dpr15: G3 };
  console.log(`      1920x1080 viewport canvas ${G2.buffer}: GPU sync median ${f3(G2.median)} p95 ${f3(G2.p95)} | DPR 1.5 canvas ${G3.buffer}: median ${f3(G3.median)} p95 ${f3(G3.p95)}`);
  check("GPU time is recorded for the larger canvases (informational, outside the gate)", Number.isFinite(G2.median) && Number.isFinite(G3.median));

  await section("10. browser errors");
  const bad = b.events.filter((e) => e.kind === "exception" || e.kind === "error" || e.kind === "log-error" || e.kind === "warning" || e.kind === "log-warning");
  check("no page exceptions, console errors or warnings", bad.length === 0, bad.slice(0, 3).map((e) => e.text.slice(0, 120)).join(" | "));
  console.log(`      WebGL-related console lines: ${JSON.stringify([...new Set(allConsole)])}`);
  completed = true;
} catch (e) {
  console.log("CRASHED: " + (e && e.stack || e));
} finally {
  await b.close();
}
const failed = results.filter((r) => !r.ok);
console.log(`\nMEASUREMENTS ${JSON.stringify(measurements)}`);
console.log(`\n${results.length - failed.length}/${results.length} checks passed${completed ? "" : "  (RUN DID NOT COMPLETE)"}`);
if (failed.length) for (const f of failed) console.log("FAILED: " + f.name + "  " + f.detail);
process.exit(completed && failed.length === 0 ? 0 : 1);
