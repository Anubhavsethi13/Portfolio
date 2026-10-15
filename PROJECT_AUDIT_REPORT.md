# Comprehensive Project Audit, Code Optimization & Architecture Report

**Project:** Anubhav Sethi — Portfolio (macOS Interactive Desktop Experience)  
**Date of Audit:** October 15, 2026  
**Auditor:** Senior Software Architect, Code Auditor, Performance Engineer & Repository Quality Analyst  
**Repository Working Tree:** `main` (clean baseline with uncommitted / untracked staging additions)  
**Verification Runtimes:** Node.js v20+, Next.js 14.2.3, React 18.3.1  

---

## A. Executive Summary

### 1. Project Purpose & Structure
This repository contains the personal portfolio website for **Anubhav Sethi**, a Full-Stack Developer and Software Engineer. The application is built using **Next.js 14 (Pages Router)** and **React 18**, styled with custom CSS variables and CSS modules, and animated using **Framer Motion**. 

The core user experience is an interactive, browser-based simulation of **macOS Desktop**:
- A top macOS system menu bar (`Navbar.jsx`) with live Kolkata/IST time, Apple menu dropdown actions, and quick navigation triggers.
- A draggable window manager (`Desktop.jsx`, `Window.jsx`) rendering multi-tasking desktop application windows:
  - **About & CV (`AboutApp.jsx`)**: Tabbed profile detailing bio, work experience, academic history, technical skills, verified certifications, milestones, extracurriculars, personal interests, and an embedded PDF viewer.
  - **Projects Browser (`ProjectsApp.jsx`)**: Grid showcase with modal detail cards and deep links to standalone routes.
  - **Mail Client (`ContactApp.jsx`)**: Contact composer generating formatted `mailto:` links with pre-filled inquiries.
  - **Compiler Warning (`ErrorApp.jsx`)**: Playful error dialog.
  - **Bin of Ideas (`TrashApp.jsx`)**: Interactive trash can playground displaying code drafts and design snippets.
- An interactive macOS dock (`Dock.jsx`) featuring authentic spring-physics magnification on hover via Framer Motion transforms.
- Standalone multi-page static routes:
  - `/resume`: Dedicated fullscreen curriculum vitae viewer.
  - `/projects/[slug]`: Statically generated detail pages (SSG) for 9 individual projects.

### 2. Overall Codebase Health
- **Strengths:** 
  - Production static build (`npm run build`) compiles successfully with all 13 pages statically generated.
  - Zero database or backend dependencies, facilitating static export and zero-maintenance hosting.
  - Clean visual design system implemented with CSS custom properties (`globals.css`) supporting dark and light themes.
  - Modular project data schema recently extracted into `data/*.js`.
- **Primary Liabilities:**
  - **Critical Security Exposure:** `next@14.2.3` and transitive dependencies contain 4 reported vulnerabilities (1 Critical, 3 High) covering remote code execution on Windows hosts, SSRF, DoS, and cache poisoning.
  - **PII Privacy Leak Risk:** The full, private curriculum vitae (`public/Anubhav_Sethi_Resume.pdf`, 1.88 MB) containing personal phone numbers is located directly inside the web-accessible `public/` directory.
  - **Extensive Dead Code & Abandoned Branches:** 16 unimported React components, 9 orphaned CSS modules, and 10 redundant SVG icons exist in the project, creating over 125 KB of dead code and confusing repository navigation.
  - **Inert CPU Drain:** An unstyled custom cursor component (`Cursor.jsx`) mounts on the home page, executing an unthrottled `requestAnimationFrame` loop 60–120 times per second while rendering invisible 0×0 elements.
  - **Broken Verification Tooling:** `npm run lint` fails in non-interactive environments because no ESLint configuration file exists.

### 3. Most Important Findings & Top Optimization Opportunities
1. **Remediate Critical Security Vulnerabilities:** Upgrade `next` from `14.2.3` to the latest secure patch within the Next 14 line (`14.2.35+`) to resolve known RCE, SSRF, and DoS vulnerabilities.
2. **Eliminate PII Exposure:** Move private, un-sanitized PDF documents out of `public/` into an ignored private archive, ensuring only the public sanitized PDF is web-accessible.
3. **Deactivate or Repair the Custom Cursor:** Eliminate the infinite `requestAnimationFrame` loop in `Cursor.jsx` to prevent continuous CPU and battery drain.
4. **Purge 16 Dead Components & 9 Unused CSS Modules:** Segregate or remove legacy scrolling site components (`Hero.jsx`, `Projects.jsx`, `Contact.jsx`, etc.) and orphaned prototype sections (`*Section.jsx`).
5. **Optimize Asset Loading & Font Delivery:** Eliminate double Google Font requests (CSS `@import` + HTML `<link>`) and replace raw 3.7 MB PNG images with modern WebP/AVIF formats via Next.js image optimization.

### 4. Major Limitations of the Audit
- Dynamic runtime profiling was conducted under Node.js / Next.js local development and static build targets; real-world edge CDN metrics (Cloudflare/Vercel) were not measured.
- No automated unit or integration tests exist in the repository (`tests/` directory is empty), requiring regression testing to be verified manually via browser inspection.

---

## B. Project Inventory

### 1. Technology Stack
- **Framework:** Next.js `14.2.3` (Pages Router)
- **UI Library:** React `18.3.1`, React DOM `18.3.1`
- **Animation Engine:** Framer Motion `11.2.10`
- **Styling:** Global CSS (`styles/globals.css`, 1,420 lines) + Component-scoped CSS Modules
- **Data Layer:** In-memory ES Module exports (`data/*.js`)
- **Language:** JavaScript (ES6+, JSX) — No TypeScript compiler configured
- **Package Manager:** npm (with `package-lock.json` v3)
- **Deployment Model:** SSG (Static Site Generation)

### 2. Complete Directory Structure
```
d:/Claude/Portfolio - Mac - New/
├── .gitignore                      # Git exclusion rules
├── BRAIN.md                        # Project technical context & architectural notes
├── PORTFOLIO_ANALYSIS_REPORT.md    # Historical project analysis document
├── PROJECT_MAP.md                  # Component & route reference map
├── README.md                       # Repository overview & setup instructions
├── jsconfig.json                   # Path alias mappings (@/components, @/data, etc.)
├── next.config.js                  # Next.js configuration (reactStrictMode: true)
├── package.json                    # Project metadata & dependency declarations
├── package-lock.json               # Deterministic dependency lockfile
├── components/
│   ├── About.jsx                   # [DEAD] Legacy scrolling about component
│   ├── About.module.css            # [DEAD] Legacy about styles
│   ├── AboutSection.jsx            # [DEAD] Untracked V2 section prototype
│   ├── AchievementsSection.jsx     # [DEAD] Untracked V2 section prototype
│   ├── AppIcons.jsx                # [ACTIVE] Inlined SVG icon set for desktop & dock
│   ├── CertificatesSection.jsx     # [DEAD] Untracked V2 section prototype
│   ├── Contact.jsx                 # [DEAD] Legacy scrolling contact component
│   ├── Contact.module.css          # [DEAD] Legacy contact styles
│   ├── ContactSection.jsx          # [DEAD] Untracked V2 section prototype
│   ├── Cursor.jsx                  # [ACTIVE - DEFECTIVE] Inert rAF custom cursor loop
│   ├── Desktop.jsx                 # [ACTIVE] Window manager, desktop shortcuts & layout state
│   ├── Dock.jsx                    # [ACTIVE] Interactive magnifying dock
│   ├── EducationSection.jsx        # [DEAD] Untracked V2 section prototype
│   ├── Experience.jsx              # [DEAD] Legacy scrolling experience component
│   ├── Experience.module.css       # [DEAD] Legacy experience styles
│   ├── ExperienceSection.jsx       # [DEAD] Untracked V2 section prototype
│   ├── Footer.jsx                  # [DEAD] Legacy scrolling footer component
│   ├── Footer.module.css           # [DEAD] Legacy footer styles
│   ├── FooterSection.jsx           # [DEAD] Untracked V2 section prototype
│   ├── Hero.jsx                    # [DEAD] Legacy scrolling hero component
│   ├── Hero.module.css             # [DEAD] Legacy hero styles
│   ├── IntroLoader.jsx             # [ACTIVE] MacBook boot-up splash preloader
│   ├── IntroLoader.module.css      # [ACTIVE] Splash preloader styles
│   ├── Navbar.jsx                  # [ACTIVE] macOS top menu bar
│   ├── Navbar.module.css           # [ACTIVE] Menu bar styles
│   ├── ProjectCard.jsx             # [DEAD] Legacy card imported only by Projects.jsx
│   ├── ProjectCard.module.css      # [DEAD] Legacy card styles
│   ├── Projects.jsx                # [DEAD] Legacy scrolling projects component
│   ├── Projects.module.css         # [DEAD] Legacy projects styles
│   ├── ProjectsSection.jsx         # [DEAD] Untracked V2 section prototype
│   ├── Skills.jsx                  # [DEAD] Legacy scrolling skills component
│   ├── Skills.module.css           # [DEAD] Legacy skills styles
│   ├── SkillsSection.jsx           # [DEAD] Untracked V2 section prototype
│   ├── Window.jsx                  # [ACTIVE] Draggable, resizable macOS window frame
│   └── apps/
│       ├── AboutApp.jsx            # [ACTIVE] Tabbed profile window content
│       ├── ContactApp.jsx          # [ACTIVE] Contact mailto form window content
│       ├── ErrorApp.jsx            # [ACTIVE] Easter-egg warning modal window content
│       ├── ProjectsApp.jsx         # [ACTIVE] Projects gallery & detail viewer content
│       └── TrashApp.jsx            # [ACTIVE] Playground code viewer content
├── data/
│   ├── achievements.js             # Key engineering milestones data
│   ├── certifications.js           # Verified professional certifications data
│   ├── contributions.js            # Extracurricular & community contributions data
│   ├── education.js                # Academic institutions & qualifications data
│   ├── experience.js               # Professional employment & internship data
│   ├── profile.js                  # Personal bio, philosophies, location & resume refs
│   ├── projects.js                 # 9 engineering projects schema & filter metadata
│   ├── skills.js                   # Categorized technical toolkit & proficiencies
│   └── social.js                   # [DEAD] Unimported centralized social media links
├── docs/                           # Architectural roadmaps, PRD, & migration specifications
│   └── docs.zip                    # [REDUNDANT] 60 KB archive file tracked in git root
├── hooks/
│   ├── useInView.js                # [DEAD] IntersectionObserver hook (used only by dead code)
│   ├── useScrollProgress.js        # [DEAD] Unimported scroll tracking hook
│   └── useTheme.js                 # [ACTIVE] Dark/light theme switcher hook
├── pages/
│   ├── _app.js                     # Next.js custom application wrapper (imports globals.css)
│   ├── _document.js                # Custom HTML document wrapper (font links & favicons)
│   ├── index.js                    # Home route: renders macOS desktop simulation
│   ├── resume.js                   # Route /resume: Fullscreen PDF curriculum vitae viewer
│   └── projects/
│       └── [slug].js               # Route /projects/[slug]: Prerendered SSG project detail
├── public/
│   ├── Anubhav_Sethi_Resume.pdf    # [PRIVACY RISK] 1.88 MB un-sanitized private resume
│   ├── android-chrome-*.png        # PWA icons
│   ├── apple-touch-icon.png        # iOS home screen icon
│   ├── favicon*.png, favicon.ico   # Multi-resolution favicons
│   ├── favicon.svg                 # Vector favicon
│   ├── site.webmanifest            # PWA manifest
│   ├── icons/                      # [DEAD] 10 unreferenced standalone SVG files
│   ├── images/                     # Project screenshots & wallpaper (3.7 MB total)
│   └── resume/
│       └── Anubhav_Sethi_Resume_Public.pdf # Sanitized public resume (1.25 MB)
├── resume/
│   └── Resume.pdf                  # [PRIVATE] Duplicate 1.88 MB private resume
├── scripts/
│   └── generate_favicons.py        # Standalone Python script for favicon rendering
├── styles/
│   └── globals.css                 # Master stylesheet with theme variables & desktop styles
└── tests/                          # Empty directory (no automated test suite)
```

### 3. Dependencies & Configuration Summary
| Package | Version | Type | Usage Status | Audit / Vulnerability Status |
|---|---|---|---|---|
| `next` | `14.2.3` | Production | Core Framework | ⚠ 1 Critical, 3 High advisories |
| `react` | `^18` (`18.3.1`) | Production | Active UI | Clean |
| `react-dom` | `^18` (`18.3.1`) | Production | Active UI | Clean |
| `framer-motion` | `^11.2.10` | Production | Active Animations | Clean |
| `clsx` | `^2.1.1` | Production | **Completely Unused** | Clean |
| `@types/node` | `^20` | Dev | IntelliSense only (no TS) | Clean |
| `@types/react` | `^18` | Dev | IntelliSense only (no TS) | Clean |
| `@types/react-dom` | `^18` | Dev | IntelliSense only (no TS) | Clean |
| `eslint` | `^8` | Dev | **Unconfigured** | Clean |
| `eslint-config-next` | `14.2.3` | Dev | **Unconfigured** | Clean |

---

## C. Architecture Review

### 1. Architectural Model & Responsibilities
The project operates as a hybrid between an **Interactive OS Simulation** (on route `/`) and a **Static Content Site** (on routes `/resume` and `/projects/[slug]`):
- **State Hub (`Desktop.jsx`)**: Manages the window manager stack (`openApps`, `minimizedApps`, `activeApp`, `appStack`), desktop shortcut drag positions, and desktop-level custom events.
- **Window Chrome (`Window.jsx`)**: Encapsulates window controls (close, minimize, maximize), title-bar dragging via Framer Motion `useDragControls`, responsive dimensional constraints, and z-index elevation.
- **Application Apps (`components/apps/*`)**: Self-contained UI views rendering specific domain data passed via `data/*.js`.
- **Global Event Bus**: Communication between `Navbar.jsx` (menu bar clicks) and `Desktop.jsx` is mediated through DOM CustomEvents (`open-mac-app`, `mac:show-desktop`).

### 2. Dependency Direction & Coupling Concerns
- **Event Bus Decoupling vs. Re-render Churn:** While using CustomEvents cleanly decouples `Navbar.jsx` from `Desktop.jsx`, `Desktop.jsx` re-registers these window listeners whenever `openApps`, `minimizedApps`, or `appStack` changes due to an over-specified dependency array in `useEffect`.
- **Dual-State Duplication in `AboutApp.jsx`:** `AboutApp.jsx` maintains its own `internalTab` state while simultaneously receiving `selectedTab` and `onTabChange` from `Desktop.jsx`. Clicking tabs updates both states, risking state synchronization drift.
- **Theme State Fragmentation:** `useTheme.js` maintains independent local state in each component where it is invoked. Toggling the theme from `Navbar.jsx` updates DOM `data-theme` and `localStorage`, but any other component calling `useTheme()` would not react to the state change without a unified React Context.
- **Monolithic Page Bundle on Route `/`:** All five OS applications and their associated data structures are statically imported into `Desktop.jsx`, forcing the browser to download code for unopened windows on initial load.

---

## D. Code Quality Findings

| ID | Severity | File | Finding | Evidence | Recommendation | Effort |
|---|---|---|---|---|---|---|
| **CQ-01** | **Critical** | `package.json:12` | Critical and High security vulnerabilities in `next@14.2.3` | `npm audit --omit=dev` reports 1 Critical (Next.js RCE, SSRF, DoS, Cache Poisoning) and 3 High vulnerabilities (PostCSS, nanoid, source-map-js). | Upgrade `next` to latest 14.2.x patch (`14.2.35+`) and test build. | Low |
| **CQ-02** | **High** | `public/Anubhav_Sethi_Resume.pdf` | PII privacy exposure: un-sanitized private resume located in web root | File size is 1,884,109 bytes, identical to `resume/Resume.pdf`. Contains private phone numbers and is directly downloadable via URL. | Delete `public/Anubhav_Sethi_Resume.pdf` from the web root; retain only the sanitized `public/resume/Anubhav_Sethi_Resume_Public.pdf`. | Low |
| **CQ-03** | **High** | `components/Cursor.jsx:21-52` | Inert CPU-draining animation loop | `Cursor.jsx` runs `requestAnimationFrame` continuously at 60–120fps updating DOM styles on classes `.cursor` and `.cursor-ring`, which have zero CSS rules in `globals.css`. | Deactivate/remove `Cursor.jsx` from `pages/index.js` or restore missing CSS styles. | Low |
| **CQ-04** | **Medium** | `package.json:9` | Missing ESLint configuration causes lint command failure | `npm run lint` invokes `next lint` which exits with code 1 in non-interactive mode because `.eslintrc.json` is missing. | Add `.eslintrc.json` configuring `eslint-config-next`. | Low |
| **CQ-05** | **Medium** | `styles/globals.css:1`, `pages/_document.js:9-12` | Duplicate Google Font loading creating render waterfall | Google Fonts are loaded via `<link>` in `_document.js` AND via `@import url(...)` in `globals.css:1`. | Remove `@import` from `globals.css`; migrate to Next.js `next/font/google`. | Low |
| **CQ-06** | **Medium** | `components/Desktop.jsx:75` | Excessive teardown and re-registration of window event listeners | `useEffect` for `open-mac-app` and `mac:show-desktop` includes `[openApps, minimizedApps, appStack]` in dependency array. | Use functional state setters or refs to keep listener registration stable across window focus/drag actions. | Medium |
| **CQ-07** | **Medium** | `components/About.jsx`, `components/Hero.jsx`, etc. (16 files) | 16 completely unimported and orphaned React components | Node AST scanner confirms 8 legacy components and 8 V2 section prototypes are never imported by any active page. | Archive or remove dead legacy and prototype components from the active bundle tree. | Medium |
| **CQ-08** | **Medium** | `components/Dock.jsx:154`, `components/Window.jsx:79` | Missing accessibility labels on interactive icon buttons | `<motion.button>` in `Dock.jsx` and window control buttons in `Window.jsx` have tooltips/titles but lack `aria-label`. | Add descriptive `aria-label` attributes to all icon-only buttons. | Low |
| **CQ-09** | **Medium** | `components/apps/ContactApp.jsx:62-95` | Form inputs not programmatically associated with labels | `<label className="contact-label">` elements lack `htmlFor` attributes matching `<input id="...">`. | Add corresponding `id` and `htmlFor` attributes to form elements. | Low |
| **CQ-10** | **Low** | `package.json:16` | Unused production dependency `clsx` | `clsx` is installed in `dependencies` but has zero import statements across the entire project. | Remove `clsx` from `package.json` or use it to clean up string-concatenated classNames. | Low |
| **CQ-11** | **Low** | `components/AppIcons.jsx:8,21,57` | Duplicate SVG element IDs across multiple icon instances | SVG `<defs>` use hardcoded IDs (`aboutBg`, `projectsBg`, etc.). Icons rendered in both Desktop and Dock duplicate these IDs in the DOM. | Generate unique IDs using React `useId()` or externalize icons. | Medium |
| **CQ-12** | **Low** | `data/social.js` | Disconnected central data module | `data/social.js` exports `socialLinks`, but `ContactApp.jsx` and `Dock.jsx` hardcode their own duplicate social link arrays. | Import `socialLinks` from `data/social.js` in `ContactApp.jsx` and `Dock.jsx`. | Low |
| **CQ-13** | **Low** | `hooks/useTheme.js:14` | Redundant ternary expression | Line 14: `const initial = prefersDark ? 'dark' : 'dark';` always evaluates to `'dark'`. | Simplify to `const initial = 'dark';`. | Low |
| **CQ-14** | **Low** | `pages/projects/[slug].js:45-80`, `pages/resume.js:25-60` | Duplicate macOS navigation header markup | Standalone pages re-implement identical 40-line sticky header markup rather than reusing `Navbar.jsx`. | Parameterize `Navbar.jsx` with an `isStandalone` prop and reuse it across pages. | Medium |
| **CQ-15** | **Low** | `pages/index.js:19-24` | Duplicate favicon `<link>` tags | `pages/index.js` duplicates favicon and manifest tags that are already globally declared in `pages/_document.js`. | Remove redundant favicon `<link>` tags from `pages/index.js`. | Low |

---

## E. Performance Review

### 1. Measured Build Metrics
Measured from production build command (`npm run build`):

```
Route (pages)                                          Size     First Load JS
┌ ○ / (Static prerendered)                             66 kB           147 kB
├   └ css/4dbedb4bf3331c04.css                         1.28 kB
├   /_app                                              0 B            78.2 kB
├ ○ /404                                               180 B          78.4 kB
├ ● /projects/[slug] (SSG - 9 dynamic paths)           2.27 kB          83 kB
└ ○ /resume                                            1.49 kB        82.2 kB
+ First Load JS shared by all                          82.8 kB
  ├ chunks/framework-ecc4130bc7a58a64.js               45.2 kB
  ├ chunks/main-48a2be0192cdda09.js                    32 kB
  └ other shared chunks (total)                        5.66 kB
```

### 2. Identified Performance Bottlenecks
1. **Unsplit Desktop Route (`147 kB First Load JS`):**
   - The desktop workspace statically bundles all five application views (`AboutApp`, `ProjectsApp`, `ContactApp`, `ErrorApp`, `TrashApp`) into the initial JavaScript bundle for `/`.
   - Users who visit the site only to view the profile or a single project still pay the bandwidth and parse cost for all apps, including full embedded SVG strings and formatting logic.
2. **Double Google Font Network Waterfall:**
   - `pages/_document.js` links to `fonts.googleapis.com` and `fonts.gstatic.com`.
   - `styles/globals.css:1` contains `@import url('https://fonts.googleapis.com/css2?...');`.
   - When the browser downloads `globals.css`, it halts CSS parsing to fetch the imported Google stylesheet, creating a serial network waterfall that delays First Contentful Paint (FCP).
3. **Unoptimized Static Image Assets (3.7 MB):**
   - Project screenshots (`officeflow.png` [875 KB], `fitmart.png` [728 KB], `money-heist-ctf.png` [684 KB]) and profile wallpaper (`profile.jpg` [158 KB]) are loaded as raw, uncompressed files.
   - Images are rendered using standard HTML `<img>` elements rather than `next/image`, bypassing automated WebP/AVIF format negotiation, responsive viewport resizing, and lazy loading.
4. **Infinite CPU Animation Loop (`Cursor.jsx`):**
   - `Cursor.jsx` attaches an unthrottled `requestAnimationFrame` loop that runs continuously even when the user is idle, calculating `rx += (mx - rx) * 0.12` and executing inline DOM style writes on invisible elements.
5. **Redundant Clock Intervals:**
   - `Navbar.jsx` runs an interval every 1,000ms calculating Kolkata time.
   - `AboutApp.jsx` (`LocalClock`) runs an identical interval every 1,000ms calculating Kolkata time.
   - When `AboutApp` is open, two separate timers update state every second on the main thread.

---

## F. File and Asset Review

### 1. Classification of Potentially Redundant Files

| File Path | Size | Status | Evidence & Verification Notes |
|---|---|---|---|
| `components/Hero.jsx` + `Hero.module.css` | 7.0 KB | **Confirmed Redundant** | Legacy scrolling hero; never imported by any active page or component. |
| `components/About.jsx` + `About.module.css` | 21.7 KB | **Confirmed Redundant** | Legacy scrolling about; superseded by `components/apps/AboutApp.jsx`. |
| `components/Experience.jsx` + `Experience.module.css` | 9.3 KB | **Confirmed Redundant** | Legacy scrolling experience; superseded by `AboutApp.jsx`. |
| `components/Skills.jsx` + `Skills.module.css` | 5.5 KB | **Confirmed Redundant** | Legacy scrolling skills; superseded by `AboutApp.jsx`. |
| `components/Projects.jsx` + `Projects.module.css` | 3.7 KB | **Confirmed Redundant** | Legacy scrolling projects; superseded by `ProjectsApp.jsx`. |
| `components/ProjectCard.jsx` + `ProjectCard.module.css` | 5.8 KB | **Confirmed Redundant** | Imported only by dead `Projects.jsx`. |
| `components/Contact.jsx` + `Contact.module.css` | 3.9 KB | **Confirmed Redundant** | Legacy scrolling contact; superseded by `ContactApp.jsx`. |
| `components/Footer.jsx` + `Footer.module.css` | 2.8 KB | **Confirmed Redundant** | Legacy scrolling footer; not imported by any active page. |
| `components/AboutSection.jsx` | 8.8 KB | **Confirmed Redundant** | Untracked V2 section prototype; unimported by all routes. |
| `components/AchievementsSection.jsx` | 6.4 KB | **Confirmed Redundant** | Untracked V2 section prototype; unimported by all routes. |
| `components/CertificatesSection.jsx` | 5.5 KB | **Confirmed Redundant** | Untracked V2 section prototype; unimported by all routes. |
| `components/ContactSection.jsx` | 12.3 KB | **Confirmed Redundant** | Untracked V2 section prototype; unimported by all routes. |
| `components/EducationSection.jsx` | 9.0 KB | **Confirmed Redundant** | Untracked V2 section prototype; unimported by all routes. |
| `components/ExperienceSection.jsx` | 10.1 KB | **Confirmed Redundant** | Untracked V2 section prototype; unimported by all routes. |
| `components/FooterSection.jsx` | 3.1 KB | **Confirmed Redundant** | Untracked V2 section prototype; unimported by all routes. |
| `components/ProjectsSection.jsx` | 10.4 KB | **Confirmed Redundant** | Untracked V2 section prototype; unimported by all routes. |
| `components/SkillsSection.jsx` | 5.5 KB | **Confirmed Redundant** | Untracked V2 section prototype; unimported by all routes. |
| `hooks/useInView.js` | 546 B | **Confirmed Redundant** | IntersectionObserver hook used exclusively by dead legacy components. |
| `hooks/useScrollProgress.js` | 484 B | **Confirmed Redundant** | Scroll progress hook with zero import references in workspace. |
| `public/icons/*.svg` (10 files) | ~23 KB | **Confirmed Redundant** | Standalone icons completely unused; `AppIcons.jsx` inlines all SVG icons. |
| `public/images/dashboard.png` | 433.8 KB | **Confirmed Redundant** | Screenshot asset with zero references in data, CSS, or components. |
| `public/images/about-bg.jpg` | 232.8 KB | **Confirmed Redundant** | Image asset referenced only by dead `components/About.jsx`. |
| `public/images/project-placeholder.svg` | 297 B | **Confirmed Redundant** | Placeholder asset with zero references across project. |
| `docs.zip` | 60.7 KB | **Confirmed Redundant** | Redundant compressed archive committed to git root. |
| `temp_impeccable/` | 270.0 MB | **Confirmed Redundant** | Abandoned temporary git clone; already gitignored, consumes local disk space. |

---

## G. Dependency and Security Review

### 1. Vulnerability Findings (`npm audit`)
Running `npm audit --omit=dev` identified **4 production-affecting vulnerabilities** (1 Critical, 3 High):
1. **`next` (`<=14.2.3` / `0.9.9 - 16.3.0-preview.10`): CRITICAL**
   - **Advisories:**
     - GHSA-p293-qw3h-jr36: Unauthenticated Remote Code Execution on Windows-hosted servers.
     - GHSA-2xp9-vwfh-vxw4: Unauthenticated Remote Code Execution in Image Optimization API when AVIF files are used.
     - GHSA-89xv-2m56-2m9x / GHSA-p9j2-gv94-2wf4: Server-Side Request Forgery (SSRF) in Server Actions / rewrites.
     - GHSA-gp8f-8m3g-qvj9: Next.js Cache Poisoning.
     - GHSA-g77x-44xx-532m / GHSA-7m27-7ghc-44w9: Denial of Service conditions.
   - **Remediation:** Update `next` to `14.2.35` or higher in `package.json`.
2. **`postcss` (`<=8.5.22`): HIGH**
   - **Advisories:**
     - GHSA-qx2v-qp2m-jg93: Cross-Site Scripting via unescaped `</style>` tags.
     - GHSA-r28c-9q8g-f849: Path traversal in previous source map auto-loading leading to arbitrary file read.
   - **Remediation:** Resolved by upgrading `next` to a patched release.
3. **`nanoid` (`<=3.3.17`): HIGH**
   - **Advisories:** GHSA-28wg-ghj8-5hjv / GHSA-2v37-7h3g-55p8: Non-secure generator infinite loop vulnerabilities.
   - **Remediation:** Resolved via `npm update nanoid` or updating `next`.
4. **`source-map-js` (`1.0.0 - 1.2.1`): HIGH**
   - **Advisories:** GHSA-68fv-2mgg-jv7q: Event loop Denial of Service through indexed source-map section offsets.
   - **Remediation:** Resolved via `npm audit fix`.

### 2. Dependency Hygiene
- **`clsx` (`^2.1.1`):** Installed under `dependencies` but unreferenced anywhere in active or dead code.
- **`@types/*` packages:** `@types/node`, `@types/react`, `@types/react-dom` are installed in `devDependencies`. The codebase contains zero `.ts` or `.tsx` files, and no `tsconfig.json` exists. These packages provide editor IntelliSense only.

---

## H. Build, Tests, and Verification Results

### Executed Commands & Outcomes

1. **`git status`**
   - **Command:** `git status`
   - **Result:** Exit Code 0. Branch `main`. Modified files: 15. Untracked files: 24 (including `components/*Section.jsx`, `data/*.js`, `pages/projects/`, `pages/resume.js`).
   - **Limitation:** Repository contains uncommitted staging modifications.

2. **`npm audit --omit=dev`**
   - **Command:** `npm audit --omit=dev`
   - **Result:** Exit Code 1. Found 4 vulnerabilities (3 High, 1 Critical) affecting `next`, `postcss`, `nanoid`, and `source-map-js`.

3. **`npm run lint`**
   - **Command:** `npm run lint` (`next lint`)
   - **Result:** Exit Code 1. Interactive prompt triggered due to missing `.eslintrc` configuration file.

4. **`npm run build`**
   - **Command:** `npm run build` (`next build`)
   - **Result:** Exit Code 0. Production build succeeded.
   - **Compilation:** Prerendered 13 static pages (1 static home route, 1 404 route, 1 resume route, 9 SSG project detail routes, 1 shared bundle).
   - **Bundle Output:** Route `/` = 66 kB page JS (147 kB First Load JS).

5. **`npm test`**
   - **Command:** N/A (no test script configured in `package.json`; `tests/` directory is empty).

---

## I. Optimization Opportunities

### 1. Safe, Low-Risk Cleanup
- **Remove Unused `clsx`:** Remove `"clsx": "^2.1.1"` from `package.json` to reduce lockfile and dependency footprint.
- **Eliminate Duplicate Favicon Tags:** Delete lines 19–24 of `pages/index.js` which duplicate global tags in `pages/_document.js`.
- **Simplify `useTheme` Logic:** Remove the redundant ternary on line 14 of `hooks/useTheme.js` (`prefersDark ? 'dark' : 'dark'`).
- **Remove Duplicate CSS `@import`:** Delete `@import url('https://fonts.googleapis.com/...');` from line 1 of `styles/globals.css`.
- **Add `.eslintrc.json`:** Add standard Next.js ESLint configuration so `npm run lint` succeeds in automated pipelines.

### 2. Code Simplification & Maintainability
- **Wire Centralized Social Data:** Replace hardcoded social link arrays in `components/apps/ContactApp.jsx` and `components/Dock.jsx` with imports from `data/social.js`.
- **Stabilize Window Event Listeners in `Desktop.jsx`:** Refactor `handleOpenEvent` and `handleShowDesktop` to avoid tearing down and re-attaching global window listeners on every interaction.
- **Unify Standalone Page Headers:** Create a reusable header component or add a variant prop to `Navbar.jsx` to replace duplicated header markup in `pages/resume.js` and `pages/projects/[slug].js`.
- **Form Accessibility:** Add `id` and `htmlFor` pairings to the input fields in `ContactApp.jsx` and add `aria-label` to Dock and Window buttons.

### 3. Performance Optimization
- **Eliminate `Cursor.jsx` CPU Drain:** Unmount or deactivate the continuous `requestAnimationFrame` loop in `Cursor.jsx`.
- **Code Split OS Application Windows via `next/dynamic`:** Dynamically import `AboutApp`, `ProjectsApp`, `ContactApp`, `ErrorApp`, and `TrashApp` inside `Desktop.jsx`. Only the active app (`AboutApp`) will load initially, reducing first-load JS by ~35–45 kB.
- **Deduplicate Kolkata Time Intervals:** Consolidate the two independent 1-second intervals running in `Navbar.jsx` and `AboutApp.jsx` (`LocalClock`).
- **Convert PNG Assets to WebP/AVIF:** Compress high-resolution screenshots in `public/images/` and adopt `next/image` with responsive dimensions.

### 4. File and Dependency Optimization
- **Segregate Dead Legacy & Prototype Components:** Move the 16 unreferenced components and 9 unused CSS modules into an archive directory or remove them from the production branch.
- **Remove Orphaned Public Assets:** Delete `public/images/dashboard.png` (433 KB), `public/images/about-bg.jpg` (232 KB), and the 10 unreferenced SVGs in `public/icons/`.
- **Remove Committed `docs.zip`:** Delete `docs.zip` (60 KB) from the git repository.
- **Clean Local Disk Space:** Delete the 270 MB `temp_impeccable/` directory.

### 5. Higher-Risk Improvements Requiring Validation
- **Dependency Upgrade (`next@14.2.35+`):** Upgrading `next` resolves all critical CVEs but requires verification of Framer Motion interaction compatibility and static build output.
- **Migrating Fonts to `next/font/google`:** Replacing manual `<link>` tags with `next/font/google` eliminates external font requests and layout shifts, but requires validating font weight inheritance and CSS variable mapping (`--font-display`, `--font-body`).
- **Migrating `<img>` to `next/image`:** Converting desktop wallpaper and project preview images to `next/image` optimizes image delivery, but requires styling adjustments (`fill` vs explicit dimensions) within the fixed-position macOS desktop container.

---

## J. Prioritized Action Plan

| Priority | Finding ID | Action Item | Expected Benefit | Risk | Effort | Dependencies | Verification Criteria |
|---|---|---|---|---|---|---|---|
| **P0** | **CQ-01** | Upgrade `next` to `14.2.35+` | Patches Critical RCE and High DoS vulnerabilities | Low-Med | Low | `package.json` | `npm audit --omit=dev` passes; `npm run build` succeeds |
| **P0** | **CQ-02** | Remove `public/Anubhav_Sethi_Resume.pdf` | Eliminates public exposure of personal phone numbers | Low | Low | None | HTTP GET `/Anubhav_Sethi_Resume.pdf` returns 404; public resume remains available at `/resume/Anubhav_Sethi_Resume_Public.pdf` |
| **P1** | **CQ-03** | Deactivate inert rAF loop in `Cursor.jsx` | Eliminates idle CPU usage and mobile battery drain | Very Low | Low | `pages/index.js` | Performance profiler confirms zero idle animation frame callbacks |
| **P1** | **CQ-04** | Create `.eslintrc.json` with Next.js rules | Restores automated linting and CI verification | Low | Low | `eslint` | `npm run lint` completes with exit code 0 |
| **P1** | **CQ-05** | Remove CSS `@import` font call in `globals.css` | Removes blocking network request from CSS OM | Very Low | Low | `globals.css` | Fonts render without console warnings; network tab shows single font request |
| **P2** | **CQ-06** | Stabilize `Desktop.jsx` window event listeners | Prevents listener thrashing on window focus/drag | Low | Medium | `Desktop.jsx` | Window drag, minimize, and navigation actions operate smoothly without event churn |
| **P2** | **CQ-08, 09**| Add form `htmlFor` and button `aria-label` | Improves screen reader and keyboard accessibility | Very Low | Low | Contact, Dock | Lighthouse accessibility score reaches 100 |
| **P2** | **CQ-12** | Wire `data/social.js` to Contact and Dock | Eliminates duplicate social URLs and maintenance drift | Very Low | Low | `data/social.js`| Social links match across Dock and Contact app |
| **P3** | — | Code-split desktop apps with `next/dynamic` | Reduces initial route `/` bundle size by ~40 kB | Low | Medium | `Desktop.jsx` | Route `/` First Load JS decreases from 147 kB to ~105 kB |
| **P3** | **CQ-07** | Remove 16 dead components and 9 CSS modules | Eliminates 125 KB of dead code; cleans codebase | Low | Medium | `components/` | `npm run build` generates identical static output |
| **P3** | — | Optimize and compress `public/images/*.png` | Reduces asset payload by ~2.5 MB | Low | Medium | `public/images`| Images load significantly faster with zero visual degradation |
| **P4** | **CQ-14** | Unify menu bar headers on standalone pages | Removes ~80 lines of duplicate JSX markup | Low | Medium | `Navbar.jsx` | `/resume` and `/projects/[slug]` headers display identically |

---

## K. Risks and Non-Goals

### Prohibited Scope & Non-Goals
The following items were explicitly excluded from this audit and must **NOT** be implemented during optimization:
- **No Visual Redesign:** Do not alter the macOS desktop aesthetic, dark/lime theme, window styling, Dock magnification curve, or typography.
- **No Content Changes:** Do not modify personal bios, project descriptions, educational records, or resume copy.
- **No Framework Migrations:** Do not migrate from Next.js Pages Router to App Router, or replace Vanilla CSS with Tailwind CSS.
- **No New Features:** Do not add backend APIs, contact form server endpoints, or interactive widgets outside the existing scope.

### Optimization Risks Requiring Prior Validation
1. **Window Drag Coordinates on Re-render:** Modifying Framer Motion drag constraints or memoizing window frames in `Desktop.jsx` could inadvertently reset window positions during dragging. Any changes to `Window.jsx` must be tested across mobile and desktop viewport sizes.
2. **Next.js Version Incompatibilities:** Updating `next` beyond major version 14 (e.g. to Next.js 15) would introduce breaking changes regarding asynchronous `params` in dynamic routes and React 19 peer dependency conflicts with Framer Motion. Keep upgrades constrained to the `14.2.x` patch line.
3. **PDF Object Viewer Support:** Replacing `<object data="...#toolbar=0">` in `AboutApp.jsx` with an image preview or redirect alters the in-window preview experience. The embedded object should remain intact.

---

## L. Final Assessment

The project codebase is structurally sound, highly creative, and achieves its goal of providing an engaging macOS desktop simulation for a developer portfolio. Its core static generation builds cleanly and reliably.

However, the repository currently reflects a state of **technical transition between V1 (legacy scrolling site) and V2 (macOS desktop concept)**, resulting in significant code debt:
- **Urgent Action Required:** Remediate the critical Next.js dependency vulnerabilities and eliminate the public PII file exposure.
- **Moderate Optimization Needed:** Remove the 16 dead legacy/prototype components and 9 unused CSS modules, disable the inert CPU-wasting cursor loop, eliminate duplicate font requests, and connect the centralized `data/social.js` module.

Implementing the prioritized recommendations will transform this repository into a clean, secure, high-performance, and easily maintainable codebase without altering any aspect of its visual design or user-facing functionality.
