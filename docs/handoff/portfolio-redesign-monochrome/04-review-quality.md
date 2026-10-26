# 04 Review (thermo-nuclear quality) — portfolio redesign (monochrome)

Scope: working-tree contents of the files the coder touched (30 files, 4 deleted). Diff base: develop. Tests and browser checks are out of scope here (tester's job). README.md was not reviewed as code.

Structure is sound overall: components stay under ~100 lines, each section owns its CSS, `useGsap` centralises the reduced-motion gate and revert, no file nears the 1k-line rule. The problems are i18n leaks, dead code left behind, and index-coupled data.

## Blocking

1. `src/components/Footer.jsx:13-15` — "GitHub", "LinkedIn" and "Email" are hard-coded English, so the ES footer shows "Email" in English. This breaks the brief's acceptance criterion that EN/ES works for all strings. Fix: add `footer.email` (and `footer.github` / `footer.linkedin` if wanted) to both EN and ES in `translations.js` and read them via `t.footer`.

## Warning

2. Dead code left behind, against the brief's "dead code removed" acceptance:
   - `src/components/Icons.jsx:25-27` `FileIcon` is exported and unused (the resume button was removed in round 3).
   - `src/styles/index.css:65,72-73` `.btn-ghost` has no users.
   - `src/data/translations.js:62` and `:126` `contact.resume` keys (EN and ES) have no users.
   - `src/components/Hero.css:51-52` `.hero-foot` is declared twice in the mobile block.
   Fix: delete all four.

3. `src/components/Contact.jsx:28` renders one button, but the brief and mockup specify two pill buttons ("Hire me" plus "View my resume"). The deviation is documented in the coder report, but the spec and the code now disagree. Fix: either restore the button with `href="#"` as the brief says, or update the brief. Do not leave a silent mismatch.

4. Index-coupled parallel arrays across three files: `src/components/Skills.jsx:25-30` (`skillsData[i]` with `t.skills.rows[i]`), `src/components/Projects.jsx:28-29` (`projectsData[i]` with `t.projects.items[i]`), `src/components/Stats.jsx:22-25` (`stats[i]` with `t.stats.items[i]`), and `src/components/About.jsx:26` (highlights keyed by string). Reordering one array silently mismatches the copy. Fix: give each item an `id` in `content.js` and key the translation entries by that id, or move the static fields into the translation entries.

5. `src/data/content.js:25` `{ value: 'PT' }` puts a display string in the data layer, and the Stats component special-cases non-numbers (`Stats.jsx:29-31`). Fix: derive the 4th stat from `location` or move its value into translations, and keep `content.js` numeric only.

6. Section IDs are hard-coded in two places: `src/components/Navigation.jsx:8` (`ids`) and the `<section id>` tags in each component. `stats` is missing from the nav list, so the active-pill observer never reflects it. Fix: export one `sections` constant from `content.js` and derive both the nav list and the observer from it.

7. Cascade-order coupling: `src/components/Navigation.css:2-3` overrides `.wrap` (`max-width: none`, `padding`) from `src/styles/index.css`. This works only because `src/main.jsx:3` now imports `index.css` before `App`, which the coder changed for this reason. Fix: scope the override as `.nav.wrap` so it no longer depends on import order, or drop `.wrap` from the nav element.

8. `src/components/Icons.jsx:37-41` `BoltIcon` depends on a `.bolt` class defined in `src/components/Hero.css:24`, and it ignores the `size` prop that every other icon accepts. Fix: give `BoltIcon` its own size/style props, or move the `.bolt` rule into the icon (or the Hero, if it is only used there).

## Notes (no action required)

- Shared primitives `.wrap`, `.tag`, `.badge`, `.icon-btn`, `.hit44` in `index.css` are used across components and kept out of component CSS. That is the right split.
- The `useGsap` hook (`src/hooks/useAnimations.js`) gives every section one reduced-motion gate and one revert path. Keep it as the only place that creates `matchMedia` scopes.
