"""Toolkit-written tests for env_preflight (not from upstream). No network, nothing installed."""
import os, sys, unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import env_preflight as ep


class T(unittest.TestCase):
    def test_every_route_key_has_a_probe(self):
        for name, r in ep.ROUTES.items():
            for k in (*r.required, *r.optional):
                self.assertIn(k, ep.PROBES, f"{name}: {k}")

    def test_module_result(self):
        self.assertTrue(ep.module_result("json").ok)
        self.assertFalse(ep.module_result("definitely_not_a_module_xyz").ok)

    def test_command_result_missing(self):
        r = ep.command_result("definitely-not-a-command-xyz")
        self.assertFalse(r.ok)
        self.assertIn("not found", r.detail)

    def test_python_probe_matches_interpreter(self):
        self.assertEqual(ep.python_result().ok, sys.version_info >= (3, 11))

    def test_all_route_covers_every_other_probe(self):
        r = ep.ROUTES["all"]
        used = set(r.required) | set(r.optional)
        for name, other in ep.ROUTES.items():
            if name != "all":
                self.assertLessEqual(set(other.required) | set(other.optional), used)

    def test_exit_code(self):
        sys.argv = ["x", "--route", "pipeline"]
        self.assertEqual(ep.main(), 0 if sys.version_info >= (3, 11) else 1)


if __name__ == "__main__":
    unittest.main()
