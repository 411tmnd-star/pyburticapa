"""W08 pass test: on the repo's fixture archive a query returns hits with file and line, and changing one
file re-indexes only that file. The fixture archive is built the same way demo.py builds it:
tests/fixtures/make_takeout.py -> takeout_to_clean_md.py run -> PROMPTS/ and REPLIES/ Markdown."""
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

REPO = Path(__file__).resolve().parents[1]
KR = REPO / "python_skills" / "confirmed" / "knowledge_recovery"
SEARCH = KR / "search_notes.py"
SPLIT = REPO / "python_skills" / "confirmed" / "chatgpt_takeout_split" / "takeout_to_clean_md.py"

sys.dont_write_bytecode = True
sys.path.insert(0, str(REPO / "tests" / "fixtures"))
sys.path.insert(0, str(KR))
import make_takeout  # noqa: E402
import search_notes as sn  # noqa: E402


def run(*args):
    return subprocess.run([sys.executable, "-I", "-X", "utf8", str(SEARCH), *map(str, args)],
                          capture_output=True, text=True, encoding="utf-8", timeout=120)


def tree_fingerprint(root):
    h = hashlib.sha256()
    for p in sorted(Path(root).rglob("*")):
        if p.is_file():
            h.update(p.relative_to(root).as_posix().encode())
            h.update(p.read_bytes())
            h.update(str(p.stat().st_mtime_ns).encode())
    return h.hexdigest()


def md_files(root):
    return sorted(p.relative_to(root).as_posix() for p in Path(root).rglob("*.md"))


class Base(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory()
        src = Path(cls.tmp.name, "src")
        cls.clean = Path(cls.tmp.name, "clean")
        make_takeout.write(str(src))
        r = subprocess.run([sys.executable, "-I", "-X", "utf8", str(SPLIT), "run", str(src), str(cls.clean)],
                           capture_output=True, text=True, encoding="utf-8", timeout=120)
        assert r.returncode == 0, r.stdout + r.stderr

    @classmethod
    def tearDownClass(cls):
        cls.tmp.cleanup()

    def setUp(self):
        self.work = tempfile.TemporaryDirectory()
        self.notes = Path(self.work.name, "notes")
        shutil.copytree(self.clean, self.notes)
        self.idx = Path(self.work.name, "idx")

    def tearDown(self):
        self.work.cleanup()

    def line_of(self, rel, needle):
        for n, line in enumerate((self.notes / rel).read_text(encoding="utf-8").splitlines(), 1):
            if needle in line:
                return n
        raise AssertionError(f"{needle!r} not in {rel}")


class PassTest(Base):
    def test_query_returns_hits_with_file_and_line(self):
        r = run("sunbox", "--notes", self.notes, "--index", self.idx, "--limit", 20, "--json")
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        data = json.loads(r.stdout)
        # ground truth by brute force: every note file with a line holding the word
        noise = re.compile(r"^(<!--|- \w+:)")  # marker comments and "- key: value" metadata bullets
        truth = {rel for rel in md_files(self.notes)
                 if any("sunbox" in ln.lower() and not noise.match(ln.strip())
                        for ln in (self.notes / rel).read_text(encoding="utf-8").splitlines())}
        got = {h["file"] for h in data["results"]}
        self.assertEqual(got, truth)
        self.assertGreaterEqual(len(got), 4)
        for hit in data["results"]:
            self.assertTrue(hit["lines"])
            file_lines = (self.notes / hit["file"]).read_text(encoding="utf-8").splitlines()
            for ln in hit["lines"]:
                self.assertIn("sunbox", file_lines[ln["line"] - 1].lower(), (hit["file"], ln))
                self.assertIn("sunbox", ln["text"].lower())

    def test_text_output_shows_file_and_line_markers(self):
        r = run("inverter", "--notes", self.notes, "--index", self.idx)
        self.assertEqual(r.returncode, 0, r.stdout)
        self.assertRegex(r.stdout, r"(?m)^1\. \S.*\.md   score [\d.]+   matched: inverter$")
        self.assertRegex(r.stdout, r"(?m)^   L\d+: .*inverter")

    def test_changing_one_file_reindexes_only_that_file(self):
        first = sn.refresh(self.notes, self.idx, {})
        self.assertEqual(len(first["new"]), 9)
        before_bytes = (self.idx / "index.json").read_bytes()
        again = sn.refresh(self.notes, self.idx, {})
        self.assertEqual((len(again["new"]), len(again["changed"]), len(again["unchanged"])), (0, 0, 9))
        self.assertEqual((self.idx / "index.json").read_bytes(), before_bytes)  # nothing to save, nothing rewritten

        target = "REPLIES/conversations-001/2025-01-01_Pricing the kiosk_c0000003.md"
        with open(self.notes / target, "a", encoding="utf-8") as f:
            f.write("\nThe quokkaterm panel costs nothing.\n")
        old_entries = {k: v for k, v in json.loads(before_bytes)["files"].items() if k != target}
        with mock.patch.object(sn, "index_file", wraps=sn.index_file) as spy:
            plan = sn.refresh(self.notes, self.idx, {})
        self.assertEqual(spy.call_count, 1)  # tokenized exactly one file
        self.assertEqual(plan["changed"], [target])
        self.assertEqual((plan["new"], plan["deleted"], plan["touched"]), ([], [], []))
        self.assertEqual(len(plan["unchanged"]), 8)
        new_entries = json.loads((self.idx / "index.json").read_text(encoding="utf-8"))["files"]
        self.assertEqual({k: v for k, v in new_entries.items() if k != target}, old_entries)  # the other 8 untouched

        r = run("quokkaterm", "--index", self.idx, "--json")
        hit = json.loads(r.stdout)["results"][0]
        self.assertEqual(hit["file"], target)
        self.assertEqual(hit["lines"][0]["line"], self.line_of(target, "quokkaterm"))

    def test_touching_a_file_without_changing_it_does_not_reindex(self):
        sn.refresh(self.notes, self.idx, {})
        target = self.notes / "FORKS.md"
        os.utime(target, ns=(target.stat().st_atime_ns, target.stat().st_mtime_ns + 5_000_000_000))
        with mock.patch.object(sn, "index_file", wraps=sn.index_file) as spy:
            plan = sn.refresh(self.notes, self.idx, {})
        self.assertEqual(spy.call_count, 0)
        self.assertEqual(plan["touched"], ["FORKS.md"])

    def test_new_and_deleted_files(self):
        sn.refresh(self.notes, self.idx, {})
        (self.notes / "extra.md").write_text("# Extra\n\nThe zebrafinch sings.\n", encoding="utf-8")
        gone = "PROMPTS/conversations-001/2025-01-01_Party jollof for 20 people_c0000004.md"
        (self.notes / gone).unlink()
        plan = sn.refresh(self.notes, self.idx, {})
        self.assertEqual((plan["new"], plan["deleted"]), (["extra.md"], [gone]))
        self.assertEqual(json.loads(run("zebrafinch", "--index", self.idx, "--json").stdout)["results"][0]["file"], "extra.md")
        after = json.loads(run("jollof", "--index", self.idx, "--limit", 50, "--json").stdout)["results"]
        self.assertNotIn(gone, [h["file"] for h in after])  # the deleted file no longer answers

    def test_notes_are_only_read(self):
        before = tree_fingerprint(self.notes)
        run("sunbox", "--notes", self.notes, "--index", self.idx)
        run("kiosk", "--index", self.idx)
        self.assertEqual(tree_fingerprint(self.notes), before)
        self.assertEqual(sorted(p.name for p in self.idx.iterdir()), ["index.json"])


class Matching(Base):
    def test_marker_comments_and_metadata_are_not_searchable(self):
        for word in ("root", "gpt", "seq", "conversation_id"):
            r = run(word, "--notes", self.notes, "--index", self.idx)
            self.assertEqual(r.returncode, 1, (word, r.stdout))
        self.assertEqual(run("kiosk", "--index", self.idx).returncode, 0)

    def test_aliases_apply_to_query_and_notes_and_changing_them_rebuilds(self):
        aliases = Path(self.work.name, "aliases.json")
        aliases.write_text(json.dumps({"sunbx": "sunbox", "pv": "solar panel"}), encoding="utf-8")
        plain = json.loads(run("sunbox", "--notes", self.notes, "--index", self.idx, "--aliases", aliases, "--limit", 50, "--json").stdout)
        alias = json.loads(run("sunbx", "--index", self.idx, "--aliases", aliases, "--limit", 50, "--json").stdout)
        self.assertEqual({h["file"] for h in alias["results"]}, {h["file"] for h in plain["results"]})
        self.assertEqual(run("pv", "--index", self.idx, "--aliases", aliases).returncode, 0)  # pv -> solar panel
        aliases.write_text(json.dumps({"sunbx": "sunbox"}), encoding="utf-8")
        r = run("sunbx", "--index", self.idx, "--aliases", aliases)
        self.assertIn("rebuilt everything: aliases changed", r.stdout)

    def test_accents_and_case_are_folded(self):
        (self.notes / "cafe.md").write_text("# Cafe\n\nUn café noir, s'il vous plaît.\n", encoding="utf-8")
        r = run("CAFE", "--notes", self.notes, "--index", self.idx, "--json")
        hit = json.loads(r.stdout)["results"][0]
        self.assertEqual(hit["file"], "cafe.md")
        self.assertEqual(hit["lines"][0]["line"], 1)
        self.assertEqual(json.loads(run("plait", "--index", self.idx, "--json").stdout)["results"][0]["file"], "cafe.md")

    def test_all_flag_requires_every_word(self):
        either = json.loads(run("inverter jollof", "--notes", self.notes, "--index", self.idx, "--limit", 50, "--json").stdout)
        both = run("inverter jollof", "--index", self.idx, "--all", "--json")
        self.assertGreater(len(either["results"]), 0)
        self.assertEqual(both.returncode, 1)  # no single file holds both
        one = json.loads(run("sunbox inverter", "--index", self.idx, "--all", "--limit", 50, "--json").stdout)
        self.assertTrue(one["results"])
        self.assertTrue(all(set(h["matched"]) == {"sunbox", "inverter"} for h in one["results"]))

    def test_more_mentions_rank_higher_and_lines_are_ordered_by_distinct_words(self):
        (self.notes / "often.md").write_text("# Often\n\nzebrafinch one\nzebrafinch two\nzebrafinch three\nzebrafinch four\n", encoding="utf-8")
        (self.notes / "once.md").write_text("# Once\n\nzebrafinch one\nfiller two\nfiller three\nfiller four\n", encoding="utf-8")
        (self.notes / "pair.md").write_text("# Pair\n\nzebrafinch alone\nzebrafinch and quokkaterm together\nquokkaterm alone\n", encoding="utf-8")
        data = json.loads(run("zebrafinch", "--notes", self.notes, "--index", self.idx, "--json").stdout)
        self.assertEqual([h["file"] for h in data["results"]][:2], ["often.md", "pair.md"])
        self.assertEqual(data["results"][-1]["file"], "once.md")
        hit = json.loads(run("zebrafinch quokkaterm", "--index", self.idx, "--limit", 1, "--lines", 1, "--json").stdout)["results"][0]
        self.assertEqual((hit["file"], hit["lines"][0]["line"]), ("pair.md", 4))  # the line holding both words wins

    def test_stale_hit_is_flagged_when_the_file_changed_after_indexing(self):
        sn.refresh(self.notes, self.idx, {})
        target = "REPLIES/conversations-001/2025-01-01_Pricing the kiosk_c0000003.md"
        p = self.notes / target
        p.write_text("one\ntwo\nthree\n" + p.read_text(encoding="utf-8"), encoding="utf-8")
        r = run("kiosk", "--index", self.idx, "--no-refresh", "--limit", 50)
        self.assertIn("[file changed since it was indexed]", r.stdout)


class CommandLine(Base):
    def test_exit_codes(self):
        self.assertEqual(run("sunbox").returncode, 2, "first run without --notes and without an index")
        self.assertEqual(run("sunbox", "--index", self.idx, "--no-refresh").returncode, 2)
        self.assertEqual(run("--index", self.idx).returncode, 2, "no query")
        self.assertEqual(run("x", "--notes", self.notes / "nope", "--index", self.idx).returncode, 2)
        self.assertEqual(run("x", "--notes", self.notes, "--index", self.idx, "--limit", 0).returncode, 2)
        bad = Path(self.work.name, "bad.json")
        bad.write_text("[1, 2]", encoding="utf-8")
        self.assertEqual(run("x", "--notes", self.notes, "--index", self.idx, "--aliases", bad).returncode, 2)
        self.assertEqual(run("zzzznotaword", "--notes", self.notes, "--index", self.idx).returncode, 1)

    def test_update_only_reports_the_refresh(self):
        r = run("--update-only", "--notes", self.notes, "--index", self.idx)
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertIn("refresh: 9 new, 0 changed, 0 touched, 0 deleted, 0 unchanged", r.stdout)
        r = run("--update-only", "--index", self.idx)
        self.assertIn("0 new, 0 changed, 0 touched, 0 deleted, 9 unchanged", r.stdout)

    def test_a_different_notes_folder_rebuilds(self):
        other = Path(self.work.name, "other")
        other.mkdir()
        (other / "a.md").write_text("# A\n\nhello world\n", encoding="utf-8")
        run("--update-only", "--notes", self.notes, "--index", self.idx)
        r = run("--update-only", "--notes", other, "--index", self.idx)
        self.assertIn("rebuilt everything: notes folder changed", r.stdout)
        self.assertEqual(json.loads(run("hello", "--index", self.idx, "--json").stdout)["results"][0]["file"], "a.md")


if __name__ == "__main__":
    unittest.main()
