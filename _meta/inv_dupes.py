import csv, collections, os
rows = list(csv.DictReader(open(os.path.join("..", "INVENTORY.csv"), encoding="utf-8")))
tk = [r for r in rows if r["toolkit_path"]]
c = collections.Counter(r["toolkit_path"] for r in tk)
d = {k: v for k, v in c.items() if v > 1}
print("toolkit rows", len(tk), "unique toolkit paths", len(c), "paths with >1 row", len(d))
for k, v in list(d.items())[:5]:
    print("  ", v, os.path.basename(k), [r["group"] + "/" + r["disposition"] for r in tk if r["toolkit_path"] == k])
