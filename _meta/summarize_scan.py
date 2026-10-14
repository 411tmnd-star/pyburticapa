import csv, collections, json, os
D = os.path.dirname(os.path.abspath(__file__))
rows = list(csv.DictReader(open(os.path.join(D, "scan_results.csv"), encoding="utf-8")))
BS = chr(92)
g = collections.defaultdict(list)
for r in rows:
    parts = r["path"].split(BS)
    if parts[0] == "1_PY" and len(parts) > 3 and parts[1] == "tools":
        key = BS.join(parts[:3])
    elif len(parts) > 2:
        key = BS.join(parts[:2])
    else:
        key = parts[0]
    g[key].append(r)
for k, v in sorted(g.items()):
    tp, pm = set(), set()
    em = tests = bad = 0
    for r in v:
        tp |= set(filter(None, r["third_party_imports"].split(";")))
        pm |= set(filter(None, r["path_markers"].split(";")))
        em += int(r["external_mentions"])
        tests += r["is_test"] == "yes"
        bad += r["parse_ok"] != "yes"
    print(f"{k:55} py={len(v):3} tests={tests:2} bad={bad} ext={em:3} 3rd={sorted(tp)[:7]} paths={sorted(pm)}")
print(json.load(open(os.path.join(D, "scan_groups.json")))["requirements_files"])
