# How it works: Instruction Tuning (SFT)

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`def tokenize_instruction_pair(instruction, response, vocab_size)`](code/main.py#L56)
- [`def create_loss_mask(tokens)`](code/main.py#L74)
- [`def masked_cross_entropy_loss(logits, targets, loss_mask)`](code/main.py#L88)
- [`def sft_train(model, dataset, num_epochs, lr, seq_len)`](code/main.py#L110)
- [`def generate_response(model, prompt_tokens, max_new_tokens, temperature)`](code/main.py#L172)
- [`def evaluate_instruction_following(model, instructions)`](code/main.py#L193)
- [`def measure_forgetting(model, test_text, seq_len)`](code/main.py#L216)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
