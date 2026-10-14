# env_preflight

Toolkit layer: **Layer 1 (Python Execution Runtime)** - read-only check that an interpreter and the tools a Toolkit route needs are present. It never installs anything.

- Upstream: https://github.com/rohitg00/ai-engineering-from-scratch, commit 1c8e62b526e78b8773559594aab3a3487d9998ac, MIT (see LICENSE.upstream).
- Source: `phases/00-setup-and-tooling/01-dev-environment/code/verify.py` (sha256 94a5998e...bebb, 295 lines). Original left untouched.
- Disposition: ADAPT. Kept: Result/Probe/Route, command_result, python_result, module_result, report format, exit codes. Replaced: probes and routes (Toolkit tools instead of course routes); removed torch/gpu probe; added `--route all`.
- Not a replacement for `_meta/verify.py` (that verifies the Toolkit's own files, tests and hashes; this checks the machine). Different jobs.
- Tests (written here, not upstream): `python -B -X utf8 tools\env_preflight\tests\test_env_preflight.py`
