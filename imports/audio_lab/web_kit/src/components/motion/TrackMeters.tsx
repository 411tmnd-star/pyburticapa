"use client";

import { useMemo, useRef } from "react";

import { curveIndex, curveValueAt } from "@/lib/motion/scene";
import { useMotionFrame, useMotionPlayer } from "./MotionPlayerProvider";

/** Live value of every track property. Bars are updated imperatively each frame: no re-render. */
export function TrackMeters() {
  const { timeline, curves } = useMotionPlayer();
  const bars = useRef(new Map<string, HTMLDivElement>());

  const rows = useMemo(
    () =>
      timeline && curves
        ? timeline.tracks.map((tr) => ({
            track: tr.name,
            props: tr.properties.map((p) => ({ key: `${tr.name}.${p.name}`, name: p.name, max: p.max, combine: p.combine, index: curveIndex(curves, tr.name, p.name) })),
          }))
        : [],
    [timeline, curves],
  );

  useMotionFrame((t) => {
    if (!curves) return;
    for (const group of rows) {
      for (const p of group.props) {
        const el = bars.current.get(p.key);
        if (el) el.style.transform = `scaleX(${Math.min(curveValueAt(curves, p.index, t) / p.max, 1).toFixed(3)})`;
      }
    }
  }, [rows, curves]);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {rows.map((group) => (
        <section key={group.track} className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-300">{group.track.replace("_", " ")}</h3>
          <ul className="space-y-1.5">
            {group.props.map((p) => (
              <li key={p.key} className="text-xs text-slate-300">
                <div className="mb-0.5 flex justify-between">
                  <span>{p.name}</span>
                  <span className="text-slate-500">{p.combine}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    ref={(el) => {
                      if (el) bars.current.set(p.key, el);
                      else bars.current.delete(p.key);
                    }}
                    className="h-full origin-left rounded-full bg-emerald-300/90 will-change-transform"
                    style={{ transform: "scaleX(0)" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
