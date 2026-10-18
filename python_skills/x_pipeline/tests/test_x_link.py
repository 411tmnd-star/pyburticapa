"""Tests for x_link.py. No network: tweet fetching and slow steps are replaced by fakes.
Run: python -B python_skills/x_pipeline/tests/test_x_link.py   (or python -m unittest in this folder)"""
import io
import sys
import tempfile
import unittest
from contextlib import redirect_stderr, redirect_stdout
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))
import x_link  # noqa: E402

TWEET = {"user_name": "Ada", "user_screen_name": "ada", "text": "hello thread", "date": "Tue Oct 07 12:00:00 +0000 2025",
         "mediaURLs": ["https://pbs.twimg.com/media/abc.jpg", "https://video.twimg.com/ext_tw_video/1/vid.mp4"],
         "media_extended": [], "likes": 3, "retweets": 1, "replies": 0, "qrt": None}


def fake_fetch(user, tid):
    return (None, "Status 404") if tid.endswith("404") else (dict(TWEET), None)


def args(**kw):
    ns = x_link.argparse.Namespace(links=[], links_file=None, out="x", no_articles=False, no_download=False,
                                   no_transcribe=False, model=None, cookies_browser=None)
    ns.__dict__.update(kw)
    return ns


class Parse(unittest.TestCase):
    def test_variants_and_dedupe(self):
        text = """see https://x.com/ada/status/1111111111111111111?s=20 and
        https://twitter.com/bob/status/2222222222222222222 plus https://mobile.twitter.com/cy/status/3333333333333333333
        https://x.com/i/status/4444444444444444444 https://x.com/i/web/status/5555555555555555555
        https://fxtwitter.com/ada/status/1111111111111111111 (duplicate)"""
        got = x_link.parse_links([text])
        self.assertEqual([t for _, t in got], ["1111111111111111111", "2222222222222222222", "3333333333333333333",
                                                "4444444444444444444", "5555555555555555555"])
        self.assertEqual(got[0][0], "ada")
        self.assertEqual(got[3][0], "i")

    def test_ignores_non_status_links(self):
        self.assertEqual(x_link.parse_links(["https://x.com/ada", "https://example.com/status/12345678", "", None]), [])


class Capture(unittest.TestCase):
    def test_saves_then_skips_existing(self):
        with tempfile.TemporaryDirectory() as t:
            ws = x_link.workspace(t)
            s, _ = x_link.capture("ada", "1234567890123", ws["notes"], fake_fetch, lambda u, d: "# note " + u)
            self.assertEqual(s, "saved")
            calls = []
            s, _ = x_link.capture("ada", "1234567890123", ws["notes"], lambda *a: calls.append(a) or (None, "x"), None)
            self.assertEqual((s, calls), ("existing", []))

    def test_failure_is_reported_not_raised(self):
        with tempfile.TemporaryDirectory() as t:
            ws = x_link.workspace(t)
            s, d = x_link.capture("ada", "123456789404", ws["notes"], fake_fetch, lambda u, d: "")
            self.assertEqual((s, d), ("failed", "Status 404"))
            self.assertFalse((ws["notes"] / "123456789404.md").exists())

    def test_real_note_builder_output(self):
        import extractor
        with tempfile.TemporaryDirectory() as t:
            ws = x_link.workspace(t)
            x_link.capture("ada", "1234567890123", ws["notes"], fake_fetch, extractor.build_note)
            text = (ws["notes"] / "1234567890123.md").read_text(encoding="utf-8")
            self.assertIn("# Ada (@ada)", text)
            self.assertIn("**Source:** https://x.com/ada/status/1234567890123", text)
            self.assertIn("https://video.twimg.com/ext_tw_video/1/vid.mp4", text)


class Pipeline(unittest.TestCase):
    def run_cli(self, a, **kw):
        out, err = io.StringIO(), io.StringIO()
        with redirect_stdout(out), redirect_stderr(err):
            rc = x_link.run(a, **kw)
        return rc, out.getvalue(), err.getvalue()

    def test_no_links_is_exit_2(self):
        with tempfile.TemporaryDirectory() as t:
            rc, _, err = self.run_cli(args(out=t, links=["no links here"]), fetch=fake_fetch)
            self.assertEqual(rc, 2)
            self.assertIn("No X/Twitter status links", err)

    def test_end_to_end_with_fake_steps_and_summary(self):
        with tempfile.TemporaryDirectory() as t:
            ran = []

            def fake_transcribe():
                ran.append("transcribe")
                for note in (Path(t) / "notes").glob("*.md"):
                    note.write_text(note.read_text(encoding="utf-8") + "\n### Transcript\nspoken words\n", encoding="utf-8")
                return 0

            rc, out, _ = self.run_cli(
                args(out=t, links=["https://x.com/ada/status/1234567890123", "https://x.com/ada/status/123456789404"]),
                fetch=fake_fetch, build=lambda u, d: f"# x\n**Source:** {u}\n![img](https://pbs.twimg.com/media/abc.jpg)\n",
                stages=[("download", lambda: ran.append("download") or 0), ("transcribe", fake_transcribe)])
            self.assertEqual(rc, 1)  # one link failed
            self.assertEqual(ran, ["download", "transcribe"])
            summary = (Path(t) / "SUMMARY.md").read_text(encoding="utf-8")
            self.assertIn("| ada/1234567890123 | saved | no | 1 | 0 | yes (machine) |", summary)
            self.assertIn("| ada/123456789404 | FAILED", summary)
            self.assertIn("Status 404", summary)

    def test_all_failed_skips_followup_steps(self):
        with tempfile.TemporaryDirectory() as t:
            ran = []
            rc, _, _ = self.run_cli(args(out=t, links=["https://x.com/ada/status/123456789404"]), fetch=fake_fetch,
                                    build=lambda u, d: "", stages=[("download", lambda: ran.append(1) or 0)])
            self.assertEqual((rc, ran), (1, []))

    def test_failing_step_does_not_stop_later_steps(self):
        with tempfile.TemporaryDirectory() as t:
            ran = []
            rc, out, _ = self.run_cli(args(out=t, links=["https://x.com/ada/status/1234567890123"]), fetch=fake_fetch,
                                      build=lambda u, d: "# x\n",
                                      stages=[("download", lambda: 3), ("transcribe", lambda: ran.append(1) or 0)])
            self.assertEqual((rc, ran), (0, [1]))
            self.assertIn("download exited with code 3", out)


class RealModulesStayInTheWorkspace(unittest.TestCase):
    def test_fetch_articles_writes_only_inside_the_workspace(self):
        import fetch_articles
        with tempfile.TemporaryDirectory() as t:
            ws = x_link.workspace(t)
            (ws["notes"] / "1234567890123.md").write_text(
                "# x\n**Source:** https://x.com/ada/status/1234567890123\n\n### Content\nhi\n", encoding="utf-8")
            before = (fetch_articles.NOTES_DIR, fetch_articles.CHECKED_LOG)
            fetch_articles.fetch_status = lambda user, tid: {"text": "hi"}  # tweet without an article
            args_ = args(out=t, no_download=True, no_transcribe=True)
            out = io.StringIO()
            with redirect_stdout(out):
                stages = x_link.default_stages(ws, args_)
                code = stages[0][1]()
            self.assertEqual(code, 0)
            self.assertEqual((fetch_articles.NOTES_DIR, fetch_articles.CHECKED_LOG), before)  # restored afterwards
            self.assertTrue((Path(t) / "articles_checked.txt").exists())
            self.assertIn("1234567890123", (Path(t) / "articles_checked.txt").read_text())
            self.assertFalse((HERE.parent / "articles_checked.txt").exists())

    def test_transcribe_step_looks_for_videos_in_the_workspace(self):
        """Regression: transcribe_notes finds/downloads videos through download_videos, whose VIDEOS_DIR
        must point at the workspace during that step (it used to stay in the script folder)."""
        import download_videos
        import transcribe_notes
        seen = {}
        real_main = transcribe_notes.main
        transcribe_notes.main = lambda: seen.update(videos=download_videos.VIDEOS_DIR, notes=transcribe_notes.NOTES_DIR)
        try:
            with tempfile.TemporaryDirectory() as t:
                ws = x_link.workspace(t)
                before = download_videos.VIDEOS_DIR
                stages = dict(x_link.default_stages(ws, args(out=t)))
                self.assertEqual(stages["transcribe"](), 0)
                self.assertEqual(seen["videos"], ws["videos"])
                self.assertEqual(seen["notes"], ws["notes"])
                self.assertEqual(download_videos.VIDEOS_DIR, before)  # restored afterwards
        finally:
            transcribe_notes.main = real_main


class StepsAcceptWorkdir(unittest.TestCase):
    def test_every_step_takes_workdir_and_writes_only_there(self):
        import consolidate_images, consolidate_videos, download_videos, fetch_articles, transcribe_notes
        for mod in (download_videos, fetch_articles, transcribe_notes, consolidate_images, consolidate_videos):
            self.assertTrue(hasattr(mod, "_use_workdir"), mod.__name__)
        with tempfile.TemporaryDirectory() as t:
            saved = (download_videos.NOTES_DIR, download_videos.VIDEOS_DIR, download_videos.IMAGES_DIR,
                     download_videos.FAILED_LOG, download_videos.ROOT)
            try:
                download_videos._use_workdir(t)
                root = Path(t).resolve()
                self.assertEqual(download_videos.NOTES_DIR, root / "output_notes")
                self.assertEqual(download_videos.VIDEOS_DIR, root / "videos")
                self.assertEqual(download_videos.FAILED_LOG, root / "failed_downloads.txt")
            finally:
                (download_videos.NOTES_DIR, download_videos.VIDEOS_DIR, download_videos.IMAGES_DIR,
                 download_videos.FAILED_LOG, download_videos.ROOT) = saved

    def test_extractor_reads_links_only_from_its_input(self):
        import extractor
        self.assertFalse(hasattr(extractor, "LINKS_127"))
        self.assertEqual(extractor.extract_x_urls([]), [])
        self.assertEqual(extractor.extract_x_urls(["see https://x.com/a/status/11 and https://twitter.com/b/status/22"]),
                         ["https://x.com/a/status/11", "https://x.com/b/status/22"])


if __name__ == "__main__":
    unittest.main()
