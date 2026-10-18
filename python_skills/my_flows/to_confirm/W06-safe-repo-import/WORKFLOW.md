# W06 · Safe repo import

**Type** A: course + our workflow · **Goals** design · **Status** to confirm

A general importer for design repos: shallow clone into clones/, record commit and licence, copy only effect files the licence allows, scan any SKILL.md for risky instructions, write a manifest.

## How the parts connect

1. repo_inspect reads the repo (read-only, as today)
2. licence gate: MIT / Apache / BSD / Unlicense copy; GPL / AGPL separate; none → study only
3. copy shaders, WebGL/canvas JS, CSS animation, entry HTML into the intake folder with LICENSE and SOURCE.md; SHA-256 manifest
4. any SKILL.md or prompt file goes through Skill Supply-Chain Scanner; Sandbox Policy Planner records what the import was allowed to do

## Run (target)

```bash
python repo_import.py https://github.com/oframe/ogl --out work/ogl
```

## Pass

On one MIT repo: commit and licence recorded, only effect files copied, manifest hashes match, scanner report written; on a no-licence repo it copies nothing and says study only.

When it passes on the laptop, it moves to `python_skills/confirmed/repo_import` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
