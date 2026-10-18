# How it works: Norms and Distances

## `distances.py`

Functions and classes, in file order (click to jump to the line):

- [`def l1_norm(x)`](distances.py#L5)
- [`def l2_norm(x)`](distances.py#L9)
- [`def lp_norm(x, p)`](distances.py#L13)
- [`def linf_norm(x)`](distances.py#L19)
- [`def l1_distance(a, b)`](distances.py#L23)
- [`def l2_distance(a, b)`](distances.py#L27)
- [`def lp_distance(a, b, p)`](distances.py#L31)
- [`def linf_distance(a, b)`](distances.py#L36)
- [`def dot_product(a, b)`](distances.py#L40)
- [`def cosine_similarity(a, b)`](distances.py#L44)
- [`def cosine_distance(a, b)`](distances.py#L53)
- [`def mahalanobis_distance(x, y, cov_matrix)`](distances.py#L57)
- [`def invert_matrix(matrix)`](distances.py#L72)
- [`def jaccard_similarity(set_a, set_b)`](distances.py#L98)
- [`def jaccard_distance(set_a, set_b)`](distances.py#L106)
- [`def edit_distance(s1, s2)`](distances.py#L110)
- [`def kl_divergence(p, q)`](distances.py#L133)
- [`def wasserstein_1d(p, q)`](distances.py#L143)
- [`def compute_covariance(data)`](distances.py#L158)
- [`def normalize_vector(v)`](distances.py#L170)
- [`def find_nearest_neighbor(query, dataset, distance_fn)`](distances.py#L177)
- [`def find_k_nearest(query, dataset, distance_fn, k)`](distances.py#L188)
- [`def demo_norms()`](distances.py#L197)
- [`def demo_distances()`](distances.py#L220)
- [`def demo_cosine_vs_dot()`](distances.py#L241)
- [`def demo_mahalanobis()`](distances.py#L278)
- [`def demo_jaccard()`](distances.py#L320)
- [`def demo_edit_distance()`](distances.py#L341)
- [`def demo_kl_divergence()`](distances.py#L362)
- [`def demo_wasserstein()`](distances.py#L391)
- [`def demo_different_neighbors()`](distances.py#L429)
- [`def demo_embedding_search()`](distances.py#L491)
- [`def demo_knn_classification()`](distances.py#L566)
- [`def demo_regularization()`](distances.py#L613)
- [`def demo_norm_ordering()`](distances.py#L658)

## Run and test

From this folder:

```
python distances.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
