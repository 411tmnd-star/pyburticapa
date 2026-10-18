# How it works: Skill Evals, Packaging, and Portability

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class LintIssue`](code/main.py#L60)
- [`class LintReport`](code/main.py#L66)
- [`def _frontmatter_and_body(path)`](code/main.py#L72)
- [`def _bundle_paths(body)`](code/main.py#L125)
- [`def _section_has_content(body, title)`](code/main.py#L138)
- [`def _contains_obvious_secret(data)`](code/main.py#L153)
- [`def lint_package(root, allowed_runtime_extensions)`](code/main.py#L157)
- [`class TriggerCase`](code/main.py#L284)
- [`class KeywordRouter`](code/main.py#L291)
- [`def _validate_trigger_cases(cases)`](code/main.py#L301)
- [`def classification_metrics(expected, predicted)`](code/main.py#L322)
- [`def evaluate_triggers(cases, router)`](code/main.py#L345)
- [`def trigger_report_from_observations(cases, observations)`](code/main.py#L352)
- [`def repeated_run_observations(cases, router, runs)`](code/main.py#L391)
- [`def rates_from_observations(cases, observations)`](code/main.py#L405)
- [`def repeated_run_rates(cases, router, runs)`](code/main.py#L425)
- [`class ArtifactContract`](code/main.py#L435)
- [`def evaluate_artifact(text, contract)`](code/main.py#L441)
- [`def compare_artifacts(baseline, with_skill, contract)`](code/main.py#L466)
- [`class EvidenceCheck`](code/main.py#L479)
- [`def evaluate_evidence_checks(cases, layer)`](code/main.py#L485)
- [`def build_manifest(root)`](code/main.py#L511)
- [`def verify_manifest(root, expected)`](code/main.py#L533)
- [`class PackageRequirements`](code/main.py#L580)
- [`class HostCapabilities`](code/main.py#L587)
- [`def portability_matrix(requirements, hosts)`](code/main.py#L595)
- [`class ReleaseThresholds`](code/main.py#L629)
- [`class EvaluationProvenance`](code/main.py#L650)
- [`def artifact_digest(value)`](code/main.py#L666)
- [`def bytes_digest(value)`](code/main.py#L670)
- [`def _canonical_digest(value)`](code/main.py#L674)
- [`def evidence_digest(script_checks, safety_checks)`](code/main.py#L681)
- [`def host_matrix_digest(requirements, hosts)`](code/main.py#L691)
- [`def trigger_results_digest(cases, observations)`](code/main.py#L701)
- [`def local_evidence_root(cases, observations, baseline_artifact, with_skill_artifact, artifact_contract, script_checks, safety_checks, requirements, hosts, manifest, thresholds, provenance)`](code/main.py#L715)
- [`def build_external_attestation(evidence_root)`](code/main.py#L758)
- [`def verify_external_attestation(evidence_root, attestation_payload, trusted_attestation_digest)`](code/main.py#L772)
- [`def evaluate_provenance(provenance, baseline_artifact, with_skill_artifact, script_checks, safety_checks, requirements, hosts, cases, observations)`](code/main.py#L819)
- [`def run_release_gate(package_root, cases, router, runs, baseline_artifact, with_skill_artifact, artifact_contract, requirements, hosts, script_checks, safety_checks, installed_root, manifest, provenance, thresholds, attestation_payload, trusted_attestation_digest)`](code/main.py#L898)
- [`def demo()`](code/main.py#L1037)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
