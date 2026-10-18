# How it works: Consensus and Byzantine Fault Tolerance for Agents

## `main.py`

```text
Consensus and BFT for LLM agents, stdlib only.

Implements three aggregators (plurality, CP-WBFT, DecentLLMs) and three
attack patterns (byzantine, sycophancy, monoculture). Prints a table of
(attack, aggregator) -> final answer, highlighting correct decisions.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Vote`](main.py#L15)
  - [`def canonical(self)`](main.py#L20): Rough semantic clustering: lowercase + strip whitespace/punct.
- [`def plurality(votes)`](main.py#L25)
- [`def cp_wbft(votes, threshold)`](main.py#L36)
- [`def decentllms(votes)`](main.py#L50): Score proposals 0-1 via evaluator agents, pick geometric-median cluster.
- [`def scenario(name, correct, votes)`](main.py#L72)
- [`def main()`](main.py#L94)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
