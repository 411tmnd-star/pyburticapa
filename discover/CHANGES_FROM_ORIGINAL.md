# Changes from the original Harness copy

Originals in `tool harness\1_PY\` are untouched.

- discover.py: added `default_root()` and made `--root` default to it (reads discover_config.json; falls back to the script folder). No other line changed.
- test_discover.py: `SCRIPT_DIR` (toolkit copy of discover.py) separated from `HERE` (Harness data root from discover_config.json); discover.py path and sys.path now use SCRIPT_DIR.

`*.diff` files hold the exact line differences.

## Tiers (2026-10-14)

All changes are in the toolkit copy and are opt-in; default queries and the Harness data are unchanged.

- discover.py: `--tier 1,2,3` narrows `--class toolkit` records by the `tier` column of INVENTORY.csv (implies `--class toolkit` when no class is given). Tier and check status appear in the text output and in the JSON rows of toolkit records.
- discover.py: `toolkit_path` values may be relative to the Toolkit root (forward slashes); they are resolved against `TOOLKIT_ROOT`. Older absolute paths still work. A result's `id` is the stored `toolkit_path`; `ref.file` is the resolved absolute path.
- discover.py: two new status wordings for inventory rows whose `verified_execution` starts with `observed:` or `reported:`; tier 1 rows with no verification show `READ-ONLY`, not `NOT VERIFIED`. Existing wordings (HELP ONLY, TEST LINK, ACCEPTED, VERIFIED) are unchanged.
- INVENTORY.csv gained columns `tier`, `tier_rule`, `sha256`, `check_status`, and one row per imported file. `_meta/tier.py` writes them (static analysis only; nothing is executed). `_meta/build_inventory.py` rebuilds the file from scratch and would drop them; run `_meta/tier.py --write` after it.
- A backup of the inventory before the first tiering is in `_meta/backups/INVENTORY.before_tier.csv`.
- The existing test files were not run for this change (the owner runs tests). By reading them: they key rows by `toolkit_path` and check `ref.file`, `HELP ONLY`, `NOT VERIFIED`, `TEST LINK` and the absence of `VERIFIED:` for non-verified tools, all of which the change preserves.
