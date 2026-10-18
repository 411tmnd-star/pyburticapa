# My flows

Our own workflows, and the folder that joins the course to them.

```
research/     our research workflows: evidence verification, demand research, job leads, 3D engine, ads layer
ui_ux/        our design workflow: intake, breakdown, motion, principles, rebuilds, references
to_confirm/   joins: course + our workflow (A), course + outside repo (B), course + course (C); 20 so far
HANDOFF.md    where chat stopped and what Claude Code does next
```

How work moves:

```
research/ + ui_ux/ + confirmed/ + course + outside repos
        │
        ▼
to_confirm/Wnn  (WORKFLOW.md, PARTS.md, TASKS.md)   ← chat writes these; match.py finds more
        │  Claude Code builds and runs the pass test on the laptop
        ▼
python_skills/confirmed/<name>                      ← only what passed
```

| Goal | Where to start |
|---|---|
| Research / 411 | [research/evidence_verification](research/evidence_verification/), [research/demand_research](research/demand_research/), W01, W16, W19 |
| Job leads | [research/job_leads](research/job_leads/), W02 |
| Design | [ui_ux/](ui_ux/), W03, W04, W06, W12 |
| 3D and geometry | [research/3d_marketing_engine](research/3d_marketing_engine/), W09, W10, W11, W13 |
| Marketing | [research/ads_layer](research/ads_layer/), W05, W15, W18 |
| Sales | W14, W17 |

Every script here runs on its own fixtures without keys. Live outputs, other people's media and real contact data stay on your machine (see `.gitignore`).

Tests: `python -m unittest tests.test_my_flows` from the repo root.
