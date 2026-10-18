# How it works: HDF5 Tokenized Corpus

## `main.py`

```text
Streaming tokenization into resizable, sharded HDF5 datasets with mmap reads.

Implements:
- A byte-level deterministic Tokenizer.
- An HDF5ShardWriter that buffers tokens to chunk size and resizes the dataset
  in fixed-size strides, recording token_count and sha256 as dataset attributes.
- A ShardedTokenizationPipeline that emits one HDF5 per source shard and writes
  a shards.json index.
- An MmapTokenStore that opens shard files in swmr mode for read access.
- A SlidingWindowDataloader that yields fixed-length (input, target) pairs.

The demo at the bottom builds an in-memory corpus, tokenizes into shards, opens
them via memory map, runs the dataloader for a few batches, and prints the
per-batch shape and a checksum. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ShardWriteResult`](main.py#L46): Per-shard write outcome.
  - [`def to_dict(self)`](main.py#L56)
- [`class ShardIndexEntry`](main.py#L61): Index row used by readers to locate a shard.
  - [`def to_dict(self)`](main.py#L71)
- [`class Tokenizer`](main.py#L75): Byte-level deterministic tokenizer.
  - [`def encode(self, text)`](main.py#L92)
  - [`def decode(self, ids)`](main.py#L98)
- [`class HDF5ShardWriter`](main.py#L103): Stream tokens into a resizable HDF5 dataset with chunk-sized buffering.
  - [`def add_document(self, token_ids)`](main.py#L154)
  - [`def add_boundary(self)`](main.py#L161): Inject the separator token between documents.
  - [`def _flush_buffer(self, final)`](main.py#L168)
  - [`def token_count(self)`](main.py#L186)
  - [`def document_count(self)`](main.py#L190)
  - [`def result(self, shard_id)`](main.py#L193)
- [`class ShardedTokenizationPipeline`](main.py#L204): Tokenize iterable shard inputs into HDF5 files and write a shards.json.
  - [`def write_shard(self, shard_id, documents)`](main.py#L218)
  - [`def write_corpus(self, shards)`](main.py#L227)
- [`class MmapTokenStore`](main.py#L254): Memory-mapped read access to a sharded HDF5 token corpus.
  - [`def total_tokens(self)`](main.py#L285)
  - [`def close(self)`](main.py#L288)
  - [`def get_slice(self, start, stop)`](main.py#L303)
- [`class SlidingWindowDataloader`](main.py#L333): Random sliding-window sampler over a flat token stream.
  - [`def _sample_window(self)`](main.py#L357)
  - [`def take(self, num_batches)`](main.py#L370)
- [`class JSONLSource`](main.py#L375): Adapter that yields documents from a JSONL file with a configurable key.
- [`def pack_documents(tokenizer, documents, max_tokens)`](main.py#L410): Pack tokenized documents into fixed-length groups with boundary tokens.
- [`def tokenize_jsonl_path(jsonl_path, output_dir, shard_id, chunk_size, text_field)`](main.py#L437): Convenience wrapper: tokenize one JSONL file into one HDF5 shard.
- [`def load_index(index_path)`](main.py#L452): Read shards.json and return ShardIndexEntry rows.
- [`def validate_corpus(index_entries)`](main.py#L471): Recompute each shard's sha256 over its on-disk tokens and report mismatches.
- [`def build_demo_corpus()`](main.py#L486): Two shards of synthetic documents long enough to exercise mmap reads.
- [`def run_demo()`](main.py#L504): Build a demo corpus, tokenize it, validate it, and run the dataloader.

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
