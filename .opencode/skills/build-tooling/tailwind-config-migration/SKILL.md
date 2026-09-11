---
name: tailwind-config-migration
description: Move inline tailwind.config from script.js to tailwind.config.js and fix spacing/config keys so generated utilities match HTML classes
license: UNLICENSED
compatibility: opencode
metadata:
  domain: build-tooling
---

## When to use me

When Tailwind configuration is defined inline in a `<script>` tag or JS file via `tailwind.config = {...}` and needs to be extracted to a proper `tailwind.config.js` for the CLI build, or when generated utility classes don't match the class names used in HTML due to key mismatches.

## Steps

1. Locate the inline `tailwind.config` assignment (e.g. `tailwind.config = {...}` in a JS file).
2. Copy the full config object into a new `tailwind.config.js` at project root, wrapped in `module.exports = { ... };`.
3. Audit every custom Tailwind class in the HTML (e.g. `px-spacing-margin-mobile`) against the config keys.
4. Fix key mismatches: the HTML class `px-spacing-margin-mobile` expects a spacing key named `spacing-margin-mobile`, not `margin-mobile`. Rename keys so they match exactly what the HTML uses.
5. Run `npm run build` and `grep` the output CSS for the renamed classes to confirm they are generated.
6. Remove the original inline `tailwind.config = {...}` block from the JS/HTML file.

## Verification

- `grep 'px-spacing-margin-mobile' dist/tailwind.css` → found.
- All custom color, font, and fontSize classes from the HTML are present in `dist/tailwind.css`.
- No "undefined" or missing utilities in the browser inspector.

## Session notes

Applied to `pit-stop`: extracted config from `script.js` line 2; spacing keys renamed from `margin-mobile`/`margin-desktop` to `spacing-margin-mobile`/`spacing-margin-desktop` to match HTML usage `px-spacing-margin-mobile md:px-spacing-margin-desktop`.
