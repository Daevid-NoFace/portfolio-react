# Brief — Portfolio redesign (monochrome)

Mockup canvas: https://claude.ai/artifact/AgE9pZmHEZQm1D73h7RDgK
Source of the three artboards (same markup, read these for exact sizes, spacing, copy and structure):
- `mockup/Main.dc.html` — Home desktop (1440 wide, fluid page)
- `mockup/Mobile.dc.html` — Home mobile (390 wide)
- `mockup/Tokens.dc.html` — Style tile (colors, type scale, components)

The `.dc.html` files are a mockup format: ignore `<x-dc>`, `<helmet>`, the `data-dc-script` block and the
`{{accent}}` holes (accent = `#f97316`). Everything inside is plain HTML + inline CSS that describes the target.
The image `/_blob/...` in About is `public/david.webp`.

## Decisions (resolved with the user, 2026-10-26)

**Identity**: pure monochrome. Background `#000`, surface `#0a0a0a`, border `#1f1f1f`, muted `#797979` (not
`#737373`: that one is 4.43:1 on black and fails 4.5:1),
secondary text `#a3a3a3`, text `#fff`. ONE accent `#f97316` (orange), used only for: the lightning bolt glyph in the
headline, the dot in badges, section index labels ("01 — Stack"), one highlighted phrase in the stats headline,
highlight indices in About. Never as background, gradient or border.

**Remove entirely**: `MatrixRain` component + CSS, `.bg-grid`, `.bg-glow*`, the green palette variables, the
`Terminal` component (hero is typography only), emoji icons in skills/projects/footer, Outfit font.

**Fonts**: Inter Tight (500, 600, 700, 800, 900) for everything, JetBrains Mono (400, 500, 600) for micro-labels,
tags, clock, footer. Swap the Google Fonts link in `index.html`.

**Sections, in order** (keep the i18n EN/ES via `LanguageContext` + `translations.js`; add ES copy for all new strings):
1. Nav: live clock (HH:MM:SS, `setInterval` 1s) left, pill links center (active pill white bg), language switch +
   GitHub icon right. On mobile: clock + EN pill + menu button; pill links collapse into a simple dropdown/overlay.
2. Hero: vertical "AVAILABLE FOR OPPORTUNITIES" tab on the left edge (desktop only; mobile shows a pill badge instead),
   three-line headline `FULL STACK / SOFT⚡WARE / ENGINEER`, weight 900, `clamp(64px, 11vw, 164px)`, line-height
   0.86, letter-spacing -0.045em, uppercase; the bolt is an inline SVG filled with the accent, not an emoji. Mobile
   breaks it as `FULL / STACK / SOFT⚡WARE / ENGINEER` at 60px. Two mono microtexts beside it (desktop) / below it
   (mobile). Bottom row: GitHub handle, "Famalicão, PT — 2026", round white arrow button to `#stats`.
3. Stats: pill badge "PROFESSIONAL STATISTICS", headline "Java that scales. Fronts that ship. Tools that think.
   One engineer *behind the work.*" (last phrase in accent), 4 stat cells in one bordered row (2x2 on mobile):
   3+ Years experience · 20+ Projects shipped · 4 Stacks in production · PT Based in. Count-up on enter.
4. Skills ("01 — Stack", "WHAT I WORK WITH"): 4 rows separated by hairlines, each `index | title + description | tags`
   (stack vertically on mobile). Rows and tags exactly as in the mockup: Backend & data, Frontend, AI tooling,
   DevOps & tools. Tags are outlined mono pills.
5. Projects ("02 — Selected work", "THINGS I SHIPPED"): 2-column grid (1 on mobile) of cards with no image:
   mono index/category, round arrow button, title, description, tags, Code/Demo links. Hover: border `#fff`,
   arrow translates 4px. Keep the four existing projects from `content.js` / `translations.js` (links stay `#`).
6. About ("03 — About"): 5/7 grid, photo `david.webp` grayscale with a "Havana → Famalicão" pill overlay; heading
   "From tour guide to *software* engineer." (the grey word is `#737373`), two paragraphs, 4 numbered highlights
   in a 2-col list with hairlines. Reuse the existing About copy, shortened as in the mockup.
7. CTA (`#contact`): "Let's build something *solid* together.", paragraph, one pill button: "Hire me" (white,
   mailto), email in mono underneath. ("View my resume" dropped 2026-10-26 until a CV PDF exists in `public/`;
   when it does, add it as an outlined pill after "Hire me" with a real href + `download`.)
8. Footer: hairline, "© 2026 Daiv.code" (year from `Date`), "Designed and built with React & GSAP", GitHub /
   LinkedIn / Email links. No emoji heart.

**Motion** (GSAP + ScrollTrigger already installed; keep `gsap.context` + `ctx.revert()` pattern):
- Hero headline: line-by-line reveal (clip-path or y + opacity, stagger 0.12s), microtexts fade after.
- Stats: numbers count up once when entering viewport.
- Skills rows / project cards: fade-up, stagger 0.1s, trigger `top 80%`.
- About: photo from x -40, text from x +40.
- CTA: headline words fade-up staggered.
- `prefers-reduced-motion: reduce` → no animation, everything visible (gsap.matchMedia or a check before creating tweens).
- No preloader, no custom cursor, no marquee, no quote block.

**Accessibility**: real `<a>` / `<button>`, `aria-label` on icon-only buttons, SVG `aria-hidden`, text contrast
≥ 4.5:1 (the token values above already pass on black). Touch targets ≥ 44px on mobile.

**Out of scope**: new project content, resume PDF, LinkedIn URL (stays as in `content.js`), ES translation quality
review beyond a faithful translation of the new strings, routing, analytics.

**Acceptance**: `npm run build` green, no console errors in dev, every section matches the corresponding mockup
artboard at 1440 and 390 wide, EN/ES switch still works for all strings, Matrix/Terminal/green code deleted (not
just unused).
