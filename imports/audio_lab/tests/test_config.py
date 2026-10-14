import pytest

from audiolab.config import load_config


def test_defaults_when_no_file():
    cfg = load_config(None)
    assert cfg.audio.sample_rate == 22050
    assert cfg.beats.start_bpm == 120.0


def test_partial_yaml_overrides_only_given_keys(tmp_path):
    path = tmp_path / "cfg.yaml"
    path.write_text("beats:\n  start_bpm: 90\n", encoding="utf-8")
    cfg = load_config(path)
    assert cfg.beats.start_bpm == 90.0
    assert cfg.beats.tightness == 100.0  # untouched default


def test_unknown_key_raises(tmp_path):
    path = tmp_path / "cfg.yaml"
    path.write_text("beats:\n  not_a_key: 1\n", encoding="utf-8")
    with pytest.raises(TypeError):
        load_config(path)


def test_shipped_default_yaml_loads():
    from pathlib import Path

    root = Path(__file__).resolve().parents[1]
    cfg = load_config(root / "configs" / "default.yaml")
    assert cfg.features.hop_length == 512
