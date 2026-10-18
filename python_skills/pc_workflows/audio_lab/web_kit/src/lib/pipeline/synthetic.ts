import type { BandReading } from "./computer";
import { SilentPlayhead } from "./playhead";
import { RealtimeSource, type ReadingBackend } from "./realtime";

/**
 * A deterministic stand-in for real audio: a kick on every beat, a slow mid swell and a hi-hat on the
 * off-beat, expressed as raw band readings so it passes through the same FeatureComputer as live audio.
 * Used for the demo and in tests. It is always labelled as synthetic.
 */
export function syntheticReading(t: number, bpm: number): BandReading {
  const beat = (t * bpm) / 60;
  const phase = beat - Math.floor(beat);
  const kick = Math.exp(-phase * 9);
  const hat = phase > 0.5 ? Math.exp(-(phase - 0.5) * 22) : 0;
  const punchDb = -75 + 40 * kick;
  const lowDb = -72 + 38 * kick;
  const midDb = -52 + 5 * Math.sin((2 * Math.PI * t) / 8);
  const highDb = -68 + 25 * hat;
  const power = (db: number) => 10 ** (db / 10);
  const allDb = 10 * Math.log10(power(lowDb) + power(midDb) + power(highDb));
  const flux = 0.002 + 0.05 * Math.exp(-phase * 30);
  return { lowDb, punchDb, midDb, highDb, allDb, flux };
}

class SyntheticBackend implements ReadingBackend {
  readonly latencyS = 0;
  constructor(
    readonly playhead: SilentPlayhead,
    private readonly bpm: number,
  ) {}
  read(): BandReading {
    return syntheticReading(this.playhead.time, this.bpm);
  }
  dispose(): void {
    this.playhead.dispose();
  }
}

/** `now` is a millisecond clock, performance.now in the browser. */
export function createSyntheticSource(now: () => number, bpm = 120): RealtimeSource {
  const backend = new SyntheticBackend(new SilentPlayhead(null, now), bpm);
  return new RealtimeSource({ id: "demo", kind: "synthetic", label: `Demo, ${bpm} BPM synthetic` }, backend);
}
