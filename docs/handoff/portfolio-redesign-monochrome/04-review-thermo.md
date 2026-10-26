# 04 Thermo review — portfolio redesign (monochrome), branch feat/portfolio-redesign-monochrome

Scope: added/modified code in the coder's file list only (diff vs develop, plus working tree). Base develop exists.
Verdict: no blocking findings. Four warnings, all spec or cleanup gaps.

## Blocking
None found. Checked: JSX keys and i18n parity (EN/ES arrays have equal length for stats, skills rows, projects items, about highlights), GSAP tweens are scoped through useGsap/matchMedia and reverted on unmount, reduced-motion path skips tweens, external links use rel=noopener noreferrer, no secrets or new network calls, emoji and green palette removed from src/index.html/README.

## Warnings

1. src/components/Contact.jsx:28 — the "View my resume" button was removed. Brief section 7 and both artboards (Main.dc.html:290, Mobile.dc.html:201, Tokens.dc.html:92) require it. Fix: restore `<a className="btn-ghost" href="#">{t.contact.resume}</a>` after line 28 (the class already exists in src/styles/index.css:72) and keep the href until a PDF exists.

2. src/styles/index.css:8 — `--muted: #797979` does not match the spec token `#737373` (Tokens.dc.html:39 and brief "Identity"). The same stale value is documented in README.md:138. Fix: set `--muted: #737373` in both places (contrast still passes on black).

3. Dead code left behind (acceptance: dead code removed):
   - src/components/Icons.jsx:25 `FileIcon` export has no importer.
   - src/styles/index.css:65 and :72-73 `.btn-ghost` has no user after the Contact change (keep it only if fix 1 is applied).
   - src/data/translations.js:62 and :126 `contact.resume` keys are unused while the button is absent.
   Fix: delete `FileIcon`, or use it; resolve `.btn-ghost` and the resume keys together with fix 1.

4. src/components/Icons.jsx:39 — `fill="var(--accent)"` is set as an SVG presentation attribute. Support for var() in presentation attributes is not reliable across browsers, so the bolt may render without the accent in some engines. Fix: drop the fill attribute and add `.bolt path { fill: var(--accent); }` in src/components/Hero.css.

Optional (not counted): src/components/Navigation.jsx:8 omits `stats`, so the Home pill stays active while the user is in #stats. The mockup shows five pills, so this matches the artboard; leave it unless the mockup changes.

## Not verified
No browser run in this review. The 390 and 1440 layout checks and the EN/ES hero width are covered by 03-test.md round 3, not by this report.
