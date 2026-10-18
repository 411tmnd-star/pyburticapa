"""Handoff kit: the first command of every Claude Code session on this repo.

A reporter, not a fixer. It prints the environment, runs the test suite, and names
the first open workflow from python_skills/my_flows/to_confirm/REGISTRY.csv. It
writes nothing, installs nothing and never prints a key's value.

Exit code: 0 when the tests pass (or were skipped on request) and Python is new
enough; 1 when the tests fail or Python is too old; 2 on a bad --root.

Run:  python -I -X utf8 python_skills/confirmed/handoff_kit/init.py
      python -I -X utf8 python_skills/confirmed/handoff_kit/init.py --skip-tests
"""

import argparse
import csv
import importlib.util
import os
import re
import shutil
import subprocess
import sys
import time
from pathlib import Path

MIN_PYTHON = (3, 11)
DEFAULT_KEYS = ("ANTHROPIC_API_KEY", "YOUTUBE_API_KEY")
TEST_COMMAND = ("-I", "-X", "utf8", "-m", "unittest", "discover", "-s", "tests")
TEST_TIMEOUT_SECONDS = 1800
CLOSED_NOTES = ("blocked", "parked")  # a note starting with one of these skips the row


def default_root():
    return Path(__file__).resolve().parents[3]


def run(cmd, cwd, timeout=30):
    try:
        p = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, encoding="utf-8",
                           errors="replace", timeout=timeout)
        return p.returncode, (p.stdout + p.stderr).strip()
    except (OSError, subprocess.TimeoutExpired) as e:
        return 127, str(e)


def tool_version(name):
    exe = shutil.which(name)
    if not exe:
        return None
    code, out = run([exe, "--version" if name == "git" else "-version"], cwd=None)
    first = out.splitlines()[0].split(" Copyright")[0] if out else ""
    return first[:70] if code == 0 and first else "found, version unreadable"


def environment(keys):
    """Return (lines, python_ok). Lines are (label, status, detail)."""
    lines = []
    v = sys.version_info
    py_ok = (v.major, v.minor) >= MIN_PYTHON
    lines.append(("python", "ok" if py_ok else "FAIL",
                  f"{v.major}.{v.minor}.{v.micro}" + ("" if py_ok else f" (need >= {MIN_PYTHON[0]}.{MIN_PYTHON[1]})")))
    for tool in ("ffmpeg", "ffprobe", "git"):
        ver = tool_version(tool)
        lines.append((tool, "ok" if ver else "missing", ver or "not on PATH"))
    has_bpy = importlib.util.find_spec("bpy") is not None
    lines.append(("bpy", "ok" if has_bpy else "missing", "importable" if has_bpy else "not installed (only W09, W10, W13 need it)"))
    for k in keys:
        lines.append((k, "set" if os.environ.get(k) else "not set", "value is never printed"))
    return lines, py_ok


def git_state(root):
    code, branch = run(["git", "branch", "--show-current"], root)
    if code != 0:
        return "not a git repository"
    _, status = run(["git", "status", "--porcelain"], root)
    dirty = len([ln for ln in status.splitlines() if ln.strip()])
    code, counts = run(["git", "rev-list", "--left-right", "--count", "HEAD...@{u}"], root)
    if code == 0 and len(counts.split()) == 2:
        ahead, behind = counts.split()
        sync = f"ahead {ahead}, behind {behind} (local refs; no fetch)"
    else:
        sync = "no upstream"
    return f"branch {branch or '(detached)'}, {'clean' if not dirty else str(dirty) + ' changed file(s)'}, {sync}"


def run_tests(root):
    """Return (passed, summary, tail_lines, seconds)."""
    started = time.time()
    code, out = run([sys.executable, *TEST_COMMAND], root, timeout=TEST_TIMEOUT_SECONDS)
    seconds = time.time() - started
    ran = re.search(r"^Ran (\d+) tests? in ([\d.]+)s", out, re.M)
    verdict = "OK" if re.search(r"^OK", out, re.M) else (re.search(r"^FAILED.*$", out, re.M).group(0) if re.search(r"^FAILED", out, re.M) else "no verdict")
    summary = f"{ran.group(1)} test(s) in {ran.group(2)}s, {verdict}" if ran else f"no test count found ({verdict})"
    return code == 0, summary, out.splitlines()[-15:], seconds


def first_open_workflow(root):
    """First row of REGISTRY.csv, in registry order, that is not confirmed and not blocked/parked."""
    reg = root / "python_skills" / "my_flows" / "to_confirm" / "REGISTRY.csv"
    if not reg.is_file():
        return None, f"{reg.relative_to(root)} not found", []
    with open(reg, encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))
    closed = [r for r in rows if r["status"] == "to confirm" and (r.get("notes") or "").lower().startswith(CLOSED_NOTES)]
    for r in rows:
        if r["status"] == "confirmed" or r in closed:
            continue
        return r, None, closed
    return None, None, closed


def describe(root, row):
    folder = root / "python_skills" / "my_flows" / "to_confirm" / row["folder"]
    lines = [f"{row['id']} {row['name']} (type {row['type']}, goals: {row['goals']})", f"folder: {folder.relative_to(root).as_posix()}"]
    wf = folder / "WORKFLOW.md"
    if wf.is_file():
        m = re.search(r"^## Pass\s*\n+(.+?)\n\n", wf.read_text(encoding="utf-8"), re.M | re.S)
        if m:
            lines.append("pass test: " + " ".join(m.group(1).split()))
    tasks = folder / "TASKS.md"
    if tasks.is_file():
        t = tasks.read_text(encoding="utf-8")
        ev = t.split("## Evidence")[-1].strip() if "## Evidence" in t else ""
        lines.append("evidence so far: " + ("none yet" if ev in ("", "(empty)") else "recorded in TASKS.md"))
    return lines


def main(argv=None):
    ap = argparse.ArgumentParser(description="Report environment, test result and the first open workflow.")
    ap.add_argument("--root", default=None, help="repo root (default: this file's repo)")
    ap.add_argument("--skip-tests", action="store_true", help="do not run the test suite (the report says so)")
    ap.add_argument("--keys", default="", help="extra environment variable names to check, comma separated")
    args = ap.parse_args(argv)

    root = Path(args.root).resolve() if args.root else default_root()
    if not root.is_dir():
        print(f"init: --root {root} is not a folder", file=sys.stderr)
        return 2
    keys = DEFAULT_KEYS + tuple(k.strip() for k in args.keys.split(",") if k.strip())

    print(f"== Handoff report for {root.name}")
    print("\n[environment]")
    env_lines, py_ok = environment(keys)
    for label, status, detail in env_lines:
        print(f"  {label:<18} {status:<8} {detail}")
    print(f"  {'git':<18} {'':<8} {git_state(root)}")

    print("\n[tests]")
    tests_ok = True
    if args.skip_tests:
        print("  SKIPPED (--skip-tests): the suite was not run")
    elif not (root / "tests").is_dir():
        tests_ok = False
        print("  FAIL no tests/ folder")
    else:
        print("  running: python " + " ".join(TEST_COMMAND))
        tests_ok, summary, tail, secs = run_tests(root)
        print(f"  {'PASS' if tests_ok else 'FAIL'} {summary} (wall {secs:.0f}s)")
        if not tests_ok:
            for ln in tail:
                print("    | " + ln)

    print("\n[next]")
    row, problem, closed = first_open_workflow(root)
    if problem:
        print("  " + problem)
    elif row is None:
        print("  first open: none (every workflow is confirmed, blocked or parked)")
    else:
        print(f"  first open: {row['id']} (registry order)")
        for ln in describe(root, row):
            print("  " + ln)
    for r in closed:
        print(f"  skipped {r['id']}: {r['notes']}")

    ok = tests_ok and py_ok
    print(f"\n== {'READY' if ok else 'NOT READY'}")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
