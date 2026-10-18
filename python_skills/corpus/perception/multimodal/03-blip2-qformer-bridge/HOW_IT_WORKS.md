# How it works: From CLIP to BLIP-2 — Q-Former as Modality Bridge

## `main.py`

```text
Q-Former cross-attention toy — stdlib Python.

Builds a minimal BLIP-2-style modality bridge:
  - 256 "patch tokens" from a fake ViT
  - 32 learnable query vectors
  - one cross-attention block (Q from queries, K/V from patches)
  - linear projection to an LLM hidden dim
  - prints attention weights so the reader can see which patch each query
    pulled from

Pure Python vectors and lists. No numpy, no torch. The arithmetic is slow
but exact; good for inspecting behaviour.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def vec(n)`](main.py#L29)
- [`def mat(rows, cols)`](main.py#L33)
- [`def matmul_vec(M, v)`](main.py#L37)
- [`def dot(a, b)`](main.py#L41)
- [`def softmax(xs)`](main.py#L45)
- [`def make_patches()`](main.py#L52): Fake 64 'patch tokens' of dim 16 from a frozen ViT.
- [`def make_queries()`](main.py#L57): 32 learnable query vectors, dim 16.
- [`def cross_attention(queries, patches, W_q, W_k, W_v)`](main.py#L62): Scaled dot-product cross-attention.
- [`def linear_project(xs, W)`](main.py#L92)
- [`def top_patches_per_query(attn, k)`](main.py#L97)
- [`def summarize_attention(attn)`](main.py#L105)
- [`def demo_untrained()`](main.py#L121)
- [`def demo_biased()`](main.py#L137): Show that if queries learn to align with specific patches, attention
- [`def main()`](main.py#L161)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
