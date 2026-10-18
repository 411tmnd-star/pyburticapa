# How it works: Stochastic Processes

## `stochastic.py`

Functions and classes, in file order (click to jump to the line):

- [`def random_walk_1d(n_steps, seed)`](stochastic.py#L4)
- [`def random_walk_2d(n_steps, seed)`](stochastic.py#L11)
- [`class MarkovChain`](stochastic.py#L25)
  - [`def step(self, current_state, rng)`](stochastic.py#L31)
  - [`def simulate(self, start_state, n_steps, seed)`](stochastic.py#L37)
  - [`def stationary_distribution(self)`](stochastic.py#L46)
  - [`def empirical_distribution(self, states)`](stochastic.py#L58)
- [`def langevin_dynamics(grad_U, x0, dt, temperature, n_steps, seed)`](stochastic.py#L65)
- [`def metropolis_hastings(target_log_prob, proposal_std, x0, n_samples, seed)`](stochastic.py#L76)
- [`def diffusion_forward(signal, n_steps, beta_start, beta_end, seed)`](stochastic.py#L94)
- [`def demo_random_walks()`](stochastic.py#L106)
- [`def demo_markov_chain()`](stochastic.py#L134)
- [`def demo_langevin()`](stochastic.py#L168)
- [`def demo_metropolis_hastings()`](stochastic.py#L196)
- [`def demo_diffusion()`](stochastic.py#L236)

## Run and test

From this folder:

```
python stochastic.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
