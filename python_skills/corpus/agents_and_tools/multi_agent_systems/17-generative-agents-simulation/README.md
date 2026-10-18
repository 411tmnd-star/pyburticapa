# Generative Agents and Emergent Simulation

Park et al. 2023 (UIST '23, arXiv:2304.03442) populated **Smallville**, a sandbox of 25 agents, with a three-part architecture: **memory stream** (natural-language log), **reflection** (higher-level syntheses the agent generates about its own stream), and **plan** (day-level behavior, then sub-plans). The landmark result was the Valentine's Day party emergence: one agent seeded with "wants to throw a Valentine's Day party," without further scripting, produced invitations spread through the population, coordinated dates, and the party happened — from 24 agents who started with no knowledge of it. Ablations show all three components are required for believability. The documented failures are spatial-norm errors (entering closed stores, sharing single-person bathrooms). This is the reference architecture for agent simulations and multi-agent social evaluation in 2026.

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
