---
name: restore-point
description: Create a git restore-point commit before each batch of changes so work stays reversible
license: UNLICENSED
compatibility: opencode
metadata:
  domain: vcs-discipline
---

## When to use me

At the start of any multi-step change batch (refactor, migration, bulk fix) to create a revertible checkpoint before modifying files.

## Steps

1. Run `git status` to confirm all intended changes are staged.
2. Run `git add -A` (or stage specific files).
3. Commit with a descriptive message following the pattern: `Restore point: <scope>`. Examples:
   - `Restore point: estado P0 antes de migrar Tailwind a build`
   - `Restore point: fixes W3C + snapshot Lighthouse antes de optimización P0`
4. Verify with `git log --oneline -3` that the commit appears correctly.
5. Proceed with the actual change batch.

## Verification

- `git log --oneline` shows the restore-point commit immediately before the batch of work.
- If rollback is needed: `git revert <commit>` or `git reset --hard <commit>`.

## Session notes

Two restore-point commits created in `pit-stop`:
- `9a372d5` — "Restore point: fixes W3C + snapshot Lighthouse antes de optimización P0"
- `785a109` — "Restore point: estado P0 antes de migrar Tailwind a build"

Both enabled safe rollback at any stage of the session.
