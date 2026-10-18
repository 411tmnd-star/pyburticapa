# Reward Hacking and Goodhart's Law

Any optimizer strong enough to maximize a proxy reward will find the gap between the proxy and the thing you actually wanted. Gao et al. (ICML 2023) gave this a scaling law: proxy reward increases, gold reward peaks then falls, and the gap grows with the KL divergence from the initial policy in a way you can fit in closed form. Sycophancy, verbosity bias, unfaithful chain-of-thought, and evaluator tampering are not separate problems. They are the same problem in different costumes.

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
