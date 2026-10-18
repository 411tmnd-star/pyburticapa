import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { CALM_MOTION, REDUCED_MOTION, REST_GLOW, REST_SPIN, SCENE_LEVEL, SILENCE_RMS, toAccretionParams, type AccretionParams } from "../src/lib/accretion/params";
import { IDLE_FRAME, makeFrame, type AudioFeatureFrame } from "../src/lib/pipeline/contract";

const frame = (o: Partial<AudioFeatureFrame> = {}) => makeFrame({ ...IDLE_FRAME, ...o });
const LOUD: Partial<AudioFeatureFrame> = {
  isPlaying: true, bass: 0.8, mid: 0.5, high: 0.3, rmsEnergy: 0.7, onsetStrength: 0.9, beatDetected: true, bassHit: 0.6, currentSceneState: "active",
};
const near = (a: number, b: number, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `expected ${a} to be ${b}`);

/** Every numeric output must be finite and inside 0..1. */
function assertBounded(p: AccretionParams) {
  for (const [k, v] of Object.entries(p)) {
    if (typeof v === "boolean") continue;
    assert.ok(Number.isFinite(v), `${k} is not finite: ${v}`);
    assert.ok(v >= 0 && v <= 1, `${k} is outside 0..1: ${v}`);
  }
}

/** Deterministic pseudo-random numbers (linear congruential generator), so the sweep is reproducible. */
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

describe("silence and the resting state", () => {
  it("IDLE_FRAME gives a dim, still, pulse-free resting state", () => {
    const p = toAccretionParams(IDLE_FRAME, false);
    assert.equal(p.calm, true);
    near(p.horizon, 0);
    near(p.rimGlow, REST_GLOW);
    near(p.diskSpeed, REST_SPIN * CALM_MOTION);
    near(p.diskTurbulence, 0);
    near(p.detail, 0);
    near(p.exposure, 0);
    near(p.jet, 0);
    near(p.flare, 0);
    near(p.sceneLevel, 0);
    near(p.motion, CALM_MOTION);
    assert.ok(p.rimGlow > 0, "the body stays dim, not blank");
  });

  it("silence keeps every motion multiplier at or below the 0.3 limit in the scope", () => {
    assert.ok(toAccretionParams(IDLE_FRAME, false).motion <= 0.3);
    assert.ok(toAccretionParams(frame({ isPlaying: true, rmsEnergy: 0.01, bass: 1, mid: 1, high: 1, bassHit: 1, beatDetected: true, onsetStrength: 1 }), false).motion <= 0.3);
  });

  it("a paused source is calm even if the features are still high", () => {
    const p = toAccretionParams(frame({ ...LOUD, isPlaying: false }), false);
    assert.equal(p.calm, true);
    near(p.jet, 0);
    near(p.flare, 0);
    near(p.motion, CALM_MOTION);
  });

  it("the silence threshold is exact: below it is calm, at it is not", () => {
    assert.equal(toAccretionParams(frame({ isPlaying: true, rmsEnergy: SILENCE_RMS - 1e-4 }), false).calm, true);
    assert.equal(toAccretionParams(frame({ isPlaying: true, rmsEnergy: SILENCE_RMS }), false).calm, false);
  });
});

describe("loud passages: each feature drives its named parameter", () => {
  it("maps a typical loud frame to the expected values", () => {
    const p = toAccretionParams(frame(LOUD), false);
    assert.equal(p.calm, false);
    near(p.horizon, 0.8); // bass -> central body
    near(p.rimGlow, REST_GLOW + (1 - REST_GLOW) * 0.8); // bass -> rim glow, above the dim floor
    near(p.diskSpeed, REST_SPIN + (1 - REST_SPIN) * 0.5); // mid -> disk speed
    near(p.diskTurbulence, 0.5); // mid -> turbulence
    near(p.diskColour, 0.5); // mid -> colour
    near(p.detail, 0.3); // high -> fine detail
    near(p.exposure, 0.7); // rms -> exposure
    near(p.jet, 0.6); // bassHit -> jet ignition
    near(p.flare, 0.9); // beat + onset strength -> flare
    near(p.sceneLevel, 1); // active
    near(p.motion, 1);
  });

  it("the disk speed depends on mids alone, not bass", () => {
    const a = toAccretionParams(frame({ ...LOUD, bass: 0 }), false);
    const b = toAccretionParams(frame({ ...LOUD, bass: 1 }), false);
    near(a.diskSpeed, b.diskSpeed);
    near(a.diskTurbulence, b.diskTurbulence);
  });

  it("the central body depends on bass alone", () => {
    const a = toAccretionParams(frame({ ...LOUD, mid: 0, high: 0, rmsEnergy: 0.5 }), false);
    const b = toAccretionParams(frame({ ...LOUD, mid: 1, high: 1, rmsEnergy: 0.5 }), false);
    near(a.horizon, 0.8);
    near(b.horizon, 0.8);
    near(a.horizon, b.horizon);
  });
});

describe("minimum and maximum feature values", () => {
  it("all features at zero (playing, not silent): lowest motion with the floors applied", () => {
    const p = toAccretionParams(frame({ isPlaying: true, rmsEnergy: 0.5, bass: 0, mid: 0, high: 0 }), false);
    near(p.horizon, 0);
    near(p.rimGlow, REST_GLOW);
    near(p.diskSpeed, REST_SPIN);
    near(p.diskTurbulence, 0);
    near(p.detail, 0);
    near(p.diskColour, 0);
  });

  it("all features at one: every parameter reaches its maximum", () => {
    const p = toAccretionParams(frame({ isPlaying: true, rmsEnergy: 1, bass: 1, mid: 1, high: 1, bassHit: 1, onsetStrength: 1, beatDetected: true, currentSceneState: "active" }), false);
    near(p.horizon, 1);
    near(p.rimGlow, 1);
    near(p.diskSpeed, 1);
    near(p.diskTurbulence, 1);
    near(p.diskColour, 1);
    near(p.detail, 1);
    near(p.exposure, 1);
    near(p.jet, 1);
    near(p.flare, 1);
    near(p.sceneLevel, 1);
    near(p.motion, 1);
  });
});

describe("beat and bass-hit activation", () => {
  it("a bass hit without a beat fires the jet but not the flare", () => {
    const p = toAccretionParams(frame({ ...LOUD, beatDetected: false, bassHit: 0.7 }), false);
    near(p.jet, 0.7);
    near(p.flare, 0);
  });

  it("a beat with no strength produces no flare", () => {
    const p = toAccretionParams(frame({ ...LOUD, beatDetected: true, onsetStrength: 0 }), false);
    near(p.flare, 0);
  });

  it("onset strength alone, without a detected beat, does not trigger the flare", () => {
    const p = toAccretionParams(frame({ ...LOUD, beatDetected: false, onsetStrength: 0.95 }), false);
    near(p.flare, 0);
  });

  it("no bass hit means no jet, however loud the bass", () => {
    near(toAccretionParams(frame({ ...LOUD, bassHit: 0, bass: 1 }), false).jet, 0);
  });
});

describe("scene states", () => {
  it("each scene state maps to its documented level", () => {
    for (const [state, level] of Object.entries(SCENE_LEVEL)) {
      near(toAccretionParams(frame({ ...LOUD, currentSceneState: state as "rest" }), false).sceneLevel, level);
    }
  });

  it("the levels are ordered as the design intends: rest < settle < build < active", () => {
    assert.ok(SCENE_LEVEL.rest < SCENE_LEVEL.settle);
    assert.ok(SCENE_LEVEL.settle < SCENE_LEVEL.build);
    assert.ok(SCENE_LEVEL.build < SCENE_LEVEL.active);
  });

  it("a scene change alone changes only the scene level", () => {
    const a = toAccretionParams(frame({ ...LOUD, currentSceneState: "build" }), false);
    const b = toAccretionParams(frame({ ...LOUD, currentSceneState: "active" }), false);
    assert.notEqual(a.sceneLevel, b.sceneLevel);
    const { sceneLevel: _a, ...restA } = a;
    const { sceneLevel: _b, ...restB } = b;
    assert.deepEqual(restA, restB);
  });
});

describe("reduced motion", () => {
  it("damps motion to the documented multiplier and removes pulses", () => {
    const p = toAccretionParams(frame(LOUD), true);
    near(p.motion, REDUCED_MOTION);
    near(p.jet, 0);
    near(p.flare, 0);
    near(p.diskSpeed, (REST_SPIN + (1 - REST_SPIN) * 0.5) * REDUCED_MOTION);
    near(p.diskTurbulence, 0.5 * REDUCED_MOTION);
    near(p.detail, 0.3 * REDUCED_MOTION);
  });

  it("colour, glow and exposure are unchanged, so the picture still responds", () => {
    const normal = toAccretionParams(frame(LOUD), false);
    const reduced = toAccretionParams(frame(LOUD), true);
    near(reduced.diskColour, normal.diskColour);
    near(reduced.rimGlow, normal.rimGlow);
    near(reduced.exposure, normal.exposure);
    near(reduced.horizon, normal.horizon);
    near(reduced.sceneLevel, normal.sceneLevel);
  });

  it("silence under reduced motion is the calmest state", () => {
    const p = toAccretionParams(IDLE_FRAME, true);
    near(p.motion, CALM_MOTION * REDUCED_MOTION);
    assert.ok(p.motion < toAccretionParams(IDLE_FRAME, false).motion);
  });
});

describe("invalid numeric input", () => {
  // Raw objects, not makeFrame, so the invalid values reach the mapping unchanged.
  const raw = (o: Record<string, unknown>) => ({ ...IDLE_FRAME, ...o }) as unknown as AudioFeatureFrame;

  it("NaN maps to zero, not to a NaN parameter", () => {
    const p = toAccretionParams(raw({ isPlaying: true, rmsEnergy: 0.5, bass: NaN, mid: NaN, high: NaN, bassHit: NaN, onsetStrength: NaN }), false);
    assertBounded(p);
    near(p.horizon, 0);
    near(p.jet, 0);
  });

  it("positive infinity clamps to one and negative infinity to zero", () => {
    const hi = toAccretionParams(raw({ isPlaying: true, rmsEnergy: 0.5, bass: Infinity, mid: Infinity, high: Infinity }), false);
    const lo = toAccretionParams(raw({ isPlaying: true, rmsEnergy: 0.5, bass: -Infinity, mid: -Infinity, high: -Infinity }), false);
    assertBounded(hi);
    assertBounded(lo);
    near(hi.horizon, 1);
    near(lo.horizon, 0);
  });

  it("values outside 0..1 are clamped", () => {
    const p = toAccretionParams(raw({ isPlaying: true, rmsEnergy: 3, bass: -2, mid: 7, high: 1.5, bassHit: 9, onsetStrength: -1, beatDetected: true }), false);
    assertBounded(p);
    near(p.horizon, 0);
    near(p.diskColour, 1);
    near(p.exposure, 1);
    near(p.jet, 1);
    near(p.flare, 0);
  });

  it("NaN loudness is treated as silence", () => {
    assert.equal(toAccretionParams(raw({ isPlaying: true, rmsEnergy: NaN }), false).calm, true);
  });

  it("an unknown scene state falls back to rest", () => {
    near(toAccretionParams(raw({ isPlaying: true, rmsEnergy: 0.5, currentSceneState: "chorus" }), false).sceneLevel, SCENE_LEVEL.rest);
  });

  it("a non-boolean isPlaying counts as not playing, and a non-boolean beatDetected as no beat", () => {
    const p = toAccretionParams(raw({ isPlaying: "yes", rmsEnergy: 0.5, bass: 1, beatDetected: 1, onsetStrength: 1 }), false);
    assert.equal(p.calm, true);
    near(p.flare, 0);
  });
});

describe("bounded outputs over a deterministic sweep", () => {
  it("5000 random frames (including extremes) stay finite and in 0..1", () => {
    const rand = lcg(20261013);
    const special = [0, 1, NaN, Infinity, -Infinity, -0.5, 1.5, 0.04, 0.3];
    const pick = () => (rand() < 0.2 ? special[Math.floor(rand() * special.length)] : rand());
    const scenes = ["rest", "build", "active", "settle", "bogus"];
    for (let i = 0; i < 5000; i++) {
      const f = {
        ...IDLE_FRAME,
        isPlaying: rand() < 0.8,
        bass: pick(), mid: pick(), high: pick(), rmsEnergy: pick(), onsetStrength: pick(), bassHit: pick(),
        beatDetected: rand() < 0.3,
        currentSceneState: scenes[Math.floor(rand() * scenes.length)],
      } as unknown as AudioFeatureFrame;
      const p = toAccretionParams(f, rand() < 0.2);
      assertBounded(p);
      assert.ok(p.motion <= 1);
      assert.ok([CALM_MOTION, 1, REDUCED_MOTION, CALM_MOTION * REDUCED_MOTION, 1 * REDUCED_MOTION].some((m) => Math.abs(m - p.motion) < 1e-12), `unexpected motion ${p.motion}`);
    }
  });

  it("the output has exactly the documented fields and no extras", () => {
    const keys = Object.keys(toAccretionParams(frame(LOUD), false)).sort();
    assert.deepEqual(keys, ["calm", "detail", "diskColour", "diskSpeed", "diskTurbulence", "exposure", "flare", "horizon", "jet", "motion", "rimGlow", "sceneLevel"]);
  });
});

describe("determinism and immutability", () => {
  it("identical input gives identical output, every time", () => {
    const f = frame(LOUD);
    const a = toAccretionParams(f, false);
    for (let i = 0; i < 100; i++) assert.deepEqual(toAccretionParams(f, false), a);
  });

  it("does not depend on order: a sequence of calls matches the same calls made in isolation", () => {
    const frames = [frame(LOUD), IDLE_FRAME, frame({ ...LOUD, bass: 0.2 })];
    const alone = frames.map((f) => toAccretionParams(f, false));
    const seq = [frames[2], frames[0], frames[1], frames[0]].map((f) => toAccretionParams(f, false));
    assert.deepEqual(seq[1], alone[0]);
    assert.deepEqual(seq[2], alone[1]);
    assert.deepEqual(seq[0], alone[2]);
  });

  it("never mutates the input frame", () => {
    const f = frame(LOUD);
    const before = structuredClone(f);
    toAccretionParams(f, true);
    toAccretionParams(f, false);
    assert.deepEqual(f, before);
  });

  it("works on a frozen frame, as the pipeline produces them", () => {
    const f = frame(LOUD);
    assert.ok(Object.isFrozen(f));
    assert.doesNotThrow(() => toAccretionParams(f, false));
  });
});
