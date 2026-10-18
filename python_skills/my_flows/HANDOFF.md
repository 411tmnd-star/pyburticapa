# Handoff: chat → Claude Code

Written 2026-10-18 at the end of the chat session that built `my_flows/`. Claude Code on the laptop starts here, not from chat history.

## Where chat stopped

Done in chat and pushed:

- `my_flows/research/`: verify.py (refined), verify_quotes.py, leads.py (refined, never sends), each with a runnable example; the 3D engine plan with **Anny** as the body route; the ads layer plan; playbooks.
- `my_flows/ui_ux/`: intake (frames.py, templates, queue), breakdown (method, crit sheet), motion (contact_sheet.py, diorama_blockout.py, scroll scrub, campfire pipeline), principles, rebuilds (UI Specifics 01, liquid-glass SOURCE.md), DESIGN_REPOS.md.
- `my_flows/to_confirm/`: README, GOALS.md, REGISTRY.csv, match.py with its first CANDIDATES.csv, and W01-W20.
- `llm_instructions/chat_skills/`: copies of the 14 Claude chat skills.
- `tests/test_my_flows.py`: every example, frames.py, match.py and every PARTS.md path.

Verified in chat: verify.py 7/13 (exit 1, as designed), verify_quotes.py 2/4, leads.py dry run 1 draft / 4 not drafted, frames.py on a synthetic clip, contact_sheet.py on its frames, match.py writes candidates, all existing tests still pass.

## First session on the laptop

1. `git pull`, then `python -m unittest discover -s tests` from the repo root. Everything must be green.
2. Check `python --version`, `ffmpeg -version`. The laptop has Python 3.11 and 3.14 (no 3.13), so `bpy` 5.2.2 cannot install yet: W09, W10 and W13 are deferred (blocked: needs bpy/3.13).
3. Small fixes that need the laptop:
   - `ui_ux/rebuilds/liquid-glass/SOURCE.md`: copy the X post link and creator handle from the 12 Oct session.
   - `ui_ux/references/DESIGN_REPOS.md`: record the licence and commit of the three repos in `tool harness\prompts\` (`git -C <repo> log -1 --format="%H %cI"` and the LICENSE file).
4. Pick the first W folder (suggested order below), read its WORKFLOW.md, PARTS.md, TASKS.md, and work its TASKS.md one task per session.

## Suggested order

Cheapest and most useful first, each building on the last:

1. **W20** handoff kit (init.py makes every later session start warm)
2. **W01** evidence judge, **W02** leads with guarded output (standard library only)
3. **W03** X design mode, **W06** safe repo import, **W04** design wall
4. **W07** skill checker, **W16** demand report with judge
5. **W11** geometry toolkit, then **W10** body and garment (Anny), **W09** blockout to AI film, **W13** viewer
6. The rest: W05, W08, W12, W14, W15, W17, W18, W19

## Rules

- Don't change `course/` or `corpus/`. Copy what you need.
- No real people's names, emails or other people's media in the repo. Fixtures only.
- Claude is the model for any model step; no local models.
- Tools budget: $20 total.
- A workflow is confirmed only when its pass test runs green on the laptop; then it moves to `python_skills/confirmed/` and REGISTRY.csv records the evidence.
- Ask before deleting or moving anything that already exists.
