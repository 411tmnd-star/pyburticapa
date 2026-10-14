"""Read-only scope review of the Toolkit. Classifies every file and writes ../SCOPE_REVIEW.csv. Deletes nothing."""
import collections, csv, os

T = r"C:\Users\USER\Desktop\Python_Toolkit"
CATS = {1: "reusable implementation", 2: "required configuration/dependency", 3: "required test/fixture", 4: "input/output directory",
        5: "operational documentation/inventory", 6: "historical document/archive", 7: "generated historical output", 8: "uncertain"}
rows = []
for dp, dn, fn in os.walk(T):
    dn[:] = [d for d in dn if d != "__pycache__"]
    for f in sorted(fn):
        p = os.path.join(dp, f)
        rel = os.path.relpath(p, T)
        top = rel.split(os.sep)[0]
        low = f.lower()
        ext = os.path.splitext(low)[1]
        size = os.path.getsize(p)
        why = ""
        parts = rel.lower().split(os.sep)
        if "fixtures" in parts and top == "tools":
            c, why = 3, "synthetic test fixture (fabricated content)"
        elif top == "tools" and parts[1:2] == ["gemini_md2"] and parts[-1] == "payload_mapping.md":
            c, why = 5, "parser field-path documentation referenced by gemini_parse.py"
        elif top == "tools" and parts[1:2] == ["gemini_md2"] and ext == ".py" and parts[2:3] == ["debug"]:
            c, why = (8, "classified UNRESOLVED in GEMINI_SCRIPT_CLASSIFICATION.csv") if low in ("analyze1.py", "analyze2.py", "test3_posthoc.py", "test3_posthoc2.py") else (1, "debug/backup script retained (REUSABLE/SPECIALIZED/DUPLICATE, see GEMINI_SCRIPT_CLASSIFICATION.csv)")
        elif top in ("GEMINI_SCRIPT_CLASSIFICATION.csv", "outputs"):
            c, why = (5, "toolkit record") if top != "outputs" else (4, "designated output folder")
        elif top == "tools" and len(parts) > 3 and parts[1] == "gemini_md2" and parts[2] in ("output", "logs") and ext in (".md", ".json", ".txt"):
            c, why = 7, "output/report written by the gemini validation scripts during past test runs"
        elif top == "tools" and len(parts) > 3 and parts[1] == "gemini_md2" and parts[2] == "debug" and ext in (".md", ".txt"):
            c, why = 6, "analysis note from past debugging, not needed to run a tool"
        elif top == "workspace":
            c, why = 7, "pipeline output generated from historical markdown_files"
        elif top == "_meta":
            c, why = (1, "toolkit build/verify script") if ext == ".py" else (5, "scan result record")
        elif top in ("MIGRATION_LOG.csv", "VERIFICATION.csv", "INVENTORY.csv", "README.md", "CAPABILITIES.md", "WORKFLOWS.md", "REMAINING_DEPENDENCIES.md", "SCOPE_REVIEW.csv"):
            c, why = 5, "toolkit record"
        elif ext == ".py" and low.startswith("test"):
            c, why = 3, "test script"
        elif ext == ".py" and "debug" in rel.lower().split(os.sep):
            c, why = 8, "debug/experiment script inside gemini_md2; reusable status not established"
        elif ext == ".py" and "backup" in rel.lower().split(os.sep):
            c, why = 8, "backup copy of a script inside gemini_md2; likely superseded"
        elif ext == ".py" and low.startswith("test"):
            c, why = 3, "test"
        elif ext == ".py":
            c, why = 1, "tool script"
        elif low in ("requirements.txt",) or ext in (".diff",) or low.endswith("config.json"):
            c, why = 2, "dependency/config"
        elif low == "extra_sources_research.json":
            c, why = 8, "config that points at the historical pipeline output under workspace/"
        elif ext in (".md", ".txt"):
            c, why = 5, "tool documentation"
        else:
            c, why = 8, "unclassified"
        rows.append([rel, c, CATS[c], ext, size, why])
with open(os.path.join(T, "SCOPE_REVIEW.csv"), "w", encoding="utf-8", newline="") as fh:
    w = csv.writer(fh, lineterminator="\n")
    w.writerow(["path", "class_no", "class", "ext", "bytes", "reason"])
    w.writerows(rows)
cnt = collections.Counter((r[1], r[2]) for r in rows)
for k, v in sorted(cnt.items()):
    print(k, v, "files", sum(r[4] for r in rows if r[1] == k[0]), "bytes")
print("--- class 6/7/8 by folder")
by = collections.Counter((r[1], r[0].split(os.sep)[0] + os.sep + (r[0].split(os.sep)[1] if len(r[0].split(os.sep)) > 2 else "")) for r in rows if r[1] in (6, 7, 8))
for k, v in sorted(by.items()):
    print(k, v)
print("--- non-code text files in tools (names)")
for r in rows:
    if r[0].startswith("tools") and r[3] in (".md", ".txt"):
        print(r[0], r[4])
