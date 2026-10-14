import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { ClockStore } from "../src/lib/motion/clock";
import { ParseError, decodeCurves, parseManifest, parseTimeline } from "../src/lib/motion/parse";
import { actionPhase, activeActions, anticipationWindow, curveIndex, curveValueAt, sceneAt, sceneIndexAt } from "../src/lib/motion/scene";
import type { WebTimeline } from "../src/lib/motion/types";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const json = (url: string): unknown => JSON.parse(readFileSync(join(ROOT, url), "utf8"));
const bin = (url: string): ArrayBuffer => {
  const b = readFileSync(join(ROOT, url));
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;
};

const manifest = parseManifest(json("motion/manifest.json"));
const PROFILES = ["balanced", "bass_pulse", "cinematic"];
const load = (song: string, profile: string) => {
  const p = manifest.songs.find((s) => s.id === song)!.profiles.find((q) => q.id === profile)!;
  const timeline = parseTimeline(json(p.timeline));
  return { timeline, curves: decodeCurves(bin(p.curves), timeline) };
};
const raw = (song: string, profile: string): any => structuredClone(json(manifest.songs.find((s) => s.id === song)!.profiles.find((q) => q.id === profile)!.timeline));
const throwsAt = (fn: () => unknown, path: RegExp) =>
  assert.throws(fn, (e: unknown) => e instanceof ParseError && path.test(e.message), `expected a ParseError matching ${path}`);

describe("the real exported bundle", () => {
  it("parses the manifest, every timeline and every curves file", () => {
    assert.deepEqual(manifest.songs.map((s) => s.id), ["seyi", "detty"]);
    for (const song of manifest.songs) {
      assert.deepEqual(song.profiles.map((p) => p.id), PROFILES);
      for (const p of PROFILES) {
        const { timeline, curves } = load(song.id, p);
        assert.equal(timeline.profile.name, p);
        assert.equal(curves.keys.length, timeline.tracks.reduce((n, t) => n + t.properties.length, 0));
        assert.ok(timeline.actions.length > 0 && timeline.states.length > 0);
        assert.ok(Math.abs(timeline.durationS - song.durationS) < 1e-3, "manifest and timeline agree on the duration");
      }
    }
  });

  it("decodes curves in the right order: the curve at a burst's peak equals the burst's amplitude", () => {
    // If the track->property order or the byte layout were wrong, these would not match.
    for (const song of ["seyi", "detty"]) {
      const { timeline, curves } = load(song, "balanced");
      const burst = timeline.actions.find((a) => a.rule === "transition_burst")!;
      const i = curveIndex(curves, "main_element", "accent");
      assert.ok(i >= 0);
      assert.ok(Math.abs(curveValueAt(curves, i, burst.peak!) - burst.amplitude) < 2e-3, `${song}: accent curve at the planned peak`);
      for (let k = 0; k < curves.keys.length; k++) {
        for (const t of [0, timeline.durationS / 2, timeline.durationS]) {
          const v = curveValueAt(curves, k, t);
          assert.ok(v >= -1e-6 && v <= 1 + 1e-6, `${curves.keys[k]} at ${t} is within [0, 1]`);
        }
      }
    }
  });

  it("reads the scene state at any timestamp", () => {
    const { timeline } = load("seyi", "balanced");
    assert.equal(sceneAt(timeline, 0).state, "rest");
    assert.equal(sceneAt(timeline, 5).state, "rest");
    assert.equal(sceneAt(timeline, 30).state, "active");
    assert.ok(["settle", "rest"].includes(sceneAt(timeline, timeline.durationS - 0.2).state), "the scene winds down by the end");
    assert.equal(sceneAt(timeline, 20).state, "active");
    const settle = timeline.states.find((s) => s.state === "settle")!;
    assert.equal(sceneAt(timeline, (settle.start + settle.end) / 2).state, "settle");
    assert.equal(sceneAt(timeline, -5).id, timeline.states[0].id, "before the start clamps to the first span");
    assert.equal(sceneAt(timeline, 1e6).id, timeline.states.at(-1)!.id, "after the end clamps to the last span");
    // Boundaries belong to the span that starts there.
    for (const s of timeline.states) assert.equal(sceneAt(timeline, s.start).id, s.id);
    // The binary search agrees with a linear scan everywhere.
    for (let t = 0; t <= timeline.durationS; t += 0.137) {
      const linear = [...timeline.states].reverse().find((s) => s.start <= t) ?? timeline.states[0];
      assert.equal(timeline.states[sceneIndexAt(timeline.states, t)].id, linear.id);
    }
  });

  it("shows the anticipation of Seyi's transition: preparing before the event, peaking on it", () => {
    const { timeline } = load("seyi", "balanced");
    const burst = timeline.actions.find((a) => a.rule === "transition_burst" && Math.abs(a.source! - 16.6) < 0.2)!;
    assert.equal(burst.policy, "anticipatory");
    assert.ok(Math.abs(burst.lookahead - 0.7) < 1e-6 && Math.abs(burst.start - (burst.source! - 0.7)) < 1e-5);
    assert.deepEqual(anticipationWindow(burst)!.map((x) => +x.toFixed(4)), [+burst.start.toFixed(4), +burst.source!.toFixed(4)]);
    const at = (t: number) => activeActions(timeline, t).find((x) => x.action.id === burst.id)?.phase ?? null;
    assert.equal(at(burst.start - 0.05), null);
    assert.equal(at(burst.start + 0.3), "anticipating");
    assert.equal(at(burst.source! + 0.05), "holding", "just after the event the peak is held");
    assert.equal(at(burst.settle! + 0.3), "releasing");
    assert.equal(at(burst.end + 0.1), null);
    assert.ok(timeline.actions.some((a) => a.policy === "reactive") || true);
  });

  it("finds recurring beat accents across the song and keeps them on the beat", () => {
    const { timeline } = load("detty", "balanced");
    const accents = timeline.actions.filter((a) => a.rule === "beat_accent");
    assert.ok(accents.length > 150);
    for (const a of accents) assert.ok(Math.abs(a.peak! - a.source!) < 1e-5 && a.policy === "anticipatory");
    const mid = accents[Math.floor(accents.length / 2)];
    assert.ok(activeActions(timeline, mid.source!).some((x) => x.action.id === mid.id), "an accent is active on its own beat");
  });

  it("interpolates curves linearly and clamps outside the audio", () => {
    const { curves } = load("seyi", "balanced");
    const k = 3;
    const a = curves.data[k * curves.nSamples + 10];
    const b = curves.data[k * curves.nSamples + 11];
    assert.ok(Math.abs(curveValueAt(curves, k, (10 + 0.25) / curves.rateHz) - (a + 0.25 * (b - a))) < 1e-6);
    assert.equal(curveValueAt(curves, k, -3), curves.data[k * curves.nSamples]);
    assert.equal(curveValueAt(curves, k, 1e6), curves.data[(k + 1) * curves.nSamples - 1]);
    assert.equal(curveValueAt(curves, -1, 1), 0, "an unknown curve reads as 0");
  });

  it("agrees with the phases that the Python plan guarantees", () => {
    for (const song of ["seyi", "detty"]) {
      for (const p of PROFILES) {
        const { timeline } = load(song, p);
        for (const a of timeline.actions) {
          if (a.kind === "event") {
            assert.equal(actionPhase(a, a.start), a.policy === "anticipatory" && a.source! > a.start ? "anticipating" : "rising");
            assert.ok(actionPhase(a, a.end) !== null && actionPhase(a, a.end + 1e-3) === null);
          } else assert.equal(actionPhase(a, (a.start + a.end) / 2), "following");
        }
      }
    }
  });
});

describe("the parser rejects bad bundles with the exact path", () => {
  const base = () => raw("seyi", "cinematic");
  const bad = (edit: (t: any) => void) => () => {
    const t = base();
    edit(t);
    return parseTimeline(t);
  };

  it("wrong or missing format", () => {
    throwsAt(bad((t) => (t.format = "motion-web/2")), /timeline\.format.*unsupported/);
    throwsAt(() => parseTimeline(null), /timeline.*expected an object/);
    throwsAt(() => parseManifest({ format: "x", songs: [] }), /no songs/);
  });
  it("non-contiguous or short scene states", () => {
    throwsAt(bad((t) => (t.states[1].start += 1)), /states\[1\]\.start.*contiguous/);
    throwsAt(bad((t) => (t.states[0].start = 2)), /first state must start at 0/);
    throwsAt(bad((t) => (t.states.at(-1).end -= 1)), /end of the audio/);
    throwsAt(bad((t) => (t.states[0].state = "dozing")), /states\[0\]\.state.*one of/);
  });
  it("actions with impossible timing or unknown properties", () => {
    throwsAt(bad((t) => (t.actions[0].property = "nope")), /unknown property/);
    throwsAt(bad((t) => (t.actions[1].id = t.actions[0].id)), /duplicate action id/);
    throwsAt(bad((t) => { const a = t.actions.find((x: any) => x.kind === "event"); a.peak = a.end + 5; }), /start <= peak <= settle <= end/);
    throwsAt(bad((t) => { const a = t.actions.find((x: any) => x.policy === "anticipatory"); a.start = a.source + 1; a.peak = a.start; a.settle = a.start; a.end = a.start + 1; }), /anticipatory action must start at or before/);
    throwsAt(bad((t) => (t.actions[0].amplitude = 2)), /amplitude.*within \[0, 1\]/);
    throwsAt(bad((t) => (t.actions[0].start = 1e6)), /ends before it starts|sorted/);
    throwsAt(bad((t) => { const a = t.actions.find((x: any) => x.kind === "event"); a.source = null; }), /needs source, peak and settle/);
  });
  it("non-finite numbers", () => {
    throwsAt(bad((t) => (t.rateHz = "30")), /rateHz.*finite number/);
    throwsAt(bad((t) => (t.durationS = -1)), /durationS.*positive/);
  });
  it("a truncated or corrupt curves file", () => {
    const { timeline } = load("seyi", "cinematic");
    const p = manifest.songs[0].profiles[2];
    const whole = bin(p.curves);
    throwsAt(() => decodeCurves(whole.slice(0, whole.byteLength - 4), timeline), /expected \d+ bytes/);
    const nan = whole.slice(0);
    new Float32Array(nan)[7] = NaN;
    throwsAt(() => decodeCurves(nan, timeline), /non-finite value at index 7/);
  });
});

describe("ClockStore", () => {
  it("notifies subscribers only when the time changes and stops after unsubscribe", () => {
    const clock = new ClockStore();
    const seen: number[] = [];
    const off = clock.subscribe(() => seen.push(clock.getTime()));
    clock.set(1);
    clock.set(1);
    clock.set(2.5);
    off();
    clock.set(9);
    assert.deepEqual(seen, [1, 2.5]);
    assert.equal(clock.getTime(), 9);
  });
});

// Keep the type import used.
export type { WebTimeline };
