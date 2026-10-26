# 03 Tester report — portfolio redesign (monochrome), round 4

## Verdict
RETURN_TO_CODER

## Bugs
1. [medium] CTA "View my resume" button removed from the Contact section. Mockup `mockup/Main.dc.html` line ~290 contains it, and the brief (00-brief.md, section 7) requires two pill buttons: "Hire me" (white, mailto) and "View my resume" (outlined, href `#` until a PDF exists). Coder round 3 removed it on its own initiative, so the Contact section no longer matches the mockup artboard (acceptance: "every section matches the mockup"). Repro: load /portfolio-react/ at 1440, scroll to #contact; only one pill is present. Confirmed: no anchor text matching /resume/i in the DOM (EN and ES).

## Warnings
- Mobile hero (390): the micro text "HI, I'M DAVID..." sits about 8px above the headline "FULL" and is visually cramped. Not overlapping. Its lines are also offset to the right rather than left-aligned, which differs from the mockup's left alignment.
- Mobile hero bottom row: "GITHUB.COM/DAEVID-NOFACE" and "FAMALICÃO, PT — 2026" wrap to two lines each. Acceptable, but not identical to the mockup.
- Desktop 1440: vertical "AVAILABLE FOR OPPORTUNITIES" tab shows a small border-corner artifact at its bottom-right. Cosmetic.
- Nav active pill: `ids` in Navigation.jsx line 8 omits `stats`, so the Home pill stays active while the user is in the stats section. Not in acceptance criteria.
- Hero `sr-only` duplicate: "Software" is read via the sr-only span and the visible word is aria-hidden. Correct for screen readers, but innerText shows SOFTWARE twice.
- Anti-slop lint: `tools/oxlint/anti-slop` does not exist, so it was skipped. No .ts files were touched (project is JSX), so there was no explicit file list to lint.
- Pixel-level comparison against the mockup artboards was not done in full. Only the hero (1440 and 390), the mobile menu state and the stats count-up were checked visually or by measurement.
- Language key: the app persists language in localStorage under `portfolio-lang`. The first harness run used the wrong key and reported ES for the EN reduced-motion runs; this was re-run with the correct key (see evidence).

## Acceptance evidence
- `npm run build`: PASS (43 modules transformed, built in 80ms, exit 0).
- Round-3 fixes verified in source: `src/components/Hero.css:47` is `clamp(48px, 15vw, 58px)`; `src/components/About.css:1` has `overflow-x: clip`; `rg "resume" src/components/Contact.jsx` finds nothing (see Bug 1).
- Browser: Google Chrome headless via puppeteer-core (scratchpad at /private/tmp/claude-501/pt, not in the repo), served with `vite preview` on port 4179. Runs: /private/tmp/claude-501/tester-run/check.mjs and rm.mjs.
  - 390 EN: scrollWidth 390, clientWidth 390 (also 390 after scrolling through the whole page). "SOFT⚡WARE" visible line right edge 364px, container right 370px. OK.
  - 390 ES: scrollWidth 390 (also after scroll). "INGENIERO" right edge 370px. OK. Language switch to ES applied (`lang="es"`, hero "Ingeniero").
  - 1440 EN and ES: scrollWidth 1440, hero title right 1190px. Fonts loaded: Inter Tight 500/600/700/800/900 and JetBrains Mono 400/500.
  - Console errors and page errors on load and after scroll: none (all runs).
  - Sections present in order: home, stats, stack, work, about, contact. Footer present.
  - Emoji in body innerText: 0. README emoji count: 0.
  - Accent `#f97316` is defined once in src (CSS variable) and used via var; muted `#797979` set in src/styles/index.css:8.
  - Deleted code: rg for matrix|terminal|outfit|bg-grid|bg-glow|preloader|marquee|custom-cursor in src and index.html returns nothing. MatrixRain and Terminal files are absent.
  - Stats count-up (motion on): dd values go 0+ | 0+ | 0 -> 1+ | 3+ -> final 3+ | 20+ | 4 | PT. Reduced motion (EN, 390 and 1440): final values shown immediately, hero opacity 1, scrollWidth unchanged.
  - Reduced motion in project cards: opacity 1 with no scroll.
- Screenshots: /private/tmp/claude-501/tester-run/en-390-top.png, /private/tmp/claude-501/tester-run/en-1440-top.png (earlier round screenshots in /private/tmp/claude-501/shots/).

## Conclusion
RETURN_TO_CODER. Build and behavior checks pass. The only blocking item is the missing CTA button that the mockup and brief require.

## Fixes
1. src/components/Contact.jsx: restore the second CTA pill "View my resume" (outlined style, same class pattern as the mockup, href="#", text from `t.contact.resume`, which already exists in src/data/translations.js lines 62 and 126). Keep it after "Hire me" as in mockup Main.dc.html ~line 286-290. If you believe the brief should change, say so in 02-coder.md and the Tester will escalate to the user instead of removing it again.
2. Rerun `npm run build` and confirm exit 0.
3. Re-verify the Contact section in the browser at 1440 and 390 (two pills present, no console errors). Report the result in 02-coder.md.
