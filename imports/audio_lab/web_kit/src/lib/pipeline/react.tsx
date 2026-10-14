"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

import type { AudioFeatureFrame, SceneState } from "./contract";
import { AudioPipeline, type PipelineState } from "./pipeline";

/**
 * React bindings for the audio pipeline. The pipeline lives outside React: a consumer subscribes to frames
 * with a callback (no re-render per frame) and uses state hooks only for coarse changes.
 *
 *   useAudioFrame(cb)       call cb with every frame: draw to a canvas, write CSS variables, move meshes
 *   useAudioFeatures()      { current } always holding the latest frame, for reads inside your own loop
 *   usePipelineState()      re-renders on coarse change: source, playing, duration, scene, error
 *   useSceneState()         re-renders only when the scene state changes
 *   useAudioPipeline()      the controls: setSource, play, pause, toggle, seek, setSyncNudge
 */

const Ctx = createContext<AudioPipeline | null>(null);

export function AudioPipelineProvider({ children, pipeline }: { children: ReactNode; pipeline?: AudioPipeline }) {
  const [p] = useState(() => pipeline ?? new AudioPipeline());
  useEffect(() => {
    p.start();
    return () => {
      p.stop();
      p.setSource(null);
    };
  }, [p]);
  return <Ctx.Provider value={p}>{children}</Ctx.Provider>;
}

export function useAudioPipeline(): AudioPipeline {
  const p = useContext(Ctx);
  if (!p) throw new Error("useAudioPipeline must be used inside <AudioPipelineProvider>");
  return p;
}

/**
 * Run `callback` for every frame. The callback is read through a ref, so it always sees current props
 * without resubscribing; pass `deps` only for values that should re-run it once immediately (such as a
 * canvas size or a profile), which also paints the current frame while paused.
 */
export function useAudioFrame(callback: (frame: AudioFeatureFrame) => void, deps: readonly unknown[] = []): void {
  const p = useAudioPipeline();
  const latest = useRef(callback);
  latest.current = callback;
  useEffect(() => {
    latest.current(p.frame);
    return p.onFrame((f) => latest.current(f));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p, ...deps]);
}

/** A stable object whose `current` is always the latest frame. Reading it never causes a render. */
export function useAudioFeatures(): { readonly current: AudioFeatureFrame } {
  const p = useAudioPipeline();
  return useMemo(
    () => ({
      get current() {
        return p.frame;
      },
    }),
    [p],
  );
}

export function usePipelineState(): PipelineState {
  const p = useAudioPipeline();
  return useSyncExternalStore(p.subscribe, p.getState, p.getState);
}

/** Re-renders only when the scene state changes. */
export function useSceneState(): SceneState {
  const p = useAudioPipeline();
  return useSyncExternalStore(
    p.subscribe,
    () => p.getState().scene,
    () => p.getState().scene,
  );
}
