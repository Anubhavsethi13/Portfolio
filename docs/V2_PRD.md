# Portfolio V2 — Product Requirements Document

> Status: **Planning / specification only. Nothing in this document is implemented yet.**
> Written 2026-10-08 after a fresh read of the whole repository. The earlier `BRAIN.md`, `PORTFOLIO_ANALYSIS_REPORT.md` and `PROJECT_MAP.md` were used as hypotheses and re-verified (see §9).
>
> Labels used across all V2 docs:
> **VERIFIED** = confirmed in repository source · **INFERRED** = reasonable conclusion from evidence · **RECOMMENDATION** = proposed V2 decision · **UNKNOWN** = cannot be determined from the repo · **USER INPUT REQUIRED** = needs the owner.

Companion documents (all in `docs/`):

| Doc | Covers |
|---|---|
| `V2_DECISIONS.md` | The 16 binding decisions, with reasons and trade-offs |
| `V2_INFORMATION_ARCHITECTURE.md` | Sections, routes, navigation |
| `V2_DESIGN_SYSTEM.md` | Tokens, macOS visual language, motion |
| `V2_TECHNICAL_ARCHITECTURE.md` | Stack, folder layout, components, registry, dependencies |
| `V2_CONTENT_SPEC.md` | Data schemas, content inventory, `CONTENT_VERIFICATION_REQUIRED` |
| `V2_RESPONSIVE_SPEC.md` | Behaviour at 320 → ultrawide |
| `V2_ACCESSIBILITY_SEO_SPEC.md` | A11y requirements, SEO, performance budgets |
| `V2_MIGRATION_PLAN.md` | Preserve / refactor / replace / remove |
| `V2_IMPLEMENTATION_ROADMAP.md` | Phases 0–8 with acceptance criteria |
| `V2_OPEN_QUESTIONS.md` | Only the things the owner must answer |

---

## 1. What this website is

**A personal portfolio for Anubhav Sethi**, built with a macOS-inspired visual language.

It is **not** a macOS simulator, a browser OS, or a set of fake system apps. The macOS influence is limited to *how things look and feel* (glass surfaces, a menu-bar header, a dock of quick links, window-styled cards, refined motion). *How things work* follows ordinary, high-quality website conventions: scrolling, links, real URLs, a visible navigation bar.

> Priority order for every trade-off:
> **Clarity → Content → Usability → Accessibility → Performance → Visual polish → Novel interactions**

## 2. Why V2 is needed (VERIFIED problems in V1)

V1 (`pages/index.js` → `components/Desktop.jsx`) is a window-manager simulation. Its core problem is product-level, not cosmetic:

1. **Content is gated behind OS interactions.** Projects, contact details and experience are only reachable by opening "apps" from desktop icons or a dock. A recruiter has to learn the interface first. (`Desktop.jsx` state `openApps=['about']`.)
2. **There are no URLs.** One route (`/`); state never reaches the address bar. A project can't be shared or linked from a résumé.
3. **Mobile does not work.** Windows inherit desktop `defaultX` offsets (100–350 px) and overflow at 375 px; the 7-icon dock (~530 px) is clipped; window controls are 12 px. (`Window.jsx` L24–32, `Dock.jsx`, `globals.css` `html,body{overflow:hidden}`.)
4. **Most content is invisible to search engines.** Only the default About window is in the prerendered HTML; there is no `<h1>`.
5. **Credibility problems in the content** (e.g. "4+ Years Experience" while the earliest listed role starts Aug 2024; the site positioning disagrees with the résumé). See `V2_CONTENT_SPEC.md §8`.
6. **Engineering debt:** Tailwind class names with no Tailwind installed (unstyled clock, black SVG blobs), ~35% dead code, `next@14.2.3` with published advisories, no git history, a 258 MB `temp_impeccable/` clone in the working tree.

## 3. Audience

| Audience | Priority | What they need | Evidence |
|---|---|---|---|
| Recruiters / hiring managers / internship coordinators | **Primary** | Who he is, what level, what he has built, résumé, how to contact — fast | INFERRED: the résumé is written for job applications ("eager to contribute to cutting-edge AI research initiatives") |
| Developers / technical interviewers | Primary | Real projects, source links, stack, depth of individual contribution | VERIFIED: every project has a GitHub link |
| Collaborators / hackathon judges | Secondary | Projects, interests, contact | INFERRED (Money Heist CTF theme, LLM interests) |
| Freelance clients | **UNKNOWN** | Services, availability | Legacy `Hero.jsx` says "Available for freelance"; legacy FAQ talks about agencies. Not on the live site. → **USER INPUT REQUIRED** (`V2_OPEN_QUESTIONS.md` Q2) |

## 4. The 5–10 second test

Within the first viewport, without scrolling or clicking, a visitor must be able to answer:

1. **Who** — "Anubhav Sethi" (the page `<h1>`).
2. **What** — one role line, e.g. *Full-stack developer · AI/ML* (exact wording **USER INPUT REQUIRED**, Q1).
3. **Where / status** — location (Nagpur, India) and current status (student / open to roles) — **USER INPUT REQUIRED** for status.
4. **Proof** — a glimpse of real work: at least one featured project visible or one scroll away on desktop; directly below the hero on mobile.
5. **Next step** — three obvious actions: **View work**, **Résumé**, **Contact**.

Nothing may delay this: no splash screen (V1's `IntroLoader` hides content for ~2 s), no "click an icon to begin".

## 5. Primary actions (conversion goals)

| # | Action | Where it must be reachable | Measured by (if analytics are approved) |
|---|---|---|---|
| 1 | View a project (case study page) | Hero CTA, featured grid, header nav | clicks to `/projects/[slug]` |
| 2 | Open / download résumé | Header (always visible on desktop), hero, About, footer, mobile menu | clicks on `/resume` |
| 3 | Contact by email | Hero, Contact section, footer, dock | `mailto:` clicks, copy-email clicks |
| 4 | Visit GitHub | Dock, Contact, footer, each project | outbound clicks |
| 5 | Visit LinkedIn | Dock, Contact, footer | outbound clicks |

No other goals. Behance is secondary (design work) and stays as a link.

## 6. Scope — what V2 includes (v2.0)

- Home page with Hero, Featured Work, About (short), Experience & Education, Skills, Contact.
- Projects index (`/projects`) and one page per project (`/projects/[slug]`).
- `/resume` short URL that serves the PDF.
- Custom 404 styled as a macOS alert (re-using V1's "Compiler Error" joke — personality preserved).
- Data-driven content in `data/`.
- macOS visual layer: menu-bar header, glass surfaces, window-styled project cards, desktop dock of quick links, "About This Developer" panel, restrained motion.
- Full mobile experience (not a shrunken desktop).
- SEO basics, accessibility to WCAG 2.2 AA, performance budgets.

## 7. Explicitly NOT building (scope boundary)

Authentication · backend · database · CMS · admin dashboard · contact-form backend · fake OS / window manager · fake Finder / Terminal / System Settings / Trash apps · draggable windows · games · AI chatbot · 3D / WebGL / particles · custom cursor · splash/boot screen · global state library · blog (v2.0) · light mode (v2.0, tokens allow it later) · analytics (unless approved, Q15).

Full reasoning: `V2_DECISIONS.md` D16.

## 8. Success criteria

| Area | Criterion |
|---|---|
| Clarity | 5–10 s test (§4) passes at 375 px and 1440 px |
| Content | Every claim in `CONTENT_VERIFICATION_REQUIRED` resolved by the owner before launch |
| Usability | Every section reachable in ≤ 1 click from the header; every project has a shareable URL |
| Mobile | No horizontal overflow from 320 px to 430 px; all targets ≥ 44×44 px |
| Accessibility | Keyboard-only walkthrough passes; axe: 0 serious/critical; WCAG 2.2 AA contrast |
| SEO | Unique title/description per route; OG image; sitemap; robots; Person JSON-LD |
| Performance | Lighthouse mobile ≥ 90 perf, 100 a11y, 100 SEO; LCP < 2.5 s (mobile, simulated 4G); CLS < 0.05 |
| Security | `npm audit --omit=dev` = 0 high/critical; no phone number on the web unless approved (Q9) |
| Maintainability | Adding a project = one object in `data/projects.ts` + one image |

## 9. Verification of the previous analysis

All major claims in `BRAIN.md` were re-checked against source on 2026-10-08 and **hold**: Next 14.2.3 / React 18.3.1 / framer-motion 11.18.2 (installed versions read from `node_modules`), Pages Router, single route, no `process.env`, no `dangerouslySetInnerHTML`, no `localStorage`, no `:focus-visible` or `prefers-reduced-motion` rules in `globals.css`, Tailwind classes in `AboutApp.jsx` `LocalClock`, `TrashApp.jsx`, `ContactApp.jsx`, `ProjectsApp.jsx`, Dock LinkedIn = `https://linkedin.com`, `max-h: 80vh` invalid CSS at `globals.css:360`, `temp_impeccable/` = 258 MB, 0 commits.

**Corrections / additions found in this pass:**

| Earlier claim | Correction | Label |
|---|---|---|
| "based in Kolkata/Nagpur" (`BRAIN.md §1`) | He is in **Nagpur**. "Kolkata" appears only because the clock uses the IANA timezone `Asia/Kolkata` (= IST) and its label says "Kolkata, IN". The label is misleading. | VERIFIED (`AboutApp.jsx` L10, L27; résumé header) |
| Repo path `Portfolio - Mac - Copy` | Actual path is `D:\Claude\Portfolio - Mac - New` | VERIFIED |
| "Whether the résumé contains a phone number is UNKNOWN" | It **does** contain a phone number (masked here: `+91-*****-*****`) plus email and LinkedIn. It is publicly served from `/public`. | VERIFIED (`pdftotext`) |
| Content inventory | The résumé contains facts **absent from the site**: a B.Tech in CSE at Symbiosis Institute of Technology, Nagpur; a Full Stack Developer internship at Aarkay Techno Consultants (2026) where OfficeFlow was built; extra projects (LangChain/LangGraph agent, Student Exam Chatbot, FinTech platform, FAQ chatbot, CTF platform); PostgreSQL/MySQL/Prisma skills; spoken languages. | VERIFIED (text extraction is partly garbled — exact dates need owner confirmation) |
| `.agents/skills/` empty folder | Still present | VERIFIED |
