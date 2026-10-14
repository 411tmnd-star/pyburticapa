"""Copy (never move) the Python-relevant material of the course repo and AudioLab into the Toolkit.

Every copy is hashed before and after, and each file gets one row in imports/IMPORT_MANIFEST.csv
(files left out get a row too, with the reason). Originals are not touched. Nothing is executed.

Usage:
    python _meta/import_bundle.py            # dry run: count and classify, write nothing
    python _meta/import_bundle.py --run      # copy, verify hashes, write the manifest

Status vocabulary (column `status`):
    RUN-OBSERVED       the test suite that covers it passed in a run observed in this session
    TYPECHECKED        tsc --noEmit exit 0, observed in this session; not otherwise run
    REPORTED-PASS      a pass recorded by its author or owner in a report; not re-run here
    UNVERIFIED-SOURCE  source present; nothing was run here
    STARTER-INCOMPLETE learner starter code, unfinished by design
    REFERENCE          data, docs, configs, schemas, generated outputs, skills (not executable)
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import fnmatch
import hashlib
import os
import shutil
from dataclasses import dataclass, field
from pathlib import Path

TOOLKIT = Path(__file__).resolve().parent.parent
IMPORTS = TOOLKIT / "imports"
MANIFEST = IMPORTS / "IMPORT_MANIFEST.csv"
MIGRATION_LOG = TOOLKIT / "MIGRATION_LOG.csv"

COURSE_SRC = TOOLKIT / "ai-engineering-from-scratch"
AUDIO_SRC = Path(r"C:\Users\USER\Desktop\audio_lab")
WORK_SRC = Path(r"C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0")
SNAP_SRC = Path(r"C:\Users\USER\Desktop\audio_lab_snapshots")

MAX_BYTES = 25 * 1024 * 1024

# Binary or regenerable material that is never copied.
BINARY_EXT = {
    ".gif", ".png", ".jpg", ".jpeg", ".webp", ".mp4", ".mov", ".webm", ".mp3", ".m4a", ".ogg",
    ".flac", ".pdf", ".zip", ".gz", ".tar", ".pack", ".idx", ".rev", ".pt", ".pth", ".safetensors",
    ".onnx", ".ttf", ".otf", ".woff", ".woff2", ".pyc", ".exe", ".dll", ".so", ".pyd", ".ico",
}
SKIP_DIR_NAMES = {".git", "node_modules", "__pycache__", ".pytest_cache", ".venv", "venv",
                  ".next", "egg-info", "catalog"}
LANG = {".py": "python", ".ts": "typescript", ".tsx": "typescript", ".js": "javascript",
        ".mjs": "javascript", ".cjs": "javascript", ".rs": "rust", ".go": "go", ".jl": "julia",
        ".sh": "shell", ".ps1": "powershell", ".html": "html", ".css": "css", ".json": "data",
        ".md": "doc", ".txt": "text", ".csv": "data", ".yaml": "config", ".yml": "config",
        ".toml": "config", ".npz": "data", ".bin": "data"}


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


@dataclass
class Row:
    group: str
    source: str
    destination: str
    bytes: int
    status: str
    category: str
    language: str
    toolkit_status: str
    action: str  # COPIED | EXCLUDED
    reason: str = ""
    sha_src: str = ""
    sha_dst: str = ""
    hash_check: str = ""


@dataclass
class Group:
    name: str
    src: Path
    dst: Path  # relative to imports/
    classify: object  # (rel_posix) -> (status, category)
    skip_top: set = field(default_factory=set)
    only_top: set | None = None  # when set, only these top-level entries are walked
    allow_ext_override: set = field(default_factory=set)  # extensions allowed despite BINARY/AUDIO rules
    skip_ext: set = field(default_factory=set)
    skip_prefix: set = field(default_factory=set)  # relative posix prefixes pruned during the walk
    only_names: set | None = None  # copy only files with these names (provenance records)
    compare_to: Path | None = None  # copy only files that differ from this tree
    binary_only: bool = False  # copy only binary media (the text is already imported elsewhere)


TOOLKIT_STATUS = {
    "RUN-OBSERVED": "V", "TYPECHECKED": "C", "REPORTED-PASS": "ACCEPTED",
    "UNVERIFIED-SOURCE": "-", "STARTER-INCOMPLETE": "-", "REFERENCE": "-",
}


def course_class(rel: str) -> tuple[str, str]:
    p = rel.split("/")
    name = p[-1]
    if p[0] == "phases":
        if "code" in p[:-1]:
            return "UNVERIFIED-SOURCE", "lesson-code"
        if "outputs" in p:
            return "REFERENCE", "capability-artifact"
        if name == "quiz.json":
            return "REFERENCE", "lesson-quiz"
        if name.endswith(".md"):
            return "REFERENCE", "lesson-doc"
        return "REFERENCE", "lesson-other"
    if p[0] == "projects":
        if len(p) > 1 and p[1] == "validation":
            return "REPORTED-PASS", "validation-record"
        if "starter" in p:
            return "STARTER-INCOMPLETE", "project-starter"
        if len(p) > 2 and p[2] == "solution":
            return "REPORTED-PASS", "project-reference-solution"
        if "tests" in p:
            return "REPORTED-PASS", "project-stage-test"
        if "stages" in p:
            return "REFERENCE", "project-stage-doc"
        return "REFERENCE", "project-meta"
    if p[0] == "certifications":
        if "code" in p or "tests" in p:
            return "UNVERIFIED-SOURCE", "certification-code"
        return "REFERENCE", "certification-doc"
    if p[0] == "scripts":
        return "UNVERIFIED-SOURCE", "workflow-script"
    if p[0] == "manuals" and "capture" in p and name.endswith(".py"):
        return "UNVERIFIED-SOURCE", "capture-script"
    if p[0] in (".claude", "skills"):
        return "REFERENCE", "skill"
    return "REFERENCE", "doc-or-data"


def audio_class(rel: str) -> tuple[str, str]:
    p = rel.split("/")
    if p[0] == "src":
        return "RUN-OBSERVED", "audiolab-package"
    if p[0] == "tests":
        return "RUN-OBSERVED", "audiolab-test"
    if p[0] == "web_kit":
        if len(p) > 1 and p[1] == "tests":
            return "RUN-OBSERVED", "web-test"
        if len(p) > 2 and p[1] == "src" and p[2] == "lib":
            return "RUN-OBSERVED", "web-pipeline-lib"
        if len(p) > 1 and p[1] == "src":
            return "TYPECHECKED", "web-component-or-page"
        if len(p) > 1 and p[1] == "preview":
            return "UNVERIFIED-SOURCE", "web-preview-script"
        if len(p) > 1 and p[1] in ("public", "bassdata", "shots", "screenshots", "research"):
            return "REFERENCE", "web-data-or-research"
        return "REFERENCE", "web-config"
    if p[0] == "scripts":
        return "UNVERIFIED-SOURCE", "workflow-script"
    if p[0] in ("configs", "schemas"):
        return "REFERENCE", "config-or-schema"
    if p[0] == "outputs":
        return "REFERENCE", "generated-analysis"
    return "REFERENCE", "project-file"


def work_delta_class(rel: str) -> tuple[str, str]:
    # Files that differ from the live project exist only in the working copy. Their passes are
    # claimed in the reports, not observed here, so run/typecheck statuses are downgraded.
    status, category = audio_class(rel)
    if status in ("RUN-OBSERVED", "TYPECHECKED"):
        return "REPORTED-PASS", category
    return status, category


def work_class(rel: str) -> tuple[str, str]:
    p = rel.split("/")
    if p[0] == "audio_lab":
        return audio_class("/".join(p[1:]))
    if p[0] in ("evidence", "evidence-core", "evidence-matrix"):
        return "UNVERIFIED-SOURCE", "evidence-script"
    if p[0] in ("env", "milestones"):
        return "REFERENCE", "environment-or-milestone-record"
    return "REFERENCE", "status-report"


def api_class(rel: str) -> tuple[str, str]:
    p = rel.split("/")
    name = p[-1]
    if p[0] in ("api", "lib"):
        return "UNVERIFIED-SOURCE", "api-or-lib-code"
    if p[0] == "site" and name.startswith("build") or name in ("clean-urls.js", "version-assets.js", "fetch-translation-coverage.js"):
        return "UNVERIFIED-SOURCE", "site-build-script"
    if p[0] == "site" and name.startswith("test_"):
        return "UNVERIFIED-SOURCE", "site-test"
    if p[0] == "site" and name.endswith(".js"):
        return "REFERENCE", "site-script-or-figure"
    return "REFERENCE", "site-page-data-or-asset"


def api_groups() -> list[Group]:
    # The public API (api/), its shared code (lib/) and the site it reads and builds (site/).
    return [
        Group("api_site_mcp", COURSE_SRC, Path("ai_engineering"), api_class,
              only_top={"api", "lib", "site", "assets", "web"}),
    ]


def media_class(rel: str) -> tuple[str, str]:
    return "REFERENCE", "build-media"


def media_groups() -> list[Group]:
    # Binary media the site build checks for (project recordings, images). Text was copied already.
    return [
        Group("build_media", COURSE_SRC, Path("ai_engineering"), media_class,
              only_top={"projects", "site", "assets", "web", "lib", "manuals"}, binary_only=True),
    ]


def groups() -> list[Group]:
    return [
        Group("ai_engineering", COURSE_SRC, Path("ai_engineering"), course_class,
              skip_top={"site", "api", "lib", "web", "assets", ".git", "node_modules"}),
        Group("audio_lab", AUDIO_SRC, Path("audio_lab"), audio_class,
              skip_top={".venv", ".pytest_cache", "outputs"},
              skip_ext={".wav", ".mp3"}),
        Group("audio_lab_outputs", AUDIO_SRC / "outputs", Path("audio_lab/outputs"), audio_class,
              skip_ext={".wav", ".png", ".gif"}),
        Group("audio_lab_work_delta", WORK_SRC / "audio_lab", Path("audio_lab_work/audio_lab"),
              work_delta_class, skip_top={".venv", ".pytest_cache", "outputs", "env"},
              skip_ext={".wav", ".mp3", ".png", ".gif"}, compare_to=AUDIO_SRC),
        Group("audio_lab_work_reports", WORK_SRC, Path("audio_lab_work/reports"), work_class,
              skip_top={"audio_lab"}, skip_prefix={"env/venv-py311"},
              skip_ext={".wav", ".mp3", ".png", ".gif"}),
        Group("audio_lab_snapshot_records", SNAP_SRC, Path("audio_lab_snapshots"), work_class,
              skip_top=set(), skip_prefix={"2026-10-12_step0_pre-accretion/audio_lab",
                                            "2026-10-13_pre-accretion-impl/audio_lab",
                                            "2026-10-13_pre-accretion-impl/env"},
              only_names={"MANIFEST.sha256.csv", "README.txt", "HASHES.csv", "EXCLUSIONS.txt",
                          "MANIFEST.attempt1_rejected_exclusion_regex_bug.csv"}),
    ]


def walk(group: Group):
    root = group.src
    if not root.exists():
        return
    for dirpath, dirnames, filenames in os.walk(root):
        rel_dir = Path(dirpath).relative_to(root)
        rel_posix = "" if rel_dir == Path(".") else rel_dir.as_posix()
        parts = rel_dir.parts
        if parts and parts[0] in group.skip_top:
            dirnames[:] = []
            continue
        if group.only_top is not None and parts and parts[0] not in group.only_top:
            dirnames[:] = []
            continue
        if group.only_top is not None and not parts:
            dirnames[:] = [d for d in dirnames if d in group.only_top]
            continue
        if any(rel_posix == p or rel_posix.startswith(p + "/") for p in group.skip_prefix):
            dirnames[:] = []
            continue
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIR_NAMES and not d.endswith(".egg-info")]
        for fn in filenames:
            rel = (rel_dir / fn).as_posix()
            if group.only_names is not None and fn not in group.only_names:
                continue
            yield Path(dirpath) / fn, rel


def excluded_reason(group: Group, src: Path, rel: str) -> str | None:
    ext = src.suffix.lower()
    if ext in group.skip_ext:
        return f"excluded extension {ext} (input media or regenerable binary)"
    if group.binary_only:
        if ext not in BINARY_EXT or ext == ".pdf":
            return "text file or PDF: not part of the binary media batch"
        return None if src.stat().st_size <= MAX_BYTES else f"larger than {MAX_BYTES // (1024 * 1024)} MB"
    if ext in BINARY_EXT and not (ext == ".bin" and "public/motion" in rel):
        return f"binary ({ext}) not copied; regenerable or non-text"
    if src.stat().st_size > MAX_BYTES:
        return f"larger than {MAX_BYTES // (1024 * 1024)} MB"
    return None


def plan(group: Group, rows: list[Row], now: str) -> None:
    src_root = group.src
    for src, rel in walk(group):
        ext = src.suffix.lower()
        size = src.stat().st_size
        status, category = group.classify(rel)
        language = LANG.get(ext, "-")
        dst = IMPORTS / group.dst / rel
        reason = excluded_reason(group, src, rel)
        if reason:
            rows.append(Row(group.name, str(src), str(dst), size, status, category, language,
                            "-", "EXCLUDED", reason))
            continue
        if group.compare_to is not None:
            other = group.compare_to / rel
            if other.exists() and other.stat().st_size == size and sha256(other) == sha256(src):
                rows.append(Row(group.name, str(src), str(dst), size, status, category, language,
                                "-", "EXCLUDED", "identical to the live project copy (already imported)"))
                continue
        rows.append(Row(group.name, str(src), str(dst), size, status, category, language,
                        TOOLKIT_STATUS[status], "COPIED"))


def run(rows: list[Row], now: str) -> None:
    if MANIFEST.exists():
        raise SystemExit(f"{MANIFEST} already exists; the import has run. Remove it deliberately to rerun.")
    for r in rows:
        if r.action != "COPIED":
            continue
        src, dst = Path(r.source), Path(r.destination)
        dst.parent.mkdir(parents=True, exist_ok=True)
        r.sha_src = sha256(src)
        shutil.copy2(src, dst)
        r.sha_dst = sha256(dst)
        r.hash_check = "match" if r.sha_src == r.sha_dst else "MISMATCH"
    bad = [r for r in rows if r.hash_check == "MISMATCH"]
    if bad:
        raise SystemExit(f"{len(bad)} hash mismatches; first: {bad[0].source}")

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    fields = list(Row.__dataclass_fields__.keys())
    with open(MANIFEST, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        for r in rows:
            w.writerow(r.__dict__)

    # Append-only log, same columns as the Toolkit's existing MIGRATION_LOG.csv.
    with open(MIGRATION_LOG, "a", newline="", encoding="utf-8") as f:
        w = csv.writer(f, lineterminator="\n")  # the log uses LF; the csv default would append CRLF rows
        for r in rows:
            if r.action != "COPIED":
                continue
            w.writerow([r.group, r.source, r.destination, "COPIED", r.sha_src, r.sha_dst,
                        r.hash_check, now])


def summarize(rows: list[Row]) -> str:
    from collections import Counter
    out = []
    for g in sorted({r.group for r in rows}):
        sub = [r for r in rows if r.group == g]
        copied = [r for r in sub if r.action == "COPIED"]
        out.append(f"{g}: copied {len(copied)} ({sum(r.bytes for r in copied)/1e6:.1f} MB), "
                   f"excluded {len(sub) - len(copied)}")
        for k, v in Counter(r.status for r in copied).most_common():
            out.append(f"    {k}: {v}")
    return "\n".join(out)


def main() -> int:
    global MANIFEST
    ap = argparse.ArgumentParser()
    ap.add_argument("--run", action="store_true", help="copy and write manifest (default: dry run)")
    ap.add_argument("--batch", choices=["main", "api", "media"], default="main",
                    help="main: the original import; api: API, MCP endpoint and their site files; "
                         "media: binary media the site build checks for")
    args = ap.parse_args()
    now = dt.datetime.now().isoformat(timespec="seconds")
    rows: list[Row] = []
    if args.batch == "api":
        MANIFEST = IMPORTS / "IMPORT_MANIFEST_API.csv"
        selected = api_groups()
    elif args.batch == "media":
        MANIFEST = IMPORTS / "IMPORT_MANIFEST_MEDIA.csv"
        selected = media_groups()
    else:
        selected = groups()
    for g in selected:
        plan(g, rows, now)
    print(summarize(rows))
    if args.run:
        run(rows, now)
        print(f"\nwrote {MANIFEST} ({len(rows)} rows) and appended to {MIGRATION_LOG.name}")
    else:
        print("\n(dry run: nothing written)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
