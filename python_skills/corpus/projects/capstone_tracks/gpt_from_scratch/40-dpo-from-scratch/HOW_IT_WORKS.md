# How it works: Capstone Lesson 40: Direct Preference Optimization from Scratch

## `main.py`

```text
Direct Preference Optimization (DPO) from scratch.

See: phases/19-capstone-projects/40-dpo-from-scratch/docs/en.md

Builds:
  - InstructionTokenizer with INST / RESP specials (byte-level)
  - TinyGPT (causal decoder-only transformer)
  - preference fixture of (prompt, chosen, rejected) triples
  - sequence_log_prob that sums next-token log probabilities over the
    completion, masking the prompt
  - dpo_loss that implements:
       L = -log sigmoid( beta * ( (logp_w_pol - logp_w_ref)
                                - (logp_l_pol - logp_l_ref) ) )
  - train_dpo loop with a frozen reference and a trainable policy
  - run_demo that prints loss and chosen-rejected margins per epoch.

Exits 0 when the chosen-rejected log-prob margin increases under training.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class InstructionTokenizer`](main.py#L40)
  - [`def encode_prompt(self, prompt)`](main.py#L46)
  - [`def encode_completion(self, completion)`](main.py#L52)
- [`class CausalSelfAttention`](main.py#L61)
  - [`def forward(self, x)`](main.py#L73)
- [`class Block`](main.py#L85)
  - [`def forward(self, x)`](main.py#L94)
- [`class TinyGPT`](main.py#L100)
  - [`def forward(self, ids)`](main.py#L110)
- [`def make_preferences()`](main.py#L124): Twelve preference triples covering simple task types.
- [`def sequence_log_prob(model, prompt_ids, completion_ids)`](main.py#L195): Sum of log-probabilities of the completion tokens conditioned on prompt.
- [`def dpo_loss(logp_w_pol, logp_l_pol, logp_w_ref, logp_l_ref, beta)`](main.py#L236): Per-example DPO loss and the implicit reward margin.
- [`def ipo_loss(logp_w_pol, logp_l_pol, logp_w_ref, logp_l_ref, beta)`](main.py#L259): The IPO variant: a squared loss that does not saturate.
- [`def length_normalised_log_prob(model, prompt_ids, completion_ids)`](main.py#L282): Sequence log-prob divided by completion length.
- [`class MarginRow`](main.py#L300)
- [`def margin_table(policy, tok, triples)`](main.py#L309): Per-triple margin report under the policy. Useful for debugging.
- [`def print_margin_table(rows, log)`](main.py#L336)
- [`class DPOConfig`](main.py#L351)
- [`def build_models(cfg)`](main.py#L364): Build a reference and a policy. The policy is initialised from the
- [`def warmup_pretrain(model, tok, triples, epochs, lr, seed)`](main.py#L380): A short next-token pretraining pass on the chosen completions so the
- [`class DPOReport`](main.py#L423)
- [`def evaluate_margins(policy, reference, tok, triples)`](main.py#L430): Mean (chosen - rejected) log-prob difference under the policy.
- [`def train_dpo(policy, reference, tok, triples, cfg, log)`](main.py#L452)
- [`def run_demo(cfg)`](main.py#L501)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
