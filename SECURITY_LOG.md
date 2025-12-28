## 2025-12-28 — Scheduled audit + workflow hardening

### Summary
- **Secrets exposure scan (working tree)**: no obvious credentials detected by common pattern checks.
- **Secrets exposure scan (recent history)**: no obvious credentials detected in the last 50 commits (patch text where available via GitHub API).
- **Workflow hardening**: tightened `Secrets Audit` workflow to be safer-by-default and more deterministic.

### Changes made
- **Removed unsafe installer pattern**: eliminated `curl | bash` installation of a third-party CLI from the workflow.
- **Pinned GitHub Actions to immutable SHAs**:
  - `actions/checkout` pinned to the `v4` commit SHA.
  - `gitleaks/gitleaks-action` pinned to the `v2.3.9` commit SHA.
  - `rhysd/actionlint` pinned to the `v1.7.9` commit SHA.
- **Reduced permissions**: workflow now uses `permissions: contents: read` (no repo writes, no PR writes).
- **Enabled a schedule**: workflow runs weekly (Sunday 04:00 UTC) and remains manually runnable.
- **Added `.gitleaks.toml`**: keeps default gitleaks rules and provides a place for narrowly-scoped allowlists if needed.
- **Proposed hardened workflow YAML**: saved at `docs/proposed-workflows/secret-audit.yml` for easy copy/paste.

### Note on GitHub token limitations
In this runner context, the GitHub integration token can’t create commits that modify files under `.github/workflows/` via the Git data API (HTTP 403). The hardened workflow is therefore provided as a proposed file; applying it requires updating `.github/workflows/secret-audit.yml` using a token with `workflow` scope (or via a normal git push from a user/PAT with that scope).

### Remediation guidance
- **If secrets are ever detected**:
  - Revoke/rotate the credential immediately at the issuer.
  - Remove it from the repository and history if it was committed (consider `git filter-repo`).
  - Add a narrowly-scoped allowlist entry only when you’ve confirmed it is a false positive.
- **Keep actions pinned**: when bumping versions, update the pinned SHA to the new tag’s commit SHA.
- **Keep permissions minimal**: only grant write permissions to workflows that must write.

