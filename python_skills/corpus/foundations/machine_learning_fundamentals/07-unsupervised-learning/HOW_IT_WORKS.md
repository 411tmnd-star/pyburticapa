# How it works: Unsupervised Learning

## `clustering.py`

Functions and classes, in file order (click to jump to the line):

- [`def euclidean_distance(a, b)`](clustering.py#L5)
- [`def kmeans(data, k, max_iterations, seed)`](clustering.py#L9)
- [`def compute_inertia(data, assignments, centroids)`](clustering.py#L48)
- [`def silhouette_score(data, assignments)`](clustering.py#L55)
- [`def find_best_k(data, max_k)`](clustering.py#L93)
- [`def dbscan(data, eps, min_samples)`](clustering.py#L111)
- [`def gmm(data, k, max_iterations, seed)`](clustering.py#L162)
- [`def agglomerative_clustering(data, n_clusters, linkage)`](clustering.py#L224)
- [`def make_blobs(centers, n_per_cluster, spread, seed)`](clustering.py#L305)
- [`def make_moons(n_samples, noise, seed)`](clustering.py#L318)

## Run and test

From this folder:

```
python clustering.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
