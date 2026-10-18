# How it works: DPO: Direct Preference Optimization

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`def tokenize_sequence(text, vocab_size)`](code/main.py#L48)
- [`def compute_sequence_log_prob(model, prompt_tokens, response_tokens, max_seq_len)`](code/main.py#L52)
- [`def sigmoid(x)`](code/main.py#L88)
- [`def dpo_loss(policy_logprob_preferred, policy_logprob_rejected, ref_logprob_preferred, ref_logprob_rejected, beta)`](code/main.py#L94)
- [`def copy_model_weights(source, target)`](code/main.py#L121)
- [`def dpo_train(policy_model, reference_model, preference_data, num_epochs, lr, beta, max_seq_len)`](code/main.py#L141)
- [`def evaluate_preference_accuracy(model, reference_model, preference_data, beta, max_seq_len)`](code/main.py#L222)
- [`def analyze_implicit_rewards(model, reference_model, preference_data, beta, max_seq_len)`](code/main.py#L256)
- [`def beta_sensitivity_analysis(sft_model, preference_data, betas, max_seq_len)`](code/main.py#L299)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
