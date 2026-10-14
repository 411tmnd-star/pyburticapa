"""Export AudioLab motion timelines as a small, browser-friendly bundle.

The full motion_timeline.<profile>.json is a provenance record (config, vocabulary, hashes...) of
300-600 KB and its curves live in a NumPy .npz that browsers cannot read. This script validates a
timeline with AudioLab's own checks (it refuses stale or invalid ones) and writes only what the UI
needs:

  <out>/manifest.json                      songs, profiles and file URLs
  <out>/<song>/<profile>.timeline.json     states, tracks and scheduled actions (format "motion-web/1")
  <out>/<song>/<profile>.curves.bin        every property curve, float32 little-endian, in
                                           tracks -> properties order, n_samples values each
  <out>/<song>/features.json + features.bin  raw analyser-style band readings and beat times (format
                                           "audio-features/1"), written when a song has a "source" audio file

Run it from the AudioLab project with its virtualenv:

  python scripts/export_web.py --spec web_songs.json --out ../353-curiosity/public/motion

web_songs.json:  [{"id": "seyi", "title": "...", "motionDir": "outputs/.../motion",
                   "source": "path/to/the/original/audio.mp3",      (optional: enables the features bundle)
                   "audio": "/motion/audio/seyi.m4a" or null, "rights": "who allows this audio here"}]

"source" is read only to compute the readings. It is never copied into the bundle; "audio" is what ships.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path

import numpy as np

from audiolab.motion.validate import load_arrays, load_timeline, validate_timeline

WEB_FORMAT = "motion-web/1"
FEATURES_FORMAT = "audio-features/1"
PROFILE_LABELS = {"balanced": "Balanced", "bass_pulse": "Bass pulse", "cinematic": "Cinematic"}


def r6(x):
    return None if x is None else round(float(x), 6)


def export_timeline(json_path: Path, out_dir: Path) -> dict:
    problems = validate_timeline(json_path)
    if problems:
        raise SystemExit(f"{json_path} is not valid or is stale; not exporting:\n  " + "\n  ".join(problems))
    model = load_timeline(json_path)
    arrays = load_arrays(model, json_path)
    profile = model.sources.profile_name
    n = model.timebase.n_samples

    curves, ordered = [], []
    for track in model.tracks:
        for prop in track.properties:
            x = np.asarray(arrays[prop.array_key], dtype="<f4")
            if x.shape != (n,):
                raise SystemExit(f"{prop.array_key} has shape {x.shape}, expected ({n},)")
            curves.append(x)
            ordered.append((track.name, prop.name))
    bin_path = out_dir / f"{profile}.curves.bin"
    bin_path.write_bytes(np.concatenate(curves).astype("<f4").tobytes())

    web = {
        "format": WEB_FORMAT,
        "profile": {"name": profile, "version": model.sources.profile_version},
        "durationS": r6(model.sources.duration_s),
        "rateHz": r6(model.timebase.rate_hz),
        "nSamples": n,
        "tracks": [
            {"name": t.name, "properties": [{"name": p.name, "combine": p.combine, "max": r6(p.amplitude_max)} for p in t.properties]}
            for t in model.tracks
        ],
        "states": [{"id": s.id, "state": s.state, "start": r6(s.start_s), "end": r6(s.end_s)} for s in model.states],
        "actions": [
            {
                "id": a.id, "rule": a.rule_id, "track": a.track, "property": a.property, "primitive": a.primitive,
                "kind": a.kind, "policy": a.policy, "source": r6(a.source_time_s), "start": r6(a.start_s), "peak": r6(a.peak_s),
                "settle": r6(a.settle_s), "end": r6(a.end_s), "amplitude": r6(a.amplitude), "lookahead": r6(a.lookahead_s),
            }
            for a in model.actions if a.status == "scheduled"
        ],
        "provenance": {
            "schemaVersion": model.schema_version,
            "timelineSha256": hashlib.sha256(json_path.read_bytes()).hexdigest(),
            "audioSha256": model.sources.audio_sha256,
            "suppressedActions": sum(1 for a in model.actions if a.status != "scheduled"),
        },
    }
    (out_dir / f"{profile}.timeline.json").write_text(json.dumps(web, separators=(",", ":")), encoding="utf-8")
    return {"profile": profile, "duration": model.sources.duration_s, "bytes": bin_path.stat().st_size, "props": len(ordered)}


def export_features(source: Path, analysis_npz: Path, expected_audio_sha: str | None, out_dir: Path) -> dict:
    """Raw analyser-style readings for the web feature pipeline (see audiolab.webfeatures)."""
    import librosa

    from audiolab import webfeatures as wf

    sha = hashlib.sha256(source.read_bytes()).hexdigest()
    if expected_audio_sha and sha != expected_audio_sha:
        raise SystemExit(f"{source} is not the audio this timeline was built from (sha256 differs); not exporting features")
    y, _ = librosa.load(str(source), sr=wf.SAMPLE_RATE, mono=True)
    readings = wf.analyser_readings(y)
    n = len(readings[wf.CHANNELS[0]])
    data = np.concatenate([np.asarray(readings[c], dtype="<f4") for c in wf.CHANNELS])
    (out_dir / "features.bin").write_bytes(data.tobytes())
    beats = [round(float(b), 4) for b in np.load(analysis_npz)["beat_times"]]
    meta = {
        "format": FEATURES_FORMAT,
        "rateHz": r6(wf.SAMPLE_RATE / wf.HOP),
        "nFrames": n,
        "durationS": r6(len(y) / wf.SAMPLE_RATE),
        "channels": list(wf.CHANNELS),
        "beats": beats,
        "extractor": {"sampleRate": wf.SAMPLE_RATE, "hop": wf.HOP, "fftMain": wf.MAIN_FFT, "fftLow": wf.LOW_FFT},
        "provenance": {"audioSha256": sha},
    }
    (out_dir / "features.json").write_text(json.dumps(meta, separators=(",", ":")), encoding="utf-8")
    return {"frames": n, "bytes": (out_dir / "features.bin").stat().st_size, "beats": len(beats)}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--spec", required=True, help="JSON list of songs to export")
    ap.add_argument("--out", required=True, help="public/motion directory")
    args = ap.parse_args()
    out = Path(args.out)
    spec = json.loads(Path(args.spec).read_text(encoding="utf-8-sig"))  # tolerate a Windows BOM

    songs = []
    for s in spec:
        song_dir = out / s["id"]
        song_dir.mkdir(parents=True, exist_ok=True)
        profiles, duration = [], None
        for path in sorted(Path(s["motionDir"]).glob("motion_timeline.*.json")):
            info = export_timeline(path, song_dir)
            duration = info["duration"]
            p = info["profile"]
            profiles.append({"id": p, "label": PROFILE_LABELS.get(p, p),
                             "timeline": f"/motion/{s['id']}/{p}.timeline.json", "curves": f"/motion/{s['id']}/{p}.curves.bin"})
            print(f"  {s['id']}/{p}: {info['props']} curves, {info['bytes'] / 1024:.0f} KB")
        if not profiles:
            raise SystemExit(f"no motion timelines found in {s['motionDir']}")
        audio = s.get("audio")
        entry = {"id": s["id"], "title": s["title"], "durationS": round(duration, 6),
                 "audio": {"src": audio, "rights": s.get("rights", "")} if audio else None, "profiles": profiles}
        if s.get("source"):
            first = sorted(Path(s["motionDir"]).glob("motion_timeline.*.json"))[0]
            expected = load_timeline(first).sources.audio_sha256
            info = export_features(Path(s["source"]), Path(s["motionDir"]).parent / "analysis.npz", expected, song_dir)
            entry["features"] = {"meta": f"/motion/{s['id']}/features.json", "bin": f"/motion/{s['id']}/features.bin"}
            print(f"  {s['id']}/features: {info['frames']} frames, {info['beats']} beats, {info['bytes'] / 1024:.0f} KB")
        songs.append(entry)
    (out / "manifest.json").write_text(json.dumps({"format": WEB_FORMAT, "songs": songs}, indent=2), encoding="utf-8")
    print(f"wrote {out / 'manifest.json'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
