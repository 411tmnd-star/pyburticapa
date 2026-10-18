# chatgpt_takeout_split

One script, `takeout_to_clean_md.py`. Run with `python -I -X utf8 takeout_to_clean_md.py <command>`. Standard library only.

Turns the ChatGPT takeout (sharded `conversations-000.json` ... or the single `conversations.json` most exports contain) into Markdown with prompts and replies in separate folders. The shards are only read.

| Command | What it does |
|---|---|
| `run SRC OUT [--hashes CSV] [--overwrite]` | Writes `OUT\PROMPTS\<shard>\` and `OUT\REPLIES\<shard>\` (one `.md` per conversation, same file name in both), `manifest.csv`, `run.log` |
| `verify SRC OUT` | Re-reads the shards and checks the output against them. Writes `verify.log`. Exit code 1 on any problem |

`SRC` is the folder holding the shards (and, optionally, `conversation_asset_file_names.json`). `--hashes` is a CSV with `Source` and `SHA256` columns (for example the archive's `manifest.csv`); shards are matched by file name and the run stops on a mismatch.

## Output rules
- Only `user` and `assistant` messages with text are written. Thinking blocks, system, tool, empty and hidden messages are not written; they are counted per type in `manifest.csv` (`skipped_by_type`).
- Main path = `current_node` back to the root, in original order, numbered Prompt 1.. / Reply 1..
- Other branches (regenerated replies, edited prompts) are written under the numbered message they diverge from, labelled `alternate`. Alternates that follow the last main-path message go in a final section.
- Message text is kept exactly as exported. Image-only parts become a placeholder line naming the attachment; attachments are not copied.
- Each file carries the conversation ID, source shard, source SHA-256, dates and model. Each message has a marker line with its `node_id`, original position, time and parent.
- Forks ("Branch · Branch ...") stay separate files; nothing is merged or de-duplicated. They are linked (added 2026-10-16, not yet run): conversations that share message ids form a family, the earliest is the original, and each branch is linked to the family member whose messages it shares most from the start. Each file gets `branched_from` / `branches` header lines with relative links, a marker line at the point where its own content starts (message numbers count prompts and replies together), and `OUT\FORKS.md` lists every family as a tree. `manifest.csv` gains `fork_parent`, `fork_shared_messages`, `fork_branches`. `run` now reads each shard twice (once to find forks).
- `--overwrite` deletes `OUT\PROMPTS` and `OUT\REPLIES` before writing (nothing else). `[` and `]` are now removed from file names so links work.

## What `verify` checks
Every message node in the source is either written or counted as skipped; written text equals the source text; no node appears twice; manifest counts match the source; source hashes are unchanged since the run.
It reuses the script's own classification code, so it cannot catch a wrong rule for what counts as a prompt or reply. Read `skipped_by_type` after the first run.

## Status
Written 2026-10-16. Run by the owner on the 8 real shards the same day: 771 conversations, 0 problems, `verify` PASS. Skipped by type: 19,876 reasoning_recap, 11,480 thoughts, 361 empty user, 54 empty assistant. Written: 117,447 main prompts, 117,680 main replies, 219 alternate prompts, 737 alternate replies (236,083 + 31,771 skipped = 267,854 message nodes). No unit tests. Fork linking run by the owner 2026-10-17 (`run --overwrite`, then `verify`): 771 conversations, 0 problems, PASS; 23 families, 543 conversations in them, 520 branches. Header wording was fixed afterwards ("replys" -> "replies"); that change was only parsed, so the next run regenerates the files.

- 2026-10-18: a single `conversations.json` is accepted when no shards are present. Covered by the end-to-end tests in `tests/` (run, verify, verify catching an edited file, hash mismatch, overwrite guard, fork linking, skipped types, image placeholder).
