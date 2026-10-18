# How it works: Subtitle Localization Desk

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def _seconds(stamp)`](main.py#L4)
- [`def parse_vtt(text)`](main.py#L12): Parse UTF-8 WebVTT text into cues {id,start,end,settings,text,duration}. Preserve timestamp strings and supplied IDs; assign cue-N to absent IDs. Allow overlapping cues with nondecreasing starts. Ignore NOTE blocks; reject STYLE/REGION blocks and malformed/duplicate/empty cues.
- [`def propose(cues, translations, glossary)`](main.py#L61): Return cue proposals with proposed text, needs_translation and required_terms. translations maps known cue IDs to nonempty target text. glossary maps source phrases to required target phrases; replace residual source terms longest-first in supplied proposals. Missing translations retain source text and remain unapproved.
- [`def inspect(proposals, cps)`](main.py#L103): Return review rows with characters, cps, budget and flags. Count visible non-whitespace Unicode code points after stripping cue tags; budget=floor(duration*cps). Flags identify missing translations, missing required terms and reading-budget overflow. cps must be positive and finite.
- [`def export_localized(proposals, decisions, cps)`](main.py#L135): Return {schema_version,fingerprint,cues,all_reviewed,vtt}. Review {fingerprint,cues:{id:{text,approved,override_budget?}}} is bound to proposals and reading budget. Approved text must satisfy glossary and structural syntax; over-budget approval needs explicit override_budget=true. vtt is None until every cue is approved.

## `cli.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## `presentation.py`

Functions and classes, in file order (click to jump to the line):

- [`def page(title, sections, path, review)`](presentation.py#L5): Write standalone accessible HTML. Review data is downloadable and edited as JSON.

## Run and test

From this folder:

```
python cli.py samples/input.json --output demo-output
python cli.py /absolute/path/to/your-input.json --output your-output
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
