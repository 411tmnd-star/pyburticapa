"""
Fetch a GitHub repo for READ-ONLY inspection and write a markdown report.
Nothing from the repo is installed or executed.

    repos/<owner>__<repo>/          the downloaded source
    reports/<owner>__<repo>.md      the inspection report

Report covers: file tree, languages, licence, dependencies, entry points, and
keyword hits for the areas you want to study (task loop, memory, marketplace...).

Usage:
    python repo_inspect.py https://github.com/<owner>/<repo>
    python repo_inspect.py <url> --keywords "memory,retriev,bid,payment"
    python repo_inspect.py <url> --no-fetch          # re-inspect an existing download
    python repo_inspect.py --dry-run <url>

Fetch order: `git clone --depth 1` if git is installed, else the public ZIP
(no login, no API key). Safe to re-run: an existing download is reused.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
import zipfile
from collections import Counter
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parent
REPOS_DIR = ROOT / "repos"
REPORTS_DIR = ROOT / "reports"

URL_RE = re.compile(r"https?://(?:www\.)?github\.com/([A-Za-z0-9_.-]+)/([A-Za-z0-9_.-]+?)(?:\.git)?/?$")
SKIP_DIRS = {".git", "node_modules", "dist", "build", "__pycache__", ".venv", "venv", ".next"}
CODE_EXTS = {".py", ".ts", ".tsx", ".js", ".jsx", ".go", ".rs", ".java", ".sol", ".sh", ".md"}
MANIFESTS = ["package.json", "pyproject.toml", "requirements.txt", "Cargo.toml", "go.mod", "pom.xml"]
ENTRY_NAMES = {"main.py", "app.py", "__main__.py", "index.ts", "index.js", "main.ts", "main.go", "cli.ts", "cli.py", "server.ts"}
LICENCE_HINTS = {
    "MIT License": "MIT", "Apache License": "Apache-2.0", "GNU GENERAL PUBLIC LICENSE": "GPL",
    "GNU AFFERO": "AGPL", "BSD": "BSD", "Mozilla Public License": "MPL-2.0", "The Unlicense": "Unlicense",
}
# Areas worth studying in an agent repo; override with --keywords
DEFAULT_KEYWORDS = {
    "task loop": ["task", "loop", "queue", "scheduler", "plan", "execute"],
    "memory": ["memory", "embedding", "vector", "retriev", "recall", "store"],
    "marketplace": ["marketplace", "bid", "invoice", "payment", "escrow", "wallet", "freelance"],
    "self-improvement": ["feedback", "reflect", "improve", "evaluate", "learn"],
}
MAX_HITS = 8


def parse_url(url: str) -> tuple[str, str]:
    m = URL_RE.match(url.strip())
    if not m:
        sys.exit(f"Not a github.com/<owner>/<repo> URL: {url}")
    return m.group(1), m.group(2)


def fetch(owner: str, repo: str, dest: Path) -> None:
    if dest.exists() and any(dest.iterdir()):
        print(f"Using existing download: {dest}")
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    url = f"https://github.com/{owner}/{repo}"
    if shutil.which("git"):
        # core.symlinks=false and no hooks: nothing in the repo runs on checkout
        r = subprocess.run(["git", "-c", "core.symlinks=false", "-c", "core.hooksPath=NUL",
                            "clone", "--depth", "1", url, str(dest)])
        if r.returncode == 0:
            return
        print("git clone failed, falling back to ZIP ...")
        shutil.rmtree(dest, ignore_errors=True)
    zip_path = dest.with_suffix(".zip")
    resp = requests.get(f"{url}/archive/HEAD.zip", timeout=120, stream=True,
                        headers={"User-Agent": "Mozilla/5.0"})
    if resp.status_code != 200:
        sys.exit(f"Download failed: HTTP {resp.status_code} for {url}")
    with open(zip_path, "wb") as f:
        shutil.copyfileobj(resp.raw, f)
    dest.mkdir(parents=True)
    with zipfile.ZipFile(zip_path) as z:
        for member in z.infolist():
            parts = Path(member.filename).parts[1:]  # drop the <repo>-<branch>/ prefix
            if not parts or ".." in parts or member.is_dir():
                continue
            target = dest.joinpath(*parts)
            if dest.resolve() not in target.resolve().parents:
                continue  # zip-slip guard
            target.parent.mkdir(parents=True, exist_ok=True)
            with z.open(member) as src, open(target, "wb") as out:
                shutil.copyfileobj(src, out)
    zip_path.unlink()


def walk(base: Path):
    for p in sorted(base.rglob("*")):
        if p.is_file() and not (set(p.relative_to(base).parts) & SKIP_DIRS):
            yield p


def tree(base: Path, depth: int = 2) -> str:
    lines = []
    for p in sorted(base.iterdir()):
        if p.name in SKIP_DIRS or p.name.startswith(".git"):
            continue
        lines.append(f"{p.name}/" if p.is_dir() else p.name)
        if p.is_dir() and depth > 1:
            kids = [k for k in sorted(p.iterdir()) if k.name not in SKIP_DIRS][:15]
            lines += [f"  {k.name}/" if k.is_dir() else f"  {k.name}" for k in kids]
    return "\n".join(lines)


def detect_licence(base: Path) -> str:
    for name in ("LICENSE", "LICENSE.md", "LICENSE.txt", "COPYING"):
        f = base / name
        if f.exists():
            text = f.read_text(encoding="utf-8", errors="ignore")
            for hint, label in LICENCE_HINTS.items():
                if hint.lower() in text.lower():
                    return f"{label} ({name})"
            return f"unrecognised ({name}) - read it"
    return "NO LICENCE FILE - treat as all rights reserved"


def dependencies(base: Path) -> str:
    out = []
    for name in MANIFESTS:
        f = base / name
        if not f.exists():
            continue
        text = f.read_text(encoding="utf-8", errors="ignore")
        if name == "package.json":
            try:
                pkg = json.loads(text)
                deps = sorted({**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})})
                scripts = pkg.get("scripts", {})
                out.append(f"**{name}** - {len(deps)} deps: {', '.join(deps[:40])}")
                if scripts:
                    out.append(f"  scripts (not run): {', '.join(scripts)}")
                    risky = [k for k in scripts if k in ("preinstall", "install", "postinstall")]
                    if risky:
                        out.append(f"  WARNING install-time scripts present: {', '.join(risky)}")
            except ValueError:
                out.append(f"**{name}** - could not parse")
        else:
            out.append(f"**{name}**\n```\n{text[:1500]}\n```")
    return "\n".join(out) or "_no known manifest found_"


def keyword_hits(base: Path, areas: dict[str, list[str]]) -> str:
    files = [p for p in walk(base) if p.suffix in CODE_EXTS - {".md"} and p.stat().st_size < 400_000]
    out = []
    for area, words in areas.items():
        pat = re.compile("|".join(re.escape(w) for w in words), re.I)
        scored = []
        for p in files:
            text = p.read_text(encoding="utf-8", errors="ignore")
            n = len(pat.findall(text))
            if n:
                scored.append((n, p.relative_to(base).as_posix()))
        scored.sort(reverse=True)
        out.append(f"### {area}  (terms: {', '.join(words)})")
        out += [f"- `{path}` - {n} hits" for n, path in scored[:MAX_HITS]] or ["- _no hits_"]
        out.append("")
    return "\n".join(out)


def build_report(owner: str, repo: str, base: Path, areas: dict[str, list[str]]) -> str:
    files = list(walk(base))
    langs = Counter(p.suffix for p in files if p.suffix in CODE_EXTS)
    entries = [p.relative_to(base).as_posix() for p in files if p.name in ENTRY_NAMES][:15]
    readme = next((base / n for n in ("README.md", "readme.md") if (base / n).exists()), None)
    readme_text = readme.read_text(encoding="utf-8", errors="ignore")[:2500] if readme else "_no README_"
    return "\n".join([
        f"# Inspection: {owner}/{repo}",
        f"Source: https://github.com/{owner}/{repo}",
        "_Read-only inspection. Nothing was installed or run._", "",
        f"## Licence\n{detect_licence(base)}", "",
        f"## Size\n{len(files)} files; by type: {dict(langs.most_common())}", "",
        f"## Structure\n```\n{tree(base)}\n```", "",
        "## Entry points\n" + ("\n".join(f"- `{e}`" for e in entries) or "_none by common names_"), "",
        f"## Dependencies\n{dependencies(base)}", "",
        f"## Where to look (keyword hits)\n{keyword_hits(base, areas)}",
        f"## README (first 2500 chars)\n{readme_text}", "",
        "## Reuse notes (fill in by hand)\n- Reusable capability:\n- Marketplace-specific (skip):\n- Licence/security concerns:\n",
    ])


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("url", help="https://github.com/<owner>/<repo>")
    ap.add_argument("--keywords", default=None, help="comma-separated terms for one extra 'custom' area")
    ap.add_argument("--no-fetch", action="store_true", help="skip download, inspect existing copy")
    ap.add_argument("--dry-run", action="store_true", help="show what would happen, write nothing")
    ap.add_argument("--out", default=None, help="output folder holding repos/ and reports/ (default: next to this script)")
    args = ap.parse_args()

    repos_dir = Path(args.out).resolve() / "repos" if args.out else REPOS_DIR
    reports_dir = Path(args.out).resolve() / "reports" if args.out else REPORTS_DIR
    owner, repo = parse_url(args.url)
    dest = repos_dir / f"{owner}__{repo}"
    report = reports_dir / f"{owner}__{repo}.md"
    areas = dict(DEFAULT_KEYWORDS)
    if args.keywords:
        areas["custom"] = [k.strip() for k in args.keywords.split(",") if k.strip()]

    if args.dry_run:
        print(f"Would fetch https://github.com/{owner}/{repo} -> {dest}\nWould write {report}")
        return
    if not args.no_fetch:
        fetch(owner, repo, dest)
    if not dest.is_dir():
        sys.exit(f"Nothing to inspect at {dest} (run without --no-fetch)")
    reports_dir.mkdir(parents=True, exist_ok=True)
    report.write_text(build_report(owner, repo, dest, areas), encoding="utf-8")
    print(f"Report written: {report}")


if __name__ == "__main__":
    main()
