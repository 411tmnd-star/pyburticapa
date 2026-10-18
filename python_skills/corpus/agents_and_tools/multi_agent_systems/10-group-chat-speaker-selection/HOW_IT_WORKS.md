# How it works: Group Chat and Speaker Selection

## `main.py`

```text
Group chat with speaker selection -- AutoGen GroupChat in miniature.

Three agents (coder, reviewer, manager), two selector variants
(round-robin, LLM-simulated), TERMINATE-token stop condition.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Msg`](main.py#L13)
- [`class Agent`](main.py#L19)
- [`def coder_policy(pool)`](main.py#L25)
- [`def reviewer_policy(pool)`](main.py#L35)
- [`def manager_policy(pool)`](main.py#L46)
- [`def round_robin_selector(pool, team)`](main.py#L60)
- [`def llm_style_selector(pool, team)`](main.py#L68): Simulated LLM selector: picks based on recent context keywords.
- [`def run_groupchat(team, selector, max_rounds, label)`](main.py#L85)
- [`def speaker_counts(pool)`](main.py#L110)
- [`def main()`](main.py#L117)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
