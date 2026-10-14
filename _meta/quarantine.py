"""Move historical generated material OUT of the toolkit into a sibling quarantine folder. Nothing is deleted.
Each file: SHA-256 before, move, SHA-256 after (must match). A manifest is written in the quarantine and
appended to MIGRATION_LOG.csv. Existing destination files are never overwritten."""
import csv, datetime, hashlib, os, shutil, sys

T = r"C:\Users\USER\Desktop\Python_Toolkit"
Q = r"C:\Users\USER\Desktop\Python_Toolkit_QUARANTINE"
G = os.path.join(T, "tools", "gemini_md2")
DRY = "--dry-run" in sys.argv


def sha(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


moves = []   # (group, source, destination, reason)
ws = os.path.join(T, "workspace", "research_pipeline")
for dp, dn, fn in os.walk(ws):
    for f in fn:
        s = os.path.join(dp, f)
        moves.append(("workspace_research_pipeline", s, os.path.join(Q, "workspace_research_pipeline", os.path.relpath(s, ws)),
                      "generated output of the pipeline run on historical markdown_files; no current workflow needs the contents"))
KEEP = {os.path.join("debug", "payload_mapping.md").lower()}          # referenced by gemini_parse.py docstring
for sub in ("output", "logs", "debug"):
    base = os.path.join(G, sub)
    for dp, dn, fn in os.walk(base):
        for f in fn:
            s = os.path.join(dp, f)
            rel = os.path.relpath(s, G)
            if f.endswith(".py") or rel.lower() in KEEP or "__pycache__" in rel:
                continue
            if not f.lower().endswith((".md", ".txt", ".json")):
                continue
            moves.append(("gemini_md2_artifacts", s, os.path.join(Q, "gemini_md2_artifacts", rel),
                          "output/report/note from past test or debugging runs; not read by any active script"))
stale_cfg = os.path.join(T, "discover", "extra_sources_research.json")
if os.path.exists(stale_cfg):
    moves.append(("stale_config", stale_cfg, os.path.join(Q, "discover_config_stale", "extra_sources_research.json"),
                  "config pointing at the quarantined pipeline output"))

now = datetime.datetime.now().isoformat(timespec="seconds")
rows, bad = [], 0
for gid, s, d, why in moves:
    h0 = sha(s)
    if DRY:
        rows.append([gid, s, d, "WOULD_MOVE", h0, "", "", now]); continue
    if os.path.exists(d):
        rows.append([gid, s, d, "SKIPPED_DEST_EXISTS", h0, sha(d), "match" if sha(d) == h0 else "DIFFERENT", now]); bad += sha(d) != h0
        continue
    os.makedirs(os.path.dirname(d), exist_ok=True)
    shutil.move(s, d)
    h1 = sha(d)
    ok = h0 == h1 and not os.path.exists(s)
    bad += not ok
    rows.append([gid, s, d, "MOVED_TO_QUARANTINE", h0, h1, "match" if ok else "MISMATCH", now])
print(len(rows), "files;", "problems:", bad)
if not DRY:
    os.makedirs(Q, exist_ok=True)
    with open(os.path.join(Q, "MANIFEST.csv"), "a", encoding="utf-8", newline="") as f:
        w = csv.writer(f, lineterminator="\n")
        if f.tell() == 0:
            w.writerow(["group", "original_path", "quarantine_path", "action", "sha256_before", "sha256_after", "hash_check", "timestamp"])
        w.writerows(rows)
    open(os.path.join(Q, "README.txt"), "w", encoding="utf-8").write(
        "Quarantine for material moved out of Python_Toolkit on %s.\nNothing here was deleted or altered; each file's SHA-256 was checked before and after the move.\n"
        "See MANIFEST.csv for original paths. Do not add this folder to the toolkit.\n" % now)
    with open(os.path.join(T, "MIGRATION_LOG.csv"), "a", encoding="utf-8", newline="") as f:
        csv.writer(f, lineterminator="\n").writerows(rows)
    # remove only EMPTY leftover folders in the toolkit
    for base in (os.path.join(T, "workspace"), os.path.join(G, "output"), os.path.join(G, "logs")):
        for dp, dn, fn in sorted(os.walk(base), key=lambda x: -len(x[0])):
            if not os.listdir(dp):
                os.rmdir(dp)
sys.exit(1 if bad else 0)
