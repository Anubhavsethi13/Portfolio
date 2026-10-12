# PROJECT_MAP — quick context (verified 2026-10-07)

**Stack:** Next.js 14.2.3 Pages Router · React 18.3.1 · framer-motion 11.18.2 · JS (no TS) · global CSS · npm · static output · no backend/DB/auth/env/tests
**Concept:** macOS-style desktop portfolio for Anubhav Sethi (draggable windows + dock)
**Build:** `npm run build` ✅ (132 kB first-load JS) · `npm run lint` ❌ (no ESLint config → interactive prompt)
**Git:** branch `master`, 0 commits, no remote

## Tree (✅ live · 💀 dead · 🧰 tooling · 🗑 obsolete)
```
pages/
  _app.js                 ✅ imports styles/globals.css
  _document.js            ✅ fonts (Syne, DM Sans), favicons, manifest, theme-color
  index.js                ✅ <Head> SEO → IntroLoader, Cursor, <main><Desktop/></main>
components/
  Desktop.jsx             ✅ window manager + app registry + desktop shortcuts (STATE HUB)
  Window.jsx              ✅ window chrome, title-bar drag, maximize, mobile size
  Dock.jsx                ✅ magnifying dock, 7 items (5 apps + GitHub + LinkedIn)
  AppIcons.jsx            ✅ AboutIcon ProjectsIcon ContactIcon ErrorIcon TrashIcon GitHubIcon LinkedInIcon
  IntroLoader.jsx/.css    ✅ 1.2s "AS." splash
  Cursor.jsx              ⚠ mounted, but no CSS → invisible; rAF loop always on
  apps/AboutApp.jsx       ✅ tabs: about|experience|skills|interests|resume + LocalClock (most content lives here)
  apps/ProjectsApp.jsx    ✅ grid ↔ detail (selectedProject from Desktop)
  apps/ContactApp.jsx     ✅ form → mailto
  apps/ErrorApp.jsx       ✅ joke dialog
  apps/TrashApp.jsx       ✅ "Bin of Ideas" snippet viewer
  Navbar Hero About Experience Skills Projects ProjectCard Contact Footer (.jsx + .module.css)  💀 never imported
data/projects.js          ✅ projects[7]; `filters` 💀
hooks/useInView.js        💀 (dead components only)   hooks/useScrollProgress.js 💀
styles/globals.css        ✅ ALL live styling + :root tokens (1,340 lines)
public/                   ✅ favicons, site.webmanifest, Anubhav_Sethi_Resume.pdf, images/
scripts/generate_favicons.py 🧰 (needs missing temp_fonts/syne-800.ttf)
.impeccable/critique/     🧰 AI design critique (2026-08-12, partly stale)
.agents/skills/           🗑 empty
temp_impeccable/          🗑 partial git clone, 270 MB tmp pack, NOT gitignored
next.config.js            reactStrictMode; images.domains [] (deprecated)
jsconfig.json             @/components|data|hooks|styles aliases (unused)
README.md                 ⚠ describes the legacy site
```

## Routes
| Route | File | Type |
|---|---|---|
| `/` | pages/index.js | static |
| `/404` | Next default | static |
No API routes, dynamic routes or URL state.

## Window/App registry (IDs: about · projects · contact · error · trash)
| ID | Title | Size | Default x,y | Content | Desktop icon | Dock |
|---|---|---|---|---|---|---|
| about | Information about: Anubhav Sethi | 720×540 | 100,60 | AboutApp | ✅ "About & CV" | ✅ |
| projects | Projects Browser | 820×580 | 180,80 | ProjectsApp | ✅ + 3 featured projects | ✅ |
| contact | Mail Client: Compose message | 560×500 | 260,120 | ContactApp | ✅ "Contact Me" | ✅ |
| error | System Warning | 440×300 | 350,180 | ErrorApp | — | ✅ |
| trash | Trash Bin: Playground | 620×420 | 220,100 | TrashApp | ✅ "Bin of Ideas" | ✅ |
| github / linkedin | external | — | — | window.open | — | ✅ (LinkedIn URL is generic ⚠) |
Initial: `openApps=['about']`, `appStack=['projects','contact','error','trash','about']`. z = 10 + stack index.
**Adding an app touches:** Desktop if/else + appStack literal + Dock apps[] (+ shortcuts, AppIcons).

## Component graph
```
index → IntroLoader, Cursor, Desktop
Desktop → Window, Dock, AboutApp, ProjectsApp, ContactApp, ErrorApp, TrashApp, AppIcons{About,Projects,Contact,Trash}, data/projects
Dock → AppIcons{all 7}
ProjectsApp → data/projects (projects; filters unused)
```

## State (all local useState)
Desktop: openApps, minimizedApps, activeApp, appStack, selectedProject · Window: isMaximized, dimensions · Dock: mouseX(MotionValue), hovered · AboutApp: activeTab · LocalClock: time · ContactApp: formData, submitted · TrashApp: selectedFile · IntroLoader: loading · Cursor: isHovering
No context, store, localStorage, cookies or URL params.

## Data sources
| Data | Location |
|---|---|
| projects `{id,title,description,image,tags[],link,github,featured,color}` | data/projects.js |
| bio, stats, philosophy, experience, education, certs, skills, interests | components/apps/AboutApp.jsx (hardcoded) |
| email, socials (LinkedIn, Behance, GitHub) | components/apps/ContactApp.jsx; GitHub + generic LinkedIn in Dock.jsx |
| trash snippets | components/apps/TrashApp.jsx |
| SEO | pages/index.js |

## External services / URLs
Google Fonts · Unsplash (onError image fallback) · mailto: · github.com/Anubhavsethi13 · linkedin.com/in/anubhav-sethi13 · behance.net/anubhavsethi1 · project demos (*.vercel.app, ledger-ai.streamlit.app, codehs.me)

## Env vars
None.

## Dependencies
next 14.2.3 (⚠ npm audit critical) · react/react-dom 18.3.1 · framer-motion 11.18.2 · clsx (unused) · eslint 8 + eslint-config-next 14.2.3 (unconfigured) · @types/* (unused)

## Assets (public/images)
officeflow.png 876K 1920×970 · fitmart.png 728K 1572×4096 · money-heist-ctf.png 684K · enterprise-portal.png 203K · ledgerai.png 168K · faq-assist.png 145K · blockchain-scheduler.png 94K · profile.jpg 158K (wallpaper) — all live
about-bg.jpg 💀 · dashboard.png 💀 · project-placeholder.svg 💀
public root: favicon.svg/.ico/16/32, apple-touch-icon 180, android-chrome 192/512, site.webmanifest, Anubhav_Sethi_Resume.pdf (1.8 MB, used ×3)

## Design tokens (globals.css :root)
bg #080808 · surface #111/#181818 · text #F0EEE8 · mid #A09A90 · muted #6B6960 · border rgba(255,255,255,.06/.14) · **accent #C8F04E** (hover #b8e03e hardcoded) · Syne (display) / DM Sans (body) · breakpoint 768px only

## Top issues (see PORTFOLIO_ANALYSIS_REPORT.md)
HIGH: H1 next@14.2.3 advisories · H2 mobile broken · H3 Tailwind classes without Tailwind (clock unstyled, black icons) · H4 no git commits · H5 temp_impeccable 270MB not ignored
MEDIUM: generic LinkedIn in Dock · div-onClick a11y · unlabeled inputs · huge PNGs · SEO gaps · inert Cursor rAF · fonts loaded twice · inflated stats · no lint config · stale README · dead legacy code · no reduced-motion · resize displacement (LIKELY) · content hardcoded/duplicated

## Gotchas for AI agents
- Editing Hero/Navbar/About/Skills/Projects/Contact/Footer changes nothing on screen (dead).
- Tailwind classes are no-ops. Use globals.css or SVG attributes.
- Live styles are global classes (`os-window-*`, `desktop-*`, `about-*`, `project-*`, `contact-*`, `trash-*`).
- Imports are relative; `@/` aliases exist but are unused.
- Verify with `npm run build`; check 375px and desktop widths; don't resize mid-test.
