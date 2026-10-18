import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  COLS, LOBES, MAX_DT_S, MAX_ROWS_PER_STEP, REST_UNDULATION, RIDGE_DECAY_S, RIDGE_HEIGHT, ROWS, ROW_RATE,
  createMatrixAnim, fillRow, rowOffset, stepMatrixAnim, type MatrixAnim,
} from "../src/lib/spectrum-matrix/animator";
import { toMatrixParams, type MatrixParams } from "../src/lib/spectrum-matrix/params";
import { IDLE_FRAME, makeFrame, type AudioFeatureFrame } from "../src/lib/pipeline/contract";

const frame = (o: Partial<AudioFeatureFrame> = {}) => makeFrame({ ...IDLE_FRAME, ...o });
const LOUD = frame({ isPlaying: true, bass: 0.8, mid: 0.6, high: 0.4, rmsEnergy: 0.7, bassHit: 0.0, currentSceneState: "active" });
const P_LOUD = toMatrixParams(LOUD, false);
const withP = (o: Partial<MatrixParams>): MatrixParams => ({ ...P_LOUD, ...o });
const run = (a: MatrixAnim, p: MatrixParams, seconds: number, dt = 1 / 60, reduced = false) => {
  const n = Math.round(seconds / dt);
  for (let i = 0; i < n; i++) stepMatrixAnim(a, p, dt, reduced);
  return a;
};
/** An animation whose motion envelope already sits at the target, so row counts can be compared across frame rates. */
const settled = (p: MatrixParams) => { const a = createMatrixAnim(); a.motion = p.motion; return a; };
const half = (row: Float32Array, off: number, from: number, to: number) => { let s = 0; for (let c = from; c < to; c++) s += row[off + c]; return s / (to - from); };

describe("Spectrum Matrix animator: time steps", () => {
  it("invalid or non-positive steps advance nothing; a long step is shortened", () => {
    const a = createMatrixAnim();
    const before = a.time;
    for (const dt of [0, -1, NaN, Infinity, -Infinity]) stepMatrixAnim(a, P_LOUD, dt, false);
    assert.equal(a.time, before);
    assert.equal(stepMatrixAnim(createMatrixAnim(), P_LOUD, 10, false).time, MAX_DT_S);
  });

  it("returns the same object and allocates no new row buffer", () => {
    const a = createMatrixAnim();
    const rows = a.rows;
    assert.equal(stepMatrixAnim(a, P_LOUD, 1 / 60, false), a);
    assert.equal(a.rows, rows);
  });

  it("is deterministic: the same sequence gives the same state and the same terrain", () => {
    const x = run(createMatrixAnim(), P_LOUD, 6);
    const y = run(createMatrixAnim(), P_LOUD, 6);
    assert.equal(x.serial, y.serial);
    assert.deepEqual(Array.from(x.rows), Array.from(y.rows));
  });
});

describe("Spectrum Matrix animator: scrolling is driven by time, not by frames", () => {
  it("the same number of rows is injected over 10 s at 30, 60 and 144 frames per second (within one row)", () => {
    const counts = [1 / 30, 1 / 60, 1 / 144].map((dt) => run(settled(P_LOUD), P_LOUD, 10, dt).serial);
    const expected = ROW_RATE * 10 * P_LOUD.motion;
    for (const c of counts) assert.ok(Math.abs(c - expected) <= 1.5, `rows ${c} vs expected ${expected}`);
    assert.ok(Math.max(...counts) - Math.min(...counts) <= 2, `counts ${counts}`);
  });

  it("the fraction scrolled stays within 0..1 and increases between injections", () => {
    const a = settled(P_LOUD);
    let last = a.frac, injections = 0, serial = a.serial;
    for (let i = 0; i < 600; i++) {
      stepMatrixAnim(a, P_LOUD, 1 / 60, false);
      assert.ok(a.frac >= 0 && a.frac < 1, `frac ${a.frac}`);
      if (a.serial !== serial) { injections++; serial = a.serial; assert.ok(a.frac < last, "the fraction wraps when a row is injected"); }
      else assert.ok(a.frac >= last, "the fraction grows between injections");
      last = a.frac;
    }
    assert.ok(injections > 20);
  });

  it("at most MAX_ROWS_PER_STEP rows are actually injected in one step, even if the clock jumps (stalled rows are skipped)", () => {
    const injected = (a: MatrixAnim, h0: number) => (a.head - h0 + ROWS) % ROWS;
    const a = createMatrixAnim();
    a.scroll = 500;
    const h0 = a.head;
    stepMatrixAnim(a, P_LOUD, 1 / 60, false);
    assert.equal(injected(a, h0), MAX_ROWS_PER_STEP, `injected ${injected(a, h0)}`);
    assert.ok(a.serial >= 500 - MAX_ROWS_PER_STEP, "the clock itself is not rewound");
    const b = createMatrixAnim();
    stepMatrixAnim(b, P_LOUD, 1 / 60, false);
    b.scroll += 100;
    const h1 = b.head;
    stepMatrixAnim(b, P_LOUD, 1 / 60, false);
    assert.ok(injected(b, h1) <= MAX_ROWS_PER_STEP, `injected ${injected(b, h1)}`);
  });

  it("reduced motion scrolls at about 0.35x and silence at 0.25x of the normal rate", () => {
    const n = run(settled(P_LOUD), P_LOUD, 20).serial;
    const pr = toMatrixParams(LOUD, true);
    const r = run(settled(pr), pr, 20, 1 / 60, true).serial;
    assert.ok(Math.abs(r / n - 0.35) < 0.03, `ratio ${r / n}`);
    const ps = toMatrixParams(IDLE_FRAME, false);
    const s = run(settled(ps), ps, 20).serial;
    assert.ok(Math.abs(s / n - 0.25) < 0.03, `ratio ${s / n}`);
  });
});

describe("Spectrum Matrix animator: the row ring buffer", () => {
  it("rowOffset maps ages 0..ROWS-1 onto every row exactly once, newest at the head", () => {
    const a = run(createMatrixAnim(), P_LOUD, 3);
    assert.equal(rowOffset(a, 0), a.head * COLS);
    const seen = new Set<number>();
    for (let age = 0; age < ROWS; age++) seen.add(rowOffset(a, age));
    assert.equal(seen.size, ROWS);
    for (const o of seen) assert.ok(o >= 0 && o < ROWS * COLS && o % COLS === 0);
  });

  it("the previous newest row becomes one row older after an injection, over many wraps", () => {
    const a = settled(P_LOUD);
    for (let i = 0; i < ROWS * 3; i++) {
      const prevNewest = Array.from(a.rows.slice(rowOffset(a, 0), rowOffset(a, 0) + COLS));
      const serial = a.serial;
      while (a.serial === serial) stepMatrixAnim(a, P_LOUD, 1 / 60, false);
      const nowAge1 = Array.from(a.rows.slice(rowOffset(a, 1), rowOffset(a, 1) + COLS));
      assert.deepEqual(nowAge1, prevNewest);
    }
  });

  it("heights always stay within 0..1, including at extreme parameters and a full-strength ridge", () => {
    const a = createMatrixAnim();
    const extreme = withP({ bass: 1, mid: 1, high: 1, exposure: 1, ridge: 1 });
    run(a, extreme, 8);
    let lo = 1, hi = 0;
    for (const v of a.rows) { lo = Math.min(lo, v); hi = Math.max(hi, v); assert.ok(Number.isFinite(v)); }
    assert.ok(lo >= 0 && hi <= 1, `range ${lo}..${hi}`);
    assert.ok(hi > 0.9, "the terrain does reach near the top at full input");
  });

  it("a new animation starts from the resting undulation, not a flat sheet and not tall", () => {
    const a = createMatrixAnim();
    let mx = 0, nonzero = 0;
    for (const v of a.rows) { mx = Math.max(mx, v); if (v > 0) nonzero++; }
    assert.ok(mx <= REST_UNDULATION + 1e-6, `max ${mx}`);
    assert.ok(nonzero > a.rows.length * 0.9);
  });
});

describe("Spectrum Matrix animator: the three bands map to the left, middle and right of the terrain", () => {
  const rowFor = (b: number, m: number, h: number) => {
    const a = createMatrixAnim();
    a.bass = b; a.mid = m; a.high = h; a.exposure = 0.6;
    const out = new Float32Array(COLS);
    // average several rows (different texture seeds) so one noise value cannot decide the result
    const acc = new Float32Array(COLS);
    for (let s = 1; s <= 24; s++) { fillRow(out, 0, a, s); for (let c = 0; c < COLS; c++) acc[c] += out[c] / 24; }
    return acc;
  };
  const third = Math.floor(COLS / 3);

  it("bass alone raises the left part more than the middle and the right", () => {
    const r = rowFor(0.9, 0, 0);
    const L = half(r, 0, 0, third), M = half(r, 0, third, 2 * third), R = half(r, 0, 2 * third, COLS);
    assert.ok(L > 1.5 * R && L > 1.2 * M, `L ${L} M ${M} R ${R}`);
  });

  it("high alone raises the right part more than the left", () => {
    const r = rowFor(0, 0, 0.9);
    const L = half(r, 0, 0, third), R = half(r, 0, 2 * third, COLS);
    assert.ok(R > 1.5 * L, `L ${L} R ${R}`);
  });

  it("mid alone raises the middle more than both sides", () => {
    const r = rowFor(0, 0.9, 0);
    const L = half(r, 0, 0, third), M = half(r, 0, third, 2 * third), R = half(r, 0, 2 * third, COLS);
    assert.ok(M > 1.5 * L && M > 1.5 * R, `L ${L} M ${M} R ${R}`);
  });

  it("the lobe centres are ordered bass, mid, high from left to right", () => {
    assert.ok(LOBES[0].centre < LOBES[1].centre && LOBES[1].centre < LOBES[2].centre);
  });
});

describe("Spectrum Matrix animator: the ridge", () => {
  it("jumps to the hit strength, decays with the stated constant, and does not stay lit", () => {
    const a = stepMatrixAnim(createMatrixAnim(), withP({ ridge: 1 }), 1 / 60, false);
    assert.equal(a.ridge, 1);
    run(a, withP({ ridge: 0 }), RIDGE_DECAY_S);
    assert.ok(Math.abs(a.ridge - Math.exp(-1)) < 0.03, `ridge ${a.ridge}`);
    run(a, withP({ ridge: 0 }), 3);
    assert.ok(a.ridge < 0.001);
  });

  it("a weaker hit does not cut a stronger one short", () => {
    const a = stepMatrixAnim(createMatrixAnim(), withP({ ridge: 0.9 }), 1 / 60, false);
    stepMatrixAnim(a, withP({ ridge: 0.2 }), 1 / 60, false);
    assert.ok(a.ridge > 0.85);
  });

  it("the next injected row is raised by the ridge, by about RIDGE_HEIGHT, and stays at or below 1", () => {
    const a = settled(withP({ bass: 0, mid: 0, high: 0 }));
    const quiet = withP({ bass: 0, mid: 0, high: 0, ridge: 0 });
    run(a, quiet, 1);
    const flat = Math.max(...a.rows.slice(rowOffset(a, 0), rowOffset(a, 0) + COLS));
    stepMatrixAnim(a, withP({ bass: 0, mid: 0, high: 0, ridge: 1 }), 1 / 60, false);
    const serial = a.serial;
    while (a.serial === serial) stepMatrixAnim(a, quiet, 1 / 60, false);
    const wall = a.rows.slice(rowOffset(a, 0), rowOffset(a, 0) + COLS);
    const mx = Math.max(...wall), mn = Math.min(...wall);
    assert.ok(mx <= 1 && mx > flat + 0.3, `max ${mx} vs quiet ${flat}`);
    assert.ok(mn > 0.4 * RIDGE_HEIGHT * Math.exp(-1 / 60 / RIDGE_DECAY_S), `the ridge spans the whole row: min ${mn}`);
  });
});

describe("Spectrum Matrix animator: stays bounded", () => {
  it("all unit fields stay in 0..1 over a long noisy run, normal and reduced", () => {
    const a = createMatrixAnim();
    for (let i = 0; i < 6000; i++) {
      const v = (Math.sin(i * 0.37) + 1) / 2;
      stepMatrixAnim(a, withP({ bass: v, mid: 1 - v, high: v * v, colour: v, exposure: v, glow: v, ridge: i % 90 === 0 ? 1 : 0, motion: v }), 1 / 60, i % 2000 > 1000);
    }
    for (const k of ["bass", "mid", "high", "colour", "exposure", "glow", "sceneLevel", "motion", "ridge", "frac"] as const) assert.ok(Number.isFinite(a[k]) && a[k] >= 0 && a[k] <= 1, `${k}=${a[k]}`);
    for (const v of a.rows) assert.ok(v >= 0 && v <= 1);
  });
});
