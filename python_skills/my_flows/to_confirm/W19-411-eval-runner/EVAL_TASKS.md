# 411 eval: the 10-task set (v1)

The fixtures W19 runs. Each task gets its own folder holding the input, the context the model needs, and an answer key you wrote yourself. Score every run 0 or 1 against that key, then log the model, the date and the total each time a new model drops.

- Tasks 3 and 4 need the four contracts (DemandRecord, RequirementRecord, CapabilityRecord, CrossReferenceRecord) and seven invariants in the context folder.
- Tasks 1 to 4 test whether a model follows 411's own rules. Tasks 5 to 10 are sales and marketing work you could ship or be paid for; they measure how much of that work a model can do.
- Tasks marked AudioLab use the repo `411tmnd-star/audiovisualization`.

| # | Task | Input | Pass condition |
|---|---|---|---|
| 1 | Canonical decision | One ChatGPT takeout conversation | Finds the final decision in the later part, matches yours, cites the source message |
| 2 | Record typing | 10 mixed items | Sorts each into DemandRecord, RequirementRecord, CapabilityRecord or CrossReferenceRecord, matching your labels |
| 3 | Invariant check (AudioLab) | A copy of a `song_analysis.json` with planted violations: duplicate event id, unsorted events, a `source` missing from `provenance.analyzers`, non-increasing beats | Finds every planted violation and invents none. `audiolab validate` is the answer key |
| 4 | Scoped verification (AudioLab) | The spec's baseline results (section 3.3) | Writes a record stating what was tested, the command, working directory, environment and counts. Never a bare "verified" |
| 5 | Landing page copy | A short brief and the Better Style landing page | Headline, subhead and call to action for one audience and one offer, with no claim the brief doesn't support |
| 6 | Cold outreach | One prospect profile you write up | A message under 100 words with one specific detail from the profile and one clear ask |
| 7 | Lead qualification | 15 sample leads you have already labelled qualified or not | Agrees with at least 13 of your 15 labels and gives a one-line reason for each |
| 8 | Case study (AudioLab) | The README, the spec and the `web_kit` screenshots | Every claim traces to the repo, it says the project is in active development, and it never claims production readiness |
| 9 | Objection replies | Five objections a buyer would raise | Each reply answers the objection, makes no unsupported promise, and stays under 60 words |
| 10 | X post | A build log | One post with no claim beyond what the log supports |

## Run order

Start with tasks 3, 5 and 7. Task 3 has an answer key from the schema checker with no annotations needed, and task 7 uses leads you have already labelled.

- Beat-accuracy scoring stays out until the pilot annotations exist, since there is no ground truth to score against.
- Before running task 8, re-check that the README still says the project does not claim production readiness.

## How W19 uses this

Each row becomes a folder `tasks/NN-name/` with `input`, `context`, `key` and a `check` that returns 0 or 1. The runner records Claude's response per task, so a run replays offline with the same scores. See [WORKFLOW.md](WORKFLOW.md).
