import json
from pathlib import Path

import numpy as np
import pytest
import soundfile as sf
from pydantic import ValidationError

from audiolab import cli, io
from audiolab.config import load_config
from audiolab.pipeline import analyze_song, render_bars
from audiolab.schema import SCHEMA_VERSION, SongAnalysis, json_schema
from audiolab.songs import SongSettings

ROOT = Path(__file__).resolve().parents[1]


def _click_song(path, bpm=120.0, seconds=12.0, sr=22050):
    y = np.zeros(int(seconds * sr), dtype=np.float32)
    n = int(0.03 * sr)
    t = np.arange(n) / sr
    burst = (np.sin(2 * np.pi * 1000 * t) * np.exp(-t * 150)).astype(np.float32)
    for start in range(0, len(y) - n, int(round(60.0 / bpm * sr))):
        y[start : start + n] += burst
    sf.write(path, y, sr)
    return path


@pytest.fixture(scope="module")
def exported(tmp_path_factory):
    tmp = tmp_path_factory.mktemp("export")
    song = _click_song(tmp / "clicks.wav")
    cfg = load_config(None)
    out_dir = analyze_song(song, cfg, tmp / "outputs", SongSettings(), settings_origin="default")
    return song, cfg, tmp / "outputs", out_dir


def _load(out_dir) -> dict:
    return json.loads((out_dir / "song_analysis.json").read_text(encoding="utf-8"))


def test_export_validates_and_matches_analysis(exported):
    song, cfg, _, out_dir = exported
    model = SongAnalysis.model_validate_json((out_dir / "song_analysis.json").read_text("utf-8"))
    analysis = io.load_analysis(out_dir / "analysis.npz")

    assert model.schema_version == SCHEMA_VERSION
    beats = [e for e in model.events if e.type == "beat"]
    assert [b.time_s for b in beats] == pytest.approx(list(analysis["beat_times"]))
    assert model.source.file == "clicks.wav" and len(model.source.sha256) == 64
    assert model.time_base.n_frames == len(analysis["onset_env"])
    assert model.provenance.config["beats"]["start_bpm"] == cfg.beats.start_bpm
    assert "librosa" in model.provenance.libraries
    assert model.tempo.bpm == pytest.approx(float(analysis["tempo"]))


def test_every_event_cites_a_known_analyzer_and_confidence_is_never_invented(exported):
    model = SongAnalysis.model_validate_json((exported[3] / "song_analysis.json").read_text("utf-8"))
    assert {e.source for e in model.events} <= set(model.provenance.analyzers)
    assert all(e.confidence is None for e in model.events) and model.tempo.confidence is None
    assert model.provenance.analyzers["bar_grid"].origin == "user_setting"
    assert model.provenance.analyzers["beat_tracker"].origin == "estimated"


def test_bars_agree_with_beats(exported):
    model = SongAnalysis.model_validate_json((exported[3] / "song_analysis.json").read_text("utf-8"))
    downbeats = [e.time_s for e in model.events if e.type == "beat" and e.is_downbeat]
    bars = [e for e in model.events if e.type == "bar"]
    assert [b.time_s for b in bars] == pytest.approx(downbeats)
    assert all(b.end_s > b.time_s for b in bars)


def test_rerun_is_identical_except_created_at(exported):
    song, cfg, root, out_dir = exported
    first = _load(out_dir)
    render_bars(song, cfg, root, SongSettings())
    second = _load(out_dir)
    first["provenance"].pop("created_at")
    second["provenance"].pop("created_at")
    assert first == second


def test_changing_offset_changes_bars_and_settings_only(exported):
    song, cfg, root, out_dir = exported
    base = _load(out_dir)
    render_bars(song, cfg, root, SongSettings(downbeat_offset=2), settings_origin="stored")
    changed = _load(out_dir)
    render_bars(song, cfg, root, SongSettings())  # restore for other tests

    assert changed["provenance"]["song_settings"] == {
        "beats_per_bar": 4, "downbeat_offset": 2, "origin": "stored",
    }
    strip = lambda d: [e for e in d["events"] if e["type"] in ("onset", "loud_segment", "novelty_peak")]
    assert strip(base) == strip(changed)
    assert [e["time_s"] for e in base["events"] if e["type"] == "beat"] == [
        e["time_s"] for e in changed["events"] if e["type"] == "beat"
    ]
    assert [e["beat_in_bar"] for e in base["events"] if e["type"] == "beat"] != [
        e["beat_in_bar"] for e in changed["events"] if e["type"] == "beat"
    ]


def test_sidecar_hash_matches_file(exported):
    import hashlib

    out_dir = exported[3]
    data = _load(out_dir)
    digest = hashlib.sha256((out_dir / data["curves"]["file"]).read_bytes()).hexdigest()
    assert digest == data["curves"]["sha256"]
    assert {c["key"] for c in data["curves"]["curves"]} >= {"rms_db", "band_bass_db", "mel_db", "novelty"}


# ---- the schema rejects bad files -------------------------------------------------------------


def _mutated(exported, fn):
    data = _load(exported[3])
    fn(data)
    return json.dumps(data)


def test_rejects_unsorted_events(exported):
    def swap(d):
        d["events"][0], d["events"][-1] = d["events"][-1], d["events"][0]

    with pytest.raises(ValidationError, match="sorted"):
        SongAnalysis.model_validate_json(_mutated(exported, swap))


def test_rejects_duplicate_ids(exported):
    def dup(d):
        d["events"][1]["id"] = d["events"][0]["id"]

    with pytest.raises(ValidationError, match="duplicate"):
        SongAnalysis.model_validate_json(_mutated(exported, dup))


def test_rejects_unknown_source(exported):
    def bad(d):
        d["events"][0]["source"] = "made_up"

    with pytest.raises(ValidationError, match="provenance.analyzers"):
        SongAnalysis.model_validate_json(_mutated(exported, bad))


def test_rejects_event_after_the_audio_ends(exported):
    def late(d):
        d["events"][-1]["time_s"] = d["source"]["duration_s"] + 10

    with pytest.raises(ValidationError):
        SongAnalysis.model_validate_json(_mutated(exported, late))


def test_rejects_unknown_fields_and_bad_confidence(exported):
    with pytest.raises(ValidationError):
        SongAnalysis.model_validate_json(_mutated(exported, lambda d: d.update(extra=1)))
    with pytest.raises(ValidationError):
        SongAnalysis.model_validate_json(
            _mutated(exported, lambda d: d["events"][0].update(confidence=1.5))
        )


def test_rejects_incompatible_major_version_but_accepts_newer_minor(exported):
    with pytest.raises(ValidationError, match="not compatible"):
        SongAnalysis.model_validate_json(_mutated(exported, lambda d: d.update(schema_version="2.0.0")))
    SongAnalysis.model_validate_json(_mutated(exported, lambda d: d.update(schema_version="1.7.0")))


def test_committed_json_schema_is_up_to_date():
    committed = json.loads((ROOT / "schemas" / "song_analysis.v1.json").read_text(encoding="utf-8"))
    assert committed == json_schema(), "run: python -m audiolab schema"


def test_validate_command_reports_ok_and_invalid(exported, tmp_path, capsys):
    good = exported[3] / "song_analysis.json"
    assert cli.main(["validate", str(good)]) == 0
    assert "OK" in capsys.readouterr().out

    bad = tmp_path / "bad.json"
    bad.write_text(json.dumps({"schema_version": "1.0.0"}), encoding="utf-8")
    assert cli.main(["validate", str(bad)]) == 1
    assert "INVALID" in capsys.readouterr().out
