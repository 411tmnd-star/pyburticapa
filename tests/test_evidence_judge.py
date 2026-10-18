"""W01 pass test: judge.py flags exactly the 2 planted faults in the example and exits 1,
and does not flag the good sentences. Also the calibration sets used to pick the 0.5 threshold."""
import json
import re
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
EJ = REPO / "python_skills" / "confirmed" / "evidence_judge"
JUDGE = EJ / "judge.py"
VERIFY = REPO / "python_skills" / "my_flows" / "research" / "evidence_verification" / "verify.py"
VERIFY_EXAMPLE = VERIFY.parent / "example"

sys.dont_write_bytecode = True
sys.path.insert(0, str(EJ))
import judge  # noqa: E402


def run(script, *args, cwd=None):
    return subprocess.run([sys.executable, "-I", "-X", "utf8", str(script), *map(str, args)],
                          capture_output=True, text=True, encoding="utf-8", cwd=cwd, timeout=120)


class PassTest(unittest.TestCase):
    def test_example_flags_exactly_the_two_planted_faults_and_exits_1(self):
        r = run(JUDGE, EJ / "example" / "write-up.md", EJ / "example" / "accepted.md")
        self.assertEqual(r.returncode, 1, r.stdout + r.stderr)
        status = dict(re.findall(r"^S(\d) (ok  |FLAG)", r.stdout, re.M))
        self.assertEqual(len(status), 6)
        self.assertEqual([n for n, s in status.items() if s == "FLAG"], ["2", "5"])
        self.assertIn("-> uncited", r.stdout)
        self.assertIn("cites a claim that is not accepted: c5", r.stdout)
        self.assertIn("6 sentence(s): 4 supported, 2 flagged", r.stdout)
        self.assertIn("accepted but never cited: c6", r.stdout)

    def test_clean_writeup_exits_0(self):
        with tempfile.TemporaryDirectory() as t:
            w = Path(t, "w.md")
            w.write_text("Two paid apps at $15 a month felt too expensive [c4].\n", encoding="utf-8")
            r = run(JUDGE, w, EJ / "example" / "accepted.md")
            self.assertEqual(r.returncode, 0, r.stdout)

    def test_chain_with_verify_py(self):
        """verify.py --accepted writes the file judge.py reads; the same two faults come out."""
        with tempfile.TemporaryDirectory() as t:
            ex = Path(t, "ex")
            ex.mkdir()
            claims = (VERIFY_EXAMPLE / "claims.md").read_text(encoding="utf-8")
            for cid in ("c1", "c2", "c3", "c4", "c6"):
                claims = re.sub(rf"(## {cid}\n(?:- .*\n)*?- extractor: .*\n)", r"\1- status: accepted\n", claims, count=1)
            (ex / "claims.md").write_text(claims, encoding="utf-8")
            snaps = ex / "snapshots"
            snaps.mkdir()
            for f in (VERIFY_EXAMPLE / "snapshots").iterdir():
                (snaps / f.name).write_bytes(f.read_bytes())
            v = run(VERIFY, "claims.md", "snapshots", "--accepted", "accepted.md", cwd=ex)
            self.assertEqual(v.returncode, 1, v.stdout)  # 7/13 pass, so verify exits 1 by design
            made = judge.parse_accepted((ex / "accepted.md").read_text(encoding="utf-8"))
            shipped = judge.parse_accepted((EJ / "example" / "accepted.md").read_text(encoding="utf-8"))
            self.assertEqual({k: (c["claim"], c["quote"]) for k, c in made.items()},
                             {k: (c["claim"], c["quote"]) for k, c in shipped.items()})
            r = run(JUDGE, EJ / "example" / "write-up.md", ex / "accepted.md")
            self.assertEqual(r.returncode, 1)
            self.assertIn("2 flagged", r.stdout)


# Calibration sets (invented claims c1..c6 from the example). The 0.5 threshold sits between the
# off-topic sentences (overlap at most 0.29) and the paraphrases that should pass (0.67 and up).
MUST_PASS = [
    ("One renter says they would pay for something that tracks rent automatically", "c1"),
    ("A tenant would pay to have rent payments tracked automatically", "c1"),
    ("The same thread says the landlord's reminder portal never gets opened", "c2"),
    ("A renter never opens the portal their landlord uses for reminders", "c2"),
    ("Spreadsheets turn into a mess every month", "c3"),
    ("Two paid apps at $15 a month felt too expensive", "c4"),
    ("Renters say a spreadsheet becomes a mess each month and they would pay for automatic tracking", "c3,c1"),
]
MUST_FLAG = [
    ("Landlords raised rents by ten percent last year", "c1"),
    ("Renters love the landlord portal", "c2"),
    ("A renter opens the landlord portal every day", "c2"),
    ("Spreadsheets are a reliable way to track rent", "c3"),
    ("Free apps are good enough for everyone", "c4"),
    ("Paid apps at $5 a month felt too expensive", "c4"),
    ("Most renters want a mobile app with push notifications", "c1"),
    ("Roommates always know who paid", "c6"),
    ("The survey found that sixty percent of tenants prefer paper", "c6"),
    ("Rent tracking apps cost too much money", "c1"),
]


class Calibration(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.acc = judge.parse_accepted((EJ / "example" / "accepted.md").read_text(encoding="utf-8"))

    def one(self, text, cites, threshold=judge.DEFAULT_THRESHOLD):
        v = judge.judge(f"{text} [{cites.replace(',', '][')}].", self.acc, threshold)
        self.assertEqual(len(v), 1)
        return v[0]

    def test_good_paraphrases_are_not_flagged(self):
        for text, cites in MUST_PASS:
            v = self.one(text, cites)
            self.assertTrue(v["supported"], f"{text!r}: {v['reasons']}")

    def test_off_topic_and_changed_facts_are_flagged(self):
        for text, cites in MUST_FLAG:
            v = self.one(text, cites)
            self.assertFalse(v["supported"], f"{text!r} passed with overlap {v['score']}")

    def test_the_reasons_name_the_problem(self):
        self.assertIn("number not in the cited evidence: 5", self.one("Paid apps at $5 a month felt too expensive", "c4")["reasons"])
        self.assertIn("negation differs from the cited evidence", self.one("A renter opens the landlord portal every day", "c2")["reasons"])
        self.assertTrue(any(r.startswith("low word overlap") for r in self.one("Rent tracking apps cost too much money", "c1")["reasons"]))

    def test_threshold_moves_the_line(self):
        text, cites = "Apps charging $15 monthly were seen as too costly", "c4"  # overlap 0.50
        self.assertTrue(self.one(text, cites, 0.5)["supported"])
        self.assertFalse(self.one(text, cites, 0.9)["supported"])


class Parsing(unittest.TestCase):
    ACC = judge.parse_accepted("## c1\n- claim: Cats sleep a lot\n- quote: cats sleep sixteen hours\n\n## c2\n- claim: Dogs bark\n- quote: dogs bark at night\n")

    def test_cite_forms(self):
        for cite in ("[c1][c2]", "[c1, c2]", "[c1,c2]"):
            v = judge.judge(f"Cats sleep and dogs bark {cite}.", self.ACC)[0]
            self.assertEqual(v["cites"], ["c1", "c2"], cite)
            self.assertTrue(v["supported"], (cite, v["reasons"]))

    def test_markdown_link_is_not_a_citation(self):
        v = judge.judge("Cats sleep a lot, see [the post](https://example.com/p) [c1].", self.ACC)[0]
        self.assertEqual(v["cites"], ["c1"])
        self.assertTrue(v["supported"], v["reasons"])

    def test_unknown_id_is_not_accepted(self):
        v = judge.judge("Cats sleep a lot [c9].", self.ACC)[0]
        self.assertFalse(v["supported"])
        self.assertIn("c9", v["reasons"][0])

    def test_line_numbers_and_wrapped_sentences(self):
        text = "# Title\n\nCats sleep\na lot [c1]. Dogs bark at night [c2].\n\n- Cats sleep a lot [c1].\n"
        v = judge.judge(text, self.ACC)
        self.assertEqual([(x["n"], x["line"]) for x in v], [(1, 3), (2, 4), (3, 6)])
        self.assertTrue(all(x["supported"] for x in v))
        self.assertEqual(v[0]["text"], "Cats sleep a lot")

    def test_headings_and_code_are_skipped(self):
        v = judge.judge("# Cats\n\n```\nnot prose [zz]\n```\n\nCats sleep a lot [c1].\n", self.ACC)
        self.assertEqual(len(v), 1)


class CommandLine(unittest.TestCase):
    def test_bad_input_exits_2(self):
        acc = EJ / "example" / "accepted.md"
        with tempfile.TemporaryDirectory() as t:
            empty = Path(t, "empty.md")
            empty.write_text("# only a heading\n", encoding="utf-8")
            self.assertEqual(run(JUDGE, empty, acc).returncode, 2)
            self.assertEqual(run(JUDGE, Path(t, "missing.md"), acc).returncode, 2)
            self.assertEqual(run(JUDGE, EJ / "example" / "write-up.md", acc, "--threshold", "1.5").returncode, 2)

    def test_json_output(self):
        r = run(JUDGE, EJ / "example" / "write-up.md", EJ / "example" / "accepted.md", "--json")
        self.assertEqual(r.returncode, 1)
        data = json.loads(r.stdout)
        self.assertEqual([d["supported"] for d in data], [True, False, True, True, False, True])


if __name__ == "__main__":
    unittest.main()
