# How it works: Download Folder Sort Desk

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def inventory(folder)`](main.py#L5): Return sorted {path,size,sha256,suffix} records for regular files beneath folder. Reject symbolic links; paths are root-relative POSIX paths. Stream SHA-256 in 64 KiB chunks.
- [`def categorize(record)`](main.py#L31): Return {category,scores,evidence}. A recognized extension earns 3 points; workshop/handout name words earn documents 1 point each. Highest positive score wins, alphabetic tie-break; no evidence means other.
- [`def plan_moves(records, occupied)`](main.py#L58): Return schema_version=1 moves and duplicate_groups. Moves preserve original path/hash and choose category/basename, appending -2, -3 before suffix for case-insensitive collisions. occupied contains existing destination paths. No filesystem mutation.
- [`def review_plan(folder, plan, decisions)`](main.py#L88): Validate current source bytes and optional {fingerprint,approved:[source paths]}; return plan with approved booleans plus fingerprint. Reject missing/changed files, traversal and unknown/duplicate approvals. This is the file-manager integration gate; it never moves files.

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
