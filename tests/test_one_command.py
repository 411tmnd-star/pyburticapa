"""run.py: export folder in, output folder out, in one command (same steps as the separate commands)."""
import os
import subprocess
import sys
import tempfile
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RUN = os.path.join(ROOT, "python_skills", "confirmed", "knowledge_recovery", "run.py")
RECOVER = os.path.join(ROOT, "python_skills", "confirmed", "knowledge_recovery", "recover.py")
sys.path.insert(0, os.path.join(ROOT, "tests", "fixtures"))
import make_takeout  # noqa: E402


def py(*args):
    p = subprocess.run([sys.executable, "-I", "-X", "utf8", *args], capture_output=True, text=True, encoding="utf-8")
    return p.returncode, p.stdout + p.stderr


class OneCommand(unittest.TestCase):
    def test_export_to_dossier_in_one_command(self):
        with tempfile.TemporaryDirectory() as t:
            exp, out, aliases = (os.path.join(t, n) for n in ("export", "out", "aliases.json"))
            make_takeout.write(exp)
            make_takeout.write_aliases(aliases)
            rc, text = py(RUN, exp, out, "--aliases", aliases, "--subject", "SunBox")
            self.assertEqual(rc, 0, text)
            for name in ("clean/PROMPTS", "clean/REPLIES", "knowledge.db", "dossiers/sunbox_dossier.md",
                         "dossiers/sunbox_evidence.csv"):
                self.assertTrue(os.path.exists(os.path.join(out, name)), name)
            rc2, text2 = py(RUN, exp, out, "--aliases", aliases)  # second run needs --overwrite for the split step
            self.assertNotEqual(rc2, 0)
            rc3, _ = py(RUN, exp, out, "--aliases", aliases, "--overwrite")
            self.assertEqual(rc3, 0)

    def test_missing_export_folder_is_exit_2(self):
        with tempfile.TemporaryDirectory() as t:
            rc, text = py(RUN, os.path.join(t, "nope"), os.path.join(t, "out"))
            self.assertEqual(rc, 2, text)

    def test_ingest_has_no_built_in_archive_path(self):
        rc, text = py(RECOVER, "ingest")
        self.assertNotEqual(rc, 0)
        self.assertIn("--archive", text)


if __name__ == "__main__":
    unittest.main()
