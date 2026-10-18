// Contact sheets for Constellation Core, built on headless Edge's 2D canvas. Panels are unmodified screenshots cropped to the
// scene area and scaled down; nothing is redrawn. New cc-* files only; never overwrites.
import { launchGpu } from "file:///C:/Users/USER/Desktop/audio_lab_work/2026-10-13_accretion-v0/audio_lab/web_kit/preview/cdp-lib-gpu.mjs";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const EV = "C:/Users/USER/Desktop/audio_lab_work/2026-10-13_accretion-v0/evidence-core/";
const D = JSON.parse(readFileSync(EV + "cc-evidence-data.json", "utf8"));
const R = D.runs;
const f2 = (x) => (Number.isFinite(x) ? x.toFixed(2) : "n/a");
const S = (n) => D.shots.find((s) => s.name === n);
const scene = [0, 0, 1280, 590];
const sheets = {
  "1-states": { title: "CONSTELLATION CORE v0: sheet 1. Rest, sustained, bass impulse, onset (1280x900, DPR 1, scripted SYNTHETIC input; scene area shown)", sections: [
    ["A. REST", [["cc-A1-rest-silent.png", "A1 silent", "no source; idle frame"], ["cc-A2-rest-low-energy.png", "A2 low energy", "scripted: rms .12 bass .10 mid .12"]]],
    ["B. SUSTAINED (three stills ~0.5 s apart, plus the synthetic 120 BPM demo)", [
      ["cc-B1-sustained-a.png", "B1 sustained", `scripted: rms .55 bass .45 mid .60; phase ${f2(S("B1-sustained-a").before.phase)}`],
      ["cc-B2-sustained-b.png", "B2 ~+0.5 s", `phase ${f2(S("B2-sustained-b").before.phase)}`],
      ["cc-B3-sustained-c.png", "B3 ~+1 s", `phase ${f2(S("B3-sustained-c").before.phase)}`],
      ["cc-B4-demo-synthetic-a.png", "B4 demo (synthetic 120 BPM)", "kick on every beat; SYNTHETIC"],
      ["cc-B5-demo-synthetic-b.png", "B5 demo +1.3 s", "same session"]]],
    ["C. BASS IMPULSE (ONE event: hit(1) at page t=" + R.bass.tHit.toFixed(0) + " ms; consecutive screenshots of that single event)", [
      ["cc-C0-bass-pre.png", "C0 before", `beam ${f2(R.bass.pre.before.beam)}`],
      ...R.bass.burst.slice(0, 5).map((s, i) => [`cc-C${i + 1}-bass-burst.png`, `C${i + 1} +${s.afterHitMs.toFixed(0)} ms`, `beam at capture start ${f2(s.before.beam)}  glow ${f2(s.before.glow)}`]),
      ["cc-C9-bass-post-3s.png", "C9 about +3 s", `beam ${f2(R.bass.post.before.beam)}: no residual surge`]]],
    ["D. ONSET / RING PULSE (ONE beat(0.9), then a separate 20-beat train, 60 ms apart)", [
      ["cc-D0-onset-pre.png", "D0 before", "no beat yet"],
      ...R.onset.burst.slice(0, 3).map((s, i) => [`cc-D${i + 1}-onset-burst.png`, `D${i + 1} +${s.afterBeatMs.toFixed(0)} ms`, `pulse at capture start ${f2(s.before.pulse)}  ring ${s.before.ring}`]),
      ["cc-D5-onset-train-mid.png", "D5 during the train", `pulse ${f2(R.onset.train.before.pulse)}  ring ${R.onset.train.before.ring}  accepted so far ${R.onset.train.before.accepted}`]]],
  ] },
  "2-motion-composition": { title: "CONSTELLATION CORE v0: sheet 2. Normal vs reduced motion, composition, depth views", sections: [
    ["E. NORMAL vs REDUCED MOTION (same viewport, same scripted input, fresh page each; orbit positions differ between runs)", [
      ["cc-E-normal-1-sustained.png", "E1 NORMAL sustained", `motion ${f2(R.normal.a.before.motion)}`],
      ["cc-E-normal-2-hit.png", "E2 NORMAL +" + R.normal.h.afterHitMs.toFixed(0) + " ms after hit(1)", `beam ${f2(R.normal.h.before.beam)}`],
      ["cc-E-normal-3-beat.png", "E3 NORMAL +" + R.normal.be.afterBeatMs.toFixed(0) + " ms after beat", `pulse ${f2(R.normal.be.before.pulse)}`],
      ["cc-E-reduced-1-sustained.png", "E4 REDUCED sustained", `motion ${f2(R.reduced.a.before.motion)}`],
      ["cc-E-reduced-2-hit.png", "E5 REDUCED +" + R.reduced.h.afterHitMs.toFixed(0) + " ms after hit(1)", `beam ${f2(R.reduced.h.before.beam)} (suppressed)`],
      ["cc-E-reduced-3-beat.png", "E6 REDUCED +" + R.reduced.be.afterBeatMs.toFixed(0) + " ms after beat", `pulse ${f2(R.reduced.be.before.pulse)} (suppressed)`]]],
    ["F. COMPOSITION ACROSS VIEWPORTS (full frames, scripted sustained input)", R.composition.map((c) => [c.shot, `F ${c.vw}x${c.vh}`, `canvas ${c.dims.client.join("x")}; rings max |x| ${f2(c.dims.fit.maxAbsX)}`, [0, 0, c.vw, c.vh], true])],
    ["F2. DEPTH VIEWS (drag-to-orbit, recorded input)", [
      ["cc-F2a-view-elevated.png", "F2a elevated", "default elevation 0.35 plus drag"],
      ["cc-F2b-view-elevated-hit.png", "F2b elevated +0.1 s after hit", "beam toward and away from camera"],
      ["cc-F2c-view-low.png", "F2c low", "elevation clamped low"]]],
  ] },
};
const b = await launchGpu({ port: 9651, width: 800, height: 600 });
const loaded = new Set();
async function load(file) {
  if (loaded.has(file)) return;
  const b64 = readFileSync(EV + file).toString("base64");
  await b.js(`(async () => { window.IM = window.IM || {}; const im = new Image(); im.src = 'data:image/png;base64,${b64}'; await im.decode(); window.IM[${JSON.stringify(file)}] = im; return true; })()`);
  loaded.add(file);
}
const CELL_W = 620, LABEL_H = 52, GAP = 10, HEAD_H = 34, COLS = 3, TITLE_H = 44;
for (const [key, sheet] of Object.entries(sheets)) {
  const out = EV + `cc-contact-sheet-${key}.png`;
  if (existsSync(out)) throw new Error("refusing to overwrite " + out);
  const items = []; let y = TITLE_H;
  for (const [head, panels] of sheet.sections) {
    items.push({ kind: "head", text: head, y }); y += HEAD_H;
    let col = 0, rowH = 0, rowY = y;
    for (const p of panels) {
      await load(p[0]);
      const [file, title, detail, crop0, fit] = p;
      const crop = crop0 ?? scene;
      const maxH = fit ? 460 : Math.round(CELL_W * (crop[3] / crop[2]));
      const sc = Math.min(CELL_W / crop[2], maxH / crop[3]);
      const w = Math.round(crop[2] * sc), h = Math.round(crop[3] * sc);
      items.push({ kind: "panel", file, title, detail, crop, x: GAP + col * (CELL_W + GAP), y: rowY, w, h, scale: sc });
      rowH = Math.max(rowH, h + LABEL_H + GAP);
      if (++col === COLS) { col = 0; rowY += rowH; rowH = 0; }
    }
    y = rowY + (col ? rowH : 0) + GAP;
  }
  const W = GAP + COLS * (CELL_W + GAP), H = y;
  await b.js(`(() => { const c = document.createElement('canvas'); c.width = ${W}; c.height = ${H}; window.SHEET = c; const g = c.getContext('2d'); g.fillStyle = '#0b0d12'; g.fillRect(0, 0, ${W}, ${H}); g.fillStyle = '#e8ecf4'; g.font = 'bold 18px Segoe UI, Arial'; g.fillText(${JSON.stringify(sheet.title)}, 12, 28); return true; })()`);
  for (const it of items) {
    if (it.kind === "head") await b.js(`(() => { const g = window.SHEET.getContext('2d'); g.fillStyle = '#ffd479'; g.font = 'bold 15px Segoe UI, Arial'; g.fillText(${JSON.stringify(it.text)}, 12, ${it.y + 22}); return true; })()`);
    else await b.js(`(() => { const g = window.SHEET.getContext('2d'); const im = window.IM[${JSON.stringify(it.file)}]; const [sx, sy, sw, sh] = ${JSON.stringify(it.crop)}; g.imageSmoothingQuality = 'high'; g.drawImage(im, sx, sy, sw, sh, ${it.x}, ${it.y}, ${it.w}, ${it.h}); g.strokeStyle = '#2a3140'; g.strokeRect(${it.x} + 0.5, ${it.y} + 0.5, ${it.w}, ${it.h});
      g.fillStyle = '#fff'; g.font = 'bold 14px Segoe UI, Arial'; g.fillText(${JSON.stringify(it.title)}, ${it.x}, ${it.y + it.h + 18}); g.fillStyle = '#aab3c5'; g.font = '12px Segoe UI, Arial'; g.fillText(${JSON.stringify(it.detail)}, ${it.x}, ${it.y + it.h + 36});
      g.fillStyle = '#6f7a90'; g.font = '11px Segoe UI, Arial'; g.fillText(${JSON.stringify(it.file + "  (scale " + it.scale.toFixed(2) + ")")}, ${it.x}, ${it.y + it.h + 50}); return true; })()`);
  }
  const url = await b.js("window.SHEET.toDataURL('image/png')");
  writeFileSync(out, Buffer.from(url.split(",")[1], "base64"));
  console.log("wrote", out, W + "x" + H);
}
await b.close();
