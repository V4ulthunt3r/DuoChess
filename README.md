# Duo-Chess — landing page

Static landing page for **Duo-Chess**, the iOS travel chess set built for iPhone Duo: lift the
clasp, unfold the phone, and the board spans both halves of the inner display. Regular iPhones
and iPads get a virtual lid and have their own section.

English is the default; German lives alongside it.

| Page | English | German |
| --- | --- | --- |
| Landing | `index.html` | `index-de.html` |
| Support | `support.html` | `support-de.html` |
| Privacy policy | `privacy.html` | `privacy-de.html` |
| Legal notice | `impressum.html` | `impressum-de.html` |

## Structure

```
assets/landing.css        all styles; light (ivory/maple) + dark (walnut), tokens on :root / .dark
assets/site.js            theme toggle, nav edge, scroll reveal, finish switcher, iPhone lid demo
assets/icons.svg          icon sprite, referenced as assets/icons.svg#i-…
assets/frame-duo-inner.svg  iPhone Duo frame (ShotForge), inner display 2853×2007 at 75,75
assets/icon-*.png         generated from AppIcon.appiconset in the Xcode project
assets/img/duo-*.jpg      inner-display screenshots from the iPhone Duo simulator (iOS 27.1)
assets/img/phone-*.jpg    iPhone 17 Pro simulator: closed case, open board, mode sheet
assets/pieces/*.webp      240 px copies of the rendered chessmen from Assets.xcassets
```

Hand-written static HTML — no build step, no dependencies, no cookies, no tracking.

The finish switcher loads each board screenshot on first click. The iPhone demo stacks the
closed case over the open board; the clasp hotspot (`.clasp-hit`) sits over the latch in
`phone-case.jpg` and the lid turns around its left edge, like the 760 ms lid in the app.

`assets/img/duo-game.mp4` is a 31-second recording of the Duo simulator's inner display: a UI
test plays Scholar's mate on Classic Walnut with smooth piece moves, ending on the result podium.
The tabletop visual tilts the two halves of `Design/Tabletop/tabletop-vikings.png` in CSS
(`.tt`); `desks.jpg` is the app's four-desk overview.

Pricing follows `MONETARISIERUNG.md` in the app repository (decision of 6 November 2026):
free two-player play, Duo-Chess Pro at US$ 9.99, ten collections at US$ 1.99 and three bundles.
Paid offers are marked “planned for launch” until purchases ship. Crystal Ice, Obsidian Gold and Pure Glass are Pro finishes;
the page doesn't name the free base finishes yet. Collector sets
appear as piece line-ups because locked themes can't be shown in the simulator.

## Before launch

- Replace the “Coming soon to the App Store” badges (`.store-badge`, two per landing page)
  with the real App Store link.
- Once a domain is set: add `CNAME`, absolute `canonical`/`hreflang` URLs, an absolute
  `og:image`, plus `robots.txt` and `sitemap.xml`.
- The closed-case screenshot still shows the old lid inscription “Foldable Chess”
  (`BoxCover.swift`). Re-take `assets/img/phone-case.jpg` once it reads Duo-Chess.

## Local preview

```bash
python3 -m http.server 4176
```
