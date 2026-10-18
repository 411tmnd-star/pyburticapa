"use client";

import { SCENE_STATES, type SceneState } from "@/lib/motion/types";
import { useSceneState } from "./MotionPlayerProvider";

/**
 * Full-bleed background that follows the scene state. Each state has its own gradient layer and the
 * layers cross-fade, so there is no class swapping and every Tailwind class is a static string.
 *
 * It is also the model for theming the rest of the page: put `data-scene` on a wrapper (see
 * MotionLab) and use `group-data-[scene=active]:...` variants anywhere inside it.
 *
 * Photosensitivity: the backdrop is driven only by slow properties (scale, density). The fast ones
 * (accent, shake, punch) never modulate full-screen brightness.
 */
const LAYER: Record<SceneState, string> = {
  rest: "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800",
  build: "bg-gradient-to-br from-slate-950 via-amber-950 to-orange-900",
  active: "bg-gradient-to-br from-slate-950 via-emerald-950 to-cyan-900",
  settle: "bg-gradient-to-br from-slate-950 via-violet-950 to-fuchsia-900",
};

export function SceneBackdrop() {
  const scene = useSceneState();
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {SCENE_STATES.map((s) => (
        <div
          key={s}
          data-on={scene === s}
          className={`absolute inset-0 opacity-0 transition-opacity duration-1000 motion-reduce:duration-0 data-[on=true]:opacity-100 ${LAYER[s]}`}
        />
      ))}
      {/* A soft glow whose size and strength follow the slow `scale` and `density` properties. */}
      <div
        className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl will-change-transform"
        style={{
          opacity: "calc(0.25 + var(--motion-particles-density, 0) * 0.5)",
          transform: "translate(-50%, -50%) scale(calc(0.6 + var(--motion-main_element-scale, 0) * 0.4))",
        }}
      />
    </div>
  );
}
