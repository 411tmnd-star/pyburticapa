"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

import { usePrefersReducedMotion } from "@/components/motion/MotionPlayerProvider";
import { createConstellation, createFrame, project, type Pointer } from "@/lib/instrument/constellation";
import { toVisualParams, type VisualProfile } from "@/lib/instrument/profiles";
import { drawFrame } from "@/lib/instrument/render";
import { useAudioFrame } from "@/lib/pipeline/react";

const NODES = 900;
const POINTER_RADIUS = 120;

/**
 * A visual consumer of the audio pipeline: a rotating constellation of nodes. It reads contract frames
 * through useAudioFrame and nothing else. It does not know whether the audio is live, pre-computed or a demo.
 */
export default function ConstellationCanvas({ profile, className = "" }: { profile: VisualProfile; className?: string }) {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const pointerRef = useRef<Pointer | null>(null);
  const profileRef = useRef(profile);
  const reducedRef = useRef(reduced);
  const sim = useRef({ cons: createConstellation(NODES), frame: createFrame(NODES), t0: 0 });

  useEffect(() => {
    profileRef.current = profile;
    reducedRef.current = reduced;
  }, [profile, reduced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    sim.current.t0 = performance.now();
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

  useAudioFrame((f) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const { w, h } = sizeRef.current;
    if (!ctx || w === 0) return;
    const t = (performance.now() - sim.current.t0) / 1000;
    const p = toVisualParams(f, profileRef.current, reducedRef.current);
    project(sim.current.cons, sim.current.frame, { t, params: p, width: w, height: h, pointer: pointerRef.current });
    drawFrame(ctx, sim.current.cons, sim.current.frame, p, w, h, reducedRef.current);
  }, []);

  const local = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Audio-reactive constellation. Bass pulls it inward, mids shift its colour, highs sparkle. Hover to push the nodes, drag to pull them in."
      className={`touch-none ${className}`}
      onPointerMove={(e) => {
        const { x, y } = local(e);
        pointerRef.current = { x, y, radius: POINTER_RADIUS, attract: e.buttons === 1 };
      }}
      onPointerDown={(e) => {
        const { x, y } = local(e);
        pointerRef.current = { x, y, radius: POINTER_RADIUS, attract: true };
      }}
      onPointerUp={(e) => {
        const { x, y } = local(e);
        pointerRef.current = { x, y, radius: POINTER_RADIUS, attract: false };
      }}
      onPointerLeave={() => (pointerRef.current = null)}
    />
  );
}
