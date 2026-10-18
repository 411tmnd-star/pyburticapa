"""W16 pass test: on the demand example every sentence cites an accepted claim and the judge passes;
a planted unsupported sentence is caught and no report is written. No model and no network."""
import re
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
DR = REPO / "python_skills" / "confirmed" / "demand_report"
REPORT = DR / "report.py"
EX = DR / "example"
JUDGE = REPO / "python_skills" / "confirmed" / "evidence_judge" / "judge.py"
DEMAND = REPO / "python_skills" / "my_flows" / "research" / "demand_research"

sys.dont_write_bytecode = True
sys.path.insert(0, str(JUDGE.parent))
import judge  # noqa: E402


def run(script, *args, cwd=None):
    return subprocess.run([sys.executable, "-I", "-X", "utf8", str(script), *map(str, args)],
                          capture_output=True, text=True, encoding="utf-8", cwd=cwd, timeout=120)


class PassTest(unittest.TestCase):
    def test_mechanical_report_is_written_and_passes_the_judge(self):
        with tempfile.TemporaryDirectory() as t:
            out = Path(t, "report.md")
            r = run(REPORT, EX / "question.md", EX / "accepted.md", "--out", out)
            self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
            self.assertIn("2 sentence(s), all supported", r.stdout)
            text = out.read_text(encoding="utf-8")
            self.assertIn("- A renter would pay for rent splitting [d1].", text)
            self.assertIn("- Shared spreadsheets go stale [d2].", text)
            # the finished report is itself clean under the judge: receipts and counts sit in code blocks
            j = run(JUDGE, out, EX / "accepted.md")
            self.assertEqual(j.returncode, 0, j.stdout)

    def test_good_draft_is_written_with_receipts_and_counts(self):
        with tempfile.TemporaryDirectory() as t:
            out = Path(t, "report.md")
            r = run(REPORT, EX / "question.md", EX / "accepted.md", "--draft", EX / "draft.md", "--out", out)
            self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
            text = out.read_text(encoding="utf-8")
            self.assertTrue(text.startswith("# Do renters pay to solve rent splitting?"))
            self.assertIn('[d1] "I would honestly pay a small monthly fee for something that splits rent"', text)
            self.assertIn("https://example.com/forum/rent-tracking (retrieved 2026-10-18)", text)
            self.assertIn("accepted claims: 2; cited in the report: 2", text)
            self.assertIn("distinct sources (by URL): 1", text)
            self.assertIn("caution: 2 accepted claim(s) from 1 distinct source(s)", text)
            self.assertEqual(run(JUDGE, out, EX / "accepted.md").returncode, 0)

    def test_planted_unsupported_sentence_is_caught_and_nothing_is_written(self):
        with tempfile.TemporaryDirectory() as t:
            out = Path(t, "report.md")
            r = run(REPORT, EX / "question.md", EX / "accepted.md", "--draft", EX / "draft_bad.md", "--out", out)
            self.assertEqual(r.returncode, 1, r.stdout + r.stderr)
            flagged = re.findall(r"^S(\d) FLAG", r.stdout, re.M)
            self.assertEqual(flagged, ["2"])
            self.assertIn("number not in the cited evidence: 20", r.stdout)
            self.assertIn("report not written: 1 sentence(s) flagged", r.stdout)
            self.assertFalse(out.exists())

    def test_uncited_and_unaccepted_citations_are_caught(self):
        with tempfile.TemporaryDirectory() as t:
            draft = Path(t, "d.md")
            draft.write_text("- Renters already pay for a rent app [d3].\n- The market is large.\n"
                             "- One renter says they would honestly pay a small monthly fee for something that splits rent [d1].\n",
                             encoding="utf-8")
            out = Path(t, "report.md")
            r = run(REPORT, EX / "question.md", EX / "accepted.md", "--draft", draft, "--out", out)
            self.assertEqual(r.returncode, 1)
            self.assertEqual(re.findall(r"^S(\d) FLAG", r.stdout, re.M), ["1", "2"])
            self.assertIn("not accepted: d3", r.stdout)
            self.assertIn("uncited", r.stdout)
            self.assertFalse(out.exists())

    def test_minimums_can_be_lowered(self):
        with tempfile.TemporaryDirectory() as t:
            out = Path(t, "report.md")
            r = run(REPORT, EX / "question.md", EX / "accepted.md", "--out", out, "--min-claims", "1", "--min-sources", "1")
            self.assertEqual(r.returncode, 0)
            self.assertNotIn("caution:", out.read_text(encoding="utf-8"))


class Prompt(unittest.TestCase):
    def test_prompt_out_holds_question_rules_and_every_claim(self):
        with tempfile.TemporaryDirectory() as t:
            p = Path(t, "prompt.md")
            r = run(REPORT, EX / "question.md", EX / "accepted.md", "--prompt-out", p)
            self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
            text = p.read_text(encoding="utf-8")
            self.assertIn("Question: Do renters pay to solve rent splitting?", text)
            self.assertIn("End every sentence with the id", text)
            for needle in ("## d1", "## d2", "I would honestly pay a small monthly fee", "--draft draft.md"):
                self.assertIn(needle, text)
            self.assertNotIn("## d3", text)


class Edges(unittest.TestCase):
    def test_no_accepted_claims_writes_nothing_and_exits_1(self):
        with tempfile.TemporaryDirectory() as t:
            acc = Path(t, "accepted.md")
            acc.write_text("# Accepted claims\n\n0 claim(s) passed the quote check and were accepted by review.\n", encoding="utf-8")
            out = Path(t, "report.md")
            r = run(REPORT, EX / "question.md", acc, "--out", out)
            self.assertEqual(r.returncode, 1)
            self.assertIn("insufficient evidence", r.stdout)
            self.assertFalse(out.exists())

    def test_bad_input_exits_2(self):
        with tempfile.TemporaryDirectory() as t:
            empty = Path(t, "empty.md")
            empty.write_text("# only a heading\n", encoding="utf-8")
            out = Path(t, "r.md")
            self.assertEqual(run(REPORT, EX / "question.md", EX / "accepted.md").returncode, 2)  # no --out
            self.assertEqual(run(REPORT, Path(t, "nope.md"), EX / "accepted.md", "--out", out).returncode, 2)
            self.assertEqual(run(REPORT, EX / "question.md", EX / "accepted.md", "--draft", empty, "--out", out).returncode, 2)
            blank = Path(t, "blank.md")
            blank.write_text("\n  \n", encoding="utf-8")
            self.assertEqual(run(REPORT, blank, EX / "accepted.md", "--out", out).returncode, 2)  # no question text
            self.assertFalse(out.exists())


class Chain(unittest.TestCase):
    def test_demand_research_to_report(self):
        """claims.jsonl -> verify_quotes.py --accepted -> report.py. d3 is marked accepted but fails the
        quote check and d4 lacks retrieved_at, so neither reaches accepted.md."""
        with tempfile.TemporaryDirectory() as t:
            ex = Path(t, "ex")
            ex.mkdir()
            (ex / "snapshots").mkdir()
            for f in (DEMAND / "example" / "snapshots").iterdir():
                (ex / "snapshots" / f.name).write_bytes(f.read_bytes())
            rows = (DEMAND / "example" / "claims.jsonl").read_text(encoding="utf-8").replace('}\n', ', "review_status": "accepted"}\n')
            (ex / "claims.jsonl").write_text(rows, encoding="utf-8")
            v = run(DEMAND / "verify_quotes.py", "claims.jsonl", "snapshots", "--accepted", "accepted.md", cwd=ex)
            self.assertEqual(v.returncode, 1, v.stdout)  # 2/4 pass, exit 1 by design
            made = judge.parse_accepted((ex / "accepted.md").read_text(encoding="utf-8"))
            shipped = judge.parse_accepted((EX / "accepted.md").read_text(encoding="utf-8"))
            self.assertEqual(sorted(made), ["d1", "d2"])
            self.assertEqual({k: (c["claim"], c["quote"], c["source"]) for k, c in made.items()},
                             {k: (c["claim"], c["quote"], c["source"]) for k, c in shipped.items()})
            r = run(REPORT, EX / "question.md", ex / "accepted.md", "--out", ex / "report.md")
            self.assertEqual(r.returncode, 0, r.stdout)

    def test_verify_quotes_without_accepted_is_unchanged(self):
        with tempfile.TemporaryDirectory() as t:
            r = run(DEMAND / "verify_quotes.py", DEMAND / "example" / "claims.jsonl", DEMAND / "example" / "snapshots", cwd=t)
            self.assertEqual(r.returncode, 1)
            self.assertIn("2/4 claims pass the quote check", r.stdout)
            self.assertEqual(list(Path(t).iterdir()), [])


if __name__ == "__main__":
    unittest.main()
