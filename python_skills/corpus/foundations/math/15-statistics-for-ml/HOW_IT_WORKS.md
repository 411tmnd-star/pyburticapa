# How it works: Statistics for Machine Learning

## `statistics.py`

Functions and classes, in file order (click to jump to the line):

- [`def mean(data)`](statistics.py#L7)
- [`def median(data)`](statistics.py#L11)
- [`def mode(data)`](statistics.py#L20)
- [`def variance(data, sample)`](statistics.py#L30)
- [`def std_dev(data, sample)`](statistics.py#L39)
- [`def percentile(data, p)`](statistics.py#L43)
- [`def iqr(data)`](statistics.py#L54)
- [`def covariance(x, y, sample)`](statistics.py#L58)
- [`def pearson_correlation(x, y)`](statistics.py#L68)
- [`def rank_data(data)`](statistics.py#L80)
- [`def spearman_correlation(x, y)`](statistics.py#L95)
- [`def covariance_matrix(data)`](statistics.py#L101)
- [`def t_statistic_one_sample(data, mu_0)`](statistics.py#L117)
- [`def t_statistic_two_sample(data1, data2)`](statistics.py#L124)
- [`def welch_df(data1, data2)`](statistics.py#L137)
- [`def t_cdf_approx(t_val, df)`](statistics.py#L149)
- [`def _regularized_beta(x, a, b)`](statistics.py#L156)
- [`def _beta_continued_fraction(x, a, b, max_iter, tol)`](statistics.py#L169)
- [`def _log_beta_function(a, b)`](statistics.py#L206)
- [`def _beta_function(a, b)`](statistics.py#L210)
- [`def p_value_two_sided(t_val, df)`](statistics.py#L214)
- [`def one_sample_ttest(data, mu_0)`](statistics.py#L219)
- [`def two_sample_ttest(data1, data2)`](statistics.py#L227)
- [`def paired_ttest(data1, data2)`](statistics.py#L234)
- [`def chi_squared_test(observed, expected)`](statistics.py#L239)
- [`def chi_squared_p_value(chi2, df)`](statistics.py#L248)
- [`def _lower_incomplete_gamma_ratio(a, x)`](statistics.py#L254)
- [`def _gamma_series(a, x, max_iter, tol)`](statistics.py#L262)
- [`def _gamma_continued_fraction(a, x, max_iter, tol)`](statistics.py#L275)
- [`def bootstrap_statistic(data, stat_func, n_bootstrap, ci)`](statistics.py#L298)
- [`def bootstrap_compare(data1, data2, stat_func, n_bootstrap, ci)`](statistics.py#L319)
- [`def cohens_d(data1, data2)`](statistics.py#L343)
- [`def interpret_cohens_d(d)`](statistics.py#L356)
- [`def bonferroni_correction(p_values, alpha)`](statistics.py#L367)
- [`def generate_normal(n, mu, sigma)`](statistics.py#L380)
- [`def ab_test_simulator(n_per_group, true_effect, base_mean, base_std, alpha)`](statistics.py#L394)
- [`def run_multiple_ab_tests(n_tests, n_per_group, true_effect, alpha)`](statistics.py#L422)
- [`def statistical_vs_practical_significance(small_n, large_n, effect)`](statistics.py#L451)

## Run and test

From this folder:

```
python statistics.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
