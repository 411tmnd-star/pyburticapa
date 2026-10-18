# How it works: Swarm Optimization for LLMs (PSO, ACO)

## `main.py`

```text
PSO for LLM parameter optimization and ACO for agent routing, stdlib only.

PSO runs on a 2D parameter space (temperature, top_k_weight) with a scripted
fitness proxy. AMRO-S simulates 3 agents handling 4 task types with a
pheromone matrix that strengthens on quality, decays over time.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Particle`](main.py#L17)
- [`def fitness(x)`](main.py#L24): Rastrigin-style fitness: narrow peak at (0.72, 0.40) with ripples.
- [`def run_lmpso(n_particles, iterations, seed)`](main.py#L34)
- [`class PheromoneRouter`](main.py#L75)
  - [`def choose(self, task_type, rng)`](main.py#L86)
  - [`def deposit(self, task_type, agent, quality)`](main.py#L97)
- [`def simulate_task(agent, task_type, rng)`](main.py#L111)
- [`def run_amro_s(n_tasks, seed)`](main.py#L116)
- [`def print_pheromone_table(router)`](main.py#L142)
- [`def main()`](main.py#L149)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
