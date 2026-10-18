"""Speaker-markdown cases found on REAL inputs (2026-10-14). Synthetic reproductions only: no real text is used.

Real Claude Code session: assistant replies contain their own "## " headings. Those must stay inside the reply.
"""
import json
import os
import sys
import tempfile
import unittest

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import pipeline as P  # noqa: E402

NL = chr(10)
FIXTURE = os.path.join(HERE, "fixtures", "converter_output_chatgpt_style.md")


def read_fixture():
    with open(FIXTURE, encoding="utf-8") as f:
        return f.read()


def write(path, text):
    with open(path, "w", encoding="utf-8", newline=NL) as f:
        f.write(text)


def summary_row(out):
    with open(os.path.join(out, "logs", "_summary.json"), encoding="utf-8") as f:
        return json.load(f)[0]


class SpeakerCases(unittest.TestCase):
    def test_unknown_heading_is_reply_text_not_an_error(self):
        base = read_fixture()
        text = base.replace("A fictional gadget is a made-up test object." + NL,
                            "A fictional gadget is a made-up test object." + NL + NL + "## Current state" + NL + NL + "Still fictional." + NL, 1)
        self.assertNotEqual(text, base)
        with tempfile.TemporaryDirectory() as src, tempfile.TemporaryDirectory() as out:
            write(os.path.join(src, "ok.md"), text)
            P.cmd_separate(src, out)
            row = summary_row(out)
            self.assertEqual((row["status"], row["replies"], row["prompts"]), ("ok", 2, 2))
            with open(os.path.join(out, "replies", "ok.md"), encoding="utf-8") as f:
                self.assertIn("## Current state", f.read())

    def test_speaker_heading_inside_reply_is_refused_by_count(self):
        base = read_fixture()
        text = base.replace("It is teal." + NL, "It is teal." + NL + NL + "## You" + NL + NL + "quoted text" + NL, 1)
        self.assertNotEqual(text, base)
        with tempfile.TemporaryDirectory() as src, tempfile.TemporaryDirectory() as out:
            write(os.path.join(src, "bad.md"), text)
            P.cmd_separate(src, out)
            row = summary_row(out)
            self.assertEqual(row["status"], "refused")
            self.assertIn("declares 4", row["reason"])
            self.assertFalse(os.path.exists(os.path.join(out, "prompts", "bad.md")))

    def test_unknown_speaker_name_is_refused_by_count(self):
        text = read_fixture().replace("## ChatGPT", "## Robot", 1)
        with tempfile.TemporaryDirectory() as src, tempfile.TemporaryDirectory() as out:
            write(os.path.join(src, "bad.md"), text)
            P.cmd_separate(src, out)
            row = summary_row(out)
            self.assertEqual(row["status"], "refused")
            self.assertIn("declares 4", row["reason"])


if __name__ == "__main__":
    import unittest as _u
    _u.main(verbosity=2)
