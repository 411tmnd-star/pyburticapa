# How it works: Function Calling & Tool Use

## `code/function_calling.py`

```text
Function calling from scratch: a tool registry, the model-to-tool dispatch
loop, and guarded tool implementations. See docs/en.md for the walkthrough.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def register_tool(name, description, parameters, function)`](code/function_calling.py#L14)
- [`def calculator(expression, precision)`](code/function_calling.py#L28)
- [`def get_weather(city, units)`](code/function_calling.py#L48)
- [`def web_search(query, max_results)`](code/function_calling.py#L80)
- [`def read_file(path)`](code/function_calling.py#L95)
- [`def run_code(code, language)`](code/function_calling.py#L105)
- [`def register_all_tools()`](code/function_calling.py#L145)
- [`def simulate_model_decision(user_message, tools, conversation_history)`](code/function_calling.py#L212)
- [`def execute_tool_call(tool_call)`](code/function_calling.py#L261)
- [`def validate_tool_arguments(tool_name, arguments)`](code/function_calling.py#L281)
- [`def run_function_calling_loop(user_message, max_iterations)`](code/function_calling.py#L322)
- [`def run_demo()`](code/function_calling.py#L357)

## Run and test

From this folder:

```
python code/function_calling.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
