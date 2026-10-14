import { useState } from "react";
import { createRoot } from "react-dom/client";

import Instrument from "@/components/instrument/Instrument";
import Squall from "@/components/squall/Squall";
import type { SquallApi, SquallSnapshot } from "@/components/squall/SquallCanvas";
import { AudioPipeline } from "@/lib/pipeline";

// Preview harness only. It owns the pipeline so a browser script can read it, and exposes the simulation's
// snapshot. Query: ?view=squall|constellation|switch  ?source=demo|song:seyi|mic (clicks the matching button)
// window.__leaks wraps the browser APIs the visuals use, so cleanup can be checked after an unmount.
const w = window as unknown as Record<string, unknown>;

const leaks = { rafPending: 0, rafTotal: 0, listeners: {} as Record<string, number>, observers: 0, contexts: 0, contextsOpen: 0, tracksLive: 0, urlsLive: 0 };
w.__leaks = leaks;
{
  const raf = window.requestAnimationFrame.bind(window);
  const caf = window.cancelAnimationFrame.bind(window);
  const live = new Set<number>();
  window.requestAnimationFrame = (cb) => {
    leaks.rafTotal++;
    const id: number = raf((t) => {
      live.delete(id);
      leaks.rafPending = live.size;
      cb(t);
    });
    live.add(id);
    leaks.rafPending = live.size;
    return id;
  };
  window.cancelAnimationFrame = (id) => {
    live.delete(id);
    leaks.rafPending = live.size;
    caf(id);
  };

  // Listeners on window, document, media queries and audio elements: the targets that outlive a component.
  const reg = new Map<EventTarget, Map<string, Set<unknown>>>();
  const add = EventTarget.prototype.addEventListener;
  const rem = EventTarget.prototype.removeEventListener;
  const tracked = (t: EventTarget) => t === window || t === document || t instanceof MediaQueryList || t instanceof HTMLAudioElement;
  const name = (t: EventTarget) => (t === window ? "window" : t === document ? "document" : t instanceof MediaQueryList ? "mediaQuery" : "audio");
  w.__recount = () => {
    const out: Record<string, number> = {};
    for (const [t, m] of reg) {
      for (const [type, set] of m) if (set.size) out[`${name(t)}:${type}`] = (out[`${name(t)}:${type}`] ?? 0) + set.size;
    }
    leaks.listeners = out;
    return out;
  };
  EventTarget.prototype.addEventListener = function (this: EventTarget, type: string, fn: EventListenerOrEventListenerObject | null, o?: boolean | AddEventListenerOptions) {
    if (fn && tracked(this)) {
      let m = reg.get(this);
      if (!m) reg.set(this, (m = new Map()));
      let s = m.get(type);
      if (!s) m.set(type, (s = new Set()));
      s.add(fn);
    }
    return add.call(this, type, fn, o);
  } as typeof add;
  EventTarget.prototype.removeEventListener = function (this: EventTarget, type: string, fn: EventListenerOrEventListenerObject | null, o?: boolean | EventListenerOptions) {
    reg.get(this)?.get(type)?.delete(fn);
    return rem.call(this, type, fn, o);
  } as typeof rem;

  const RO = window.ResizeObserver;
  window.ResizeObserver = class extends RO {
    constructor(cb: ResizeObserverCallback) {
      super(cb);
      leaks.observers++;
    }
    disconnect() {
      leaks.observers--;
      super.disconnect();
    }
  };
  const AC = window.AudioContext;
  if (AC) {
    window.AudioContext = class extends AC {
      constructor(o?: AudioContextOptions) {
        super(o);
        leaks.contexts++;
        leaks.contextsOpen++;
      }
      close() {
        leaks.contextsOpen--;
        return super.close();
      }
    };
  }
  const create = URL.createObjectURL.bind(URL);
  const revoke = URL.revokeObjectURL.bind(URL);
  const urls = new Set<string>();
  URL.createObjectURL = (o) => {
    const u = create(o);
    urls.add(u);
    leaks.urlsLive = urls.size;
    return u;
  };
  URL.revokeObjectURL = (u) => {
    urls.delete(u);
    leaks.urlsLive = urls.size;
    revoke(u);
  };
  const gum = navigator.mediaDevices?.getUserMedia?.bind(navigator.mediaDevices);
  if (gum) {
    navigator.mediaDevices.getUserMedia = async (c) => {
      const s = await gum(c);
      s.getTracks().forEach((t) => {
        leaks.tracksLive++;
        const stop = t.stop.bind(t);
        let stopped = false;
        t.stop = () => {
          if (!stopped) leaks.tracksLive--;
          stopped = true;
          stop();
        };
      });
      return s;
    };
  }
}

const pipeline = new AudioPipeline();
w.__pipeline = pipeline;
w.__squallPipeline = pipeline;
const snapshot: { current: SquallSnapshot | null } = { current: null };
const api: { current: SquallApi | null } = { current: null };
w.__snapshot = snapshot;
w.__api = api;

// What the audio did and what the map did about it, once per delivered frame.
const diag = {
  series: [] as Array<Record<string, number | boolean | string>>,
  frames: 0,
  beats: 0,
  reset() {
    diag.series.length = 0;
    diag.frames = 0;
    diag.beats = 0;
  },
};
w.__diag = diag;
pipeline.onFrame((f) => {
  diag.frames++;
  if (f.beatDetected) diag.beats++;
  if (diag.series.length < 30000) {
    const s = snapshot.current;
    diag.series.push({
      t: performance.now(), time: f.time, bass: f.bass, mid: f.mid, high: f.high, rms: f.rmsEnergy, hit: f.bassHit, beat: f.beatDetected, scene: f.currentSceneState, playing: f.isPlaying,
      vortex: s?.weather.vortex ?? 0, inflow: s?.weather.inflow ?? 0, jet: s?.weather.jet ?? 0, rain: s?.weather.rain ?? 0, strikes: s?.strikesTotal ?? 0, rings: s?.ringsTotal ?? 0, force: s?.readout.force ?? 0,
    });
  }
});

const q = new URLSearchParams(location.search);

function Switch() {
  const [view, setView] = useState(q.get("start") ?? "squall");
  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div role="group" aria-label="Visual" className="mb-3 inline-flex rounded-full bg-white/5 p-1 text-sm text-slate-200 ring-1 ring-white/10">
        {["squall", "constellation"].map((v) => (
          <button key={v} type="button" data-view={v} aria-pressed={view === v} onClick={() => setView(v)} className="rounded-full px-3 py-1 aria-pressed:bg-white aria-pressed:text-slate-900">
            {v}
          </button>
        ))}
      </div>
      {view === "squall" ? <Squall pipeline={pipeline} snapshotRef={snapshot} apiRef={api} /> : <Instrument />}
    </div>
  );
}

const view = q.get("view") ?? "squall";
createRoot(document.getElementById("root")!).render(
  view === "switch" ? (
    <Switch />
  ) : view === "constellation" ? (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Instrument />
    </div>
  ) : (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <Squall pipeline={pipeline} snapshotRef={snapshot} apiRef={api} />
    </div>
  ),
);

const click = (sel: string, tries = 80) => {
  const el = document.querySelector<HTMLButtonElement>(sel);
  if (el && !el.disabled) return void el.click();
  if (tries > 0) setTimeout(() => click(sel, tries - 1), 50);
};
if (q.get("source")) setTimeout(() => click(`[data-source="${q.get("source")}"]`), 300);
