# V2 — Technical Architecture

> Labels: VERIFIED · INFERRED · RECOMMENDATION · UNKNOWN · USER INPUT REQUIRED.
> Binding decisions: `V2_DECISIONS.md` D5, D6, D7, D10, D11.

## 1. Current architecture (V1, VERIFIED)

```
Next.js 14.2.3 · Pages Router · React 18.3.1 · JavaScript · framer-motion 11.18.2 · global CSS
pages/_document.js  fonts, favicons
pages/_app.js       imports styles/globals.css
pages/index.js      <Head> → IntroLoader, Cursor, <main><Desktop/></main>
components/Desktop.jsx   ALL state (openApps, minimizedApps, activeApp, appStack, selectedProject)
                         + hardcoded if/else app registry (L207–247) + desktop shortcuts
components/Window.jsx    drag/maximise chrome (reads window.innerWidth once)
components/Dock.jsx      7 items, hardcoded; duplicates app IDs
components/apps/*.jsx    content embedded in components (except projects)
data/projects.js         the only data file
```

- Rendering: static prerender of `/`; everything else is client state. Only the About window's content is in the HTML.
- Coupling hot spot: adding an "app" touches Desktop if/else + `appStack` literal + Dock `apps[]` (+ shortcuts, icons).
- Every component is a client component (Pages Router ships all of them as JS). First-load JS 132 kB (from earlier build; VERIFIED in `BRAIN.md`, not re-run).

## 2. Target stack (RECOMMENDATION)

| Concern | V2 choice | Status vs V1 |
|---|---|---|
| Framework | **Next.js, current stable major** (16.x per the earlier `npm outdated`; confirm with `npm view next version` in Phase 0) | CHANGE (security + App Router features) |
| Router | **App Router** (`app/`) | CHANGE — content is now static, so React Server Components let us ship almost no JS for it |
| React | 19.x (required by Next 15+) | CHANGE |
| Language | **TypeScript** (`strict: true`) | CHANGE — typed content schemas are the main maintainability win; dev-only cost |
| Rendering | 100 % static (SSG). `generateStaticParams` for `/projects/[slug]`. No runtime server code. | — |
| Styling | **CSS Modules + one global tokens file** (`styles/tokens.css`, `styles/globals.css`) | REFACTOR (V1 = 1,340-line global sheet + inline styles) |
| Tailwind | **Not introduced** | see D10 |
| Animation | **`motion`** (successor package of framer-motion), only inside 2–3 client islands; everything else CSS | CHANGE package name, shrink usage |
| Fonts | `next/font/google` (Syne, DM Sans) + system stacks | CHANGE |
| Images | `next/image` with static imports (intrinsic size, lazy, AVIF/WebP, blur placeholder) | CHANGE |
| Icons | Local inline SVG `Icon` component | KEEP approach |
| State | Local `useState` in client islands only. No context/store. URL is the state for navigation and filters. | SIMPLIFY |
| Lint / format | ESLint 9 flat config with `eslint-config-next` (+ Prettier, optional) | ADD config |
| Tests / QA | Playwright + `@axe-core/playwright` (dev-only) for smoke, responsive screenshots, a11y | ADD |
| Hosting | Vercel (README mentions it; projects live on `*.vercel.app`) — **USER INPUT REQUIRED** Q10 | — |

Why the App Router now when `BRAIN.md §37` warned against it: that warning assumed V1's architecture, where *everything* is interactive. In V2 almost nothing is interactive; Server Components are the cheapest way to meet the "minimal JavaScript / no unnecessary client components" requirement. Since most components are being rewritten anyway, the migration cost is paid once.

## 3. Folder structure (RECOMMENDATION)

```
app/
  layout.tsx                 <html lang="en">, fonts, metadata base, SkipLink, Wallpaper, SiteHeader, SiteFooter, Dock
  page.tsx                   Home: Hero, FeaturedWork, About, Experience, Skills, Contact (server)
  projects/
    page.tsx                 Projects index (server; reads ?tag)
    [slug]/
      page.tsx               Project detail (server; generateStaticParams + generateMetadata)
  not-found.tsx              404 alert dialog
  sitemap.ts                 from data/projects + static routes
  robots.ts
  opengraph-image.png        1200×630 static social image (+ twitter-image.png)
  icon.svg / favicon.ico / apple-icon.png   (move existing favicon set)
  manifest.ts (or keep public/site.webmanifest)
components/
  layout/      SiteHeader, MobileMenu*, SiteFooter, Section, Container, SkipLink, Wallpaper
  navigation/  NavLinks, ActiveSectionObserver*, Dock*, DockItem*
  hero/        Hero, AboutThisDeveloper
  projects/    ProjectCard, ProjectGrid, ProjectFilter, ProjectHeader, ProjectLinks, ProjectGallery, ProjectPager
  experience/  Timeline, TimelineItem, EducationList, CertificationList
  skills/      SkillGroups, SkillGroup
  contact/     ContactPanel, CopyEmailButton*
  resume/      ResumeButton
  ui/          Button, ButtonLink, Tag, StatusPill, GlassPanel, WindowFrame, TrafficLights, Icon, VisuallyHidden
  system/      LocalClock*
  motion/      Reveal* (IntersectionObserver + CSS class; no motion lib)
data/
  site.ts  profile.ts  navigation.ts  social.ts
  projects.ts  experience.ts  education.ts  certifications.ts  skills.ts
lib/
  types.ts     content types (Project, Experience, …)
  content.ts   getters: getFeaturedProjects(), getProjectBySlug(), getProjectsByTag(), getSkillUsage()
  seo.ts       buildMetadata(), personJsonLd()
  validate.ts  build-time content checks (unique slugs, image exists, featured count = 3, URLs https)
styles/
  tokens.css   all design tokens (V2_DESIGN_SYSTEM.md)
  globals.css  reset, base typography, focus styles, utilities (.visually-hidden, .container)
public/
  Anubhav_Sethi_Resume.pdf
  images/ (originals kept until migration completes)
assets/
  projects/    optimised source images imported statically by next/image
tests/
  smoke.spec.ts  responsive.spec.ts  a11y.spec.ts
docs/            this specification
```

`*` = client component (`'use client'`). Target: **≤ 6 client components** in total: `MobileMenu`, `Dock` (+`DockItem`), `ActiveSectionObserver`, `CopyEmailButton`, `LocalClock`, `Reveal`. Everything else is a Server Component and ships zero JS.

## 4. Is a "window" abstraction still useful?

**Yes — as a purely visual component.** `WindowFrame` renders a title bar (decorative `TrafficLights` + title) and a content slot. It has no state, no drag, no open/close/minimise, no z-index management. It is used by `ProjectCard`, `AboutThisDeveloper`, `ContactPanel` and the 404 dialog.

```tsx
<WindowFrame title="OfficeFlow" as="article" variant="card | panel | dialog">
  {children}
</WindowFrame>
```

- `TrafficLights` is `aria-hidden="true"`, made of `<span>`s, never `<button>`s.
- The title bar text is presentational; the real heading lives in the content (correct heading order).

V1's `Desktop.jsx` window manager, `Window.jsx` drag logic and the `openApps/minimizedApps/appStack` state are **not carried over**.

## 5. Navigation / section registry (RECOMMENDATION)

Replaces V1's three hardcoded lists (Desktop if/else, `appStack` literal, Dock `apps[]`). One source of truth:

```ts
// data/navigation.ts
export type NavItem = {
  id: string;                     // stable key, also the section anchor for kind 'section'
  label: string;                  // visible text
  href: string;                   // '/#work', '/projects', '/resume', 'https://github.com/…'
  kind: 'section' | 'page' | 'file' | 'external' | 'email';
  placements: Array<'header' | 'mobileMenu' | 'dock' | 'footer'>;
  icon?: IconName;                // required when placed in 'dock'
  ariaLabel?: string;             // e.g. 'Résumé (PDF, 1.8 MB, opens in new tab)'
};

export const navigation: NavItem[] = [
  { id: 'work',       label: 'Work',       href: '/#work',       kind: 'section', placements: ['header','mobileMenu','footer'] },
  { id: 'about',      label: 'About',      href: '/#about',      kind: 'section', placements: ['header','mobileMenu','footer'] },
  { id: 'experience', label: 'Experience', href: '/#experience', kind: 'section', placements: ['header','mobileMenu','footer'] },
  { id: 'skills',     label: 'Skills',     href: '/#skills',     kind: 'section', placements: ['header','mobileMenu'] },
  { id: 'contact',    label: 'Contact',    href: '/#contact',    kind: 'section', placements: ['header','mobileMenu','footer'] },
  { id: 'projects',   label: 'All projects', href: '/projects',  kind: 'page',    placements: ['mobileMenu','footer'] },
  { id: 'resume',     label: 'Résumé',     href: '/resume',      kind: 'file',    placements: ['header','mobileMenu','dock','footer'], icon: 'file' },
  // social items are generated from data/social.ts with placements ['dock','footer','mobileMenu']
];
```

- `Section` components take their `id` from the registry so anchors cannot drift.
- `lib/validate.ts` asserts every `section` item has a rendered section (checked in a Playwright test) and every `dock` item has an `icon`.

## 6. Component inventory

| Component | Server/Client | Props (essentials) | Reuse | Source in V1 |
|---|---|---|---|---|
| `SiteHeader` | S (+ client `MobileMenu`, `LocalClock`, `ActiveSectionObserver`) | `items` | 1 | new (replaces desktop + dock as primary nav) |
| `MobileMenu` | C | `items`, `socials` | 1 | new |
| `Dock` / `DockItem` | C | `items` | 1 | **adapted** from `Dock.jsx` magnification math (`useTransform` distance → size, `useSpring`) |
| `Wallpaper` | S | — | 1 | replaces `desktop-bg` + blurred `profile.jpg` |
| `Hero` | S | `profile` | 1 | new; copy from `AboutApp.jsx` |
| `AboutThisDeveloper` | S | `profile` | 1 | new |
| `WindowFrame` / `TrafficLights` | S | `title`, `variant`, `as` | 4+ | visual parts of `Window.jsx` + `.os-window*` CSS |
| `ProjectCard` | S | `project`, `priority?` | 3 (home, index, related) | `ProjectsApp.jsx` card |
| `ProjectGrid` / `ProjectFilter` | S | `projects`, `activeTag` | 2 | `filters` idea from `data/projects.js` |
| `ProjectHeader` / `ProjectLinks` / `ProjectGallery` / `ProjectPager` | S | `project` | 1 each | `ProjectsApp.jsx` detail view |
| `Timeline` / `TimelineItem` | S | `items` | 1–2 | `AboutApp.jsx` experience tab + `.timeline-*` CSS |
| `EducationList`, `CertificationList` | S | `items` | 1 | `AboutApp.jsx` |
| `SkillGroups` | S | `groups` | 1 | `AboutApp.jsx` skills tab |
| `ContactPanel` | S | `profile`, `socials` | 1 | `ContactApp.jsx` (minus form) |
| `CopyEmailButton` | C | `email` | 1–2 | new |
| `LocalClock` | C | `timeZone`, `label` | 1 | `AboutApp.jsx` `LocalClock` (fixed: no Tailwind, minute precision, correct label) |
| `Reveal` | C | `children`, `delay?` | many | replaces legacy `useInView` hook |
| `Button`, `ButtonLink`, `Tag`, `StatusPill`, `GlassPanel`, `Icon` | S | — | many | consolidates inline-styled buttons in `AboutApp.jsx` |

Business logic lives only in `lib/content.ts` (selectors) and `lib/validate.ts`. Components are presentational.

## 7. Data flow

```
data/*.ts (typed constants)
   │  imported at build time by Server Components
   ▼
lib/content.ts selectors  ──►  app/page.tsx, app/projects/**  ──►  components (props)  ──►  static HTML
   │
   └──► lib/seo.ts (metadata, JSON-LD), app/sitemap.ts

Client islands receive only the props they need (serialisable): Dock(items), MobileMenu(items), CopyEmailButton(email), LocalClock(tz).
URL state: /projects?tag=ai (filter), #section anchors.
No fetch, no API routes, no env vars at runtime. Optional: NEXT_PUBLIC_SITE_URL for metadataBase (or hardcode in data/site.ts).
```

## 8. Dependency plan

| Package | Action | Why |
|---|---|---|
| `next` 14.2.3 | **CHANGE → current stable** | `npm audit` reported 1 critical + 3 high on 14.2.3 (from earlier analysis); App Router + React 19 features; `next lint` is deprecated → run ESLint directly |
| `react`, `react-dom` ^18 | **CHANGE → ^19** | Required by Next 15+ |
| `framer-motion` ^11 | **REPLACE with `motion`** (^12) | Same team, renamed package; React 19 support; import from `motion/react`; use `LazyMotion` + `m` in the dock to keep bundle small. Only used by `Dock` (and optionally `MobileMenu`). |
| `clsx` | **REMOVE** | Never imported (VERIFIED). Re-add only if conditional classes become messy. |
| `@types/node`, `@types/react`, `@types/react-dom` | **KEEP → update** | Now actually used (TypeScript) |
| `typescript` | **ADD** (dev) | Typed content schemas |
| `eslint`, `eslint-config-next` | **KEEP → update + add flat config** | Lint is currently unconfigured |
| `@playwright/test`, `@axe-core/playwright` | **ADD** (dev, Phase 7) | Responsive/a11y regression checks; no runtime cost |
| `prettier` | OPTIONAL (dev) | Formatting consistency |
| Tailwind, UI kits, icon libraries, `next-sitemap`, `next-seo`, state libraries, form services | **DO NOT ADD** | Built-ins cover sitemap/metadata; ~15 icons don't justify a library |

## 9. Configuration changes (Phase 1)

- `next.config.ts`: remove deprecated `images.domains`; add `redirects()` for `/resume → /Anubhav_Sethi_Resume.pdf` (permanent: false); `images.formats: ['image/avif','image/webp']`. Security headers optional (static site; Vercel defaults suffice).
- `tsconfig.json` replaces `jsconfig.json`; keep `@/*` alias and **actually use it**.
- `.gitignore`: add `temp_impeccable/`, `.impeccable/` (or commit it intentionally), `.agents/`, `/test-results/`, `/playwright-report/`.
- `package.json` scripts: `dev`, `build`, `start`, `lint: eslint .`, `typecheck: tsc --noEmit`, `test:e2e: playwright test`, `check: npm run lint && npm run typecheck && npm run build`.
- Node: pin with `"engines": { "node": ">=20" }` (local is 22.22.3 — VERIFIED).

## 10. Upgrade risks specific to this stack

| Risk | Mitigation |
|---|---|
| Next major jump (14 → 16) changes defaults (Turbopack, caching, async `params`) | Fresh `app/` code written against current docs, not migrated line by line; `params` awaited in `[slug]/page.tsx` |
| `motion` API differences vs framer-motion 11 | Only the dock uses it; port `useMotionValue/useTransform/useSpring` (same API) and test |
| `next/image` on a static export | If hosting needs `output: 'export'`, set `images.unoptimized: true` and pre-optimise images in Phase 6 — decide after Q10 |
| Fonts via `next/font` change metrics | `adjustFontFallback` default; verify CLS in Phase 6 |
| Removing global `overflow:hidden`/`user-select:none` | Intended (normal scrolling page); verify no horizontal overflow |
