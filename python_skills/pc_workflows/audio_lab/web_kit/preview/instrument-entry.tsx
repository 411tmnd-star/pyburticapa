import { createRoot } from "react-dom/client";

import Instrument from "@/components/instrument/Instrument";
import type { AudioPipeline } from "@/lib/pipeline";

// Preview harness only. Mounts the page, and taps the pipeline's frame stream into window.__diag so a
// browser-automation script can read what the pipeline produced. Query: ?source=demo|song:seyi|mic ?visual=particles ?profile=pulse
createRoot(document.getElementById("root")!).render(
  <div className="mx-auto max-w-6xl px-4 py-8">
    <Instrument />
  </div>,
);

interface Sample {
  t: number;
  time: number;
  bass: number;
  mid: number;
  high: number;
  rms: number;
  hit: number;
  strength: number;
  beat: boolean;
  scene: string;
  playing: boolean;
}
const diag = { series: [] as Sample[], frames: 0, beats: 0, kind: "", reset() { diag.series.length = 0; diag.frames = 0; diag.beats = 0; } };
(window as unknown as { __diag: typeof diag }).__diag = diag;

const attach = () => {
  const p = (window as unknown as { __pipeline?: AudioPipeline }).__pipeline;
  if (!p) return void setTimeout(attach, 50);
  let last = 0;
  p.onFrame((f) => {
    diag.frames++;
    if (f.beatDetected) diag.beats++;
    diag.kind = p.getState().source?.kind ?? "";
    const now = performance.now();
    if (now - last < 50) return;
    last = now;
    if (diag.series.length < 20000) {
      diag.series.push({ t: now, time: f.time, bass: f.bass, mid: f.mid, high: f.high, rms: f.rmsEnergy, hit: f.bassHit, strength: f.onsetStrength, beat: f.beatDetected, scene: f.currentSceneState, playing: f.isPlaying });
    }
  });
};
attach();

const q = new URLSearchParams(location.search);
const click = (sel: string, tries = 80) => {
  const el = document.querySelector<HTMLButtonElement>(sel);
  if (el && !el.disabled) return void el.click();
  if (tries > 0) setTimeout(() => click(sel, tries - 1), 50);
};
setTimeout(() => {
  if (q.get("visual")) click(`[data-visual="${q.get("visual")}"]`);
  if (q.get("profile")) click(`[data-profile="${q.get("profile")}"]`);
  if (q.get("source")) click(`[data-source="${q.get("source")}"]`);
}, 300);
