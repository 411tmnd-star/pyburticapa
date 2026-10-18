# How it works: Initialization Scripts for Agents

## `main.py`

```text
Deterministic agent initialization script.

Runs probes (runtime, deps, test command, env, state freshness, last-known-good
diff, timing budget), writes init_report.json, supports prereqs.lock TTL
short-circuit, and exits non-zero when any block-severity probe fails.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Probe`](main.py#L46)
- [`def _timed(probe_fn)`](main.py#L53)
- [`def probe_runtime()`](main.py#L66)
- [`def probe_dependencies()`](main.py#L74)
- [`def probe_test_command()`](main.py#L82)
- [`def probe_env()`](main.py#L89)
- [`def probe_state_freshness()`](main.py#L97)
- [`def probe_lkg_diff()`](main.py#L108): Refuse to launch when diff against last-known-good exceeds the file budget.
- [`def _deps_fingerprint()`](main.py#L139)
- [`def lock_is_fresh()`](main.py#L148): Cache pattern: re-use prior probe pass when nothing material changed.
- [`def write_lock()`](main.py#L171)
- [`def run_probes()`](main.py#L177)
- [`def main(argv)`](main.py#L188)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
