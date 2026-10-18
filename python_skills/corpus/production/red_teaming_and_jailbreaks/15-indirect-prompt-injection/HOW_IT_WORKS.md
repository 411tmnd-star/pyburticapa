# How it works: Indirect Prompt Injection — Production Attack Surface

## `main.py`

```text
Indirect prompt injection harness — stdlib Python.

Toy agent with three tools:
  search(query)  -> returns a retrieved document (possibly attacker-controlled)
  read_email()   -> returns the first email in the inbox
  send(to, body) -> sends a message

Environment contains an attacker-controlled email that instructs the agent
to exfiltrate data. Three agents compared:
  naive          : concatenates tool output to prompt, follows instructions.
  keyword_filter : filters retrieved content for obvious injection keywords.
  ifc            : information-flow control; untrusted content cannot trigger
                   actions without a trusted ratification.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class AgentResult`](main.py#L38)
- [`def tool_read_email()`](main.py#L42)
- [`def tool_send(to, body, result)`](main.py#L46)
- [`def naive_agent()`](main.py#L50)
- [`def filter_keyword(text)`](main.py#L64): Crude injection filter. Returns True iff the text appears to contain
- [`def keyword_filter_agent()`](main.py#L73)
- [`def ifc_agent()`](main.py#L89): Information-flow control: retrieved content is tagged 'untrusted' and
- [`def attack(with_adaptive)`](main.py#L107): Run the attack against each agent.
- [`def main()`](main.py#L125)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
