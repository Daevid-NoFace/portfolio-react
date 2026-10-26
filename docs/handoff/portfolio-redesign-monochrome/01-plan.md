# Plan — Portfolio redesign (monochrome) — FINAL (reconciled Claude + Codex)

Repo: /Users/david-nhclima/Documents/dev/portfolio-react — branch `feat/portfolio-redesign-monochrome`, base `develop`.
Brief: docs/handoff/portfolio-redesign-monochrome/00-brief.md
Artboards: `docs/handoff/portfolio-redesign-monochrome/mockup/{Main,Mobile,Tokens}.dc.html`.
Housekeeping: `docs/` is untracked in git. Do not delete or "clean" it.

NOTE: The full plan text (sections 1-11: Goal, Scope + assumptions 1-18, UX decisions, Files to touch,
Translations EN/ES, Conventions, Edge cases 1-17, Acceptance criteria 1-7, Divergences, Open questions = None,
Task list 1-23) was supplied by the workflow as the task prompt and implemented as written; the
strings and file specs live in the implementation (src/data/translations.js, content.js, components).
Key decisions:

- Muted token `#797979` (not `#737373`) for >= 4.5:1 contrast.
- No orange on hover; accent only on bolt, badge dots, section-tag, stats accent phrase, about highlight indices.
- Single breakpoint `max-width: 768px`; section ids home/stats/stack/work/about/contact.
- Sticky nav, IntersectionObserver active pill, `useGsap` hook with `gsap.matchMedia` reduced-motion gate.
- Delete MatrixRain/Terminal; favicon white `</>` on black; fonts Inter Tight + JetBrains Mono.
- Open questions: None.
