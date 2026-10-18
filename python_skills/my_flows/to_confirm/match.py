#!/usr/bin/env python3
"""match.py - the wide finder: pair course units with our workflows, outside repos and other course units.

It reads, with no model and no network:
  ../../corpus/CATALOG.csv              the course: 726 entries (title, summary, category, source)
  ../../confirmed/*/                    our confirmed skills (README, or the .py docstrings)
  ../research/*/ and ../ui_ux/*/        our research and design workflows (README)
  ../ui_ux/references/DESIGN_REPOS.md   outside repos (table rows: repo + "use it for")
  GOALS.md                              each goal's keywords

and writes CANDIDATES.csv: one row per suggested join, scored by keyword overlap.

  type A  course unit + our workflow     (does a course unit make one of ours better?)
  type B  course unit + outside repo     (does a course unit make an outside project ours?)
  type C  course unit + course unit      (do two course projects combine into something for a goal?)

Score (0-100) = cosine similarity of the two sides' words, rare course words weighted up, goal keywords doubled. It is a lead list for a human,
not a verdict: Claude and you pick from it, and a chosen join becomes a W folder here.

Run:   python3 -I match.py                 (writes CANDIDATES.csv next to this file)
       python3 -I match.py --top 10 --out other.csv
Exit:  0 = written, 2 = an input is missing.
"""
import argparse, ast, csv, math, re, sys
from collections import defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
SKILLS = HERE.parent.parent
STOP = set("""the and for with from that this into your you are was were has have had not but all any can will its
its our out use used using how what when where which who why one two three each per via about over under than then
them they their there these those also only more most some such very just like make makes made new get gets set
see run runs file files step steps page pages code python script scripts tool tools build built lesson project
projects course solution stage stages starter readme md py first last data text""".split())


def stem(w):
    """Crude plural and -ing folding, enough to match citations/citation and scraping/scrape."""
    for end, keep in (("ies", "y"), ("ing", ""), ("es", ""), ("s", "")):
        if w.endswith(end) and len(w) - len(end) >= 4:
            return w[: len(w) - len(end)] + keep
    return w


def words(s):
    return {stem(w) for w in re.findall(r"[a-z][a-z0-9+-]{2,}", (s or "").lower()) if w not in STOP}


def load_goals(path):
    goals, name = {}, None
    for line in path.read_text(encoding="utf-8").splitlines():
        m = re.match(r"##\s+(.+)", line)
        if m:
            name = m.group(1).strip()
        elif name and line.lower().startswith("keywords:"):
            goals[name] = {stem(k.strip().lower()) for k in line.split(":", 1)[1].split(",") if k.strip()}
    return goals


def describe_folder(d):
    readme = d / "README.md"
    if readme.is_file():
        return readme.read_text(encoding="utf-8", errors="replace")[:4000]
    text = []
    for p in sorted(d.rglob("*.py"))[:20]:
        try:
            doc = ast.get_docstring(ast.parse(p.read_text(encoding="utf-8", errors="replace")))
        except SyntaxError:
            doc = None
        text.append(f"{p.stem} {doc or ''}")
    return " ".join(text)[:4000]


def our_parts():
    parts = []
    for d in sorted((SKILLS / "confirmed").iterdir()):
        if d.is_dir() and not d.name.startswith((".", "_")):
            parts.append((f"confirmed/{d.name}", describe_folder(d)))
    for area in ("research", "ui_ux"):
        for d in sorted((HERE.parent / area).iterdir()):
            if d.is_dir():
                parts.append((f"my_flows/{area}/{d.name}", describe_folder(d)))
    return parts


def outside_repos():
    path = HERE.parent / "ui_ux" / "references" / "DESIGN_REPOS.md"
    repos = []
    for line in path.read_text(encoding="utf-8").splitlines():
        m = re.match(r"\|\s*\[([^\]]+)\]\([^)]*\)[^|]*\|\s*([^|]+)\|", line)
        if m:
            repos.append((m.group(1).strip(), m.group(2).strip()))
    return repos


def course_units():
    with open(SKILLS / "corpus" / "CATALOG.csv", encoding="utf-8") as f:
        return [r for r in csv.DictReader(f) if r["kind"] in ("lesson", "project", "certification lesson", "script")]


IDF = {}


def score(goal_kw, a, b):
    """Cosine similarity of the two word sets, each word weighted by its rarity in the course and goal words
    doubled, so a long README does not win just by being long. Scaled to 0-100."""
    wt = lambda w: IDF.get(w, 1.0) * (2 if w in goal_kw else 1)
    shared = a & b
    if not shared:
        return 0.0, []
    num = sum(wt(w) ** 2 for w in shared)
    den = math.sqrt(sum(wt(w) ** 2 for w in a) * sum(wt(w) ** 2 for w in b))
    return round(100 * num / den, 2), sorted(shared & goal_kw)[:6]


def main(argv=None):
    ap = argparse.ArgumentParser(description="Suggest course joins for each goal.")
    ap.add_argument("--top", type=int, default=8, help="rows kept per goal, type and part (default 8)")
    ap.add_argument("--out", default=str(HERE / "CANDIDATES.csv"))
    a = ap.parse_args(argv)
    for p in (HERE / "GOALS.md", SKILLS / "corpus" / "CATALOG.csv"):
        if not p.is_file():
            print(f"missing input: {p}", file=sys.stderr)
            return 2
    goals = load_goals(HERE / "GOALS.md")
    units = [(r["id"], r["title"], words(f"{r['title']} {r['title']} {r['summary']} {r['subcategory']}")) for r in course_units()]
    df = defaultdict(int)
    for _, _, uw in units:
        for w in uw:
            df[w] += 1
    IDF.update({w: math.log(len(units) / n) for w, n in df.items()})
    sides = {"A": [(n, words(t)) for n, t in our_parts()], "B": [(n, words(t)) for n, t in outside_repos()]}
    rows = []
    for goal, kw in goals.items():
        relevant = [u for u in units if len(u[2] & kw) >= 2]   # and so must the course unit
        for typ, items in sides.items():
            for name, w in items:
                if len(w & kw) < (2 if typ == "A" else 1):   # the part itself must be about this goal
                    continue
                scored = []
                for uid, title, uw in relevant:
                    s, hits = score(kw, w, uw)
                    if hits:
                        scored.append((s, uid, title, hits))
                for s, uid, title, hits in sorted(scored, key=lambda x: (-x[0], x[1]))[:a.top]:
                    rows.append({"goal": goal, "type": typ, "part": name, "course_id": uid, "course_title": title,
                                 "score": s, "shared_goal_words": " ".join(hits)})
        projects = [u for u in relevant if u[0].startswith("P-")]
        pairs = []
        for i, (ia, ta, wa) in enumerate(projects):
            for ib, tb, wb in projects[i + 1:]:
                s, hits = score(kw, wa, wb)
                if hits:
                    pairs.append((s, ia, ib, f"{ta} + {tb}", hits))
        for s, ia, ib, title, hits in sorted(pairs, key=lambda x: (-x[0], x[1], x[2]))[:a.top]:
            rows.append({"goal": goal, "type": "C", "part": ia, "course_id": ib, "course_title": title,
                         "score": s, "shared_goal_words": " ".join(hits)})
    rows.sort(key=lambda r: (r["goal"], r["type"], r["part"], -r["score"], r["course_id"]))
    fields = ["goal", "type", "part", "course_id", "course_title", "score", "shared_goal_words"]
    with open(a.out, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)
    count = defaultdict(int)
    for r in rows:
        count[r["type"]] += 1
    print(f"{len(rows)} candidate joins across {len(goals)} goals "
          f"(A {count['A']}, B {count['B']}, C {count['C']}) -> {Path(a.out).name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
