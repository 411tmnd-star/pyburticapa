import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { CALM_MOTION, REDUCED_MOTION, REST_EXPOSURE, REST_GLOW, SCENE_LEVEL, toMatrixParams, type MatrixParams } from "../src/lib/spectrum-matrix/params";
import { IDLE_FRAME, makeFrame, type AudioFeatureFrame } from "../src/lib/pipeline/contract";

const frame = (o: Partial<AudioFeatureFrame> = {}) => makeFrame({ ...IDLE_FRAME, ...o });
const LOUD = frame({ isPlaying: true, bass: 0.8, mid: 0.6, high: 0.4, rmsEnergy: 0.7, onsetStrength: 0.9, beatDetected: true, bassHit: 0.8, currentSceneState: "active" });
const NUMERIC: Array<keyof MatrixParams> = ["bass", "mid", "high", "colour", "exposure", "glow", "ridge", "sceneLevel", "motion"];

describe("Spectrum Matrix params: bounds and purity", () => {
  it("every numeric output is finite and in 0..1 for a spread of frames, normal and reduced", () => {
    for (const reduced of [false, true]) {
      for (const s of ["rest", "build", "active", "settle"] as const) {
        for (const v of [0, 0.03, 0.2, 0.5, 1]) {
          const p = toMatrixParams(frame({ isPlaying: true, bass: v, mid: v, high: v, rmsEnergy: v, onsetStrength: v, beatDetected: v > 0.4, bassHit: v, currentSceneState: s }), reduced);
          for (const k of NUMERIC) assert.ok(Number.isFinite(p[k] as number) && (p[k] as number) >= 0 && (p[k] as number) <= 1, `${k}=${p[k]}`);
        }
      }
    }
  });

  it("is pure: equal results for the same frame, and the frame is not changed", () => {
    const before = JSON.stringify(LOUD);
    assert.deepEqual(toMatrixParams(LOUD, false), toMatrixParams(LOUD, false));
    assert.equal(JSON.stringify(LOUD), before);
  });

  it("tolerates invalid input without producing NaN", () => {
    const bad = { ...LOUD, bass: NaN, mid: Infinity, high: -3, rmsEnergy: NaN, bassHit: NaN, currentSceneState: "nonsense" } as unknown as AudioFeatureFrame;
    for (const k of NUMERIC) assert.ok(Number.isFinite(toMatrixParams(bad, false)[k] as number), k);
  });
});

describe("Spectrum Matrix params: mapping", () => {
  it("maps bass, mid, high, loudness, bassHit and scene state to their parameters", () => {
    const p = toMatrixParams(LOUD, false);
    assert.equal(p.bass, 0.8);
    assert.equal(p.mid, 0.6);
    assert.equal(p.high, 0.4);
    assert.equal(p.colour, 0.6);
    assert.ok(Math.abs(p.exposure - (REST_EXPOSURE + (1 - REST_EXPOSURE) * 0.7)) < 1e-9);
    assert.ok(Math.abs(p.glow - (REST_GLOW + (1 - REST_GLOW) * 0.8)) < 1e-9);
    assert.equal(p.ridge, 0.8, "bassHit drives the ridge");
    assert.equal(p.sceneLevel, SCENE_LEVEL.active);
    assert.equal(p.calm, false);
  });

  it("does not use onsets: beatDetected and onsetStrength change nothing", () => {
    assert.deepEqual(toMatrixParams(frame({ ...LOUD, beatDetected: false, onsetStrength: 0 }), false), toMatrixParams(LOUD, false));
  });
});

describe("Spectrum Matrix params: silence, the rest floor and reduced motion", () => {
  it("silence is calm and sits on the floors, with no ridge and slow scrolling", () => {
    const p = toMatrixParams(IDLE_FRAME, false);
    assert.equal(p.calm, true);
    assert.equal(p.exposure, REST_EXPOSURE);
    assert.equal(p.glow, REST_GLOW);
    assert.equal(p.ridge, 0);
    assert.equal(p.motion, CALM_MOTION);
    assert.ok(p.motion <= 0.3);
  });

  it("a very quiet signal is calm even if it claims to be playing and reports a hit", () => {
    const p = toMatrixParams(frame({ isPlaying: true, rmsEnergy: 0.01, bassHit: 1 }), false);
    assert.equal(p.calm, true);
    assert.equal(p.ridge, 0);
  });

  it("the floors stay clearly below a loud passage", () => {
    const loud = toMatrixParams(frame({ ...LOUD, rmsEnergy: 0.9, bass: 0.9 }), false);
    assert.ok(loud.exposure > 2.5 * REST_EXPOSURE && loud.glow > 2.5 * REST_GLOW);
  });

  it("reduced motion scales the scroll, removes the ridge, and keeps colour, glow and exposure", () => {
    const n = toMatrixParams(LOUD, false);
    const r = toMatrixParams(LOUD, true);
    assert.equal(r.motion, REDUCED_MOTION);
    assert.equal(r.ridge, 0);
    assert.equal(r.colour, n.colour);
    assert.equal(r.glow, n.glow);
    assert.equal(r.exposure, n.exposure);
    assert.ok(r.high <= n.high, "the roughest band is calmed, not boosted");
  });
});
