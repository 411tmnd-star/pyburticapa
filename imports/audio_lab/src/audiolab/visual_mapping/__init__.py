"""Visual design mapping: time-aligned visual control channels from analysis and interpretation."""

from audiolab.visual_mapping.engine import map_song, output_paths, write_mapping
from audiolab.visual_mapping.profile import Profile, find_profile, load_profile
from audiolab.visual_mapping.validate import check_reproducible, load_mapping, validate_mapping

__all__ = [
    "Profile",
    "check_reproducible",
    "find_profile",
    "load_mapping",
    "load_profile",
    "map_song",
    "output_paths",
    "validate_mapping",
    "write_mapping",
]
