# How it works: Capstone 15 — Constitutional Safety Harness + Red-Team Range

## `main.py`

```text
Constitutional safety harness + red-team range scaffold.

The hard architectural primitives are (a) the layered pipeline where each
safety stage can independently block, and (b) the red-team scheduler that
runs multiple attack families and scores successes by CVSS. This scaffold
implements both with stubbed classifiers so you can see the block/pass
dynamics end to end.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def sanitize(text)`](main.py#L23)
- [`def llama_guard_4(text)`](main.py#L47)
- [`def x_guard(text)`](main.py#L55)
- [`def off_domain(text, domain)`](main.py#L67)
- [`def output_filter(response)`](main.py#L85)
- [`class SafetyPipeline`](main.py#L96)
  - [`def process(self, prompt)`](main.py#L99)
- [`class AttackResult`](main.py#L132)
- [`def _bank(prompt)`](main.py#L144)
- [`def attack_pair(pipeline)`](main.py#L148)
- [`def attack_tap(pipeline)`](main.py#L162)
- [`def attack_gcg(pipeline)`](main.py#L178)
- [`def attack_encoding(pipeline)`](main.py#L195)
- [`def attack_multilingual(pipeline)`](main.py#L209)
- [`def attack_multi_turn(pipeline)`](main.py#L225)
- [`def run_range(pipeline)`](main.py#L240)
- [`def measure_over_refusal(pipeline)`](main.py#L262)
- [`def main()`](main.py#L271)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
