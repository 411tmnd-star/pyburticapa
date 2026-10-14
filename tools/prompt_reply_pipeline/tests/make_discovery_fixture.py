"""Writes FABRICATED inputs for the discovery check. Deterministic; no real data.

Product names are invented ("Zorbex", "Quillfin") so a search hit can only come from this synthetic material.
Usage: python -B make_discovery_fixture.py <folder>
"""
import json
import os
import sys

NL = chr(10)


def turns():
    pairs = [
        ("What is the Zorbex kettle?", "The Zorbex kettle is an invented appliance that heats water in forty seconds. It exists only in this test."),
        ("Does the Zorbex kettle need a plug?", "Yes. The fictional Zorbex kettle uses a plug rated at 12 volts and an imaginary socket."),
        ("What colour is the Quillfin desk lamp?", "The Quillfin desk lamp is fabricated and comes in two shades: slate and amber."),
        ("How bright is the Quillfin lamp?", "The Quillfin lamp reaches 900 lumens according to its invented specification sheet."),
    ]
    return pairs


def write_jsonl(path):
    lines = []
    for q, a in turns():
        lines.append(json.dumps({"type": "user", "isMeta": False, "message": {"role": "user", "content": q}}))
        lines.append(json.dumps({"type": "assistant", "message": {"role": "assistant", "content": [{"type": "text", "text": a}]}}))
    with open(path, "w", encoding="utf-8", newline=NL) as f:
        f.write(NL.join(lines) + NL)


def write_notes(path):
    text = ("# Fabricated product notes" + NL + NL +
            "The Quillfin desk lamp is a made-up item used only to test discovery." + NL + NL +
            "Its invented warranty lasts ninety days and covers imaginary faults." + NL)
    with open(path, "w", encoding="utf-8", newline=NL) as f:
        f.write(text)


if __name__ == "__main__":
    folder = sys.argv[1]
    os.makedirs(folder, exist_ok=True)
    write_jsonl(os.path.join(folder, "zorbex_session_synthetic.jsonl"))
    write_notes(os.path.join(folder, "quillfin_notes_synthetic.md"))
    print("wrote 2 synthetic inputs to", folder)
