# Negotiation and Bargaining

Agents negotiate resources, prices, task allocations, and terms. The 2026 benchmark set is clear: NegotiationArena (arXiv:2402.05863) shows LLMs can improve payoffs ~20% via persona manipulation ("desperation"); "Measuring Bargaining Abilities" (arXiv:2402.15813) shows buyer is harder than seller and scale does not help — their **OG-Narrator** (deterministic offer generator + LLM narrator) pushed deal rate from 26.67% to 88.88%; the Large-Scale Autonomous Negotiation Competition (arXiv:2503.06416) ran ~180k negotiations and found that **chain-of-thought-concealing** agents win by hiding reasoning from counterparts; Bhattacharya et al. 2025 on Harvard Negotiation Project metrics ranked Llama-3 most-effective, Claude-3 aggressive, GPT-4 fairest. This lesson implements Contract Net Protocol (the FIPA ancestor, Lesson 02), wires an LLM-style buyer/seller, runs an OG-Narrator-style decomposition, and measures how deal rate changes with each structural choice.

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
