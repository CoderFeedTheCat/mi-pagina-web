---
name: tailwind-cdn-to-cli
description: Migrate Tailwind Play CDN to a production CLI build — install v3, input.css, tailwind.config.js, dist CSS, remove CDN script
license: UNLICENSED
compatibility: opencode
metadata:
  domain: build-tooling
---

## When to use me

When a static site loads Tailwind via the Play CDN (`cdn.tailwindcss.com`) and needs to move to a production-ready CLI build to eliminate the runtime warning and reduce payload.

## Steps

1. Install Tailwind CSS v3 as a devDependency: `npm i -D tailwindcss@3`.
2. Create `src/input.css` with the three `@tailwind` directives (`base`, `components`, `utilities`).
3. Create `tailwind.config.js` at project root with `content` pointing to all HTML/JS files that contain Tailwind classes.
4. Migrate any inline `tailwind.config` object (from `<script>` or JS files) into the new `tailwind.config.js` using `module.exports = { ... }`.
5. Add build scripts to `package.json`: `"build": "tailwindcss -i src/input.css -o dist/tailwind.css --minify"` and optionally `"watch"`.
6. Run `npm run build` and verify `dist/tailwind.css` is generated with all required utility classes.
7. In the HTML, remove the `<script src="https://cdn.tailwindcss.com">` tag.
8. Add `<link rel="stylesheet" href="dist/tailwind.css">` before the custom `styles.css`.
9. Remove the inline `tailwind.config = {...}` block from any JS file.
10. Add `node_modules/` and `dist/` (optional) to `.gitignore`.

## Verification

- Page renders identically with the CLI build vs the previous CDN version.
- Browser console shows no Tailwind CDN warning.
- `npm run build` completes without errors; `dist/tailwind.css` contains all used utility classes.
- `grep -c '<some-class>' dist/tailwind.css` returns ≥ 1 for key classes.

## Session notes

Applied to `pit-stop`: migrated Play CDN → Tailwind v3 CLI. Config keys `spacing-margin-mobile`/`desktop` corrected (original config used `margin-mobile`/`desktop` which did not match HTML classes). Final CSS 18.6 KB minified.
