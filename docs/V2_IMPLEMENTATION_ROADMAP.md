# V2 — Implementation Roadmap

> Labels: VERIFIED · INFERRED · RECOMMENDATION · UNKNOWN · USER INPUT REQUIRED.
> Each phase ends with a commit (or PR into `v2`) and its verification commands passing. Phases 2–6 can overlap slightly, but **Phase 0 must complete first** and **content verification (Q1–Q6) must be answered before Phase 2 finishes**.
> Estimates assume one developer familiar with Next.js; they are rough.

| Phase | Name | Est. | Blocking inputs |
|---|---|---|---|
| 0 | Safety / baseline | 0.5 d | Q12 (remote) |
| 1 | Foundation | 1.5 d | Q10 (domain, for `metadataBase` — can use placeholder) |
| 2 | Core portfolio | 3 d | Q1–Q6, Q8, Q11, Q14 |
| 3 | macOS visual layer | 2 d | — |
| 4 | Responsive | 1.5 d | — |
| 5 | Accessibility + SEO | 1 d | Q10 |
| 6 | Performance | 1 d | Q9 (résumé re-export) |
| 7 | QA | 1.5 d | — |
| 8 | Deployment | 0.5 d | Q10, Q15 |

---

## Phase 0 — Safety / Baseline

- **Objective:** make V1 recoverable and measurable before touching anything.
- **Tasks:**
  1. Add `temp_impeccable/`, `.agents/`, `/test-results/`, `/playwright-report/` to `.gitignore`.
  2. `git add -A && git commit` (V1 as-is + analysis docs + `docs/`), `git tag v1-desktop`, `git branch v1-archive`.
  3. Create private remote and push (Q12).
  4. Record baseline: build output, `npm audit`, `npm ls --depth=0`, Lighthouse (mobile + desktop) JSON, screenshots at 375×812 and 1440×900 → `docs/baseline/`.
  5. `git switch -c v2`.
- **Files:** `.gitignore`, `docs/baseline/*`.
- **Dependencies:** none.
- **Acceptance:** `git log` shows ≥ 1 commit; tag exists; `git status` clean; `temp_impeccable` not tracked (`git ls-files temp_impeccable | wc -l` = 0); baseline files present.
- **Risks:** accidentally committing the 258 MB folder (check `git count-objects -vH` before pushing).
- **Verify:**
  ```bash
  git ls-files | grep -c temp_impeccable
  npm run build
  npm audit --omit=dev
  npx lighthouse http://localhost:3000 --preset=desktop --output=json --output-path=docs/baseline/lh-desktop.json
  ```

## Phase 1 — Foundation

- **Objective:** a clean, typed, App Router skeleton with tokens and the content model; V1 code removed from the branch.
- **Tasks:**
  1. Upgrade: `next@latest react@latest react-dom@latest`, replace `framer-motion` → `motion`, remove `clsx`, add `typescript`, update `@types/*`, `eslint` + `eslint-config-next` with flat config.
  2. Create `tsconfig.json` (strict, `@/*` alias); delete `jsconfig.json`.
  3. `next.config.ts`: remove `images.domains`; add `/resume` redirect; image formats.
  4. Delete `pages/`, all V1 components, hooks, `styles/globals.css` (all preserved in `v1-desktop`). Keep `public/` untouched.
  5. Create `app/layout.tsx`, `app/page.tsx` (placeholder sections with ids), `app/not-found.tsx`.
  6. `styles/tokens.css` (full token set from `V2_DESIGN_SYSTEM.md`), `styles/globals.css` (reset, base type, focus-visible, reduced-motion, reduced-transparency, `.visually-hidden`).
  7. Fonts with `next/font/google` (Syne 700/800, DM Sans 400/500/600).
  8. `lib/types.ts`, empty-but-typed `data/*.ts`, `lib/content.ts` selectors, `lib/validate.ts`.
  9. `data/navigation.ts` registry.
  10. Scripts: `lint`, `typecheck`, `check`.
- **Files:** `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `app/*`, `styles/*`, `lib/*`, `data/*`.
- **Dependencies:** Phase 0.
- **Acceptance:** `npm run check` passes; `/` renders section placeholders server-side; `npm audit --omit=dev` = 0 high/critical; no Tailwind class names anywhere (`grep -rE "className=\"[^\"]*(w-|h-|text-xs|fill-none|stroke-)" app components` = 0).
- **Risks:** Next major-version breaking changes (async `params`, Turbopack defaults, ESLint CLI change). Read the current upgrade guide before starting.
- **Verify:**
  ```bash
  npm run lint
  npm run typecheck
  npm run build
  npm audit --omit=dev
  ```

## Phase 2 — Core Portfolio (content + structure, minimal styling)

- **Objective:** every section and route works with real, verified content, styled with tokens but without the macOS layer.
- **Tasks:**
  1. Fill `data/profile|social|experience|education|certifications|skills|projects.ts` from verified answers (`V2_CONTENT_SPEC.md §8` resolved).
  2. Components: `SiteHeader` (plain), `MobileMenu`, `SiteFooter`, `Section`, `Container`, `SkipLink`, `Hero`, `ProjectCard`, `ProjectGrid`, `Timeline`, `EducationList`, `CertificationList`, `SkillGroups`, `ContactPanel`, `CopyEmailButton`, `ResumeButton`, `Button`, `Tag`, `StatusPill`, `Icon`.
  3. Routes: `/` (all sections), `/projects` (+ `?tag=` filter), `/projects/[slug]` (`generateStaticParams`, prev/next), 404.
  4. Images: move project screenshots to `assets/projects/`, use `next/image` static imports; create `fitmart` 16:10 crop.
- **Files:** `components/**`, `data/**`, `app/**`, `assets/projects/*`.
- **Dependencies:** Phase 1; owner answers Q1–Q6, Q8, Q11, Q14.
- **Acceptance:** all 7 project pages build statically; no portfolio string literals in components (spot-check); `validate.ts` passes; site fully usable with **JavaScript disabled** except Copy button and mobile menu (menu falls back to an anchor list or `<details>`).
- **Risks:** content not ready → use `TODO: USER INPUT REQUIRED` values; `validate.ts` blocks production build on `TODO:` so it can't ship accidentally.
- **Verify:**
  ```bash
  npm run check
  npx next start & npx playwright test tests/smoke.spec.ts
  ```

## Phase 3 — macOS Visual Layer

- **Objective:** apply the macOS-inspired identity without changing behaviour.
- **Tasks:** `Wallpaper`; glass tokens on header/panels; `WindowFrame` + `TrafficLights` on project cards, About This Developer, Contact, 404; menu-bar styling + `LocalClock`; `Dock` (desktop, `pointer:fine`, appears after hero) with `motion` magnification; `Reveal` entrance animations; hover/press micro-interactions; optional View Transitions for card → project.
- **Files:** `components/layout/Wallpaper*`, `components/ui/WindowFrame*`, `components/navigation/Dock*`, `components/system/LocalClock*`, `components/motion/Reveal*`, CSS Modules.
- **Dependencies:** Phase 2.
- **Acceptance:** visual review vs `V2_DESIGN_SYSTEM.md`; reduced-motion and reduced-transparency modes verified; client components ≤ 6 (`grep -rl "'use client'" components | wc -l`); no infinite animations; dock links work with keyboard and without hover.
- **Risks:** glass contrast on bright glows; dock overlapping content; blur cost.
- **Verify:**
  ```bash
  npm run build
  grep -rl "'use client'" components app | wc -l
  npx playwright test tests/a11y.spec.ts
  ```

## Phase 4 — Responsive

- **Objective:** behaviour per `V2_RESPONSIVE_SPEC.md §5` at every listed width.
- **Tasks:** mobile-first CSS pass on every component; compact header + sheet menu; grid changes at 768/1024/1280/1536; height rules; landscape phone; `overflow-wrap` on long strings; capability queries for hover/dock.
- **Files:** all CSS Modules, `SiteHeader`, `MobileMenu`, `Dock`.
- **Dependencies:** Phase 3.
- **Acceptance:** no horizontal overflow at 320/375/390/430/768/1024/1280/1440/1920 (automated); all targets ≥ 44 px on mobile (automated sample); screenshot review of every route at each width.
- **Risks:** iOS Safari `dvh`/toolbar quirks; sticky header + anchor offsets.
- **Verify:**
  ```bash
  npx playwright test tests/responsive.spec.ts --update-snapshots   # first run, review images
  npx playwright test tests/responsive.spec.ts
  ```

## Phase 5 — Accessibility + SEO

- **Objective:** WCAG 2.2 AA and the SEO spec.
- **Tasks:** landmarks, heading audit, focus-visible everywhere, skip link, menu focus trap + Esc + inert, external-link labels, alt text from data, live region for copy; `metadata`/`generateMetadata`, `metadataBase`, canonical, OG/Twitter, `opengraph-image.png` + per-project images, `robots.ts`, `sitemap.ts`, Person + CreativeWork JSON-LD; manifest tweak; favicon dedupe.
- **Files:** `app/layout.tsx`, `app/**/page.tsx`, `lib/seo.ts`, `app/robots.ts`, `app/sitemap.ts`, OG images.
- **Dependencies:** Phase 4; Q10 (domain).
- **Acceptance:** axe: 0 serious/critical on all routes; manual keyboard walkthrough checklist (Phase 7) passes; Lighthouse SEO 100; `curl -s localhost:3000 | grep -c "<h1"` = 1; JSON-LD validates in Google Rich Results Test.
- **Risks:** placeholder domain left in canonical → `validate.ts` checks `site.url` is not a placeholder in production.
- **Verify:**
  ```bash
  npx playwright test tests/a11y.spec.ts
  curl -s http://localhost:3000/sitemap.xml
  curl -s http://localhost:3000/robots.txt
  ```

## Phase 6 — Performance

- **Objective:** meet budgets in `V2_ACCESSIBILITY_SEO_SPEC.md §C2`.
- **Tasks:** image optimisation (source re-save, `sizes`, `priority` audit); remove unreferenced `public/images` files; font weight audit; client-component audit; dock code-split check; clock timer behaviour; résumé re-export (owner, Q9); bundle review.
- **Files:** `assets/**`, `public/**`, `components/**`.
- **Dependencies:** Phase 5.
- **Acceptance:** first-load JS `/` ≤ 120 kB (from `next build` output); Lighthouse mobile Perf ≥ 90, CLS < 0.05, LCP < 2.5 s on 3 runs (median); no requests to third-party origins on load (DevTools Network check; fonts are self-hosted by `next/font`).
- **Risks:** `next/image` + static export conflict (decided by Q10); Next build output format changes (use Lighthouse treemap if size column is absent).
- **Verify:**
  ```bash
  npm run build
  npx lighthouse http://localhost:3000 --form-factor=mobile --output=html --output-path=./lh-mobile.html
  npx lighthouse http://localhost:3000/projects/officeflow --form-factor=mobile --output=json --output-path=./lh-project.json
  ```

## Phase 7 — QA

- **Objective:** systematic verification before launch.
- **Functional:** every nav item (header, mobile menu, dock, footer) reaches its target; every project card → correct page; prev/next; `/projects?tag=` filters; `/resume` opens PDF; Copy email works and announces; every external link (GitHub, LinkedIn, Behance, each live demo and repo) returns 2xx/3xx (scripted link check); 404 for unknown slug and unknown path.
- **Responsive:** 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560 — overflow test + screenshot review; landscape phone 844×390; 200 % zoom on desktop.
- **Accessibility:** keyboard-only pass (checklist: skip link, header, menu open/close/Esc/focus return, every card, dock, footer); VoiceOver (macOS Safari + iOS) and NVDA (Windows Firefox/Chrome) basics — landmarks list, headings list, links list make sense; reduced motion; reduced transparency; forced-colors (Windows High Contrast) — focus and borders visible; contrast spot-checks with DevTools.
- **Performance:** Lighthouse mobile/desktop for `/`, `/projects`, one project page; image weights; JS size; no console errors/warnings; no hydration warnings (clock!).
- **Browsers (minimum):** Chrome, Firefox, Safari (macOS + iOS), Edge — latest stable each; Samsung Internet spot check. Specifically test `backdrop-filter` (Firefox supports it since v103 — verify fallback still looks right), `<dialog>`, View Transitions (Chrome/Safari only — must degrade silently), `:focus-visible`.
- **Content:** proofread; every item in `CONTENT_VERIFICATION_REQUIRED` marked resolved; no `TODO:` strings (`grep -r "TODO:" data` = 0).
- **Files:** `tests/*.spec.ts`, `playwright.config.ts`, `docs/QA_CHECKLIST.md` (created then).
- **Acceptance:** all checks pass or have an accepted, documented exception.
- **Verify:**
  ```bash
  npm run check
  npx playwright test
  grep -r "TODO:" data
  ```

## Phase 8 — Deployment

- **Objective:** ship V2 to production safely.
- **Tasks:** confirm host and domain (Q10); preview deploy of `v2`; review on real devices; set production domain in `data/site.ts`; merge `v2` into the production branch (only `master` exists today, with no commits; choose `main` or `master` as the production branch in Phase 0 and keep it); production deploy; submit sitemap in Google Search Console (owner); update LinkedIn/GitHub profile links to the site; rewrite `README.md`; optionally update `BRAIN.md`/`PROJECT_MAP.md` to describe V2.
- **Dependencies:** Phase 7.
- **Acceptance:** production URL serves V2; `/resume`, `/sitemap.xml`, `/robots.txt` OK; OG preview correct (LinkedIn Post Inspector, opengraph.xyz); rollback path tested (previous deployment promotable).
- **Risks:** DNS/caching; old shared links to the root are fine (single route before).
- **Verify:**
  ```bash
  curl -sI https://<domain>/resume
  curl -s https://<domain>/sitemap.xml | head
  npx lighthouse https://<domain> --form-factor=mobile --output=html --output-path=./lh-prod.html
  ```

---

## Post-launch backlog (not v2.0)

Case-study depth per project (owner writing) · Playground page for "Bin of Ideas" (Q16) · light theme · HTML résumé page · design/Behance strip (Q7) · ⌘K command palette · analytics dashboard review (if Q15).
