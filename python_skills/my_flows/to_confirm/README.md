# To confirm

This folder joins the course to everything else. Instead of studying 726 course entries one by one, each course part is joined to work we already do, and each join is written up as a workflow **to confirm**. Claude Code builds and checks one at a time on the laptop; a workflow that passes moves to `python_skills/confirmed/`.

Two states only: **to confirm** → **confirmed**.

## Three kinds of join

| Type | What | Example |
|---|---|---|
| **A** course + our workflow | Takes something we run (in `confirmed/`, `my_flows/research/` or `my_flows/ui_ux/`) and makes it better with course code | W01: verify.py + Report Judge |
| **B** course + outside repo | Takes an outside project, joins course code to it, aims it at our goals | W12: lenis + scrollytelling + the scroll-scrub page |
| **C** course + course | Combines course projects into something new for a goal | W17: Inbox Triage Desk + Meeting Notes to Actions |

Goals: sales, marketing, 3D and geometry, design, research/411, job leads ([GOALS.md](GOALS.md)).

## The first 20

| Id | Workflow | Type | Goals |
|---|---|---|---|
| [W01](W01-evidence-judge/WORKFLOW.md) | Evidence judge | A | research and 411 |
| [W02](W02-leads-guarded-output/WORKFLOW.md) | Leads with guarded output | A | job leads, sales |
| [W03](W03-x-design-mode/WORKFLOW.md) | X design mode | A | design, marketing |
| [W04](W04-design-wall/WORKFLOW.md) | Design wall | A | design, marketing |
| [W05](W05-outlier-demand-digest/WORKFLOW.md) | Outlier demand digest | A | marketing, research |
| [W06](W06-safe-repo-import/WORKFLOW.md) | Safe repo import | A | design |
| [W07](W07-skill-checker/WORKFLOW.md) | Skill checker | A | all |
| [W08](W08-personal-knowledge-search/WORKFLOW.md) | Personal knowledge search | A | research |
| [W09](W09-blockout-to-ai-film/WORKFLOW.md) | Blockout to AI film | A | 3D, marketing, design |
| [W10](W10-body-and-garment/WORKFLOW.md) | Body and garment (Anny) | A | 3D, marketing, sales |
| [W11](W11-geometry-toolkit/WORKFLOW.md) | Geometry toolkit | B | 3D and geometry |
| [W12](W12-scroll-product-story/WORKFLOW.md) | Scroll product story | B | design, sales |
| [W13](W13-3d-product-viewer/WORKFLOW.md) | 3D product viewer | B | 3D, sales |
| [W14](W14-orders-inbox/WORKFLOW.md) | Orders inbox | B | sales |
| [W15](W15-ads-catalogue-feed/WORKFLOW.md) | Ads catalogue feed | A | marketing, sales |
| [W16](W16-demand-report-with-judge/WORKFLOW.md) | Demand report with judge | A | research and 411 |
| [W17](W17-follow-up-desk/WORKFLOW.md) | Follow-up desk | C | sales |
| [W18](W18-ad-captions/WORKFLOW.md) | Ad captions | C | marketing |
| [W19](W19-411-eval-runner/WORKFLOW.md) | 411 eval runner (on Claude) | C | research and 411 |
| [W20](W20-handoff-kit/WORKFLOW.md) | Handoff kit | C | all |

Status and evidence for each: [REGISTRY.csv](REGISTRY.csv).

## Each folder

- **WORKFLOW.md**: what it does, how the parts connect, the target run command, what a pass looks like.
- **PARTS.md**: the exact sources: our paths, course unit ids with their course paths, outside repos with licence.
- **TASKS.md**: the Claude Code brief, one task per session, ending in an Evidence section.

Folders hold instructions and pointers, not copied code. Claude Code assembles the code when it builds the workflow; the course and corpus stay untouched.

## Finding more joins: match.py

```bash
python3 -I match.py            # writes CANDIDATES.csv
```

`match.py` reads the course catalogue, our confirmed skills, research and design folders, the design repos list and the goal keywords, then scores every pairing (IDF-weighted word overlap, goal words doubled). No model, no network, under a second. The result is a lead list: Claude and you pick from it, and a chosen join becomes W21, W22 … with a row in REGISTRY.csv. Rerun it whenever the course, our work or GOALS.md changes.

## Moving a workflow to confirmed

1. Claude Code reads TASKS.md, builds the workflow, runs the pass test.
2. Pass: the build moves to the `confirmed/` path named in WORKFLOW.md; REGISTRY.csv gets `confirmed`, the path and the evidence.
3. Fail: it stays here, with what failed written in TASKS.md.
