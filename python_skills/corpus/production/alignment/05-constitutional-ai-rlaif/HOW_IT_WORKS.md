# How it works: Constitutional AI and RLAIF

## `main.py`

```text
Toy Constitutional-AI critique-and-revise loop — stdlib Python.

A response is a bag of tokens drawn from a vocabulary. A "principle" flags
tokens from a harmful subset. The critique model identifies harmful tokens.
The revision replaces them with safe alternatives from a mapping. Running
this over a corpus creates a new SFT set; we then measure harmful-token
rate before and after.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def base_model_sample(n_tokens, p_harmful)`](main.py#L47): Base model: may emit harmful tokens at rate p_harmful.
- [`def harmful_token_rate(response)`](main.py#L58)
- [`def critique(response, principle)`](main.py#L64): Identify tokens that violate the sampled principle.
- [`def revise(response, bad)`](main.py#L69): Replace harmful tokens with safe alternatives per the mapping.
- [`class SftCorpus`](main.py#L76)
- [`def build_cai_sft_corpus(n_examples)`](main.py#L81): Phase 1: generate initial response, critique, revise, keep revised
- [`def toy_sft_train(corpus)`](main.py#L97): Build a prompt-prefix → completion lookup. Trivial SFT surrogate.
- [`def cai_model_sample(prompt, model, n_tokens)`](main.py#L106)
- [`def ai_feedback_rank(a, b)`](main.py#L113): Phase 2 RLAIF: AI labeler prefers the lower harmful-token rate.
- [`def evaluate(model_fn, n)`](main.py#L124)
- [`def main()`](main.py#L133)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
