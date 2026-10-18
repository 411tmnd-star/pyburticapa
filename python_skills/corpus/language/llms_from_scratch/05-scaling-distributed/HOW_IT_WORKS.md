# How it works: Scaling: Distributed Training, FSDP, DeepSpeed

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`def simulate_data_parallelism(data, num_gpus, model_fn)`](code/main.py#L5)
- [`def simulate_tensor_parallelism(input_data, weight_matrix, num_gpus)`](code/main.py#L29)
- [`def simulate_pipeline_parallelism(num_layers, num_stages, num_microbatches)`](code/main.py#L51)
- [`def memory_calculator(params_billions, precision_bytes, optimizer, num_gpus, sharding, sequence_length, batch_size_per_gpu, hidden_dim, num_layers)`](code/main.py#L85)
- [`def mixed_precision_comparison(params_billions)`](code/main.py#L143)
- [`def communication_volume_calculator(params_billions, num_gpus, strategy)`](code/main.py#L170)
- [`def training_cost_estimator(params_billions, target_tokens_trillions, gpu_type, num_gpus, utilization)`](code/main.py#L199)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
