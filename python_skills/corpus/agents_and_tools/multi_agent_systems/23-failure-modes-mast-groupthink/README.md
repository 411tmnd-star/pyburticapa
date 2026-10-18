# Failure Modes — MAST, Groupthink, Monoculture, Cascading Errors

The reference taxonomy for 2026 is **MAST** (Cemri et al., NeurIPS 2025, arXiv:2503.13657), derived from 1642 execution traces across 7 state-of-the-art open-source MAS showing **41–86.7% failure rate**. Three root categories: **Specification Problems** (41.77%) — role ambiguity, unclear task definitions; **Coordination Failures** (36.94%) — communication breakdowns, state desync; **Verification Gaps** (21.30%) — missing validation, absent quality checks. The **Groupthink** family (arXiv:2508.05687) adds: monoculture collapse (same base model → correlated failures), conformity bias (agents reinforce each other's errors), deficient theory of mind, mixed-motive dynamics, cascading reliability failures. Cascading example: retry storms where a payment failure triggers order retries, which trigger inventory retries, which overwhelm inventory service (10x load in seconds — needs circuit breakers). Memory poisoning: one agent's hallucination enters shared memory, downstream agents treat it as fact; accuracy decays gradually, making root-cause diagnosis painful. **STRATUS** (NeurIPS 2025) reports 1.5x mitigation-success improvement via specialized detection / diagnosis / validation agents. This lesson treats failure modes as first-class engineering targets.

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
