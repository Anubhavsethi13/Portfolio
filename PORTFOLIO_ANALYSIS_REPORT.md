# Portfolio Project — Complete Analysis Report

**Repository:** `D:\Claude\Portfolio - Mac - Copy`
**Date of analysis:** 2026-10-07
**Method:** full source read of every non-generated file, a repo-wide reference search, `npm run build`, `next lint` (attempted), `npm audit`, `npm outdated`, image inspection with PIL, and a runtime check of the production build (`next start`) in a browser at desktop size and at 375×812.
**Source files modified:** 0. The only side effect is that `npm run build` regenerated the gitignored `.next/` folder.

Labels: **FACT** = verified · **LIKELY** = strong inference · **UNKNOWN** = not determinable from the repo.
Severity scale: CRITICAL · HIGH · MEDIUM · LOW · INFO.

---

## Executive Summary

The project is a **Next.js 14.2.3 (Pages Router) + React 18 + framer-motion** portfolio for **Anubhav Sethi** that imitates a **macOS desktop**: draggable windows, desktop icons, and a magnifying dock. It is a single static page with no backend, database, auth or environment configuration. It **builds successfully** with a small JS footprint (132 kB first load), and the desktop experience is creative and largely polished.

Its main problems:

1. **Mobile is broken.** Windows overflow off-screen and the dock is clipped (FACT, seen at 375 px).
2. **Tailwind class names are used without Tailwind installed**, which leaves the clock and several SVG icons unstyled or rendered as black shapes (FACT, seen).
3. **Next 14.2.3 has published security advisories.** `npm audit` reports 1 critical and 3 high.
4. **There is no git history.** Zero commits, no remote, and a ~270 MB abandoned clone (`temp_impeccable/`) sits un-ignored in the repo.
5. **About 35% of the source is dead.** It is a previous scrolling-site design that nothing imports.
6. Accessibility and SEO are thin, and images are unoptimized.

**Issue counts:** CRITICAL 0 · HIGH 5 · MEDIUM 14 · LOW 15 · INFO 3.
(`npm audit` labels `next` as *critical*. This report rates it HIGH because none of the vulnerable features are used — no middleware, API routes, `next/image` or Server Actions. Upgrading is still the first priority.)

---

## Project Overview

| | |
|---|---|
| Subject | Anubhav Sethi: Web Developer & Graphics Designer (India) |
| Concept | Portfolio as a fake desktop OS: "About & CV", "Projects", "Contact Me", "Bin of Ideas" (trash), a joke "System Warning", plus GitHub and LinkedIn dock links |
| Pages | 1 (`/`), plus the default `/404` |
| Data | 7 projects in `data/projects.js`; everything else is hardcoded in components |
| History | The folder name "Portfolio - Mac - Copy" and the dead components suggest the site was redesigned from a dark scrolling portfolio (Hero/Navbar/Bento About/Projects grid/Footer marquee) into the OS concept (LIKELY). With no git history, there is no direct evidence. |

---

## Technology Stack

| Layer | Detected | Notes |
|---|---|---|
| Framework | Next.js **14.2.3** (pinned), Pages Router | `pages/_app.js`, `_document.js`, `index.js` |
| Language | JavaScript / JSX | `jsconfig.json`; no `tsconfig.json`. `@types/*` installed but unused |
| UI | React 18.3.1 | |
| Animation / drag | framer-motion 11.18.2 | `motion`, `AnimatePresence`, `useDragControls`, `useMotionValue`, `useSpring`, `useTransform` |
| Styling | Global CSS (`styles/globals.css`, 1,340 lines) + inline styles; CSS Modules only for IntroLoader and dead components | |
| Tailwind | **Absent**, but its class names are used | see H3 |
| Fonts | Google Fonts: Syne 400–800, DM Sans 300–500 | loaded twice |
| Icons | Inline SVG (`components/AppIcons.jsx`, ad-hoc SVGs) | |
| State | `useState` / framer MotionValues | no context or store |
| Forms | Controlled inputs → `mailto:` | no validation library |
| API client / backend / DB / ORM / auth / CMS / analytics | **None** | |
| Testing | None | |
| Lint / format | eslint 8 + eslint-config-next installed but **no config**. No Prettier | |
| Package manager | npm, lockfile v3 | |
| Deploy | README → Vercel. No `vercel.json`, CI or Docker | real target UNKNOWN |
| Runtime used for verification | Node 22.22.3, npm 10.9.8 | |

**Dependency purposes:** `next` is the framework and build tool. `react`/`react-dom` are the UI. `framer-motion` drives every animation and drag interaction. `clsx` is **unused**. `eslint`/`eslint-config-next` are lint tooling, unconfigured. `@types/node|react|react-dom` provide editor IntelliSense only (no TS).

---

## Repository Structure

| Directory | Purpose | Used by | Active? |
|---|---|---|---|
| `pages/` | Next entry points | Next runtime | ✅ |
| `components/` (Desktop, Window, Dock, AppIcons, IntroLoader, Cursor) | OS shell | `pages/index.js` | ✅ (Cursor is inert) |
| `components/apps/` | the 5 window apps | `Desktop.jsx` | ✅ |
| `components/` (Navbar, Hero, About, Experience, Skills, Projects, ProjectCard, Contact, Footer + modules) | legacy scrolling site | nothing | ❌ dead |
| `data/` | `projects.js` | Desktop, ProjectsApp (+ dead Projects) | ✅ |
| `hooks/` | `useInView`, `useScrollProgress` | dead components only / nothing | ❌ |
| `styles/` | `globals.css` | `_app.js` | ✅ |
| `public/` | favicons, manifest, résumé, images | runtime | ✅ (3 images unused) |
| `scripts/` | `generate_favicons.py` (fontTools + Pillow; needs `temp_fonts/syne-800.ttf`, which is absent) | manual | tooling |
| `.impeccable/critique/` | AI design-critique report, 2026-08-12 | docs | info |
| `.agents/skills/` | empty | — | ❌ obsolete |
| `temp_impeccable/` | partial `git clone` of `github.com/pbakaus/impeccable` (only `.git/` plus a 270 MB `tmp_pack`) | — | ❌ obsolete, **not gitignored** |
| `.next/`, `node_modules/` | generated | — | ignored |

---

## Architecture Analysis

- **Bootstrap:** `_document.js` (fonts, icons) → `_app.js` (global CSS, no providers or layout) → `pages/index.js`, which renders `IntroLoader`, `Cursor`, and `<main><Desktop/></main>`.
- **Window manager:** `Desktop.jsx` owns `openApps`, `minimizedApps`, `activeApp`, `appStack` and `selectedProject`. Window z-index is `10 + appStack.indexOf(id)`. Window metadata (title, size, position, content) comes from an if/else chain (lines 207–247).
- **Window chrome:** `Window.jsx` drags from the title bar only (`dragListener={false}`, `dragControls.start(e)`) and keeps the drag inside `desktopRef`. Maximize is a local boolean that animates to 100%×100%.
- **Dock:** `Dock.jsx` uses a pointer-X MotionValue. Each `DockIcon` maps its distance to a size of 60–90 px with a spring. It shows a running dot (dimmed when minimized) and a lime ring on the active app.
- **Strength:** a clear single owner of state, and simple predictable flows.
- **Weakness:** the app registry is split across Desktop (config and shortcuts), Dock (list) and the `appStack` literal, so adding an app requires three or four coordinated edits. Business logic and presentation are mixed in Desktop.

---

## Page / Route Analysis

| Route | Purpose | Components | Data | Interactions | Responsive |
|---|---|---|---|---|---|
| `/` | Entire portfolio | IntroLoader, Cursor, Desktop → Window, Dock, 5 apps | `data/projects.js`, hardcoded content | open/focus/close/minimize/maximize windows, drag icons and windows, dock magnify, tab switching, project detail, mailto form, résumé iframe/download | single 768 px breakpoint; **broken on phones** |
| `/404` | Next default | — | — | — | — |

There are no dynamic routes, no modal routes and no custom error page. App state is not reflected in the URL, so individual projects cannot be deep-linked.

---

## Component Analysis

| Component | Responsibility | Props / state | Reuse | Notes |
|---|---|---|---|---|
| `Desktop` | shell, state, app registry, shortcuts | state ×5 | 1 | business + presentation; 300 lines |
| `Window` | window chrome, drag, maximize, mobile size | id, title, width, height, defaultX/Y, zIndex, desktopRef, onClose/onMinimize/onFocus, children; state isMaximized, dimensions | ×5 instances | reusable; `isOpen` is always true; mobile ignores defaultX |
| `Dock` / `DockIcon` | dock and magnification | openApps, activeApp, minimizedApps, onOpenApp | 1 | inline styles; hardcoded list; unused `color` |
| `AppIcons` | 7 SVG icons | — | ×2 each (desktop + dock) | global gradient IDs duplicated in the DOM |
| `IntroLoader` | splash | loading | 1 | CSS module |
| `Cursor` | custom cursor | isHovering | 1 | **no CSS → invisible; rAF loop always running** |
| `AboutApp` (+`LocalClock`) | bio, stats, philosophy, experience, education, certs, skills, interests, résumé | activeTab | 1 | 481 lines; content embedded; heavy inline styles; clock uses Tailwind classes |
| `ProjectsApp` | grid ↔ detail | selectedProject (controlled/uncontrolled) | 1 | imports unused `filters` |
| `ContactApp` | mailto form, socials | formData, submitted | 1 | labels not linked to inputs |
| `ErrorApp` | joke dialog | onClose | 1 | |
| `TrashApp` | snippet browser | selectedFile | 1 | icons broken (H3) |
| Legacy ×9 | old site sections | — | **0** | dead |

**Live tree:**
```
Home
├── IntroLoader
├── Cursor
└── Desktop
    ├── Shortcut ×4 (AboutIcon, ProjectsIcon, ContactIcon, TrashIcon) + project shortcut ×3
    ├── Window ×n → AboutApp(LocalClock) | ProjectsApp | ContactApp | ErrorApp | TrashApp
    └── Dock → DockIcon ×7 (AppIcons)
```

---

## Design System Analysis

- **Colors** (`:root`): bg `#080808`, surface `#111`/`#181818`, text `#F0EEE8`, mid `#A09A90`, muted `#6B6960`, border white at 6%/14%, **accent `#C8F04E`** (+ 8%/14% dims). In practice many hardcoded Tailwind-palette greys (`#a1a1aa`, `#6b7280`, `#9ca3af`, `#e4e4e7`, `#f3f4f6`) and surfaces (`#141416`, `#18181c`) bypass the tokens. The hover accent `#b8e03e` is hardcoded. Traffic lights are `#ff5f56/#ffbd2e/#27c93f`. Gradients: a radial wallpaper fallback, plus the SVG icon gradients.
- **Typography:** Syne (display: names, titles, logo) and DM Sans (body). The root size is 18 px, but app UI text is 11–14 px. Section labels are 11 px, 600 weight, uppercase, 0.1em tracking. h2 in About is 24 px/700/-0.02em.
- **Spacing:** window body padding 24 px; desktop grid padding 40/32 px with gap 32×48 px; shortcuts 96 px wide with 60 px icons; dock padding 10×18 px with gap 12 px; card radius 8 px, window 14 px, dock 24 px.
- **Patterns:** glassmorphism (blur 20–24 px, translucent dark), macOS traffic lights, pill tags (featured tags in lime), timeline with dots, cards with image zoom and an "Open Project" overlay on hover, a primary lime button versus a ghost button.
- **Breakpoints:** CSS `max-width: 768px` only (×3 blocks); JS `< 768`. There is no tablet or large-desktop tuning. The legacy modules used 640/768/1024, which shows the old site had more responsive tiers.

---

## Content Analysis

| Content | Value (summary) | Storage |
|---|---|---|
| Name / headline | Anubhav Sethi — "Web Developer & Graphics Designer" | JSX in AboutApp, `<Head>` |
| Bio | Full-stack developer and designer in India; web apps, blockchain, AI | JSX (AboutApp) |
| Stats | 4+ years, 40+ projects, 25+ clients | JSX (AboutApp) ⚠ conflicts with the timeline (M8) |
| Philosophy | Research First, Intentional Aesthetics, Systems Thinking, Craft Obsession | JS array (AboutApp) |
| Experience | MachinesWale (Social Media Manager / Jr Associate Consultant, Dec 2024–May 2025); K.E.C International (Intern, Aug–Oct 2024) | JS array (AboutApp) |
| Education | NIT Polytechnic Nagpur, Diploma 2021–24 (GPA 7.2); E-Pathshala 2017–21 | JS array |
| Certifications | Advanced C/C++/Java/Python/UI-UX; Infosys Springboard; RedHat System Administration | JS array |
| Skills | 4 groups, 27 skills, 12 featured | JS array (duplicated in dead `Skills.jsx`) |
| Interests | design, photo/film, AI, Web3 | inline array |
| Projects | OfficeFlow, FitMart, FAQ-Assist (featured); Enterprise Login Portal; Money Heist CTF; Blockchain Appointment Scheduler; AI-Driven Accounting | `data/projects.js` |
| Project links | 6 × `*.vercel.app`/streamlit, 1 × `codehs.me` sandbox; 7 GitHub repos under `Anubhavsethi13` | `data/projects.js` |
| Résumé | `/Anubhav_Sethi_Resume.pdf` | public asset |
| Contact | public email (displayed and used in the mailto) | JSX (ContactApp) |
| Socials | LinkedIn, Behance, GitHub | JSX arrays (ContactApp; Dock has GitHub plus a **generic** LinkedIn) |
| Testimonials / awards | none | — |
| Dead content | FAQ ×4, tech tickers, rotating hero words, footer marquee, "Available for freelance" badge | legacy components |

---

## Asset Analysis

| Asset | Format | Dimensions | Size | Used | Optimization |
|---|---|---|---|---|---|
| images/officeflow.png | PNG | 1920×970 | 876 KB | ✅ project + desktop icon | WebP/AVIF + thumbnail (~90% saving LIKELY) |
| images/fitmart.png | PNG | 1572×4096 | 728 KB | ✅ | crop to 16:9; WebP |
| images/money-heist-ctf.png | PNG | 1920×1044 | 684 KB | ✅ | WebP |
| images/enterprise-portal.png | PNG | 1920×1060 | 203 KB | ✅ | WebP |
| images/ledgerai.png | PNG | 1920×970 | 168 KB | ✅ | WebP |
| images/faq-assist.png | PNG | 1920×970 | 145 KB | ✅ | WebP |
| images/blockchain-scheduler.png | PNG | 1920×970 | 94 KB | ✅ | — |
| images/profile.jpg | JPEG | 768×1024 | 158 KB | ✅ wallpaper (blurred 35 px) | a tiny pre-blurred version would suffice |
| images/about-bg.jpg | JPEG | 1024×682 | 233 KB | ❌ dead code only | remove or keep for a redesign |
| images/dashboard.png | PNG | 1296×1752 | 434 KB | ❌ unused | remove |
| images/project-placeholder.svg | SVG | 800×450 | 0.3 KB | ❌ unused | use it as the local `onError` fallback instead of Unsplash |
| Anubhav_Sethi_Resume.pdf | PDF | — | 1.8 MB | ✅ ×3 refs | could be compressed |
| favicon.svg/ico/16/32, apple-touch 180, android 192/512 | SVG/ICO/PNG | correct sizes | ~50 KB total | ✅ | fine |
| site.webmanifest | JSON | — | — | ✅ | lacks `start_url`, `id` |

No fonts, video or GIF are stored locally. All icons are inline SVG.

---

## Data Flow

```
data/projects.js ─► Desktop.featuredProjects (filter featured, slice 3) ─► desktop shortcuts ─► handleLaunchProject
                 └► ProjectsApp grid ─► setSelectedProject (state lifted into Desktop) ─► detail view ─► external links
Dock / shortcuts ─► Desktop handlers ─► openApps/minimizedApps/activeApp/appStack ─► Window render & z-index
ContactApp formData ─► mailto URL (encodeURIComponent) ─► window.location.href
LocalClock ─► setInterval 1s ─► Intl.DateTimeFormat(Asia/Kolkata)
```
Mechanisms in use: props and local state only. **Not used:** context, custom hooks (in the live tree), fetch/API, localStorage, sessionStorage, cookies, URL params, env vars.

---

## API / Backend Analysis

**None (FACT).** There is no `pages/api`, no data-fetching functions and no server code. The only "integration" is the `mailto:` hand-off to the visitor's own mail client.

## Database Analysis

**None (FACT).**

## Authentication Analysis

**None (FACT).** The "Enterprise Login Portal" is an external project link, not a feature of this site.

---

## Configuration Analysis

| File | Content | Findings |
|---|---|---|
| `package.json` | scripts dev/build/start/lint | `lint` is unusable without a config |
| `next.config.js` | `reactStrictMode: true`, `images.domains: []` | `domains` is deprecated (use `remotePatterns`) and pointless because `next/image` is unused |
| `jsconfig.json` | `@/components/*`, `@/data/*`, `@/hooks/*`, `@/styles/*` | aliases never used |
| `.gitignore` | standard | missing `temp_impeccable/` (H5); possibly `.impeccable/` and `.agents/` |
| `site.webmanifest` | name, icons, colours, standalone | no `start_url` |
| ESLint / Prettier / Tailwind / PostCSS / TS / Vercel / Docker / CI | **absent** | |

---

## Build & Development Workflow

| Command | Result |
|---|---|
| `npm install` | not re-run (node_modules already present: 296 top-level packages) |
| `npm run build` | ✅ **Success.** `/` static 53.8 kB, first-load JS 132 kB; shared 82.4 kB |
| `npm run lint` / `next lint` | ❌ **Not blocking but unusable.** It opens the interactive "How would you like to configure ESLint?" prompt because no `.eslintrc*` exists. Fix: add `.eslintrc.json` with `{"extends":"next/core-web-vitals"}` |
| typecheck | n/a (JS) |
| tests | none exist |
| `npm audit --omit=dev` | 4 vulnerabilities (1 critical: `next`; 3 high: `nanoid`, `postcss`, `source-map-js`, transitive) |
| `npm outdated` | next 14.2.3 → 16.4.0; react 18.3.1 → 19.3.0; framer-motion 11.18.2 → 14.0.0; eslint 8 → 10 |
| Runtime (`next start`) | Loads; IntroLoader → Desktop with About open. Bugs B1, B2 and mobile issues confirmed visually |

---

## SEO Audit

| Item | Status |
|---|---|
| `<title>` | ✅ "Anubhav Sethi — Web Developer & Graphics Designer" |
| meta description | ✅ |
| Open Graph | ⚠ title and description only; **no `og:image`, `og:url`, `og:type`** |
| Twitter/X | ❌ |
| canonical | ❌ |
| robots.txt / sitemap.xml | ❌ |
| structured data (Person JSON-LD) | ❌ |
| favicon / manifest | ✅ (duplicated link tags in `_document` and `index`) |
| `lang` | ✅ `en` |
| headings | ❌ no `<h1>`; content starts at h2 |
| crawlable content | ⚠ the About content is in the SSR HTML (open by default); Projects, Contact and Trash content are not rendered until clicked, so crawlers miss the project list |

## Accessibility Audit

| Area | Finding | Severity |
|---|---|---|
| Keyboard | desktop shortcuts, project cards and trash cards are `div onClick`, so they are unreachable by keyboard | MEDIUM (M2) |
| Forms | `<label>` without `htmlFor`; inputs lack `id`/`aria-label` | MEDIUM (M3) |
| Window semantics | no `role="dialog"`/`aria-labelledby`; no focus move on open; no Esc to close | MEDIUM (part of M2) |
| Controls | traffic-light buttons are 12 px with only a `title` (no `aria-label`) | LOW |
| Focus | no `:focus-visible` styles; inputs use `outline:none` | MEDIUM (part of M2) |
| Text selection | global `user-select: none` | LOW |
| Alt text | project images ✅; wallpaper has non-empty alt but is decorative | LOW |
| Contrast | 11–12 px `#6b7280` on ≈`#0d0d0e` is LIKELY below AA for small text | LOW |
| Motion | no `prefers-reduced-motion` handling | MEDIUM (M12) |
| Screen readers | the joke "Compiler Error" dialog could alarm users (critique notes this too) | INFO |

## Performance Audit

| Area | Finding |
|---|---|
| JS bundle | 132 kB first load: good. framer-motion is the main dependency |
| Images | unoptimized `<img>` with no `loading="lazy"` and no `srcset`; ~3.3 MB of PNGs for the Projects grid; 1920 px images shown at 60 px on the desktop (M4) |
| Fonts | duplicated loading: CSS `@import` (render-blocking) **and** `<link>` (M7) |
| Rendering | `Cursor` rAF loop every frame forever (M6); full-screen 35 px blur on an `<img>` plus multiple `backdrop-filter` layers are GPU-heavy, especially on mobile |
| Re-renders | `LocalClock` re-renders each second (isolated to its own component: fine). Dock reads layout on mouse move (OK at 7 icons) |
| Lazy / code splitting | all apps are bundled eagerly. `next/dynamic` for the apps is possible but the gain is small |
| API calls | none |

---

## Security Audit

| Check | Result |
|---|---|
| Exposed API keys / secrets / tokens | **None found** (FACT). No `.env*` files, no `process.env` |
| Client-side secrets | none |
| Unsafe HTML | no `dangerouslySetInnerHTML` |
| External links | anchors use `rel="noreferrer"`/`noopener noreferrer` ✅; **`Dock` `window.open(url,'_blank')` lacks `noopener`** (LOW, L3) |
| Form handling | mailto only; no injection surface (values are `encodeURIComponent`-ed) |
| Dependencies | **next@14.2.3 vulnerable** (H1). Transitive: nanoid, postcss, source-map-js |
| Third-party requests | Google Fonts; Unsplash image fallback (leaks visitor IP and referrer to Unsplash on image error) |
| Public information | email (intentional); résumé PDF contents UNKNOWN (could not be parsed; owner should check for phone or home address) |

---

## Code Quality Audit

**Bugs / risks:** see *Bugs / Risks* below.
**Patterns:**
- Inline styles plus JS hover handlers (`onMouseEnter` mutating `style`) in `AboutApp.jsx`: hard to theme, no focus parity.
- The same 11 px uppercase heading style is copy-pasted ~8× inline.
- Tailwind remnants patched with `svg.w-4 { … !important }` hacks in globals.css (lines ~1010–1020).
- Window config if/else instead of a lookup table.
- `handleMinimizeApp` has a redundant `&& appId !== id` condition (line 61). Close and minimize compute "next active" from the closure's `openApps`/`minimizedApps`. That is correct for single clicks, but fragile.
- `ProjectsApp` controlled/uncontrolled hybrid with an unused fallback path.
- Mixed code styles: semicolons in OS code, none in legacy code.
- No broken imports: the build compiles every reachable module (FACT).

---

## Technical Debt

1. Tailwind class leftovers (H3).
2. Dead legacy site, ~2,000 lines (M11).
3. Content embedded in components and duplicated between the live and dead versions (M14).
4. App registry spread across 3 files.
5. Global CSS monolith with ~13 unused selectors and three duplicate 768 px media blocks.
6. Invalid declaration `max-h: 80vh` in `.desktop-grid` (L2).
7. Deprecated `images.domains`, unused aliases, unused deps (L5, L6).
8. Outdated README (M10).
9. No lint config, no tests, no git history (M9, H4).

---

## Dead Code / Unused Files

Verified by searching for every import, class name and asset path across `components/`, `pages/`, `hooks/`, `data/` and `styles/`:

| Item | Evidence |
|---|---|
| `components/Navbar.jsx`, `Hero.jsx`, `About.jsx`, `Experience.jsx`, `Skills.jsx`, `Projects.jsx`, `ProjectCard.jsx`, `Contact.jsx`, `Footer.jsx` (+ 9 `.module.css`) | not imported by `pages/*` or any live component |
| `hooks/useInView.js` | imported only by the dead components above |
| `hooks/useScrollProgress.js` | imported nowhere |
| `filters` export in `data/projects.js` | imported but unused in `ProjectsApp.jsx`; used only by dead `Projects.jsx` |
| `color` field on projects | read only by dead `ProjectCard.jsx` |
| `Dock` `apps[].color` | never read |
| globals.css: `.active-windows-bar`, `.active-window-pill`, `.tab-close-btn`, `.projects-filter-bar`, `.filter-btn`, `.d-flex`, `.flex-row`, `.items-center`, `.justify-between`, `.justify-center`, `.gap-2`, `.gap-4`, `.flex-1` | no JSX references |
| `public/images/dashboard.png`, `project-placeholder.svg` | no references |
| `public/images/about-bg.jpg` | referenced only by dead `About.jsx` |
| `clsx`, `@types/*` | never imported / no TS |
| `temp_impeccable/`, `.agents/skills/` | tooling leftovers |

Note: the dead components depend on global classes (`.section-label`, `.btn-primary`, `.btn-ghost`) that **no longer exist** in globals.css, so they would not render correctly if re-mounted.

---

## Bugs / Risks

### HIGH

**H1. Vulnerable Next.js version**
- **Location:** `package.json` → `"next": "14.2.3"`
- **Severity:** HIGH (npm audit: critical)
- **Evidence:** `npm audit --omit=dev` lists advisories including GHSA-7gfc-8cq8-jh5f (authorization bypass), GHSA-gp8f-8m3g-qvj9 (cache poisoning), GHSA-4342-x723-ch2f (SSRF via middleware redirect), image-optimizer DoS and injection issues.
- **Impact:** Most advisories target middleware, image optimization, Server Actions or RSC, none of which this site uses, so real exposure is low. A self-hosted `next start` still runs a vulnerable server.
- **Recommendation:** Bump to the latest 14.2.x patch now (drop-in). Plan a move to 15/16 later (see Upgrade Risks). Or switch to `output: 'export'` and host as static files.

**H2. Mobile experience is broken**
- **Location:** `components/Window.jsx` (lines 23–32, `initial x: defaultX`), `components/Dock.jsx` (fixed 60 px icons ×7), `styles/globals.css` (`.os-window-control-btn` 12 px; `html,body{overflow:hidden}`)
- **Severity:** HIGH
- **Evidence:** Runtime at 375×812: the About window starts at x≈100 px with width `innerWidth-32`, so ~70 px overflows the right edge. Its title overlaps the traffic lights. The dock is clipped and the LinkedIn icon is off-screen.
- **Impact:** Many recruiters open portfolios on phones. The first impression there is a broken layout.
- **Recommendation:** On mobile, force windows to `x:16,y:16` (or full-screen sheets), disable dragging, make the dock horizontally scrollable or shrink icons to ~44 px, enlarge the controls, and listen to `resize`.

**H3. Tailwind classes used without Tailwind → broken visuals**
- **Location:** `apps/AboutApp.jsx` `LocalClock` (lines 25–27); `apps/TrashApp.jsx` icons (`fill-none stroke-blue-400 stroke-2` etc.); `apps/ProjectsApp.jsx`, `apps/ContactApp.jsx` icons (`fill-none stroke-current stroke-2`, `stroke-[var(--accent)]`); `Desktop.jsx` (`w-screen h-screen`); `AppIcons.jsx` (`w-full h-full select-none`)
- **Severity:** HIGH
- **Evidence:** No Tailwind dependency or config, and no CSS for these classes (only `svg.w-4/8/10/12` size patches exist). Runtime: the clock shows "01:09:25GMT+5:30 • Kolkata, IN" unstyled in an 18 px body font; the trash icons render as solid black silhouettes.
- **Impact:** Visible polish defects in the primary window. Icons are illegible.
- **Recommendation:** Replace the classes with real CSS rules or SVG attributes (`fill="none" stroke="currentColor" strokeWidth="2"`), or adopt Tailwind deliberately.

**H4. No version control history or remote**
- **Location:** `.git/` (branch `master`, no commits)
- **Severity:** HIGH
- **Evidence:** `git log` → "does not have any commits yet". All files show as untracked.
- **Impact:** No backup or rollback. Nothing to diff against when making changes. The deployment source is unclear.
- **Recommendation:** Fix `.gitignore` (H5) first, then make an initial commit and push to a private or public remote.

**H5. 270 MB abandoned clone inside the repo, not ignored**
- **Location:** `temp_impeccable/.git/objects/pack/tmp_pack_lbjWeQ` (270,065,663 bytes)
- **Severity:** HIGH
- **Evidence:** `temp_impeccable/.git/config` points at `github.com/pbakaus/impeccable`. Only `.git` internals exist (the clone was interrupted). It is not in `.gitignore`.
- **Impact:** `git add .` would try to add a nested repo or embedded gitlink plus huge files, and pushes to GitHub (100 MB file limit) would fail.
- **Recommendation:** Delete the folder (owner decision) or add `temp_impeccable/` to `.gitignore` before the first commit.

### MEDIUM

| ID | Issue | Location | Evidence | Impact | Recommendation |
|---|---|---|---|---|---|
| M1 | Dock LinkedIn link is generic | `Dock.jsx:61` | `url: 'https://linkedin.com'` while ContactApp uses `/in/anubhav-sethi13/` | visitors land on the LinkedIn homepage | use the profile URL; centralize socials |
| M2 | Keyboard and focus inaccessibility | `Desktop.jsx` shortcuts, `ProjectsApp` cards, `TrashApp` cards, `Window` | `motion.div`/`div` with `onClick`, no tabIndex or role; no focus styles; no Esc | site unusable without a mouse; fails WCAG 2.1.1 | use `<button>`, add `:focus-visible`, add dialog roles and Esc |
| M3 | Unassociated form labels | `ContactApp.jsx` 62–95 | `<label className="contact-label">` with no `htmlFor` | screen readers announce unlabeled fields | add `id` and `htmlFor` |
| M4 | Unoptimized images | `public/images/*.png`, `<img>` everywhere | 1920 px PNGs up to 876 KB; fitmart 1572×4096; shown at 60 px | slow Projects window, mobile data cost | `next/image` or pre-built WebP thumbs + `loading="lazy"` |
| M5 | SEO metadata gaps | `pages/index.js` | no og:image/url, Twitter, canonical, robots, sitemap, JSON-LD, h1 | poor link previews and discoverability | add them |
| M6 | Inert custom cursor | `Cursor.jsx`, globals.css | `.cursor`/`.cursor-ring` have no CSS; rAF loop runs continuously | wasted CPU and battery; confusing code | restore the CSS or remove the component |
| M7 | Fonts loaded twice | `globals.css:1` `@import` + `_document.js` `<link>` | duplicate requests; `@import` is render-blocking | slower first paint | keep only `<link>` (or `next/font`) |
| M8 | Stats contradict the experience | `AboutApp.jsx` 240–251 | "4+ Years / 40+ Projects / 25+ Happy Clients" vs first role Aug 2024 and diploma ending 2024 | credibility risk with recruiters | owner to correct or remove |
| M9 | Lint not configured | repo root | `next lint` opens an interactive prompt | no static checks; the build's lint step is a no-op | add `.eslintrc.json` |
| M10 | README outdated | `README.md` | describes Hero/Navbar/Projects-grid structure, Dribbble links, "edit Contact.jsx" | misleads contributors and AI agents | rewrite for the OS architecture |
| M11 | Large dead legacy codebase | 9 components + 9 modules + 2 hooks | zero imports | confusion; edits silently do nothing | archive in a branch or delete (owner decision) |
| M12 | No reduced-motion support | all framer usage, CSS transitions | no `prefers-reduced-motion` / `useReducedMotion` | vestibular-disorder accessibility issue | gate animations |
| M13 | Viewport resize can displace draggable elements | `Desktop.jsx` / `Window.jsx` drag with `dragConstraints` ref | observed once in testing: after a viewport resize all 7 shortcuts had transforms pushing them to the same bottom-right point and the About window was squeezed to 187 px wide (LIKELY framer-motion's constraint rescaling plus Window's one-time size calculation) | layout corruption on window resize or rotation | confirm in a normal browser; recalculate on resize, or avoid ref constraints |
| M14 | Content hardcoded and duplicated | `AboutApp.jsx`, `ContactApp.jsx`, `Dock.jsx`, legacy files | skills/experience exist twice and have already diverged (legacy has extra bullet points) | inconsistent updates | move to `data/*.js` |

### LOW

| ID | Issue | Location |
|---|---|---|
| L1 | Desktop labels truncate ("About & C…", "Contact M…") | `.shortcut-label` (96 px width + 8 px padding) |
| L2 | Invalid CSS property `max-h: 80vh` | `globals.css` `.desktop-grid` |
| L3 | `window.open` without `noopener` | `Dock.jsx` onClick |
| L4 | Hotlinked Unsplash fallback image (privacy, availability) | ProjectsApp, Desktop `onError` |
| L5 | Deprecated `images.domains`; unused `@/` aliases | `next.config.js`, `jsconfig.json` |
| L6 | Unused deps `clsx`, `@types/*` | `package.json` |
| L7 | Unused assets: dashboard.png (434 KB), project-placeholder.svg, about-bg.jpg | `public/images` |
| L8 | Duplicate favicon/manifest tags | `_document.js` and `index.js` |
| L9 | Decorative wallpaper has alt text "Background Wallpaper" | `Desktop.jsx:136` |
| L10 | Global `user-select:none` blocks copying the email and other text | `globals.css` html, body |
| L11 | Minimize has no animation; maximize state lost on reopen | `Window.jsx`, `Desktop.jsx` |
| L12 | Blockchain project "live" link is a CodeHS sandbox URL (fragile) | `data/projects.js` id 6 |
| L13 | Duplicate SVG gradient IDs (each icon rendered twice) | `AppIcons.jsx` |
| L14 | Breakpoint off-by-one (JS `<768` vs CSS `≤768`) and size computed only on mount | `Window.jsx` |
| L15 | Contact shows the success state even if no mail client opens | `ContactApp.jsx` |

### INFO
- **I1.** `.impeccable` critique (2026-08-12) says the error dialog opens by default. The current code opens only About, so that point is stale. Its label-truncation and nested-scroll findings remain partly valid.
- **I2.** `scripts/generate_favicons.py` depends on `temp_fonts/syne-800.ttf`, fontTools and Pillow, none of which are in the repo. The script cannot be re-run as-is.
- **I3.** `.agents/skills/` is empty.

---

## Missing Features

- Real contact delivery (form backend or a service such as Formspree or Resend) with spam protection.
- Deep links / URL state for apps and projects.
- A mobile-specific mode.
- Project filtering (existed in the legacy version).
- Light mode (only if desired).
- Analytics (none).
- A custom 404.
- Tests (even a smoke test).

---

## Deployment Analysis

- The build is fully static (○), so it can be deployed on Vercel (README), Netlify, GitHub Pages (`output:'export'`) or any static host.
- There is no deployment config, CI or env. The actual production URL is **UNKNOWN**: there is no `og:url`, canonical or `homepage` field.
- The `.next/` present before analysis was a dev build. It was overwritten by the verification `npm run build` (gitignored, safe).

## Git / History Analysis

- `.git` exists on branch `master` with **no commits and no remote**. All files are untracked.
- Indirect timeline from file modification times (LIKELY):
  - **Apr 26 2026:** project scaffolded (package.json, README, configs).
  - **Jun 26–29:** project screenshots and about-bg added.
  - **Jul 23:** profile photo added.
  - **Aug 5:** résumé added.
  - **Aug 12–13:** OS redesign work and the Impeccable critique (`.impeccable`, `temp_impeccable`, components).
  - **Oct 3:** favicons regenerated by the Python script.
- Abandoned work: the legacy scrolling site, the active-window pill taskbar, the project filter bar, the custom cursor CSS, and the Impeccable clone.

---

## Strengths

- A distinctive, memorable concept, executed with care (traffic lights, dock magnification physics, glassmorphism, live clock, playful copy).
- Simple, understandable state model: one owner and predictable handlers.
- Title-bar drag via `dragControls`, so window content stays interactive.
- Small bundle, static output, clean successful build.
- A coherent brand: lime accent, Syne/DM Sans, a matching "AS." favicon and splash.
- Projects are data-driven with sensible fallbacks.
- No secrets and no risky HTML.

## Weaknesses

- Broken on mobile.
- Styling inconsistency (Tailwind leftovers, inline styles, a token bypass).
- Accessibility and SEO gaps.
- Unoptimized assets.
- Dead code and an outdated README.
- No version control history, lint or tests.
- An outdated and vulnerable framework version.

---

## Critical Issues

None at CRITICAL by this report's assessment. H1 (Next.js advisories) is flagged *critical* by `npm audit` and should be treated as the first fix.

## Medium Priority Issues

M1–M14 (see the table above).

## Low Priority Issues

L1–L15 (see the table above).

---

## Recommended Improvements

1. **Housekeeping (½ day):** ignore or delete `temp_impeccable/`, make the first commit, add an ESLint config, patch Next within 14.2.x, fix the Dock LinkedIn URL, remove the duplicate font import.
2. **Visual fixes (½ day):** replace the Tailwind remnants with CSS or SVG attributes; fix label truncation; style or remove the cursor.
3. **Mobile (1–2 days):** full-screen sheet windows, a compact dock, larger controls, resize handling.
4. **Content (½ day):** move the content to `data/`; build a single app registry; correct the stats; centralize socials and email.
5. **A11y and SEO (1 day):** semantic buttons, focus styles, labels, dialog roles and Esc, reduced motion, og:image/Twitter/canonical/JSON-LD/sitemap/robots, an h1.
6. **Performance (½ day):** WebP thumbnails, lazy loading, crop fitmart, a local fallback image.
7. **Cleanup:** archive the legacy components in a branch; remove unused CSS, assets and deps; rewrite the README.

## Recommended Modernization Strategy

- **Phase 1 – Stabilize** on Next 14 (the items above). Low risk.
- **Phase 2 – Upgrade:** Next 15 → 16 with React 19, swap `framer-motion` for `motion` (`motion/react`), add `next/font`, `next/image` and `output:'export'` if static hosting is enough, and replace `next lint` with the ESLint CLI.
- **Phase 3 – Structure:** a data-driven `apps` registry, a `components/os/` folder for the shell, `data/` for content, CSS Modules or a single, deliberate utility framework, and optional TypeScript (the types are already installed).
- **Phase 4 – Features:** deep linking, a form backend, analytics, a mobile mode, persisted icon positions.

## Upgrade Risks

| Change | Risk |
|---|---|
| Next 14 → 15/16 | requires React 19; `images.domains` removed; `next lint` removed in 16; caching defaults changed (irrelevant for a static page) |
| React 19 | framer-motion 11 is not officially compatible; upgrade to `motion` ≥12 |
| motion upgrade | retest `useDragControls` / `dragListener={false}`, `dragConstraints` ref behaviour, AnimatePresence exit, the width-to-'100%' maximize animation |
| Adding Tailwind | preflight overrides; dormant classes (`w-screen h-screen`, `text-xl`) suddenly apply and change layouts; conflicts with the `svg.w-* !important` patches |
| App Router migration | every component is interactive and needs `'use client'`; `_document` fonts/head move to `layout.js` metadata |
| Removing `overflow:hidden`/`user-select:none` | changes the desktop illusion; drag text-selection artefacts |

## Preservation Recommendations

Keep these in any redesign:

- The OS metaphor and its interaction semantics (focus/raise, dock toggle-minimize, featured-project shortcuts that open the detail view).
- The lime `#C8F04E` accent and the dark palette, Syne and DM Sans, the "AS." logo and favicon set.
- The playful copy ("Bin of Ideas", the compiler-error joke), which carries a lot of the personality.
- The `data/projects.js` schema, the résumé path, the social URLs and the email.
- Dock magnification physics and title-bar-only dragging.

Replace or rework: mobile layout, Tailwind remnants, inline-style hover handlers, the hardcoded window registry, the image pipeline, the legacy components, and the README.

## Final Verdict

A **creative and largely well-built desktop experience** on a small, sound technical base: static Next.js, no backend, a tiny bundle. It is **not production-ready for all visitors**. Mobile is broken, several visual details are unstyled, accessibility and SEO are weak, and the framework version carries known advisories. All of these are fixable without changing the architecture. With roughly 3–5 days of focused work (stabilize, fix mobile and visuals, clean up dead code, add a11y and SEO), this would be a strong, distinctive portfolio. The first actions should be making a git commit (after ignoring `temp_impeccable/`) and patching Next.js.
