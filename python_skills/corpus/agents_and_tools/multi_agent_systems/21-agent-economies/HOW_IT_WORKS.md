# How it works: Agent Economies, Token Incentives, Reputation

## `main.py`

```text
Agent economies: Shapley attribution, second-price auction, reputation routing.

All stdlib. Shapley is exact for N<=6 and sampled otherwise. Second-price
auction demonstrates truthful bidding. Reputation routing compares
rep-weighted vs random assignment over 100 rounds.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def shapley_exact(value_fn, agents)`](main.py#L18)
- [`def shapley_sampled(value_fn, agents, samples, rng)`](main.py#L33)
- [`class Bid`](main.py#L52)
- [`def second_price(bids)`](main.py#L57)
- [`class Reputation`](main.py#L68)
  - [`def init(self, agents)`](main.py#L74)
  - [`def update(self, agent, quality)`](main.py#L78)
  - [`def weights(self, agents)`](main.py#L82)
- [`def weighted_choice(agents, weights, rng)`](main.py#L86)
- [`def demo_shapley()`](main.py#L99)
- [`def demo_auction()`](main.py#L132)
- [`def demo_reputation_routing()`](main.py#L152)
- [`def main()`](main.py#L190)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
