---
name: w3c-html-fixer
description: Fix W3C HTML errors in static sites — missing doctype/lang/title, trailing slashes on void elements, heading hierarchy, role issues
license: UNLICENSED
compatibility: opencode
metadata:
  domain: validation
---

## When to use me

When validating a static HTML site against the W3C validator and errors or warnings appear related to document structure, void elements, heading hierarchy, or interactive element roles.

## Steps

1. Add `<!DOCTYPE html>` if missing at line 1 of the HTML file.
2. Set `lang="es"` (or target language) on the `<html>` tag if `lang` is missing or incorrect.
3. Add a `<title>` inside `<head>` if absent.
4. Remove trailing slashes (`/>`) from void elements: `<img />`, `<link />`, `<meta />`, `<br />`.
5. Inside `role="button"` divs, replace `<h3>` with `<p>` (block headings cannot be nested inside interactive roles).
6. Replace `<section role="button">` with `<div role="button">` to avoid invalid nesting of interactive roles inside landmark/sectioning elements.
7. Add a visible `<h2>` heading to sections that lack one (e.g. `#servicios`).
8. Ensure heading text color contrasts with its background (e.g. `text-on-surface` on a light bg → `text-surface`).

## Verification

- Re-run the W3C HTML validator; expect 0 errors and 0 structural warnings.
- Visually confirm no layout regressions.

## Session notes

Applied to `pit-stop/code.html` across commits `9a372d5` and `785a109`. Changes affected the carousel cards, service bands, and footer structure.
