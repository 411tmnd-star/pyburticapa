# How it works: Negotiation and Bargaining

## `main.py`

```text
Negotiation: Contract Net + OG-Narrator demo, stdlib only.

Compares naive all-LLM bargaining against OG-Narrator (deterministic offer
generator + LLM narration). Measures deal rate over 1000 trials. Includes
a small Contract Net task-market demo at the end.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class BargainState`](main.py#L14)
- [`def naive_llm_bargain(state, rng)`](main.py#L23): Simulate naive LLM bargaining: picks a price with high variance and
- [`def og_narrator_bargain(state, rng, concession)`](main.py#L39): OG-Narrator deterministic offer: zeuthen-style concession toward midpoint.
- [`def seller_response(state, rng, concession)`](main.py#L53): Seller uses OG-Narrator-style offer too (for both buyers).
- [`def simulate_bargain(buyer_fn, rng, buyer_max, seller_min)`](main.py#L67)
- [`def bench_deal_rate(buyer_fn, label, trials)`](main.py#L88)
- [`class Bid`](main.py#L100)
- [`class ContractNetTask`](main.py#L108)
- [`class ContractNetManager`](main.py#L115)
  - [`def broadcast_cfp(self, task)`](main.py#L120)
  - [`def receive_proposal(self, task_id, bid)`](main.py#L124)
  - [`def award(self, task)`](main.py#L128)
- [`def demo_contract_net()`](main.py#L142)
- [`def main()`](main.py#L160)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
