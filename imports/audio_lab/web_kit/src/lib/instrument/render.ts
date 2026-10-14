import type { Constellation, Frame } from "./constellation";
import type { VisualParams } from "./profiles";

const BUCKETS = 6;

/** Draw one frame. Batched: nodes are grouped into alpha buckets and links into a single path. */
export function drawFrame(
  ctx: CanvasRenderingContext2D,
  c: Constellation,
  frame: Frame,
  p: VisualParams,
  w: number,
  h: number,
  reduced: boolean,
): void {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const R = Math.min(w, h) * 0.38;
  const hue = 200 + p.hue;

  // Ambient glow behind the cluster.
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.7);
  glow.addColorStop(0, `hsla(${hue},80%,60%,${(0.06 + 0.3 * p.glow).toFixed(3)})`);
  glow.addColorStop(1, "hsla(220,60%,8%,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Shockwave on each bass kick: a bright, thick ring that expands and fades. Reduced motion gets a faint
  // static ring instead.
  if (reduced) {
    ctx.strokeStyle = `hsla(${hue},60%,70%,0.12)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.05, 0, Math.PI * 2);
    ctx.stroke();
  } else if (p.kick > 0.02) {
    const life = 1 - p.kick;
    const r = R * (1.02 + life * 0.9);
    ctx.strokeStyle = `hsla(${hue},95%,80%,${(p.kick * 0.85).toFixed(3)})`;
    ctx.lineWidth = 2 + 3 * p.kick;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Links: each node joins its next neighbours on the sphere.
  if (p.linkAlpha > 0.01) {
    ctx.beginPath();
    for (let i = 0; i < c.n; i++) {
      for (const j of [i + 1, i + 9]) {
        if (j >= c.n) continue;
        ctx.moveTo(frame.x[i], frame.y[i]);
        ctx.lineTo(frame.x[j], frame.y[j]);
      }
    }
    ctx.strokeStyle = `hsla(${hue},70%,72%,${(p.linkAlpha * 0.16).toFixed(3)})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }

  // Nodes, batched into alpha buckets.
  const paths = Array.from({ length: BUCKETS }, () => new Path2D());
  for (let i = 0; i < c.n; i++) {
    const b = Math.min(BUCKETS - 1, Math.max(0, Math.floor(frame.alpha[i] * BUCKETS)));
    const r = frame.size[i];
    paths[b].moveTo(frame.x[i] + r, frame.y[i]);
    paths[b].arc(frame.x[i], frame.y[i], r, 0, Math.PI * 2);
  }
  for (let b = 0; b < BUCKETS; b++) {
    ctx.fillStyle = `hsla(${hue + (b % 2) * 18},85%,${62 + b * 4}%,${((b + 1) / BUCKETS).toFixed(3)})`;
    ctx.fill(paths[b]);
  }

  // Core: swells with sustained bass and flashes on each kick.
  const core = R * 0.05 * (1 + p.swell * 0.8 + p.kick * 1.4);
  const reach = core * 5;
  const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, reach);
  coreGlow.addColorStop(0, `hsla(${hue},100%,95%,${(0.45 + 0.4 * p.glow + 0.35 * p.kick).toFixed(3)})`);
  coreGlow.addColorStop(0.35, `hsla(${hue},100%,70%,${(0.25 + 0.3 * p.glow).toFixed(3)})`);
  coreGlow.addColorStop(1, `hsla(${hue},100%,60%,0)`);
  ctx.fillStyle = coreGlow;
  ctx.beginPath();
  ctx.arc(cx, cy, reach, 0, Math.PI * 2);
  ctx.fill();
}
