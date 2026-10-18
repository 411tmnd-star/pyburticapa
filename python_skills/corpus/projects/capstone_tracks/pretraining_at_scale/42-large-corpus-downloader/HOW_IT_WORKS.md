# How it works: Large Corpus Downloader

## `main.py`

```text
Streaming corpus downloader with resume, MinHash plus LSH dedup, and a shard manifest.

Pulls compressed shards from a list of URLs, streams them through a Zstandard
decompressor, iterates JSONL documents, fingerprints each document with MinHash,
buckets the signature with locality-sensitive hashing, drops near-duplicates,
and writes a per-corpus manifest.

The demo at the bottom builds a small synthetic corpus on disk, compresses it
with Zstandard, exposes it via a file URL, downloads it through this module,
and prints the manifest. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ShardPlan`](main.py#L47): One row of the planned shard list.
- [`class ShardResult`](main.py#L56): Per-shard download and dedup outcome.
  - [`def to_manifest_row(self)`](main.py#L68)
- [`class DocVerdict`](main.py#L73): One document's dedup verdict.
- [`class CheckpointState`](main.py#L83): Resume checkpoint persisted next to the shard.
  - [`def to_json(self)`](main.py#L91)
  - [`def from_json(cls, text)`](main.py#L95)
- [`def _hash_seed_pair(seed)`](main.py#L105): Derive two 64-bit coefficients (a, b) from a seed.
- [`class MinHasher`](main.py#L119): MinHash signature builder with a fixed family of hash seeds.
  - [`def shingles(self, text)`](main.py#L131): Return overlapping whitespace-token shingles.
  - [`def _hash_shingle(shingle)`](main.py#L143)
  - [`def signature(self, text)`](main.py#L147): Return the MinHash signature as a list of num_hashes 64-bit ints.
- [`class LSHIndex`](main.py#L165): Locality-sensitive hashing index over MinHash signatures.
  - [`def _band_key(band)`](main.py#L185)
  - [`def query(self, signature)`](main.py#L188): Return the doc id of a near-duplicate keeper or None.
  - [`def insert(self, doc_id, signature)`](main.py#L199)
  - [`def jaccard_estimate(self, doc_a, doc_b)`](main.py#L206): Return an unbiased Jaccard estimate between two indexed docs.
- [`class Dedup`](main.py#L215): Combine MinHasher and LSHIndex into a streaming dedup.
  - [`def evaluate(self, shard_id, doc_index, text)`](main.py#L222)
- [`class ZstdDocIterator`](main.py#L237): Iterate JSONL documents from a Zstandard-compressed byte stream.
- [`class StreamingDownloader`](main.py#L257): Stream a remote URL to a local path with Range-resume and checkpointing.
  - [`def _paths_for(self, shard_id)`](main.py#L277)
  - [`def _read_checkpoint(self, checkpoint_path)`](main.py#L282)
  - [`def _write_checkpoint(self, checkpoint_path, state)`](main.py#L290)
  - [`def _verify_partial(self, shard_path, state)`](main.py#L295)
  - [`def download(self, plan)`](main.py#L312)
- [`class ShardPlanner`](main.py#L411): Turn a list of URLs into a planned shard list.
  - [`def from_urls(urls)`](main.py#L415)
- [`class ManifestWriter`](main.py#L423): Collect shard results into a manifest with its own content hash.
  - [`def add_shard(self, result)`](main.py#L430)
  - [`def add_verdict(self, verdict)`](main.py#L433)
  - [`def write(self, manifest_path)`](main.py#L436)
  - [`def shards(self)`](main.py#L451)
  - [`def verdicts(self)`](main.py#L455)
- [`def process_shard(plan, downloader, dedup, manifest)`](main.py#L459): Download, decompress, dedup, and account for one shard.
- [`def build_demo_corpus(directory)`](main.py#L484): Build a tiny synthetic corpus with duplicates and write zst shards.
- [`def run_demo()`](main.py#L514)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
