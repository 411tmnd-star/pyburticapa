# How it works: ML Pipelines

## `pipeline.py`

Functions and classes, in file order (click to jump to the line):

- [`def make_mixed_data(n_samples, seed)`](pipeline.py#L6)
- [`def train_test_split_dict(data, test_ratio, seed)`](pipeline.py#L47)
- [`class MedianImputer`](pipeline.py#L59)
  - [`def fit(self, X)`](pipeline.py#L63)
  - [`def transform(self, X)`](pipeline.py#L67)
  - [`def fit_transform(self, X)`](pipeline.py#L74)
- [`class StandardScaler`](pipeline.py#L78)
  - [`def fit(self, X)`](pipeline.py#L83)
  - [`def transform(self, X)`](pipeline.py#L89)
  - [`def fit_transform(self, X)`](pipeline.py#L92)
- [`class OneHotEncoder`](pipeline.py#L96)
  - [`def fit(self, X)`](pipeline.py#L101)
  - [`def transform(self, X)`](pipeline.py#L107)
  - [`def fit_transform(self, X)`](pipeline.py#L115)
- [`class PipelineFromScratch`](pipeline.py#L119)
  - [`def fit(self, X, y)`](pipeline.py#L123)
  - [`def predict(self, X)`](pipeline.py#L131)
  - [`def score(self, X, y)`](pipeline.py#L138)
- [`class ColumnTransformerScratch`](pipeline.py#L143)
  - [`def fit(self, data)`](pipeline.py#L147)
  - [`def transform(self, data)`](pipeline.py#L153)
  - [`def fit_transform(self, data)`](pipeline.py#L160)
- [`class TransformerPipeline`](pipeline.py#L164)
  - [`def fit(self, X)`](pipeline.py#L168)
  - [`def transform(self, X)`](pipeline.py#L174)
  - [`def fit_transform(self, X)`](pipeline.py#L180)
- [`class LogisticRegressionSimple`](pipeline.py#L184)
  - [`def _sigmoid(self, z)`](pipeline.py#L191)
  - [`def fit(self, X, y)`](pipeline.py#L194)
  - [`def predict(self, X)`](pipeline.py#L207)
  - [`def predict_proba(self, X)`](pipeline.py#L211)
- [`class DecisionTreeSimple`](pipeline.py#L217)
  - [`def fit(self, X, y)`](pipeline.py#L222)
  - [`def _gini(self, y)`](pipeline.py#L225)
  - [`def _build(self, X, y, depth)`](pipeline.py#L231)
  - [`def predict(self, X)`](pipeline.py#L262)
  - [`def _pred(self, x, node)`](pipeline.py#L265)
- [`def cross_validate_pipeline(pipeline_factory, data, n_folds, seed)`](pipeline.py#L273)
- [`class FullPipeline`](pipeline.py#L298)
  - [`def fit(self, data)`](pipeline.py#L309)
  - [`def predict(self, data)`](pipeline.py#L322)
  - [`def score(self, data)`](pipeline.py#L332)
- [`def demo_data_leakage()`](pipeline.py#L337)
- [`def demo_pipeline_from_scratch()`](pipeline.py#L376)
- [`def demo_full_pipeline()`](pipeline.py#L403)
- [`def demo_cross_validation()`](pipeline.py#L427)
- [`def demo_unknown_categories()`](pipeline.py#L451)
- [`def demo_model_comparison()`](pipeline.py#L472)
- [`def demo_sklearn_pipeline()`](pipeline.py#L500)
- [`def demo_experiment_tracking()`](pipeline.py#L562)
- [`def demo_reproducibility()`](pipeline.py#L616)

## Run and test

From this folder:

```
python pipeline.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
