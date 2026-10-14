#!/usr/bin/env python3
"""
mht_to_md.py — standalone MHT/MHTML -> Markdown converter.

Usage:
    python mht_to_md.py --source <dir> [--output <dir>] [--manifest <path>]
                         [--log <path>] [--only "name1" "name2" ...]
                         [--force] [--dry-run]

Never modifies, renames, moves, or deletes source files.
"""

from __future__ import annotations

import argparse
import datetime
import email
import email.policy
import hashlib
import json
import logging
import sys
from pathlib import Path

from bs4 import BeautifulSoup, Comment
from markdownify import markdownify as html_to_markdown

CONVERTER_VERSION = "1.0.0"
SOURCE_EXTENSIONS = (".mht", ".mhtml")

JUNK_TAGS = [
    "script", "style", "noscript", "svg",
    "nav", "header", "footer", "aside", "iframe", "form",
    "button", "link",
]


def sha256_of_file(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def discover_corpus(source_dir: Path) -> list[Path]:
    files = []
    for p in source_dir.rglob("*"):
        if p.is_file() and p.suffix.lower() in SOURCE_EXTENSIONS:
            files.append(p)
    return sorted(files)


def decode_payload(part) -> str:
    """Decode an email part's payload to text, trying the declared charset
    first and falling back through a chain of common encodings."""
    raw = part.get_payload(decode=True)
    if raw is None:
        payload = part.get_payload()
        return payload if isinstance(payload, str) else ""

    charset = part.get_content_charset()
    candidates = []
    if charset:
        candidates.append(charset)
    candidates += ["utf-8", "cp1252", "latin-1"]

    for enc in candidates:
        try:
            return raw.decode(enc)
        except (LookupError, UnicodeDecodeError):
            continue
    return raw.decode("utf-8", errors="replace")


def extract_html_parts(msg) -> list[tuple[str, dict]]:
    """Walk a MIME message and return (html_text, part_metadata) for every
    text/html part found, in document order."""
    html_parts = []
    for part in msg.walk():
        content_type = part.get_content_type()
        if content_type == "text/html":
            text = decode_payload(part)
            meta = {
                "content_type": content_type,
                "charset": part.get_content_charset(),
                "content_location": part.get("Content-Location"),
            }
            html_parts.append((text, meta))
    return html_parts


def count_resource_parts(msg) -> dict:
    counts: dict[str, int] = {}
    for part in msg.walk():
        ct = part.get_content_type()
        if ct == "text/html" or ct.startswith("multipart/"):
            continue
        counts[ct] = counts.get(ct, 0) + 1
    return counts


def clean_html(html_text: str) -> BeautifulSoup:
    soup = BeautifulSoup(html_text, "html.parser")

    for comment in soup.find_all(string=lambda s: isinstance(s, Comment)):
        comment.extract()

    for tag_name in JUNK_TAGS:
        for tag in soup.find_all(tag_name):
            tag.decompose()

    # drop elements explicitly hidden via inline style
    for tag in soup.find_all(True):
        if not getattr(tag, "attrs", None):
            continue
        style = (tag.attrs.get("style") or "").replace(" ", "").lower()
        if "display:none" in style or "visibility:hidden" in style:
            tag.decompose()

    return soup


def html_to_clean_markdown(soup: BeautifulSoup) -> str:
    body = soup.body if soup.body else soup
    markdown = html_to_markdown(
        str(body),
        heading_style="ATX",
        bullets="-",
        strip=["script", "style"],
    )

    # collapse runs of 3+ blank lines down to a single blank line
    lines = markdown.splitlines()
    out_lines = []
    blank_run = 0
    for line in lines:
        if line.strip() == "":
            blank_run += 1
            if blank_run > 1:
                continue
        else:
            blank_run = 0
        out_lines.append(line)
    return "\n".join(out_lines).strip() + "\n"


def extract_title(soup: BeautifulSoup) -> str:
    if soup.title and soup.title.string:
        return soup.title.string.strip()
    h1 = soup.find("h1")
    if h1:
        return h1.get_text(strip=True)
    return ""


def yaml_escape(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"')


def build_front_matter(meta: dict) -> str:
    lines = ["---"]
    for key, value in meta.items():
        if isinstance(value, (int, float)):
            lines.append(f"{key}: {value}")
        elif isinstance(value, list):
            if value:
                lines.append(f"{key}:")
                for item in value:
                    lines.append(f'  - "{yaml_escape(str(item))}"')
            else:
                lines.append(f"{key}: []")
        else:
            lines.append(f'{key}: "{yaml_escape(str(value))}"')
    lines.append("---\n")
    return "\n".join(lines)


def convert_file(src_path: Path, source_root: Path, output_root: Path) -> dict:
    rel_path = src_path.relative_to(source_root)
    out_path = (output_root / rel_path).with_suffix(".md")

    result = {
        "source_path": str(src_path),
        "relative_path": str(rel_path),
        "output_path": str(out_path),
        "status": "failed",
        "error": None,
        "source_size_bytes": src_path.stat().st_size,
        "source_hash_sha256_before": None,
        "source_hash_sha256_after": None,
        "html_parts_found": 0,
        "resource_parts": {},
        "converted_at": None,
    }

    try:
        result["source_hash_sha256_before"] = sha256_of_file(src_path)

        with open(src_path, "rb") as f:
            raw_bytes = f.read()
        msg = email.message_from_bytes(raw_bytes, policy=email.policy.compat32)

        html_parts = extract_html_parts(msg)
        result["html_parts_found"] = len(html_parts)
        result["resource_parts"] = count_resource_parts(msg)

        if not html_parts:
            result["status"] = "skipped"
            result["error"] = "no text/html MIME part found"
            return result

        # The first text/html part is the primary document in MHTML saves.
        html_text, part_meta = html_parts[0]
        soup = clean_html(html_text)
        markdown_body = html_to_clean_markdown(soup)
        title = extract_title(soup)

        converted_at = datetime.datetime.now(datetime.timezone.utc).isoformat()
        front_matter_meta = {
            "source_file": src_path.name,
            "source_path": str(src_path),
            "source_relative_path": str(rel_path),
            "source_size_bytes": result["source_size_bytes"],
            "source_sha256": result["source_hash_sha256_before"],
            "title": title,
            "content_location": part_meta.get("content_location") or "",
            "source_charset": part_meta.get("charset") or "unknown",
            "html_parts_in_source": len(html_parts),
            "embedded_resource_parts": sum(result["resource_parts"].values()),
            "converted_at": converted_at,
            "converter": "mht_to_md.py",
            "converter_version": CONVERTER_VERSION,
        }

        output_text = build_front_matter(front_matter_meta) + "\n" + markdown_body

        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(output_text, encoding="utf-8")

        result["source_hash_sha256_after"] = sha256_of_file(src_path)
        if result["source_hash_sha256_after"] != result["source_hash_sha256_before"]:
            result["status"] = "failed"
            result["error"] = "source hash changed during conversion"
            return result

        result["status"] = "success"
        result["converted_at"] = converted_at
        return result

    except Exception as exc:  # noqa: BLE001 - want every failure captured in manifest
        result["error"] = f"{type(exc).__name__}: {exc}"
        try:
            result["source_hash_sha256_after"] = sha256_of_file(src_path)
        except Exception:
            pass
        return result


def load_existing_manifest(manifest_path: Path) -> dict:
    if not manifest_path.exists():
        return {}
    try:
        data = json.loads(manifest_path.read_text(encoding="utf-8"))
        return {entry["source_path"]: entry for entry in data.get("entries", [])}
    except Exception:
        return {}


def main():
    parser = argparse.ArgumentParser(description="Convert MHT/MHTML files to Markdown.")
    parser.add_argument("--source", required=True, help="Source directory to scan recursively.")
    parser.add_argument("--output", default="mht_to_md_out", help="Output directory for Markdown files.")
    parser.add_argument("--manifest", default="mht_to_md_logs/manifest.json", help="Path to manifest JSON.")
    parser.add_argument("--log", default="mht_to_md_logs/convert.log", help="Path to log file.")
    parser.add_argument("--only", nargs="*", default=None, help="Substrings to filter which files are processed (for representative testing).")
    parser.add_argument("--force", action="store_true", help="Reconvert even if source hash unchanged since last manifest run.")
    parser.add_argument("--dry-run", action="store_true", help="Discovery only; do not convert.")
    args = parser.parse_args()

    source_root = Path(args.source).resolve()
    output_root = Path(args.output).resolve()
    manifest_path = Path(args.manifest).resolve()
    log_path = Path(args.log).resolve()

    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    log_path.parent.mkdir(parents=True, exist_ok=True)

    stdout_stream = open(
        sys.stdout.fileno(), mode="w", encoding="utf-8",
        errors="backslashreplace", buffering=1, closefd=False,
    )
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[
            logging.FileHandler(log_path, encoding="utf-8"),
            logging.StreamHandler(stdout_stream),
        ],
    )
    log = logging.getLogger("mht_to_md")

    if not source_root.is_dir():
        log.error("Source directory does not exist: %s", source_root)
        sys.exit(1)

    corpus = discover_corpus(source_root)
    log.info("Discovered %d MHT/MHTML file(s) under %s", len(corpus), source_root)

    if args.only:
        corpus = [p for p in corpus if any(sub in str(p) for sub in args.only)]
        log.info("Filtered to %d file(s) matching --only", len(corpus))

    if args.dry_run:
        for p in corpus:
            log.info("DISCOVERED: %s (%d bytes)", p, p.stat().st_size)
        return

    previous_entries = load_existing_manifest(manifest_path)

    entries = []
    counts = {"success": 0, "skipped": 0, "failed": 0, "unchanged_skip": 0}

    for src_path in corpus:
        prev = previous_entries.get(str(src_path))
        if not args.force and prev and prev.get("status") == "success":
            try:
                current_hash = sha256_of_file(src_path)
            except Exception:
                current_hash = None
            if current_hash and current_hash == prev.get("source_hash_sha256_before"):
                log.info("UNCHANGED, skipping rerun: %s", src_path)
                entries.append(prev)
                counts["unchanged_skip"] += 1
                continue

        log.info("Converting: %s", src_path)
        result = convert_file(src_path, source_root, output_root)
        entries.append(result)

        if result["status"] == "success":
            log.info("SUCCESS -> %s", result["output_path"])
            counts["success"] += 1
        elif result["status"] == "skipped":
            log.warning("SKIPPED: %s (%s)", src_path, result["error"])
            counts["skipped"] += 1
        else:
            log.error("FAILED: %s (%s)", src_path, result["error"])
            counts["failed"] += 1

    manifest = {
        "generated_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "converter_version": CONVERTER_VERSION,
        "source_root": str(source_root),
        "output_root": str(output_root),
        "total_discovered": len(corpus),
        "counts": counts,
        "entries": entries,
    }
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    log.info("Manifest written to %s", manifest_path)

    # Post-run hash verification: confirm sources were never mutated.
    mismatches = []
    for entry in entries:
        if entry.get("status") != "success":
            continue
        src = Path(entry["source_path"])
        try:
            post_hash = sha256_of_file(src)
        except Exception as exc:
            mismatches.append((str(src), f"unreadable: {exc}"))
            continue
        if post_hash != entry["source_hash_sha256_before"]:
            mismatches.append((str(src), "hash mismatch after full run"))

    if mismatches:
        log.error("SOURCE INTEGRITY CHECK FAILED for %d file(s):", len(mismatches))
        for path, reason in mismatches:
            log.error("  %s: %s", path, reason)
    else:
        log.info("Source integrity verified: all converted sources unchanged (hash match).")

    log.info(
        "Done. discovered=%d success=%d skipped=%d failed=%d unchanged_skip=%d",
        len(corpus), counts["success"], counts["skipped"], counts["failed"], counts["unchanged_skip"],
    )


if __name__ == "__main__":
    main()
