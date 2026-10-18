"""One command: ChatGPT export folder -> clean Markdown -> searchable database -> dossiers.

    python -I -X utf8 run.py EXPORT_DIR OUT_DIR [--subject NAME ...] [--aliases FILE] [--exclude FILE] [--overwrite]

EXPORT_DIR  the unzipped ChatGPT data export (conversations.json or conversations-000.json ...). Only read.
OUT_DIR     everything is written here:
                clean/        PROMPTS/ and REPLIES/ Markdown, manifest.csv, run.log
                knowledge.db  SQLite/FTS5 database
                dossiers/     one <subject>_dossier.md (+ full text and evidence CSV) per --subject

It runs exactly the commands you would run by hand, in order, and stops at the first one that fails:
    takeout_to_clean_md.py run, takeout_to_clean_md.py verify, recover.py ingest, recover.py check,
    then recover.py dossier for each --subject. Without --subject it stops after `check`.
Standard library only.
"""
import argparse
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SPLIT = os.path.join(os.path.dirname(HERE), "chatgpt_takeout_split", "takeout_to_clean_md.py")
RECOVER = os.path.join(HERE, "recover.py")


def step(title, *args):
    print(f"\n=== {title}\n$ python {' '.join(args)}", flush=True)
    rc = subprocess.call([sys.executable, "-I", "-X", "utf8", *args])
    if rc:
        print(f"step failed with exit code {rc}: {title}", file=sys.stderr)
    return rc


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("export", help="folder with the ChatGPT export JSON (only read)")
    ap.add_argument("out", help="output folder (clean/, knowledge.db, dossiers/)")
    ap.add_argument("--subject", action="append", default=[], help="write a dossier for this subject (repeatable)")
    ap.add_argument("--aliases", help="subject names, topics and domain terms (JSON); default: aliases.json here")
    ap.add_argument("--exclude", help="conversations to leave out (JSON); default: exclude.json here if present")
    ap.add_argument("--overwrite", action="store_true", help="let the split step replace an earlier run in OUT/clean")
    a = ap.parse_args(argv)

    export, out = os.path.abspath(a.export), os.path.abspath(a.out)
    if not os.path.isdir(export):
        print(f"export folder not found: {export}", file=sys.stderr)
        return 2
    clean, db, dossiers = (os.path.join(out, n) for n in ("clean", "knowledge.db", "dossiers"))
    os.makedirs(out, exist_ok=True)

    run_args = [SPLIT, "run", export, clean] + (["--overwrite"] if a.overwrite else [])
    rec = [RECOVER, "--db", db]
    if a.aliases:
        rec += ["--aliases", os.path.abspath(a.aliases)]
    if a.exclude:
        rec += ["--exclude", os.path.abspath(a.exclude)]

    plan = [("1. split the export", run_args),
            ("2. verify the split against the export", [SPLIT, "verify", export, clean]),
            ("3. build the knowledge base", rec + ["ingest", "--archive", clean]),
            ("4. check it against the manifest", rec + ["check"])]
    for subject in a.subject:
        plan.append((f"5. dossier: {subject}", rec + ["dossier", subject, "--out", dossiers]))
    for title, args in plan:
        rc = step(title, *args)
        if rc:
            return rc
    if not a.subject:
        print("\nDone. No --subject given, so no dossier was written; re-run with --subject NAME (steps 1-4 are repeated).")
    else:
        print(f"\nDone. Dossiers are in {dossiers}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
