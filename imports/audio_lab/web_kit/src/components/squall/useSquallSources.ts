"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { ManifestSong } from "@/lib/motion/types";
import { createLiveFileSource, createMicSource, createSyntheticSource, fetchManifest, loadOfflineSource, pipelineSongs } from "@/lib/pipeline";
import type { FeatureSource } from "@/lib/pipeline";
import { useAudioPipeline } from "@/lib/pipeline/react";
import type { Forecast } from "@/lib/squall/forecast";
import { canDecodeAudio, forecastFromFile, forecastFromSong } from "@/lib/squall/forecast-decode";
import type { ForecastStatus } from "./ForecastStrip";

const MANIFEST_URL = "/motion/manifest.json";
const DEMO_BPM = 120;

export interface Capabilities {
  /** Web Audio is needed to analyse a file or the microphone. The demo and pre-computed tracks do not need it. */
  webAudio: boolean;
  microphone: boolean;
  fullscreen: boolean;
}

export function detectCapabilities(): Capabilities {
  const w = window as unknown as { AudioContext?: unknown; webkitAudioContext?: unknown };
  return {
    webAudio: typeof w.AudioContext !== "undefined" || typeof w.webkitAudioContext !== "undefined",
    microphone: !!navigator.mediaDevices?.getUserMedia,
    fullscreen: typeof document.documentElement.requestFullscreen === "function",
  };
}

export interface ForecastState {
  sourceId: string | null;
  status: ForecastStatus;
  forecast: Forecast | null;
}

/**
 * Builds sources with the pipeline's own factories and hands them to the one shared AudioPipeline. It also
 * starts the forecast for whatever it loaded. It owns the object URL of a chosen file and the in-flight
 * forecast request, and releases both when the source changes or the component unmounts.
 */
export function useSquallSources() {
  const pipeline = useAudioPipeline();
  const [songs, setSongs] = useState<ManifestSong[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [forecast, setForecast] = useState<ForecastState>({ sourceId: null, status: "none", forecast: null });
  const [caps, setCaps] = useState<Capabilities>({ webAudio: true, microphone: true, fullscreen: false });
  const revoke = useRef<(() => void) | null>(null);
  const abort = useRef<AbortController | null>(null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    setCaps(detectCapabilities());
    const ac = new AbortController();
    fetchManifest(MANIFEST_URL, ac.signal)
      .then((m) => setSongs(pipelineSongs(m)))
      .catch(() => setSongs([])); // no pre-computed tracks: the other sources still work
    return () => {
      alive.current = false;
      ac.abort();
      abort.current?.abort();
      revoke.current?.();
      revoke.current = null;
    };
  }, []);

  const adopt = useCallback(
    (source: FeatureSource, release: (() => void) | null, run: ((signal: AbortSignal) => Promise<Forecast>) | null, autoplay: boolean) => {
      abort.current?.abort();
      const previous = revoke.current;
      pipeline.setSource(source);
      previous?.();
      revoke.current = release;
      setProblem(null);
      if (autoplay) void pipeline.play();
      if (!run) {
        const noFuture = source.kind === "synthetic" || !source.canSeek;
        setForecast({ sourceId: source.id, status: noFuture ? "live" : "unavailable", forecast: null });
        return;
      }
      const ac = new AbortController();
      abort.current = ac;
      setForecast({ sourceId: source.id, status: "loading", forecast: null });
      run(ac.signal).then(
        (fc) => {
          if (alive.current && !ac.signal.aborted) setForecast({ sourceId: source.id, status: "ready", forecast: fc });
        },
        () => {
          if (alive.current && !ac.signal.aborted) setForecast({ sourceId: source.id, status: "unavailable", forecast: null });
        },
      );
    },
    [pipeline],
  );

  const demo = useCallback(() => adopt(createSyntheticSource(() => performance.now(), DEMO_BPM), null, null, true), [adopt]);

  const song = useCallback(
    async (s: ManifestSong) => {
      setBusy(s.id);
      setProblem(null);
      try {
        const src = await loadOfflineSource({ manifestUrl: MANIFEST_URL, songId: s.id });
        adopt(src, null, (signal) => forecastFromSong(MANIFEST_URL, s.id, signal), true);
      } catch (e) {
        setProblem(e instanceof Error ? e.message : "Could not load this track.");
      } finally {
        if (alive.current) setBusy(null);
      }
    },
    [adopt],
  );

  const mic = useCallback(() => adopt(createMicSource(), null, null, true), [adopt]);

  /** Returns false (and sets a message) when the file is not audio. */
  const file = useCallback(
    (f: File): boolean => {
      if (f.type && !f.type.startsWith("audio/")) {
        setProblem(`"${f.name}" is not an audio file.`);
        return false;
      }
      const { source, revoke: release } = createLiveFileSource(f);
      // Files are played and analysed live; the forecast is decoded separately, so playback never waits for it.
      adopt(source, release, canDecodeAudio() ? (signal) => forecastFromFile(f, signal) : null, false);
      return true;
    },
    [adopt],
  );

  return { songs, busy, problem, forecast, caps, demo, song, mic, file };
}
