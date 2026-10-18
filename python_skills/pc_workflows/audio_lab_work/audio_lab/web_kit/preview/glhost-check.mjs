// Browser lifecycle checks for the empty WebGL host, on a GPU-enabled Edge (preview/cdp-lib-gpu.mjs).
// Run from web_kit/ with the harness served:  node preview/serve-gl.mjs 5354   (then, in another shell)
//   node preview/glhost-check.mjs
// Exit code 0 only if every section completed AND every check passed. A crash exits non-zero and prints CRASHED.
import { launchGpu, sleep } from "./cdp-lib-gpu.mjs";

const URL_BASE = "http://localhost:5354";
const results = [];
let completed = false;
const check = (name, ok, detail = "") => {
  results.push({ name, ok: !!ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  " + detail : ""}`);
};
const section = (t) => console.log(`\n== ${t} ==`);
const waitFor = async (b, expr, ms) => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try { if (await b.js(expr)) return true; } catch { /* not yet */ }
    await sleep(50);
  }
  return false;
};
const hostJs = (expr) => `(() => { const h = window.__glhost.host(); return ${expr}; })()`;
const countListeners = async (b, objectExpr, type) => {
  const r = await b.send("Runtime.evaluate", { expression: objectExpr });
  const l = await b.send("DOMDebugger.getEventListeners", { objectId: r.result.objectId, depth: 0 });
  return l.listeners.filter((x) => x.type === type).length;
};
const heapUsed = async (b) => {
  await b.send("HeapProfiler.collectGarbage");
  return (await b.send("Runtime.getHeapUsage")).usedSize;
};
const expectedDraw = (cssW, pr) => Math.max(1, Math.floor(cssW * pr));

const b = await launchGpu({ port: 9600, width: 1100, height: 760 });
try {
  section("0. hardware (the GPU Chromium actually used)");
  await b.goto(URL_BASE + "/glhost", "!!window.__glhost");
  const gpu = await b.js(`(() => { const c = document.createElement('canvas'); const g = c.getContext('webgl2'); if (!g) return 'NO WEBGL2'; const e = g.getExtension('WEBGL_debug_renderer_info'); return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : g.getParameter(g.RENDERER); })()`);
  const hardware = /Intel|NVIDIA|AMD|Radeon|GeForce/i.test(gpu) && !/Basic Render|SwiftShader/i.test(gpu);
  console.log(`renderer: ${gpu}`);
  console.log(hardware ? "GPU: hardware. GPU-dependent results below are hardware evidence." : "GPU: NOT hardware. Results are software-rendered and are NOT performance evidence.");
  check("WebGL2 is available", gpu !== "NO WEBGL2", gpu);

  section("1. initialization of the first host");
  check("host reaches 'ready'", await waitFor(b, hostJs("h && h.status === 'ready'"), 4000));
  check("a three.js renderer exists", await b.js(hostJs("!!(h && h.three)")));
  check("the wrapper reports 'ready'", (await b.js(`document.querySelector('[data-gl-status]')?.dataset.glStatus`)) === "ready");
  const beforeFrames = await b.js(hostJs("h.frameCount"));
  await sleep(600);
  const afterFrames = await b.js(hostJs("h.frameCount"));
  check("frames are drawn through the shared pipeline (about 60 per second)", afterFrames - beforeFrames > 20, `${afterFrames - beforeFrames} frames in 0.6 s`);
  check("the GL context is not lost after initialization", await b.js(hostJs("!h.three.getContext().isContextLost()")));

  section("2. resize and device-pixel-ratio cap");
  for (const [w, h] of [[900, 640], [1400, 800]]) {
    await b.viewport(w, h, 1);
    await sleep(400);
    const r = await b.js(`(() => { const c = document.querySelector('canvas'); const r = c.getBoundingClientRect(); return { cssW: r.width, cssH: r.height, bw: c.width, bh: c.height }; })()`);
    check(`resize to ${w}x${h} at DPR 1: backing store = floor(CSS size)`, r.bw === expectedDraw(r.cssW, 1) && r.bh === expectedDraw(r.cssH, 1), `css ${r.cssW.toFixed(1)}x${r.cssH.toFixed(1)} -> ${r.bw}x${r.bh}`);
  }
  const box = await b.js(`(() => { const w = document.querySelector('[data-gl-status]').getBoundingClientRect(); const c = document.querySelector('canvas').getBoundingClientRect(); return { wW: w.width, wH: w.height, cW: c.width, cH: c.height }; })()`);
  check("the canvas fills its container (CSS size equals the container)", Math.abs(box.wW - box.cW) < 1 && Math.abs(box.wH - box.cH) < 1, `container ${box.wW}x${box.wH}, canvas ${box.cW}x${box.cH}`);
  const sizeA = await b.js(`document.querySelector('canvas').width`);
  await sleep(1000);
  const sizeB = await b.js(`document.querySelector('canvas').width`);
  check("no resize feedback: the backing store is stable for 1 s with no input", sizeA === sizeB, `${sizeA} -> ${sizeB}`);
  await b.viewport(900, 640, 2);
  await sleep(500);
  const cap = await b.js(`(() => { const c = document.querySelector('canvas'); const r = c.getBoundingClientRect(); const h = window.__glhost.host(); return { cssW: r.width, cssH: r.height, bw: c.width, pr: h.pixelRatioInUse, three: h.three.getPixelRatio(), dpr: window.devicePixelRatio }; })()`);
  check("DPR 2 is capped at 1.5 (the host's pixel-ratio policy)", cap.pr === 1.5 && cap.three === 1.5, `devicePixelRatio ${cap.dpr}, in use ${cap.pr}`);
  check("at the cap, backing store = floor(CSS x 1.5)", cap.bw === expectedDraw(cap.cssW, 1.5), `${cap.bw} vs ${expectedDraw(cap.cssW, 1.5)}`);
  await b.viewport(900, 640, 1);
  await sleep(400);
  check("back at DPR 1, the ratio returns to 1", (await b.js(hostJs("h.pixelRatioInUse"))) === 1);

  section("3. hidden document: suspend and resume (simulated visibility)");
  await b.js(`(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' }); document.dispatchEvent(new Event('visibilitychange')); return true; })()`);
  check("status becomes 'hidden'", await waitFor(b, hostJs("h.status === 'hidden'"), 1000));
  const hiddenStart = await b.js(hostJs("h.frameCount"));
  await sleep(700);
  const hiddenEnd = await b.js(hostJs("h.frameCount"));
  check("no frames are drawn while hidden", hiddenEnd === hiddenStart, `${hiddenEnd - hiddenStart} frames while hidden`);
  await b.js(`(() => { delete document.hidden; delete document.visibilityState; document.dispatchEvent(new Event('visibilitychange')); return true; })()`);
  check("status returns to 'ready' when visible again", await waitFor(b, hostJs("h.status === 'ready'"), 1000));
  const resumeStart = await b.js(hostJs("h.frameCount"));
  await sleep(500);
  check("frames resume after the document is visible again", (await b.js(hostJs("h.frameCount"))) - resumeStart > 10);

  section("4. reduced motion");
  await b.emulateMotion(true);
  check("the host reports reduced motion", await waitFor(b, hostJs("h.reducedMotion === true"), 1500));
  await b.emulateMotion(false);
  check("the host reports normal motion again", await waitFor(b, hostJs("h.reducedMotion === false"), 1500));

  section("5. WebGL context loss and restoration");
  await b.js(`(() => { const h = window.__glhost.host(); const ext = h.three.getContext().getExtension('WEBGL_lose_context'); window.__loseExt = ext; ext.loseContext(); return !!ext; })()`);
  check("status becomes 'lost' after loseContext", await waitFor(b, hostJs("h.status === 'lost'"), 1500));
  check("the context reports isContextLost", await b.js(hostJs("h.three.getContext().isContextLost()")));
  const lostFrames = await b.js(hostJs("h.frameCount"));
  await sleep(500);
  check("no frames are drawn while the context is lost", (await b.js(hostJs("h.frameCount"))) === lostFrames);
  await b.js(`(() => { window.__loseExt.restoreContext(); return true; })()`);
  check("status returns to 'ready' after restoreContext", await waitFor(b, hostJs("h.status === 'ready'"), 3000));
  check("the restored context is usable", await b.js(hostJs("!h.three.getContext().isContextLost()")));
  const restoredFrames = await b.js(hostJs("h.frameCount"));
  await sleep(500);
  check("drawing resumes after restoration", (await b.js(hostJs("h.frameCount"))) - restoredFrames > 10);

  section("6. repeated mount/unmount (50 cycles) and resource release");
  const heap0 = await heapUsed(b);
  const stats0 = await b.js(`window.__glhost.stats`);
  const liveBefore = stats0.created - stats0.disposed;
  const listenersBefore = { visibility: await countListeners(b, "document", "visibilitychange"), resize: await countListeners(b, "window", "resize") };
  let cycleFailures = 0;
  const N = 50;
  for (let i = 0; i < N; i++) {
    await b.js(`window.__glhost.set(false)`);
    if (!(await waitFor(b, `document.querySelectorAll('canvas').length === 0`, 2000))) cycleFailures++;
    await b.js(`window.__glhost.set(true)`);
    if (!(await waitFor(b, hostJs("h && h.status === 'ready'"), 3000))) cycleFailures++;
  }
  await sleep(300);
  const stats1 = await b.js(`window.__glhost.stats`);
  const liveAfter = stats1.created - stats1.disposed;
  check(`${N} mount/unmount cycles each completed (no timeouts)`, cycleFailures === 0, `${cycleFailures} timeouts`);
  check(`every host created was disposed (created +${stats1.created - stats0.created}, disposed +${stats1.disposed - stats0.disposed})`, stats1.created - stats0.created === N && stats1.disposed - stats0.disposed === N);
  check("exactly one live host after the cycles (the mounted one)", liveAfter === liveBefore && liveAfter === 1, `live ${liveAfter}`);
  check("one canvas in the DOM after the cycles", (await b.js(`document.querySelectorAll('canvas').length`)) === 1);
  const listenersAfter = { visibility: await countListeners(b, "document", "visibilitychange"), resize: await countListeners(b, "window", "resize") };
  check("document 'visibilitychange' listeners return to baseline", listenersAfter.visibility === listenersBefore.visibility, `${listenersBefore.visibility} -> ${listenersAfter.visibility}`);
  check("window 'resize' listeners return to baseline", listenersAfter.resize === listenersBefore.resize, `${listenersBefore.resize} -> ${listenersAfter.resize}`);
  const heap1 = await heapUsed(b);
  const delta = (heap1 - heap0) / 1048576;
  check("JS heap growth over the cycles is under 5 MB (after forced GC)", delta < 5, `${delta.toFixed(2)} MB`);

  section("7. console output across the whole run");
  const bad = b.events.filter((e) => ["exception", "error", "warning", "log-error", "log-warning"].includes(e.kind));
  check("no page exceptions, console errors or console warnings", bad.length === 0, bad.length ? JSON.stringify(bad.slice(0, 3)) : "");
  completed = true;
} catch (e) {
  console.log("CRASHED: " + (e && e.stack ? e.stack.split("\n").slice(0, 3).join(" | ") : e));
  completed = false;
} finally {
  await b.close().catch(() => {});
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed${failed.length ? "; FAILED: " + failed.map((f) => f.name).join(" | ") : ""}`);
  console.log(completed && failed.length === 0 ? "RESULT: COMPLETED, ALL PASSED" : "RESULT: NOT CLEAN (crashed, incomplete or failed)");
  process.exitCode = completed && failed.length === 0 ? 0 : 1;
}
