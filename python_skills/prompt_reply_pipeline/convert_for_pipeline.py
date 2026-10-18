"""Adapter: run the existing converters on conversation exports, then separate prompts and replies.

Usage:  python -I -X utf8 convert_for_pipeline.py SRC_DIR OUT_DIR [--prepare]
        --prepare  also run pipeline.py prepare (stage 2) so one command goes from SRC_DIR to OUT_DIR/prepared/

What it does, per file in SRC_DIR (top level only):
  .jsonl                 -> jsonl_to_md.py (existing converter, run as a subprocess) -> staged .md -> separated
  .mht / .mhtml          -> knowledge_extraction\\v2\\mht_to_md.py (existing, subprocess) -> staged .md -> separated
  .md / .json / .txt     -> separated directly (pipeline already handles ChatGPT JSON and Perplexity-style text)
  anything else (.pdf..) -> skipped, with the reason recorded (a PDF is not a conversation source)

Not used: knowledge_extraction\\v2\\convert.py. It runs a bulk conversion at import time, so it cannot be
imported safely, and its input (ChatGPT JSON) is already separated exactly by the pipeline.

Source files are only read. Their SHA-256 is checked before and after. Provenance is written to
OUT\\logs\\adapter_manifest.json (original path, hash, converter, exit code, staged file, hash, result).
The manifest has no timestamps, so identical runs give identical output.
"""
import hashlib
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import pipeline as P  # noqa: E402

V2 = os.path.normpath(os.path.join(HERE, "..", "knowledge_extraction", "v2"))
CONVERTERS = {
    ".jsonl": os.path.join(V2, "jsonl_to_md.py"),
    ".mht": os.path.join(V2, "mht_to_md.py"),
    ".mhtml": os.path.join(V2, "mht_to_md.py"),
}
DIRECT = (".md", ".json", ".txt")


def sha(path):
    return hashlib.sha256(open(path, "rb").read()).hexdigest()


def run_converter(script, src_file, stage_dir):
    os.makedirs(stage_dir, exist_ok=True)
    cmd = [sys.executable, "-I", "-X", "utf8", script, src_file, "--out", stage_dir]
    r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", cwd=stage_dir)
    # converters name their output after the input stem (exact name, not sanitised)
    expected = os.path.join(stage_dir, os.path.splitext(os.path.basename(src_file))[0] + ".md")
    ok = r.returncode == 0 and os.path.exists(expected)
    return ok, r.returncode, expected if ok else "", (r.stdout + r.stderr).strip()[-300:]


def main(argv=None):
    args = argv if argv is not None else sys.argv[1:]
    prepare = "--prepare" in args
    args = [a for a in args if a != "--prepare"]
    if len(args) != 2:
        print(__doc__)
        return 2
    src, out = os.path.abspath(args[0]), os.path.abspath(args[1])
    if not os.path.isdir(src):
        print(f"ERROR: source folder not found: {src}")
        return 2
    files = sorted(f for f in os.listdir(src) if os.path.isfile(os.path.join(src, f)))
    # refuse before writing if two inputs would produce the same output name
    names = [os.path.splitext(f)[0] for f in files if os.path.splitext(f)[1].lower() in list(CONVERTERS) + list(DIRECT)]
    dup = sorted({n for n in names if names.count(n) > 1})
    if dup:
        print(f"ERROR: same output name from different inputs {dup}; rename them first (nothing written)")
        return 2
    before = {f: sha(os.path.join(src, f)) for f in files}
    manifest, failures = [], []
    for i, f in enumerate(files, 1):
        p = os.path.join(src, f)
        ext = os.path.splitext(f)[1].lower()
        entry = {"original": f, "original_sha256": before[f], "bytes": os.path.getsize(p)}
        if ext in CONVERTERS:
            stage = os.path.join(out, "_staging", f"{i:03d}_{P.stem(os.path.splitext(f)[0])}")
            ok, rc, staged, msg = run_converter(CONVERTERS[ext], p, stage)
            entry.update({"action": "converted", "converter": os.path.relpath(CONVERTERS[ext], HERE), "converter_exit_code": rc})
            if not ok:
                entry.update({"result": "converter_failed", "converter_message": msg})
                failures.append(f)
                manifest.append(entry)
                continue
            entry.update({"staged": os.path.relpath(staged, out), "staged_sha256": sha(staged)})
            log = P.separate_one(staged, out)
        elif ext in DIRECT:
            entry.update({"action": "direct"})
            log = P.separate_one(p, out)
        else:
            reason = ("not a conversation source; make Markdown with pdf_to_md.py first" if ext == ".pdf"
                      else "unsupported extension")
            entry.update({"action": "skipped", "result": "skipped", "reason": reason})
            manifest.append(entry)
            continue
        entry.update({"pipeline_format": log.get("format"), "result": log.get("status"),
                      "counts": log.get("counts"), "reason": log.get("reason", "")})
        if log.get("status") == "refused":
            failures.append(f)
        manifest.append(entry)
    after = {f: sha(os.path.join(src, f)) for f in files}
    changed = [f for f in files if before[f] != after[f]]
    os.makedirs(os.path.join(out, "logs"), exist_ok=True)
    with open(os.path.join(out, "logs", "adapter_manifest.json"), "w", encoding="utf-8", newline="\n") as fh:
        json.dump({"source_folder_name": os.path.basename(src), "entries": manifest,
                   "sources_changed": changed}, fh, ensure_ascii=False, indent=1, sort_keys=True)
        fh.write("\n")
    for e in manifest:
        print(f"{e['original']}: {e.get('action')} -> {e.get('result')}"
              + (f" ({e.get('reason')})" if e.get("reason") and e.get("result") != "ok" else ""))
    if changed:
        print("ERROR: source files changed during the run:", changed)
        return 1
    if failures:
        print(f"{len(failures)} input(s) failed; see logs\\adapter_manifest.json")
        return 1
    write_discover_config(out)
    print("all inputs processed; sources unchanged")
    if prepare:  # stage 2 as well, so one command takes SRC_DIR all the way to prepared/
        print(P.cmd_prepare(out))
    return 0


def write_discover_config(out):
    """Adapter for discover.py: a --extra-sources file listing the reply and document folders only.
    Prompts are excluded on purpose: a prompt is a question, not evidence. Paths are absolute, with forward slashes."""
    sources = []
    for sub in ("replies", "documents"):
        d = os.path.join(out, sub)
        if os.path.isdir(d) and any(f.endswith(".md") for f in os.listdir(d)):
            sources.append([os.path.abspath(d).replace(os.sep, "/"), "*.md"])
    path = os.path.join(out, "discover_extra_sources.json")
    with open(path, "w", encoding="utf-8", newline="\n") as fh:
        json.dump(sources, fh, indent=1)
        fh.write("\n")
    return path


if __name__ == "__main__":
    sys.exit(main())
