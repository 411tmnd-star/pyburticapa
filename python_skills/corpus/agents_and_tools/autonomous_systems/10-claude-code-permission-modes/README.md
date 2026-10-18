# Permission Modes for Autonomous Agents

A permission ladder — graduated levels of autonomy from review-every-action to approve-everything — is how a harness governs what an autonomous agent may do without asking. Claude Code, this lesson's worked example, exposes six such modes: "plan" asks before every action, "default" (labeled "Manual" in the UI) asks only for risky ones, "acceptEdits" auto-approves file writes but still confirms shell execution, and "bypassPermissions" approves everything. Auto Mode — the `auto` permission mode — replaces per-action approval with a separate classifier model that reviews each action before it runs and blocks anything that escalates beyond what the request asked for. Action budgets are enforced via `max_turns` and `max_budget_usd`. Availability of `auto` depends on plan, org enablement, model, and provider — and Anthropic is explicit that the classifier is not sufficient alone.

```
python main.py
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
