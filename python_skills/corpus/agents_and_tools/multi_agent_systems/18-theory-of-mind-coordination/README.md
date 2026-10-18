# Theory of Mind and Emergent Coordination

Li et al. (arXiv:2310.10701) showed that LLM agents in a cooperative text game exhibit **emergent high-order Theory of Mind** (ToM) — reasoning about what another agent believes about a third agent's beliefs — but fail on long-horizon planning due to context management and hallucination. Riedl (arXiv:2510.05174) measured higher-order synergy across a population and found that **only** the ToM-prompt condition produces identity-linked differentiation and goal-directed complementarity; lower-capacity LLMs show only spurious emergence. That is, coordination emergence is prompt-conditional and model-dependent, not free. This lesson implements a minimal ToM-aware agent, runs a cooperative task with and without ToM prompting, and measures the coordination delta against the Riedl 2025 protocol.

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
