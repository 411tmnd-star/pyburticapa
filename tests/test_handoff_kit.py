"""W20 pass test: init.py reports the environment, the test result and the first open W task,
and exits 1 if tests fail. Uses a throwaway fake repo, so the real suite is never re-run from inside itself."""
import csv
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
INIT = REPO / "python_skills" / "confirmed" / "handoff_kit" / "init.py"

FIELDS = ["id", "name", "type", "goals", "ours", "course", "outside", "status", "confirmed_in", "evidence", "folder", "notes"]


def make_repo(root, test_body="def test_ok(self): self.assertTrue(True)", rows=None):
    (root / "tests").mkdir()
    (root / "tests" / "test_fake.py").write_text(
        "import unittest\nclass T(unittest.TestCase):\n    " + test_body + "\n", encoding="utf-8")
    tc = root / "python_skills" / "my_flows" / "to_confirm"
    tc.mkdir(parents=True)
    rows = rows or [
        dict(id="W01", name="Done one", status="confirmed", folder="W01-done"),
        dict(id="W02", name="Blocked one", status="to confirm", folder="W02-blocked", notes="blocked: needs bpy/3.13"),
        dict(id="W03", name="Open one", status="to confirm", folder="W03-open", type="A", goals="research"),
    ]
    with open(tc / "REGISTRY.csv", "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS, restval="", lineterminator="\n")
        w.writeheader()
        w.writerows(rows)
    d = tc / "W03-open"
    d.mkdir()
    (d / "WORKFLOW.md").write_text("# W03\n\n## Pass\n\nThe thing\nprints three lines.\n\nMore.\n", encoding="utf-8")
    (d / "TASKS.md").write_text("# tasks\n\n## Evidence\n\n(empty)\n", encoding="utf-8")


def init(root, *args, env=None):
    e = dict(os.environ, PYTHONDONTWRITEBYTECODE="1")
    e.update(env or {})
    return subprocess.run([sys.executable, "-I", "-X", "utf8", str(INIT), "--root", str(root), *args],
                          capture_output=True, text=True, encoding="utf-8", env=e, timeout=120)


class HandoffKit(unittest.TestCase):
    def test_green_repo_reports_everything_and_exits_0(self):
        with tempfile.TemporaryDirectory() as t:
            root = Path(t)
            make_repo(root)
            r = init(root)
            self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
            for needle in ("[environment]", "python ", "ffmpeg", "[tests]", "PASS 1 test(s)", "first open: W03",
                           "pass test: The thing prints three lines.", "evidence so far: none yet",
                           "skipped W02: blocked: needs bpy/3.13", "== READY"):
                self.assertIn(needle, r.stdout)
            self.assertNotIn("first open: W01", r.stdout)

    def test_failing_tests_exit_1_and_show_the_failure(self):
        with tempfile.TemporaryDirectory() as t:
            root = Path(t)
            make_repo(root, test_body="def test_bad(self): self.assertEqual(1, 2)")
            r = init(root)
            self.assertEqual(r.returncode, 1, r.stdout)
            self.assertIn("FAIL 1 test(s)", r.stdout)
            self.assertIn("AssertionError", r.stdout)
            self.assertIn("== NOT READY", r.stdout)
            self.assertIn("first open: W03", r.stdout)  # still names the next task

    def test_skip_tests_says_so(self):
        with tempfile.TemporaryDirectory() as t:
            root = Path(t)
            make_repo(root, test_body="def test_bad(self): self.assertEqual(1, 2)")
            r = init(root, "--skip-tests")
            self.assertEqual(r.returncode, 0)
            self.assertIn("SKIPPED", r.stdout)

    def test_key_presence_is_reported_but_never_the_value(self):
        with tempfile.TemporaryDirectory() as t:
            root = Path(t)
            make_repo(root)
            r = init(root, "--skip-tests", "--keys", "FAKE_KEY_FOR_TEST", env={"FAKE_KEY_FOR_TEST": "s3cret-value-123"})
            self.assertRegex(r.stdout, r"FAKE_KEY_FOR_TEST\s+set\s")
            self.assertNotIn("s3cret-value-123", r.stdout + r.stderr)

    def test_all_confirmed_means_no_open_task(self):
        with tempfile.TemporaryDirectory() as t:
            root = Path(t)
            make_repo(root, rows=[dict(id="W01", name="x", status="confirmed", folder="W01-x")])
            r = init(root, "--skip-tests")
            self.assertIn("first open: none", r.stdout)

    def test_missing_root_exits_2(self):
        self.assertEqual(init(REPO / "no_such_folder_here").returncode, 2)

    def test_real_repo_names_a_first_open_task(self):
        r = init(REPO, "--skip-tests")
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        self.assertRegex(r.stdout, r"first open: W\d\d")
        self.assertIn("[environment]", r.stdout)


if __name__ == "__main__":
    unittest.main()
