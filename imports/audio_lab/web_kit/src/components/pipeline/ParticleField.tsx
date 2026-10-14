"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/components/motion/MotionPlayerProvider";
import { hash01 } from "@/lib/instrument/constellation";
import { useAudioFrame } from "@/lib/pipeline/react";

const COUNT = 260;
const BURST = 28;

/**
 * A second, deliberately different consumer of the audio pipeline: a flat 2D particle field that streams
 * outward from the centre. Loudness sets the speed, a detected beat fires a burst, the mids set the hue,
 * the highs set the particle size, and the scene state sets how long the trails linger. It uses only the
 * contract: the pipeline did not change to support it.
 */
export default function ParticleField({ className = "" }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const reducedRef = useRef(reduced);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const lastMs = useRef(0);
  const field = useRef({
    angle: new Float32Array(COUNT),
    radius: new Float32Array(COUNT),
    speed: new Float32Array(COUNT),
    boost: new Float32Array(COUNT),
  });

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const f = field.current;
    for (let i = 0; i < COUNT; i++) {
      f.angle[i] = hash01(i, 3) * Math.PI * 2;
      f.radius[i] = hash01(i, 5) * 400;
      f.speed[i] = 0.5 + hash01(i, 7);
    }
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w: r.width, h: r.height };
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useAudioFrame((frame) => {
    const ctx = canvasRef.current?.getContext("2d");
    const { w, h } = sizeRef.current;
    if (!ctx || w === 0) return;
    const now = performance.now();
    const dt = lastMs.current ? Math.min(0.05, (now - lastMs.current) / 1000) : 1 / 60;
    lastMs.current = now;
    const calm = reducedRef.current ? 0.35 : 1;
    const f = field.current;
    const reach = Math.hypot(w, h) / 2;

    // Beat: fire a burst by respawning some particles at the centre with extra speed.
    if (frame.beatDetected && !reducedRef.current) {
      for (let k = 0; k < BURST; k++) {
        const i = Math.floor(hash01(k + Math.floor(frame.time * 10), 11) * COUNT);
        f.radius[i] = 0;
        f.boost[i] = 1.5 + frame.bassHit * 2;
      }
    }

    // Trails linger in an active scene and clear fast at rest.
    const fade = { rest: 0.35, build: 0.22, active: 0.14, settle: 0.22 }[frame.currentSceneState];
    ctx.fillStyle = `rgba(3,5,11,${fade})`;
    ctx.fillRect(0, 0, w, h);

    const hue = 190 + 130 * frame.mid;
    const drive = (30 + 380 * frame.rmsEnergy + 500 * frame.bassHit) * calm;
    const size = 1 + 2.6 * frame.high;
    ctx.fillStyle = `hsla(${hue},90%,${62 + 20 * frame.bassHit}%,0.9)`;
    ctx.beginPath();
    for (let i = 0; i < COUNT; i++) {
      f.boost[i] *= Math.exp(-dt * 2.5);
      f.radius[i] += drive * f.speed[i] * (1 + f.boost[i]) * dt;
      if (f.radius[i] > reach) {
        f.radius[i] = 0;
        f.angle[i] = hash01(i + Math.floor(frame.time * 3), 13) * Math.PI * 2;
      }
      const x = w / 2 + Math.cos(f.angle[i]) * f.radius[i];
      const y = h / 2 + Math.sin(f.angle[i]) * f.radius[i];
      const s = size * (0.5 + f.radius[i] / reach);
      ctx.moveTo(x + s, y);
      ctx.arc(x, y, s, 0, Math.PI * 2);
    }
    ctx.fill();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Audio-reactive particle field. Loudness sets the speed, beats fire bursts, mids set the colour."
      className={className}
    />
  );
}
