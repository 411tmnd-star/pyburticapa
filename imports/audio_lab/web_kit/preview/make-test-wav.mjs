// Writes a deterministic 19 s mono WAV for browser checks:  node preview/make-test-wav.mjs out.wav
//   0-2 s silence | 2-8 s kicks at 120 BPM (55 Hz) | 8-13 s hi-hat noise bursts | 13-16 s mid tones | 16-19 s silence
import { writeFileSync } from "node:fs";

const sr = 44100;
const total = 19;
const n = sr * total;
const out = new Int16Array(n);
let seed = 7;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
let prev = 0;
for (let i = 0; i < n; i++) {
  const t = i / sr;
  let x = 0;
  if (t >= 2 && t < 8) {
    const ph = (t - 2) % 0.5;
    x += 0.8 * Math.sin(2 * Math.PI * 55 * ph) * Math.exp(-ph * 9) * Math.min(1, ph / 0.004);
  } else if (t >= 8 && t < 13) {
    const ph = (t - 8) % 0.25;
    const noise = rnd();
    const hp = noise - prev; // crude high-pass
    prev = noise;
    x += 0.5 * hp * Math.exp(-ph * 40);
  } else if (t >= 13 && t < 16) {
    const env = Math.min(1, (t - 13) / 0.1) * Math.min(1, (16 - t) / 0.1);
    x += 0.3 * env * (Math.sin(2 * Math.PI * 440 * t) + 0.5 * Math.sin(2 * Math.PI * 880 * t)) * (0.8 + 0.2 * Math.sin(2 * Math.PI * 2 * t));
  }
  out[i] = Math.max(-1, Math.min(1, x)) * 32767;
}
const buf = Buffer.alloc(44 + n * 2);
buf.write("RIFF", 0);
buf.writeUInt32LE(36 + n * 2, 4);
buf.write("WAVEfmt ", 8);
buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20);
buf.writeUInt16LE(1, 22);
buf.writeUInt32LE(sr, 24);
buf.writeUInt32LE(sr * 2, 28);
buf.writeUInt16LE(2, 32);
buf.writeUInt16LE(16, 34);
buf.write("data", 36);
buf.writeUInt32LE(n * 2, 40);
Buffer.from(out.buffer).copy(buf, 44);
writeFileSync(process.argv[2] ?? "squall-test.wav", buf);
console.log("wrote", process.argv[2] ?? "squall-test.wav");
