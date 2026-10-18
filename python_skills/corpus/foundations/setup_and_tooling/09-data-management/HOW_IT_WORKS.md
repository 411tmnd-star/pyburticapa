# How it works: Data Management

## `data_utils.py`

Functions and classes, in file order (click to jump to the line):

- [`def load_and_inspect(dataset_name, config, split)`](data_utils.py#L22)
- [`def stream_dataset(dataset_name, config, max_rows)`](data_utils.py#L39)
- [`def convert_format(ds, output_dir, name)`](data_utils.py#L55)
- [`def make_splits(ds, train_ratio, val_ratio, seed)`](data_utils.py#L80)
- [`def download_model_file(repo_id, filename)`](data_utils.py#L102)
- [`def cache_summary()`](data_utils.py#L111)
- [`def load_from_parquet(path)`](data_utils.py#L129)
- [`def load_from_csv(path)`](data_utils.py#L135)
- [`def load_from_json(path)`](data_utils.py#L141)
- [`def fingerprint(ds, num_rows)`](data_utils.py#L147)

## Run and test

From this folder:

```
python data_utils.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
