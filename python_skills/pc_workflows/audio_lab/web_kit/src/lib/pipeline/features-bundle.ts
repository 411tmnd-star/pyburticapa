import { check } from "../motion/parse";

/**
 * The `audio-features/1` bundle written by AudioLab's scripts/export_web.py: raw analyser-style band
 * readings per frame, plus beat times. It is the offline counterpart of an AnalyserNode.
 */

export const FEATURES_FORMAT = "audio-features/1" as const;
export const FEATURE_CHANNELS = ["lowDb", "punchDb", "midDb", "highDb", "allDb", "flux"] as const;
export type FeatureChannel = (typeof FEATURE_CHANNELS)[number];

export interface FeaturesMeta {
  format: typeof FEATURES_FORMAT;
  rateHz: number;
  nFrames: number;
  durationS: number;
  channels: FeatureChannel[];
  /** Beat-grid times from the AudioLab analysis (seconds). Informational: the contract's beatDetected is onset-based. */
  beats: number[];
  provenance: { audioSha256: string };
}

export type Readings = Record<FeatureChannel, Float32Array>;

export function parseFeaturesMeta(input: unknown): FeaturesMeta {
  const { rec, arr, str, num, posNum, nonNegInt, fail, oneOf } = check;
  const m = rec(input, "features");
  if (m.format !== FEATURES_FORMAT) {
    fail("features.format", `unsupported format ${JSON.stringify(m.format)}; this UI reads ${FEATURES_FORMAT}`);
  }
  const channels = arr(m.channels, "features.channels").map((c, i) => oneOf(c, FEATURE_CHANNELS, `features.channels[${i}]`));
  if (channels.length !== FEATURE_CHANNELS.length || FEATURE_CHANNELS.some((c, i) => channels[i] !== c)) {
    fail("features.channels", `expected exactly ${FEATURE_CHANNELS.join(", ")} in that order`);
  }
  const nFrames = nonNegInt(m.nFrames, "features.nFrames");
  if (nFrames < 2) fail("features.nFrames", "need at least 2 frames");
  const beats = arr(m.beats, "features.beats").map((b, i) => num(b, `features.beats[${i}]`));
  for (let i = 1; i < beats.length; i++) {
    if (beats[i] < beats[i - 1]) fail(`features.beats[${i}]`, "beat times must be sorted");
  }
  const prov = rec(m.provenance, "features.provenance");
  return {
    format: FEATURES_FORMAT,
    rateHz: posNum(m.rateHz, "features.rateHz"),
    nFrames,
    durationS: posNum(m.durationS, "features.durationS"),
    channels,
    beats,
    provenance: { audioSha256: str(prov.audioSha256, "features.provenance.audioSha256") },
  };
}

/** Decode `features.bin`: float32 little-endian, channel-major (all frames of lowDb, then punchDb, and so on). */
export function decodeFeatureChannels(buffer: ArrayBuffer, meta: FeaturesMeta): Readings {
  const expected = meta.channels.length * meta.nFrames * 4;
  if (buffer.byteLength !== expected) {
    check.fail("features.bin", `expected ${expected} bytes (${meta.channels.length} channels x ${meta.nFrames} frames), got ${buffer.byteLength}`);
  }
  const view = new DataView(buffer);
  const out = {} as Readings;
  meta.channels.forEach((name, c) => {
    const a = new Float32Array(meta.nFrames);
    for (let i = 0; i < meta.nFrames; i++) {
      const v = view.getFloat32((c * meta.nFrames + i) * 4, true);
      if (!Number.isFinite(v)) check.fail(`features.bin.${name}[${i}]`, "not a finite number");
      a[i] = v;
    }
    out[name] = a;
  });
  return out;
}
