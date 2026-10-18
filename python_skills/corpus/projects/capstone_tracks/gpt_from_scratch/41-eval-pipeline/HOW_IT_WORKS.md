# How it works: Capstone Lesson 41: Full Evaluation Pipeline

## `main.py`

```text
Full evaluation pipeline for a tiny language model.

See: phases/19-capstone-projects/41-eval-pipeline/docs/en.md

Implements:
  - perplexity_eval (held-out language modelling)
  - exact_match_eval (short-form factual)
  - token_f1_eval (open-form similarity)
  - judge_eval (mock LLM-as-judge with deterministic scoring)
  - Aggregator (per-eval normalisation + weighted mean)
  - run_demo: trains a tiny TinyGPT briefly, runs all four evals, writes
    report.json next to this file, exits 0 on success.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class InstructionTokenizer`](main.py#L38)
  - [`def encode_pair(self, instruction, response, max_len)`](main.py#L45)
  - [`def encode_prefix(self, instruction, max_len)`](main.py#L55)
  - [`def encode_text(self, text, max_len)`](main.py#L63)
  - [`def decode_response(self, ids)`](main.py#L69)
- [`class CausalSelfAttention`](main.py#L73)
  - [`def forward(self, x, key_pad_mask)`](main.py#L85)
- [`class Block`](main.py#L101)
  - [`def forward(self, x, key_pad_mask)`](main.py#L110)
- [`class TinyGPT`](main.py#L116)
  - [`def forward(self, ids, key_pad_mask)`](main.py#L126)
- [`class ExampleRecord`](main.py#L141)
- [`class EvalResult`](main.py#L150)
  - [`def to_dict(self)`](main.py#L157)
- [`def normalise(text)`](main.py#L175)
- [`def strip_trailing_punctuation(text)`](main.py#L182)
- [`def normalise_for_em(text)`](main.py#L189)
- [`def tokenize_text(text)`](main.py#L193)
- [`class LMTextDataset`](main.py#L363)
- [`def perplexity_eval(model, tok, texts, max_len, batch_size)`](main.py#L387)
- [`def generate_greedy(model, tok, instruction, max_new_tokens)`](main.py#L446)
- [`def exact_match_score(pred, ref)`](main.py#L476)
- [`def token_f1_score(pred, ref)`](main.py#L480)
- [`def exact_match_eval(model, tok, pairs)`](main.py#L503)
- [`def token_f1_eval(model, tok, pairs)`](main.py#L528)
- [`class JudgeVerdict`](main.py#L557)
- [`def mock_judge(instruction, prediction, reference)`](main.py#L562): Deterministic judge: scores prediction on a 1-5 scale.
- [`def judge_eval(model, tok, pairs, judge_fn)`](main.py#L586)
- [`def normalise_metric(name, value)`](main.py#L624): Map a raw metric onto [0, 1].
- [`class FinalReport`](main.py#L640)
  - [`def to_dict(self)`](main.py#L647)
- [`def aggregate(results, weights)`](main.py#L657)
- [`def render_report(report, log)`](main.py#L681)
- [`class EvalConfig`](main.py#L704)
- [`def train_small(model, tok, cfg)`](main.py#L715): A short pretraining pass on the LM corpus + EM pairs so the model is non-random.
- [`def run_demo(cfg, write_json)`](main.py#L747)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
