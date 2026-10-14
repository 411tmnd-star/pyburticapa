import csv, collections, os
S = chr(92)
rows = list(csv.DictReader(open(os.path.join("INVENTORY.csv"), encoding="utf-8")))
tk = [r for r in rows if r["toolkit_path"]]
print("inventory rows:", len(rows), "| rows with toolkit_path:", len(tk))
print("groups of toolkit rows:", collections.Counter(r["group"] for r in tk).most_common())
want = ["convert_for_pipeline.py", "make_discovery_fixture.py", "test_discovery_link.py", "test_speaker_cases.py",
        "pipeline.py", "discover.py", "chat_reply_extractor.py", "jsonl_to_md.py", "mht_to_md.py", "pdf_to_md.py", "repo_inspect.py"]
for w in want:
    hit = [r["path"] for r in rows if r["path"].endswith(w) or (r["toolkit_path"] or "").endswith(w)]
    print("  %-26s in INVENTORY: %s (%d row(s))" % (w, "yes" if hit else "NO", len(hit)))
print("docstring filled for toolkit rows:", sum(1 for r in tk if r["first_docstring_line"]), "of", len(tk))
