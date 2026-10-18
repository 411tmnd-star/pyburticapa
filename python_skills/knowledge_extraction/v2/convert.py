"""ChatGPT conversation JSON -> Markdown, one .md per .json file.

Usage:
    python convert.py [INPUT_DIR] [--out OUTPUT_DIR]

INPUT_DIR  folder holding the .json files (default: current folder)
OUTPUT_DIR default: converted
"""
import argparse
import json
import html
import re
from pathlib import Path
from datetime import datetime

# Set by main(); nothing runs at import time.
INPUT_DIR = Path(".")
OUTPUT_DIR = Path("converted")


def clean_text(text):
    text = html.unescape(text)

    # Normalize line endings
    text = text.replace("\r\n", "\n").replace("\r", "\n")

    # Remove excessive blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)

    # Remove trailing spaces
    text = "\n".join(line.rstrip() for line in text.split("\n"))

    return text.strip()


def get_message_text(message):
    content = message.get("content", {})
    parts = content.get("parts", [])

    output = []

    for part in parts:
        if isinstance(part, str):
            output.append(part)

        elif isinstance(part, dict):
            # Some newer message formats store text inside dictionaries
            if isinstance(part.get("text"), str):
                output.append(part["text"])

    return "\n".join(output)


def convert_file(input_file):
    try:
        with open(input_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        title = data.get("title") or input_file.stem

        messages = []

        for index, message in enumerate(data.get("messages", [])):
            author = message.get("author", {})
            role = author.get("role")

            if role not in ("user", "assistant"):
                continue

            text = get_message_text(message)

            if not text.strip():
                continue

            timestamp = message.get("create_time")

            messages.append({
                "role": role,
                "text": clean_text(text),
                "timestamp": timestamp,
                "index": index
            })

        # Sort chronologically while preserving original order
        messages.sort(
            key=lambda m: (
                m["timestamp"] is None,
                m["timestamp"] if m["timestamp"] is not None else 0,
                m["index"]
            )
        )

        output = []

        output.append(f"# {title}")
        output.append("")
        output.append(f"> **Messages:** {len(messages)}")
        output.append("")
        output.append("---")
        output.append("")

        for message in messages:

            if message["role"] == "user":
                speaker = "You"
            else:
                speaker = "ChatGPT"

            output.append(f"## {speaker}")
            output.append("")

            if message["timestamp"] is not None:
                try:
                    dt = datetime.fromtimestamp(message["timestamp"])
                    output.append(
                        f"*{dt.strftime('%Y-%m-%d %H:%M:%S')}*"
                    )
                    output.append("")
                except Exception:
                    pass

            output.append(message["text"])
            output.append("")
            output.append("---")
            output.append("")

        output_file = OUTPUT_DIR / f"{input_file.stem}.md"

        with open(output_file, "w", encoding="utf-8") as f:
            f.write("\n".join(output))

        return len(messages), output_file

    except Exception as e:
        print(f"❌ FAILED: {input_file.name}")
        print(f"   {e}")
        return None, None


# --------------------------------------------------
# BULK CONVERSION
# --------------------------------------------------

def main(argv=None):
    global INPUT_DIR, OUTPUT_DIR
    ap = argparse.ArgumentParser(description="ChatGPT conversation JSON -> Markdown.")
    ap.add_argument("input", nargs="?", default=".", help="folder with the .json files (default: current folder)")
    ap.add_argument("--out", default="converted", help="output folder (default: converted)")
    args = ap.parse_args(argv)
    INPUT_DIR, OUTPUT_DIR = Path(args.input), Path(args.out)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    json_files = [
        f for f in INPUT_DIR.glob("*.json")
        if f.name != "package.json"
    ]

    print()
    print("=" * 55)
    print(" ChatGPT JSON → Markdown BULK CONVERTER")
    print("=" * 55)
    print(f"Found: {len(json_files)} JSON files")
    print()

    successful = 0
    failed = 0

    for input_file in sorted(json_files):

        count, output_file = convert_file(input_file)

        if output_file:
            successful += 1
            print(
                f"✓ {input_file.name} → "
                f"{output_file.name} ({count} messages)"
            )
        else:
            failed += 1

    print()
    print("=" * 55)
    print(" BULK CONVERSION COMPLETE")
    print("=" * 55)
    print(f"Successful: {successful}")
    print(f"Failed:     {failed}")
    print(f"Output:     {OUTPUT_DIR.resolve()}")
    print("=" * 55)


if __name__ == "__main__":
    main()
