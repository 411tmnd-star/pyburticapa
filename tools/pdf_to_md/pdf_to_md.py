import json
import argparse
import sys
from pathlib import Path

try:
    import pymupdf
except ImportError:
    print("ERROR: Install PyMuPDF with: python -m pip install pymupdf", file=sys.stderr)
    raise SystemExit(2)


def cell(value):
    if value is None:
        return ""
    return str(value).replace("\\", "\\\\").replace("|", "\\|").replace("\r\n", "\n").replace("\r", "\n").replace("\n", "<br>")


def render_table(table):
    rows = table.extract() or []
    if not rows:
        return "_Table detector returned no rows._"
    width = max((len(row) for row in rows), default=0)
    if width == 0:
        return "_Table detector returned rows with no cells._"
    rows = [[cell(v) for v in row] + [""] * (width - len(row)) for row in rows]
    lines = [
        "| " + " | ".join(rows[0]) + " |",
        "| " + " | ".join(["---"] * width) + " |",
    ]
    for row in rows[1:]:
        lines.append("| " + " | ".join(row) + " |")
    return "\n".join(lines)


def convert(source, destination, overwrite=False, tables_only=False):
    if not source.is_file() or source.suffix.lower() != ".pdf":
        raise ValueError(f"Input PDF not found or invalid: {source}")
    if destination.exists() and not overwrite:
        raise FileExistsError(f"Output already exists: {destination}. Use --overwrite to replace it.")

    destination.parent.mkdir(parents=True, exist_ok=True)
    pages = []
    warnings = []

    with pymupdf.open(source) as doc:
        page_count = len(doc)

        for number, page in enumerate(doc, 1):
            parts = [f"## Page {number}", ""]
            raw_blocks = page.get_text("blocks")
            blocks = []

            # Keep every non-empty text block. Never suppress blocks for overlapping tables.
            for block in raw_blocks:
                if len(block) >= 5 and isinstance(block[4], str) and block[4]:
                    if len(block) <= 6 or block[6] == 0:
                        blocks.append(block)

            blocks.sort(key=lambda b: (round(b[1], 2), round(b[0], 2)))

            if not tables_only:
                parts.extend(["### Extracted text blocks", ""])
                if blocks:
                    for i, block in enumerate(blocks, 1):
                        parts.extend([
                            f"<!-- text block {i}; bbox={tuple(round(float(v), 2) for v in block[:4])} -->",
                            block[4].rstrip("\n"),
                            "",
                        ])
                else:
                    parts.extend(["_No text blocks returned for this page._", ""])

                # Independent full-page extraction is retained as a second preservation copy.
                full_text = page.get_text("text", sort=False) or ""
                if full_text.strip():
                    parts.extend([
                        "### Full-page text extraction (additional preservation copy)",
                        "",
                        full_text.rstrip(),
                        "",
                    ])
                else:
                    warning = f"Page {number} has no extractable text; it may be scanned or image-only."
                    warnings.append(warning)
                    parts.extend([f"> **Warning:** {warning}", ""])

            try:
                found = page.find_tables()
                tables = list(found.tables) if found and found.tables else []
            except Exception as exc:
                tables = []
                warning = f"Table detection failed on page {number}: {type(exc).__name__}: {exc}"
                warnings.append(warning)
                parts.extend([f"> **Warning:** {warning}", ""])

            parts.extend(["### Supplementary table detections", ""])
            page_area = float(page.rect.width) * float(page.rect.height)
            if tables:
                for i, table in enumerate(tables, 1):
                    bbox = tuple(round(float(v), 2) for v in getattr(table, "bbox", ()))
                    if len(bbox) == 4:
                        x0, y0, x1, y1 = bbox
                        coverage = max(0, x1-x0) * max(0, y1-y0) / page_area
                    else:
                        coverage = 0

                    if coverage >= 0.70:
                        warning = (
                            f"Large-area table detection {i} on page {number} covers {coverage:.1%} "
                            "of the page and may be a false positive. Its raw cell data is preserved below."
                        )
                        warnings.append(warning)
                        raw_rows = table.extract() or []
                        parts.extend([
                            f"#### Detected table {i} (large-area detection; raw cell data; bbox={bbox})",
                            "",
                            f"> **Layout warning:** {warning}",
                            "",
                            "~~~json",
                            json.dumps(raw_rows, ensure_ascii=False, indent=2),
                            "~~~",
                            "",
                        ])
                        continue

                    parts.extend([
                        f"#### Detected table {i} (supplementary; bbox={bbox})",
                        "",
                        render_table(table),
                        "",
                    ])
            else:
                parts.extend(["_No tables detected._", ""])

            images = page.get_images(full=True)
            if images:
                parts.extend([
                    f"> **Image note:** {len(images)} embedded image occurrence(s) detected. "
                    "Text or diagrams inside images may not be extractable.",
                    "",
                ])

            pages.append("\n".join(parts).rstrip())

    header = [
        f"# {source.stem}", "",
        f"- **Source file:** `{source.name}`",
        f"- **Source path:** `{source.resolve()}`",
        f"- **Pages:** {page_count}",
        "- **Method:** Text blocks + independent full-page text + supplementary table detections",
        "- **Preservation policy:** No extracted text blocks are suppressed; duplicates are intentional safeguards.",
        "", "## Extraction warnings", "",
    ]
    header.extend([f"- {w}" for w in warnings] if warnings else ["- No warnings reported by the extraction checks."])
    content = "\n".join(header + ["", "---", "", "\n\n---\n\n".join(pages), ""])

    temp = destination.with_suffix(destination.suffix + ".tmp")
    try:
        temp.write_text(content, encoding="utf-8", newline="\n")
        temp.replace(destination)
    finally:
        if temp.exists():
            temp.unlink()


def main():
    parser = argparse.ArgumentParser(description="Loss-preserving PDF-to-Markdown converter.")
    parser.add_argument("input", type=Path)
    parser.add_argument("output", nargs="?", type=Path)
    parser.add_argument("--overwrite", action="store_true")
    parser.add_argument("--tables-only", action="store_true")
    args = parser.parse_args()
    destination = args.output or args.input.with_suffix(".md")
    try:
        convert(args.input, destination, args.overwrite, args.tables_only)
    except Exception as exc:
        print(f"ERROR: {type(exc).__name__}: {exc}", file=sys.stderr)
        return 1
    print(f"Converted: {args.input}")
    print(f"Output:    {destination}")
    print("Text policy: no extracted text blocks suppressed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
