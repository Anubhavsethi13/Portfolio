# V2 — Decision Record

> Every entry is a **RECOMMENDATION** until the owner accepts it. Evidence labels as in `V2_PRD.md`.
> Governing rule for all decisions: **Clarity → Content → Usability → Accessibility → Performance → Visual polish → Novel interactions.** If a macOS gimmick conflicts with portfolio usability, usability wins.

---

### D1. macOS theme vs OS simulator

- **Decision:** macOS is a **visual and interaction theme only**. V2 is a conventional portfolio website (scrolling page + real routes) styled with macOS cues: menu-bar header, glass, window-styled cards, a dock of quick links, "About This Developer" panel.
- **Reason:** V1's simulator gates every piece of content behind OS interactions, has no URLs, breaks on mobile and hides content from search engines (VERIFIED: `Desktop.jsx`, `Window.jsx`). The audience (recruiters, developers) wants answers in seconds.
- **Alternatives considered:** (a) keep the simulator and fix it; (b) simulator on desktop + plain site on mobile; (c) plain site with no macOS styling.
- **Trade-offs:** loses V1's novelty ("drag windows around") which the 2026-08 critique praised as memorable; gains clarity, SEO, mobile, accessibility, and a much smaller maintenance surface. (b) doubles the UI to maintain; (c) loses the distinctive identity.

### D2. Desktop interaction philosophy

- **Decision:** On desktop the visitor **scrolls and clicks links** — nothing more is required. macOS-style interactions (dock magnification, hover lift, window-open feel) are optional enhancements layered on real links. No dragging, no window management, no double-clicking, no hidden menus.
- **Reason:** every interaction must be discoverable without learning; enhancements must never be the only path.
- **Alternatives:** draggable project windows; a fake desktop hero with icons that open sections; a modal "window" for project details.
- **Trade-offs:** less playful; much faster. Modal project windows were rejected because they complicate URLs, focus management and back-button behaviour for little gain.

### D3. Mobile philosophy

- **Decision:** a **purpose-built mobile layout**: compact header + full-screen menu sheet, single-column content, ≥ 44 px targets, no dock, lighter glass. macOS survives only as visual language (glass, radii, type, subtle motion).
- **Reason:** V1 at 375 px is broken (VERIFIED). A shrunken desktop can't be fixed into a good phone experience.
- **Alternatives:** iOS-style bottom tab bar ("mobile dock"); shrunken desktop with sheets.
- **Trade-offs:** a bottom tab bar is thumb-friendly but collides with iOS Safari's bottom toolbar and adds a fixed element on small screens; rejected for v2.0, can be tested later.

### D4. Navigation model

- **Decision:** **Menu-bar header is the primary navigation** (sections + Résumé). **Dock = quick links** (GitHub, LinkedIn, Behance, Email, Résumé, Top) on desktop with fine pointers only. Footer repeats key links. All driven by `data/navigation.ts`.
- **Reason:** a top bar is both the most recognisable macOS element and the most conventional web navigation — the rare case where theme and usability agree. The dock keeps the signature element without making it load-bearing.
- **Alternatives:** dock as primary nav (V1); sidebar nav (Finder-like); hamburger on all sizes.
- **Trade-offs:** some duplication of links across header/dock/footer — intentional, and cheap because it's data-driven.

### D5. Routing model

- **Decision:** **Hybrid.** `/` single page with anchored sections (`#work #about #experience #skills #contact`) + `/projects` + `/projects/[slug]` + `/resume` redirect + 404.
- **Reason:** projects need shareable, indexable URLs; the other sections are too small for their own pages.
- **Alternatives:** A — single page only (no project deep links); B — page per section (thin pages, more clicks).
- **Trade-offs:** two layouts to design (home and project page) vs one; acceptable. Revisit `/about` if content grows.

### D6. Content architecture

- **Decision:** all portfolio content in typed files under `data/` (`site, profile, social, navigation, projects, experience, education, certifications, skills`), consumed through `lib/content.ts` selectors and validated at build by `lib/validate.ts`. Components contain only UI micro-copy.
- **Reason:** V1 embeds content in `AboutApp.jsx`/`ContactApp.jsx`/`Dock.jsx` with duplicates (LinkedIn bug, VERIFIED) and a dead legacy copy.
- **Alternatives:** Markdown/MDX files; headless CMS; JSON.
- **Trade-offs:** TS files require a code edit to update content — fine for a solo-maintained site; MDX can be added later for long case studies. A CMS adds a service, auth and cost for ~20 records.

### D7. Project architecture

- **Decision:** projects are data records with stable `slug`s rendered by one `ProjectCard` (3 contexts) and one statically generated detail template; exactly 3 `featured`; template degrades gracefully when only summary + image + links exist.
- **Reason:** shareable URLs, consistent presentation, one-object-to-add workflow.
- **Alternatives:** project details in a modal over the grid; external links only (no detail pages).
- **Trade-offs:** detail pages are thin until case-study text is written (owner effort, Q6).

### D8. Design system direction

- **Decision:** dark-first, token-driven system keeping V1's identity — **lime `#C8F04E` retained**, Syne (display) + DM Sans (body) retained, system font stack for UI chrome, glass with 3 blur levels, 3 shadow levels, 4 px spacing scale, 5-step radius scale. Muted text raised to `#8C887E` for AA.
- **Reason:** lime passes contrast easily on dark (15.3:1, computed) and is the existing brand (favicons, "AS." mark). The failing greys (3.6:1, 4.1:1) are the real problem, not the palette.
- **Alternatives:** switch to macOS system blue accent; Inter/SF-like single family; light theme first.
- **Trade-offs:** Syne is not macOS-like; it keeps personality and is confined to headings, while the system stack supplies the macOS feel in chrome. Light mode deferred.

### D9. Animation philosophy

- **Decision:** motion clarifies and polishes; it never blocks or loops. Durations 100–400 ms, entrances once, no splash screen, no custom cursor, no infinite animations. CSS for almost everything; the `motion` library only for dock magnification. Full `prefers-reduced-motion` support.
- **Reason:** V1's intro (~2 s), infinite rAF cursor and zero reduced-motion support (VERIFIED) cost time, battery and accessibility.
- **Alternatives:** keep IntroLoader once per session; scroll-driven parallax; page-transition library.
- **Trade-offs:** less spectacle; faster, calmer, accessible.

### D10. Technology strategy

- **Decision:** Next.js current stable, **App Router**, React 19, **TypeScript**, Server Components by default (≤ 6 client islands), **CSS Modules + CSS custom-property tokens (no Tailwind)**, `next/font`, `next/image`, fully static output.
- **Reason:** security advisories on 14.2.3 (`npm audit`, earlier analysis); V2 content is static, so RSC ships almost no JS; TS protects the content schema. Tailwind was half-adopted in V1 (class names without the package → visible bugs, VERIFIED); the design relies on custom glass/blur/token CSS that Tailwind wouldn't remove; CSS Modules match V1's existing CSS skills and keep the dependency list short.
- **Alternatives:** stay on Pages Router (upgrade only); Astro (great fit for static content, but a framework switch away from the owner's stated React/Next skills); Tailwind v4; plain JS.
- **Trade-offs:** App Router + major upgrade is a bigger jump than patching 14.2.x — acceptable because most code is rewritten anyway. TS adds a little ceremony. No Tailwind means writing CSS by hand (fine for ~25 components).

### D11. Dependency strategy

- **Decision:** runtime deps = `next`, `react`, `react-dom`, `motion`. Dev deps = `typescript`, `@types/*`, `eslint`, `eslint-config-next`, `@playwright/test`, `@axe-core/playwright` (+ optional `prettier`). **Remove** `clsx`, `framer-motion`. **Do not add** UI kits, icon libraries, Tailwind, SEO/sitemap plugins, state libraries, form services.
- **Reason:** every runtime dependency costs bytes and upgrade risk; built-ins (Metadata API, `sitemap.ts`, `robots.ts`, `next/font`, `next/image`) cover the needs.
- **Alternatives:** `next-seo`, `next-sitemap`, `lucide-react`, `clsx`.
- **Trade-offs:** a few small utilities are written in-house (icon map, class joining).

### D12. Accessibility strategy

- **Decision:** WCAG 2.2 AA as a release gate: semantic landmarks, one h1, skip link, visible focus everywhere, real links/buttons, accessible mobile menu dialog, decorative macOS chrome hidden from AT, contrast-checked tokens, reduced motion & transparency, 44 px targets; axe in CI + manual keyboard/screen-reader passes.
- **Reason:** V1 fails basic keyboard access (div click targets, no focus styles, VERIFIED). Recruiters and interviewers include people using assistive tech; it is also a visible quality signal for a developer portfolio.
- **Alternatives:** best-effort accessibility without a gate.
- **Trade-offs:** some visual ideas (hover-only reveals, tiny traffic lights as controls) are ruled out.

### D13. SEO strategy

- **Decision:** server-rendered content, per-route title/description/canonical, OG + Twitter large-image cards with a designed static OG image, `robots.ts`, `sitemap.ts`, `Person` + `CreativeWork` JSON-LD. Nothing more.
- **Reason:** for a personal site the goals are "rank for my name" and "look good when shared on LinkedIn".
- **Alternatives:** blog for content marketing; runtime OG image generation; FAQ schema.
- **Trade-offs:** none significant; domain is still unknown (Q10).

### D14. Performance strategy

- **Decision:** budgets as release gates (first-load JS ≤ 120 kB, LCP < 2.5 s mobile, CLS < 0.05, Lighthouse mobile ≥ 90); text-based LCP; CSS wallpaper; `next/image` with static imports; self-hosted fonts; no third-party runtime requests; no loops; limited blur on mobile.
- **Reason:** V1 ships multi-MB PNGs as icons, double-loads fonts and runs an invisible rAF loop (VERIFIED).
- **Alternatives:** no formal budgets.
- **Trade-offs:** glass is toned down on mobile; screenshot quality slightly compressed.

### D15. Migration strategy

- **Decision:** freeze V1 (`v1-desktop` tag + `v1-archive` branch + remote), build V2 on a `v2` branch in the same repo; remove V1/legacy code in Phase 1 (recoverable from the tag); port content only after verification; cut over at Phase 8 with tested rollback.
- **Reason:** the repo has **zero commits** today (VERIFIED) — any change is currently unrecoverable.
- **Alternatives:** new repository; side-by-side `pages/` + `app/` incremental migration; edit V1 in place.
- **Trade-offs:** a "big bang" swap of the UI on the branch, mitigated by the tag and preview deployments. Incremental coexistence was rejected because `/` would be owned by both routers and V1's architecture isn't worth keeping alive.

### D16. What will NOT be built

- **Decision:** no authentication, backend, database, CMS, admin dashboard, contact-form backend, fake OS / window manager / draggable windows, fake Finder / Terminal / System Settings / Trash, games, AI chatbot, 3D / WebGL / particles, custom cursor, splash screen, complex state management, blog (v2.0), light mode (v2.0), stats row (until verified), testimonials (none exist), unnecessary third-party libraries. Analytics only if the owner opts in (Q15).
- **Reason:** high-quality portfolio > feature quantity; each item either gates content, adds runtime cost/maintenance, or has no real content behind it.
- **Alternatives:** keep V1's Trash "Bin of Ideas" and joke dialog as dock apps.
- **Trade-offs:** some personality is lost — partially recovered by moving the joke to the 404 page and keeping the clock, the "About This Developer" homage and the dock.
