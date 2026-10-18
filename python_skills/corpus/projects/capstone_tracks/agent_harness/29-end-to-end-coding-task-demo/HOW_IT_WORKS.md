# How it works: Capstone Lesson 29: End-to-End Coding Agent on the Harness

## `code/main.py`

```text
End-to-end coding agent on the Track A harness.

See: phases/19-capstone-projects/29-end-to-end-coding-task-demo/docs/en.md
Concept refs:
  - Verification gates + observation budget (Phase 19 · 25).
  - Sandbox runner with denylist + path jail (Phase 19 · 26).
  - Eval harness with fixture tasks (Phase 19 · 27).
  - OTel GenAI span shapes and Prometheus exposition (Phase 19 · 28).
The demo composes a deterministic policy with the minimal harness primitives
re-stated inline. Exits zero after solving the bundled fixture.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Observation`](code/main.py#L40)
- [`class ObservationLedger`](code/main.py#L48)
  - [`def record(self, obs)`](code/main.py#L51)
  - [`def cumulative(self)`](code/main.py#L54)
- [`def estimate_tokens(text)`](code/main.py#L58)
- [`class ToolCall`](code/main.py#L66)
- [`class GateDecision`](code/main.py#L74)
- [`class GateContext`](code/main.py#L81)
- [`class WhitelistGate`](code/main.py#L87)
  - [`def evaluate(self, call, ctx)`](code/main.py#L91)
- [`class RegexGate`](code/main.py#L100)
  - [`def from_strings(cls, items)`](code/main.py#L105)
  - [`def evaluate(self, call, ctx)`](code/main.py#L108)
- [`class BudgetGate`](code/main.py#L119)
  - [`def evaluate(self, call, ctx)`](code/main.py#L123)
- [`class ChainOutcome`](code/main.py#L135)
  - [`def allow(self)`](code/main.py#L139)
  - [`def deny_reason(self)`](code/main.py#L143)
- [`class GateChain`](code/main.py#L151)
  - [`def evaluate(self, call, ctx)`](code/main.py#L154)
- [`class SandboxResult`](code/main.py#L171)
  - [`def ok(self)`](code/main.py#L182)
- [`class Sandbox`](code/main.py#L187)
  - [`def _path_jail(self, argv)`](code/main.py#L198)
  - [`def run(self, argv)`](code/main.py#L214)
- [`class GenAISpan`](code/main.py#L278)
  - [`def duration_ms(self)`](code/main.py#L290)
  - [`def to_dict(self)`](code/main.py#L295)
- [`def _new_trace_id()`](code/main.py#L309)
- [`def _new_span_id()`](code/main.py#L313)
- [`class InMemoryExporter`](code/main.py#L317)
  - [`def export(self, span)`](code/main.py#L321)
- [`class JSONLExporter`](code/main.py#L325)
  - [`def export(self, span)`](code/main.py#L330)
  - [`def close(self)`](code/main.py#L337)
- [`class Counter`](code/main.py#L344)
  - [`def inc(self, labels)`](code/main.py#L348)
  - [`def get(self, labels)`](code/main.py#L352)
- [`class Histogram`](code/main.py#L357)
  - [`def observe(self, value, labels)`](code/main.py#L374)
  - [`def total_count(self, labels)`](code/main.py#L378)
- [`class MetricsRegistry`](code/main.py#L383)
  - [`def counter(self, name)`](code/main.py#L387)
  - [`def histogram(self, name)`](code/main.py#L392)
- [`def prometheus_text(reg)`](code/main.py#L398)
- [`class SpanBuilder`](code/main.py#L430)
  - [`def span(self, name, attributes, parent)`](code/main.py#L436)
- [`class AgentStep`](code/main.py#L478): One step taken by the agent loop.
  - [`def to_dict(self)`](code/main.py#L490)
- [`class AgentRunReport`](code/main.py#L504)
  - [`def to_dict(self)`](code/main.py#L512)
- [`class CodingAgentPolicy`](code/main.py#L524): Deterministic state machine that plays the role of a coding agent.
  - [`def next_action(self, last_obs)`](code/main.py#L540): Return (tool, argv, payload) for the next action.
  - [`def observe(self, tool, exit_code, text)`](code/main.py#L571): Update state based on the result of the last action.
- [`def tool_read_file(sandbox, argv)`](code/main.py#L617)
- [`def tool_write_file(sandbox, argv, payload)`](code/main.py#L631)
- [`def tool_run_tests(sandbox, argv)`](code/main.py#L647)
- [`def _fixture_root()`](code/main.py#L664)
- [`def prepare_scratch_repo()`](code/main.py#L668)
- [`class AgentRun`](code/main.py#L686)
  - [`def run(self)`](code/main.py#L694)
- [`def build_default_chain(budget)`](code/main.py#L810)
- [`def run_demo()`](code/main.py#L834)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
