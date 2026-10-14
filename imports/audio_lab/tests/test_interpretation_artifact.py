"""The interpretation artifact: provenance, stable IDs, serialization, schema, integrity, the CLI,
and the two real songs."""

import hashlib
import json
from dataclasses import asdict
from pathlib import Path

import numpy as np
import pytest
from pydantic import ValidationError

from audiolab import cli
from audiolab.interpretation import (
    InterpretConfig,
    check_source,
    interpret,
    load_interpret_config,
    load_interpretation,
    write_interpretation,
)
from audiolab.interpretation.checks import bass_burst_alignment
from audiolab.interpretation.context import AnalysisContext, IntegrityError, analysis_content_sha256
from audiolab.interpretation.schema import SCHEMA_VERSION, SongInterpretation, json_schema
from synthetic import make_analysis, regular, step

ROOT = Path(__file__).resolve().parents[1]
STEPS = {
    "rms_db": step(30, -25, -5),
    "band_bass_db": step(30, -40, -5),
    "band_mid_db": step(30, -35, -10),
    "band_high_db": step(30, -45, -20),
}
ONSETS = regular([(0, 30, 1), (30, 60, 5)], 60)


@pytest.fixture
def song(tmp_path):
    return make_analysis(tmp_path, curves=STEPS, onsets=ONSETS, novelty_peaks=[30.0])


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def comparable(model):
    data = model.model_dump(mode="json")
    data["provenance"].pop("created_at")
    return data


# ---- provenance and reproducibility ------------------------------------------------------------


def test_source_hashes_and_config_are_recorded(song):
    cfg = InterpretConfig()
    cfg.common.window_beats = 6
    m = interpret(song, cfg)
    ctx = AnalysisContext(song)
    src = m.source_analysis
    assert src.file_sha256 == sha(song) and src.content_sha256 == analysis_content_sha256(ctx.analysis)
    assert src.audio_sha256 == ctx.analysis.source.sha256 and src.audio_file == "synthetic.wav"
    assert src.curves_sha256 == sha(song.parent / "analysis.npz") and src.curves_file == "analysis.npz"
    assert src.path == "song_analysis.json" and src.schema_version == ctx.analysis.schema_version
    assert m.provenance.config == asdict(cfg) and m.provenance.config["common"]["window_beats"] == 6
    assert m.provenance.window_s == pytest.approx(6 * 0.5)
    assert m.method.name == "audiolab.interpretation" and m.method.version


def test_vocabulary_carries_definitions_and_versions(song):
    m = interpret(song)
    assert {v.label for v in m.vocabulary} == {
        "bass_entry", "energy_build", "energy_drop", "high_energy_passage", "sparse_passage",
        "rhythmic_density_change", "transition_candidate",
    }
    assert all(v.definition and v.rule_version and v.kind in ("change", "passage") for v in m.vocabulary)


def test_same_inputs_give_identical_output_apart_from_created_at(song):
    assert comparable(interpret(song)) == comparable(interpret(song))


def test_reading_never_modifies_the_analysis_and_needs_no_audio(song, tmp_path):
    before = {p.name: sha(p) for p in song.parent.iterdir()}
    assert not (song.parent / "synthetic.wav").exists(), "the audio is not available, and not needed"
    model = interpret(song, output_path=song.parent / "song_interpretation.json")
    write_interpretation(model, song.parent / "song_interpretation.json")
    after = {p.name: sha(p) for p in song.parent.iterdir() if p.name != "song_interpretation.json"}
    assert before == after


# ---- stable IDs --------------------------------------------------------------------------------


def test_ids_are_unique_stable_and_follow_a_pattern(song):
    ids = [i.id for i in interpret(song).interpretations]
    assert ids and len(ids) == len(set(ids)) and ids == [i.id for i in interpret(song).interpretations]
    for i in interpret(song).interpretations:
        if i.kind == "change":
            assert i.id == f"{i.label}@{i.anchor_event_id}"
        else:
            assert i.id == f"{i.label}@{int(round(i.start_s * 1000))}ms"


def test_ids_survive_changes_that_do_not_move_the_interpretation(song):
    base = {i.id for i in interpret(song).interpretations if i.label == "bass_entry"}
    cfg = InterpretConfig()
    cfg.rhythmic_density_change.enabled = False  # unrelated rule
    cfg.bass_entry.min_rise_db = 8.0  # still met by the 35 dB step
    assert {i.id for i in interpret(song, cfg).interpretations if i.label == "bass_entry"} == base


def test_source_event_ids_are_preserved_verbatim(song):
    ctx = AnalysisContext(song)
    beat_ids = {b.id for b in ctx.beats}
    for i in interpret(song).interpretations:
        if i.kind == "change":
            assert i.anchor_event_id in beat_ids


# ---- schema ------------------------------------------------------------------------------------


def _dump(song):
    return json.loads(interpret(song).model_dump_json())


def test_roundtrip_through_json(song, tmp_path):
    model = interpret(song)
    path = tmp_path / "out.json"
    write_interpretation(model, path)
    assert load_interpretation(path) == model


def test_interpretations_are_sorted_and_nonempty(song):
    items = interpret(song).interpretations
    assert len(items) >= 3
    assert [(i.start_s, i.label) for i in items] == sorted((i.start_s, i.label) for i in items)


@pytest.mark.parametrize(
    "mutate, message",
    [
        (lambda d: d["interpretations"][1].update(id=d["interpretations"][0]["id"]), "duplicate"),
        (lambda d: d["interpretations"].reverse(), "sorted"),
        (lambda d: d["interpretations"][0].update(label="made_up"), "vocabulary"),
        (lambda d: next(i for i in d["interpretations"] if i["kind"] == "change").update(end_s=99.0), "start_s == end_s"),
        (lambda d: d["interpretations"][0].update(related_ids=["nope"]), "related id"),
        (lambda d: d.update(schema_version="2.0.0"), "not compatible"),
        (lambda d: d.update(surprise=1), "surprise"),
        (lambda d: d["interpretations"][0].update(confidence=1.5), "confidence"),
        (lambda d: d["interpretations"][0].update(end_s=-1), ""),
    ],
)
def test_schema_rejects_bad_files(song, mutate, message):
    data = _dump(song)
    mutate(data)
    with pytest.raises(ValidationError, match=message):
        SongInterpretation.model_validate(data)


def test_schema_accepts_a_newer_minor_version(song):
    data = _dump(song)
    data["schema_version"] = "1.4.0"
    SongInterpretation.model_validate(data)


def test_duplicate_measurement_names_are_rejected(song):
    data = _dump(song)
    ms = data["interpretations"][0]["evidence"]["measurements"]
    ms.append(dict(ms[0]))
    with pytest.raises(ValidationError, match="unique"):
        SongInterpretation.model_validate(data)


def test_committed_json_schema_is_up_to_date():
    committed = json.loads((ROOT / "schemas" / "song_interpretation.v1.json").read_text(encoding="utf-8"))
    assert committed == json_schema(), "run: python -m audiolab schema --kind interpretation"
    assert SCHEMA_VERSION.startswith("1.")


# ---- integrity ---------------------------------------------------------------------------------


def test_altered_curves_file_is_refused(song):
    npz = song.parent / "analysis.npz"
    data = dict(np.load(npz))
    data["rms_db"] = data["rms_db"] + 1.0
    np.savez(npz, **data)
    with pytest.raises(IntegrityError, match="hash"):
        interpret(song)


def test_curves_off_the_declared_frame_grid_are_refused(song):
    npz = song.parent / "analysis.npz"
    data = dict(np.load(npz))
    data["times"] = data["times"] + 0.01
    np.savez(npz, **data)
    doc = json.loads(song.read_text(encoding="utf-8"))
    doc["curves"]["sha256"] = sha(npz)
    song.write_text(json.dumps(doc), encoding="utf-8")
    with pytest.raises(IntegrityError, match="frame grid"):
        interpret(song)


def test_invalid_analysis_is_refused(song):
    doc = json.loads(song.read_text(encoding="utf-8"))
    doc["events"].reverse()
    song.write_text(json.dumps(doc), encoding="utf-8")
    with pytest.raises(ValidationError):
        interpret(song)


def test_stale_detection_ignores_created_at_but_catches_real_changes(song, tmp_path):
    out = song.parent / "song_interpretation.json"
    model = interpret(song, output_path=out)
    write_interpretation(model, out)
    assert check_source(model, out) is None

    doc = json.loads(song.read_text(encoding="utf-8"))
    doc["provenance"]["created_at"] = "2030-01-01T00:00:00+00:00"
    song.write_text(json.dumps(doc), encoding="utf-8")
    assert check_source(model, out) is None, "a re-export of identical results is not stale"

    doc["tempo"]["bpm"] = 99.0
    song.write_text(json.dumps(doc), encoding="utf-8")
    assert "stale" in check_source(model, out)


# ---- config ------------------------------------------------------------------------------------


def test_shipped_yaml_matches_the_defaults():
    assert load_interpret_config(ROOT / "configs" / "interpretation.yaml") == InterpretConfig()


def test_partial_yaml_overrides_only_given_keys(tmp_path):
    path = tmp_path / "c.yaml"
    path.write_text("bass_entry:\n  min_rise_db: 20\n", encoding="utf-8")
    cfg = load_interpret_config(path)
    assert cfg.bass_entry.min_rise_db == 20 and cfg.bass_entry.min_after_level_db == -30.0


@pytest.mark.parametrize("text", ["bass_entry:\n  nope: 1\n", "made_up_rule:\n  x: 1\n"])
def test_unknown_config_keys_raise(tmp_path, text):
    path = tmp_path / "c.yaml"
    path.write_text(text, encoding="utf-8")
    with pytest.raises(TypeError):
        load_interpret_config(path)


# ---- CLI ---------------------------------------------------------------------------------------


def test_cli_interpret_then_validate(song, capsys):
    assert cli.main(["interpret", str(song), "--config", str(ROOT / "configs" / "interpretation.yaml")]) == 0
    out = song.parent / "song_interpretation.json"
    assert out.exists() and "interpretations" in capsys.readouterr().out
    assert cli.main(["validate", str(out)]) == 0
    assert "OK" in capsys.readouterr().out


def test_cli_validate_flags_a_stale_interpretation(song, capsys):
    cli.main(["interpret", str(song)])
    doc = json.loads(song.read_text(encoding="utf-8"))
    doc["tempo"]["bpm"] = 99.0
    song.write_text(json.dumps(doc), encoding="utf-8")
    capsys.readouterr()
    assert cli.main(["validate", str(song.parent / "song_interpretation.json")]) == 1
    assert "STALE" in capsys.readouterr().out


def test_cli_interpret_reports_a_broken_analysis(song, capsys):
    (song.parent / "analysis.npz").write_bytes(b"not an npz")
    assert cli.main(["interpret", str(song)]) == 1
    assert "FAILED" in capsys.readouterr().out


def test_cli_still_validates_song_analysis_files(song, capsys):
    assert cli.main(["validate", str(song)]) == 0


def test_cli_schema_kind(tmp_path):
    out = tmp_path / "s.json"
    assert cli.main(["schema", "--kind", "interpretation", "--out", str(out)]) == 0
    assert json.loads(out.read_text(encoding="utf-8")) == json_schema()


# ---- the two real songs ------------------------------------------------------------------------

SEYI = ROOT / "outputs" / "Seyi-Vibez-SWAGUU-feat-Quavo" / "song_analysis.json"
DETTY = ROOT / "outputs" / "Detty - Party scatter demo" / "song_analysis.json"
needs_seyi = pytest.mark.skipif(not SEYI.exists(), reason="Seyi analysis not generated")
needs_detty = pytest.mark.skipif(not DETTY.exists(), reason="Detty analysis not generated")


@needs_seyi
def test_seyi_bass_entry_at_the_drop_and_its_link_to_novelty():
    model = interpret(SEYI)
    entry = next(i for i in model.interpretations if i.label == "bass_entry")
    assert entry.start_s == pytest.approx(16.6, abs=0.6)
    assert all(c.met for c in entry.evidence.criteria)
    assert entry.attributes["rise_db"] >= 15
    ctx = AnalysisContext(SEYI)
    peaks = [e for e in ctx.analysis.events if e.id in entry.evidence.supporting_event_ids and e.type == "novelty_peak"]
    assert peaks and abs(peaks[0].time_s - entry.start_s) <= 1.0, "the novelty curve peaks at the same moment"
    candidate = next(i for i in model.interpretations if i.label == "transition_candidate" and abs(i.start_s - 16.6) < 0.6)
    assert entry.id in candidate.related_ids and "novelty" in candidate.attributes["channels"]


@needs_seyi
@pytest.mark.parametrize("window_beats", [6, 8, 10])
@pytest.mark.parametrize("min_rise_db", [8.0, 12.0, 16.0])
def test_seyi_bass_entry_survives_configuration_changes(window_beats, min_rise_db):
    cfg = InterpretConfig()
    cfg.common.window_beats = window_beats
    cfg.bass_entry.min_rise_db = min_rise_db
    entries = [i for i in interpret(SEYI, cfg).interpretations if i.label == "bass_entry"]
    assert any(abs(e.start_s - 16.6) <= 1.0 for e in entries)


@needs_seyi
def test_seyi_label_follows_the_data_not_the_song():
    cfg = InterpretConfig()
    cfg.bass_entry.min_rise_db = 60.0  # more than any real rise: the label must disappear
    assert not [i for i in interpret(SEYI, cfg).interpretations if i.label == "bass_entry"]


@needs_detty
def test_detty_bass_bursts_cluster_on_the_beat_grid_more_than_chance():
    result = bass_burst_alignment(AnalysisContext(DETTY))
    assert result["n_bursts"] >= 50
    assert result["within_any_beat"] >= 1.5 * result["chance_any_beat"]
    assert result["within_downbeat"] >= 2.0 * result["chance_downbeat"]


@needs_detty
def test_detty_recurring_bursts_are_not_called_bass_entries():
    model = interpret(DETTY)
    assert not [i for i in model.interpretations if i.label == "bass_entry"], (
        "recurring bursts are not an entry: windows before and after contain bursts alike"
    )


@pytest.mark.parametrize("path", [SEYI, DETTY], ids=["seyi", "detty"])
def test_real_songs_interpret_validate_and_leave_the_analysis_untouched(path, tmp_path):
    if not path.exists():
        pytest.skip("analysis not generated")
    before = {p.name: sha(p) for p in path.parent.iterdir() if p.is_file()}
    out = tmp_path / "song_interpretation.json"
    model = interpret(path, output_path=out)
    write_interpretation(model, out)
    assert {p.name: sha(p) for p in path.parent.iterdir() if p.is_file()} == before
    loaded = load_interpretation(out)
    assert loaded == model and model.interpretations
    assert check_source(loaded, out) is None
    assert all(i.confidence is None and i.limitations and i.evidence.criteria for i in model.interpretations)
