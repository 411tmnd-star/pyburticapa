"""Musical interpretation: evidence-backed descriptions built on song_analysis.json."""

from audiolab.interpretation.config import InterpretConfig, load_interpret_config
from audiolab.interpretation.engine import (
    check_source,
    interpret,
    load_interpretation,
    write_interpretation,
)
from audiolab.interpretation.schema import SongInterpretation

__all__ = [
    "InterpretConfig",
    "SongInterpretation",
    "check_source",
    "interpret",
    "load_interpret_config",
    "load_interpretation",
    "write_interpretation",
]
