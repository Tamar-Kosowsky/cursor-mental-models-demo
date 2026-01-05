# Bug Bot Rules

This file defines automated bug detection rules for code changes.

## TODO/FIXME Detection

**Pattern:** `/(?:^|\s)(TODO|FIXME)(?:\s*:|\s+)/`

**Matches:**
- `TODO: fix this`
- `FIXME: needs review`
- `// TODO something`
- `# TODO: implement feature`

**Action:**
- Add a **non-blocking** Bug titled: `"TODO/FIXME comment found"`
- Body: `"Replace TODO/FIXME with a tracked issue reference, e.g., \`TODO(#1234): ...\`, or remove it."`
- **Auto-resolve** if the TODO/FIXME already references an issue using pattern: `/#\d+|[A-Z]+-\d+/`
  - Examples that auto-resolve: `TODO(#1234): ...`, `FIXME(JIRA-567): ...`

## Dangerous Dynamic Execution Detection

**Pattern:** `/\beval\s*\(|\bexec\s*\(/i` (case-insensitive)

**Matches:**
- `eval(...)`
- `exec(...)`
- `EVAL(...)`
- `Exec(...)`

**Action:**
- Add a **blocking** Bug with title: `"Dangerous dynamic execution"`
- Body: `"Usage of eval/exec was found. Replace with safe alternatives or justify with a detailed comment and tests."`
- Assign the Bug to the PR author
- Apply label: `"security"`
- **Fail check:** true
- **Severity:** critical
- **Status:** failure
- **Conclusion:** failure