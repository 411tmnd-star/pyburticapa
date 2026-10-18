# How it works: Context Engineering: Windows, Budgets, Memory, and Retrieval

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def count_tokens(text)`](main.py#L6)
- [`def count_tokens_json(obj)`](main.py#L12)
- [`class ContextBudget`](main.py#L16)
  - [`def allocate(self, component, content, max_tokens)`](main.py#L23)
  - [`def remaining(self)`](main.py#L44)
  - [`def utilization(self)`](main.py#L48)
  - [`def report(self)`](main.py#L52)
- [`def reorder_lost_in_middle(items, scores)`](main.py#L68)
- [`def score_relevance(query, documents)`](main.py#L82)
- [`class ConversationManager`](main.py#L95)
  - [`def add_turn(self, role, content)`](main.py#L101)
  - [`def _compress_if_needed(self)`](main.py#L105)
  - [`def _summarize_turns(self, turns)`](main.py#L117)
  - [`def get_context(self)`](main.py#L126)
  - [`def token_count(self)`](main.py#L138)
  - [`def stats(self)`](main.py#L141)
- [`def classify_intent(query)`](main.py#L203)
- [`def select_tools(query, token_budget)`](main.py#L227)
- [`class ContextEngine`](main.py#L241)
  - [`def assemble(self, query)`](main.py#L264)
  - [`def chat(self, query)`](main.py#L294)
- [`def run_budget_demo()`](main.py#L302)
- [`def run_reorder_demo()`](main.py#L316)
- [`def run_conversation_demo()`](main.py#L344)
- [`def run_tool_selection_demo()`](main.py#L371)
- [`def run_full_pipeline_demo()`](main.py#L398)
- [`def run_relevance_demo()`](main.py#L427)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
