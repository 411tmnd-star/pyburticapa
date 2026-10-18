// Acceptance checks for the Accretion v0 scene, on a GPU-enabled Edge (preview/cdp-lib-gpu.mjs).
// From web_kit/, with the harness served (node preview/serve-gl.mjs 5354) and the bundle built:
//   node preview/accretion-check.mjs [screenshotDir]
// Exit 0 only if every section completed and every check passed. A crash exits non-zero and prints CRASHED.
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
  // Diagnostics: the host's state at the start of every section, so a spontaneous context loss is visible.
  if (bref) {
    try {
      const d = await bref.js(`(() => { const d = window.__accretion && window.__accretion.debug(); if (!d) return 'no scene mounted'; const g = d.host.three && d.host.three.getContext(); return { status: d.host.status, frames: d.host.frameCount, contextLost: g ? g.isContextLost() : null, animTime: +d.anim.time.toFixed(2) }; })()`);
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
const A = "window.__accretion";
const sample = (b) => b.js(`(() => { const s = ${A}.sample(); return s && { w: s.w, h: s.h, R: s.R, centre: s.centre, ring: s.ring, disk: s.disk, jet: s.jet, background: s.background, anim: s.anim, params: s.params }; })()`);
const anim = (b) => b.js(`(() => { const d = ${A}.debug(); return d && { ...d.anim }; })()`);
const status = (b) => b.js(`document.querySelector('[data-gl-status]')?.dataset.glStatus`);
const shot = async (b, name) => { if (SHOTS) await b.shot(join(SHOTS, `accretion-${name}.png`)); };
const countListeners = async (b, objectExpr, type) => {
  const r = await b.send("Runtime.evaluate", { expression: objectExpr });
  const l = await b.send("DOMDebugger.getEventListeners", { objectId: r.result.objectId, depth: 0 });
  return l.listeners.filter((x) => x.type === type).length;
};
const heapUsed = async (b) => {
  await b.send("HeapProfiler.collectGarbage");
  return (await b.send("Runtime.getHeapUsage")).usedSize;
};
const meanOf = (xs, k) => xs.reduce((s, x) => s + x[k], 0) / xs.length;

const b = await launchGpu({ port: 9620, width: 1280, height: 900 });
bref = b;
b.listeners.push((d) => {
  const t = d.method === "Runtime.consoleAPICalled" ? `${d.params.type}: ${d.params.args.map((a) => a.value ?? a.description).join(" ")}` : d.method === "Log.entryAdded" ? `log-${d.params.entry.level}: ${d.params.entry.text}` : null;
  if (t && /webgl|gpu|context|three/i.test(t)) allConsole.push(t.slice(0, 200));
});
try {
  await section("0. hardware");
  await b.viewport(1280, 720, 1);
  await b.goto(URL_BASE + "/accretion", `!!(${A} && ${A}.debug())`);
  const gpu = await b.js(`(() => { const g = ${A}.debug().host.three.getContext(); const e = g.getExtension('WEBGL_debug_renderer_info'); return { renderer: e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : g.getParameter(g.RENDERER), vendor: e ? g.getParameter(e.UNMASKED_VENDOR_WEBGL) : '', version: g.getParameter(g.VERSION) }; })()`);
  const hardware = /Intel|NVIDIA|AMD|Radeon|GeForce/i.test(gpu.renderer) && !/Basic Render|SwiftShader/i.test(gpu.renderer);
  measurements.gpu = gpu;
  console.log(`renderer: ${gpu.renderer} | ${gpu.version}`);
  check("hardware GPU in use (not software rendering)", hardware, gpu.renderer);

  await section("1. initialization");
  check("host status is 'ready'", await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'ready'`, 4000));
  const st0 = await b.js(`({ scene: ${A}.sceneStats, host: ${A}.hostStats })`);
  check("exactly one live scene and one live host", st0.scene.created - st0.scene.disposed === 1 && st0.host.created - st0.host.disposed === 1, JSON.stringify(st0));
  const f0 = await b.js(`${A}.debug().frames`);
  await sleep(600);
  check("frames are drawn through the shared pipeline", (await b.js(`${A}.debug().frames`)) - f0 > 20);

  await section("2. silence: the resting state");
  await sleep(2500);
  const S0 = await sample(b);
  await shot(b, "silent");
  measurements.silent = { centre: S0.centre, ring: S0.ring, disk: S0.disk, jet: S0.jet, background: S0.background, Rpx: S0.R };
  console.log(`      silent luminance: centre ${f3(S0.centre)} ring ${f3(S0.ring)} disk ${f3(S0.disk)} jet ${f3(S0.jet)} background ${f3(S0.background)}`);
  check("silence is calm (params report calm)", S0.params && S0.params.calm === true);
  check("the shadow is dark (centre luminance < 0.03)", S0.centre < 0.03, f3(S0.centre));
  check("the rim stays legible in silence (ring > 3x centre and > background)", S0.ring > 3 * Math.max(S0.centre, 0.005) && S0.ring > S0.background, `${f3(S0.ring)} vs centre ${f3(S0.centre)}`);
  check("the disk is visible but dim in silence (disk > background)", S0.disk > S0.background, `${f3(S0.disk)} vs ${f3(S0.background)}`);
  check("no jet impulse in silence", S0.anim.jet < 0.01, f3(S0.anim.jet));

  await section("3. audio response (synthetic demo, 120 BPM)");
  check("the demo source starts", (await b.js(`${A}.demo()`)) === "synthetic");
  await sleep(3000);
  const flaresStart = (await anim(b)).flaresAccepted;
  const tStart = (await anim(b)).time;
  const jets = [];
  const samples = [];
  for (let i = 0; i < 40; i++) {
    jets.push((await anim(b)).jet);
    if (i % 8 === 0) samples.push(await sample(b));
    await sleep(50);
  }
  await shot(b, "demo");
  const endA = await anim(b);
  const S1 = { centre: meanOf(samples, "centre"), ring: meanOf(samples, "ring"), disk: meanOf(samples, "disk"), jet: meanOf(samples, "jet"), background: meanOf(samples, "background") };
  measurements.playing = S1;
  console.log(`      playing luminance: centre ${f3(S1.centre)} ring ${f3(S1.ring)} disk ${f3(S1.disk)} jet ${f3(S1.jet)} background ${f3(S1.background)}`);
  check("the disk brightens with the music (>= 1.5x silence)", S1.disk >= 1.5 * S0.disk, `${f3(S1.disk)} vs ${f3(S0.disk)}`);
  check("the rim brightens with the bass (>= 1.5x silence)", S1.ring >= 1.5 * S0.ring, `${f3(S1.ring)} vs ${f3(S0.ring)}`);
  check("the shadow stays dark while playing (centre < 0.03)", S1.centre < 0.03, f3(S1.centre));
  check("hierarchy: rim > disk > jets > background", S1.ring > S1.disk && S1.disk > S1.jet && S1.jet > S1.background, `${f3(S1.ring)} > ${f3(S1.disk)} > ${f3(S1.jet)} > ${f3(S1.background)}`);
  const jmax = Math.max(...jets), jmin = Math.min(...jets);
  measurements.jetRange = { min: jmin, max: jmax };
  check("bass hits fire the jets (impulse reaches >= 0.3)", jmax >= 0.3, `max ${f3(jmax)}`);
  check("jets pulse rather than sit at maximum (range >= 0.2 over 2 s)", jmax - jmin >= 0.2, `min ${f3(jmin)} max ${f3(jmax)}`);
  const flareRate = (endA.flaresAccepted - flaresStart) / (endA.time - tStart);
  measurements.flareRatePerS = flareRate;
  check("detected beats produce flares, at most 3 per second", endA.flaresAccepted > flaresStart && flareRate <= 3, `${flareRate.toFixed(2)} per second`);

  await section("4. frame timing at 1280x720 viewport, DPR 1 (demo playing)");
  await b.viewport(1280, 720, 1);
  await sleep(1500);
  await b.js(`${A}.mark()`);
  await sleep(10000);
  const T1 = await b.js(`${A}.timing()`);
  const G1 = await b.js(`${A}.gpuTime(60)`);
  const canvas1 = await b.js(`(() => { const c = document.querySelector('canvas'); return { cssW: c.clientWidth, cssH: c.clientHeight, bufW: c.width, bufH: c.height }; })()`);
  measurements.dpr1 = { canvas: canvas1, frameIntervalMs: T1.intervals, cpuMs: T1.cpu, gpuSyncMs: G1 };
  console.log(`      canvas ${canvas1.cssW}x${canvas1.cssH} CSS, backing ${canvas1.bufW}x${canvas1.bufH}`);
  console.log(`      frame interval ms: median ${f3(T1.intervals.median)} p95 ${f3(T1.intervals.p95)} p99 ${f3(T1.intervals.p99)} max ${f3(T1.intervals.max)} over-33ms ${(T1.intervals.over33 * 100).toFixed(2)}% (n=${T1.intervals.n})`);
  console.log(`      main-thread ms per frame: median ${f3(T1.cpu.median)} p95 ${f3(T1.cpu.p95)}`);
  console.log(`      GPU sync ms (draw + 1-pixel read): median ${f3(G1.median)} p95 ${f3(G1.p95)} max ${f3(G1.max)}`);
  check("frame interval median <= 16.9 ms", T1.intervals.median <= 16.9, f3(T1.intervals.median));
  check("frame interval p95 <= 20 ms", T1.intervals.p95 <= 20, f3(T1.intervals.p95));
  check("frame interval p99 <= 33 ms", T1.intervals.p99 <= 33, f3(T1.intervals.p99));
  check("fewer than 1% of frames over 33 ms", T1.intervals.over33 < 0.01, `${(T1.intervals.over33 * 100).toFixed(2)}%`);
  check("main-thread time per frame median <= 4 ms", T1.cpu.median <= 4, f3(T1.cpu.median));
  check("GPU sync time median <= 8 ms", G1.median <= 8, f3(G1.median));

  await section("4b. the same at DPR 1.5 (the host's cap) and at 1920x1080, for comparison");
  await b.viewport(1280, 720, 1.5);
  await sleep(1500);
  await b.js(`${A}.mark()`);
  await sleep(5000);
  const T2 = await b.js(`${A}.timing()`);
  const G2 = await b.js(`${A}.gpuTime(60)`);
  measurements.dpr15 = { frameIntervalMs: T2.intervals, cpuMs: T2.cpu, gpuSyncMs: G2 };
  console.log(`      DPR 1.5: backing ${G2.buffer.join("x")}, interval median ${f3(T2.intervals.median)} p95 ${f3(T2.intervals.p95)} p99 ${f3(T2.intervals.p99)}, GPU sync median ${f3(G2.median)} p95 ${f3(G2.p95)}`);
  await b.viewport(1920, 1080, 1);
  await sleep(1500);
  await b.js(`${A}.mark()`);
  await sleep(5000);
  const T3 = await b.js(`${A}.timing()`);
  const G3 = await b.js(`${A}.gpuTime(60)`);
  measurements.fhd = { frameIntervalMs: T3.intervals, cpuMs: T3.cpu, gpuSyncMs: G3 };
  console.log(`      1920x1080 DPR 1: backing ${G3.buffer.join("x")}, interval median ${f3(T3.intervals.median)} p95 ${f3(T3.intervals.p95)} p99 ${f3(T3.intervals.p99)}, GPU sync median ${f3(G3.median)} p95 ${f3(G3.p95)}`);
  check("DPR 1.5 is applied (the host's cap)", G2.pixelRatio === 1.5, String(G2.pixelRatio));
  await b.viewport(1280, 720, 1);
  await sleep(800);

  await section("5. reduced motion");
  const ph0 = await anim(b);
  await sleep(2000);
  const ph1 = await anim(b);
  const normalRate = (ph1.diskPhase - ph0.diskPhase) / (ph1.time - ph0.time);
  const Snorm = await sample(b);
  await b.emulateMotion(true);
  check("the host reports reduced motion", await waitFor(b, `${A}.debug().host.reducedMotion === true`, 1500));
  await sleep(3000);
  const r0 = await anim(b);
  await sleep(2000);
  const r1 = await anim(b);
  const reducedRate = (r1.diskPhase - r0.diskPhase) / (r1.time - r0.time);
  const Sred = await sample(b);
  await shot(b, "reduced-motion");
  const pr = await b.js(`${A}.debug().lastParams`);
  measurements.reduced = { normalPhaseRate: normalRate, reducedPhaseRate: reducedRate, ratio: reducedRate / normalRate, disk: Sred.disk, ring: Sred.ring };
  check("params report the reduced motion multiplier (0.35)", Math.abs(pr.motion - 0.35) < 1e-9, String(pr.motion));
  check("the disk turns at about 0.35x its normal speed", Math.abs(reducedRate / normalRate - 0.35) < 0.1, `ratio ${(reducedRate / normalRate).toFixed(3)}`);
  check("jets are suppressed (impulse < 0.05)", r1.jet < 0.05, f3(r1.jet));
  check("no flares under reduced motion", r1.flaresAccepted === r0.flaresAccepted, `${r0.flaresAccepted} -> ${r1.flaresAccepted}`);
  check("the major elements remain: disk and rim at >= 0.5x their normal brightness", Sred.disk >= 0.5 * Snorm.disk && Sred.ring >= 0.5 * Snorm.ring, `disk ${f3(Sred.disk)}/${f3(Snorm.disk)}, ring ${f3(Sred.ring)}/${f3(Snorm.ring)}`);
  check("the shadow stays dark under reduced motion", Sred.centre < 0.03, f3(Sred.centre));
  await b.emulateMotion(false);
  check("normal motion again", await waitFor(b, `${A}.debug().host.reducedMotion === false`, 1500));

  await section("6. resize stability");
  await b.viewport(900, 640, 1);
  await sleep(600);
  const box = await b.js(`(() => { const w = document.querySelector('[data-gl-status]').getBoundingClientRect(); const c = document.querySelector('canvas').getBoundingClientRect(); return { wW: w.width, wH: w.height, cW: c.width, cH: c.height }; })()`);
  check("the canvas fills its container after a resize", Math.abs(box.wW - box.cW) < 1 && Math.abs(box.wH - box.cH) < 1, `container ${box.wW}x${box.wH}, canvas ${box.cW}x${box.cH}`);
  const sz0 = await b.js(`document.querySelector('canvas').width`);
  await sleep(1000);
  check("no resize feedback: backing store stable for 1 s", (await b.js(`document.querySelector('canvas').width`)) === sz0, String(sz0));
  await b.viewport(1280, 720, 1);
  await sleep(600);

  await section("7. no per-frame GPU allocation");
  const m0 = await b.js(`${A}.memory()`);
  await sleep(3000);
  const m1 = await b.js(`${A}.memory()`);
  measurements.gpuMemory = { before: m0, after3s: m1 };
  check("GPU geometries, textures and programs are constant over 3 s of playback", JSON.stringify(m0) === JSON.stringify(m1), `${JSON.stringify(m0)} -> ${JSON.stringify(m1)}`);
  check("the renderer holds exactly the scene's 7 geometries", m1.geometries === 7, String(m1.geometries));

  await section("8. context loss and restoration with scene resources");
  await b.js(`${A}.silence()`);
  await sleep(3000);
  const Sb = await sample(b);
  await b.js(`(() => { const ext = ${A}.debug().host.three.getContext().getExtension('WEBGL_lose_context'); window.__lose = ext; ext.loseContext(); return true; })()`);
  check("status becomes 'lost'", await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'lost'`, 1500));
  const lf = await b.js(`${A}.debug().host.frameCount`);
  await sleep(500);
  check("nothing is drawn while lost", (await b.js(`${A}.debug().host.frameCount`)) === lf);
  await b.js(`(() => { window.__lose.restoreContext(); return true; })()`);
  check("status returns to 'ready' after restoration", await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'ready'`, 3000));
  await sleep(800);
  const Sa = await sample(b);
  await shot(b, "after-restore");
  measurements.restore = { before: { ring: Sb.ring, disk: Sb.disk }, after: { ring: Sa.ring, disk: Sa.disk } };
  check("the scene is drawn again after restoration: rim within 25% of before", Math.abs(Sa.ring - Sb.ring) <= 0.25 * Sb.ring, `${f3(Sb.ring)} -> ${f3(Sa.ring)}`);
  check("the disk is drawn again after restoration: within 25% of before", Math.abs(Sa.disk - Sb.disk) <= 0.25 * Sb.disk, `${f3(Sb.disk)} -> ${f3(Sa.disk)}`);
  const mr = await b.js(`${A}.memory()`);
  check("all 7 geometries are re-uploaded after restoration", mr.geometries === 7, JSON.stringify(mr));

  await section("9. repeated mount/unmount (30 cycles) with the scene");
  const heap0 = await heapUsed(b);
  const s0 = await b.js(`({ scene: ${A}.sceneStats, host: ${A}.hostStats })`);
  const lb = { vis: await countListeners(b, "document", "visibilitychange"), resize: await countListeners(b, "window", "resize") };
  let timeouts = 0;
  const N = 30;
  for (let i = 0; i < N; i++) {
    await b.js(`${A}.set(false)`);
    if (!(await waitFor(b, `document.querySelectorAll('canvas').length === 0`, 2000))) timeouts++;
    await b.js(`${A}.set(true)`);
    if (!(await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'ready' && !!${A}.debug()`, 4000))) timeouts++;
  }
  await sleep(500);
  const s1 = await b.js(`({ scene: ${A}.sceneStats, host: ${A}.hostStats })`);
  const la = { vis: await countListeners(b, "document", "visibilitychange"), resize: await countListeners(b, "window", "resize") };
  const heap1 = await heapUsed(b);
  const dHeap = (heap1 - heap0) / 1048576;
  measurements.cycles = { heapGrowthMB: dHeap, listenersBefore: lb, listenersAfter: la };
  check(`${N} cycles completed without timeouts`, timeouts === 0, `${timeouts} timeouts`);
  check("every scene created was disposed", s1.scene.created - s0.scene.created === N && s1.scene.disposed - s0.scene.disposed === N, `created +${s1.scene.created - s0.scene.created}, disposed +${s1.scene.disposed - s0.scene.disposed}`);
  check("every host created was disposed", s1.host.created - s0.host.created === N && s1.host.disposed - s0.host.disposed === N);
  check("one live scene, one live host, one canvas afterwards", s1.scene.created - s1.scene.disposed === 1 && s1.host.created - s1.host.disposed === 1 && (await b.js(`document.querySelectorAll('canvas').length`)) === 1);
  check("document and window listeners return to baseline", la.vis === lb.vis && la.resize === lb.resize, `${JSON.stringify(lb)} -> ${JSON.stringify(la)}`);
  check("JS heap growth over the cycles < 5 MB (after forced GC)", dHeap < 5, `${dHeap.toFixed(2)} MB`);
  await sleep(1500);
  const Sc = await sample(b);
  check("the remounted scene draws (rim visible)", Sc.ring > Sc.background && Sc.centre < 0.03, `ring ${f3(Sc.ring)}`);

  await section("9b. a scene mounted while the page is hidden starts hidden (simulated visibility)");
  await b.js(`${A}.set(false)`);
  await waitFor(b, `document.querySelectorAll('canvas').length === 0`, 2000);
  await b.js(`(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' }); return true; })()`);
  await b.js(`${A}.set(true)`);
  check("a host created while hidden reports 'hidden'", await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'hidden'`, 3000));
  const hf0 = await b.js(`${A}.debug() ? ${A}.debug().host.frameCount : -1`);
  await sleep(600);
  check("it draws nothing while hidden", (await b.js(`${A}.debug().host.frameCount`)) === hf0, `frames ${hf0}`);
  await b.js(`(() => { delete document.hidden; delete document.visibilityState; document.dispatchEvent(new Event('visibilitychange')); return true; })()`);
  check("it becomes 'ready' and draws once visible", await waitFor(b, `document.querySelector('[data-gl-status]')?.dataset.glStatus === 'ready'`, 2000) && (await waitFor(b, `${A}.debug().host.frameCount > ${hf0} + 10`, 2000)));

  await section("10. console");
  const bad = b.events.filter((e) => ["exception", "error", "warning", "log-error", "log-warning"].includes(e.kind));
  check("no page exceptions, console errors or warnings in the whole run", bad.length === 0, bad.length ? JSON.stringify(bad.slice(0, 3)) : "");
  completed = true;
} catch (e) {
  console.log("CRASHED: " + (e && e.stack ? e.stack.split("\n").slice(0, 3).join(" | ") : e));
} finally {
  await b.close().catch(() => {});
  console.log("\nGPU/WEBGL CONSOLE (all levels): " + JSON.stringify(allConsole.slice(0, 30)));
  console.log("\nMEASUREMENTS " + JSON.stringify(measurements));
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed${failed.length ? "; FAILED: " + failed.map((f) => f.name).join(" | ") : ""}`);
  console.log(completed && failed.length === 0 ? "RESULT: COMPLETED, ALL PASSED" : "RESULT: NOT CLEAN (crashed, incomplete or failed)");
  process.exitCode = completed && failed.length === 0 ? 0 : 1;
}
