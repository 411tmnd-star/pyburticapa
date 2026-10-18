# How it works: The Minimal Agent Workbench

## `main.py`

```text
Lay down the three-file minimal agent workbench and run a single turn.

Files written:
  workdir/AGENTS.md         short router into state + board + deeper docs
  workdir/agent_state.json  active task, touched files, blockers, next action
  workdir/task_board.json   queue of tasks with status + acceptance

Run: python3 code/main.py
Re-run to see the second turn pick up where the first stopped.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class AgentState`](main.py#L38)
- [`class Task`](main.py#L47)
- [`def write_initial(state_path, board_path, agents_path)`](main.py#L55)
- [`def load_state(state_path)`](main.py#L78)
- [`def load_board(board_path)`](main.py#L83)
- [`def save_state(state_path, state)`](main.py#L87)
- [`def save_board(board_path, board)`](main.py#L91)
- [`def run_one_turn(state, board)`](main.py#L95)
- [`def main()`](main.py#L128)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
