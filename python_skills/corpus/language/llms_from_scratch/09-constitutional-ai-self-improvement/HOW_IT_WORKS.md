# How it works: Constitutional AI and Self-Improvement

## `code/main.py`

```text
Constitutional AI self-critique + GRPO rule-reward loop.

Runs end-to-end in pure stdlib + numpy. The CAI loop uses a handwritten critic
that stands in for an LLM self-judge. The GRPO loop uses a deterministic math
grader as the reward source. Both loops produce the metrics you would wire
into a real optimizer.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def critique(response, principle)`](code/main.py#L26)
- [`def revise(response, critique_result)`](code/main.py#L40)
- [`def cai_stage_one(prompts_and_responses)`](code/main.py#L57)
- [`def reward_math(prompt, response)`](code/main.py#L76)
- [`def reward_format(response)`](code/main.py#L91)
- [`def combined_reward(prompt, response)`](code/main.py#L95)
- [`def group_relative_advantage(rewards)`](code/main.py#L99)
- [`def grpo_step(policy_logprobs, ref_logprobs, advantages, beta, clip_eps)`](code/main.py#L106)
- [`def mock_sampler(rng)`](code/main.py#L128): Stand-in for an LLM policy. Returns a string that sometimes contains
- [`def self_improvement_round(prompts, sampler, group_size)`](code/main.py#L156)
- [`def demo_constitutional_loop()`](code/main.py#L181)
- [`def demo_grpo_loop()`](code/main.py#L203)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
