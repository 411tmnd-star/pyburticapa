"""Copy (never move) approved tool groups from the Harness into Python_Toolkit.
Rules: sources are only read; an existing destination file is never overwritten; every file is logged
with SHA-256 of source and destination. Run:  python -I -X utf8 migrate.py [--dry-run]"""
import csv, datetime, hashlib, os, shutil, sys

H = r"C:\Users\USER\Desktop\tool harness"
T = r"C:\Users\USER\Desktop\Python_Toolkit"
LOG = os.path.join(T, "MIGRATION_LOG.csv")
DRY = "--dry-run" in sys.argv
SKIP_DIRS = {"__pycache__", ".git", "venv", ".venv", "node_modules"}
CODE_EXT = (".py",)
DOC_EXT = (".md", ".txt")


def sha(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def only(*exts, names=()):
    def pred(rel):
        base = os.path.basename(rel).lower()
        return base.endswith(exts) or base in names
    return pred


# group_id, source dir (relative to Harness), destination (relative to toolkit), predicate, extra excluded subdirs
PLAN = [
    ("chat_reply_extractor", r"1_PY\tools\chat_reply_extractor", r"tools\chat_reply_extractor", only(".py", ".md"), ()),
    ("prompt_reply_pipeline", r"1_PY\tools\prompt_reply_pipeline", r"tools\prompt_reply_pipeline", only(".py", ".md"), ()),
    ("pdf_to_md", r"1_PY\tools\PDF_TO_MD", r"tools\pdf_to_md", only("pdf_to_md.py", "requirements.txt"), ("converted_md",)),
    ("knowledge_extraction_v2", r"1_PY\tools\KNOWLEDGE_EXTRACTION\v2", r"tools\knowledge_extraction\v2",
     only("convert.py", "jsonl_to_md.py", "mht_to_md.py", "readme.md"), ("converted",)),
    ("mht_to_md_tool", r"1_PY\tools\X\mht_to_md_tool", r"tools\mht_to_md_tool", only(".py", ".md", "requirements.txt"), ()),
    ("gemini_md2", r"1_PY\tools\X\GEMINITOMDTOOL\Gemini MD2", r"tools\gemini_md2", only(".py", ".md", "requirements.txt"), ()),
    ("x_pipeline", r"links.md", r"tools\x_pipeline", only(".py", "requirements.txt"),
     ("output_notes", "videos", "images", "transcribed", "snapshots")),
    ("repo_inspect", r"1_PY\tools\repo_inspect", r"tools\repo_inspect", only(".py", ".md"), ()),
]


def main():
    rows = []
    now = datetime.datetime.now().isoformat(timespec="seconds")
    for gid, sdir, ddir, pred, excl in PLAN:
        s_root = os.path.join(H, sdir)
        if not os.path.isdir(s_root):
            rows.append([gid, s_root, "", "SOURCE_MISSING", "", "", "", now])
            continue
        for dp, dn, fn in os.walk(s_root):
            dn[:] = [d for d in dn if d not in SKIP_DIRS and d not in excl]
            for f in sorted(fn):
                sp = os.path.join(dp, f)
                rel = os.path.relpath(sp, s_root)
                if gid == "x_pipeline" and os.sep in rel:
                    continue  # only top-level scripts of links.md; its subfolders are data
                if not pred(rel):
                    continue
                dp_ = os.path.join(T, ddir, rel)
                s_hash = sha(sp)
                if os.path.exists(dp_):
                    d_hash = sha(dp_)
                    rows.append([gid, sp, dp_, "SKIPPED_EXISTS", s_hash, d_hash, "match" if s_hash == d_hash else "DIFFERENT", now])
                    continue
                if DRY:
                    rows.append([gid, sp, dp_, "WOULD_COPY", s_hash, "", "", now])
                    continue
                os.makedirs(os.path.dirname(dp_), exist_ok=True)
                shutil.copy2(sp, dp_)
                d_hash = sha(dp_)
                rows.append([gid, sp, dp_, "COPIED", s_hash, d_hash, "match" if s_hash == d_hash else "MISMATCH", now])
    new = not os.path.exists(LOG)
    if not DRY:
        with open(LOG, "a", encoding="utf-8", newline="") as f:
            w = csv.writer(f, lineterminator="\n")
            if new:
                w.writerow(["group", "source", "destination", "action", "sha256_source", "sha256_dest", "hash_check", "timestamp"])
            w.writerows(rows)
    by = {}
    for r in rows:
        by.setdefault((r[0], r[3]), 0)
        by[(r[0], r[3])] += 1
    for k, v in sorted(by.items()):
        print(k, v)
    bad = [r for r in rows if r[6] in ("MISMATCH", "DIFFERENT")]
    print("hash problems:", len(bad))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
