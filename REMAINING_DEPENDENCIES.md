# Left in place, and what still depends on the Harness

## Deliberately not copied

| Component | Reason |
|---|---|
| `tools\411_archive_processing` (24 py) | Hard-coded paths (`C:\Users`, `MASTER_HARNESS`, `tool harness`); 390 MB of outputs and logs sit beside the code. A copy would still write to or read from the Harness. |
| `tools\KNOWLEDGE_EXTRACTION\v1_frozen` | Frozen snapshot with a checksum file tied to its data. Copying breaks the freeze meaning. (`v2` converters were copied.) |
| `tools\Browser-DevTools-Python-Research` (103 py) | Separate research project with path markers, 3 files that do not parse, and a duplicate copy under `1_PY\assets`. |
| `add_skill.py`, `registry\apply_additions.py` | Write the shared registries. |
| `reports\*.py`, `assets\**\*.py` | Harness-owned paths and data. |
| `tools\X\CODE_OUT`, `DOCX_OUT`, `DATA_OUT` | Generated output folders (deck builder output), not toolkit tools. |
| AudioLab, learning repository, `chat-test`, desktop snapshots | Unrelated projects or duplicates; recorded as external, not moved. |

## What the toolkit copies still use from the Harness

- **discover copy**: reads `1_PY\registry\view\*`, `registry\families\python-capabilities\records.json`, `assets\` ledgers, `WORKFLOW_DISCOVERY_CATALOGUE.md`, and note folders (`3_NOTES`, `4_MCP_AND_API_USAGE`, `links.md\output_notes`, `1_PY\assets\HaNESS\...`). Path set in `discover\discover_config.json`. Read-only.
- **discover tests** (`discover\test_discover.py`, `test_ollama_synthesis.py`): the first runs against the live Harness corpus (read-only). Not re-run in the 2026-10-14 cleanup (code unchanged).
- **prompt_reply_pipeline**: no Harness dependency any more. Tests use `tests\fixtures\` (synthetic) and temp folders. VERIFIED (12 tests). Real Ollama not run.
- **chat_reply_extractor**: no Harness dependency in the code; its file handling is keyed to fixed file names (see `TOOLKIT_INVENTORY_RECONCILED.md` in the Harness). Its earlier byte-identical check read `markdown_files` (R1 verification rows); not repeated.
- **gemini_md2**: several scripts read result JSONs under `logs\` and `.txt` URL lists that exist only in the Harness; the debug analysis scripts need recorded `.bin` captures that are not in the toolkit. Not self-contained; UNKNOWN whether they run here.
- **Quarantine**: `C:\Users\USER\Desktop\Python_Toolkit_QUARANTINE\` holds the moved historical material. Nothing in the toolkit depends on it (VERIFIED by search).
- **x_pipeline**: relative output folders (`output_notes`, `videos`, `images`); must be run from a folder that holds them. Not run.

## Callers that would change before retiring the original `discover.py`

- Only `1_PY\test_discover.py` and `1_PY\test_ollama_synthesis.py` import it (verified by scan).
- 26 documents and CSVs mention `discover.py` by name (for example under `2_OPEN_SOURCE_AND_USAGE\repo_url_compact_*`); these are references, not code callers. They would need updating if the original moved.

## Not done, needs approval

- Deleting any original; retiring the Harness `discover.py`; changing shared registries; moving `411_archive_processing`.

## Update 2026-10-14: discovery of toolkit tools
- `discover --class toolkit` depends only on the toolkit's own `INVENTORY.csv` and the files it names. No Harness registry, catalogue or note is read for that class. VERIFIED by the empty-root test.
- Default `discover` queries still read the Harness registries (unchanged, by design).
