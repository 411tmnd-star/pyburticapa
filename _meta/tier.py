"""Tier the Toolkit inventory. Static analysis only: files are read and parsed with ast, never imported,
compiled to bytecode, run or tested.

Adds four columns to INVENTORY.csv (tier, tier_rule, sha256, check_status), assigns a tier to every
toolkit-owned row, appends one row per file copied by _meta/import_bundle.py (from imports/IMPORT_MANIFEST*.csv)
and stores toolkit paths relative to the Toolkit root. INVENTORY.csv stays the only catalogue; the import
manifests remain the copy logs.

Tiers
  1  Reference and learning material. Indexed, tagged read-only, never executed. No check required.
  2  Reusable utilities and algorithms (candidates). check_status holds the static result: syntax (ast.parse),
     and imports compared with the requirements/pyproject files found in the Toolkit. Tests are NOT run.
  3  Core infrastructure and active tools (toolkit-owned tools, AudioLab live code, the course API and its
     build). check_status starts with REQUIRES-REVIEW; change it by hand to "REVIEWED ..." after a review
     and this script will keep it.

Run order if the inventory is ever rebuilt: _meta/build_inventory.py rewrites INVENTORY.csv from scratch (it
drops these columns and rows), then run this script again.

Usage (from anywhere):
    python -B -I _meta/tier.py            dry run: print what would change, write nothing
    python -B -I _meta/tier.py --write    apply; a backup of the previous INVENTORY.csv is kept once in
                                          _meta/backups/INVENTORY.before_tier.csv
Idempotent: a second --write produces an identical file.
"""

from __future__ import annotations

import argparse
import ast
import csv
import hashlib
import os
import re
import shutil
import sys
import warnings
from collections import Counter
from pathlib import Path

try:
    import tomllib
except ImportError:  # Python < 3.11: pyproject.toml files are then skipped
    tomllib = None

TOOLKIT = Path(__file__).resolve().parent.parent
INVENTORY = TOOLKIT / "INVENTORY.csv"
BACKUP = TOOLKIT / "_meta" / "backups" / "INVENTORY.before_tier.csv"
MANIFESTS = [TOOLKIT / "imports" / n for n in
             ("IMPORT_MANIFEST.csv", "IMPORT_MANIFEST_API.csv", "IMPORT_MANIFEST_MEDIA.csv")]
NEW_COLS = ["tier", "tier_rule", "sha256", "check_status"]
STDLIB = set(getattr(sys, "stdlib_module_names", ())) | {"__future__"}
PARSER = "py%d.%d parser" % sys.version_info[:2]

ALIASES = {"scikit-learn": "sklearn", "pillow": "PIL", "pyyaml": "yaml", "beautifulsoup4": "bs4",
           "opencv-python": "cv2", "opencv-python-headless": "cv2", "pymupdf": "fitz",
           "python-dateutil": "dateutil"}
LANG = {".py": "python", ".ts": "typescript", ".tsx": "typescript", ".js": "javascript", ".mjs": "javascript",
        ".cjs": "javascript", ".rs": "rust", ".go": "go", ".jl": "julia", ".sh": "shell"}
TEXT_EXT = {".py", ".md", ".json", ".js", ".mjs", ".cjs", ".ts", ".tsx", ".rs", ".go", ".jl", ".sh", ".txt",
            ".csv", ".yaml", ".yml", ".toml", ".html", ".css", ".svg", ".cfg", ".ini"}

CATEGORY = {"ai_engineering": "Imported course material", "build_media": "Imported course material",
            "api_site_mcp": "Course API and MCP", "audio_lab": "AudioLab", "audio_lab_outputs": "AudioLab",
            "audio_lab_work_delta": "AudioLab (working copy)", "audio_lab_work_reports": "AudioLab (working copy)",
            "audio_lab_snapshot_records": "AudioLab (provenance)"}
OBSERVED = {"RUN-OBSERVED": "observed: suite passed in a run observed on 2026-10-14 (not re-run)",
            "TYPECHECKED": "observed: tsc --noEmit exit 0 on 2026-10-14 (not otherwise run)",
            "REPORTED-PASS": "reported: pass recorded by its author or owner (not re-run here)"}

# Tier rules for imported files, by (group, category). Order matters: first match wins.
T3_AUDIOLAB_LIVE = {"audiolab-package", "workflow-script", "web-pipeline-lib", "web-component-or-page"}
T3_CORE = {"api-or-lib-code", "site-build-script"}
T2_CATEGORIES = {"lesson-code", "certification-code", "capture-script", "project-reference-solution",
                 "project-stage-test", "audiolab-test", "web-test", "site-test", "web-preview-script",
                 "evidence-script", "workflow-script", "audiolab-package", "web-pipeline-lib",
                 "web-component-or-page"}


def tier_for(group: str, category: str) -> tuple[int, str]:
    if group == "audio_lab" and category in T3_AUDIOLAB_LIVE:
        return 3, "T3 AudioLab live code (%s)" % category
    if category in T3_CORE:
        return 3, "T3 core infrastructure: course API/MCP and its build (%s)" % category
    if category in T2_CATEGORIES:
        return 2, "T2 candidate code (%s)" % category
    return 1, "T1 reference (%s)" % category


def sha256_bytes(raw: bytes) -> str:
    return hashlib.sha256(raw).hexdigest()


def declared_packages() -> set[str]:
    """Import names declared by any requirements*.txt or pyproject.toml in the Toolkit (coarse, union)."""
    names: set[str] = set()

    def add(spec: str) -> None:
        m = re.match(r"[A-Za-z0-9][A-Za-z0-9._-]*", spec.strip())
        if not m:
            return
        n = m.group(0).lower()
        names.update({n, n.replace("-", "_"), n.replace(".", "_")})
        if n in ALIASES:
            names.add(ALIASES[n].lower())

    for base in ("imports", "tools", "discover", "_meta"):
        for dp, dn, fn in os.walk(TOOLKIT / base):
            dn[:] = [d for d in dn if d not in {"node_modules", "__pycache__"}]
            for f in fn:
                p = Path(dp) / f
                if f.startswith("requirements") and f.endswith(".txt"):
                    for line in p.read_text(encoding="utf-8", errors="replace").splitlines():
                        line = line.split("#")[0].strip()
                        if line and not line.startswith(("-", ".")):
                            add(line)
                elif f == "pyproject.toml" and tomllib is not None:
                    try:
                        data = tomllib.loads(p.read_text(encoding="utf-8"))
                    except Exception:
                        continue
                    proj = data.get("project", {})
                    for spec in proj.get("dependencies", []):
                        add(spec)
                    for specs in proj.get("optional-dependencies", {}).values():
                        for spec in specs:
                            add(spec)
    return names


_local_cache: dict[Path, set[str]] = {}


def local_names(root: Path) -> set[str]:
    """Module names defined inside a unit (a lesson, a project, a package): .py stems and directory names."""
    if root not in _local_cache:
        found: set[str] = set()
        for dp, dn, fn in os.walk(root):
            dn[:] = [d for d in dn if d not in {"node_modules", "__pycache__", ".git"}]
            found.update(d.replace("-", "_") for d in dn)
            found.update(f[:-3] for f in fn if f.endswith(".py"))
        _local_cache[root] = found
    return _local_cache[root]


def unit_root(parts: list[str]) -> Path:
    p = parts
    n = len(p)
    if p[0] == "imports" and n > 3:
        if p[1] == "ai_engineering":
            sec = p[2]
            if sec == "phases" and n > 5:
                return TOOLKIT.joinpath(*p[:5])
            if sec == "projects" and n > 4:
                return TOOLKIT.joinpath(*p[:4])
            if sec == "certifications" and n > 6 and p[4] == "lessons":
                return TOOLKIT.joinpath(*p[:6])
            if sec == "manuals" and n > 4:
                return TOOLKIT.joinpath(*p[:4])
            return TOOLKIT.joinpath(*p[:3])
        if p[1] == "audio_lab":
            return TOOLKIT.joinpath(*p[:2])
        return TOOLKIT.joinpath(*p[:3])
    if p[0] == "tools" and n > 2:
        return TOOLKIT.joinpath(*p[:2])
    return TOOLKIT.joinpath(*p[:-1]) if n > 1 else TOOLKIT


def analyse_py(raw: bytes, parts: list[str], declared: set[str]) -> dict:
    """ast.parse only. Returns compiles, doc (first docstring line), third-party roots and a status string."""
    src = raw.decode("utf-8", errors="replace")
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        try:
            tree = ast.parse(src)
        except (SyntaxError, ValueError, RecursionError, MemoryError) as exc:
            line = getattr(exc, "lineno", None)
            where = (" line %d," % line) if line else ""
            return {"compiles": "SYNTAX-ERROR", "doc": "", "third": [],
                    "status": "SYNTAX-ERROR (%s%s %s)" % (type(exc).__name__, where, PARSER)}
    doc = (ast.get_docstring(tree) or "").strip().splitlines()
    roots: set[str] = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            roots.update(a.name.split(".")[0] for a in node.names)
        elif isinstance(node, ast.ImportFrom) and node.level == 0 and node.module:
            roots.add(node.module.split(".")[0])
    local = local_names(unit_root(parts))
    third = sorted(r for r in roots if r not in STDLIB and r not in local)
    missing = [r for r in third if r.lower() not in declared]
    if missing:
        status = "UNDECLARED-DEPS: " + ", ".join(missing)
    else:
        status = "STATIC-OK" + ("; third-party declared: " + ", ".join(third) if third else "")
    return {"compiles": "OK", "doc": doc[0][:200] if doc else "", "third": third, "status": status}


def md_title(raw: bytes) -> str:
    for line in raw.decode("utf-8", errors="replace").splitlines():
        s = line.strip()
        if s.startswith("#"):
            return s.lstrip("#").strip()[:200]
        if s:
            return s[:200]
    return ""


def check_status(tier: int, ext: str, analysis: dict | None) -> str:
    lang = LANG.get(ext)
    if tier == 1:
        return "READ-ONLY (never executed; no check required)"
    if analysis is not None:
        static = analysis["status"]
    elif lang:
        static = "NOT-CHECKED (non-python source: %s)" % lang
    else:
        static = "NOT-CHECKED (not code)"
    return ("REQUIRES-REVIEW; static: " + static) if tier == 3 else static


def rel_inside(p: str) -> str:
    """A path under the Toolkit root as a forward-slash relative path; anything else unchanged."""
    if not p or not Path(p).is_absolute():
        return p
    try:
        return Path(os.path.normpath(p)).relative_to(TOOLKIT).as_posix()
    except ValueError:
        return p


def to_abs(rel: str) -> Path:
    return Path(rel) if os.path.isabs(rel) else TOOLKIT / rel


def read_manifest_rows() -> list[dict]:
    rows = []
    for m in MANIFESTS:
        if m.exists():
            with open(m, encoding="utf-8", newline="") as f:
                rows += [r for r in csv.DictReader(f) if r["action"] == "COPIED"]
    return rows


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--write", action="store_true", help="apply the changes (default: dry run)")
    args = ap.parse_args()
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    csv.field_size_limit(10 ** 7)

    with open(INVENTORY, encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        fields = list(reader.fieldnames)
        rows = list(reader)
    ragged = sum(1 for r in rows if None in r)
    if ragged:
        print("REFUSING: %d inventory rows have more fields than the header; rewriting would drop data" % ragged)
        return 1
    original = [dict(r) for r in rows]
    n_original = len(rows)
    for c in NEW_COLS:
        if c not in fields:
            fields.append(c)
    for r in rows:
        for c in NEW_COLS:
            r.setdefault(c, "")

    declared = declared_packages()
    stats = Counter()
    undeclared_names: Counter = Counter()

    def keep_review(r: dict, status: str) -> str:
        return r["check_status"] if (r.get("check_status") or "").startswith("REVIEWED") else status

    # 1. Toolkit-owned rows already in the inventory: Tier 3 (active tools), relative paths, fresh static facts.
    index: dict[str, dict] = {}
    for r in rows:
        tp = (r.get("toolkit_path") or "").strip()
        if not tp:
            continue
        rel = rel_inside(tp)
        if rel.startswith("imports/") and (r.get("disposition") or "").startswith("copied (import"):
            index[rel] = r
            continue
        r["toolkit_path"] = rel
        if (r.get("path") or "").strip() == tp:
            r["path"] = rel
        elif rel_inside(r.get("path", "")) != r.get("path", ""):
            r["path"] = rel_inside(r["path"])
        index[rel] = r
        p = to_abs(rel)
        ext = p.suffix.lower()
        parts = rel.split("/")
        r["tier"], r["tier_rule"] = "3", "T3 toolkit-owned tool (active)"
        if not p.exists():
            r["check_status"] = keep_review(r, "MISSING-FILE")
            stats["toolkit rows with a missing file"] += 1
            continue
        raw = p.read_bytes()
        r["sha256"] = sha256_bytes(raw)
        analysis = analyse_py(raw, parts, declared) if ext == ".py" else None
        if analysis:
            r["compiles"] = analysis["compiles"]
        r["check_status"] = keep_review(r, check_status(3, ext, analysis))
        stats["toolkit rows tiered"] += 1

    # 2. Imported files: one row per copied file, keyed by relative toolkit_path.
    added = updated = missing_files = drifted = 0
    for m in read_manifest_rows():
        dst = Path(m["destination"])
        try:
            rel = dst.relative_to(TOOLKIT).as_posix()
        except ValueError:
            continue
        if not dst.exists():
            missing_files += 1
            continue
        raw = dst.read_bytes()
        sha = sha256_bytes(raw)
        ext = dst.suffix.lower()
        parts = rel.split("/")
        group, category, status = m["group"], m["category"], m["status"]
        tier, rule = tier_for(group, category)
        analysis = analyse_py(raw, parts, declared) if ext == ".py" else None
        doc = analysis["doc"] if analysis else (md_title(raw) if ext == ".md" else "")
        drift = sha != m["sha_dst"]
        drifted += drift
        try:
            src_rel = os.path.relpath(m["source"], TOOLKIT).replace("\\", "/")
        except ValueError:
            src_rel = m["source"]
        if tier == 2 and analysis:
            for name in (analysis["status"].split(": ", 1)[1].split(", ") if analysis["status"].startswith("UNDECLARED") else []):
                undeclared_names[name] += 1
        new = {
            "path": src_rel,
            "compiles": analysis["compiles"] if analysis else "",
            "lines": (raw.count(b"\n") + 1) if (ext in TEXT_EXT and raw) else "",
            "first_docstring_line": doc or "[%s] %s" % (category, dst.name),
            "group": group,
            "capability_category": CATEGORY.get(group, "Imported"),
            "specific_capability": category,
            "disposition": "copied (import 2026-10-14)",
            "toolkit_path": rel,
            "confirmed_present": "yes",
            "verified_execution": OBSERVED.get(status, ""),
            "not_verified": "not run here" if status in ("UNVERIFIED-SOURCE", "STARTER-INCOMPLETE") else "",
            "proposed": "",
            "unresolved": "",
            "third_party_imports": ", ".join(analysis["third"]) if analysis else "",
            "path_markers": "",
            "in_original_inventory": "no",
            "reason": "import 2026-10-14; import status %s%s" % (status, "; modified after copy (site build)" if drift else ""),
            "tier": str(tier),
            "tier_rule": rule,
            "sha256": sha,
            "check_status": "",
        }
        new["check_status"] = check_status(tier, ext, analysis)
        r = index.get(rel)
        if r is None:
            r = {c: "" for c in fields}
            rows.append(r)
            index[rel] = r
            added += 1
        else:
            updated += 1
            new["check_status"] = keep_review(r, new["check_status"])
        r.update(new)
        stats["tier %d" % tier] += 1
        if analysis and analysis["compiles"] == "SYNTAX-ERROR":
            stats["syntax errors (%s)" % PARSER] += 1
        if tier == 2 and analysis and analysis["status"].startswith("UNDECLARED"):
            stats["tier 2 python with undeclared deps"] += 1
        if tier == 2 and analysis and analysis["status"].startswith("STATIC-OK"):
            stats["tier 2 python static-ok"] += 1

    # 3. Report
    tiers = Counter((r.get("tier") or "-") for r in rows if (r.get("toolkit_path") or "").strip())
    print("INVENTORY.csv: %d rows before, %d after (%d added, %d updated, %d imported files missing on disk)"
          % (n_original, len(rows), added, updated, missing_files))
    print("rows with a toolkit_path by tier:", dict(sorted(tiers.items())))
    for k, v in sorted(stats.items()):
        print("  %s: %d" % (k, v))
    print("  imported files modified after copy: %d" % drifted)
    if undeclared_names:
        print("  most common undeclared imports in tier 2 code:", undeclared_names.most_common(12))
    print("declared package names found in requirements/pyproject files: %d" % len(declared))

    if not args.write:
        print("\n(dry run: nothing written; use --write to apply)")
        return 0

    if not BACKUP.exists():
        BACKUP.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(INVENTORY, BACKUP)
        print("backup written:", BACKUP)
    tmp = INVENTORY.with_suffix(".csv.tmp")
    with open(tmp, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields, lineterminator="\n", extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)

    # Self-check: every original row keeps every original value, except the path normalisation and
    # the refreshed `compiles` value on toolkit rows.
    with open(tmp, encoding="utf-8", newline="") as f:
        written = list(csv.DictReader(f))
    allowed = {"path", "toolkit_path", "compiles"}
    unexpected = 0
    for before, after in zip(original, written[:n_original]):
        for col, val in before.items():
            if (after.get(col) or "") == (val or ""):
                continue
            if col not in allowed or not (before.get("toolkit_path") or "").strip():
                unexpected += 1
    if len(written) != len(rows) or unexpected:
        tmp.unlink()
        print("SELF-CHECK FAILED (%d unexpected changes); INVENTORY.csv left untouched" % unexpected)
        return 1
    os.replace(tmp, INVENTORY)
    print("written: %s (%d rows; original %d rows preserved, 0 unexpected changes)"
          % (INVENTORY.name, len(written), n_original))
    return 0


if __name__ == "__main__":
    sys.exit(main())
