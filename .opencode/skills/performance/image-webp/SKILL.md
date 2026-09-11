---
name: image-webp
description: Convert raster images to WebP, preserve originals, and add width/height + loading=lazy for performance
license: UNLICENSED
compatibility: opencode
metadata:
  domain: performance
---

## When to use me

When a Lighthouse audit flags "serve images in next-gen formats" and the project contains PNG/JPG assets that should be converted to WebP.

## Steps

1. List all `<img src="*.png|jpg">` references in the HTML.
2. For each image, convert to WebP using `cwebp` (or any converter): `cwebp -q 80 input.png -o output.webp`.
3. Preserve the original PNG/JPG file (do not delete) for reversibility.
4. Update the `src` attribute in the HTML to point to the `.webp` file.
5. Ensure the `<img>` tag has explicit `width` and `height` attributes.
6. Add `loading="lazy"` if the image is below the fold.
7. Update any CSS or `<picture>` sources if applicable.

## Verification

- Confirm file size reduction (target: 80–98 %).
- Re-run Lighthouse; "serve images in next-gen formats" warning should disappear.
- Visually inspect that all images render correctly at intended dimensions.

## Session notes

Applied to `pit-stop/img/` and `pit-stop/img/hero_carr/` — 14 images converted (hero alone 1297 KB → 86 KB). Original PNGs kept alongside WebP files.
