import {
  POLICIES,
  SCENE_STATES,
  WEB_FORMAT,
  type Curves,
  type Manifest,
  type ManifestSong,
  type SceneSpan,
  type WebAction,
  type WebProperty,
  type WebTimeline,
  type WebTrack,
} from "./types";

/**
 * Runtime validation for the bundle. `fetch().json()` returns `any`; these functions turn untrusted
 * data into the typed model or throw a ParseError that says exactly which field is wrong.
 * Nothing is cast: every field is checked and copied.
 */

export class ParseError extends Error {
  path: string;
  constructor(path: string, message: string) {
    super(`${path}: ${message}`);
    this.name = "ParseError";
    this.path = path;
  }
}

type Rec = Record<string, unknown>;

const fail = (path: string, message: string): never => {
  throw new ParseError(path, message);
};
const rec = (v: unknown, path: string): Rec =>
  typeof v === "object" && v !== null && !Array.isArray(v) ? (v as Rec) : fail(path, "expected an object");
const arr = (v: unknown, path: string): unknown[] => (Array.isArray(v) ? v : fail(path, "expected an array"));
const str = (v: unknown, path: string): string =>
  typeof v === "string" && v.length > 0 ? v : fail(path, "expected a non-empty string");
const num = (v: unknown, path: string): number =>
  typeof v === "number" && Number.isFinite(v) ? v : fail(path, "expected a finite number");
const posNum = (v: unknown, path: string): number => {
  const n = num(v, path);
  return n > 0 ? n : fail(path, "expected a positive number");
};
const nonNegInt = (v: unknown, path: string): number => {
  const n = num(v, path);
  return Number.isInteger(n) && n >= 0 ? n : fail(path, "expected a non-negative integer");
};
const nullableNum = (v: unknown, path: string): number | null => (v === null ? null : num(v, path));
const oneOf = <T extends string>(v: unknown, allowed: readonly T[], path: string): T => {
  const s = str(v, path);
  return (allowed as readonly string[]).includes(s) ? (s as T) : fail(path, `expected one of ${allowed.join(", ")}`);
};
const format = (v: unknown, path: string): typeof WEB_FORMAT =>
  v === WEB_FORMAT ? WEB_FORMAT : fail(path, `unsupported format ${JSON.stringify(v)}; this UI reads ${WEB_FORMAT}`);

const TOL = 1e-6;

/** The field checks above, for other bundle parsers (such as the audio features bundle) that report errors the same way. */
export const check = { fail, rec, arr, str, num, posNum, nonNegInt, oneOf };

export function parseManifest(input: unknown): Manifest {
  const m = rec(input, "manifest");
  const songs = arr(m.songs, "manifest.songs").map((s, i): ManifestSong => {
    const p = `manifest.songs[${i}]`;
    const o = rec(s, p);
    const audio = o.audio === null ? null : rec(o.audio, `${p}.audio`);
    const feat = o.features === undefined || o.features === null ? null : rec(o.features, `${p}.features`);
    const profiles = arr(o.profiles, `${p}.profiles`).map((q, j) => {
      const pp = `${p}.profiles[${j}]`;
      const r = rec(q, pp);
      return { id: str(r.id, `${pp}.id`), label: str(r.label, `${pp}.label`), timeline: str(r.timeline, `${pp}.timeline`), curves: str(r.curves, `${pp}.curves`) };
    });
    if (profiles.length === 0) fail(`${p}.profiles`, "a song needs at least one profile");
    return {
      id: str(o.id, `${p}.id`),
      title: str(o.title, `${p}.title`),
      durationS: posNum(o.durationS, `${p}.durationS`),
      audio: audio && { src: str(audio.src, `${p}.audio.src`), rights: typeof audio.rights === "string" ? audio.rights : "" },
      features: feat && { meta: str(feat.meta, `${p}.features.meta`), bin: str(feat.bin, `${p}.features.bin`) },
      profiles,
    };
  });
  if (songs.length === 0) fail("manifest.songs", "no songs");
  const ids = songs.map((s) => s.id);
  if (new Set(ids).size !== ids.length) fail("manifest.songs", "song ids must be unique");
  return { format: format(m.format, "manifest.format"), songs };
}

export function parseTimeline(input: unknown): WebTimeline {
  const t = rec(input, "timeline");
  const durationS = posNum(t.durationS, "timeline.durationS");
  const rateHz = posNum(t.rateHz, "timeline.rateHz");
  const nSamples = nonNegInt(t.nSamples, "timeline.nSamples");
  if (nSamples < 2) fail("timeline.nSamples", "need at least 2 samples");

  const tracks = arr(t.tracks, "timeline.tracks").map((tr, i): WebTrack => {
    const p = `timeline.tracks[${i}]`;
    const o = rec(tr, p);
    const properties = arr(o.properties, `${p}.properties`).map((pr, j): WebProperty => {
      const pp = `${p}.properties[${j}]`;
      const q = rec(pr, pp);
      return {
        name: str(q.name, `${pp}.name`),
        combine: oneOf(q.combine, ["add", "max", "priority", "exclusive"] as const, `${pp}.combine`),
        max: posNum(q.max, `${pp}.max`),
      };
    });
    if (properties.length === 0) fail(`${p}.properties`, "a track needs at least one property");
    return { name: str(o.name, `${p}.name`), properties };
  });
  if (tracks.length === 0) fail("timeline.tracks", "no tracks");
  const known = new Set(tracks.flatMap((tr) => tr.properties.map((p) => `${tr.name}.${p.name}`)));
  if (known.size !== tracks.reduce((n, tr) => n + tr.properties.length, 0)) fail("timeline.tracks", "track.property names must be unique");

  const states = arr(t.states, "timeline.states").map((s, i): SceneSpan => {
    const p = `timeline.states[${i}]`;
    const o = rec(s, p);
    const span = { id: str(o.id, `${p}.id`), state: oneOf(o.state, SCENE_STATES, `${p}.state`), start: num(o.start, `${p}.start`), end: num(o.end, `${p}.end`) };
    if (span.end < span.start) fail(p, "ends before it starts");
    return span;
  });
  if (states.length === 0) fail("timeline.states", "no scene states");
  if (Math.abs(states[0].start) > TOL) fail("timeline.states[0].start", "the first state must start at 0");
  states.forEach((s, i) => {
    if (i > 0 && Math.abs(s.start - states[i - 1].end) > TOL) fail(`timeline.states[${i}].start`, "states must be contiguous");
  });
  if (Math.abs(states[states.length - 1].end - durationS) > 2 / rateHz) fail("timeline.states", "states must end at the end of the audio");

  const seen = new Set<string>();
  const actions = arr(t.actions, "timeline.actions").map((a, i): WebAction => {
    const p = `timeline.actions[${i}]`;
    const o = rec(a, p);
    const kind = oneOf(o.kind, ["event", "continuous"] as const, `${p}.kind`);
    const action: WebAction = {
      id: str(o.id, `${p}.id`),
      rule: str(o.rule, `${p}.rule`),
      track: str(o.track, `${p}.track`),
      property: str(o.property, `${p}.property`),
      primitive: str(o.primitive, `${p}.primitive`),
      kind,
      policy: oneOf(o.policy, POLICIES, `${p}.policy`),
      source: nullableNum(o.source, `${p}.source`),
      start: num(o.start, `${p}.start`),
      peak: nullableNum(o.peak, `${p}.peak`),
      settle: nullableNum(o.settle, `${p}.settle`),
      end: num(o.end, `${p}.end`),
      amplitude: num(o.amplitude, `${p}.amplitude`),
      lookahead: num(o.lookahead, `${p}.lookahead`),
    };
    if (seen.has(action.id)) fail(`${p}.id`, `duplicate action id ${action.id}`);
    seen.add(action.id);
    if (!known.has(`${action.track}.${action.property}`)) fail(p, `unknown property ${action.track}.${action.property}`);
    if (action.end < action.start - TOL) fail(p, "ends before it starts");
    if (action.amplitude < 0 || action.amplitude > 1 + TOL) fail(`${p}.amplitude`, "must be within [0, 1]");
    if (kind === "event") {
      const { source, peak, settle } = action;
      if (source === null || peak === null || settle === null) fail(p, "an event action needs source, peak and settle");
      else if (!(action.start - TOL <= peak && peak <= settle + TOL && settle <= action.end + TOL)) fail(p, "times must satisfy start <= peak <= settle <= end");
      else if (action.policy === "reactive" && action.start < source - TOL) fail(p, "a reactive action cannot start before its source");
      else if (action.policy === "anticipatory" && action.start > source + TOL) fail(p, "an anticipatory action must start at or before its source");
    } else if (action.policy !== "continuous") fail(`${p}.policy`, "a continuous action must use the continuous policy");
    return action;
  });
  for (let i = 1; i < actions.length; i++) {
    if (actions[i].start < actions[i - 1].start - TOL) fail(`timeline.actions[${i}]`, "actions must be sorted by start time");
  }

  const prov = rec(t.provenance, "timeline.provenance");
  return {
    format: format(t.format, "timeline.format"),
    profile: { name: str(rec(t.profile, "timeline.profile").name, "timeline.profile.name"), version: str(rec(t.profile, "timeline.profile").version, "timeline.profile.version") },
    durationS,
    rateHz,
    nSamples,
    tracks,
    states,
    actions,
    provenance: {
      schemaVersion: str(prov.schemaVersion, "timeline.provenance.schemaVersion"),
      timelineSha256: str(prov.timelineSha256, "timeline.provenance.timelineSha256"),
      audioSha256: str(prov.audioSha256, "timeline.provenance.audioSha256"),
      suppressedActions: nonNegInt(prov.suppressedActions, "timeline.provenance.suppressedActions"),
    },
  };
}

/**
 * Decode `<profile>.curves.bin`: float32 little-endian, one curve per track.property in the
 * timeline's tracks -> properties order. Every browser target is little-endian, so the buffer is
 * viewed directly; the byte length is checked so a mismatched file is rejected instead of misread.
 */
export function decodeCurves(buffer: ArrayBuffer, timeline: WebTimeline): Curves {
  const keys = timeline.tracks.flatMap((tr) => tr.properties.map((p) => `${tr.name}.${p.name}`));
  const expected = keys.length * timeline.nSamples * 4;
  if (buffer.byteLength !== expected) {
    throw new ParseError("curves", `expected ${expected} bytes (${keys.length} curves x ${timeline.nSamples} samples), got ${buffer.byteLength}`);
  }
  const data = new Float32Array(buffer);
  for (let i = 0; i < data.length; i++) {
    if (!Number.isFinite(data[i])) throw new ParseError("curves", `non-finite value at index ${i}`);
  }
  return { rateHz: timeline.rateHz, nSamples: timeline.nSamples, keys, data };
}
