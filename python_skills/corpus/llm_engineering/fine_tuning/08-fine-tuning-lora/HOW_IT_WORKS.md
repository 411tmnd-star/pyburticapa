# How it works: Fine-Tuning with LoRA & QLoRA

## `lora.py`

Functions and classes, in file order (click to jump to the line):

- [`class LoRALayer`](lora.py#L6)
  - [`def forward(self, x)`](lora.py#L16)
- [`class LinearWithLoRA`](lora.py#L20)
  - [`def forward(self, x)`](lora.py#L31)
- [`def inject_lora(model, target_modules, rank, alpha)`](lora.py#L35)
- [`def count_parameters(model)`](lora.py#L55)
- [`def merge_lora_weights(model)`](lora.py#L67)
- [`def quantize_to_nf4(tensor, block_size)`](lora.py#L83)
- [`def dequantize_from_nf4(quantized, scales, original_shape, pad_size)`](lora.py#L99)
- [`def quantize_model(model)`](lora.py#L107)
- [`def train_lora(model, data, epochs, lr, batch_size)`](lora.py#L122)
- [`def save_lora_adapter(model, path)`](lora.py#L155)
- [`def load_lora_adapter(model, path)`](lora.py#L167)
- [`def create_demo_model(d_model, hidden, n_classes)`](lora.py#L178)
- [`def create_demo_data(n_samples, d_model, n_classes)`](lora.py#L188)

## Run and test

From this folder:

```
python lora.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
