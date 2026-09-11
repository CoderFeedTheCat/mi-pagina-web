---
name: aria-roles
description: Add correct ARIA roles and labels to interactive divs/sections and landmark regions for a11y/W3C compliance
license: UNLICENSED
compatibility: opencode
metadata:
  domain: validation
---

## When to use me

When a W3C or a11y audit reports missing `role`, `aria-label`, or incorrect landmark usage on interactive or region elements in a static HTML site.

## Steps

1. Identify all interactive elements (`div`, `span`, `section`) that lack a semantic HTML equivalent (e.g. `<button>`, `<a>`).
2. Add `role="button"` to clickable `div`s/`section`s that act as buttons.
3. Add `role="region"` to carousel containers or named regions that should be exposed as landmarks.
4. Add `aria-label` to every `role="button"` and `role="region"` element with a descriptive Spanish label matching the visible content.
5. Prefer semantic HTML (`<button>`, `<a>`, `<nav>`) where possible; add roles only when restructuring is not feasible.

## Verification

- Re-run the W3C validator; expect 0 ARIA-related errors.
- Run an a11y audit (Lighthouse Accessibility or axe); confirm no missing-name/role issues.

## Session notes

Applied to `pit-stop/code.html`: added `role="region"` to `#hero-carousel`, `aria-label` to two band sections, converted `section[role=button]` to `div[role=button]`.
