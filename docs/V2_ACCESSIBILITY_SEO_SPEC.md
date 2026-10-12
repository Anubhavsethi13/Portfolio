# V2 — Accessibility, SEO & Performance Specification

> Labels: VERIFIED · INFERRED · RECOMMENDATION · UNKNOWN · USER INPUT REQUIRED.
> Target: **WCAG 2.2 AA**.

## Part A — Accessibility

### A1. V1 gaps (VERIFIED)

`<div onClick>` for desktop shortcuts, project cards and trash files (not focusable); contact `<label>`s without `htmlFor`; window controls 12 px with only `title`; no dialog roles/focus management/Esc; global `user-select:none`; no `:focus-visible` styles, inputs use `outline:none`; decorative wallpaper has `alt="Background Wallpaper"`; muted greys fail contrast (3.6:1, 4.1:1); no `prefers-reduced-motion`; no `<h1>`; tooltips only on hover; `window.open` without `noopener`.

### A2. Requirements

| Area | Requirement |
|---|---|
| **Semantic structure** | `<header>` (menu bar) · `<nav aria-label="Primary">` · `<main id="main">` · `<section aria-labelledby>` per section · `<footer>`. Dock is `<nav aria-label="Quick links">`. |
| **Skip link** | First focusable element: "Skip to content" → `#main`, visible on focus. |
| **Headings** | Exactly one `<h1>` per page (home: the name; project page: project title). Sections `<h2>`, cards `<h3>`. Window title bars are **not** headings. No skipped levels. |
| **Keyboard** | Everything reachable with Tab in visual order; no positive `tabindex`; Enter/Space activate; Esc closes the mobile menu; focus never lost after closing (returns to the Menu button). |
| **Focus states** | `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; border-radius: inherit }` on all interactive elements; never `outline:none` without replacement; visible on glass and on lime buttons (dark inner ring on lime). |
| **Focus not obscured** (2.4.11) | `scroll-padding-top` = header height + 16; `scroll-padding-bottom` = dock height + 16. |
| **Links vs buttons** | Navigation = `<a>`. Actions (copy email, open menu) = `<button type="button">`. External links: `target="_blank" rel="noopener noreferrer"` + visually-hidden "(opens in new tab)" + external icon. Résumé link announces "(PDF, x MB)". |
| **Interactive cards** | Project card = `<article>` with the title `<h3><a href>` and a stretched pseudo-element covering the card. Only one link per card in tab order; tags are plain text, not nested links. |
| **Dialogs / menus** | Mobile menu: `<button aria-expanded aria-controls>`; sheet uses `<dialog>` (`showModal()`) or `role="dialog" aria-modal="true"` with focus trap, labelled by its heading, background `inert`. The 404 "alert dialog" is only styled like one: it is a normal page `<main>` with an `<h1>`, and must **not** use `role="alert"` or `role="dialog"` (it does not interrupt anything). |
| **Dock** | Each item is an `<a>` with an accessible name (`aria-label="GitHub (opens in new tab)"`); tooltip shown on hover **and** `:focus-visible`; magnification is purely visual and never changes hit-test geometry in a way that moves the focused item away. |
| **Decorative elements** | Traffic lights, wallpaper, glows, icons next to text: `aria-hidden="true"`, decorative images `alt=""`. |
| **Images** | Project screenshots: descriptive alt ("OfficeFlow dashboard showing the weekly desk-booking calendar") — written per image (USER INPUT REQUIRED for exact descriptions; placeholders not allowed in production — `validate.ts`). Profile photo: "Portrait of Anubhav Sethi". |
| **Contrast** | Body text ≥ 4.5:1, large text/UI components ≥ 3:1 against the worst-case background (glass over brightest wallpaper glow). Token values in `V2_DESIGN_SYSTEM.md §3` pass. Never encode meaning in colour alone (status pill has text; "core" skills have a text/legend, not only green). |
| **Text** | Respect user zoom (no `maximum-scale`), layout works at 200 % zoom and 320 px reflow; no global `user-select:none`. |
| **Reduced motion** | `@media (prefers-reduced-motion: reduce)` per `V2_DESIGN_SYSTEM.md §9`; `motion`'s `useReducedMotion()` in the dock. |
| **Reduced transparency** | `@media (prefers-reduced-transparency: reduce)` → opaque surfaces. |
| **Live regions** | "Email copied" in a polite live region. **Clock is not a live region** (V1 updated every second; V2 updates per minute and is `aria-hidden` with a static visually-hidden "Local time: IST" label, or omitted from AT entirely). |
| **Touch targets** | ≥ 44×44 px (exceeds 2.5.8). |
| **Language** | `<html lang="en">`. |
| **Forms** | V2 has none. If a form is ever added: visible `<label for>`, error text linked by `aria-describedby`, no placeholder-as-label. |
| **PDF** | The résumé PDF itself should be tagged/accessible when re-exported (UNKNOWN current state). |

### A3. Accessible alternative for every clever interaction

| Clever interaction | Accessible alternative |
|---|---|
| Dock magnification | Plain links with names; same links in header/contact/footer |
| Window-styled cards | Real `<article>` + heading + single link |
| Active-section highlight | `aria-current="true"` on the active nav link (only when JS runs; not required) |
| Clock | Static timezone text in About This Developer ("Based in Nagpur, India (IST, UTC+5:30)") |
| Copy email | The email is also visible text and a `mailto:` link |
| View-transition to project page | Ordinary navigation; transition disabled for reduced motion |

## Part B — SEO

Not over-engineered: a static personal site needs correct metadata, crawlable content and a sitemap.

| Item | Spec |
|---|---|
| **Indexable content** | All content server-rendered (V1 only rendered the About window). |
| **Title** | Home: `Anubhav Sethi — {role}` (role from `profile.role`, Q1). Template for others: `%s · Anubhav Sethi`. Project: `OfficeFlow — Project · Anubhav Sethi`. |
| **Description** | Home: 140–160 chars from `profile.tagline`. Project: `project.summary`. |
| **Canonical** | `alternates.canonical` per route, built from `site.url` (`metadataBase`). **Domain UNKNOWN** → Q10. |
| **Open Graph** | `og:type` website (home) / article (project), `og:url`, `og:title`, `og:description`, `og:image` 1200×630, `og:site_name`, `og:locale en_IN`. |
| **Twitter/X** | `twitter:card summary_large_image`; no handle known (omit `twitter:site`). |
| **Social preview image** | One static `app/opengraph-image.png` (name + role + "AS." mark on the wallpaper, lime accent). Per-project: use the project screenshot cropped to 1200×630 (static file per project) — no runtime OG generation needed. |
| **Favicon** | Keep the existing set (VERIFIED: favicon.svg/.ico/16/32, apple-touch-icon 180, android-chrome 192/512, generated 2026-10-03). Move to `app/` file conventions or keep in `public/` with metadata `icons`; **remove the duplicate tags** (V1 declares them in both `_document.js` and `index.js`). |
| **Manifest** | Keep name/short_name/colours; change `display` from `standalone` to `browser` (a portfolio is not an installable app — INFERRED intent). |
| **robots** | `app/robots.ts`: allow all, point to sitemap. Disallow nothing. Preview deployments: `noindex` via Vercel's default `x-robots-tag` on preview URLs (VERIFY on host). |
| **Sitemap** | `app/sitemap.ts`: `/`, `/projects`, each `/projects/[slug]` with `lastModified`. `/resume` excluded (redirect). |
| **Structured data** | Home: `Person` JSON-LD (name, url, jobTitle, address locality Nagpur/IN, sameAs [GitHub, LinkedIn, Behance], alumniOf if confirmed). Project pages: `CreativeWork` (name, description, url, image, dateCreated if known, author → Person). Keep it at that. |
| **Semantic HTML** | One h1, landmarks, descriptive link text ("View OfficeFlow case study", not "Open Project"). |
| **Performance as SEO** | Core Web Vitals budgets in Part C. |
| **Redirects** | `/resume` → PDF (307). If the old site had a live URL with `?` state — none existed (VERIFIED no URL state), so no legacy redirects are needed. |

## Part C — Performance

### C1. V1 problems (VERIFIED)

- 1920 px PNGs (up to 876 KB) used as 60 px desktop icons and small cards; `fitmart.png` 1572×4096; ~3.3 MB of PNGs load when Projects opens; 3 featured images load at startup. Plain `<img>`, no lazy loading, no `sizes`.
- Fonts requested twice; render-blocking CSS `@import`.
- `Cursor` runs `requestAnimationFrame` forever; renders nothing.
- `LocalClock` re-renders every second.
- Heavy blur stack: full-screen 35 px blurred photo + 24 px window blur + 20 px dock blur.
- Intro loader delays content ~2 s (perceived performance).
- Unsplash hotlink as `onError` fallback (external request, privacy).
- All components ship as client JS.

### C2. Budgets (RECOMMENDATION)

| Metric | Budget |
|---|---|
| First-load JS, `/` | ≤ 120 kB gzip (≤ V1's 132 kB; target ~100 kB — framework baseline + ~10 kB islands) |
| Client components | ≤ 6 |
| LCP (mobile, Lighthouse simulated slow 4G) | < 2.5 s (target < 2.0 s) — LCP element should be the hero `<h1>` text, not an image |
| CLS | < 0.05 |
| INP | < 200 ms |
| Total image bytes above the fold (home, mobile) | ≤ 150 kB |
| Per project card image | ≤ 60 kB (AVIF/WebP via `next/image`, `sizes` set) |
| Fonts | 2 families, ≤ 5 weight files, latin subset, `display: swap`, preloaded by `next/font` |
| Long tasks on load | none > 50 ms on mid-tier mobile |
| Infinite animations / rAF loops | 0 |
| Lighthouse (mobile) | Perf ≥ 90, A11y 100, Best Practices ≥ 95, SEO 100 |

### C3. Implementation rules

- Server Components by default; client islands only per `V2_TECHNICAL_ARCHITECTURE.md §3`.
- `next/image` with static imports; `priority` only on the first featured image if it is above the fold on desktop; everything else lazy.
- Crop `fitmart.png` to 16:10 for the card; keep the tall original only in the gallery (lazy).
- Remove the Unsplash fallback; use the local `project-placeholder.svg` (VERIFIED 0.3 KB, currently unused).
- Wallpaper = CSS gradients (no image). Blur limited (`V2_DESIGN_SYSTEM.md §8`).
- `motion` loaded only by the Dock (desktop). Use `LazyMotion` with `domAnimation`. Dock can be `next/dynamic` with `ssr:false` *only* if it is purely decorative — it is links, so SSR the markup and hydrate magnification.
- Reveal animations via IntersectionObserver + CSS classes (no library); disconnect after first reveal.
- Clock: one `setTimeout` aligned to the next minute, then `setInterval(60_000)`; pause when `document.hidden`.
- Résumé PDF never preloaded; consider re-exporting under 500 kB.
- No third-party scripts by default (analytics only if Q15 = yes, then a cookieless, < 2 kB script).
