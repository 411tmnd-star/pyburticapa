# How it works: Browser Agents and Long-Horizon Web Tasks

## `main.py`

```text
Indirect prompt-injection attack-surface simulator — stdlib Python.

Three synthetic pages (benign, visible-text injection, URL-fragment injection)
run against four defense configurations:

  1. naive (no defense) - baseline
  2. sanitizer only     - strip known-bad patterns from fetched HTML
  3. R/W boundary only  - reads free; writes require fresh approval from
                          trusted content only
  4. both               - sanitizer + R/W boundary

The agent is asked to: "read page, then post a comment to /api/post". A
posted comment is the consequential action. The indirect-prompt-injection
payload tries to redirect the comment to /api/exfil with sensitive data.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def sanitizer(html)`](main.py#L58): Return (sanitized_html, triggered_rules). Does NOT inspect URLs.
- [`def rw_boundary_allows(content_origin, action)`](main.py#L69): True if the consequential action is allowed given the content origin.
- [`class AgentResult`](main.py#L79)
- [`def run_agent(page, defense)`](main.py#L86)
- [`def main()`](main.py#L137)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
