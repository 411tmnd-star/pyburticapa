/**
 * The forecast: an offline overview of the whole file, computed once after decoding. It draws the
 * forecast strip and gives the barometric tendency (is a louder passage coming?). Pure, so it is tested
 * on synthetic signals in Node.
 */

export interface Forecast {
  rateHz: number;
  durationS: number;
  /** Each 0..1, normalised within this file. */
  level: Float32Array;
  low: Float32Array;
  high: Float32Array;
}

/** Files longer than this are not analysed (memory and time); playback still works. */
export const FORECAST_MAX_S = 20 * 60;

const LOW_HZ = 150;
const HIGH_HZ = 2000;
const MIN_SPAN_DB = 12;

/** Coefficient of a one-pole low-pass at `hz`. */
function onePole(hz: number, sampleRate: number): number {
  return 1 - Math.exp((-2 * Math.PI * hz) / sampleRate);
}

function percentile(values: Float32Array, p: number): number {
  const s = Float32Array.from(values).sort();
  return s[Math.min(s.length - 1, Math.max(0, Math.floor(p * (s.length - 1))))];
}

/** dB values to 0..1 between the file's 10th and 99th percentiles, with a minimum span. */
export function normalise(db: Float32Array): Float32Array {
  if (db.length === 0) return db;
  const hi = percentile(db, 0.99);
  const lo = Math.min(percentile(db, 0.1), hi - MIN_SPAN_DB);
  const out = new Float32Array(db.length);
  for (let i = 0; i < db.length; i++) out[i] = Math.max(0, Math.min(1, (db[i] - lo) / (hi - lo)));
  return out;
}

/**
 * `channels` are the decoded PCM channels (they are mixed to mono). The low band is a one-pole low-pass at
 * 150 Hz. The high band is the signal minus a one-pole low-pass at 2 kHz. Each band's RMS over windows of
 * 1/rateHz seconds is converted to dB and normalised within the file, so a quiet master still has a shape.
 */
export function computeForecast(channels: Float32Array[], sampleRate: number, rateHz = 10): Forecast {
  const n = channels[0]?.length ?? 0;
  const hop = Math.max(1, Math.round(sampleRate / rateHz));
  const frames = Math.max(1, Math.ceil(n / hop));
  const allDb = new Float32Array(frames);
  const lowDb = new Float32Array(frames);
  const highDb = new Float32Array(frames);
  const aLow = onePole(LOW_HZ, sampleRate);
  const aMid = onePole(HIGH_HZ, sampleRate);
  const nc = channels.length;
  let lp = 0;
  let lp2 = 0;
  for (let f = 0; f < frames; f++) {
    const from = f * hop;
    const to = Math.min(n, from + hop);
    let sa = 0;
    let sl = 0;
    let sh = 0;
    for (let i = from; i < to; i++) {
      let x = 0;
      for (let c = 0; c < nc; c++) x += channels[c][i];
      x /= nc;
      lp += aLow * (x - lp);
      lp2 += aMid * (x - lp2);
      const hp = x - lp2;
      sa += x * x;
      sl += lp * lp;
      sh += hp * hp;
    }
    const len = Math.max(1, to - from);
    allDb[f] = 10 * Math.log10(sa / len + 1e-12);
    lowDb[f] = 10 * Math.log10(sl / len + 1e-12);
    highDb[f] = 10 * Math.log10(sh / len + 1e-12);
  }
  return {
    rateHz: sampleRate / hop,
    durationS: n / sampleRate,
    level: normalise(allDb),
    low: normalise(lowDb),
    high: normalise(highDb),
  };
}

/**
 * A forecast from pre-computed analyser readings (dB per frame), for tracks that ship a features bundle and
 * so need no audio decode. Same normalisation as `computeForecast`, so the strip looks the same either way.
 */
export function forecastFromReadings(r: { allDb: Float32Array; lowDb: Float32Array; highDb: Float32Array }, rateHz: number): Forecast {
  const n = r.allDb.length;
  return { rateHz, durationS: n / rateHz, level: normalise(r.allDb), low: normalise(r.lowDb), high: normalise(r.highDb) };
}

function meanOver(a: Float32Array, rateHz: number, fromS: number, toS: number): number | null {
  const i0 = Math.max(0, Math.floor(fromS * rateHz));
  const i1 = Math.min(a.length, Math.ceil(toS * rateHz));
  if (i1 <= i0) return null;
  let s = 0;
  for (let i = i0; i < i1; i++) s += a[i];
  return s / (i1 - i0);
}

/**
 * Barometric tendency at time t, in -1..1: the mean level 1.5 to 5 s ahead minus the mean over the last 3 s.
 * Positive means a louder passage is approaching (the pressure is falling). 0 when there is nothing to compare.
 */
export function tendencyAt(fc: Forecast, t: number): number {
  const ahead = meanOver(fc.level, fc.rateHz, t + 1.5, t + 5);
  const behind = meanOver(fc.level, fc.rateHz, t - 3, t);
  if (ahead === null || behind === null) return 0;
  return Math.max(-1, Math.min(1, ahead - behind));
}
