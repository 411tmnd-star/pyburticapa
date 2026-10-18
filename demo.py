"""One-command demo: a fabricated ChatGPT export -> a searchable, source-traceable dossier.

    python demo.py            (writes everything under outputs/demo/, replacing an earlier demo)

Steps it runs, the same commands you would run on your own export:
  1. tests/fixtures/make_takeout.py         a small invented export (4 conversations, branches, a fork)
  2. takeout_to_clean_md.py run + verify    export -> PROMPTS/ and REPLIES/ Markdown, checked against the source
  3. recover.py ingest + check              Markdown -> SQLite/FTS5, checked against the manifest
  4. recover.py search / dossier SunBox     find every message about the subject, with its source
Standard library only. Your real export is never touched by this script.
"""
import os
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "outputs", "demo")
sys.path.insert(0, os.path.join(ROOT, "tests", "fixtures"))
import make_takeout  # noqa: E402

SPLIT = os.path.join(ROOT, "python_skills", "confirmed", "chatgpt_takeout_split", "takeout_to_clean_md.py")
RECOVER = os.path.join(ROOT, "python_skills", "confirmed", "knowledge_recovery", "recover.py")


def step(title, *args):
    print(f"\n=== {title}\n$ python {' '.join(os.path.relpath(a, ROOT) if os.path.isabs(a) else a for a in args)}")
    rc = subprocess.call([sys.executable, "-I", "-X", "utf8", *args])
    if rc:
        sys.exit(f"step failed with exit code {rc}")


def main():
    shutil.rmtree(OUT, ignore_errors=True)
    src, clean = os.path.join(OUT, "export"), os.path.join(OUT, "clean")
    aliases, exclude, db = (os.path.join(OUT, n) for n in ("aliases.json", "exclude.json", "knowledge.db"))
    print("=== 1. fabricated export:", ", ".join(make_takeout.write(src)))
    make_takeout.write_aliases(aliases)
    with open(exclude, "w") as f:
        f.write('{"title_contains": [], "conversation_ids": []}')
    rec = [RECOVER, "--db", db, "--aliases", aliases, "--exclude", exclude]
    step("2a. split the export", SPLIT, "run", src, clean)
    step("2b. verify the split against the export", SPLIT, "verify", src, clean)
    step("3a. build the knowledge base", *rec, "ingest", "--archive", clean)
    step("3b. check it", *rec, "check")
    step("4a. search", *rec, "search", "SunBox", "--limit", "5")
    step("4b. write the dossier", *rec, "dossier", "SunBox", "--out", os.path.join(OUT, "dossiers"))
    print(f"\nOpen {os.path.relpath(os.path.join(OUT, 'dossiers', 'sunbox_dossier.md'), ROOT)}")


if __name__ == "__main__":
    main()
