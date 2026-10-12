# V2 — Migration Plan

> Labels: VERIFIED · INFERRED · RECOMMENDATION · UNKNOWN · USER INPUT REQUIRED.
> Principle: **controlled rebuild, not an uncontrolled rewrite.** V1 is frozen in git first; V2 is built on a branch in the same repository; content and visual identity are migrated deliberately; nothing is deleted until it exists in a tagged commit.

## 1. Safety baseline (before any change)

| Step | Why | Detail |
|---|---|---|
| Add ignores | `temp_impeccable/` is 258 MB (VERIFIED) and must not enter git | `.gitignore` += `temp_impeccable/`, `.agents/`; decide whether `.impeccable/` (AI critique, 1 file) is committed — RECOMMENDATION: commit it under `docs/archive/` later, it's small and useful history |
| First commit of V1 as-is | Repo has **0 commits** (VERIFIED) — there is currently no way to roll back | Commit everything else exactly as it is, including the analysis docs and `docs/` |
| Tag | Permanent reference | `git tag v1-desktop` |
| Archive branch | Easy checkout of V1 | `git branch v1-archive` |
| Remote | Off-machine backup | Push to a private GitHub repo — **USER INPUT REQUIRED** (Q12) |
| Baseline evidence | Regression reference | `npm run build` output (route sizes), `npm audit --omit=dev --json`, `npm ls --depth=0`, screenshots at 375 and 1440 of every V1 window, Lighthouse JSON — stored in `docs/baseline/` |
| Work branch | Isolate V2 | `git switch -c v2` |

## 2. PRESERVE (carry forward, possibly restyled)

| Item | Source | How it survives in V2 |
|---|---|---|
| Visual identity: dark base, lime `#C8F04E`, Syne + DM Sans, "AS." mark | `globals.css :root`, `IntroLoader.jsx`, favicons | Tokens in `styles/tokens.css`; mark in header |
| Favicon set + manifest | `public/` (generated 2026-10-03) | Reused as-is; manifest `display` tweak |
| Glass window look (translucent fill, inset top hairline, 14 px radius, deep shadow) | `.os-window` CSS | `WindowFrame` / `GlassPanel` |
| Traffic-light colours and glyph SVGs (×, −, ⤢) | `Window.jsx` L87–113 | `TrafficLights` (decorative only, glyphs on hover optional) |
| Dock magnification math | `Dock.jsx` L115–124 (`useTransform(distance,[-120,0,120],[60,90,60])` + spring) | `Dock` with smaller range (48→64) |
| Brand/app icon SVGs (GitHub, LinkedIn; gradient style) | `AppIcons.jsx` | Dock icons, with unique gradient IDs |
| Project data (7 projects, images, links) | `data/projects.js`, `public/images/*` | `data/projects.ts` (schema migration in `V2_CONTENT_SPEC.md §3.3`) |
| Experience, education, certifications, skills, interests | `AboutApp.jsx` | `data/*.ts` — **after** verification (`V2_CONTENT_SPEC.md §8`) |
| Socials + email | `ContactApp.jsx` | `data/social.ts` (fixes Dock LinkedIn bug by single source) |
| Résumé file path `/Anubhav_Sethi_Resume.pdf` | `public/` | Kept + `/resume` redirect |
| Local-time idea | `LocalClock` | Menu-bar clock (fixed) |
| Compiler Error joke | `ErrorApp.jsx` | 404 page |
| Timeline visual (dot + line) | `.timeline-*` CSS | `Timeline` |
| `project-placeholder.svg` | `public/images/` (currently unused) | Local image fallback, replacing the Unsplash hotlink |

## 3. REFACTOR

| Item | From | To |
|---|---|---|
| Hardcoded content in components | `AboutApp.jsx`, `ContactApp.jsx`, `Dock.jsx` | Typed `data/` files |
| App/nav registry | Desktop if/else + `appStack` literal + Dock `apps[]` | `data/navigation.ts` |
| Inline styles + JS hover handlers | `AboutApp.jsx` (buttons, labels) | `Button`, `ButtonLink`, eyebrow style in CSS Modules |
| Global 1,340-line stylesheet | `styles/globals.css` | `tokens.css` + small `globals.css` + per-component CSS Modules |
| Font loading | CSS `@import` + `<link>` (double) | `next/font` |
| Image handling | `<img>` + Unsplash fallback | `next/image` + local placeholder |
| Clock | Tailwind classes, per-second, "Kolkata" label | Plain CSS, per-minute, "IST" label |
| Project detail | client-state view inside a window | `/projects/[slug]` static page |
| Metadata | `pages/index.js` `<Head>` + `_document.js` | App Router `metadata` / `generateMetadata` |

## 4. REPLACE

| V1 | Replaced by | Reason |
|---|---|---|
| `Desktop.jsx` window manager | Home page sections | Content must not be gated behind OS interactions |
| `Window.jsx` (drag, minimise, maximise, mobile sizing) | `WindowFrame` (visual only) | Same look, no behaviour |
| Desktop shortcut icons (draggable) | Hero CTAs + header nav | Discoverability, keyboard access |
| Dock as primary nav (with joke/trash apps) | Header nav + dock of quick *links* | Dock no longer gates content |
| `ContactApp` mailto form | Contact panel (email link + copy + socials) | Fewer steps, no false "success" state |
| AboutApp résumé iframe | Résumé button → PDF in new tab | Better on mobile; no duplication |
| `IntroLoader` splash | Hero entrance animation | Removes ~2 s delay |
| Blurred `profile.jpg` wallpaper | CSS gradient wallpaper | Zero bytes; profile photo can be shown properly in About (Q8) |
| Pages Router | App Router | `V2_DECISIONS.md` D5/D10 |
| `framer-motion` | `motion` | Successor package |

## 5. REMOVE (only after the `v1-desktop` tag exists)

| Item | Evidence it is unused / obsolete |
|---|---|
| Legacy scrolling site: `Navbar`, `Hero`, `About`, `Experience`, `Skills`, `Projects`, `ProjectCard`, `Contact`, `Footer` (+9 `.module.css`) | Never imported (VERIFIED by grep in earlier analysis; re-confirmed no imports from `pages/` or `Desktop.jsx`) |
| `hooks/useInView.js`, `hooks/useScrollProgress.js` | Used only by dead components / nothing |
| `components/Cursor.jsx` | Renders nothing (no CSS), infinite rAF |
| `components/apps/TrashApp.jsx` | Not in v2.0 IA (snippets preserved in git; Q16) |
| `components/apps/ErrorApp.jsx` | Copy moves to 404 |
| `components/IntroLoader.*` | Replaced |
| `filters` export, `color` field | Dead / unused (VERIFIED) |
| Unused CSS selectors (`.active-windows-bar`, `.filter-btn`, `.d-flex`, …) and invalid `max-h: 80vh` | Whole stylesheet replaced |
| `clsx` | Never imported |
| `images.domains` config | Deprecated; `next/image` unused in V1 |
| `jsconfig.json` | Replaced by `tsconfig.json` |
| `temp_impeccable/` (258 MB) | Partial clone of an external tool; not part of the site. Delete from disk (owner's call — it's outside git once ignored) |
| `.agents/skills/` (empty) | Empty |
| `scripts/generate_favicons.py` | KEEP (tooling) but document that it needs `temp_fonts/syne-800.ttf`; move to `scripts/` README note |
| `README.md` (describes legacy site) | Rewrite in Phase 8 |

## 6. Asset strategy

All sizes/dimensions VERIFIED in `BRAIN.md §11` (PIL inspection) and `du`.

| Asset | Size / dims | Keep? | Action |
|---|---|---|---|
| `images/officeflow.png` | 876 KB · 1920×970 | Keep | Static import via `next/image` (AVIF/WebP). Re-save source as optimised PNG/WebP ≤ 300 KB. Card crop 16:10. |
| `images/fitmart.png` | 728 KB · 1572×**4096** | Keep (gallery) | Create `fitmart-cover` 16:10 crop of the top of the page for card/OG; tall original only in gallery, lazy |
| `images/money-heist-ctf.png` | 684 KB · 1920×1044 | Keep | Optimise |
| `images/enterprise-portal.png` | 203 KB · 1920×1060 | Keep | `next/image` |
| `images/ledgerai.png` | 168 KB · 1920×970 | Keep | `next/image` |
| `images/faq-assist.png` | 145 KB · 1920×970 | Keep | `next/image` |
| `images/blockchain-scheduler.png` | 94 KB · 1920×970 | Keep | `next/image` |
| `images/profile.jpg` | 158 KB · 768×1024 | Keep **if** owner approves photo use (Q8) | Use in About via `next/image`; no longer wallpaper |
| `images/about-bg.jpg` | 233 KB · 1024×682 | **Unused** (legacy only) | Remove from V2 (in git history) |
| `images/dashboard.png` | 434 KB · 1296×1752 | **Unused**, purpose UNKNOWN | Ask owner (Q17); otherwise remove |
| `images/project-placeholder.svg` | 0.3 KB | Currently unused | **Reuse** as local fallback |
| Favicons (svg, ico, 16, 32, 180, 192, 512) | small | Keep | Remove duplicate `<link>`s |
| `site.webmanifest` | — | Keep | `display: browser` |
| `Anubhav_Sethi_Resume.pdf` | 1.8 MB | Keep path | Owner re-export smaller; phone decision (Q9) |
| New: `opengraph-image.png` | 1200×630 | Add | Design in Phase 5 |
| New: per-project OG crops | 1200×630 | Add | From screenshots |

Rules: project images move to `assets/projects/` for static import (automatic width/height → no CLS); originals stay in `public/images/` until Phase 6 completes, then are removed if no longer referenced (external hotlinks to them are UNKNOWN — keep for one release if in doubt).

## 7. Order of migration (summary — details in roadmap)

1. Freeze V1 (tag) → 2. scaffold V2 on Next current + TS + App Router, delete `pages/` and legacy in the same PR (they live in the tag) → 3. tokens + layout shell → 4. data files from verified content → 5. sections → 6. macOS layer → 7. responsive → 8. a11y/SEO → 9. performance → 10. QA → 11. deploy to preview, then production.

V1 stays deployable from `v1-archive` throughout. Production cut-over happens only at Phase 8.

## 8. Rollback

- Before launch: production keeps serving V1 (if it is deployed — live URL UNKNOWN, Q10).
- After launch: redeploy `v1-desktop` tag (Vercel "Promote previous deployment" or redeploy branch).
- Optional: keep V1 reachable at a sub-path/sub-domain ("classic") — only if the owner wants it (Q13); not part of v2.0 scope.
