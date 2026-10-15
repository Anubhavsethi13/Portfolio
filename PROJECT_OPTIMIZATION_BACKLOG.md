# Project Optimization Backlog

**Project:** Anubhav Sethi — Portfolio  
**Reference Document:** `PROJECT_AUDIT_REPORT.md`  
**Purpose:** Actionable, implementation-ready checklist for future behavior-preserving code optimization, performance enhancement, security hardening, and repository cleanup.

---

## 1. Quick Wins (Low Effort, Low Risk, High Immediate Benefit)

### OPT-Q01: Remediate Critical Next.js & Sub-Dependency Security Vulnerabilities
- **Priority:** P0 (Critical)
- **Related Finding:** CQ-01, Section G
- **Target File / Module:** `package.json`, `package-lock.json`
- **Current Problem:** `next@14.2.3` suffers from 1 Critical CVE (GHSA-p293-qw3h-jr36: Remote Code Execution on Windows servers) and multiple High severity CVEs in `postcss`, `nanoid`, and `source-map-js`.
- **Proposed Change:** Update `next` in `package.json` to the latest secure 14.2.x patch release (`^14.2.35`), run `npm audit fix --omit=dev`, and verify build stability.
- **Why It Preserves Behavior:** Patch releases in the 14.2.x line contain security bug fixes with zero breaking API or UI behavioral changes.
- **Potential Side Effects:** None expected within the 14.2.x minor line.
- **Test / Benchmark Required:** Execute `npm audit --omit=dev` and `npm run build`.
- **Acceptance Criteria:** `npm audit --omit=dev` reports 0 vulnerabilities and `npm run build` completes with exit code 0.
- **Estimated Effort:** 30 minutes.

---

### OPT-Q02: Remove Private Un-sanitized Resume from Public Web Root
- **Priority:** P0 (Critical Privacy Risk)
- **Related Finding:** CQ-02, Section F
- **Target File / Module:** `public/Anubhav_Sethi_Resume.pdf`
- **Current Problem:** The 1.88 MB un-sanitized private resume containing personal phone numbers is located directly inside `public/`, making it web-accessible to anyone querying `/Anubhav_Sethi_Resume.pdf`.
- **Proposed Change:** Delete `public/Anubhav_Sethi_Resume.pdf`. The private original remains safely stored in the ignored `resume/` directory. All public site links already point to `/resume/Anubhav_Sethi_Resume_Public.pdf`.
- **Why It Preserves Behavior:** All active UI components (`AboutApp.jsx`, `pages/resume.js`) reference `profile.resume.publicPdf` (`/resume/Anubhav_Sethi_Resume_Public.pdf`). Zero active code points to `public/Anubhav_Sethi_Resume.pdf`.
- **Potential Side Effects:** Any external user with a cached direct link to `/Anubhav_Sethi_Resume.pdf` will receive a 404, which is the intended security outcome.
- **Test / Benchmark Required:** Check all files for references using ripgrep; verify `/resume` page loads sanitized PDF.
- **Acceptance Criteria:** `public/Anubhav_Sethi_Resume.pdf` does not exist; `/resume` route continues to display the sanitized PDF.
- **Estimated Effort:** 10 minutes.

---

### OPT-Q03: Disable Inert CPU-Draining Animation Loop in Custom Cursor
- **Priority:** P1 (High Performance)
- **Related Finding:** CQ-03, Section E
- **Target File / Module:** `components/Cursor.jsx`, `pages/index.js`
- **Current Problem:** `Cursor.jsx` runs an unthrottled `requestAnimationFrame` loop continuously at 60–120fps mutating DOM styles on invisible elements with zero CSS styling, wasting CPU cycles and draining laptop/mobile battery.
- **Proposed Change:** Remove `<Cursor />` from `pages/index.js` (or conditionally render it only if valid CSS is supplied).
- **Why It Preserves Behavior:** The cursor elements have zero CSS rules in `globals.css` and are currently completely invisible. Removing the component causes zero visible difference to the user interface.
- **Potential Side Effects:** None. Native browser cursor continues to function normally.
- **Test / Benchmark Required:** Open Chrome DevTools Performance monitor; verify animation frame callback rate drops to 0 when idle.
- **Acceptance Criteria:** Zero recurring `requestAnimationFrame` calls when user is idle; visual appearance unchanged.
- **Estimated Effort:** 15 minutes.

---

### OPT-Q04: Restore Automated Linting by Adding `.eslintrc.json`
- **Priority:** P1 (High Reliability)
- **Related Finding:** CQ-04, Section H
- **Target File / Module:** `.eslintrc.json`
- **Current Problem:** `npm run lint` fails with exit code 1 because no ESLint configuration file exists in the repository, blocking automated CI checks.
- **Proposed Change:** Add `.eslintrc.json` extending `"next/core-web-vitals"`.
- **Why It Preserves Behavior:** Configuration change only; does not alter runtime behavior.
- **Potential Side Effects:** May surface pre-existing code warnings for inspection.
- **Test / Benchmark Required:** Run `npm run lint`.
- **Acceptance Criteria:** `npm run lint` executes non-interactively and reports lint status.
- **Estimated Effort:** 15 minutes.

---

### OPT-Q05: Eliminate Duplicate Google Font CSS `@import` Waterfall
- **Priority:** P1 (Medium Performance)
- **Related Finding:** CQ-05, Section E
- **Target File / Module:** `styles/globals.css:1`
- **Current Problem:** Google Fonts are requested in `pages/_document.js` via `<link>` tags and ALSO in `styles/globals.css:1` via `@import url(...)`, stalling CSS OM parsing and triggering a duplicate network round-trip.
- **Proposed Change:** Remove line 1 (`@import url('https://fonts.googleapis.com/...');`) from `styles/globals.css`.
- **Why It Preserves Behavior:** Fonts are already loaded via `<link>` in `_document.js`. Typography renders identically.
- **Potential Side Effects:** None.
- **Test / Benchmark Required:** Inspect browser Network tab to verify only a single font request is dispatched.
- **Acceptance Criteria:** Network panel shows zero `@import` font requests; Syne and DM Sans fonts render correctly.
- **Estimated Effort:** 10 minutes.

---

### OPT-Q06: Remove Unused Production Dependency `clsx`
- **Priority:** P2 (Low Maintenance)
- **Related Finding:** CQ-10, Section G
- **Target File / Module:** `package.json`
- **Current Problem:** `clsx` (`^2.1.1`) is declared in `dependencies` but is never imported in any file.
- **Proposed Change:** Remove `"clsx": "^2.1.1"` from `package.json` and run `npm install` to update lockfile.
- **Why It Preserves Behavior:** The package is never imported; removing it has zero runtime impact.
- **Potential Side Effects:** None.
- **Test / Benchmark Required:** Run `npm run build`.
- **Acceptance Criteria:** `clsx` absent from `package.json`; build succeeds.
- **Estimated Effort:** 10 minutes.

---

### OPT-Q07: Remove Duplicate Favicon Tags from `pages/index.js`
- **Priority:** P2 (Low Cleanup)
- **Related Finding:** CQ-15, Section D
- **Target File / Module:** `pages/index.js:19-24`
- **Current Problem:** `pages/index.js` duplicates the identical 6 favicon `<link>` tags already defined in `pages/_document.js`.
- **Proposed Change:** Delete lines 19–24 of `pages/index.js`.
- **Why It Preserves Behavior:** `pages/_document.js` injects the favicons into `<head>` across all pages globally.
- **Potential Side Effects:** None.
- **Test / Benchmark Required:** Inspect DOM `<head>` on `/` to verify favicons remain present.
- **Acceptance Criteria:** Favicons display normally in browser tabs; duplicate tags removed from source.
- **Estimated Effort:** 10 minutes.

---

### OPT-Q08: Simplify Redundant Ternary in `useTheme.js`
- **Priority:** P2 (Low Cleanup)
- **Related Finding:** CQ-13, Section D
- **Target File / Module:** `hooks/useTheme.js:14`
- **Current Problem:** Line 14 contains `const initial = prefersDark ? 'dark' : 'dark';`, which is a tautological statement.
- **Proposed Change:** Simplify to `const initial = 'dark';`.
- **Why It Preserves Behavior:** Evaluates to `'dark'` in both branches.
- **Potential Side Effects:** None.
- **Test / Benchmark Required:** Toggle theme between light and dark; verify state persists in `localStorage`.
- **Acceptance Criteria:** Theme toggle works as expected.
- **Estimated Effort:** 5 minutes.

---

## 2. Medium-Effort Improvements (Moderate Effort, Measurable Impact)

### OPT-M01: Stabilize Window Event Listeners in `Desktop.jsx`
- **Priority:** P2 (Medium Reliability)
- **Related Finding:** CQ-06, Section C
- **Target File / Module:** `components/Desktop.jsx:44-75`
- **Current Problem:** The `useEffect` that listens for `open-mac-app` and `mac:show-desktop` includes `[openApps, minimizedApps, appStack]` in its dependency array. Every window open, minimize, focus, or drag action tears down and re-registers the window listeners.
- **Proposed Change:** Refactor `handleShowDesktop` to use functional state setters (`setMinimizedApps(prev => ...)` with ref-cached `openAppsRef`), and pass stable event handler functions to `useEffect([], [])`.
- **Why It Preserves Behavior:** Event handling logic remains identical; only unnecessary re-registration churn is eliminated.
- **Potential Side Effects:** None if state closures are handled cleanly.
- **Test / Benchmark Required:** Click menu bar navigation items and the Apple logo desktop shortcut; verify window opening and minimization work smoothly.
- **Acceptance Criteria:** Window event listeners attach once on mount and detach once on unmount.
- **Estimated Effort:** 45 minutes.

---

### OPT-M02: Wire Centralized `data/social.js` across Components
- **Priority:** P2 (Medium Maintainability)
- **Related Finding:** CQ-12, Section D
- **Target File / Module:** `components/apps/ContactApp.jsx:22-26`, `components/Dock.jsx:49-62`, `data/social.js`
- **Current Problem:** `ContactApp.jsx` and `Dock.jsx` define duplicate hardcoded social link arrays and URLs independently, bypassing the centralized `data/social.js` module.
- **Proposed Change:** Import `socialLinks` from `data/social.js` into `ContactApp.jsx` and `Dock.jsx`.
- **Why It Preserves Behavior:** The URLs and labels remain identical; only the data source is unified.
- **Potential Side Effects:** None.
- **Test / Benchmark Required:** Verify external links to GitHub and LinkedIn open correct profile targets in new tabs.
- **Acceptance Criteria:** Zero hardcoded external profile URLs in components; all imported from `data/social.js`.
- **Estimated Effort:** 30 minutes.

---

### OPT-M03: Fix Form & Button Accessibility Violations
- **Priority:** P2 (Medium a11y)
- **Related Finding:** CQ-08, CQ-09, Section D
- **Target File / Module:** `components/apps/ContactApp.jsx:62-95`, `components/Dock.jsx:154`, `components/Window.jsx:79-114`
- **Current Problem:** Form inputs in `ContactApp.jsx` have `<label>` elements without `htmlFor` attributes; interactive buttons in `Dock.jsx` and `Window.jsx` lack `aria-label`.
- **Proposed Change:** Add `id="contact-name"`, `id="contact-email"`, `id="contact-message"` to inputs with matching `htmlFor` on labels; add descriptive `aria-label` to Dock icons and window close/minimize/maximize buttons.
- **Why It Preserves Behavior:** Purely additive accessibility metadata; zero visual or layout change.
- **Potential Side Effects:** None.
- **Test / Benchmark Required:** Run Lighthouse Accessibility audit or axe-core DevTools.
- **Acceptance Criteria:** All interactive buttons and inputs have accessible names; zero unlabeled form errors.
- **Estimated Effort:** 45 minutes.

---

### OPT-M04: Segregate or Remove 16 Dead Components & 9 Unused CSS Modules
- **Priority:** P3 (Medium Cleanup)
- **Related Finding:** CQ-07, Section F
- **Target File / Module:** `components/` (8 legacy scrolling components + 8 unmounted V2 section prototypes), `hooks/useInView.js`, `hooks/useScrollProgress.js`
- **Current Problem:** Over 125 KB of dead JSX code and 25 KB of unused CSS modules exist in the repository, creating confusion about which components are active.
- **Proposed Change:** Move unused legacy and prototype files into a dedicated archive folder (e.g., `archive/legacy/` and `archive/v2_prototypes/`) or remove them if preserved in git history.
- **Why It Preserves Behavior:** Node AST analysis confirms zero active pages or components import these files.
- **Potential Side Effects:** None.
- **Test / Benchmark Required:** Execute `npm run build` before and after file relocation.
- **Acceptance Criteria:** `npm run build` completes with identical route bundles; `components/` contains only active components.
- **Estimated Effort:** 1 hour.

---

### OPT-M05: Remove Confirmed Unreferenced Public Assets
- **Priority:** P3 (Medium Asset Cleanup)
- **Related Finding:** Section F
- **Target File / Module:** `public/images/dashboard.png` (433 KB), `public/images/about-bg.jpg` (232 KB), `public/icons/*.svg` (10 files), `docs.zip` (60 KB)
- **Current Problem:** ~750 KB of confirmed unreferenced images and SVGs occupy repository and build storage.
- **Proposed Change:** Delete `dashboard.png`, `about-bg.jpg`, `project-placeholder.svg`, `docs.zip`, and unreferenced icons in `public/icons/`.
- **Why It Preserves Behavior:** None of these assets are referenced by any active component or data file.
- **Potential Side Effects:** None.
- **Test / Benchmark Required:** Run production build and verify all live project screenshots display without 404 errors.
- **Acceptance Criteria:** Active gallery images load cleanly; unused assets removed.
- **Estimated Effort:** 30 minutes.

---

### OPT-M06: Deduplicate Local Time Calculation Intervals
- **Priority:** P3 (Medium Performance)
- **Related Finding:** Section E
- **Target File / Module:** `components/Navbar.jsx:14-29`, `components/apps/AboutApp.jsx:12-30`
- **Current Problem:** Both `Navbar.jsx` and `AboutApp.jsx` (`LocalClock`) run independent 1,000ms `setInterval` timers formatting Kolkata time with `Intl.DateTimeFormat`.
- **Proposed Change:** Create a lightweight shared hook `useKolkataClock()` or share the time string to eliminate duplicate interval execution.
- **Why It Preserves Behavior:** Time display in menu bar and About sidebar remains identical.
- **Potential Side Effects:** None.
- **Test / Benchmark Required:** Verify clock in top menu bar and About sidebar tick synchronously.
- **Acceptance Criteria:** Single timer updates time state across both components.
- **Estimated Effort:** 30 minutes.

---

## 3. High-Effort Improvements (Substantial Architecture / Performance Gains)

### OPT-H01: Code Split OS Window Applications via `next/dynamic`
- **Priority:** P3 (High Performance)
- **Related Finding:** Section E
- **Target File / Module:** `components/Desktop.jsx:5-9`
- **Current Problem:** `Desktop.jsx` statically imports all 5 window applications (`AboutApp`, `ProjectsApp`, `ContactApp`, `ErrorApp`, `TrashApp`). This inflates route `/` to 147 kB First Load JS on initial page load.
- **Proposed Change:** Convert app imports to dynamic imports with `ssr: false` or standard dynamic loading:
  ```javascript
  const ProjectsApp = dynamic(() => import('./apps/ProjectsApp'));
  const ContactApp = dynamic(() => import('./apps/ContactApp'));
  const ErrorApp = dynamic(() => import('./apps/ErrorApp'));
  const TrashApp = dynamic(() => import('./apps/TrashApp'));
  ```
- **Why It Preserves Behavior:** Apps load transparently when opened; window appearance and interactive mechanics remain unchanged.
- **Potential Side Effects:** A brief loading indicator or spinner may appear if opening an app over an extremely slow network (can provide a lightweight window skeleton).
- **Test / Benchmark Required:** Run `npm run build` and measure First Load JS reduction on route `/`.
- **Acceptance Criteria:** Initial bundle size of `/` drops from 147 kB to ~105 kB; all windows open on demand.
- **Estimated Effort:** 2 hours.

---

### OPT-H02: Modernize Image Delivery via Next.js Image Optimization
- **Priority:** P3 (High Performance)
- **Related Finding:** Section E
- **Target File / Module:** `public/images/`, `components/apps/ProjectsApp.jsx:61`, `components/Desktop.jsx:175`, `pages/projects/[slug].js`
- **Current Problem:** Project screenshots (`officeflow.png` [875 KB], `fitmart.png` [728 KB], `money-heist-ctf.png` [684 KB]) are served as uncompressed PNGs via standard `<img>` tags totaling 3.7 MB.
- **Proposed Change:** Compress raw PNGs into optimized WebP images; adopt Next.js `next/image` with responsive `sizes` attributes for desktop wallpaper and project preview images.
- **Why It Preserves Behavior:** Visual layout and fidelity remain identical while asset byte payload drops by 70–80%.
- **Potential Side Effects:** Container styling must be adapted for `next/image` layout properties (`fill` mode for desktop wallpaper).
- **Test / Benchmark Required:** Inspect Lighthouse Performance score and Network transfer byte total for images.
- **Acceptance Criteria:** Total image payload across project cards reduced by over 2 MB; zero visual layout shifts.
- **Estimated Effort:** 2.5 hours.

---

### OPT-H03: Unify Menu Bar Header Component across Standalone Pages
- **Priority:** P4 (Medium Maintainability)
- **Related Finding:** CQ-14, Section D
- **Target File / Module:** `components/Navbar.jsx`, `pages/projects/[slug].js:45-80`, `pages/resume.js:25-60`
- **Current Problem:** `pages/resume.js` and `pages/projects/[slug].js` re-implement an identical ~40-line sticky menu bar header rather than reusing `Navbar.jsx`.
- **Proposed Change:** Parameterize `Navbar.jsx` with an `isStandalone` prop that displays back-to-desktop navigation on sub-pages while preserving interactive desktop controls on `/`.
- **Why It Preserves Behavior:** Standalone pages display the exact same header styling and navigation links.
- **Potential Side Effects:** Ensure active route highlighting and logo click navigation correctly handle sub-routes.
- **Test / Benchmark Required:** Navigate between `/`, `/resume`, and `/projects/fitmart`; verify header appearance and back navigation.
- **Acceptance Criteria:** Standalone pages import `Navbar`; duplicate header JSX eliminated.
- **Estimated Effort:** 1.5 hours.

---

## 4. Investigations Requiring More Evidence

### OPT-INV01: Window Position Drift on Browser Resize
- **Target File / Module:** `components/Window.jsx:24-32`
- **Current Issue:** `Window.jsx` calculates window dimensions once on mount (`[width, height]`) but does not listen to window `resize` events. If a user resizes or rotates their screen, window dimensions do not update responsively until remounted.
- **Investigation Needed:** Profile whether adding a debounced `resize` listener or CSS clamp constraints (`min(width, 100vw - 32px)`) provides a smoother experience without interfering with Framer Motion drag bounds.
- **Estimated Effort:** 1 hour.

---

### OPT-INV02: Unique SVG Gradient IDs via React `useId()`
- **Target File / Module:** `components/AppIcons.jsx`
- **Current Issue:** Hardcoded IDs (`id="aboutBg"`, etc.) are duplicated in the DOM when icons appear on both Desktop shortcuts and Dock bar.
- **Investigation Needed:** Verify if browser SVG cross-talk causes visual artifacts on specific browsers (e.g. Safari / Firefox), and test if replacing static string IDs with React `useId()` preserves gradients seamlessly across all icons.
- **Estimated Effort:** 1 hour.

---

## 5. Recommendations Not Worth Implementing Yet

### OPT-N01: Full Migration to Next.js App Router
- **Rationale:** The application functions with high efficiency as a static site using Pages Router. Migrating to App Router would introduce unnecessary complexity, rewrite page data loaders (`getStaticProps`, `getStaticPaths`), and risk regressions in Framer Motion drag animations for zero visual or functional gain.

### OPT-N02: Full TypeScript Migration
- **Rationale:** The repository currently has zero TypeScript files. While TypeScript provides compile-time safety, migrating the entire codebase to `.tsx` requires significant typing effort across Framer Motion motion values and window event payloads. Adopting JSDoc type annotations on `data/*.js` achieves IntelliSense with minimal friction.

### OPT-N03: Migrating CSS System to Tailwind CSS
- **Rationale:** `styles/globals.css` already encapsulates a comprehensive, cohesive design system with CSS custom properties (`:root`, `[data-theme="light"]`). Rewriting 1,420 lines of vanilla CSS into Tailwind utility classes would be an invasive rewrite that violates the principle of preserving existing implementation architecture.

---

## 6. Execution Status Update — 2026-10-15

Details and evidence: `PROJECT_OPTIMIZATION_EXECUTION_REPORT.md`. Items above are kept as originally written.

| Backlog item | Status | Notes |
|---|---|---|
| OPT-Q01 Security | **Partially done** | Next 14.2.3 → 14.2.35; nanoid/source-map-js updated; image optimizer disabled. 2 packages remain (next, postcss) — fixes need Next ≥ 15.5.24 |
| OPT-Q02 Private résumé | **Done** | Moved out of `public/`; URL returns 404; original preserved |
| OPT-Q03 Cursor loop | **Done** | Component unmounted and deleted |
| OPT-Q04 ESLint | **Done** | `.eslintrc.json` (`next/core-web-vitals`); 0 errors, 7 `no-img-element` warnings |
| OPT-Q05 Font `@import` | **Done** | |
| OPT-Q06 `clsx` | **Done** | |
| OPT-Q07 Duplicate favicons | **Done** | |
| OPT-Q08 `useTheme` ternary | **Done** | |
| OPT-M01 Desktop listeners | **Done** | Registered once via a ref |
| OPT-M02 `data/social.js` | **Done** | ContactApp + Dock |
| OPT-M03 Form/button a11y | Open | Not in this execution's scope |
| OPT-M04 Dead components | **Mostly done** | 7 legacy components + 7 CSS modules + 2 hooks removed. Kept: `ProjectCard.*` (uncommitted edits), 9 untracked `*Section.jsx` prototypes |
| OPT-M05 Unreferenced assets | **Partially done** | `about-bg.jpg` removed. Kept for owner decision: `dashboard.png`, `project-placeholder.svg`, `public/icons/*`, and the 7 PNG originals now superseded by WebP |
| OPT-M06 Clock intervals | **Done** | Menu-bar clock is minute-aligned; About clock keeps 1 s (shows seconds) |
| OPT-H01 `next/dynamic` | **Rejected after measurement** | Page −0.9 kB, shared +0.8 kB → no first-load gain; reverted |
| OPT-H02 Image delivery | **Done (without `next/image`)** | Same-dimension WebP: 2,830 KB → 479 KB; lazy grid thumbnails |
| OPT-H03 Shared header | **Done (shell only)** | `components/StandaloneHeader.jsx`; `Navbar` not reused (different design) |

### New follow-ups
- **OPT-F01:** Upgrade to Next.js ≥ 15.5.24 + React 19 + `motion` (clears remaining critical/high advisories).
- **OPT-F02:** Delete the 7 superseded project PNGs in `public/images/` after visual review of the WebP versions (−2.8 MB).
- **OPT-F03:** Delete `temp_impeccable/` (258 MB, git-ignored failed clone) manually.
- **OPT-F04:** Visually re-check window animations, dragging and Dock magnification in a focused browser (the automated preview was backgrounded).
- **OPT-F05:** Remove `maximum-scale=1, user-scalable=no` from the home viewport meta (blocks zoom; accessibility).
