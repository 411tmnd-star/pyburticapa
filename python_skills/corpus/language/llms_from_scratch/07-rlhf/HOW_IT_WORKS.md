# How it works: RLHF: Reward Model + PPO

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class RewardModel`](code/main.py#L48)
  - [`def forward(self, token_ids)`](code/main.py#L65)
- [`def tokenize_for_reward(prompt, response, vocab_size)`](code/main.py#L80)
- [`def sigmoid(x)`](code/main.py#L86)
- [`def bradley_terry_loss(reward_preferred, reward_rejected)`](code/main.py#L92)
- [`def train_reward_model(rm, preference_data, num_epochs, lr, max_seq_len)`](code/main.py#L98)
- [`def compute_kl_divergence(policy_logits, reference_logits)`](code/main.py#L163)
- [`def generate_response(model, prompt_tokens, max_new_tokens, temperature, max_seq_len)`](code/main.py#L178)
- [`def copy_model_weights(source, target)`](code/main.py#L200)
- [`def ppo_training(policy_model, reference_model, reward_model, prompts, num_episodes, lr, kl_coeff, max_seq_len)`](code/main.py#L220)
- [`def compare_models(sft_model, rlhf_model, reward_model, prompts, max_seq_len)`](code/main.py#L280)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
