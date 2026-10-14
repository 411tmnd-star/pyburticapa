import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import { check } from "../src/lib/motion/parse";
import {
  AudioPipeline,
  IDLE_FRAME,
  OfflineSource,
  SCENE_STATES,
  createSyntheticSource,
  loadOfflineSource,
  makeFrame,
  type AudioFeatureFrame,
  type FeatureSource,
} from "../src/lib/pipeline";
import { FeatureComputer, type BandReading } from "../src/lib/pipeline/computer";
import { frameProblems } from "../src/lib/pipeline/contract";
import { decodeFeatureChannels, parseFeaturesMeta } from "../src/lib/pipeline/features-bundle";
import { SilentPlayhead } from "../src/lib/pipeline/playhead";
import { RealtimeSource, type ReadingBackend } from "../src/lib/pipeline/realtime";
import { SceneTracker } from "../src/lib/pipeline/scene-tracker";
import { syntheticReading } from "../src/lib/pipeline/synthetic";

const here = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(here, "..", "public");

/** Serve /motion/... from disk for loadOfflineSource, so the tests read the real exported bundle. */
function serveFromDisk() {
  const real = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request) => {
    const path = join(PUBLIC, String(url).replace(/^\//, ""));
    try {
      const buf = readFileSync(path);
      return new Response(buf, { status: 200 });
    } catch {
      return new Response("not found", { status: 404 });
    }
  }) as typeof fetch;
  return () => {
    globalThis.fetch = real;
  };
}

class Clock {
  ms = 0;
  now = () => this.ms;
}

class ScriptedBackend implements ReadingBackend {
  readonly playhead: SilentPlayhead;
  constructor(
    clock: Clock,
    private readonly fn: (t: number) => BandReading,
    readonly latencyS = 0,
  ) {
    this.playhead = new SilentPlayhead(null, clock.now);
  }
  read(): BandReading {
    return this.fn(this.playhead.time);
  }
  dispose(): void {
    this.playhead.dispose();
  }
}

const QUIET: BandReading = { lowDb: -90, punchDb: -90, midDb: -90, highDb: -90, allDb: -90, flux: 0 };

describe("the feature contract", () => {
  it("clamps, makes finite and freezes", () => {
    const f = makeFrame({ ...IDLE_FRAME, bass: 5, mid: -2, high: NaN, rmsEnergy: Infinity, time: -3, bassHit: 0.5 });
    assert.equal(f.bass, 1);
    assert.equal(f.mid, 0);
    assert.equal(f.high, 0);
    assert.equal(f.rmsEnergy, 1);
    assert.equal(f.time, 0);
    assert.ok(Object.isFrozen(f));
    assert.deepEqual(frameProblems(f), []);
  });

  it("the idle frame is valid, calm and at rest", () => {
    assert.deepEqual(frameProblems(IDLE_FRAME), []);
    assert.equal(IDLE_FRAME.currentSceneState, "rest");
    assert.equal(IDLE_FRAME.isPlaying, false);
  });

  it("reports problems in a hand-built frame", () => {
    const bad = { ...IDLE_FRAME, bass: 2 } as AudioFeatureFrame;
    const problems = frameProblems(bad);
    assert.ok(problems.some((p) => p.includes("not frozen")));
    assert.ok(problems.some((p) => p.includes("bass")));
  });
});

describe("FeatureComputer", () => {
  const run = (n: number) => {
    const c = new FeatureComputer();
    const out = [];
    for (let i = 0; i < n; i++) {
      const t = i / 60;
      out.push(c.push(syntheticReading(t, 120), t, 1 / 60));
    }
    return out;
  };

  it("is deterministic", () => {
    assert.deepEqual(run(300), run(300));
  });

  it("answers a kick with a bass hit and leaves silence at zero", () => {
    const hits = run(300).map((o) => o.bassHit);
    assert.ok(Math.max(...hits) > 0.8, "kicks produce a strong bass hit");
    const c = new FeatureComputer();
    let last = c.push(QUIET, 0, 1 / 60);
    for (let i = 1; i < 120; i++) last = c.push(QUIET, i / 60, 1 / 60);
    assert.ok(last.bass < 0.01 && last.rmsEnergy < 0.01 && last.bassHit === 0 && !last.beatDetected);
  });

  it("relaxes every value to rest when decayed", () => {
    const c = new FeatureComputer();
    for (let i = 0; i < 200; i++) c.push(syntheticReading(i / 60, 120), i / 60, 1 / 60);
    let o = c.decay(1 / 60);
    for (let i = 0; i < 180; i++) o = c.decay(1 / 60);
    assert.ok(o.bass < 0.01 && o.mid < 0.01 && o.bassHit < 0.01 && o.rmsEnergy < 0.01);
  });
});

describe("SceneTracker (live scene state)", () => {
  const drive = (levels: number[], dt = 0.05) => {
    const tr = new SceneTracker();
    const seen: string[] = [];
    for (const l of levels) {
      tr.push(l, dt);
      if (seen[seen.length - 1] !== tr.state) seen.push(tr.state);
    }
    return seen;
  };
  const hold = (v: number, s: number) => Array.from({ length: Math.round(s / 0.05) }, () => v);
  const ramp = (a: number, b: number, s: number) => {
    const n = Math.round(s / 0.05);
    return Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1));
  };

  it("stays at rest in silence", () => {
    assert.deepEqual(drive(hold(0, 20)), ["rest"]);
  });

  it("goes rest, build, active, settle, rest across a swell and fade", () => {
    const seen = drive([...hold(0, 3), ...ramp(0, 0.7, 6), ...hold(0.7, 8), ...ramp(0.7, 0, 8), ...hold(0, 8)]);
    assert.deepEqual(seen, ["rest", "build", "active", "settle", "rest"]);
  });

  it("does not flicker on a noisy plateau", () => {
    const noisy = hold(0.6, 30).map((v, i) => v + 0.12 * Math.sin(i * 1.3));
    const seen = drive([...hold(0, 3), ...ramp(0, 0.6, 5), ...noisy]);
    assert.ok(seen.length <= 4, `transitions: ${seen.join(" > ")}`);
  });

  it("only produces the four contract states", () => {
    const seen = drive([...ramp(0, 1, 5), ...ramp(1, 0, 5), ...ramp(0, 0.5, 5)]);
    for (const s of seen) assert.ok((SCENE_STATES as readonly string[]).includes(s));
  });
});

describe("playhead", () => {
  it("plays, pauses, seeks and stops at the end", async () => {
    const clock = new Clock();
    const h = new SilentPlayhead(10, clock.now);
    assert.equal(h.time, 0);
    await h.play();
    clock.ms = 2500;
    assert.equal(h.time, 2.5);
    h.pause();
    clock.ms = 9000;
    assert.equal(h.time, 2.5, "time holds while paused");
    h.seek(8);
    await h.play();
    clock.ms = 13000;
    assert.equal(h.time, 10);
    assert.equal(h.playing, false, "stops at the end");
    await h.play();
    assert.equal(h.time, 0, "playing again restarts from the beginning");
  });

  it("an unbounded playhead cannot seek", () => {
    const h = new SilentPlayhead(null, () => 0);
    assert.equal(h.canSeek, false);
    h.seek(5);
    assert.equal(h.time, 0);
  });
});

describe("RealtimeSource", () => {
  it("emits valid frames, silent when paused and calm at rest", async () => {
    const clock = new Clock();
    const src = new RealtimeSource({ id: "t", kind: "live", label: "t" }, new ScriptedBackend(clock, (t) => syntheticReading(t, 120)));
    const paused = src.sample(0);
    assert.deepEqual(frameProblems(paused), []);
    assert.equal(paused.isPlaying, false);
    await src.play();
    let sawHit = false;
    for (let i = 1; i <= 240; i++) {
      clock.ms = (i / 60) * 1000;
      const f = src.sample(i / 60);
      assert.deepEqual(frameProblems(f), [], `frame ${i}`);
      assert.equal(f.progress, 0, "an unbounded source has no progress");
      if (f.bassHit > 0.8) sawHit = true;
    }
    assert.ok(sawHit);
    src.pause();
    let f = src.sample(5);
    for (let i = 0; i < 120; i++) f = src.sample(5 + i / 60);
    assert.equal(f.isPlaying, false);
    assert.ok(f.bass < 0.01 && f.bassHit < 0.01);
  });

  it("delays what it shows by the device latency", async () => {
    const hitTime = (latencyS: number) => {
      const clock = new Clock();
      const src = new RealtimeSource({ id: "t", kind: "live", label: "t" }, new ScriptedBackend(clock, (t) => syntheticReading(t, 120), latencyS));
      void src.play();
      for (let i = 1; i <= 240; i++) {
        clock.ms = (i / 60) * 1000;
        const f = src.sample(i / 60);
        if (i / 60 > 1 && f.bassHit > 0.9) return i / 60;
      }
      return Infinity;
    };
    const base = hitTime(0);
    const late = hitTime(0.1);
    assert.ok(Math.abs(late - base - 0.1) < 0.04, `base ${base}, delayed ${late}`);
  });

  it("applies a sync nudge", async () => {
    const clock = new Clock();
    const src = new RealtimeSource({ id: "t", kind: "live", label: "t" }, new ScriptedBackend(clock, (t) => syntheticReading(t, 120)));
    src.setSyncNudge(1000); // clamped to the supported range
    void src.play();
    clock.ms = 100;
    assert.deepEqual(frameProblems(src.sample(0.1)), []);
  });
});

describe("synthetic source", () => {
  it("fires about two beats a second at 120 BPM and a bass hit on each", async () => {
    const clock = new Clock();
    const src = createSyntheticSource(clock.now, 120);
    await src.play();
    let beats = 0;
    for (let i = 1; i <= 60 * 10; i++) {
      clock.ms = (i / 60) * 1000;
      const f = src.sample(i / 60);
      assert.deepEqual(frameProblems(f), []);
      if (f.beatDetected) beats++;
    }
    assert.ok(beats >= 17 && beats <= 21, `beats in 10 s: ${beats}`);
  });

  it("reports itself honestly", () => {
    const src = createSyntheticSource(() => 0);
    assert.equal(src.kind, "synthetic");
    assert.match(src.label, /synthetic/i);
    assert.equal(src.canSeek, false);
  });
});

describe("offline source (the real exported bundle)", () => {
  const MANIFEST = "/motion/manifest.json";

  it("loads, validates and plays on a silent clock", async () => {
    const restore = serveFromDisk();
    try {
      const clock = new Clock();
      const src = await loadOfflineSource({ manifestUrl: MANIFEST, songId: "seyi", now: clock.now });
      assert.equal(src.kind, "offline");
      assert.ok(src.canSeek);
      assert.equal(src.status().duration && Math.round(src.status().duration!), 78);
      await src.play();
      let beats = 0;
      const scenes = new Set<string>();
      for (let t = 0.5; t < 60; t += 1 / 60) {
        clock.ms = t * 1000;
        const f = src.sample(t);
        assert.deepEqual(frameProblems(f), [], `at ${t.toFixed(2)} s`);
        assert.ok(Math.abs(f.progress - t / 78.019) < 1e-3);
        scenes.add(f.currentSceneState);
        if (f.beatDetected) beats++;
      }
      assert.ok(beats > 40, `beats detected in 60 s: ${beats}`);
      assert.ok(scenes.size >= 2, `scene states seen: ${[...scenes].join(", ")}`);
    } finally {
      restore();
    }
  });

  it("seeks exactly and does not fire a beat across the jump", async () => {
    const restore = serveFromDisk();
    try {
      const clock = new Clock();
      const src = await loadOfflineSource({ manifestUrl: MANIFEST, songId: "detty", now: clock.now });
      await src.play();
      clock.ms = 1000;
      src.sample(1);
      src.seek(60);
      clock.ms = 1010;
      const f = src.sample(1.01);
      assert.ok(Math.abs(f.time - 60.01) < 0.02, `time after seek ${f.time}`);
      assert.equal(f.beatDetected, false);
      src.seek(1e9);
      clock.ms = 1020;
      assert.ok(src.sample(1.02).time <= 113.46, "seeking past the end clamps");
    } finally {
      restore();
    }
  });

  it("exposes the motion timeline and curves for consumers that want them", async () => {
    const restore = serveFromDisk();
    try {
      const src = await loadOfflineSource({ manifestUrl: MANIFEST, songId: "seyi", profileId: "cinematic" });
      assert.equal(src.motion.timeline.profile.name, "cinematic");
      assert.ok(src.motion.curves.data.length > 0);
      assert.ok(src.beats.length > 100);
    } finally {
      restore();
    }
  });

  it("says what is wrong when a song, profile or bundle is missing", async () => {
    const restore = serveFromDisk();
    try {
      await assert.rejects(() => loadOfflineSource({ manifestUrl: MANIFEST, songId: "nope" }), /not in the manifest/);
      await assert.rejects(() => loadOfflineSource({ manifestUrl: MANIFEST, songId: "seyi", profileId: "nope" }), /no profile/);
    } finally {
      restore();
    }
  });

  it("rejects a truncated features file with the field named", () => {
    const meta = parseFeaturesMeta(JSON.parse(readFileSync(join(PUBLIC, "motion/seyi/features.json"), "utf8")));
    const bin = readFileSync(join(PUBLIC, "motion/seyi/features.bin"));
    const ab = bin.buffer.slice(bin.byteOffset, bin.byteOffset + bin.byteLength - 8);
    assert.throws(() => decodeFeatureChannels(ab, meta), /features\.bin/);
  });

  it("rejects a features file with the wrong format or channels", () => {
    const good = JSON.parse(readFileSync(join(PUBLIC, "motion/seyi/features.json"), "utf8"));
    assert.throws(() => parseFeaturesMeta({ ...good, format: "audio-features/9" }), /unsupported format/);
    assert.throws(() => parseFeaturesMeta({ ...good, channels: ["lowDb"] }), /features\.channels/);
    assert.throws(() => parseFeaturesMeta({ ...good, beats: [2, 1] }), /sorted/);
    assert.ok(check.rec);
  });
});

describe("one contract, two paths", () => {
  it("the live path and the offline path give the same frames from the same readings", async () => {
    const restore = serveFromDisk();
    try {
      const clock = new Clock();
      const off = await loadOfflineSource({ manifestUrl: MANIFEST_URL, songId: "seyi", now: clock.now });
      const meta = parseFeaturesMeta(JSON.parse(readFileSync(join(PUBLIC, "motion/seyi/features.json"), "utf8")));
      const bin = readFileSync(join(PUBLIC, "motion/seyi/features.bin"));
      const r = decodeFeatureChannels(bin.buffer.slice(bin.byteOffset, bin.byteOffset + bin.byteLength), meta);
      const rate = meta.rateHz;

      const liveClock = new Clock();
      const live = new RealtimeSource(
        { id: "replay", kind: "live", label: "replay" },
        new ScriptedBackend(liveClock, (t) => {
          const i = Math.round(t * rate);
          return { lowDb: r.lowDb[i], punchDb: r.punchDb[i], midDb: r.midDb[i], highDb: r.highDb[i], allDb: r.allDb[i], flux: r.flux[i] };
        }),
      );
      await off.play();
      await live.play();

      let worstLevels = 0;
      let worstHit = 0;
      const offBeats: number[] = [];
      const liveBeats: number[] = [];
      for (let i = 0; i < meta.nFrames - 1; i++) {
        const t = i / rate;
        clock.ms = t * 1000;
        liveClock.ms = t * 1000;
        const a = off.sample(t);
        const b = live.sample(t);
        if (i > 60) {
          for (const k of ["bass", "mid", "high", "rmsEnergy"] as const) worstLevels = Math.max(worstLevels, Math.abs(a[k] - b[k]));
          worstHit = Math.max(worstHit, Math.abs(a.bassHit - b.bassHit));
        }
        if (a.beatDetected) offBeats.push(i);
        if (b.beatDetected) liveBeats.push(i);
      }
      // The two paths run the same code on the same readings. Levels differ only by float32 storage; the bass hit
      // differs slightly because the live path's very first step uses a nominal 1/60 s instead of the frame period.
      assert.ok(worstLevels < 1e-4, `largest difference in a band level: ${worstLevels}`);
      assert.ok(worstHit < 0.02, `largest difference in the bass hit: ${worstHit}`);
      assert.ok(Math.abs(offBeats.length - liveBeats.length) <= 2, `beats offline ${offBeats.length}, live ${liveBeats.length}`);
      const matched = liveBeats.filter((b) => offBeats.some((o) => Math.abs(o - b) <= 1)).length;
      assert.ok(matched / liveBeats.length > 0.95, `matched beats ${matched}/${liveBeats.length}`);
    } finally {
      restore();
    }
  });
});

const MANIFEST_URL = "/motion/manifest.json";

describe("AudioPipeline", () => {
  /** A consumer that knows nothing about sources: it just records frames. */
  const consume = (p: AudioPipeline) => {
    const frames: AudioFeatureFrame[] = [];
    const off = p.onFrame((f) => frames.push(f));
    return { frames, off };
  };

  const drive = (p: AudioPipeline, clock: Clock, seconds: number, from = 0) => {
    for (let i = 1; i <= seconds * 60; i++) {
      clock.ms = (from + i / 60) * 1000;
      p.tick(clock.ms);
    }
  };

  it("is idle with no source", () => {
    const p = new AudioPipeline({ request: () => 0, cancel: () => {} });
    const { frames } = consume(p);
    p.tick(16);
    assert.equal(frames[0], IDLE_FRAME);
    assert.equal(p.getState().source, null);
  });

  it("a consumer works unchanged with live, synthetic and pre-computed sources", async () => {
    const restore = serveFromDisk();
    try {
      const clock = new Clock();
      const p = new AudioPipeline({ request: () => 0, cancel: () => {} });
      const { frames } = consume(p);
      const sources: Array<[string, () => Promise<FeatureSource>]> = [
        ["synthetic", async () => createSyntheticSource(clock.now)],
        ["live", async () => new RealtimeSource({ id: "live", kind: "live", label: "live" }, new ScriptedBackend(clock, (t) => syntheticReading(t, 100)))],
        ["offline", async () => loadOfflineSource({ manifestUrl: MANIFEST_URL, songId: "detty", now: clock.now })],
      ];
      let from = 0;
      for (const [kind, make] of sources) {
        frames.length = 0;
        p.setSource(await make());
        assert.equal(p.getState().source?.kind, kind);
        await p.play();
        drive(p, clock, 3, from);
        from += 3;
        assert.equal(frames.length, 180);
        for (const f of frames) assert.deepEqual(frameProblems(f), []);
        assert.ok(frames.some((f) => f.isPlaying), `${kind} plays`);
        assert.ok(frames.some((f) => f.bass > 0.05), `${kind} reaches the consumer with energy`);
        // Pause stops the clock for every kind of source.
        p.pause();
        const tPaused = frames[frames.length - 1].time;
        drive(p, clock, 1, from);
        from += 1;
        assert.equal(frames[frames.length - 1].isPlaying, false);
        assert.ok(Math.abs(frames[frames.length - 1].time - tPaused) < 0.05);
      }
    } finally {
      restore();
    }
  });

  it("disposes the previous source when the source changes", () => {
    let disposed = 0;
    const mk = (id: string): FeatureSource => ({
      id,
      kind: "live",
      label: id,
      canSeek: false,
      latencyMs: 0,
      sample: () => IDLE_FRAME,
      play: async () => {},
      pause: () => {},
      seek: () => {},
      status: () => ({ playing: false, duration: null, error: null }),
      onStatus: () => () => {},
      dispose: () => {
        disposed++;
      },
    });
    const p = new AudioPipeline({ request: () => 0, cancel: () => {} });
    p.setSource(mk("a"));
    p.setSource(mk("b"));
    assert.equal(disposed, 1);
    p.setSource(null);
    assert.equal(disposed, 2);
    assert.equal(p.getState().source, null);
  });

  it("publishes coarse state only when it changes, not once per frame", async () => {
    const clock = new Clock();
    const p = new AudioPipeline({ request: () => 0, cancel: () => {} });
    p.setSource(createSyntheticSource(clock.now));
    let notifications = 0;
    p.subscribe(() => notifications++);
    await p.play();
    const afterPlay = notifications;
    drive(p, clock, 10);
    // 600 frames; the scene tracker may change state a few times, but state must not follow the frame rate.
    assert.ok(notifications - afterPlay <= 8, `coarse notifications over 600 frames: ${notifications - afterPlay}`);
  });

  it("keeps the coarse state object stable between changes", async () => {
    const clock = new Clock();
    const p = new AudioPipeline({ request: () => 0, cancel: () => {} });
    p.setSource(createSyntheticSource(clock.now));
    await p.play();
    drive(p, clock, 2);
    const a = p.getState();
    drive(p, clock, 0.5, 2);
    const b = p.getState();
    if (a.scene === b.scene && a.isPlaying === b.isPlaying) assert.equal(a, b);
  });

  it("reports a failed play() as an error without throwing", async () => {
    const p = new AudioPipeline({ request: () => 0, cancel: () => {} });
    const src: FeatureSource = {
      id: "x",
      kind: "live",
      label: "x",
      canSeek: false,
      latencyMs: 0,
      sample: () => IDLE_FRAME,
      play: async () => {
        throw new Error("blocked");
      },
      pause: () => {},
      seek: () => {},
      status: () => ({ playing: false, duration: null, error: null }),
      onStatus: () => () => {},
      dispose: () => {},
    };
    p.setSource(src);
    await p.play();
    assert.match(p.getState().error ?? "", /could not start|Press play/i);
  });

  it("survives a source whose sample() throws", () => {
    const p = new AudioPipeline({ request: () => 0, cancel: () => {} });
    p.setSource({
      id: "bad",
      kind: "live",
      label: "bad",
      canSeek: false,
      latencyMs: 0,
      sample: () => {
        throw new Error("analyser failed");
      },
      play: async () => {},
      pause: () => {},
      seek: () => {},
      status: () => ({ playing: false, duration: null, error: null }),
      onStatus: () => () => {},
      dispose: () => {},
    });
    const { frames } = consume(p);
    p.tick(16);
    assert.equal(frames[0], IDLE_FRAME);
    assert.match(p.getState().error ?? "", /analyser failed/);
  });

  it("start and stop drive the loop through the scheduler", () => {
    const queue: Array<(ms: number) => void> = [];
    const p = new AudioPipeline({
      request: (cb) => queue.push(cb),
      cancel: () => {
        queue.length = 0;
      },
    });
    const { frames } = consume(p);
    p.start();
    p.start(); // idempotent
    assert.equal(queue.length, 1);
    queue.shift()!(16);
    queue.shift()!(32);
    assert.equal(frames.length, 2);
    p.stop();
    assert.equal(queue.length, 0);
  });

  it("instance type check: OfflineSource is a FeatureSource", () => {
    const f: (s: OfflineSource) => FeatureSource = (s) => s;
    assert.ok(f);
  });
});
