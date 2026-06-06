# Architecture

`cyberark-privileged-access-drift-ledger` is a small synthetic proof repo.

- `fixtures/privileged-access-drift.json` is the synthetic source packet.
- `src/index.ts` scores privileged-access drift and produces board narratives.
- `powershell/Invoke-DriftLedger.ps1` mirrors the scoring logic for security operators.
- `sql/privileged_access_contract.sql` defines reviewed evidence fields.
- `src/app.ts` renders the static proof surface used by GitHub Pages.
- `scripts/render_readme_assets.ps1` creates README screenshots.

No CyberArk tenant credentials, vault exports, account names, or production safe data are used.
