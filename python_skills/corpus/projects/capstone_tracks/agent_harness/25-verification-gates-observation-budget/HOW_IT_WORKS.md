# How it works: Capstone Lesson 25: Verification Gates and the Observation Budget

## `main.py`

```text
Verification gates and observation budget for an agent harness.

See: phases/19-capstone-projects/25-verification-gates-observation-budget/docs/en.md
Concept refs:
  - Gate-chain pattern (cheapest deny first, allow last).
  - Observation budget as a deterministic stopping criterion.
The demo at the bottom runs a synthetic three-turn loop and exits zero.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ToolCall`](main.py#L26): A request from the model to invoke a tool.
  - [`def to_dict(self)`](main.py#L34)
- [`class Observation`](main.py#L44): The text the model is shown after a tool call.
  - [`def to_dict(self)`](main.py#L52)
- [`class GateDecision`](main.py#L61): A single gate's verdict.
  - [`def to_dict(self)`](main.py#L68)
- [`def estimate_tokens(text)`](main.py#L77): A deterministic, conservative stand-in for a real tokenizer.
- [`class ObservationLedger`](main.py#L95): Append-only ledger of every observation the model has been shown.
  - [`def record(self, obs)`](main.py#L100)
  - [`def cumulative(self)`](main.py#L103)
  - [`def per_tool(self, name)`](main.py#L106)
  - [`def turns_seen(self)`](main.py#L109)
  - [`def latest_turn(self)`](main.py#L112)
  - [`def snapshot(self)`](main.py#L115)
- [`class GateContext`](main.py#L125): Read-only context passed to every gate.
- [`class VerificationGate`](main.py#L133)
  - [`def evaluate(self, call, ctx)`](main.py#L136)
- [`class WhitelistGate`](main.py#L145): Refuse any tool not in the explicit allow-set. Cheapest gate.
  - [`def evaluate(self, call, ctx)`](main.py#L151)
- [`class RegexGate`](main.py#L162): Refuse a call whose argv joins to a string matching any refuse pattern.
  - [`def from_strings(cls, patterns, name)`](main.py#L169)
  - [`def evaluate(self, call, ctx)`](main.py#L173)
- [`class RecencyGate`](main.py#L184): Refuse a call if the last observation is more than window turns old.
  - [`def evaluate(self, call, ctx)`](main.py#L194)
- [`class BudgetGate`](main.py#L209): Refuse a call once the cumulative observation budget is exhausted.
  - [`def evaluate(self, call, ctx)`](main.py#L221)
- [`class PerToolBudgetGate`](main.py#L236): Optional gate: refuse if a single tool has consumed more than its share.
  - [`def evaluate(self, call, ctx)`](main.py#L242)
- [`class ChainOutcome`](main.py#L264): The full result of a chain evaluation: the per-gate decisions plus a final verdict.
  - [`def allow(self)`](main.py#L270)
  - [`def deny_reason(self)`](main.py#L274)
  - [`def to_dict(self)`](main.py#L280)
- [`class GateChain`](main.py#L289): Ordered list of gates evaluated with short-circuit on first deny.
  - [`def evaluate(self, call, ctx)`](main.py#L294)
- [`class LoopReport`](main.py#L313): Audit record of a synthetic loop run.
  - [`def to_dict(self)`](main.py#L322)
- [`def run_synthetic_loop(calls, chain, tool_fns)`](main.py#L332): Run a fixed sequence of tool calls through the chain.
- [`def _demo_tools()`](main.py#L390): Three synthetic tools. read_file is verbose, list_dir is small, run_tests is structured.
- [`def build_default_chain(budget)`](main.py#L411): Wire the canonical four-gate chain in the order documented in en.md.
- [`def run_demo()`](main.py#L432): Self-terminating demo. Prints a JSON trace and exits zero.

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
