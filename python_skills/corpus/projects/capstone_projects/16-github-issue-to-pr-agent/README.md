# Capstone 16 — GitHub Issue-to-PR Autonomous Agent

Label an issue, get a PR — the 2026 product shape for autonomous coding agents: run an agent in a cloud sandbox, verify tests pass, and post a review-ready PR with rationale. AWS Remote SWE Agents, Cursor Background Agents, OpenAI Codex cloud, and Google Jules all ship it. The hard parts are reproducing the repo's build environment automatically, preventing credential leakage, enforcing per-repo budgets, and making sure the agent cannot force-push. This capstone builds the self-hosted version and compares it on cost and pass rate to the hosted alternatives.

```
python main.py
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`ts/`](ts) | files the code uses |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
