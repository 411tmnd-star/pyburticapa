# How it works: Capstone Lesson 39: Instruction Tuning by Supervised Fine-Tuning

## `main.py`

```text
Instruction tuning by supervised fine-tuning (SFT).

See: phases/19-capstone-projects/39-instruction-tuning-sft/docs/en.md

Builds:
  - byte-level tokenizer with INST / RESP / PAD specials
  - SFT dataset over 200 instruction-response pairs
  - collate function that masks instruction + pad tokens with -100
  - TinyGPT (decoder-only transformer) body and LM head
  - SFT loop, greedy generator, exact-match metric
  - run_demo that trains for 20 epochs and prints per-category exact-match.

Exits 0 when the trained model beats the random baseline of 0.0 on the held-out set.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class InstructionTokenizer`](main.py#L37): Byte-level tokenizer with INST, RESP, PAD specials.
  - [`def encode_pair(self, instruction, response, max_len)`](main.py#L46): Return (token_ids, response_start_index). Truncates to max_len if
  - [`def encode_prefix(self, instruction, max_len)`](main.py#L62): Encode just the instruction prefix for generation. Always keeps the
  - [`def decode_response(self, ids)`](main.py#L71): Decode a generated response, dropping specials.
- [`class CausalSelfAttention`](main.py#L82)
  - [`def forward(self, x, key_pad_mask)`](main.py#L94)
- [`class Block`](main.py#L111)
  - [`def forward(self, x, key_pad_mask)`](main.py#L120)
- [`class TinyGPT`](main.py#L127)
  - [`def forward(self, ids, key_pad_mask)`](main.py#L137)
- [`def _arithmetic_response(a, b, op)`](main.py#L230)
- [`def make_dataset(seed)`](main.py#L242): Returns (pairs, categories). Each pair has instruction, response.
- [`def split_dataset(pairs, cats, test_frac, seed)`](main.py#L343): Stratified split by category.
- [`class SFTDataset`](main.py#L377)
- [`def sft_collate(batch, pad_id, ignore_index)`](main.py#L397): Pad to longest in batch and build labels with -100 mask on instruction + pad.
- [`def shifted_loss(logits, labels, ignore_index)`](main.py#L432): Standard causal LM loss: predict next token, ignore the masked positions.
- [`class SFTConfig`](main.py#L452)
- [`def build_model(cfg)`](main.py#L464)
- [`class SFTReport`](main.py#L470)
- [`def train_sft(model, train_loader, cfg, eval_pairs, tok, eval_every, log)`](main.py#L476)
- [`def generate(model, tok, instruction, max_len, temperature, max_new_tokens, seed)`](main.py#L514): Greedy (temperature=0) or sampled generation. Stops on two consecutive sentence-ends.
- [`def normalise(text)`](main.py#L563)
- [`def exact_match(pred, gold)`](main.py#L570)
- [`def exact_match_set(model, tok, pairs, max_len)`](main.py#L575)
- [`def per_category_em(model, tok, pairs, cats, max_len)`](main.py#L590)
- [`def run_demo(cfg)`](main.py#L609)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
