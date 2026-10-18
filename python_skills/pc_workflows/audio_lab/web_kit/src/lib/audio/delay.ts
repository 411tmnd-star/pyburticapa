/**
 * A short history of timestamped values. Used to delay the visuals by the audio output latency, so a
 * kick is drawn when it is heard, not when it reaches the analyser.
 */
export class DelayLine<T> {
  private readonly maxS: number;
  private times: number[] = [];
  private values: T[] = [];

  constructor(maxS: number) {
    this.maxS = maxS;
  }

  push(t: number, v: T): void {
    this.times.push(t);
    this.values.push(v);
    while (this.times.length > 1 && t - this.times[0] > this.maxS) {
      this.times.shift();
      this.values.shift();
    }
  }

  /** The most recent value at or before time t. Before the first stored value, the first one. */
  at(t: number): T | undefined {
    const n = this.times.length;
    if (n === 0) return undefined;
    if (t <= this.times[0]) return this.values[0];
    let lo = 0;
    let hi = n - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (this.times[mid] <= t) lo = mid;
      else hi = mid - 1;
    }
    return this.values[lo];
  }
}
