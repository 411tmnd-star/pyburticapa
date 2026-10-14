"""Per-song settings that cannot be detected and so are stored: meter and downbeat offset.

The file is YAML keyed by song stem, e.g.

    my-song:
      beats_per_bar: 4
      downbeat_offset: 2
"""

from __future__ import annotations

from dataclasses import asdict, dataclass
from pathlib import Path

import yaml


@dataclass
class SongSettings:
    beats_per_bar: int = 4
    downbeat_offset: int = 0  # 0-based index of the detected beat that is beat one


def _read(path: Path) -> dict:
    if not path.exists():
        return {}
    return yaml.safe_load(path.read_text(encoding="utf-8")) or {}


def has_song_settings(path: str | Path | None, stem: str) -> bool:
    return path is not None and stem in _read(Path(path))


def load_song_settings(
    path: str | Path | None, stem: str, default: SongSettings | None = None
) -> SongSettings:
    """Settings for `stem`, or `default` when the file or the song's entry is missing."""
    default = default or SongSettings()
    if path is None:
        return default
    entry = _read(Path(path)).get(stem)
    if entry is None:
        return default
    return SongSettings(**{**asdict(default), **entry})


def save_song_settings(path: str | Path, stem: str, settings: SongSettings) -> None:
    path = Path(path)
    data = _read(path)
    data[stem] = asdict(settings)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(yaml.safe_dump(data, sort_keys=True, allow_unicode=True), encoding="utf-8")
