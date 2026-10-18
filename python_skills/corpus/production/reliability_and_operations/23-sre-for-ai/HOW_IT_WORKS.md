# How it works: SRE for AI — Multi-Agent Incident Response, Runbooks, Predictive Detection

## `main.py`

```text
Multi-agent AI SRE triage simulator — stdlib Python.

Three specialized agents produce hypotheses; supervisor ranks by agreement.
Adversarial evaluation: disagreement escalates to human.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class AgentHypothesis`](main.py#L13)
- [`def log_agent(incident)`](main.py#L20)
- [`def metric_agent(incident)`](main.py#L32)
- [`def runbook_agent(incident)`](main.py#L42)
- [`def supervisor(hypotheses)`](main.py#L52)
- [`def main()`](main.py#L74)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
