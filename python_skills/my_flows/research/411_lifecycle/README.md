# 411 lifecycle: Demand-to-Product (proposed extension)

411 extends from discovering demand to delivering verified work against it and learning from the result. It does not replace the Demand Discovery Engine, the four canonical contracts (DemandRecord, RequirementRecord, CapabilityRecord, CrossReferenceRecord) or the 411 Harness.

This is a **proposed extension**. Claude Code must reconcile it against the locked architecture and current implementation before changing anything (last section).

- **In scope:** work planning, production and verification, distribution packages, feedback capture, and the gates between them.
- **Out of scope for now:** new record types, new orchestration frameworks, automated public posting, multi-platform rollout.
- **Principle:** a post is evidence of possible demand, not proof. The product is the solution; posts, demos and write-ups are supporting assets.

## Lifecycle and subsystems

One loop, six responsibilities, three approval gates. Lifecycle state lives in persistent state, not in any single subsystem.

```
Discover → Construct → Assess → [Gate 1: Select] → Build → Verify → [Gate 2: Release] → [Gate 3: Publish] → Measure → Learn
```

| Subsystem | Responsibility | Output | Gate it owns |
|---|---|---|---|
| 1. Demand Acquisition | Collect platform signals, keep provenance | Source records | None |
| 2. Demand Intelligence | Extract problems, correlate evidence, score demand | Validated demand + requirements | Demand score |
| 3. Work Planning | Choose opportunity and deliverable type | Approved work spec | Gate 1: Select |
| 4. Production and Verification | Build and test | Verified deliverable | Gate 2: Release |
| 5. Distribution | Prepare packages, publish via authorised integrations | Distribution records | Gate 3: Publish |
| 6. Feedback and Learning | Capture outcomes, update demand | Outcome evidence | Kill criteria |

Distribution prepares and publishes approved releases only. It does not manage the product's journey; the lifecycle ID does.

## Traceability

Every item carries one **lifecycle ID** (for example `L-0001`) that links source record → demand → work spec → deliverable → release → publication attempt → outcome. Any outcome must be traceable back to the original evidence, and any build back to the demand that authorised it.

Claude Code first checks whether CrossReferenceRecord already carries this. If it does, reuse it; if not, report the gap rather than adding a record.

## Demand score and Gate 1

A demand is "validated" only when it clears a written threshold. Starting criteria (tune after the first slice):

| Criterion | Question | Evidence needed |
|---|---|---|
| Recurrence | Same problem across independent sources? | At least 3 distinct posts or threads from different authors |
| Recency | Still active? | Signals within the last 90 days |
| Pain | Is the cost explicit? | Time lost, money lost, or failed workarounds stated |
| Underserved | Why do existing tools fail? | Named alternatives and their stated gaps |
| Payment signal | Any willingness to pay or switch? | Mentions of paid tools, budgets, bounties, requests for recommendations |
| Feasibility | Can the smallest useful deliverable be built by one person? | Estimated effort in days, cost in dollars |

**Gate 1 (Select)** passes only if the score threshold is met, the smallest useful deliverable is defined, estimated cost fits current capacity against other projects, and a success test is written *before* building. Every selection is approved manually at first.

## Completion gate (Gate 2)

An AI saying "done" is not completion. A release record states what was required, what was produced, which acceptance tests passed, known limitations, and the evidence for each claim. Verification differs by work type:

| Work type | Minimum evidence |
|---|---|
| Software, utility, MCP server | Automated tests pass, a documented install-and-run check on a clean environment |
| Automation | Run log from a real or realistic input, plus failure handling shown |
| Research or dataset | Source references preserved, claims spot-checked against sources (see [../evidence_verification/](../evidence_verification/)) |
| Educational or service | Defined scope and deliverable, reviewed by you |

Status values are explicit: draft, verified, approved, released, withdrawn. Only you move a deliverable to approved.

## Distribution rules (Gate 3)

Preparing a package and publishing it are separate steps. 411 may prepare and validate packages automatically. Publishing is manual until the rules below are encoded and tested.

- **Per-destination rulebook.** Each destination stores its own record: terms of service, self-promotion rules, API access and cost, rate limits, allowed content. A destination without a rulebook cannot be published to.
- **Hard constraints.** No spam, no unrequested promotion where the community forbids it, no exposing personal information, no implied endorsement, no quoting someone's complaint in a way that identifies them.
- **Disclosure.** Posts disclose that you built the solution.
- **Package contents.** Short explanation, demo, repository or hosted link, and a specific feedback request. Different destinations get different packages for the same product.
- **Approval.** Every public post needs your explicit approval, logged with the final text.

## Feedback and kill criteria

Success metrics and stop rules are written into the work spec *before* publishing, so results cannot redefine them afterwards. Views, likes and upvotes are recorded but do not count as demand satisfied.

- **Count as signal:** direct replies from people with the original problem, installs or clones, repeat use, feature requests, and payment or switching statements.
- **Review point:** a fixed window after publishing (for example 14 days), set in the spec.
- **Outcomes:** *iterate* (clear unmet requirement), *continue* (signal above threshold), *stop* (below threshold at review), or *reinterpret* (the demand was misread; return to Demand Intelligence).
- **Small-sample rule:** below a minimum number of relevant responses, report "insufficient data" instead of a verdict.
- All outcomes are logged as new evidence against the same lifecycle ID.

## First vertical slice

Prove the loop once, end to end, before generalising.

1. **Source:** one platform with a usable public API and clear rules (GitHub issues is the suggested start; Reddit later, after its rulebook is written).
2. **Work type:** one, where you are strongest: a Python utility or MCP server.
3. **Gates:** all three manual.
4. **Run:** one demand through discovery, scoring, Gate 1, build, Gate 2, a prepared package, one approved post, and one review at the fixed window.
5. **Exit:** write down what broke, what was slow, and which new records (if any) were truly missing.

Only after that run do new record types, additional sources or additional work types get proposed.

## Instructions for Claude Code

1. **Do not modify anything yet.** Treat this document as a proposal.
2. Inspect the existing schemas, registries, harness and the four canonical contracts. Report which parts of this spec already exist, partly exist, or are missing.
3. Specifically check: is there an existing structure for work specs, deliverables, releases, publication attempts or outcomes, and does CrossReferenceRecord already support a lifecycle ID?
4. Report conflicts between this spec and the locked architecture, and propose the smallest change that resolves each.
5. Return a gap report and an implementation order for the first vertical slice. Wait for approval before implementing.

**Open decisions for you:** the demand-score threshold, the review window length, the first source, and the first work type.

Eval tasks that test this loop: [W19](../../to_confirm/W19-411-eval-runner/EVAL_TASKS.md).
