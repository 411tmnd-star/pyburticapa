# How it works: Sampling Methods

## `sampling.py`

Functions and classes, in file order (click to jump to the line):

- [`def sample_uniform(a, b)`](sampling.py#L7)
- [`def sample_exponential_inverse_cdf(lam)`](sampling.py#L11)
- [`def verify_inverse_cdf(lam, n)`](sampling.py#L16)
- [`def normal_pdf(x, mu, sigma)`](sampling.py#L25)
- [`def sample_normal_box_muller(mu, sigma)`](sampling.py#L31)
- [`def rejection_sample(target_pdf, proposal_sample, proposal_pdf, M)`](sampling.py#L38)
- [`def rejection_sample_batch(target_pdf, proposal_sample, proposal_pdf, M, n)`](sampling.py#L48)
- [`def truncated_normal_demo(mu, sigma, a, b, n)`](sampling.py#L59)
- [`def importance_sampling_estimate(f, target_pdf, proposal_pdf, proposal_sample, n)`](sampling.py#L86)
- [`def importance_sampling_demo()`](sampling.py#L99)
- [`def monte_carlo_pi(n)`](sampling.py#L127)
- [`def monte_carlo_integral(f, a, b, n)`](sampling.py#L137)
- [`def metropolis_hastings(target_log_pdf, x0, n_samples, burn_in, proposal_std)`](sampling.py#L145)
- [`def metropolis_hastings_2d(target_log_pdf, x0, y0, n_samples, burn_in, proposal_std)`](sampling.py#L167)
- [`def bimodal_log_pdf(x)`](sampling.py#L190)
- [`def gibbs_sampling_2d(rho, n_samples, burn_in)`](sampling.py#L196)
- [`def softmax(logits)`](sampling.py#L209)
- [`def sample_from_probs(probs)`](sampling.py#L216)
- [`def temperature_sample(logits, temperature)`](sampling.py#L226)
- [`def temperature_distribution(logits, temperature)`](sampling.py#L234)
- [`def top_k_sample(logits, k)`](sampling.py#L243)
- [`def top_k_distribution(logits, k)`](sampling.py#L252)
- [`def top_p_sample(logits, p)`](sampling.py#L264)
- [`def top_p_distribution(logits, p)`](sampling.py#L281)
- [`def reparam_sample(mu, sigma)`](sampling.py#L298)
- [`def reparam_gradient(epsilon)`](sampling.py#L304)
- [`def vae_forward_demo(mu, log_var)`](sampling.py#L310)
- [`def gumbel_sample()`](sampling.py#L324)
- [`def gumbel_max_sample(log_probs)`](sampling.py#L331)
- [`def gumbel_softmax_sample(log_probs, temperature)`](sampling.py#L336)
- [`def gumbel_softmax_straight_through(log_probs, temperature)`](sampling.py#L342)
- [`def stratified_sample_1d(n)`](sampling.py#L350)
- [`def compare_sampling_variance(f, n, n_trials)`](sampling.py#L358)
- [`def text_generation_demo(vocab, logits, length, method)`](sampling.py#L380)

## Run and test

From this folder:

```
python sampling.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
