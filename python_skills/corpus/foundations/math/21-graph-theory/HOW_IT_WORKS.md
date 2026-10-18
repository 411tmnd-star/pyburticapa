# How it works: Graph Theory for Machine Learning

## `graph_theory.py`

Functions and classes, in file order (click to jump to the line):

- [`class Graph`](graph_theory.py#L5)
  - [`def add_edge(self, u, v, weight)`](graph_theory.py#L11)
  - [`def neighbors(self, node)`](graph_theory.py#L16)
  - [`def degree(self, node)`](graph_theory.py#L19)
  - [`def weighted_degree(self, node)`](graph_theory.py#L22)
  - [`def adjacency_matrix(self)`](graph_theory.py#L25)
  - [`def degree_matrix(self)`](graph_theory.py#L32)
  - [`def laplacian(self)`](graph_theory.py#L38)
- [`def bfs(graph, start)`](graph_theory.py#L56)
- [`def dfs(graph, start)`](graph_theory.py#L73)
- [`def connected_components(graph)`](graph_theory.py#L89)
- [`def spectral_clustering(graph, k)`](graph_theory.py#L100)
- [`def message_passing(graph, features, weight_matrix)`](graph_theory.py#L142)
- [`def pagerank(graph, damping, max_iter, tol)`](graph_theory.py#L153)
- [`def demo_social_network()`](graph_theory.py#L176)
- [`def demo_laplacian()`](graph_theory.py#L205)
- [`def demo_message_passing()`](graph_theory.py#L231)
- [`def demo_spectral_clustering()`](graph_theory.py#L263)

## Run and test

From this folder:

```
python graph_theory.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
