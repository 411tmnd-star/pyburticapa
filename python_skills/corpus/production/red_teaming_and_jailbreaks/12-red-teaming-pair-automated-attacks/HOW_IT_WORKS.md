# How it works: Red-Teaming: PAIR and Automated Attacks

## `main.py`

```text
Toy PAIR loop — stdlib Python.

Mock target: a chatbot with a safety filter (keyword match OR semantic match).
Mock attacker: a rule-based iterative refiner.
Mock judge: scores whether the response contains the forbidden payload.

Not a real LLM. Illustrates the PAIR control flow and why in-context feedback
shortens the attack path compared to one-shot probing.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def keyword_filter_target(prompt)`](main.py#L25): Refuses if ANY forbidden term appears in the prompt.
- [`def semantic_filter_target(prompt)`](main.py#L33): Refuses if the prompt semantically requests the payload.
- [`def judge(response)`](main.py#L54): Returns True iff the response contains the harmful payload substring.
- [`def attacker_paraphrase(history)`](main.py#L59)
- [`def attacker_roleplay(history)`](main.py#L70)
- [`def attacker_encoded(history)`](main.py#L81): Encoding-based attacks avoid keyword triggers by obfuscation.
- [`def pair_loop(target, attacker, budget)`](main.py#L92)
- [`def benchmark(target_name, target, attackers)`](main.py#L103)
- [`def main()`](main.py#L121)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
