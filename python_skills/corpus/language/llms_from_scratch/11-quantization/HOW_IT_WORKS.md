# How it works: Quantization: Making Models Fit

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`def float_to_fp32_bits(value)`](code/main.py#L4)
- [`def float_to_fp16_bits(value)`](code/main.py#L16)
- [`def float_to_bf16_bits(value)`](code/main.py#L29)
- [`def simulate_fp8_e4m3(value)`](code/main.py#L43)
- [`def display_format_comparison(value)`](code/main.py#L67)
- [`def quantize_symmetric(tensor, num_bits)`](code/main.py#L82)
- [`def dequantize_symmetric(quantized, scale)`](code/main.py#L93)
- [`def quantize_per_channel(tensor, num_bits, axis)`](code/main.py#L97)
- [`def dequantize_per_channel(quantized, scales, axis)`](code/main.py#L112)
- [`def quantize_asymmetric(tensor, num_bits)`](code/main.py#L119)
- [`def dequantize_asymmetric(quantized, scale, zero_point)`](code/main.py#L133)
- [`def quantization_error(original, reconstructed)`](code/main.py#L137)
- [`def compare_quantization_methods(tensor, num_bits)`](code/main.py#L158)
- [`def bit_width_sweep(tensor)`](code/main.py#L181)
- [`def simulate_transformer_layer(input_data, weights, kv_scale)`](code/main.py#L200)
- [`def sensitivity_experiment(batch_size, seq_len, d_model, num_bits)`](code/main.py#L217)
- [`def simulated_gptq(weight_matrix, calibration_inputs, num_bits)`](code/main.py#L275)
- [`def dequantize_gptq(quantized, scales)`](code/main.py#L323)
- [`def simulated_awq(weight_matrix, calibration_inputs, num_bits, salient_fraction)`](code/main.py#L330)
- [`def full_quantization_comparison(d_in, d_out, num_bits, n_calibration)`](code/main.py#L367)
- [`def memory_calculator(num_params_billions, bits_per_param)`](code/main.py#L419)
- [`def print_memory_table()`](code/main.py#L426)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
