import { fetchManifest } from "../pipeline";
import { decodeFeatureChannels, parseFeaturesMeta } from "../pipeline/features-bundle";
import { FORECAST_MAX_S, computeForecast, forecastFromReadings, type Forecast } from "./forecast";

/**
 * Where a forecast comes from. Browser-only (decodeAudioData, fetch), so it is kept apart from forecast.ts.
 * A forecast is optional: if anything here fails, the caller shows "forecast unavailable" and playback is unaffected.
 */

export class ForecastError extends Error {}

export function canDecodeAudio(): boolean {
  return typeof OfflineAudioContext !== "undefined" || typeof (globalThis as { webkitOfflineAudioContext?: unknown }).webkitOfflineAudioContext !== "undefined";
}

/** Decode a whole audio file offline and summarise it. Does not make a sound and needs no user gesture. */
export async function forecastFromFile(file: Blob, signal?: AbortSignal): Promise<Forecast> {
  const Ctor: typeof OfflineAudioContext | undefined =
    typeof OfflineAudioContext !== "undefined" ? OfflineAudioContext : (globalThis as { webkitOfflineAudioContext?: typeof OfflineAudioContext }).webkitOfflineAudioContext;
  if (!Ctor) throw new ForecastError("This browser cannot decode audio offline.");
  const bytes = await file.arrayBuffer();
  if (signal?.aborted) throw new DOMException("aborted", "AbortError");
  let buffer: AudioBuffer;
  try {
    buffer = await new Ctor(1, 1, 44100).decodeAudioData(bytes);
  } catch {
    throw new ForecastError("This file could not be decoded.");
  }
  if (signal?.aborted) throw new DOMException("aborted", "AbortError");
  if (buffer.duration > FORECAST_MAX_S) throw new ForecastError("This file is too long to preview.");
  const channels: Float32Array[] = [];
  for (let c = 0; c < buffer.numberOfChannels; c++) channels.push(buffer.getChannelData(c));
  return computeForecast(channels, buffer.sampleRate);
}

/** A forecast for a pre-computed track, from its features bundle (no audio decode needed). */
export async function forecastFromSong(manifestUrl: string, songId: string, signal?: AbortSignal): Promise<Forecast> {
  const manifest = await fetchManifest(manifestUrl, signal);
  const song = manifest.songs.find((s) => s.id === songId);
  if (!song?.features) throw new ForecastError("This track has no features bundle.");
  const [metaRes, binRes] = await Promise.all([fetch(song.features.meta, { signal }), fetch(song.features.bin, { signal })]);
  if (!metaRes.ok || !binRes.ok) throw new ForecastError("The features bundle could not be loaded.");
  const meta = parseFeaturesMeta(await metaRes.json());
  const readings = decodeFeatureChannels(await binRes.arrayBuffer(), meta);
  return forecastFromReadings(readings, meta.rateHz);
}
