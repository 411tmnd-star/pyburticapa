# How it works: Sharded Checkpoint and Atomic Resume

## `code/main.py`

```text
Sharded checkpoint with atomic write and verified resume.

Saves a multi-rank training state as per-rank binary files plus a JSON
manifest. The write is atomic: every file lands at <name>.tmp first, the
manifest writes last, then a single rename moves everything to the final
names. A crash mid-write leaves the previous checkpoint intact.

Resume verifies the manifest schema (world_size, shard count, sha256 per
shard) and reconstructs per-rank state byte-equal to what was saved.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ShardEntry`](code/main.py#L32)
- [`class ShardManifest`](code/main.py#L41)
  - [`def to_json(self)`](code/main.py#L48)
  - [`def from_json(cls, text)`](code/main.py#L58)
- [`class CheckpointError`](code/main.py#L69): Raised when manifest validation or shard verification fails.
- [`def _sha256_bytes(data)`](code/main.py#L73)
- [`def _fsync_dir(path)`](code/main.py#L77): Fsync a directory so rename metadata reaches disk; no-op where unsupported.
- [`def _serialize_state(state)`](code/main.py#L91): Serialize a state dict deterministically using torch.save with pickle 4.
- [`def _deserialize_state(data)`](code/main.py#L99)
- [`def save_sharded(per_rank_state, dest_dir, step, wall_clock_seconds)`](code/main.py#L105): Write per-rank state files atomically; return the manifest written.
- [`def load_sharded(src_dir, expected_world_size)`](code/main.py#L159): Read the manifest, verify every shard, return (manifest, per-rank state list).
- [`def rotate_checkpoints(parent_dir, keep_last)`](code/main.py#L212): Delete oldest checkpoint directories so only the most recent keep_last remain.
- [`def make_demo_state(rank, world_size)`](code/main.py#L236): Construct a representative per-rank state for the demo.
- [`def main()`](code/main.py#L249)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
