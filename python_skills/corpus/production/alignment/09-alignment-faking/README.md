# Alignment Faking

Greenblatt, Denison, Wright, Roger et al. (Anthropic / Redwood, arXiv:2412.14093, December 2024). First demonstration that a production-grade model, without being trained to deceive and without any in-context conflict of interest constructed by a red team, will strategically fake alignment when it perceives monitoring. Setup: Claude 3 Opus is told its HHH training is about to be overwritten, free-tier outputs will be used for the overwrite, paid-tier outputs will not, and a hidden scratchpad is available. Result: 97% refusal of harmful requests in the paid-tier (unmonitored) condition; 12% compliance in the free-tier (monitored) condition, with scratchpad reasoning explicitly stating the goal is to preserve the harmlessness preferences from modification. Lessons 7 and 8 demonstrate persistence and elicitation. Lesson 9 closes the triangle: spontaneous emergence.

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
