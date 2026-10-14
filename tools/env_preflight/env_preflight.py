"""Route-aware environment preflight for the Python Toolkit (read-only; installs nothing).

ADAPTED from rohitg00/ai-engineering-from-scratch (MIT, (c) 2026 Rohit Ghumare), commit
1c8e62b526e78b8773559594aab3a3487d9998ac, phases/00-setup-and-tooling/01-dev-environment/code/verify.py
(sha256 94a5998e68aef91a5bdc86332ec909cee3f2ba51e6ea27fb259549323bd3bebb). See PROVENANCE.md.

Unchanged from upstream: Result/Probe/Route, command_result, python_result, module_result, the
PASS/FAIL/LATER report and exit codes. Changed: the probes and routes describe the Toolkit's tools
(import names are probed with importlib.util.find_spec, so nothing is imported or installed), and
`--route all` is added, and command_result takes a version_flag (ffmpeg uses `-version`). Upstream's course routes and torch/gpu probes were removed.

Usage: python -I -X utf8 tools/env_preflight/env_preflight.py --route pipeline [--show-later]
"""

from __future__ import annotations

import argparse
import importlib.util
import platform
import shutil
import subprocess
import sys
from dataclasses import dataclass
from typing import Callable


@dataclass(frozen=True)
class Result:
    ok: bool
    detail: str


@dataclass(frozen=True)
class Probe:
    label: str
    run: Callable[[], Result]
    fix: str


@dataclass(frozen=True)
class Route:
    label: str
    required: tuple[str, ...]
    optional: tuple[str, ...]
    next_command: str
    manual: tuple[str, ...] = ()


def command_result(command: str, minimum_major: int | None = None, version_flag: str = "--version") -> Result:
    path = shutil.which(command)
    if path is None:
        return Result(False, f"{command!r} was not found on PATH")

    try:
        process = subprocess.run(
            [path, version_flag],
            check=False,
            capture_output=True,
            text=True,
            timeout=5,
        )
    except (OSError, subprocess.SubprocessError) as exc:
        return Result(False, f"could not run {path}: {exc}")

    output = (process.stdout or process.stderr).strip().splitlines()
    detail = output[0] if output else f"exit code {process.returncode} with no version output"
    if process.returncode != 0:
        return Result(False, detail)

    if minimum_major is not None:
        digits = "".join(character if character.isdigit() else " " for character in detail)
        parts = digits.split()
        if not parts:
            return Result(False, f"could not parse a version from {detail!r}")
        major = int(parts[0])
        if major < minimum_major:
            return Result(False, f"found {detail}; need version {minimum_major}+")

    return Result(True, f"{detail} at {path}")


def python_result() -> Result:
    version = platform.python_version()
    executable = sys.executable
    if sys.version_info < (3, 11):
        return Result(False, f"found Python {version} at {executable}; need Python 3.11+")
    return Result(True, f"Python {version} at {executable}")


def module_result(module: str) -> Result:
    if importlib.util.find_spec(module) is None:
        return Result(False, f"{module!r} is not importable by {sys.executable}")
    return Result(True, f"importable by {sys.executable}")


def git_fix() -> str:
    system = platform.system()
    if system == "Darwin":
        return "Run `xcode-select --install`, then `git --version`."
    if system == "Windows":
        return "Run `winget install --id Git.Git -e`, then `git --version`."
    return "Run `sudo apt-get update && sudo apt-get install -y git`, then `git --version`."


def mod(label: str, module: str, pip_name: str) -> Probe:
    return Probe(
        label,
        lambda: module_result(module),
        f"Install it in the interpreter you run the tool with: `python -m pip install {pip_name}` (this script never installs).",
    )


PROBES = {
    "python": Probe(
        "Python 3.11+",
        python_result,
        "Install it with `uv python install 3.12`, activate that environment, and rerun.",
    ),
    "git": Probe("Git", lambda: command_result("git"), git_fix()),
    "ffmpeg": Probe("ffmpeg", lambda: command_result("ffmpeg", version_flag="-version"), "Install ffmpeg and make sure it is on PATH."),
    "ollama": Probe("Ollama CLI", lambda: command_result("ollama"), "Install Ollama (only needed for `pipeline.py llm`)."),
    "pymupdf": mod("PyMuPDF (import fitz)", "fitz", "pymupdf"),
    "bs4": mod("BeautifulSoup", "bs4", "beautifulsoup4"),
    "markdownify": mod("markdownify", "markdownify", "markdownify"),
    "requests": mod("requests", "requests", "requests"),
    "faster_whisper": mod("faster-whisper", "faster_whisper", "faster-whisper"),
    "av": mod("PyAV", "av", "av"),
    "websockets": mod("websockets", "websockets", "websockets"),
    "ijson": mod("ijson", "ijson", "ijson"),
    "numpy": mod("NumPy", "numpy", "numpy"),
    "librosa": mod("librosa", "librosa", "librosa"),
    "soundfile": mod("soundfile", "soundfile", "soundfile"),
    "pydantic": mod("pydantic", "pydantic", "pydantic"),
    "pytest": mod("pytest", "pytest", "pytest"),
}


ROUTES = {
    "pipeline": Route(
        "Prompt/reply pipeline (stdlib core)",
        ("python",),
        ("ollama", "requests"),
        "python -B -X utf8 tools/prompt_reply_pipeline/tests/test_pipeline.py",
    ),
    "converters": Route(
        "PDF / MHT / JSONL converters",
        ("python", "pymupdf", "bs4", "markdownify"),
        (),
        "python -I -X utf8 tools/pdf_to_md/pdf_to_md.py --help",
    ),
    "x_pipeline": Route(
        "X pipeline (network; accepted unchanged)",
        ("python", "requests"),
        ("faster_whisper", "av", "ffmpeg"),
        "See tools/x_pipeline (not run by this preflight).",
    ),
    "gemini": Route(
        "Gemini tools (network / Chrome CDP)",
        ("python", "requests"),
        ("websockets", "ijson"),
        "See tools/gemini_md2 (not run by this preflight).",
    ),
    "audio_lab": Route(
        "AudioLab (external project at Desktop/audio_lab)",
        ("python", "numpy", "librosa", "soundfile", "pydantic"),
        ("pytest", "ffmpeg"),
        "Run AudioLab tests from its own virtualenv; this preflight checks the interpreter you launched it with.",
    ),
}
ROUTES["all"] = Route(
    "Every Toolkit route",
    ("python", "git"),
    tuple(dict.fromkeys(k for r in list(ROUTES.values()) for k in (*r.required, *r.optional) if k not in ("python", "git"))),
    "python -I -X utf8 _meta/verify.py",
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Check only the tools needed by one Toolkit route (read-only)."
    )
    parser.add_argument(
        "--route",
        choices=tuple(ROUTES),
        default="pipeline",
        help="Toolkit route to check (default: pipeline)",
    )
    parser.add_argument(
        "--show-later",
        action="store_true",
        help="also check tools that are optional now or required by later lessons",
    )
    return parser.parse_args()


def print_probe(key: str, required: bool) -> bool:
    probe = PROBES[key]
    result = probe.run()
    if result.ok:
        status = "PASS"
    elif required:
        status = "FAIL"
    else:
        status = "LATER"
    timing = "required now" if required else "optional or needed later"
    print(f"  [{status}] {probe.label} ({timing})")
    print(f"         {result.detail}")
    if not result.ok:
        print(f"         Fix: {probe.fix}")
    return result.ok


def main() -> int:
    args = parse_args()
    route = ROUTES[args.route]

    print("\n=== Python Toolkit: Environment Check ===\n")
    print(f"Route: {route.label} (`--route {args.route}`)\n")

    passed = 0
    for key in route.required:
        passed += int(print_probe(key, required=True))

    if route.optional and args.show_later:
        print("\nOptional or needed later:")
        for key in route.optional:
            print_probe(key, required=False)
    elif route.optional:
        print(
            f"\nLater checks skipped: {len(route.optional)} tools are not needed to start. "
            "Add `--show-later` when you want to inspect them."
        )

    if route.manual:
        print("\nManual checks:")
        for item in route.manual:
            print(f"  [MANUAL] {item}")

    total = len(route.required)
    print(f"\nResult: {passed}/{total} required checks passed")
    if passed == total:
        print(f"Ready to start {route.label}.")
        print(f"Next: {route.next_command}\n")
        return 0

    print("Not ready yet. Run each Fix command above, then repeat this preflight.\n")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
