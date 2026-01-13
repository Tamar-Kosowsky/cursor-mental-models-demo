# Workflow Hardening Recommendations

This run could not push changes to `.github/workflows/*` because the runner token lacks `workflows` permission.

## Recommended minimal edits (for `.github/workflows/secret-audit.yml`)

- **Pin third-party actions**: Replace `actions/checkout@v4` with a commit SHA (example: `actions/checkout@34e114876b0b11c390a56381ad16ebd13914f8d5` for tag `v4`).
- **Enable scheduled runs**: Add a `schedule` trigger (e.g., `0 4 * * *`) so the audit runs automatically.
- **Reduce permissions**: Remove unused permissions (e.g. `actions: read`) and keep only what’s required for this workflow (`contents: write`, `pull-requests: write`).
- **Add basic shell safety**: Use `set -euo pipefail` and safer `curl` flags (`--proto '=https' --tlsv1.2 -fsSL`).
- **Add guardrails**: Add `timeout-minutes` and `concurrency` to avoid hung jobs / overlapping runs.

## Notes on risky patterns

- **`curl | bash` installers**: Prefer pinned releases + checksums/signatures when possible. If you must use an installer script, keep TLS-only flags and fail-fast behavior.
- **Overbroad permissions**: Especially avoid write permissions when you don’t need them, and avoid `pull_request_target` unless you fully understand the threat model.
