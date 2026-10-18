# Tree of Thoughts and LATS: Deliberate Search

> A single chain-of-thought trajectory has no room to backtrack. ToT (Yao et al., 2023) turns reasoning into a tree with self-evaluation on each node. LATS (Zhou et al., 2024) unifies ToT with ReAct and Reflexion under Monte Carlo Tree Search. Game of 24 goes from 4% (CoT) to 74% (ToT); LATS hits 92.7% pass@1 on HumanEval.

## What `main.py` does

```text
Toy Tree-of-Thoughts BFS and LATS MCTS on a stylized arithmetic search.

Task: given integers [4, 6, 4, 1], find an expression using +, -, *, / that
evaluates to 24. This mirrors the Game of 24 benchmark from Yao et al.

ToT is a BFS with a prompted value function. LATS is MCTS over the same
search space with UCT selection.

Stdlib only; no LLM. Value function is symbolic (distance from 24).
```

(from the script's own docstring)

## Run it

From this folder:

```
python main.py
```

Needs: standard library only

## Files

- [`main.py`](main.py)

These are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.

## Learn more

- Theory: [phases/14-agent-engineering/04-tree-of-thoughts-lats/docs/en.md](../../../../course/ai_engineering/phases/14-agent-engineering/04-tree-of-thoughts-lats/docs/en.md)
- Quiz: [phases/14-agent-engineering/04-tree-of-thoughts-lats/quiz.json](../../../../course/ai_engineering/phases/14-agent-engineering/04-tree-of-thoughts-lats/quiz.json)
- Diagram: [phases/14-agent-engineering/04-tree-of-thoughts-lats/assets/tot-lats-tree.svg](../../../../course/ai_engineering/phases/14-agent-engineering/04-tree-of-thoughts-lats/assets/tot-lats-tree.svg)
- LLM instructions: [skill-search-policy.md](../../../../llm_instructions/skills/phases/14-agent-engineering/04-tree-of-thoughts-lats/outputs/skill-search-policy.md)
- Original lesson folder: [phases/14-agent-engineering/04-tree-of-thoughts-lats](../../../../course/ai_engineering/phases/14-agent-engineering/04-tree-of-thoughts-lats)

## Use it in a workflow

Not adapted yet. When you adapt it, write the skill name in the `notes` column of `CATALOG.csv`.
