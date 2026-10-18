# Constitutional AI and RLAIF

Bai et al. (arXiv:2212.08073, 2022) asked: what if we replaced the human labeler with an AI that reads a list of principles? Constitutional AI has two phases — self-critique and revision under a constitution, then RL from AI Feedback. The technique coined the term RLAIF and shipped in the Claude 1 post-training pipeline. On 21 January 2026 Anthropic published a rewritten Claude constitution: explanatory reasoning over prescriptive rules, a four-tier priority hierarchy, and the first major-lab formal acknowledgment of uncertainty about model moral status. Released under CC0 1.0.

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
