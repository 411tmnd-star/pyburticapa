# W08 · Personal knowledge search

**Type** A: course + our workflow · **Goals** research and 411 · **Status** to confirm

Search your cleaned ChatGPT and Claude archives like notes: normalised lexical search with aliases, a fingerprinted index that knows when a file changed, and every hit shown with its source file.

## How the parts connect

1. chatgpt_takeout_split / knowledge_recovery produce the cleaned markdown (as today, local only)
2. RAG Freshness Pipeline's content-addressed index records each file's hash and drops deleted ones
3. Semantic Notes Search answers a query with scored, inspectable hits and aliases
4. the database and dossiers stay in output/knowledge_recovery/ (already git-ignored)

## Run (target)

```bash
python search_notes.py "liquid glass" --index output/knowledge_recovery/index
```

## Pass

On the repo's fixture archive, a query returns hits with file and line; changing one file re-indexes only that file.

When it passes on the laptop, it moves to `python_skills/confirmed/knowledge_recovery (extended)` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
