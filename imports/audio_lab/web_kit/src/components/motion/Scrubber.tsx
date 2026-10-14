"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { activeActions, anticipationWindow, sceneAt } from "@/lib/motion/scene";
import type { Phase, SceneState, WebAction, WebTimeline } from "@/lib/motion/types";
import { useMotionFrame, useMotionPlayer } from "./MotionPlayerProvider";

const SCENE_H = 18;
const LANE_H = 46;
const LANE_GAP = 4;
const AXIS_H = 20;

interface Layout {
  width: number;
  height: number;
  x: (t: number) => number;
  /** Vertical band of every `track.property` row. */
  rows: Map<string, { y: number; h: number }>;
  lanes: Array<{ name: string; y: number }>;
}

function computeLayout(tl: WebTimeline, width: number): Layout {
  const rows = new Map<string, { y: number; h: number }>();
  const lanes: Layout["lanes"] = [];
  tl.tracks.forEach((tr, i) => {
    const top = SCENE_H + LANE_GAP + i * (LANE_H + LANE_GAP);
    lanes.push({ name: tr.name, y: top });
    const rowH = (LANE_H - 6) / tr.properties.length;
    tr.properties.forEach((p, j) => rows.set(`${tr.name}.${p.name}`, { y: top + 3 + j * rowH, h: rowH }));
  });
  return {
    width,
    height: SCENE_H + LANE_GAP + tl.tracks.length * (LANE_H + LANE_GAP) + AXIS_H,
    x: (t) => (Math.min(Math.max(t, 0), tl.durationS) / tl.durationS) * width,
    rows,
    lanes,
  };
}

// Static class strings, so Tailwind's compiler sees every one of them.
const SCENE_FILL: Record<SceneState, string> = {
  rest: "fill-slate-400/25",
  build: "fill-amber-400/35",
  active: "fill-emerald-400/35",
  settle: "fill-violet-400/35",
};
const PRIMITIVE_FILL: Record<string, string> = {
  burst: "fill-rose-400",
  transition_out: "fill-violet-400",
  transition_in: "fill-teal-400",
};
const PHASE_COLOR: Record<Phase, string> = {
  anticipating: "#fbbf24", // amber: the visual is preparing, the musical event has not happened yet
  rising: "#34d399",
  holding: "#34d399",
  releasing: "#94a3b8",
  following: "rgba(148,163,184,0.5)",
};

const rowOf = (layout: Layout, a: WebAction) => layout.rows.get(`${a.track}.${a.property}`);

/** Everything that does not change per frame: scene bands, lanes and every planned action. */
const StaticLayer = memo(function StaticLayer({ timeline, layout }: { timeline: WebTimeline; layout: Layout }) {
  const { x } = layout;
  const ticks = useMemo(() => {
    const step = timeline.durationS > 150 ? 30 : 10;
    return Array.from({ length: Math.floor(timeline.durationS / step) + 1 }, (_, i) => i * step);
  }, [timeline.durationS]);

  return (
    <svg width={layout.width} height={layout.height} className="absolute inset-0 text-slate-300" aria-hidden>
      <defs>
        <pattern id="anticipation-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="5" height="5" fill="rgba(251,191,36,0.15)" />
          <line x1="0" y1="0" x2="0" y2="5" stroke="rgba(251,191,36,0.9)" strokeWidth="2" />
        </pattern>
      </defs>
      {timeline.states.map((s) => (
        <rect key={s.id} x={x(s.start)} y={0} width={Math.max(x(s.end) - x(s.start), 0.5)} height={SCENE_H} className={SCENE_FILL[s.state]} />
      ))}
      {layout.lanes.map((lane) => (
        <g key={lane.name}>
          <rect x={0} y={lane.y} width={layout.width} height={LANE_H} className="fill-white/[0.04]" />
          <text x={6} y={lane.y + 11} className="fill-slate-300/80 text-[10px]">{lane.name}</text>
        </g>
      ))}
      {timeline.actions.map((a) => {
        const row = rowOf(layout, a);
        if (!row) return null;
        const mid = row.y + row.h / 2;
        if (a.kind === "continuous") {
          return <rect key={a.id} x={x(a.start)} y={row.y + row.h - 2} width={Math.max(x(a.end) - x(a.start), 1)} height={1.5} className="fill-slate-300/30" />;
        }
        const source = a.source ?? a.start;
        if (a.primitive === "pulse") {
          return <rect key={a.id} x={x(source) - 0.5} y={mid - 3} width={1} height={6} className="fill-slate-200/40" />;
        }
        const window = anticipationWindow(a);
        const fill = PRIMITIVE_FILL[a.primitive] ?? "fill-slate-300";
        return (
          <g key={a.id}>
            {window && <rect x={x(window[0])} y={mid - 4} width={Math.max(x(window[1]) - x(window[0]), 1)} height={8} fill="url(#anticipation-hatch)" />}
            <rect x={x(source)} y={mid - 4} width={Math.max(x(a.end) - x(source), 1)} height={8} rx={2} className={fill} />
            <rect x={x(source) - 1} y={mid - 8} width={2} height={16} className="fill-white" />
          </g>
        );
      })}
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={layout.height - AXIS_H} y2={layout.height - AXIS_H + 4} stroke="currentColor" strokeOpacity={0.5} />
          <text x={x(t) + 3} y={layout.height - 5} className="fill-slate-400 text-[10px]">{`${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`}</text>
        </g>
      ))}
    </svg>
  );
});

/**
 * Timeline scrubber. The planned actions are drawn once (SVG); the playhead and the highlights of
 * what is happening right now are drawn on a canvas every frame, so playback never re-renders React.
 * Hatched amber = visual preparation before the musical event; the white tick is the musical event.
 */
export function Scrubber() {
  const { timeline, seek, toggle, clock } = useMotionPlayer();
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(0);
  const dragging = useRef(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const layout = useMemo(() => (timeline && width > 0 ? computeLayout(timeline, width) : null), [timeline, width]);

  // Size the canvas for the device pixel ratio.
  useEffect(() => {
    const c = canvasRef.current;
    if (!c || !layout) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = layout.width * dpr;
    c.height = layout.height * dpr;
    c.style.width = `${layout.width}px`;
    c.style.height = `${layout.height}px`;
    c.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, [layout]);

  const lastAria = useRef(0);
  useMotionFrame((t) => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!ctx || !layout || !timeline) return;
    ctx.clearRect(0, 0, layout.width, layout.height);

    for (const { action, phase } of activeActions(timeline, t)) {
      const row = rowOf(layout, action);
      if (!row || phase === "following") continue;
      const mid = row.y + row.h / 2;
      ctx.strokeStyle = PHASE_COLOR[phase];
      ctx.fillStyle = PHASE_COLOR[phase];
      if (action.primitive === "pulse") {
        ctx.beginPath();
        ctx.arc(layout.x(action.source ?? action.start), mid, 3.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.lineWidth = 2;
        ctx.strokeRect(layout.x(action.start) - 1, mid - 6, Math.max(layout.x(action.end) - layout.x(action.start), 2) + 2, 12);
      }
    }
    const x = layout.x(t);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, layout.height - AXIS_H);
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(x - 5, 0);
    ctx.lineTo(x + 5, 0);
    ctx.lineTo(x, 7);
    ctx.fill();

    // Screen readers get a position update twice a second, not every frame.
    const box = boxRef.current;
    if (box && performance.now() - lastAria.current > 500) {
      lastAria.current = performance.now();
      box.setAttribute("aria-valuenow", t.toFixed(1));
      box.setAttribute("aria-valuetext", `${t.toFixed(1)} seconds, scene ${sceneAt(timeline, t).state}`);
    }
  }, [layout, timeline]);

  const seekFromPointer = useCallback(
    (e: React.PointerEvent) => {
      const box = boxRef.current;
      if (!box || !timeline) return;
      const r = box.getBoundingClientRect();
      seek(((e.clientX - r.left) / r.width) * timeline.durationS);
    },
    [seek, timeline],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!timeline) return;
    const step = e.shiftKey ? 5 : 1;
    const now = clock.getTime();
    const keys: Record<string, () => void> = {
      ArrowLeft: () => seek(now - step),
      ArrowRight: () => seek(now + step),
      Home: () => seek(0),
      End: () => seek(timeline.durationS),
      " ": toggle,
    };
    const handler = keys[e.key];
    if (handler) {
      e.preventDefault();
      handler();
    }
  };

  return (
    <div
      ref={boxRef}
      role="slider"
      tabIndex={0}
      aria-label="Timeline position"
      aria-valuemin={0}
      aria-valuemax={timeline?.durationS ?? 0}
      aria-valuenow={0}
      className="relative w-full cursor-pointer touch-none select-none rounded-xl outline-none ring-white/60 focus-visible:ring-2"
      style={{ height: layout?.height ?? 160 }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        seekFromPointer(e);
      }}
      onPointerMove={(e) => dragging.current && seekFromPointer(e)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      onKeyDown={onKeyDown}
    >
      {timeline && layout && <StaticLayer timeline={timeline} layout={layout} />}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" aria-hidden />
    </div>
  );
}
