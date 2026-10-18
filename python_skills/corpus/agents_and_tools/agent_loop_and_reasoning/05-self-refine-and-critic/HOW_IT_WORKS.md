# How it works: Self-Refine and CRITIC: Iterative Output Improvement

## `main.py`

```text
Toy Self-Refine and CRITIC loop.

Task: produce a 3-bullet summary under 60 chars per bullet that does not contain
known factual errors. Self-Refine uses LLM-style self-critique; CRITIC routes
verification through an external fact list.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Attempt`](main.py#L21)
- [`def generate(topic, history)`](main.py#L28)
- [`def feedback_self(output)`](main.py#L51)
- [`def verify_external(output)`](main.py#L59)
- [`def refine(topic, prev, critique, history)`](main.py#L74)
- [`def run_loop(topic, use_critic, max_iters)`](main.py#L78)
- [`def print_run(label, history)`](main.py#L91)
- [`def main()`](main.py#L101)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
