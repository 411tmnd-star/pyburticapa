# Role Specialization — Planner, Critic, Executor, Verifier

The most common multi-agent decomposition in 2026: one agent plans, one executes, one critiques or verifies. MetaGPT (arXiv:2308.00352) formalizes this as SOPs encoded into role prompts — Product Manager, Architect, Project Manager, Engineer, QA Engineer — following `Code = SOP(Team)`. ChatDev (arXiv:2307.07924) chains designer, programmer, reviewer, tester through a "chat chain" with "communicative dehallucination" (agents explicitly request missing details). The verifier is load-bearing: Cemri et al. (MAST, arXiv:2503.13657) show every multi-agent failure can be traced to missing or broken verification. PwC reported 7× accuracy gain (10% → 70%) from structured validation loops in CrewAI.

```
python main.py
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
