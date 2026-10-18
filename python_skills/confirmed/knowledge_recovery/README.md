# knowledge_recovery

Searches the cleaned ChatGPT archive (`PROMPTS` and `REPLIES` folders, made by `python_skills\confirmed\chatgpt_takeout_split`) at message level and writes a grouped, source-traceable dossier for any subject. Standard library only (needs a Python whose SQLite has FTS5; the scripts check this and say so).

**One command, export folder to dossier:** `python -I -X utf8 run.py EXPORT_DIR OUT_DIR --subject "NAME"` (runs the split, verify, ingest, check and dossier steps below in order; `--subject` can repeat; `--aliases`/`--exclude` optional).

Run the steps one at a time with `python -I -X utf8 recover.py <command>` from this folder, or give the full path to `recover.py`.

Global options (before the command): `--db FILE`, `--aliases FILE` (default `aliases.json` here), `--exclude FILE` (default `exclude.json` here).

## Commands

| Command | What it does |
|---|---|
| `ingest [--archive DIR]` | Reads the archive and builds `output\knowledge_recovery\knowledge.db`. Builds into `knowledge.db.tmp` and replaces the old file only when the build finishes. The archive is only read. |
| `check` | Tests the database against the archive's own `manifest.csv` totals and against itself (see below). Exit 1 on any failure. |
| `search SUBJECT [--limit N]` | Unique matching messages, best first, each with node id, conversation id, position, branch type and how many branch files hold it. |
| `terms SUBJECT [--top N]` | The words that travel with the subject (by count and by lift over the whole archive) and the spellings/compounds found in the vocabulary. |
| `dossier SUBJECT [--excerpt N] [--context K] [--min-hits N] [--max-related N] [--no-related] [--broad-related]` | Writes `output\knowledge_recovery\dossiers\<subject>_dossier.md` (with a contents table), `<subject>_evidence.csv` and `<subject>_full\` (full text of every message shown as an excerpt). |
| `domain SUBJECT [--broad-related]` | For each electricity/hardware term in `aliases.json`: how many messages contain it and how many of those already name the subject. Use it to prune the lists. |
| `conflicts` | Nodes whose text differs between files: both versions and where they first differ. |
| `exclusions` | Lists excluded conversations, why, and how many of their family are *not* excluded. |

## How it works
- **One row per unique `node_id`** (`messages`). A message copied into branch conversations is stored once. `occurrences` records every file that holds it, with conversation id, view (prompts/replies), position, main/alt branch and path, so nothing about the branches is lost.
- **Families:** conversations that share any `node_id` are one family (an original and its branches). Family label = earliest member.
- **Search:** FTS5 over the unique messages, ranked with `bm25`. The index is rebuilt only with the documented `rebuild` and `optimize` commands.
- **Query expansion:** the subject's names come from `aliases.json` (VoltaEdge is seeded with its spelling variants). The vocabulary table (`fts5vocab`) is then searched for terms that contain a name (6+ letters) or are one edit away from it, so spellings you never typed are found. `reject_terms` blocks false friends (`voltage`). The dossier lists every expansion so you can check it.
- **Family scoring and context:** a family with at least `--min-hits` (default 3) matching messages counts as strongly about the subject; the messages `--context` positions either side of each hit (main path, prompts and replies interleaved) are added and marked CONTEXT. This pulls in telemetry messages that never say the name.
- **Related by domain terms:** `aliases.json` > `domain_terms` has a `strong` list (specific: nilm, ade7753, pzem, sct, esp32, uno r4, r4 wifi, kwh, inverter, prepaid meter, ...) and a `weak` list (voltage, current, relay, battery, wifi, ...). A message that contains a strong term but not the subject's name is listed in its own RELATED section, ranked by how many terms it matches. `--broad-related` also admits messages with three or more different weak terms. They are never mixed in with direct hits.
- **Dossier:** grouped by topic (keyword lists in `aliases.json`; a message goes to the topic with the most different keywords, ties to the earlier topic), then split into Prompts (user) and Replies (assistant), in date order. A contents table links to every entry. Messages longer than `--excerpt` characters show a window around the match plus a link to the full text. Each item shows node id, conversation id, position, branch, time, source path and how many other branch files hold it. Original wording, inside a code fence, never truncated unless `--max-chars` is given (then marked).
- **Labels are heuristic.** User: `user-stated-decision-candidate`, `user-question`. Assistant: `assistant-proposed`, `assistant-claimed-result`. Both: `has-code`, `has-measurements`. Nothing is labelled a fact.
- **Exclusions:** `exclude.json` marks conversations by title text or id; your own list is kept in `exclude.json`, which is not committed (copy `exclude.example.json` to start). Excluded conversations are skipped unless `--include-excluded` is given. Branches renamed to a different title are not caught: run `exclusions` and add their ids.

## What `check` tests
Unique nodes match what ingest recorded; every parsed entry is an occurrence or a counted duplicate; no orphan occurrences or messages; no node with two different texts; no ingest problems; two files per conversation; every conversation has a family; total entries and conversation count equal the archive's `manifest.csv`; FTS5 `integrity-check`.

## search_notes.py: search the cleaned files like notes

`recover.py search` answers from the database, one row per unique message. `search_notes.py` answers from the cleaned Markdown files themselves: every hit is a **file and the line numbers** that matched, and the index knows when a file changed. It reads the notes and never changes them; the index is one JSON file (default `output\knowledge_recovery\index\index.json`, git-ignored, because it holds positions of private text).

```
python -I -X utf8 python_skills/confirmed/knowledge_recovery/search_notes.py "liquid glass" --notes CLEAN_DIR --index IDX   # first run builds the index
python -I -X utf8 python_skills/confirmed/knowledge_recovery/search_notes.py "liquid glass" --index IDX                     # later: refresh, then search
python -I -X utf8 python_skills/confirmed/knowledge_recovery/search_notes.py --update-only --notes CLEAN_DIR --index IDX    # refresh only
```

```
1. REPLIES/conversations-001/2025-01-01_Pricing the kiosk_c0000003.md   score 2.0686   matched: quokkaterm
   L27: The quokkaterm panel costs nothing.
```

| Option | What it does |
|---|---|
| `--notes DIR` | The folder of `.md`/`.txt` notes (the `CLEAN` folder from `chatgpt_takeout_split`, or any notes). Needed on the first run; the index remembers it. A different folder rebuilds the index. |
| `--index DIR` | Where `index.json` lives (default `output\knowledge_recovery\index`). |
| `--aliases FILE` | JSON `{"lg": "liquid glass"}`, applied to the notes and the query alike. Changing the file rebuilds everything, and says so. This is not the `aliases.json` that `recover.py` uses. |
| `--all` | Only files that hold every query word. |
| `--limit N`, `--lines N` | Files shown (5) and matching lines per file (3). |
| `--no-refresh`, `--update-only`, `--json` | Search without re-reading the notes (a hit whose file changed since is marked); refresh and stop; machine-readable output. |

**Fingerprinted index.** Each file is stored with its SHA-256, size and timestamp. A refresh tokenizes only files that are new or whose content changed, notes files that were only touched (same content), and forgets deleted ones; it prints the counts (`refresh: 0 new, 1 changed, 0 touched, 0 deleted, 8 unchanged`). Unchanged files are not even read.

**Matching and ranking.** Words are case-folded and accent-folded (`CAFE` finds `café`), whole words only. Files are ranked with BM25 (length-normalised, so a long conversation is not simply favoured). The lines shown are those holding the most distinct query words. `<!-- NODE ... -->` markers and the metadata bullets under each title are not indexed, so `root`, `gpt` or `conversation_id` do not match everything.

Exit codes: `0` hits, `1` no hits, `2` bad input. Tested on the repo's fixture archive in [tests/test_search_notes.py](../../../tests/test_search_notes.py) (15 tests). Not yet run on the real archive: that is private data and stays on the laptop. Limits: lexical only (no stemming: `glass` does not find `glasses`, use `--aliases`), and the index grows with the text, so a very large archive makes each query load a large JSON file.

## Limits
- Keyword search with spelling tolerance only: no meaning-based matching, no embeddings.
- The archive has no thinking blocks and no uploaded files, so neither is searchable.
- Topic and label rules are plain keyword matches and will misfile some messages.
- The database holds private conversation text. `output\knowledge_recovery\` is in `.gitignore`.

## Status
Written 2026-10-17. Run by the owner the same day: `ingest` (236,083 entries -> 10,342 unique messages, 771 conversations, 250 families), `check` (all PASS), `terms`, `domain --examples 3`, `conflicts` (2 whitespace-only variants of one user prompt, kept in the conflicts table), `dossier VoltaEdge` (69 hits, 51 context, 81 related). Not yet re-run after the last edits: the section-level view does not exist yet; the contents table, excerpts and topic changes were last run in the dossier before the final topic-keyword edit. No tests. Not yet in `WORKFLOWS.md` or `INVENTORY.csv`.

- 2026-10-18: `--aliases` and `--exclude` options added; decision phrases now include "we go with" and lines starting "Decision:". End-to-end tests on a fabricated export: `python -m unittest discover -s tests` from the toolkit root (13 tests, PASS on Python 3.11, 3.12, 3.13 under Linux). Windows is set up in CI but has not been run yet.
