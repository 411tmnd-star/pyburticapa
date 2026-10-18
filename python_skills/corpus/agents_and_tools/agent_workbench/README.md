# Agent workbench

[Corpus](../../README.md) / [agents_and_tools](../README.md)  ·  Course: [ai_engineering/phases/14-agent-engineering](../../../course/ai_engineering/phases/14-agent-engineering)

Each folder holds the Python of one lesson or project. Open it, read the script, run it.

| Folder | What the script does | Run |
|---|---|---|
| [31-agent-workbench-why-models-fail/](31-agent-workbench-why-models-fail/README.md) | Compare a prompt-only run against a workbench-guided run on a tiny repo task | `python code/main.py` |
| [32-minimal-agent-workbench/](32-minimal-agent-workbench/README.md) | Lay down the three-file minimal agent workbench and run a single turn | `python main.py` |
| [33-instructions-as-executable-constraints/](33-instructions-as-executable-constraints/README.md) | Parse agent-rules.md, run a fake agent turn, score the turn against the rules | `python main.py` |
| [34-repo-memory-and-state/](34-repo-memory-and-state/README.md) | Schema-first agent state with atomic writes | `python main.py` |
| [35-initialization-scripts/](35-initialization-scripts/README.md) | Deterministic agent initialization script | `python main.py` |
| [36-scope-contracts/](36-scope-contracts/README.md) | Scope contract checker with violation budgets, severity, and multi-contract merge | `python main.py` |
| [37-runtime-feedback-loops/](37-runtime-feedback-loops/README.md) | Wrap subprocess.run with structured capture, secret redaction, rotation, and command lineage | `python main.py` |
| [38-verification-gates/](38-verification-gates/README.md) | Deterministic verification gate with coverage floor, --strict mode, and signed overrides | `python main.py` |
| [39-reviewer-agent/](39-reviewer-agent/README.md) | Reviewer agent stub with a five-dimension rubric | `python main.py` |
| [40-multi-session-handoff/](40-multi-session-handoff/README.md) | Generate a handoff packet from workbench artifacts | `python main.py` |
| [41-workbench-for-real-repos/](41-workbench-for-real-repos/README.md) | Run the same task on a sample app twice: prompt-only vs workbench-guided | `python main.py` |
| [42-agent-workbench-capstone/](42-agent-workbench-capstone/README.md) | Assemble the capstone agent-workbench-pack into outputs/ | `python code/main.py` |
