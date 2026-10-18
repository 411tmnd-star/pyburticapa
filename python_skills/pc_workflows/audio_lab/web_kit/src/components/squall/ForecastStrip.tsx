"use client";

import { useEffect, useRef } from "react";

import type { Forecast } from "@/lib/squall/forecast";
import { rampCss } from "@/lib/squall/render";
import { useAudioFrame, useAudioPipeline } from "@/lib/pipeline/react";

export type ForecastStatus = "none" | "loading" | "ready" | "unavailable" | "live";

const MESSAGE: Record<Exclude<ForecastStatus, "ready">, string> = {
  none: "Choose a source to see its forecast",
  loading: "Reading the forecast…",
  unavailable: "Forecast unavailable",
  live: "A live signal has no forecast: the weather is now",
};

const fmt = (t: number) => `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, "0")}`;

/**
 * The song's whole weather at a glance: a silhouette of its overall level in the wind palette, with a dot
 * wherever the highs promise rain, and a playhead. It is also the seek control: a native range input sits on
 * top, so the mouse, touch, keyboard and screen readers all work. It reads the playhead from the pipeline's
 * frames and writes it straight to the DOM, so it never re-renders per frame.
 */
export default function ForecastStrip({
  forecast,
  status,
  duration,
  canSeek,
  className = "",
}: {
  forecast: Forecast | null;
  status: ForecastStatus;
  duration: number | null;
  canSeek: boolean;
  className?: string;
}) {
  const pipeline = useAudioPipeline();
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const dragging = useRef(false);
  const total = duration ?? forecast?.durationS ?? 0;

  // Paint the silhouette whenever the forecast or the size changes.
  useEffect(() => {
    const el = canvas.current;
    const box = wrap.current;
    if (!el || !box) return;
    const paint = () => {
      const r = box.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      el.width = Math.max(1, Math.round(r.width * dpr));
      el.height = Math.max(1, Math.round(r.height * dpr));
      const ctx = el.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, r.width, r.height);
      if (!forecast || forecast.level.length === 0) return;
      const at = (a: Float32Array, x: number) => a[Math.min(a.length - 1, Math.floor((x / r.width) * a.length))] ?? 0;
      for (let x = 0; x < r.width; x += 2) {
        const v = at(forecast.level, x);
        const h = 3 + v * (r.height - 8);
        ctx.fillStyle = rampCss(0.12 + 0.88 * v);
        ctx.fillRect(x, r.height - h, 1.4, h);
        if (at(forecast.high, x) > 0.72) {
          ctx.fillStyle = "rgba(160,225,255,0.85)";
          ctx.fillRect(x, 2, 1.4, 2);
        }
      }
    };
    paint();
    const ro = new ResizeObserver(paint);
    ro.observe(box);
    return () => ro.disconnect();
  }, [forecast]);

  useAudioFrame(
    (f) => {
      const p = total > 0 ? Math.min(1, f.time / total) : 0;
      if (head.current) head.current.style.left = `${p * 100}%`;
      if (veil.current) veil.current.style.left = `${p * 100}%`;
      if (range.current && !dragging.current) {
        range.current.value = String(f.time);
        range.current.setAttribute("aria-valuetext", `${fmt(f.time)} of ${fmt(total)}`);
      }
    },
    [total],
  );

  const ready = status === "ready" && forecast;
  return (
    <div ref={wrap} data-forecast={status} className={`relative h-12 overflow-hidden rounded-lg bg-white/[0.04] ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-cyan-300 ${className}`}>
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />
      {ready && <div ref={veil} className="pointer-events-none absolute inset-y-0 right-0 bg-[#050912]/55" style={{ left: "0%" }} aria-hidden />}
      {total > 0 && canSeek && <div ref={head} className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" style={{ left: "0%" }} aria-hidden />}
      {!ready && (
        <p className="absolute inset-0 grid place-items-center px-3 text-center text-[11px] uppercase tracking-[0.14em] text-slate-400" role={status === "unavailable" ? "status" : undefined}>
          {MESSAGE[status as keyof typeof MESSAGE]}
        </p>
      )}
      <input
        ref={range}
        type="range"
        aria-label="Seek through the forecast"
        min={0}
        max={total || 1}
        step={0.01}
        defaultValue={0}
        disabled={!canSeek || total <= 0}
        onPointerDown={() => (dragging.current = true)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        onBlur={() => (dragging.current = false)}
        onChange={(e) => pipeline.seek(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-default"
      />
    </div>
  );
}
