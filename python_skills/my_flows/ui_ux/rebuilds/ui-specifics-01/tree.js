/* tree.js — "prune, then grow wild" (timing from the talk at ~12:28).
   Phase 1 (0–15.7 s): a compact tree; leaves fall 6–9 s.  Phase 2 (15.7–25.8 s): a hard cut
   to a wider tree whose branches grow out by depth. All drawing is procedural. */
(() => {
  const cv = document.getElementById("c"), ctx = cv.getContext("2d");
  const W = cv.width, H = cv.height, CUT = 15.7, END = 25.8;
  const caps = [
    [0, "Quality filter was built into every stage."],
    [6, "We poked and we prodded and we pruned along the way…"],
    [9, "…and products grew somewhat methodically."],
    [15.7, "Well, now we can build 20 ideas in a week."],
    [19, "Awesome in many ways. Now the filtering happens after the build."],
  ];
  let seed = 7;
  const rng = (s) => () => ((s = Math.imul(s ^ (s >>> 15), 2246822507) ^ Math.imul(s ^ (s >>> 13), 3266489909)) >>> 0) / 4294967296;

  function grow(cfg, rand) {
    const out = [];
    (function br(x, y, ang, len, w, d, start) {
      const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
      out.push({ x, y, x2, y2, w, d, start });
      if (d >= cfg.depth) return;
      const kids = rand() < cfg.three ? 3 : 2;
      for (let k = 0; k < kids; k++) {
        const spread = (k - (kids - 1) / 2) * cfg.spread + (rand() - 0.5) * cfg.jitter;
        br(x2, y2, ang + spread, len * (cfg.shrink + rand() * 0.12), w * 0.68, d + 1, start + cfg.stagger);
      }
    })(cfg.x, H * 0.9, -Math.PI / 2, cfg.trunk, cfg.width, 0, 0);
    return out;
  }

  let A, B, leaves;
  function build() {
    const r1 = rng(seed), r2 = rng(seed * 31 + 5);
    A = grow({ x: W / 2, trunk: 150, width: 22, depth: 7, spread: 0.42, jitter: 0.35, shrink: 0.68, three: 0.25, stagger: 0 }, r1);
    B = grow({ x: W / 2, trunk: 170, width: 30, depth: 9, spread: 0.62, jitter: 0.5, shrink: 0.74, three: 0.38, stagger: 0.9 }, r2);
    leaves = [];
    A.filter((b) => b.d >= 4).forEach((b) => {
      for (let i = 0; i < 3; i++) {
        const t = r1();
        leaves.push({ x: b.x + (b.x2 - b.x) * t + (r1() - 0.5) * 26, y: b.y + (b.y2 - b.y) * t + (r1() - 0.5) * 26,
          r: 9 + r1() * 7, rot: r1() * 6.28, falls: r1() < 0.34, t0: 6 + r1() * 3, drift: (r1() - 0.5) * 2, g: 0.6 + r1() * 0.5 });
      }
    });
  }

  const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
  function drawBranches(list, t, grow) {
    ctx.lineCap = "round";
    ctx.strokeStyle = "#24402c";
    for (const b of list) {
      let k = 1;
      if (grow) k = ease((t - b.start) / 1.6);
      if (k <= 0) continue;
      ctx.lineWidth = Math.max(1, b.w);
      ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x + (b.x2 - b.x) * k, b.y + (b.y2 - b.y) * k); ctx.stroke();
    }
  }
  function leaf(x, y, r, rot, a) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = a;
    ctx.fillStyle = "#6d8a73"; ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.5, 0, 0, 6.283); ctx.fill();
    ctx.restore(); ctx.globalAlpha = 1;
  }

  function frame(t) {
    ctx.fillStyle = "#f7f7f5"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(0,0,0,.06)"; ctx.beginPath(); ctx.ellipse(W / 2, H * 0.9, 210, 14, 0, 0, 6.283); ctx.fill();
    if (t < CUT) {
      const sway = Math.sin(t * 1.3) * 0.004;
      ctx.save(); ctx.translate(W / 2, H * 0.9); ctx.rotate(sway); ctx.translate(-W / 2, -H * 0.9);
      drawBranches(A, t, false);
      for (const l of leaves) {
        if (!l.falls || t < l.t0) { leaf(l.x, l.y, l.r, l.rot, 1); continue; }
        const dt = t - l.t0, y = l.y + 0.5 * 260 * l.g * dt * dt, x = l.x + Math.sin(dt * 3 + l.drift) * 22 + l.drift * dt * 30;
        if (y < H * 0.92) leaf(x, y, l.r, l.rot + dt * 2, Math.max(0, 1 - dt / 2.4));
      }
      ctx.restore();
    } else {
      const g = (t - CUT) * 0.95;
      drawBranches(B, g, true);
      for (const b of B) if (b.d >= 6) {
        const k = ease((g - b.start - 1.2) / 1.2);
        if (k > 0) leaf(b.x2, b.y2, 8 * k, b.x2 % 6, 0.9);
      }
    }
    let c = ""; for (const [s, txt] of caps) if (t >= s) c = txt;
    document.getElementById("cap").textContent = c;
  }

  const scrub = document.getElementById("scrub"), timeEl = document.getElementById("time"), btn = document.getElementById("play");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let playing = !reduced, t = reduced ? 20 : 0, last = performance.now();
  btn.textContent = playing ? "Pause" : "Play";
  function loop(now) {
    const dt = (now - last) / 1000; last = now;
    if (playing) { t += dt; if (t > END) t = 0; scrub.value = t; }
    frame(t); timeEl.textContent = t.toFixed(1) + " s";
    requestAnimationFrame(loop);
  }
  scrub.addEventListener("input", () => { t = +scrub.value; });
  btn.addEventListener("click", () => { playing = !playing; btn.textContent = playing ? "Pause" : "Play"; });
  document.getElementById("seed").addEventListener("click", () => { seed = (Math.random() * 1e6) | 0; build(); t = 0; });
  build(); requestAnimationFrame(loop);
})();
