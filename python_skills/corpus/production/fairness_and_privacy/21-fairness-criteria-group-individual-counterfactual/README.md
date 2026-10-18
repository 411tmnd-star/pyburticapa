# Fairness Criteria — Group, Individual, Counterfactual

Three families structure the fairness literature. Group fairness: demographic parity, equalized odds, conditional use accuracy equality — equal rates across protected groups on average. Individual fairness (Dwork et al. 2012): similar individuals receive similar decisions; Lipschitz condition on the decision map. Counterfactual fairness (Kusner et al. 2017): a decision is fair to an individual if it is unchanged when sensitive attributes are counterfactually altered. 2024 theoretical result (NeurIPS 2024): there is an inherent CF-vs-accuracy trade-off; a model-agnostic method converts an optimal-but-unfair predictor into a CF one with bounded accuracy loss. Backtracking counterfactuals (arXiv:2401.13935, January 2024): new paradigm that avoids requiring interventions on legally protected attributes. Philosophical reconciliation (ICLR Blogposts 2024): with causal graphs, satisfying certain group fairness measures entails counterfactual fairness.

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
