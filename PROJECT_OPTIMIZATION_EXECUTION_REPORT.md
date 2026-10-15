# Project Optimization — Execution Report

**Date:** 2026-10-15 · **Branch:** `main` (HEAD `f522d84`, uncommitted work preserved) · **Stack:** Next.js 14.2.x Pages Router, React 18.3.1, framer-motion 11.18.2, global CSS + CSS Modules, npm.
Nothing was committed, pushed or deployed. Raw evidence (build logs, audit JSON, lint output, backups) is in the git-ignored `tmp/opt-baseline/`.

---

## A. Executive summary

- **10 of 12 items completed. Item 8 is partially completed, and item 10 was attempted, measured and abandoned** (it gave no measurable gain).
- **Security:** Next.js was patched from 14.2.3 to **14.2.35**, the final 14.x release. The audit went from **4 vulnerable packages / 43 advisories (3 critical)** to **2 packages / 27 advisories (2 critical)**. The remaining advisories have no fix in Next 14. The self-hosted image optimizer is now disabled (it returns 404) because no page uses `next/image`.
- **Privacy:** an unsanitized résumé containing a phone number was publicly served at `/Anubhav_Sethi_Resume.pdf` by `next start`/`next dev`. It was moved out of `public/` (an identical copy already exists outside the web root). The URL now returns 404. The sanitized public résumé is unchanged.
- **Payload:** project screenshots dropped from **2,830 KB → 479 KB (−83 %)** via same-dimension WebP. The render-blocking duplicate Google Fonts `@import` and an invisible perpetual `requestAnimationFrame` cursor loop were removed.
- **Code:** 16 confirmed-dead tracked files and the unused `clsx` dependency were removed. Lint now runs. Social links come from `data/social.js`. Desktop event listeners register once. The standalone page header shell is shared.
- **UI preservation:** routes, content, links, theme behaviour, window logic, icons and Dock were verified unchanged (details in §G).
- **Important context:** another editor was changing files during this session (`Desktop.jsx`, `Dock.jsx`, `AboutApp.jsx`; `ErrorApp.jsx` was deleted and the Error app removed from the Dock; `public/images/anubhav-profile.jpg` was added). Those changes are **not** mine and were preserved. A dev server (PID 3860, port 3000) was also running and shares `.next/` with `npm run build`, which caused one transient build failure (see §F). Restart that dev server after this report.

## B. Checklist completion matrix

| # | Item | Status | Files changed | What changed | Verification | Result |
|---|---|---|---|---|---|---|
| 1 | Dependency security | **Completed** (to the limit allowed without a major upgrade) | `package.json`, `package-lock.json`, `next.config.js` | `next` 14.2.3→14.2.35 (exact pin kept), `eslint-config-next` 14.2.3→14.2.35, `nanoid` 3.3.11→3.3.20 and `source-map-js` 1.2.1→1.2.2 via `npm update` (within existing ranges). `images.domains: []` (deprecated) replaced by `images.unoptimized: true` | `npm audit --omit=dev` before/after; build; probe `/_next/image` | 4→2 vulnerable packages; `/_next/image` → 404; build OK |
| 2 | Résumé privacy | **Completed** | `public/Anubhav_Sethi_Resume.pdf` → moved to `tmp/private-resume-backup/` | Moved the unsanitized PDF out of the web root | SHA-256 match with `resume/Resume.pdf`; text scan (values not printed); reference search; HTTP probes | Private URL 404; `/resume` and `/resume/Anubhav_Sethi_Resume_Public.pdf` 200 |
| 3 | Cursor animation | **Completed** | `pages/index.js`, `components/Cursor.jsx` (deleted) | Unmounted and deleted the cursor; it had **no CSS anywhere**, so it rendered nothing while running rAF ~60×/s plus 3 document listeners | Repo-wide search; DOM check `.cursor, .cursor-ring` = 0 | Loop removed, no visual change |
| 4 | Linting | **Completed** | `.eslintrc.json` (new) | `{"extends": "next/core-web-vitals"}` for ESLint 8 / eslint-config-next 14 | `npm run lint` | Non-interactive, exit 0, 0 errors, 7 warnings (§H) |
| 5 | Duplicate fonts | **Completed** | `styles/globals.css` | Removed the CSS `@import` (identical URL to the `<link>` in `_document.js`) | Prod page: fonts loaded = Syne 700/800, DM Sans 300/400/500; 0 runtime `css2` requests; 0 `@import` rules | Same families, weights and fallbacks |
| 6A | Theme hook | **Completed** | `hooks/useTheme.js` | Removed the `prefersDark ? 'dark' : 'dark'` no-op and its unused `matchMedia` call | Toggle round-trip; default with no saved value = `dark` | Semantics unchanged |
| 6B | Social links | **Completed** | `components/apps/ContactApp.jsx`, `components/Dock.jsx` | Email, LinkedIn, Behance and GitHub now come from `data/social.js`; order, badges (`in`/`Be`/`GH`), labels and `_blank` behaviour unchanged | DOM: contact "To:" text and 3 hrefs; stubbed `window.open` for Dock GitHub/LinkedIn | Identical URLs |
| 6C | Duplicate favicons | **Completed** | `pages/index.js` | Removed 6 tags already declared in `_document.js` | Prod DOM: 4 `rel~=icon` links (one set) + apple-touch + manifest; `/favicon.svg`, `/site.webmanifest` 200 | No duplicates |
| 6D | Clock work | **Completed** | `components/Navbar.jsx`, `components/apps/AboutApp.jsx` | Navbar (HH:MM) updates at each minute boundary instead of every second and refreshes on tab re-show. Both clocks reuse one module-level `Intl.DateTimeFormat`. About clock keeps its 1 s cadence (it shows seconds) | DOM: menu clock `HH:MM IST`, About clock `HH:MM:SS` | Same output, ~60× fewer menu-bar timer ticks |
| 6E | Desktop listeners | **Completed** | `components/Desktop.jsx` | `open-mac-app` / `mac:show-desktop` listeners register once (`[]` deps) and read the latest `handleOpenApp`/`openApps` through a ref | Scripted: minimize-all, restore-all, open-while-minimized, About tab via event (Dock indicator state) | Behaviour identical; `exhaustive-deps` warning gone |
| 7 | Dead components | **Completed** | 16 files deleted (§C) | Removed the legacy scrolling site + its CSS modules + 2 hooks; all were tracked, unmodified vs HEAD and had zero importers | Import graph of every component/hook/data file; build; lint | Build OK, no missing imports |
| 8 | Unused deps & artifacts | **Partially completed** | `package.json`, `package-lock.json`, `.agents/skills/` | Removed `clsx` (0 imports) and the empty `.agents/skills/` | `npm ls`; lockfile has no clsx entry; build | `temp_impeccable/` (258 MB) **not deleted** (see §H) |
| 9 | Image assets | **Completed** | 7 new `public/images/*.webp`, `data/projects.js` (7 `image:` paths), `components/apps/ProjectsApp.jsx`, `public/images/about-bg.jpg` (deleted) | Same-dimension WebP (q88), lazy/async decoding on Projects-grid thumbnails only, deleted `about-bg.jpg` (its only user was the deleted `About.jsx`). PNG originals kept | All WebP decode at original dimensions; mean abs pixel diff 0.5–1.2/255; every project page serves its WebP; visual check of `/projects/officeflow` | −2,351 KB on project images |
| 10 | Dynamic code splitting | **Not applied (abandoned per its acceptance rule)** | none (reverted) | Tried `next/dynamic` for Projects/Contact/Trash with idle prefetch (About must stay static: it is open on first load) | Prod build before/after | Page −0.9 kB but shared +0.8 kB → home first-load unchanged at 152 kB; reverted |
| 11 | Standalone headers | **Completed** | `components/StandaloneHeader.jsx` (new), `pages/resume.js`, `pages/projects/[slug].js` | Extracted only the identical 13-property sticky glass header shell. Page-specific contents were left in place. `Navbar` was **not** reused: it is a different design (menu bar with nav, clock, theme toggle) and would change these pages | Prod HTML still contains the same inline header style; screenshots of both pages | Unchanged appearance |
| 12 | Final verification | **Completed** | — | lint, build, audit, prod browser checks | §F, §G | Pass, with documented exceptions |

## C. File change log

**Modified (mine)**

| File | Why |
|---|---|
| `package.json`, `package-lock.json` | Next/eslint-config-next patch; nanoid/source-map-js in-range updates; `clsx` removed (npm re-sorted the dependency keys alphabetically) |
| `next.config.js` | `images.unoptimized: true` (replaces deprecated `images.domains: []`) to disable the unused optimizer endpoint |
| `pages/index.js` | Removed Cursor import/mount and duplicate favicon tags |
| `styles/globals.css` | Removed the duplicate Google Fonts `@import` (line 1 only) |
| `hooks/useTheme.js` | Removed the no-op ternary |
| `components/apps/ContactApp.jsx` | Email + social links from `data/social.js` |
| `components/Dock.jsx` | GitHub/LinkedIn URLs from `data/social.js` |
| `components/Navbar.jsx` | Minute-aligned clock, shared formatter |
| `components/apps/AboutApp.jsx` | Shared formatter for the seconds clock |
| `components/Desktop.jsx` | Listeners registered once via a ref |
| `components/apps/ProjectsApp.jsx` | `loading="lazy" decoding="async"` on grid thumbnails |
| `data/projects.js` | 7 `image:` paths `.png` → `.webp` (no content changes) |
| `pages/resume.js`, `pages/projects/[slug].js` | Use `StandaloneHeader` |

**Created:** `.eslintrc.json`, `components/StandaloneHeader.jsx`, `public/images/{officeflow,fitmart,money-heist-ctf,enterprise-portal,ledgerai,faq-assist,blockchain-scheduler}.webp`, this report, `.claude/launch.json` (preview tooling; safe to delete).

**Deleted (all tracked and unmodified vs HEAD, so `git restore <path>` brings any back):** `components/{About,Contact,Experience,Footer,Hero,Projects,Skills}.jsx` + their 7 `.module.css`, `components/Cursor.jsx`, `hooks/useInView.js`, `hooks/useScrollProgress.js`, `public/images/about-bg.jpg`.

**Moved:** `public/Anubhav_Sethi_Resume.pdf` → `tmp/private-resume-backup/Anubhav_Sethi_Resume.pdf` (git-ignored). **Removed:** empty `.agents/skills/` directory.

**Not mine (concurrent edits observed and preserved):** deletion of `components/apps/ErrorApp.jsx`, Error app removed from Dock/Desktop, other edits in `Desktop.jsx`/`Dock.jsx`/`AboutApp.jsx`, new `public/images/anubhav-profile.jpg`.

## D. Security and privacy results

**`npm audit --omit=dev`**

| | Before (next 14.2.3) | After (next 14.2.35) |
|---|---|---|
| Vulnerable packages | 4 (nanoid, next, postcss, source-map-js) | 2 (next, postcss) |
| Package severity | 1 critical, 3 high | 1 critical, 1 high |
| Individual advisories | 43 (3 critical, 18 high, 18 moderate, 4 low) | 27 (2 critical, 10 high, 13 moderate, 2 low) |
| Exit code | 1 | 1 |

Resolved by the patch include the critical **middleware authorization bypass** (<14.2.25), cache poisoning (<14.2.10), the authorization bypass (<14.2.15) and the Server Components DoS (<14.2.35). **Not fixable within Next 14:** every remaining Next advisory has a fixed version ≥ 15.0.8 (most ≥ 15.5.16; the two criticals need ≥ 15.5.24), and `postcss` is pinned to `8.4.31` by `next` itself (fix ≥ 8.5.23). No overrides or `--force` were used.

**Practical exposure (assessment):** the site uses no middleware, i18n, rewrites, Server Actions, App Router, WebSockets or `next/image`. Both remaining criticals concern the Image Optimization API and Windows-hosted servers. The optimizer now 404s (`images.unoptimized: true`; verified). The `postcss` issues are build-time source-map handling. Upgrading to Next ≥ 15.5.24 (requires React 19) remains the real fix.

**Résumé privacy**

| File | Size | Contains phone | Git | Web-served before | After |
|---|---|---|---|---|---|
| `public/Anubhav_Sethi_Resume.pdf` | 1.88 MB | yes | ignored | **yes** (`next start`/`dev`; not in git-based deploys because it is ignored) | moved to `tmp/private-resume-backup/` → URL 404 |
| `resume/Resume.pdf` | 1.88 MB (same SHA-256) | yes | ignored | no (outside `public/`) | unchanged (original preserved) |
| `public/resume/Anubhav_Sethi_Resume_Public.pdf` | 1.26 MB | no (only years appear as digit runs; no email) | tracked | yes (intended) | unchanged, 200 |

No code referenced the private file. All résumé links (`/resume` page, Navbar, AboutApp, `data/profile.js`) point at the public version. No sensitive values were printed.

## E. Performance comparison (same machine; `next build` output)

| Metric | Before | After | Note |
|---|---|---|---|
| `/` first-load JS | 151 kB | 152 kB | Shared chunk +1.6 kB from the Next 14.2.35 patch; page chunk 70.4 → 69.9 kB, but concurrent edits also touched it, so the delta is not attributable |
| Shared JS | 82.8 kB | 84.4 kB | Next patch |
| `/resume` · `/projects/[slug]` | 82.2 · 83.0 kB | 84.0 · 84.8 kB | Shared growth |
| Project screenshots | 2,830 KB (PNG) | 479 KB (WebP) | −83 % |
| Résumé/unused images in `public/images` | — | −227 KB (`about-bg.jpg`) | |
| Google Fonts stylesheet loads | 2 paths (inlined `<link>` + render-blocking CSS `@import`) | 1 (inlined `<link>`), 0 runtime `css2` requests | "Before" is from source inspection; only "after" was measured in the browser |
| Idle main-thread work | Cursor rAF ~60/s + 1 s menu clock + listener re-registration on every window state change | 0 cursor frames, 1 menu-clock tick/min, listeners registered once | Counted from code paths |
| Build duration | 34.4 s | 45.4 s | **Not comparable**: a dev server was concurrently using `.next` |
| Dynamic splitting experiment | 152 kB | 152 kB | Abandoned |

## F. Build and regression results

| Command | Exit | Result |
|---|---|---|
| `npm run build` (baseline) | 0 | 13 static pages |
| `npm audit --omit=dev` (baseline) | 1 | 4 packages |
| `npm run lint` (baseline) | — | Not runnable: no config → interactive prompt (earlier analysis) |
| `npm install --save-exact next@14.2.35`; `npm install -D --save-exact eslint-config-next@14.2.35`; `npm update nanoid source-map-js`; `npm uninstall clsx` | 0 | — |
| `npm run lint` (after config) | 0 | 0 errors, 9 warnings → final 7 |
| `npm run build` (mid-run, after code splitting) | **1 → 0** | First attempt: `PageNotFoundError: /resume` caused by the concurrently running dev server rewriting `.next/` (the page exists). Retried: 0 |
| `npm run build` (final) | 0 | 13 static pages: `/`, `/404`, `/resume`, 9 × `/projects/[slug]` |
| `npm audit --omit=dev` (final) | 1 | 2 packages (§D) |
| Tests | — | **No test suite exists** (`tests/` is empty; no test script) |

Production server checks (`next start`, port 3124): `/`, `/resume`, public PDF, 7 WebP files, `/projects/officeflow`, `/projects/fitmart`, favicon, manifest → 200; `/Anubhav_Sethi_Resume.pdf`, `/_next/image?...`, unknown route → 404. The 3 console errors are exactly these 3 intentional 404 probes.

## G. UI preservation assessment

Verified in the production build:
- **Windows:** About, Projects, Contact and Trash open via the app events. Show-desktop minimizes all and restores all. Opening while minimized restores only that app (Dock indicator states). The About tab is selected via an event (`Education`).
- **Contact:** the "To:" address and LinkedIn/Behance/GitHub links match the previous hardcoded values exactly.
- **Dock:** the GitHub and LinkedIn icons open the same URLs in `_blank`. Icon order is untouched by me.
- **Theme:** defaults to `dark` with no saved value and toggles dark → light → dark. The test value was removed from storage afterwards.
- **Clocks:** the menu bar shows `HH:MM` + `IST`; the About window shows `HH:MM:SS`.
- **Fonts:** families and weights load as before.
- **Project pages:** all 9 render, and the 7 with screenshots serve WebP. Screenshot: `/projects/officeflow` is sharp and laid out as before.
- **/resume:** the header renders with the identical inline style, and the public PDF viewer and download links work.

**Limits of this first pass:** the preview tab reported `document.hidden = true`, so animations, dragging and Dock magnification were not verified then. **They were verified later, in a focused window, during the final verification pass (§J).**

## H. Remaining issues

1. **Next.js advisories requiring Next ≥ 15.5.24** (+ React 19, `framer-motion` → `motion`): deliberately out of scope. This is the top follow-up.
2. **`temp_impeccable/` (258 MB)** is now **verified disposable**; removal is pending your approval (§J.5).
3. **`docs.zip`** (tracked, 60 KB) contains the same 11 V2 docs as `docs/`. Kept as a possible sharing artifact; delete if not needed.
4. **Preserved but unreferenced (uncertain intent):**
   - `components/ProjectCard.jsx` + `.module.css`: only the deleted `Projects.jsx` used it, but it has uncommitted edits.
   - 9 untracked `components/*Section.jsx` prototypes.
   - `public/icons/*.svg` (10 untracked files).
   - `public/images/dashboard.png` (purpose unknown; see `docs/V2_OPEN_QUESTIONS.md` Q17).
   - `public/images/project-placeholder.svg`.
   - `.agents/backup_before_v1_restore/`.
5. **Lint warnings (all `@next/next/no-img-element`, pre-existing):** 7 at execution time; **6 at final verification**. The `AboutApp.jsx` warning disappeared with a later edit that wasn't mine. Remaining: `pages/projects/[slug].js:175`, `components/apps/ProjectsApp.jsx:61` and `:174`, `components/Desktop.jsx:183` (wallpaper), `components/ProjectCard.jsx:30`, `components/ProjectsSection.jsx:128`. These are intentional plain `<img>` uses, and `next/image` is disabled.
6. **PNG originals** of the 7 project screenshots are still in `public/images/`, but nothing references them anymore. Remove them once the WebP versions have been reviewed, saving 2.8 MB of repo weight. Kept per the "retain originals until verified" rule.
7. **Pre-existing, not fixed:**
   - The `/resume` header wraps at narrow widths (~716 px).
   - `Dock.jsx` uses `window.open(url, '_blank')` without `noopener`.
   - `index.js` viewport sets `maximum-scale=1, user-scalable=no`, which blocks zoom (an accessibility issue).
   - Tailwind-style class names remain in `AboutApp.jsx` alongside inline styles.
8. **Dev-server interaction:** builds share `.next/` with any running `next dev`. Stop the dev server before `npm run build`, or restart it afterwards.

## I. Final assessment

The project builds, lints cleanly (0 errors) and serves all routes. Its known private-data exposure is closed, its image payload is substantially smaller, and its dead code and unused dependency are gone, with the existing design, content and interactions preserved. It is **ready for further development**. The one unresolved blocker is the remaining Next.js advisories, which need the planned Next 15.5+/React 19 upgrade. The interactive checks have since passed in a focused window (§J). Recommended next steps:
1. Approve or decline the cleanup actions in §J.5.
2. Commit this work.
3. Schedule the Next.js major upgrade.

---

## J. Final verification pass — 2026-10-15 (10:36–10:58 IST)

No optimization work was repeated, nothing was committed, and no files were deleted in this pass.

### J.1 Method

The dev server you had running (PID 3860, port 3000) shares `.next/`, and running `npm run build` against it caused the earlier failure. To avoid that, I built and served from a **copy of the working tree**: `tmp/verify/`, with `node_modules` linked via an NTFS junction, built with `next build` and served with `next start -H 127.0.0.1 -p 3125`. Before building, `diff -rq` confirmed the copy was identical to the working tree (excluding `node_modules`, `.next`, `tmp`, `.git`, `temp_impeccable`, `resume/`, `.agents/` and `docs.zip`). For comparisons against the committed version, `git archive HEAD` was built the same way in `tmp/head/` (`next build --no-lint`, port 3126). Both copies were removed afterwards, the junctions first via `rmdir` so `node_modules` was untouched (Next is still 14.2.35).

### J.2 Commands and outcomes

| Command | Exit | Outcome |
|---|---|---|
| `npm run lint` (verify copy) | 0 | 0 errors, 6 warnings (all `no-img-element`, see H5) |
| `npm run build` (verify copy) | 0 | 13 static pages. `/` 73.5 kB page / **156 kB** first-load; shared 84.4 kB; `/resume` 83.9 kB; `/projects/[slug]` 84.7 kB |
| `npm audit --omit=dev --json` | 1 | 2 packages (next critical, postcss high), 27 advisories; unchanged since §D |
| `npx next build --no-lint` (HEAD copy) | 0 | `/` 134 kB (14.2.3 baseline code, for behavioural comparison only) |

The home page grew from 152 kB to 156 kB after the execution report because `components/apps/AboutApp.jsx` was edited again at about 10:35, and that edit wasn't mine. A file-by-file check confirmed that every optimization edit is still present: the AboutApp/Navbar formatters, the Navbar minute timer, the Desktop `latestRef` + `[]` deps, the Dock/Contact `data/social.js` usage, the lazy grid images, the `useTheme` default, `StandaloneHeader` on both pages, `images.unoptimized`, the `@import` removal, no Cursor or duplicate favicons in `index.js`, and 7 `.webp` paths in `data/projects.js`.

### J.3 HTTP checks (production server, 127.0.0.1:3125)

| URL | Status |
|---|---|
| `/`, `/resume`, `/favicon.svg`, `/site.webmanifest` | 200 |
| `/resume/Anubhav_Sethi_Resume_Public.pdf` | 200 `application/pdf` |
| `/Anubhav_Sethi_Resume.pdf` (private) | **404** |
| `/_next/image?url=/images/profile.jpg…`, `/_next/image?url=/images/officeflow.webp…` | **404** (optimizer disabled) |
| unknown route | 404 |
| All 9 `/projects/<slug>` | 200. The 7 with screenshots render `<img src="/images/<name>.webp">`, and each WebP returns 200. `personalized-study-generator` and `security-log-analyzer` intentionally use placeholders |

### J.4 Interactive test in a focused Browser pane (production build, real mouse input, 720 × 678 viewport)

| Check | Result |
|---|---|
| Desktop icons render; clicking **Projects** opens the Projects window | Pass |
| Dragging a window by its title bar | Pass (moved, clamped to desktop bounds) |
| Maximize → fills desktop; maximize again → original size/position | Pass |
| Minimize → window hidden; Dock **About** icon → restored | Pass |
| Close → window removed; icon reopens it | Pass |
| Project card → in-window detail view | Pass |
| Projects grid thumbnails | Pass: all 7 WebP loaded (`complete && naturalWidth > 0`) |
| Dock magnification (real hover) | Pass: hovered icon 60 → 90 px, neighbours 72 px, tooltip "Projects Gallery", all back to 60 px on leave |
| Theme toggle (real click) | Pass: dark → light (`rgb(244,244,246)`) → dark; test value removed from storage |
| Menu-bar **Résumé** → `/resume` | Pass: viewer renders the public PDF; "Open Fullscreen"/"Download" point to `/resume/Anubhav_Sethi_Resume_Public.pdf` |
| `/projects/fitmart` | Pass: h1, WebP hero (1572 px wide decoded), Live/Source links; "← Back to Projects" navigates to `/#work` |
| Dragging a desktop icon | Pass (moved 32,446 → 330,387) |
| Browser console | **No messages** (no errors or warnings) |

**Observed but pre-existing (confirmed on the HEAD build, which has identical behaviour):**
- (a) After maximize → restore, the window corner radius stays 0 px instead of returning to 14 px.
- (b) Releasing a desktop-icon drag also fires the icon's click and opens its window.

**Not caused by this work:** dragging the title bar selects title text. That comes from `body { user-select: auto }` in the uncommitted `globals.css` edits that weren't mine (HEAD had `user-select: none`); my only edit to `globals.css` is the line-1 `@import` removal. Desktop-width (1280 px) layout was verified through the DOM in the earlier pass. Pane emulation at 1280 px renders scaled, so real-mouse coordinates were not used there.

### J.5 Cleanup candidates — final status

| Candidate | Evidence | Status |
|---|---|---|
| 7 project PNG originals (`officeflow`, `fitmart`, `money-heist-ctf`, `enterprise-portal`, `ledgerai`, `faq-assist`, `blockchain-scheduler`) | 0 references in `components/ pages/ hooks/ data/ styles/ scripts/ public/`, `next.config.js`, `package.json`, `jsconfig.json`, `.eslintrc.json`, and 0 in the production build output (`.next/**/*.{js,html,json,css}`). Mentioned only in documentation (`BRAIN.md`, `PROJECT_MAP.md`, `docs/*`, audit reports). WebP: same dimensions, PSNR 35.2–44.1 dB; side-by-side 1:1 crops of the most detailed regions show no visible difference (`tmp/png-vs-webp.png`); all load and render in the browser. All 7 PNGs are tracked in git, so `git restore` recovers them | **Verified safe to delete. Awaiting your approval** |
| `temp_impeccable/` (258 MB) | `git rev-list --all` = 0 commits, 0 refs, 0 loose/packed objects, 0 working-tree files; 257.6 MiB is a single aborted download `.git/objects/pack/tmp_pack_*`, which git classifies as garbage. Remote: `github.com/pbakaus/impeccable`. Only recent activity is GitKraken's `gk-last-accessed` metadata. No project file references it; git-ignored | **Verified disposable. Awaiting your approval** (`rm -rf temp_impeccable`; not recoverable, but contains no data) |
| `.claude/launch.json` | Untracked, not ignored. Not referenced by `package.json`, scripts, README, build or deploy. Used only by the Claude desktop app's preview tool (`preview_start` reads it). Temporary `verify`/`head` entries were removed; `dev` (3123) and `prod` (3124) remain | **Kept.** Not required by the app; safe to delete or add to `.gitignore` if you don't use the preview tool |
| `components/ProjectCard.jsx` + `.module.css` | 0 importers (its only importer, legacy `Projects.jsx`, was removed), but it has your uncommitted edits | **Preserved** (intent uncertain) |
| 9 `components/*Section.jsx` | 0 importers each; untracked prototypes | **Preserved** (would be unrecoverable) |
| `public/icons/*.svg` (10) | 0 code references; untracked | **Preserved** |
| `public/images/dashboard.png` | 0 references; purpose unknown | **Preserved** |
| `docs.zip` | Tracked; byte-identical (`cmp`) to all 11 `docs/V2_*.md` files, so it is conclusively **redundant**. Its purpose (a sharing archive?) isn't established | **Preserved** (your call) |

### J.6 Security remediation — verified assessment

| Package | Remaining advisories | Fix requires | Exposure in this project |
|---|---|---|---|
| `next@14.2.35` (critical) | 23 Next advisories, including 2 critical: **GHSA-2xp9-vwfh-vxw4** (RCE in the Image Optimization API via `sharp`/`libheif` when AVIF files are optimized) and **GHSA-p293-qw3h-jr36** (RCE on **Windows-hosted** servers, Pages and App Router, *"no known workaround"*) | `next ≥ 15.5.24` (or ≥ 16.3.3), a major upgrade with React 19 | See below |
| `postcss@8.4.31` (high) | 4 advisories (source-map path traversal / file read, `</style>` XSS in stringify) | `postcss ≥ 8.5.23`, but `next@14.2.35` pins `8.4.31` exactly; only an override (prohibited) or a Next major can change it | **Build-time only**: PostCSS processes the project's own CSS during `next build`; it is not reachable by site visitors. Low practical risk |

**Does disabling the image optimizer fully address exposure?**
- **GHSA-2xp9 (AVIF / Image Optimization API):** yes, for any self-hosted `next start`. With `images.unoptimized: true`, Next 14.2.35's `next-server.js` returns 404 for `/_next/image` *before* any image processing (verified: two probe URLs → 404). `sharp` is also not installed in this project. On **Vercel** (the target named in `README.md`; there is no `vercel.json` or other deploy config in the repo, so the actual host is UNKNOWN), image optimization runs on Vercel's own infrastructure only when `next/image` is used. The site uses no `next/image`, and with `unoptimized: true` no optimization URLs are generated. Exposure: **mitigated**. `npm audit` will still report it, because it checks version ranges, not configuration.
- **GHSA-p293 (Windows-hosted RCE):** **not addressed by the image setting.** It applies whenever a Next.js server runs on a Windows filesystem. Vercel runs Linux, so a Vercel deployment is not exposed. **This development machine is Windows**, though, and the dev server running during this session listened on `0.0.0.0:3000` and `[::]:3000`, which makes it reachable from the local network unless Windows Firewall blocks it. Until the Next ≥ 15.5.24 upgrade:
  - don't self-host production on Windows;
  - run local servers bound to loopback (`npm run dev -- -H 127.0.0.1`), which is how the verification servers in this pass were started;
  - don't leave dev servers running on untrusted networks.
- **Other remaining Next advisories** (middleware/i18n bypass, rewrites SSRF/smuggling, Server Actions, App Router/RSC, WebSocket SSRF, `beforeInteractive` XSS, image cache growth) depend on features this site does not use: no middleware, i18n, rewrites, Server Actions, App Router, custom server or `next/image`. Residual risk is low, but the advisories remain open until the major upgrade.

No forced fixes, overrides or major upgrades were applied. **The remaining issues cannot be resolved within the Next 14 / React 18 constraint.**

### J.7 Git diff and user-change integrity

`git status`: 37 tracked changes (modified/deleted) + untracked files, HEAD `f522d84`, nothing staged or committed. Changes not made by me remain intact, including:
- the `ErrorApp.jsx` deletion and the Error app's removal from the Dock/Desktop;
- the later `AboutApp.jsx` edits;
- `anubhav-profile.jpg`;
- the `globals.css` theme/layout edits;
- the `IntroLoader`, `Navbar.module.css` and `ProjectCard` changes;
- all untracked data/section/docs files.

Every optimization edit was a narrow, exact-string replacement against the then-current file contents. No file was rewritten wholesale, except `next.config.js` (10 lines, whose content had been confirmed beforehand), the new files I created, and this report.
