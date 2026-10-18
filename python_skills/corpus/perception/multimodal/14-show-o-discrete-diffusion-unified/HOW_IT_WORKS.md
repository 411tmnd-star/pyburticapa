# How it works: Show-o and Discrete-Diffusion Unified Models

## `main.py`

```text
Show-o masked-discrete-diffusion sampler — stdlib.

16 tokens, K=8 vocab, T=8 steps, cosine schedule. Mock "transformer" logits so
the sampling loop is the focus, not the model. Prints the mask evolution.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def cosine_schedule(T)`](main.py#L19): Mask ratio at step t, in [0, 1]. Goes 1.0 -> 0.0.
- [`def mock_logits(tokens, prompt_seed)`](main.py#L24): Pretend-transformer: bias toward specific tokens based on prompt + position.
- [`def softmax(xs)`](main.py#L37)
- [`def step_unmask(tokens, prompt_seed, keep_ratio)`](main.py#L44): Predict all masked tokens; keep top keep_ratio of them confident.
- [`def sample(prompt_seed, T)`](main.py#L66)
- [`def render(tokens)`](main.py#L83)
- [`def main()`](main.py#L87)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
