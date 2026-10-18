# W08 tasks for Claude Code

One task per session. Read WORKFLOW.md and PARTS.md first. Do not change the course or corpus; copy what you need.

1. **Read the parts.** Open each course path in PARTS.md and run its existing tests or demo. Note in this file what each part actually does.
2. **Build the join** described in WORKFLOW.md, in a new folder `W08-build/` here (or as an extension of the "ours" part, keeping its existing tests green).
3. **Write the pass test** from WORKFLOW.md as an automated test with fixtures only (no real people's names, emails or media).
4. **Run it** and paste the output under "Evidence" below.
5. **If it passes:** move the build to `python_skills/confirmed/knowledge_recovery (extended)`, set this row in `../REGISTRY.csv` to `confirmed` with the path and evidence, commit. **If not:** write what failed below and stop.

## Evidence

Done 2026-10-18.

1. **Parts read.** Semantic Notes Search (`solution/main.py`): Unicode-normalised tokens, explicit aliases applied to documents and query, scored hits with the matched terms. RAG Freshness Pipeline (`solution/fingerprint.py`, `changes.py`): normalise, SHA-256 the content, diff against the previous index into insert / update / refresh / delete / unchanged. Both ideas re-implemented for files and line numbers; the course code is untouched and not run as a separate demo.
2. **Built** `python_skills/confirmed/knowledge_recovery/search_notes.py` (documented in that folder's README). Aliases fold into the index fingerprint; the notes are only read.
3. **Pass test** `tests/test_search_notes.py`, 15 tests on the repo's fixture archive.
4. **Calls I made.** BM25 instead of the course's cosine, because chat files are long. A refresh skips reading files whose size and timestamp match, and distinguishes "touched" (same content, new timestamp: no re-index) from "changed". Marker comments and the metadata bullets are not indexed. My first metadata pattern missed `source_sha256` (digits in the key), found by reading real output, and the fixture test now guards it (`root`, `gpt`, `conversation_id` must give no hits).

```
$ python -I -X utf8 python_skills/confirmed/knowledge_recovery/search_notes.py "SunBox inverter" --notes CLEAN --index IDX
query: SunBox inverter -> words: sunbox, inverter
index: 9 file(s); refresh: 9 new, 0 changed, 0 touched, 0 deleted, 0 unchanged
1. PROMPTS/conversations-000/2025-01-01_Branch · SunBox kiosk sizing_c0000002.md   score 2.0116   matched: sunbox, inverter
   L26: What if we add a small inverter so the kiosk can also charge a laptop?
...
$ (append one line to one REPLIES file)
$ python -I -X utf8 python_skills/confirmed/knowledge_recovery/search_notes.py quokkaterm --index IDX
index: 9 file(s); refresh: 0 new, 1 changed, 0 touched, 0 deleted, 8 unchanged
1. REPLIES/conversations-001/2025-01-01_Pricing the kiosk_c0000003.md   score 2.0686   matched: quokkaterm
   L27: The quokkaterm panel costs nothing.
```

Full suite after this change: 89 tests OK. Not run on the real archive (private data, laptop only): `search_notes.py "liquid glass" --notes <your CLEAN folder>` is the first command to try there.
