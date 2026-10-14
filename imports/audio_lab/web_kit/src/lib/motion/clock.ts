/**
 * The playback clock, kept outside React state. The player writes the current time here every
 * animation frame; subscribers (a canvas, CSS variables, `useSyncExternalStore` selectors) read it.
 * Putting a 60 Hz value in React state would re-render the whole tree each frame; with a store,
 * only subscribers whose *selected* value changes re-render.
 */
export class ClockStore {
  private time = 0;
  private listeners = new Set<() => void>();

  getTime = (): number => this.time;

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  set(t: number): void {
    if (t === this.time) return;
    this.time = t;
    for (const l of this.listeners) l();
  }
}
