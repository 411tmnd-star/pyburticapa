import csv, os
rows = list(csv.DictReader(open(os.path.join("..", "INVENTORY.csv"), encoding="utf-8")))
tk = [r for r in rows if r["toolkit_path"]]
print("toolkit rows", len(tk), "| with docstring", sum(1 for r in tk if r["first_docstring_line"]),
      "| new_in_toolkit", sum(1 for r in tk if r["disposition"] == "new_in_toolkit"))
for r in tk:
    if r["disposition"] == "new_in_toolkit":
        print("  ", os.path.basename(r["toolkit_path"]), "|", r["first_docstring_line"][:70])
