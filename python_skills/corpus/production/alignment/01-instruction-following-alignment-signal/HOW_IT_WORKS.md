# How it works: Instruction-Following as Alignment Signal

## `main.py`

```text
Toy three-stage RLHF pipeline — stdlib Python.

Simulates InstructGPT's SFT + RM + PPO loop on a bandit with three actions.
Watch reward climb, KL divergence grow, and the policy drift. Turn off the
KL penalty to see reward hacking appear. Pedagogical toy — no torch.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def softmax(logits)`](main.py#L22)
- [`def kl(p, q)`](main.py#L29)
- [`class Policy`](main.py#L34): Softmax policy over 3 actions. Logits are the trainable parameters.
  - [`def probs(self)`](main.py#L38)
  - [`def sample(self)`](main.py#L41)
  - [`def logprob(self, a)`](main.py#L50)
  - [`def copy(self)`](main.py#L53)
- [`def labeler_true_utility()`](main.py#L57): The 'human' rater prefers B, is neutral on A, slightly against C.
- [`def stage1_sft(n_demos)`](main.py#L62): Imitation learning from labeler demonstrations.
- [`def stage2_reward_model(n_pairs, bias)`](main.py#L91): Bradley-Terry fit of a scalar reward over actions.
- [`def stage3_ppo(sft, reward, beta, steps, batch, lr)`](main.py#L118): Toy REINFORCE-with-KL (a stripped-down PPO).
- [`def report(name, sft, rlhf, reward, r_traj, kl_traj)`](main.py#L160)
- [`def main()`](main.py#L172)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
