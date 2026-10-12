# Portfolio Project Brain

> Long-term context for any AI or developer working on this repo. Everything here was checked against the source on **2026-10-07**.
> Labels: **FACT** = verified in code or at runtime · **LIKELY** = strong inference · **UNKNOWN** = could not be determined from the repository.
> Companion docs: `PORTFOLIO_ANALYSIS_REPORT.md` (full audit), `PROJECT_MAP.md` (quick reference).

---

## 1. Project Identity

| Item | Value |
|---|---|
| Package name | `anubhav-sethi-portfolio` v1.0.0 (`package.json`) |
| Owner / subject | Anubhav Sethi, "Web Developer & Graphics Designer", based in Kolkata/Nagpur, India |
| Repo folder | `D:\Claude\Portfolio - Mac - Copy` (the folder name suggests it is a **copy** of a "Mac"-themed version) |
| Concept | **A macOS-style desktop in the browser**: a wallpaper, draggable desktop icons, draggable/minimizable/maximizable windows and a magnifying dock |
| Git | Repo initialized, branch `master`, **zero commits, no remote** (FACT). Everything is untracked. |

## 2. Project Purpose

A personal portfolio that presents bio, experience, education, skills, projects, a résumé PDF and a contact form as "apps" inside a fake desktop operating system. It is a single page with no backend. (FACT)

The repo also contains a **previous design**: a conventional scrolling single-page portfolio (Navbar → Hero → About → Projects → Skills → Contact → Footer). Those components still exist but **nothing imports them** (FACT, see §30).

## 3. Technology Stack

| Concern | Choice | Evidence |
|---|---|---|
| Framework | **Next.js 14.2.3, Pages Router** | `package.json`, `pages/` |
| Language | JavaScript (JSX). No TypeScript, even though `@types/*` are installed | no `tsconfig.json`; `jsconfig.json` only |
| UI | React 18.3.1 | `node_modules/react/package.json` |
| Animation | framer-motion 11.18.2 (`^11.2.10`) | Window, Dock, Desktop, IntroLoader |
| Styling | One global stylesheet, `styles/globals.css` (1,340 lines), plus inline `style={{}}` objects. CSS Modules only in IntroLoader and the dead legacy components | — |
| Tailwind | **NOT installed.** Tailwind class names still appear in JSX (`w-screen`, `text-xs`, `fill-none`, `stroke-blue-400`, `bg-[#18181c]`…) and do nothing (FACT, see §29) | no tailwind config/dep |
| Icons | Hand-written inline SVG (`components/AppIcons.jsx` plus inline SVGs) | — |
| Fonts | Google Fonts: **Syne** (display) and **DM Sans** (body) | `_document.js`, `globals.css` line 1 |
| State | Local `useState` only. No context, no store | — |
| Routing | File-based Pages Router; one real page, `/` | — |
| Forms | Controlled inputs → `mailto:` link | `components/apps/ContactApp.jsx` |
| Backend / DB / Auth / CMS / analytics | **None** | no `pages/api`, no env usage, no SDKs |
| Utility dep | `clsx` is installed but **never imported** | grep |
| Lint | `eslint@8` + `eslint-config-next@14.2.3` installed, but **no `.eslintrc`** → `next lint` opens an interactive setup prompt | ran it |
| Tests | None | — |
| Deploy | README says Vercel. No `vercel.json`, CI or Docker. Real deploy target **UNKNOWN** | — |
| Package manager | npm (`package-lock.json`, lockfile v3) | — |

## 4. Repository Structure

```
/
├── pages/                 _app.js, _document.js, index.js        ACTIVE
├── components/
│   ├── Desktop.jsx        OS shell / window manager              ACTIVE (core)
│   ├── Window.jsx         draggable window chrome                ACTIVE
│   ├── Dock.jsx           magnifying dock                        ACTIVE
│   ├── AppIcons.jsx       7 SVG app icons                        ACTIVE
│   ├── IntroLoader.jsx(+.module.css)  "AS." splash               ACTIVE
│   ├── Cursor.jsx         custom cursor                          MOUNTED, but has no CSS → invisible
│   ├── apps/              AboutApp, ProjectsApp, ContactApp,     ACTIVE
│   │                      ErrorApp, TrashApp
│   └── Navbar, Hero, About, Experience, Skills, Projects,
│       ProjectCard, Contact, Footer (+ *.module.css)              DEAD (legacy scrolling site)
├── data/projects.js       projects[] + filters[]                 ACTIVE (filters only used by dead code)
├── hooks/                 useInView, useScrollProgress           DEAD
├── styles/globals.css     all active styling                     ACTIVE
├── public/                favicons, manifest, résumé PDF, images/ ACTIVE (some images unused)
├── scripts/generate_favicons.py  one-off favicon generator        TOOLING (needs a missing temp_fonts/ folder)
├── .impeccable/critique/  design critique written by an AI tool (2026-08-12) DOC
├── .agents/skills/        empty                                  OBSOLETE
├── temp_impeccable/       failed/partial clone of github.com/pbakaus/impeccable (~270 MB tmp pack) OBSOLETE, NOT gitignored
├── .next/                 build output (gitignored)
├── jsconfig.json          path aliases @/components/* etc. (never used in imports)
├── next.config.js         reactStrictMode, images.domains: [] (deprecated key)
└── README.md              out of date: describes the legacy scrolling site
```

## 5. Application Architecture

A client-side "window manager" running inside one statically prerendered page.

- `Desktop` holds **all** OS state: `openApps`, `minimizedApps`, `activeApp`, `appStack` (z-order), `selectedProject`.
- Each app ID (`about | projects | contact | error | trash`) maps to a hardcoded title, size, default position and content inside `Desktop.jsx` (the if/else chain at lines 207–247).
- `Window` handles the window chrome, dragging via a title-bar `dragControls`, a local maximize flag, and mobile sizing.
- `Dock` turns pointer X into per-icon size through framer motion values. It reports clicks back to `Desktop`. GitHub and LinkedIn are external links.
- Apps are self-contained and keep their **content hardcoded inside the component**, except projects, which come from `data/projects.js`.

## 6. Entry Points

| File | Role |
|---|---|
| `pages/_app.js` | Imports `styles/globals.css` and renders the page. No providers or layout |
| `pages/_document.js` | `<Html lang="en">`, Google Fonts `<link>`, favicons, manifest, `theme-color #080808` |
| `pages/index.js` | `<Head>` (title/description/OG) → `<IntroLoader/>`, `<Cursor/>`, `<main><Desktop/></main>` |

Startup sequence: the static HTML renders → IntroLoader covers the screen for 1.2 s, then slides up over 0.8 s → Desktop is already mounted underneath with the **About window open** (`openApps=['about']`).

## 7. Routes / Pages

| Route | Source | Notes |
|---|---|---|
| `/` | `pages/index.js` | The only page. Static (○) |
| `/404` | Next.js default | No custom 404 or `_error` |

There are no dynamic, nested or API routes. "Navigation" happens entirely through in-page window state; the URL never changes. Deep links to an app or project are not possible.

## 8. Component Architecture

```
pages/index.js (Home)
├── IntroLoader                 (CSS module; framer exit animation)
├── Cursor                      (rAF loop; renders .cursor/.cursor-ring, which have NO CSS)
└── Desktop                     (all state)
    ├── wallpaper <img src=/images/profile.jpg> (blurred 35px)
    ├── desktop-grid
    │   ├── 4 system shortcuts  (motion.div drag) → AboutIcon / ProjectsIcon / ContactIcon / TrashIcon
    │   └── 3 featured project shortcuts (projects.filter(featured).slice(0,3)) → open the Projects detail view
    ├── AnimatePresence → Window × openApps (minimized ones are not rendered)
    │   ├── AboutApp     tabs: about | experience | skills | interests | resume (PDF iframe) + LocalClock
    │   ├── ProjectsApp  grid ↔ detail (selectedProject lifted to Desktop)
    │   ├── ContactApp   form → mailto:
    │   ├── ErrorApp     joke "Compiler Error" dialog (onClose)
    │   └── TrashApp     "Bin of Ideas" file grid ↔ code viewer
    └── Dock → DockIcon × 7 (about, projects, contact, error, trash, github↗, linkedin↗)
```

Component notes:
- **Desktop.jsx** (300 lines): business logic and presentation together. Window config is hardcoded and not data-driven. The tightest coupling point in the app.
- **Window.jsx**: reasonably reusable (props: id, title, width, height, defaultX/Y, zIndex, desktopRef, onClose/onMinimize/onFocus). `isOpen` is always `true`. Maximize state is local and resets when the window remounts.
- **Dock.jsx**: the app list is hardcoded and duplicates Desktop's IDs. The `color` field (Tailwind strings) is unused. Styling is almost entirely inline.
- **apps/** are effectively single-use, and each embeds its own content arrays.
- **AppIcons.jsx**: 7 exported SVG components. Gradient IDs are global (`aboutBg`, …). Each icon renders twice (desktop + dock), so DOM IDs are duplicated (LIKELY harmless because the definitions are identical).

## 9. Design System

All tokens live in `styles/globals.css :root`:

| Token | Value | Use |
|---|---|---|
| `--bg` | `#080808` | page background |
| `--surface` / `--surface-2` | `#111111` / `#181818` | panels (mostly bypassed by hardcoded `#141416`, `#18181c` etc.) |
| `--border` / `--border-hover` | `rgba(255,255,255,.06)` / `.14` | hairlines |
| `--text` / `--text-mid` / `--text-muted` | `#F0EEE8` / `#A09A90` / `#6B6960` | text |
| `--accent` | **`#C8F04E`** (lime) | the brand colour: active states, CTAs, dots, featured tags. Hover shade `#b8e03e` is hardcoded |
| `--accent-dim` / `--accent-dim2` | lime at 8% / 14% | |
| `--font-display` | `'Syne'` | headings, logo |
| `--font-body` | `'DM Sans'` | everything else |

Other recurring values:
- macOS traffic lights `#ff5f56 / #ffbd2e / #27c93f`; Tailwind-like greys `#a1a1aa #6b7280 #9ca3af #e4e4e7 #f3f4f6`.
- Glass look: `rgba(13,13,14,.82)` plus `backdrop-filter: blur(24px) saturate(120%)`; dock `rgba(20,20,22,.45)` with `blur(20px)`.
- Radii: 14px (window), 24px (dock), 16px (dock icon), 15px (shortcut), 8px (buttons/cards), 100px (pills).
- Type: base `font-size: 18px` on html/body, but app UIs use 11–14px. Section labels are 11px uppercase with `letter-spacing .1em` (repeated inline many times).
- Window body padding is 24px. Desktop grid padding is `40px 32px` with gap `32px 48px`. Shortcuts are 96px wide with 60px icons.
- **One breakpoint: `max-width: 768px`** (three separate blocks in globals.css). JS uses `window.innerWidth < 768`.
- Dark theme only. No light mode.

## 10. Content Architecture

| Content | Where it lives |
|---|---|
| Name, headline, bio paragraphs, stats (4+ yrs / 40+ projects / 25+ clients), 4 philosophy cards | hardcoded in `components/apps/AboutApp.jsx` |
| Experience (MachinesWale Dec 2024–May 2025; K.E.C International Aug–Oct 2024) | `AboutApp.jsx` `experiences` (the legacy `Experience.jsx` has longer bullet lists) |
| Education (NIT Polytechnic Nagpur 2021–24, GPA 7.2; E-Pathshala 2017–21) | `AboutApp.jsx` `education` |
| Certifications (3) | `AboutApp.jsx` `certifications` |
| Skills (4 groups with featured subsets) | `AboutApp.jsx` `skillGroups` (also duplicated in legacy `Skills.jsx`) |
| Interests (4) | inline array in `AboutApp.jsx` |
| Projects (7) | **`data/projects.js`**, the only real data file |
| Résumé | `public/Anubhav_Sethi_Resume.pdf` (1.8 MB). Shown in an iframe, plus download links |
| Contact email | hardcoded in `ContactApp.jsx` (mailto + displayed "To:" field) and legacy `Contact.jsx` |
| Socials | LinkedIn `linkedin.com/in/anubhav-sethi13`, Behance `behance.net/anubhavsethi1`, GitHub `github.com/Anubhavsethi13`. These live in `ContactApp.jsx`. **`Dock.jsx` LinkedIn points to plain `https://linkedin.com`** (bug) |
| Trash "drafts" (4 code snippets) | hardcoded in `TrashApp.jsx` |
| Error joke | `ErrorApp.jsx` |
| SEO text | `pages/index.js` `<Head>` |
| Dead content (FAQ accordion, tickers, Hero rotating words, footer marquee) | legacy `About.jsx`, `Hero.jsx`, `Footer.jsx` |

Project schema: `{ id, title, description, image, tags[], link, github, featured, color }`. `featured` decides which projects get desktop shortcuts (the first 3). `color` is only used by the dead `ProjectCard`.

## 11. Asset Architecture

`public/images/` (all in use unless marked):

| File | Size | Dimensions | Used by |
|---|---|---|---|
| profile.jpg | 158 KB | 768×1024 | blurred desktop wallpaper (+ legacy About) |
| officeflow.png | 876 KB | 1920×970 | project 1 (also a 60px desktop icon) |
| fitmart.png | 728 KB | 1572×**4096** | project 2 (full-page screenshot) |
| faq-assist.png | 145 KB | 1920×970 | project 3 |
| enterprise-portal.png | 203 KB | 1920×1060 | project 4 |
| money-heist-ctf.png | 684 KB | 1920×1044 | project 5 |
| blockchain-scheduler.png | 94 KB | 1920×970 | project 6 |
| ledgerai.png | 168 KB | 1920×970 | project 7 |
| about-bg.jpg | 233 KB | 1024×682 | **legacy only (dead)** |
| dashboard.png | 434 KB | 1296×1752 | **unused** |
| project-placeholder.svg | 0.3 KB | 800×450 | **unused** |

`public/` root: favicon.svg/ico/16/32, apple-touch-icon (180), android-chrome 192/512, site.webmanifest, Anubhav_Sethi_Resume.pdf. The favicons were generated on 2026-10-03 by `scripts/generate_favicons.py` (Syne 800 "AS" with a lime dot).

Fallback image: on `onError`, images swap to an **external Unsplash URL** (hotlinked).

## 12. State Management

Everything is local React state; nothing is persisted (no localStorage, cookies or URL state).

| State | Owner | Purpose |
|---|---|---|
| openApps, minimizedApps, activeApp, appStack, selectedProject | `Desktop` | window manager |
| isMaximized, dimensions | `Window` | per window; lost on close |
| mouseX (MotionValue), hovered | `Dock` / `DockIcon` | magnification and tooltip |
| activeTab | `AboutApp` | tab switcher |
| time | `LocalClock` (in AboutApp) | 1 s interval, Asia/Kolkata |
| formData, submitted | `ContactApp` | form |
| selectedFile | `TrashApp` | viewer |
| local fallback selectedProject | `ProjectsApp` | used only when props are absent (never, in practice) |
| loading | `IntroLoader` | 1.2 s timer |
| isHovering | `Cursor` | hover ring (has no visible effect) |

z-index = `10 + appStack.indexOf(id)`; dock wrapper sits above.

## 13. Data Flow

```
data/projects.js ──► Desktop (featured[0..2] → desktop shortcuts)
                 └─► ProjectsApp (grid) ──click──► setSelectedProject (Desktop state) ──► detail view
Desktop shortcut "OfficeFlow" ─► handleLaunchProject(p) ─► selectedProject=p + open 'projects'
Dock click ─► Desktop.onOpenApp(id): open / focus / minimize-toggle / unminimize
Window title bar pointerdown ─► onFocus(id) ─► appStack reorder ─► z-index
ContactApp submit ─► window.location.href = mailto:<email>?subject&body ─► user's mail client
AboutApp "Resume PDF" ─► <iframe src=/Anubhav_Sethi_Resume.pdf#toolbar=0>
```

No API calls, no fetch, no environment variables.

## 14. API / Backend

**None.** No `pages/api`, no server code, no `getServerSideProps`/`getStaticProps`. The page is prerendered as static HTML. (FACT)

## 15. Database

None. (FACT)

## 16. Authentication

None. (FACT)

## 17. Configuration

- `next.config.js`: `reactStrictMode: true`, `images.domains: []` (deprecated key; `next/image` is not used anywhere).
- `jsconfig.json`: aliases `@/components/*`, `@/data/*`, `@/hooks/*`, `@/styles/*`. **None are used**; every import is relative.
- `.gitignore`: standard Next.js entries. **It does not exclude `temp_impeccable/`, `.impeccable/` or `.agents/`.**
- There is no ESLint, Prettier, PostCSS, Tailwind, TypeScript, Vercel, Docker or CI config.

## 18. Environment Variables

None are read (`process.env` is never referenced). `.env*` files are gitignored, and none exist. (FACT)

## 19. Animations

| Animation | Implementation |
|---|---|
| Intro splash | framer: logo fades and scales in, bar grows to 100px, overlay exits with `y:-100vh` over 0.8 s, cubic `[0.76,0,0.24,1]` (`IntroLoader.jsx`) |
| Window open/close | framer `initial {scale:.9, opacity:0}` → spring 0.4 s. Exit via `AnimatePresence` |
| Maximize | animates width/height to 100% and borderRadius 14 → 0 |
| Window drag | `useDragControls`, started from the title bar only; `dragConstraints={desktopRef}`, no momentum |
| Desktop icon drag | `motion.div drag`; positions are not persisted. `whileTap scale .95` |
| Dock magnification | `useTransform(distance, [-120,0,120], [60,90,60])` + `useSpring`; `whileHover y:-10` |
| CSS transitions | hovers on cards and buttons, traffic-light icons fade in on hover, project image zoom |
| Minimize | **no animation**: the window simply unmounts (`return null`). The critique flags this as confusing |
| Custom cursor | rAF lerp loop running **forever**; the elements it moves have no styles |
| `prefers-reduced-motion` | **not respected anywhere** |

## 20. Responsive Behavior

- One breakpoint at 768px. Below it: the About sidebar stacks above the content, the project detail becomes one column, window bodies scroll (`overflow-y:auto`), and grid max-heights are removed.
- `Window` reads `window.innerWidth` **once on mount**: on mobile, width = `innerWidth-32` and height = `innerHeight-150`. There is no resize listener.
- **Mobile is broken (FACT, checked at 375×812):** windows keep their desktop `defaultX` (100–350px), so they overflow off the right edge. The title text overlaps the traffic lights. The 7-icon dock (≥60px each plus 12px gaps plus padding ≈ 530px) is wider than the screen, so LinkedIn is clipped. The traffic-light buttons are 12px, far below tap-target size. `html, body { overflow:hidden }` means there is no page scroll.
- LIKELY: resizing the viewport after load makes framer's drag-constraint rescaling shove the desktop icons and windows toward the bottom-right. This was observed once in testing and needs confirmation in a normal browser.
- Desktop labels clamp to 2 lines but still truncate ("About & C…", "Contact M…") because of the 96px width and padding (FACT, visible).

## 21. SEO

- ✅ `<title>`, meta description, `og:title`, `og:description`, `lang="en"`, favicons, manifest, theme-color.
- ❌ No `og:image`, `og:url`, `og:type`, Twitter card, canonical, `robots.txt`, `sitemap.xml` or JSON-LD (Person).
- ❌ All content is client-state gated: About content is in the SSR HTML (the About window is open by default), but the Projects, Contact and other app content is never in the HTML.
- Favicon `<link>`s are duplicated in both `_document.js` and `index.js` `<Head>`.
- Semantics: one `<main>` and some `h2`–`h4`; **no `<h1>`**.

## 22. Accessibility

Key gaps (FACT):
- Desktop shortcuts, project cards and trash file cards are `<div onClick>`: not focusable and no keyboard activation.
- Contact `<label>`s are not associated with their inputs (no `htmlFor`/`id`).
- Window controls are 12px buttons labelled only by `title`. There are no ARIA roles for windows/dialogs and no focus management or trap. Escape does nothing.
- `user-select: none` on html/body blocks copying of all text (an email address, for example), except the trash code viewer.
- No custom `:focus-visible` styles. Contact inputs set `outline: none` and rely on a border colour change.
- Wallpaper `<img alt="Background Wallpaper">` is decorative and should be `alt=""`.
- Low-contrast greys such as `#6b7280` on near-black for 11–12px labels (LIKELY below WCAG AA for small text).
- No reduced-motion support.

## 23. Performance

- First Load JS for `/` is **132 kB** (53.8 kB page + 82.4 kB shared). Fine.
- Images: plain `<img>` with no `next/image`, no lazy loading and no responsive sizes. 1920px PNGs (up to 876 KB) are used as **60px desktop icons** and small cards. `fitmart.png` is 1572×4096. Roughly 3.3 MB of project PNGs load as soon as the Projects window opens. The 3 featured images load at startup.
- Fonts are requested **twice**: a render-blocking `@import` in globals.css and a `<link>` in `_document`.
- `Cursor` runs `requestAnimationFrame` continuously even though nothing is visible.
- Heavy `backdrop-filter` blur on the windows, the dock and a 35px-blurred full-screen wallpaper image. This costs GPU on low-end and mobile devices.
- The 1.8 MB résumé PDF only loads in an iframe when its tab is opened. OK.
- The dock recomputes `getBoundingClientRect` per icon on every mouse move (cheap with 7 icons).

## 24. Security

- No secrets, API keys or tokens anywhere (FACT; there are no env files).
- No `dangerouslySetInnerHTML`.
- The public email address is in the source (intentional for a portfolio).
- `Dock` uses `window.open(url, '_blank')` without `noopener` (low risk because the targets are trusted).
- **Dependency vulnerabilities (`npm audit --omit=dev`): 4 (1 critical, 3 high).** `next@14.2.3` is flagged with many advisories (cache poisoning, middleware auth bypass, image-optimizer DoS/SSRF, and others). Practical exposure is limited because the site has no middleware, API routes, `next/image` or Server Actions. It is still the top upgrade item. `nanoid`, `postcss` and `source-map-js` are transitive.
- The résumé PDF is public. Whether it contains a phone number or home address is **UNKNOWN** (it could not be parsed locally); the owner should review it.

## 25. Build / Run / Deploy

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # ✅ succeeds (verified 2026-10-07, Node 22.22.3, npm 10.9.8)
npm start
npm run lint     # ❌ not configured → interactive ESLint setup prompt
```
- Build output: `/` static (○) and `/404`. The site could be `next export`-ed as fully static (not configured).
- Deploy: the README describes Vercel. The real live URL or deploy target is **UNKNOWN**. The projects themselves are on `*.vercel.app`.

## 26. Important Files

| File | Why it matters |
|---|---|
| `components/Desktop.jsx` | the whole window manager and app registry |
| `components/Window.jsx` | window chrome, drag, maximize, mobile sizing |
| `components/Dock.jsx` | dock and external links |
| `components/apps/AboutApp.jsx` | most of the portfolio's content |
| `data/projects.js` | project data |
| `styles/globals.css` | all active styling and design tokens |
| `pages/index.js`, `pages/_document.js` | SEO head, fonts, favicons |
| `public/Anubhav_Sethi_Resume.pdf` | résumé, linked from 3 places |

## 27. Dependencies

| Package | Version | Purpose | Status |
|---|---|---|---|
| next | 14.2.3 (pinned) | framework | used; **vulnerable**; latest is 16.x |
| react / react-dom | ^18 → 18.3.1 | UI | used |
| framer-motion | ^11.2.10 → 11.18.2 | all animation and dragging | used (the library is now published as `motion`; framer-motion 14.x exists) |
| clsx | ^2.1.1 | class joining | **unused** |
| eslint, eslint-config-next | 8 / 14.2.3 | lint | installed, **unconfigured** |
| @types/node, @types/react, @types/react-dom | | TS types | **unused** (no TS) |

## 28. Technical Debt

1. Tailwind class names without Tailwind (see §29). Some sizes are patched by `svg.w-4 {… !important}` rules in globals.css.
2. Heavy use of inline style objects plus `onMouseEnter`/`onMouseLeave` JS hovers in `AboutApp.jsx`; the 11px uppercase section-label style is copy-pasted about 8 times.
3. The window registry is a hardcoded if/else in Desktop, and app IDs are duplicated in `Dock.jsx` and in the `appStack` initial value.
4. Content is embedded in components instead of `data/`.
5. The entire legacy site, about 2,000 lines of JSX and CSS, is dead but still present.
6. Duplicate font loading, duplicate favicon tags, and duplicate `@media (max-width:768px)` blocks.
7. Invalid CSS: `max-h: 80vh;` in `.desktop-grid` (globals.css ~line 362).
8. `images.domains` is deprecated; `@/` aliases are unused.
9. Leftover `temp_impeccable/` (~270 MB) and an empty `.agents/`.
10. The README describes the old design.
11. The stats "4+ Years / 40+ Projects / 25+ Happy Clients" contradict the experience timeline (first role in Aug 2024). This is a content credibility issue.

## 29. Known Bugs

| # | Bug | Where | Status |
|---|---|---|---|
| B1 | Kolkata clock is unstyled: no card, wrong font, and the time and timezone run together ("01:09:25GMT+5:30") | `AboutApp.jsx` `LocalClock` uses Tailwind classes | FACT (seen) |
| B2 | Trash file icons render as **solid black blobs**: `fill-none`/`stroke-*` classes are undefined, so SVG defaults to fill black and no stroke | `TrashApp.jsx` | FACT (seen) |
| B3 | Same root cause: icons in the ProjectsApp back/launch/source buttons, the ContactApp send and success icons, and the Trash back button rely on `stroke-current fill-none` → LIKELY render as filled shapes or invisibly | apps/*.jsx | LIKELY |
| B4 | Mobile layout broken (window offset and overflow, clipped dock, tiny controls) | `Window.jsx`, `Dock.jsx`, globals.css | FACT (seen) |
| B5 | Dock LinkedIn link goes to `https://linkedin.com`, not the profile | `Dock.jsx:61` | FACT |
| B6 | Custom cursor renders nothing (no `.cursor`/`.cursor-ring` CSS) yet runs a rAF loop forever | `Cursor.jsx`, globals.css | FACT |
| B7 | Desktop shortcut labels truncate | `.shortcut-label` | FACT (seen) |
| B8 | Window size is computed once; rotating or resizing doesn't adapt. A breakpoint mismatch (`<768` in JS vs `max-width:768px` in CSS) affects exactly 768px | `Window.jsx` | FACT |
| B9 | Viewport resize can displace draggable elements (framer constraint rescale) | Desktop/Window | LIKELY |
| B10 | Contact shows the "Opening Email Client" success state even when no mail client is configured | `ContactApp.jsx` | FACT (by design) |
| B11 | Maximized state resets after close/reopen; minimize has no animation | `Window.jsx` | FACT |
| B12 | `.impeccable` critique says the Error window "displays by default". The current code does **not** open it (`openApps=['about']`), so the critique is stale on this point | `Desktop.jsx:17` | FACT |

## 30. Dead / Unused Code

Checked with repo-wide grep (no dynamic imports exist):
- **Components never imported:** `Navbar`, `Hero`, `About`, `Experience`, `Skills`, `Projects`, `ProjectCard`, `Contact`, `Footer` and their 9 `.module.css` files (≈27 KB of CSS).
- **Hooks:** `hooks/useInView.js` (used only by dead components), `hooks/useScrollProgress.js` (used by nothing).
- **Data:** `filters` export. It is imported by `ProjectsApp.jsx`, which never uses it; only the dead `Projects.jsx` does. The `color` field is used only by the dead `ProjectCard`.
- **globals.css unused selectors:** `.active-windows-bar`, `.active-window-pill`, `.tab-close-btn`, `.projects-filter-bar`, `.filter-btn`, `.d-flex`, `.items-center`, `.justify-between`, `.justify-center`, `.gap-2`, `.gap-4`, `.flex-1`, `.flex-row`. These are remnants of a removed "active window pills" taskbar and a project filter bar.
- **Global classes the dead components need but that no longer exist:** `.section-label*`, `.btn-primary`, `.btn-ghost`. Reviving the legacy components would render them broken.
- **Dock** `color` field.
- **Assets:** `dashboard.png`, `project-placeholder.svg`, `about-bg.jpg` (dead code only).
- **Deps:** `clsx`, `@types/*`.
- **Folders:** `temp_impeccable/`, `.agents/skills/` (empty).

## 31. Incomplete Features

- The project filter (`filters`) was dropped in the OS version; the CSS for it still exists.
- The "active window pills" taskbar was removed (CSS remains).
- There is no real contact backend; mailto only.
- Desktop icon positions are not persisted.
- The custom cursor is half-removed: the component is still mounted, the CSS is gone, and legacy modules still contain `cursor: none`.
- There is no git history, so it is UNKNOWN whether the owner intends to keep the legacy site.

## 32. Architecture Diagram

```
Browser
  │  GET /  (static HTML prerendered by Next 14 Pages Router)
  ▼
_document (fonts, favicons) → _app (globals.css) → pages/index.js
  ├── IntroLoader  (1.2s overlay)
  ├── Cursor       (inert rAF loop)
  └── Desktop  ◄── data/projects.js
        │ state: openApps · minimizedApps · activeApp · appStack · selectedProject
        ├── Shortcuts (drag) ──┐
        ├── Dock ──────────────┼──► onOpenApp / focus / minimize
        └── Window[]  ◄────────┘
              └── AboutApp | ProjectsApp | ContactApp | ErrorApp | TrashApp
                                   │                │
                       public/images/*.png     mailto: → user's mail client
                       public/*.pdf (iframe)
External: Google Fonts · Unsplash fallback image · GitHub/LinkedIn/Behance links · project demos (*.vercel.app, streamlit, codehs)
```

## 33. Data Flow Diagram

```
           ┌──────────────── data/projects.js ────────────────┐
           ▼                                                  ▼
 Desktop.featuredProjects ──click──► selectedProject ◄──click── ProjectsApp grid
                                         │
                                         ▼
                               ProjectsApp detail view ──► external link/github (new tab)

 Dock/Shortcut click ─► Desktop handlers ─► openApps/minimizedApps/appStack ─► Window z-index & visibility
 ContactApp formData ─► encodeURIComponent ─► mailto URL ─► window.location.href
```

## 34. Developer Conventions

- Active OS code uses semicolons and `import React`; legacy code has no semicolons. Prefer the active style.
- Global BEM-ish kebab-case classes in `globals.css`, prefixed by area: `os-window-*`, `desktop-*`, `about-*`, `project-*`, `contact-*`, `trash-*`, `skill-*`, `timeline-*`.
- Relative imports (`../data/projects`), not the `@/` aliases.
- Window IDs are lowercase strings: `about`, `projects`, `contact`, `error`, `trash`.
- Accent colour is always `var(--accent)`, except the hover shade `#b8e03e` and `#C8F04E` hardcoded in Dock.
- Text tone: playful OS metaphors ("Bin of Ideas", "Accept fate and cry").

## 35. Things That Must Not Be Accidentally Broken

1. Desktop window-manager semantics: open → focus raises z-order; clicking an active window's dock icon minimizes it; clicking a minimized one restores it; close picks the next active window from `appStack`.
2. A featured-project shortcut opens Projects **directly in detail view** (`handleLaunchProject`).
3. `ProjectsApp`'s controlled/uncontrolled `selectedProject` contract (props win over local state when they are defined).
4. Title-bar-only dragging (`dragListener={false}` + `dragControls.start`), so content stays clickable.
5. The résumé path `/Anubhav_Sethi_Resume.pdf`, used in 3 places.
6. The mailto address and social URLs.
7. The `--accent` lime identity, Syne/DM Sans, and the favicon set (which matches the "AS." logo in IntroLoader).
8. The `onError` image fallback behaviour (if it is replaced, use a local placeholder).
9. The `featured` flag semantics (the first 3 become desktop icons).

## 36. Recommended Future Improvements

1. Upgrade Next (at least the latest 14.2.x patch for a quick security fix, then 15/16). Remove `images.domains`.
2. Fix the Tailwind leftovers: either add Tailwind or convert those classes to real CSS (LocalClock, all inline SVG icons).
3. Rebuild mobile: either a dedicated mobile mode (full-screen sheets and a scrollable or icon-grid dock) or a fallback to a simple scrolling layout below 768px.
4. Move all content (experience, skills, education, certifications, socials, email) into `data/`, and drive Desktop/Dock from one `apps` registry.
5. Accessibility: buttons instead of clickable divs, label associations, focus styles, Esc to close, reduced motion, remove global `user-select:none`.
6. SEO: og:image, Twitter card, canonical, robots/sitemap, Person JSON-LD, an `<h1>`, and possibly deep links via the query string (`?app=projects&p=fitmart`).
7. Images: `next/image` or pre-generated WebP thumbnails; crop `fitmart.png`.
8. Remove dead code, the `temp_impeccable/` folder and unused deps. Fix the Dock LinkedIn URL. Fix or remove the Cursor.
9. Add ESLint config, Prettier, and a first git commit with a remote.
10. Correct the stats to match the real experience.

## 37. Upgrade / Migration Risks

- **Next 14 → 15/16:** React 19 is required. `next lint` is deprecated or removed in 16. `images.domains` is removed. Pages Router still works. `Head` usage is fine.
- **React 19:** `useRef` typing changes and string refs are not relevant here. framer-motion 11 → `motion` 12+ is needed for React 19 compatibility. The import path changes from `framer-motion` to `motion/react` (the old package still re-exports).
- **framer-motion drag API:** `useDragControls`, `dragListener`, `dragConstraints` ref and `dragMomentum` behaviour must be retested. Window maximize animates `width: '100%'` combined with transforms.
- **Adding Tailwind:** its preflight reset will change base styles (globals.css already resets margin/padding). Classes such as `w-screen h-screen` would suddenly take effect, and `svg.w-4 !important` patches would conflict.
- **Removing global `user-select:none` or `overflow:hidden`** changes the desktop feel. Test drag interactions afterwards.
- **Moving to the App Router** would require `'use client'` on nearly every component, because everything is interactive.

## 38. AI Developer Instructions

- Start with `components/Desktop.jsx`; it is the hub. Then read `Window.jsx`, `Dock.jsx` and the relevant `apps/*.jsx`.
- **Do not edit the legacy components** (`Hero`, `Navbar`, `About`, `Experience`, `Skills`, `Projects`, `ProjectCard`, `Contact`, `Footer`) expecting changes to show up. They are not rendered.
- Styling for active UI lives in `styles/globals.css`, not in CSS modules (except IntroLoader).
- **Tailwind classes do nothing.** Don't add new ones unless Tailwind is installed first.
- To add a new app: (1) add a branch in Desktop's if/else with title, size and position; (2) add the ID to the `appStack` initial array; (3) add an entry in `Dock.jsx` `apps`; (4) optionally add a shortcut in Desktop `shortcuts` and an icon in `AppIcons.jsx`.
- To add a project, append to `data/projects.js` and put the image in `public/images/`. `featured: true` adds a desktop icon (max 3).
- Test at 375px **and** ≥1280px after any layout change, and don't resize mid-test (see B9).
- `npm run build` is the only automated check available. Lint is not configured.
- `temp_impeccable/` and `.impeccable/` are tooling artefacts, not part of the site.

## 39. Final Project Understanding

This is a Next.js 14 (Pages Router, JavaScript) single-page portfolio for Anubhav Sethi, presented as an interactive macOS-like desktop: draggable windows for About/CV, Projects, Contact (mailto), a joke error dialog and a "Bin of Ideas", plus a magnifying dock. It has no backend, database, auth, env vars or tests. Content is mostly hardcoded in `components/apps/*.jsx`, and projects come from `data/projects.js`. Styling is one large global stylesheet with a dark palette and lime accent (`#C8F04E`). It builds cleanly (132 kB first-load JS) and the desktop experience is polished and distinctive. Its weaknesses: mobile is broken, Tailwind-only classes left the clock and several icons unstyled, accessibility and SEO are thin, images are unoptimized, Next 14.2.3 has known advisories, and about a third of the source (the previous scrolling-site design) is dead code. There is no git history at all.
