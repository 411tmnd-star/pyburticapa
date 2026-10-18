# How it works: Few-Shot, Chain-of-Thought, Tree-of-Thought

## `advanced_prompting.py`

Functions and classes, in file order (click to jump to the line):

- [`def extract_answer(text)`](advanced_prompting.py#L104)
- [`def build_cot_prompt(question, examples, num_examples)`](advanced_prompting.py#L123)
- [`def build_zero_shot_cot_prompt(question)`](advanced_prompting.py#L140)
- [`def build_zero_shot_prompt(question)`](advanced_prompting.py#L150)
- [`def call_llm(client, model, system, user, temperature)`](advanced_prompting.py#L160)
- [`def zero_shot_solve(question, client, model)`](advanced_prompting.py#L173)
- [`def zero_shot_cot_solve(question, client, model)`](advanced_prompting.py#L179)
- [`def few_shot_cot_solve(question, examples, client, model, num_examples)`](advanced_prompting.py#L185)
- [`def self_consistency_solve(question, examples, client, model, n_samples)`](advanced_prompting.py#L191)
- [`def generate_initial_thoughts(question, client, model, breadth)`](advanced_prompting.py#L213)
- [`def evaluate_thought(thought, question, client, model)`](advanced_prompting.py#L232)
- [`def extend_thought(thought, question, client, model, breadth)`](advanced_prompting.py#L249)
- [`def tree_of_thought_solve(question, client, model, breadth, depth)`](advanced_prompting.py#L268)
- [`def react_solve(question, client, model, max_steps)`](advanced_prompting.py#L288)
- [`def solve_with_escalation(question, examples, client, model)`](advanced_prompting.py#L336)
- [`def run_comparison(questions, expected_answers, examples, client, model)`](advanced_prompting.py#L365)
- [`def build_structured_prompt(question, context)`](advanced_prompting.py#L398)
- [`def prompt_chain_solve(question, client, model)`](advanced_prompting.py#L430)

## Run and test

From this folder:

```
python advanced_prompting.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
