# How it works: Runtime Feedback Loops

## `main.py`

```text
Wrap subprocess.run with structured capture, secret redaction, rotation, and command lineage.

Every shell command goes through run_with_feedback. Records carry argv, redacted
stdout/stderr tails, exit code, duration, started_at, agent note, and a
command_id/parent_command_id pair so retries trace back to their origin. The
JSONL file rotates at 1 MB to keep loader memory bounded.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class FeedbackRecord`](main.py#L43)
- [`def redact(text)`](main.py#L58): Strip secrets before the JSONL append. Read-time redaction is a foot-gun.
- [`def deterministic_tail(text, head, tail)`](main.py#L70)
- [`def _process_capture(text)`](main.py#L78): Truncate first, then redact. Returns (text, cut_lines, redaction_hits).
- [`def maybe_rotate()`](main.py#L85): Cap the active file at ROTATE_BYTES; rotate .1 .. .MAX, drop oldest.
- [`def run_with_feedback(command, agent_note, timeout_s, parent_command_id)`](main.py#L103)
- [`def loop_can_advance(record)`](main.py#L159): Refuse to advance the loop when exit code is missing.
- [`def load_all()`](main.py#L164): Read active + rotated files so parent-command lineage survives rotation.
- [`def retry_chain(command_id)`](main.py#L192): Walk parent_command_id pointers to reconstruct a retry chain.
- [`def main()`](main.py#L203)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
