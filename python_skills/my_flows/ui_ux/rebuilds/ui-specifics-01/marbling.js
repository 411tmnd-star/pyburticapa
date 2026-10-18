/* marbling.js — mathematical paper marbling (after the published "Mathematical Marbling" method).
   Ink lives as polygons. A new drop pushes every existing vertex outward; a tine stroke shifts
   vertices along a line, falling off with distance. Run the steps of a classic recipe
   (drops in rows -> comb one way -> comb back -> waves -> fine comb) and a feathered,
   peacock-like pattern emerges. Everything here is drawn from math; no images. */
(() => {
  const cv = document.getElementById("m"), ctx = cv.getContext("2d");
  const W = cv.width, H = cv.height;
  const PALETTES = {
    moss: ["#17363a", "#2f6a5f", "#9fc4a2", "#d9cfa8", "#b8642f", "#0f2224"],
    bosphorus: ["#1e2a6b", "#d6a548", "#c76b77", "#f2e9d8", "#3b7aa6", "#121633"],
    ink: ["#151515", "#f2ede3", "#8e8a80", "#c4402f", "#3d3d3d", "#f2ede3"],
  };
  let palette = PALETTES.moss, drops = [], ci = 0, bg = "#efe8d6";

  function circle(cx, cy, r, n = 96) {
    const pts = [];
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); }
    return pts;
  }
  function drop(cx, cy, r, color) {
    const r2 = r * r;
    for (const d of drops) for (const p of d.pts) {
      const dx = p[0] - cx, dy = p[1] - cy, m2 = dx * dx + dy * dy || 1e-6, k = Math.sqrt(1 + r2 / m2);
      p[0] = cx + dx * k; p[1] = cy + dy * k;
    }
    drops.push({ pts: circle(cx, cy, r), color });
  }
  // tine: a line through (bx,by) with unit direction (mx,my); shift z, sharpness c
  function tine(bx, by, mx, my, z, c) {
    const u = Math.pow(0.5, 1 / c);
    for (const d of drops) for (const p of d.pts) {
      const dist = Math.abs((p[0] - bx) * my - (p[1] - by) * mx);
      const s = z * Math.pow(u, dist);
      p[0] += mx * s; p[1] += my * s;
    }
    refine();
  }
  // wave: vertical shift that varies sinusoidally with x
  function wave(amp, period, phase) {
    for (const d of drops) for (const p of d.pts) p[1] += amp * Math.sin((p[0] / period) * Math.PI * 2 + phase);
    refine();
  }
  function refine(maxLen = 6, cap = 4000) {
    for (const d of drops) {
      if (d.pts.length > cap) continue;
      const out = [];
      for (let i = 0; i < d.pts.length; i++) {
        const a = d.pts[i], b = d.pts[(i + 1) % d.pts.length];
        out.push(a);
        const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
        if (L > maxLen && L < W) {
          const k = Math.min(8, Math.ceil(L / maxLen));
          for (let j = 1; j < k; j++) out.push([a[0] + (dx * j) / k, a[1] + (dy * j) / k]);
        }
      }
      d.pts = out;
    }
  }
  function draw() {
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    for (const d of drops) {
      ctx.fillStyle = d.color; ctx.beginPath();
      d.pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.closePath(); ctx.fill();
    }
  }

  // ----- recipe steps -----
  const steps = {
    field() { // drops in staggered rows, colours cycling
      const gap = 70, r = 34;
      for (let y = gap / 2, row = 0; y < H + gap; y += gap * 0.9, row++)
        for (let x = (row % 2) * gap / 2; x < W + gap; x += gap) drop(x, y, r, palette[(ci++) % (palette.length - 1)]);
    },
    combDown() { for (let x = 0; x < W; x += 60) tine(x, 0, 0, 1, 60, 14); },
    combUp() { for (let x = 30; x < W; x += 60) tine(x, 0, 0, -1, 60, 14); },
    waves() { wave(26, 140, 0); },
    fine() { for (let y = 0; y < H; y += 24) tine(0, y, 1, 0, 14, 9); },
  };
  const recipe = ["field", "combDown", "combUp", "waves", "fine"];

  // ----- UI -----
  function reset() { drops = []; ci = 0; draw(); }
  function run(name) { steps[name](); draw(); }
  document.querySelectorAll("[data-step]").forEach((b) => b.addEventListener("click", () => run(b.dataset.step)));
  document.getElementById("reset").addEventListener("click", reset);
  document.getElementById("pal").addEventListener("change", (e) => { palette = PALETTES[e.target.value]; bg = e.target.value === "ink" ? "#e9e3d6" : e.target.value === "bosphorus" ? "#f4ecd9" : "#efe8d6"; reset(); });
  document.getElementById("auto").addEventListener("click", async () => {
    reset();
    for (const s of recipe) { run(s); await new Promise((r) => setTimeout(r, 650)); }
  });
  // pointer: click = drop, drag = comb along the drag
  let down = null;
  const pos = (e) => { const r = cv.getBoundingClientRect(); return [((e.clientX - r.left) / r.width) * W, ((e.clientY - r.top) / r.height) * H]; };
  cv.addEventListener("pointerdown", (e) => { down = pos(e); cv.setPointerCapture(e.pointerId); });
  cv.addEventListener("pointerup", (e) => {
    if (!down) return;
    const p = pos(e), dx = p[0] - down[0], dy = p[1] - down[1], L = Math.hypot(dx, dy);
    if (L < 6) drop(p[0], p[1], 30 + Math.random() * 20, palette[(ci++) % (palette.length - 1)]);
    else tine(down[0], down[1], dx / L, dy / L, Math.min(120, L * 0.6), 18);
    down = null; draw();
  });

  // start in a finished state so the page is complete at rest
  recipe.forEach((s) => steps[s]()); draw();
  window.Marbling = { drop, tine, wave, draw, reset, steps };
})();
