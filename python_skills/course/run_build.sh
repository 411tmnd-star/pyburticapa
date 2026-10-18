#!/usr/bin/env bash
# Runs the same build steps as the Vercel buildCommand, in order, stopping at the first failure.
cd "$(dirname "$0")/ai_engineering" || exit 1
for step in "site/fetch-translation-coverage.js" "site/build.js" "site/build-projects.js --strict" \
            "site/build-agents.js" "site/build-manuals.js" "site/clean-urls.js" "site/version-assets.js"; do
  echo "== node $step"
  node $step || { echo "BUILD_FAILED at: $step"; exit 1; }
done
echo "BUILD_OK"
