import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { CALM_MOTION, REDUCED_MOTION, REST_EXPOSURE, REST_GLOW, SCENE_LEVEL, toCoreParams, type CoreParams } from "../src/lib/constellation-core/params";
import { IDLE_FRAME, makeFrame, type AudioFeatureFrame } from "../src/lib/pipeline/contract";

const frame = (o: Partial<AudioFeatureFrame> = {}) => makeFrame({ ...IDLE_FRAME, ...o });
const LOUD = frame({ isPlaying: true, bass: 0.8, mid: 0.6, high: 0.4, rmsEnergy: 0.7, onsetStrength: 0.9, beatDetected: true, bassHit: 0.8, currentSceneState: "active" });
const NUMERIC: Array<keyof CoreParams> = ["swell", "glow", "orbitSpeed", "colour", "shimmer", "exposure", "beam", "pulse", "sceneLevel", "motion"];

describe("Constellation Core params: bounds and purity", () => {
  it("every numeric output is finite and in 0..1 for a spread of frames, normal and reduced", () => {
    const states = ["rest", "build", "active", "settle"] as const;
    for (const reduced of [false, true]) {
      for (const s of states) {
        for (const v of [0, 0.03, 0.2, 0.5, 1]) {
          const p = toCoreParams(frame({ isPlaying: true, bass: v, mid: v, high: v, rmsEnergy: v, onsetStrength: v, beatDetected: v > 0.4, bassHit: v, currentSceneState: s }), reduced);
          for (const k of NUMERIC) assert.ok(Number.isFinite(p[k] as number) && (p[k] as number) >= 0 && (p[k] as number) <= 1, `${k}=${p[k]}`);
        }
      }
    }
  });

  it("is pure: the same frame gives equal results and the frame is not changed", () => {
    const before = JSON.stringify(LOUD);
    assert.deepEqual(toCoreParams(LOUD, false), toCoreParams(LOUD, false));
    assert.equal(JSON.stringify(LOUD), before);
    assert.ok(Object.isFrozen(LOUD));
  });

  it("tolerates invalid input without producing NaN", () => {
    const bad = { ...LOUD, bass: NaN, mid: Infinity, high: -3, rmsEnergy: NaN, onsetStrength: 7, bassHit: NaN, currentSceneState: "nonsense" } as unknown as AudioFeatureFrame;
    const p = toCoreParams(bad, false);
    for (const k of NUMERIC) assert.ok(Number.isFinite(p[k] as number), k);
  });
});

describe("Constellation Core params: mapping", () => {
  it("maps each contract field to its parameter", () => {
    const p = toCoreParams(LOUD, false);
    assert.equal(p.swell, 0.8);
    assert.ok(Math.abs(p.glow - (REST_GLOW + (1 - REST_GLOW) * 0.8)) < 1e-9);
    assert.equal(p.colour, 0.6);
    assert.ok(Math.abs(p.exposure - (REST_EXPOSURE + (1 - REST_EXPOSURE) * 0.7)) < 1e-9, "loudness maps onto the range above the rest floor");
    assert.equal(p.beam, 0.8, "bassHit drives the beam");
    assert.equal(p.pulse, 0.9, "onset strength drives the pulse when an onset fired");
    assert.equal(p.sceneLevel, SCENE_LEVEL.active);
    assert.equal(p.calm, false);
  });

  it("a pulse needs an actual onset: strength alone does nothing", () => {
    assert.equal(toCoreParams(frame({ ...LOUD, beatDetected: false }), false).pulse, 0);
  });

  it("louder bass and mids give a brighter core and faster orbits", () => {
    const quiet = toCoreParams(frame({ ...LOUD, bass: 0.1, mid: 0.1 }), false);
    const loud = toCoreParams(frame({ ...LOUD, bass: 0.9, mid: 0.9 }), false);
    assert.ok(loud.glow > quiet.glow && loud.orbitSpeed > quiet.orbitSpeed);
  });
});

describe("Constellation Core params: the rest floor", () => {
  it("silence sits on the floors: exposure REST_EXPOSURE and glow REST_GLOW, both above zero", () => {
    const p = toCoreParams(IDLE_FRAME, false);
    assert.equal(p.exposure, REST_EXPOSURE);
    assert.equal(p.glow, REST_GLOW);
    assert.ok(REST_EXPOSURE > 0 && REST_GLOW > 0);
  });

  it("the floors stay clearly below a loud passage, so rest and active remain distinct", () => {
    const loud = toCoreParams(frame({ ...LOUD, rmsEnergy: 0.9, bass: 0.9 }), false);
    assert.ok(loud.exposure > 2.5 * REST_EXPOSURE, `exposure ${loud.exposure}`);
    assert.ok(loud.glow > 2.5 * REST_GLOW, `glow ${loud.glow}`);
  });

  it("exposure rises monotonically with loudness and never exceeds 1", () => {
    let last = -1;
    for (let r = 0; r <= 1.0001; r += 0.05) {
      const e = toCoreParams(frame({ ...LOUD, rmsEnergy: Math.min(1, r) }), false).exposure;
      assert.ok(e >= last && e <= 1, `rms ${r} exposure ${e}`);
      last = e;
    }
    assert.equal(toCoreParams(frame({ ...LOUD, rmsEnergy: 1 }), false).exposure, 1);
  });

  it("the floor does not turn silence into activity: still calm, no beam, no pulse, slow motion", () => {
    const p = toCoreParams(IDLE_FRAME, false);
    assert.equal(p.calm, true);
    assert.equal(p.beam + p.pulse, 0);
    assert.equal(p.motion, CALM_MOTION);
  });
});

describe("Constellation Core params: silence and reduced motion", () => {
  it("nothing playing is calm: dim rest glow, slow motion, no beam, no pulse", () => {
    const p = toCoreParams(IDLE_FRAME, false);
    assert.equal(p.calm, true);
    assert.equal(p.glow, REST_GLOW);
    assert.equal(p.beam, 0);
    assert.equal(p.pulse, 0);
    assert.equal(p.motion, CALM_MOTION);
    assert.ok(p.motion <= 0.3);
  });

  it("a very quiet signal is also calm even if it claims to be playing", () => {
    const p = toCoreParams(frame({ isPlaying: true, rmsEnergy: 0.01, bassHit: 1, beatDetected: true, onsetStrength: 1 }), false);
    assert.equal(p.calm, true);
    assert.equal(p.beam + p.pulse, 0);
  });

  it("reduced motion scales motion, removes beam and pulse, and keeps colour and glow", () => {
    const n = toCoreParams(LOUD, false);
    const r = toCoreParams(LOUD, true);
    assert.equal(r.motion, REDUCED_MOTION);
    assert.equal(r.beam, 0);
    assert.equal(r.pulse, 0);
    assert.ok(r.orbitSpeed < n.orbitSpeed && r.shimmer < n.shimmer);
    assert.equal(r.colour, n.colour);
    assert.equal(r.glow, n.glow);
    assert.equal(r.exposure, n.exposure);
  });
});
