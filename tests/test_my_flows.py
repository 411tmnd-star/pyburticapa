"""my_flows: every example gives its documented result, every to_confirm workflow points at parts that exist,
match.py runs, and nothing personal (emails) or broken (relative links) is committed."""
import csv, json, os, re, shutil, subprocess, sys, tempfile, unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SK = ROOT / "python_skills"
MF = SK / "my_flows"
TC = MF / "to_confirm"


def py(script, *args, cwd=None):
    """Run a script the way the READMEs say: isolated, UTF-8."""
    return subprocess.run([sys.executable, "-I", "-X", "utf8", str(script), *map(str, args)],
                          cwd=cwd, capture_output=True, text=True, encoding="utf-8")


class Research(unittest.TestCase):
    def test_verify_example_is_7_of_13(self):
        d = MF / "research" / "evidence_verification" / "example"
        r = py(d.parent / "verify.py", "claims.md", "snapshots/", cwd=d)
        self.assertEqual(r.returncode, 1, r.stderr)
        self.assertIn("7/13 claims pass", r.stdout)

    def test_verify_quotes_example_is_2_of_4(self):
        d = MF / "research" / "demand_research" / "example"
        r = py(d.parent / "verify_quotes.py", "claims.jsonl", "snapshots/", cwd=d)
        self.assertEqual(r.returncode, 1, r.stderr)
        self.assertIn("2/4 claims pass", r.stdout)

    def test_leads_dry_run_drafts_one_and_names_nobody(self):
        with tempfile.TemporaryDirectory() as out:
            r = py(MF / "research" / "job_leads" / "leads.py", "--dry-run", "--out", out)
            self.assertEqual(r.returncode, 0, r.stderr)
            self.assertIn("1 draft(s) for review, 4 not drafted", r.stdout)
            drafts = list(Path(out, "drafts").glob("*.md"))
            self.assertEqual(len(drafts), 1)
            self.assertNotIn("@", drafts[0].read_text(encoding="utf-8"))


@unittest.skipUnless(shutil.which("ffmpeg") and shutil.which("ffprobe"), "ffmpeg not installed")
class Frames(unittest.TestCase):
    def test_frames_from_a_synthetic_clip(self):
        with tempfile.TemporaryDirectory() as t:
            clip = Path(t, "clip.mp4")
            subprocess.run(["ffmpeg", "-v", "error", "-f", "lavfi", "-i", "testsrc=size=320x180:rate=24:duration=2",
                            "-pix_fmt", "yuv420p", str(clip)], check=True)
            r = py(MF / "ui_ux" / "intake" / "frames.py", clip, Path(t, "frames"), "--fps", "4")
            self.assertEqual(r.returncode, 0, r.stderr)
            meta = json.loads(Path(t, "frames", "frames.json").read_text(encoding="utf-8"))
            self.assertEqual((meta["count"], meta["pattern"], meta["width"], meta["source"]), (8, "f_{n}.jpg", 320, "clip.mp4"))
            self.assertEqual(py(MF / "ui_ux" / "intake" / "frames.py", Path(t, "missing.mp4"), Path(t, "x")).returncode, 2)


class ToConfirm(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        with open(TC / "REGISTRY.csv", encoding="utf-8") as f:
            cls.rows = list(csv.DictReader(f))
        with open(SK / "corpus" / "CATALOG.csv", encoding="utf-8") as f:
            cls.catalog = {r["id"]: r for r in csv.DictReader(f)}

    def test_registry_has_the_first_20_with_folders(self):
        self.assertEqual([r["id"] for r in self.rows], [f"W{i:02d}" for i in range(1, 21)])
        for r in self.rows:
            self.assertIn(r["type"], ("A", "B", "C"))
            self.assertIn(r["status"], ("to confirm", "confirmed"))
            for page in ("WORKFLOW.md", "PARTS.md", "TASKS.md"):
                self.assertTrue((TC / r["folder"] / page).is_file(), f"{r['folder']}/{page}")

    def test_every_part_exists(self):
        for r in self.rows:
            for p in filter(None, r["ours"].split("; ")):
                self.assertTrue((SK / p).exists(), f"{r['id']}: {p}")
            for cid in filter(None, r["course"].split("; ")):
                self.assertIn(cid, self.catalog, f"{r['id']}: {cid}")
                self.assertTrue((SK / "course" / "ai_engineering" / self.catalog[cid]["source"]).exists(), f"{r['id']}: {cid}")
            parts = (TC / r["folder"] / "PARTS.md").read_text(encoding="utf-8")
            for path in re.findall(r"`((?:course|confirmed|my_flows|llm_instructions)/[^`]+)`", parts):
                self.assertTrue((SK / path).exists(), f"{r['id']} PARTS.md: {path}")

    def test_match_writes_candidates_of_all_three_types(self):
        with tempfile.TemporaryDirectory() as t:
            out = Path(t, "c.csv")
            r = py(TC / "match.py", "--out", out)
            self.assertEqual(r.returncode, 0, r.stderr)
            with open(out, encoding="utf-8") as f:
                rows = list(csv.DictReader(f))
            self.assertEqual({x["type"] for x in rows}, {"A", "B", "C"})
            self.assertTrue(all(x["course_id"] for x in rows))


class Legibility(unittest.TestCase):
    """legibility.py reproduces the robot audit's pixel sizes."""
    SCRIPT = MF / "research" / "3d_marketing_engine" / "legibility.py"

    def test_hero_camera_numbers(self):
        r = py(self.SCRIPT)
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertIn("5.11 - 6.51", r.stdout)
        self.assertIn("0.46 - 0.59 px", r.stdout)
        self.assertIn("15.3 - 19.5 mm", r.stdout)
        self.assertIn("10.96 - 11.12", r.stdout)

    def test_one_camera_and_bad_input(self):
        r = py(self.SCRIPT, "--focal", "85", "--distance", "11.59", "14.76", "--feature-mm", "5")
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertIn("0.77 - 0.98 px", r.stdout)
        self.assertEqual(py(self.SCRIPT, "--focal", "0", "--distance", "1", "2").returncode, 2)


class NewDocs(unittest.TestCase):
    def test_eval_task_set_has_ten_tasks(self):
        text = (TC / "W19-411-eval-runner" / "EVAL_TASKS.md").read_text(encoding="utf-8")
        rows = re.findall(r"(?m)^\| (\d+) \|", text)
        self.assertEqual(rows, [str(i) for i in range(1, 11)])


class Hygiene(unittest.TestCase):
    TEXT = (".md", ".py", ".html", ".js", ".css", ".csv", ".json", ".jsonl", ".txt")

    def files(self):
        for base in (MF, SK / "llm_instructions" / "chat_skills"):
            for p in base.rglob("*"):
                if p.is_file() and p.suffix in self.TEXT and "__pycache__" not in p.parts:
                    yield p

    def test_no_email_addresses(self):
        email = re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}\b")
        for p in self.files():
            self.assertIsNone(email.search(p.read_text(encoding="utf-8", errors="replace")), str(p))

    def test_relative_markdown_links_resolve(self):
        link = re.compile(r"\]\(([^)#\s]+)(?:#[^)]*)?\)")
        for p in self.files():
            if p.suffix != ".md":
                continue
            for target in link.findall(p.read_text(encoding="utf-8")):
                if re.match(r"[a-z]+:", target):
                    continue
                self.assertTrue((p.parent / target).exists(), f"{p.relative_to(ROOT)} -> {target}")


if __name__ == "__main__":
    unittest.main()
