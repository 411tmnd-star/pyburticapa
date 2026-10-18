"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { usePrefersReducedMotion } from "@/components/motion/MotionPlayerProvider";
import type { AudioFeatureFrame } from "@/lib/pipeline/contract";
import { useAudioFrame } from "@/lib/pipeline/react";
import {
  addGust,
  createField,
  removeVortex,
  resizeField,
  seedVortex,
  stepField,
  vortexAt,
  type Field,
} from "@/lib/squall/field";
import { tendencyAt, type Forecast } from "@/lib/squall/forecast";
import { Particles, Rain, mulberry32 } from "@/lib/squall/particles";
import { Renderer, makeBolt, type Layer, type Overlay } from "@/lib/squall/render";
import {
  KickEdge,
  StrikeScheduler,
  beaufort,
  rainLabel,
  tendencyFromScene,
  tendencyLabel,
  toWeather,
  type LightningMode,
  type RainLabel,
  type Tendency,
  type WeatherParams,
} from "@/lib/squall/weather";

/**
 * Squall's map: a consumer of the audio pipeline. It reads AudioFeatureFrames and nothing else about the
 * audio, so it works with any source, and it can sit inside any page that has an <AudioPipelineProvider>.
 * All per-frame state lives in refs and typed arrays; React renders only for the fallback message.
 */

export type Detail = "light" | "normal" | "dense";
export const DETAIL_COUNT: Record<Detail, number> = { light: 1500, normal: 3500, dense: 6000 };

export interface SquallSettings {
  layer: Layer;
  isobars: boolean;
  lightning: LightningMode;
  detail: Detail;
}

export const DEFAULT_SETTINGS: SquallSettings = { layer: "wind", isobars: true, lightning: "on", detail: "normal" };

/** Coarse readings for a HUD. Delivered at most four times a second, and only when something changed. */
export interface SquallReadout {
  force: number;
  name: string;
  strikesPerMin: number;
  tendency: Tendency;
  rain: RainLabel;
  calm: boolean;
  storms: number;
  /** True once adaptive detail has reduced the particle count. */
  reducedDetail: boolean;
}

/** For tests and the preview harness: the simulation's numbers this frame. */
export interface SquallSnapshot {
  frames: number;
  weather: WeatherParams;
  tendency: number;
  readout: SquallReadout;
  particles: number;
  meanSpeed: number;
  rainDrops: number;
  strikesTotal: number;
  ringsTotal: number;
  storms: Array<{ id: number; x: number; y: number }>;
  gusts: number;
  frameMs: number;
}

/** Imperative controls, so storms can also be added and removed with buttons (keyboard and screen readers). */
export interface SquallApi {
  seedStorm(): boolean;
  removeStorm(): boolean;
}

const MAX_PARTICLES = DETAIL_COUNT.dense;
const EYE_HIT_PX = 22;
const DOUBLE_TAP_S = 0.32;
const DOUBLE_TAP_PX = 24;
/** Adaptive detail: if frames take longer than this on average for SLOW_FOR_S, drop a quarter of the particles. */
const SLOW_FRAME_S = 0.028;
const SLOW_FOR_S = 2.5;
const MIN_PARTICLES = 600;

type PointerMode = { kind: "none" } | { kind: "gust"; x: number; y: number; t: number } | { kind: "storm"; id: number; dx: number; dy: number };

interface Sim {
  field: Field;
  particles: Particles;
  rain: Rain;
  overlay: Overlay;
  strikes: StrikeScheduler;
  kick: KickEdge;
  rand: () => number;
  strikesTotal: number;
  ringsTotal: number;
  frames: number;
  scattered: boolean;
}

export default function SquallCanvas({
  settings = DEFAULT_SETTINGS,
  forecast = null,
  onReadout,
  apiRef,
  snapshotRef,
  className = "",
}: {
  settings?: SquallSettings;
  forecast?: Forecast | null;
  onReadout?: (r: SquallReadout) => void;
  apiRef?: { current: SquallApi | null };
  snapshotRef?: { current: SquallSnapshot | null };
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const [failure, setFailure] = useState<string | null>(null);

  // Props and preferences read by the frame callback, without resubscribing.
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const forecastRef = useRef(forecast);
  forecastRef.current = forecast;
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const onReadoutRef = useRef(onReadout);
  onReadoutRef.current = onReadout;

  const sim = useRef<Sim>({
    field: createField(1, 1),
    particles: new Particles(MAX_PARTICLES, 11),
    rain: new Rain(420, 5),
    overlay: { strikes: [], rings: [], flashT0: -Infinity },
    strikes: new StrikeScheduler(),
    kick: new KickEdge(),
    rand: mulberry32(23),
    strikesTotal: 0,
    ringsTotal: 0,
    frames: 0,
    scattered: false,
  });
  const pointer = useRef<PointerMode>({ kind: "none" });
  const hoverId = useRef<number | null>(null);
  const lastTap = useRef({ t: -Infinity, x: 0, y: 0 });
  const timing = useRef({ last: 0, lastSongT: 0, avg: 1 / 60, slowFor: 0, cap: MAX_PARTICLES, reducedDetail: false });
  const readout = useRef({ key: "", at: 0 });

  // The renderer and its size. A ResizeObserver also covers fullscreen and layout changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let renderer: Renderer;
    try {
      renderer = new Renderer(canvas);
    } catch (e) {
      setFailure(e instanceof Error ? e.message : "This browser cannot draw the map.");
      return;
    }
    rendererRef.current = renderer;
    const s = sim.current;
    const fit = () => {
      const r = canvas.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      renderer.resize(r.width, r.height, window.devicePixelRatio || 1);
      const m = renderer.scale;
      const W = r.width / m;
      const H = r.height / m;
      if (!s.scattered) {
        const base = createField(W, H);
        s.field.vortices = base.vortices;
        s.field.width = W;
        s.field.height = H;
        s.particles.scatter(W, H);
        s.scattered = true;
      } else {
        resizeField(s.field, W, H);
        s.particles.scatter(W, H);
      }
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    return () => {
      ro.disconnect();
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!apiRef) return;
    const field = sim.current.field;
    apiRef.current = {
      seedStorm: () => !!seedVortex(field, sim.current.rand() * field.width * 0.8 + field.width * 0.1, sim.current.rand() * field.height * 0.8 + field.height * 0.1, sim.current.rand),
      removeStorm: () => {
        const last = field.vortices[field.vortices.length - 1];
        return !!last && removeVortex(field, last.id);
      },
    };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef]);

  useAudioFrame((f: AudioFeatureFrame) => {
    const renderer = rendererRef.current;
    const s = sim.current;
    if (!renderer || !s.scattered) return;
    const now = performance.now() / 1000;
    const tm = timing.current;
    const dt = tm.last ? Math.min(0.05, Math.max(0.001, now - tm.last)) : 1 / 60;
    tm.last = now;
    const set = settingsRef.current;
    const reducedMotion = reducedRef.current;
    const field = s.field;

    // A seek or a new source is a different stretch of music: its lightning history no longer applies.
    if (f.time < tm.lastSongT - 0.05 || f.time > tm.lastSongT + 1.5) {
      s.strikes.reset();
      s.overlay.strikes.length = 0;
      s.overlay.rings.length = 0;
    }
    tm.lastSongT = f.time;

    // Barometer: the forecast looks ahead in the file; otherwise the scene state says whether a build is under way.
    const fc = forecastRef.current;
    const tendency = !f.isPlaying ? 0 : fc ? tendencyAt(fc, f.time) : tendencyFromScene(f.currentSceneState);
    const wp = toWeather(f, tendency, reducedMotion);

    field.params.jet = wp.jet;
    field.params.vortex = wp.vortex;
    field.params.inflow = wp.inflow;
    field.params.prevailing = wp.prevailing;
    const held = pointer.current.kind === "storm" ? pointer.current.id : null;
    stepField(field, dt * wp.speedScale, wp.jetRate, held);

    s.particles.setCount(Math.min(DETAIL_COUNT[set.detail], tm.cap));
    s.particles.step(field, dt, wp.speedScale);
    s.rain.step(field, dt, wp.rain, wp.speedScale);

    // Lightning on detected onsets, inside a storm cell (weighted by storm strength).
    const d = s.strikes.update(now, f, set.lightning, reducedMotion);
    if (d.strike && field.vortices.length) {
      const total = field.vortices.reduce((a, v) => a + v.weight, 0);
      let pick = s.rand() * total;
      const cell = field.vortices.find((v) => (pick -= v.weight) <= 0) ?? field.vortices[0];
      const a = s.rand() * Math.PI * 2;
      const r = Math.sqrt(s.rand()) * cell.r * 1.1;
      const x = cell.x + Math.cos(a) * r;
      const y = cell.y + Math.sin(a) * r;
      s.overlay.strikes.push({ x, y, t0: now, strength: d.strength, bolt: makeBolt(s.rand, d.strength) });
      s.overlay.rings.push({ x, y, t0: now, strength: 0.5 + 0.5 * d.strength });
      if (d.flash) s.overlay.flashT0 = now;
      s.strikesTotal++;
    }
    // Each bass hit: the storms breathe in, and a pressure ring leaves every eye.
    if (s.kick.update(f.bassHit) && !wp.calm) {
      for (const v of field.vortices) s.overlay.rings.push({ x: v.x, y: v.y, t0: now, strength: 0.35 + 0.5 * f.bassHit });
      s.ringsTotal++;
    }

    const activeId = held ?? hoverId.current;
    renderer.draw(field, s.particles, s.rain, s.overlay, wp, { layer: set.layer, isobars: set.isobars, reduced: reducedMotion, t: now, scroll: f.time * 0.015, activeId }, dt);
    s.frames++;

    // Adaptive detail, from the real frame interval (what the user sees), not just the drawing time.
    tm.avg += (dt - tm.avg) * 0.05;
    tm.slowFor = tm.avg > SLOW_FRAME_S ? tm.slowFor + dt : 0;
    if (tm.slowFor > SLOW_FOR_S && tm.cap > MIN_PARTICLES) {
      tm.cap = Math.max(MIN_PARTICLES, Math.round(Math.min(tm.cap, DETAIL_COUNT[set.detail]) * 0.75));
      tm.slowFor = 0;
      tm.reducedDetail = true;
    }

    const b = beaufort(wp.wind);
    const out: SquallReadout = {
      force: b.force,
      name: b.name,
      strikesPerMin: s.strikes.perMinute(now),
      tendency: wp.calm ? "steady" : tendencyLabel(tendency),
      rain: rainLabel(wp.rain),
      calm: wp.calm,
      storms: field.vortices.length,
      reducedDetail: tm.reducedDetail,
    };
    const rd = readout.current;
    if (now - rd.at > 0.25) {
      const key = `${out.force}|${out.strikesPerMin}|${out.tendency}|${out.rain}|${out.calm}|${out.storms}|${out.reducedDetail}`;
      if (key !== rd.key) {
        rd.key = key;
        rd.at = now;
        onReadoutRef.current?.(out);
      }
    }

    if (snapshotRef) {
      let sum = 0;
      let n = 0;
      for (let i = 0; i < s.particles.count; i++) {
        if (s.particles.speed[i] >= 0) {
          sum += s.particles.speed[i] * wp.speedScale;
          n++;
        }
      }
      snapshotRef.current = {
        frames: s.frames,
        weather: wp,
        tendency,
        readout: out,
        particles: s.particles.count,
        meanSpeed: n ? sum / n : 0,
        rainDrops: s.rain.count,
        strikesTotal: s.strikesTotal,
        ringsTotal: s.ringsTotal,
        storms: field.vortices.map((v) => ({ id: v.id, x: v.x, y: v.y })),
        gusts: field.gusts.length,
        frameMs: tm.avg * 1000,
      };
    }
  }, []);

  // ---- direct manipulation -------------------------------------------------------------------------

  const toUnits = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const m = rendererRef.current?.scale ?? 1;
    return { x: (e.clientX - r.left) / m, y: (e.clientY - r.top) / m, px: e.clientX - r.left, py: e.clientY - r.top, m };
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const p = toUnits(e);
    const field = sim.current.field;
    const hit = vortexAt(field, p.x, p.y, EYE_HIT_PX / p.m);
    const t = e.timeStamp / 1000;
    const lt = lastTap.current;
    if (t - lt.t < DOUBLE_TAP_S && Math.hypot(p.px - lt.x, p.py - lt.y) < DOUBLE_TAP_PX) {
      // Double tap: dissipate the storm under the pointer, or seed a new one here.
      if (hit) removeVortex(field, hit.id);
      else seedVortex(field, p.x, p.y, sim.current.rand);
      lastTap.current = { t: -Infinity, x: 0, y: 0 };
      pointer.current = { kind: "none" };
      return;
    }
    lastTap.current = { t, x: p.px, y: p.py };
    e.currentTarget.setPointerCapture(e.pointerId);
    pointer.current = hit ? { kind: "storm", id: hit.id, dx: hit.x - p.x, dy: hit.y - p.y } : { kind: "gust", x: p.x, y: p.y, t };
    e.currentTarget.style.cursor = hit ? "grabbing" : "crosshair";
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const p = toUnits(e);
    const field = sim.current.field;
    const mode = pointer.current;
    if (mode.kind === "storm") {
      const v = field.vortices.find((c) => c.id === mode.id);
      if (!v) return;
      v.x = Math.min(field.width, Math.max(0, p.x + mode.dx));
      v.y = Math.min(field.height, Math.max(0, p.y + mode.dy));
      return;
    }
    if (mode.kind === "gust") {
      const t = e.timeStamp / 1000;
      const dtp = t - mode.t;
      if (dtp < 0.012) return;
      addGust(field, p.x, p.y, (p.x - mode.x) / dtp, (p.y - mode.y) / dtp);
      pointer.current = { kind: "gust", x: p.x, y: p.y, t };
      return;
    }
    const hit = vortexAt(field, p.x, p.y, EYE_HIT_PX / p.m);
    hoverId.current = hit?.id ?? null;
    e.currentTarget.style.cursor = hit ? "grab" : "crosshair";
  };

  const onPointerEnd = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    pointer.current = { kind: "none" };
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    e.currentTarget.style.cursor = hoverId.current !== null ? "grab" : "crosshair";
  };

  if (failure) {
    return (
      <div className={`${className} grid place-items-center bg-[#050912] p-6 text-center text-sm text-slate-300`} role="alert">
        {failure}
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Weather map driven by the audio. Bass deepens the storms, bass hits pull air into their eyes, mids bend the jet stream, highs bring rain and detected onsets strike lightning. Drag to blow wind, drag an L to move a storm, double-click to seed or clear a storm."
      className={`${className} touch-none`}
      style={{ cursor: "crosshair" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onPointerLeave={() => {
        if (pointer.current.kind === "none") hoverId.current = null;
      }}
    />
  );
}
