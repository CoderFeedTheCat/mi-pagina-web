---
name: lighthouse-p0
description: Apply Lighthouse P0 quick wins to static sites — meta description, image dimensions for CLS, lazy-load, tap-target sizing
license: UNLICENSED
compatibility: opencode
metadata:
  domain: performance
---

## When to use me

When a Lighthouse audit shows a Performance score below target and the flagged issues are all P0 quick wins (missing meta description, CLS from unsized images, small tap targets, no lazy-loading).

## Steps

1. Add `<meta name="description" content="...">` inside `<head>` if absent.
2. For every `<img>`: add explicit `width` and `height` attributes matching the rendered/intrinsic size to prevent CLS.
3. Add `loading="lazy"` to all images below the fold (hero images excluded).
4. Increase the size of interactive tap targets (e.g. carousel dots, small buttons) to at least 24×24 px.
5. Re-build any generated CSS (e.g. Tailwind) and refresh the page.

## Verification

- Re-run Lighthouse; confirm Performance score improvement and 0 CLS / tap-target warnings.
- Visually verify no layout shift on page load and correct image sizes.

## Session notes

Applied to `pit-stop`: meta description added, 14 images given `width`/`height` + `loading="lazy"`, carousel dots resized from `w-2.5 h-2.5` to `w-6 h-6` in `script.js:364`.
