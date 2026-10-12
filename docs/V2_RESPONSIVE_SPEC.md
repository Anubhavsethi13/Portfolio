# V2 — Responsive Specification (Desktop + Mobile Experience)

> Labels: VERIFIED · INFERRED · RECOMMENDATION · UNKNOWN · USER INPUT REQUIRED.

## 1. V1 responsive behaviour (VERIFIED)

- One breakpoint: CSS `max-width: 768px` (3 separate blocks in `globals.css` at L206, L1310, L1332); JS `window.innerWidth < 768` in `Window.jsx` → exactly 768 px gets desktop JS + mobile CSS.
- `html, body { width:100vw; height:100vh; overflow:hidden }` → no page scroll at any size; `100vw` also causes horizontal overflow when a scrollbar exists.
- Windows: on mobile, width `innerWidth-32`, height `innerHeight-150`, computed **once** on mount, but `x/y` keep desktop offsets (100–350 px) → windows overflow off-screen at 375 px.
- Dock: 7 × ≥60 px + gaps + padding ≈ 530 px → clipped below ~560 px.
- Window controls 12 × 12 px (far below 44 px targets).
- Desktop shortcut labels truncate ("About & C…").

## 2. Principles

1. **Mobile-first CSS**, `min-width` media queries only. Breakpoint tokens: `--bp-sm: 390px`, `--bp-md: 768px`, `--bp-lg: 1024px`, `--bp-xl: 1280px`, `--bp-2xl: 1536px`.
2. The page scrolls normally at every size. No `100vw`, no global `overflow:hidden`. Use `100dvh`/`svh` only for the mobile menu sheet.
3. Layout uses fluid type (`clamp`) and container-relative grids so the gaps between breakpoints are safe.
4. Interaction model is chosen by **capability**, not width: `@media (hover: hover) and (pointer: fine)` enables dock magnification and hover-only affordances; touch devices never depend on hover.
5. No content is hidden on mobile — only chrome changes (clock, dock).

## 3. Desktop experience (≥ 1024 px)

The strongest macOS influence lives here, but the visitor never operates an OS.

| Element | What the user sees | What happens on interaction | Why it exists | Essential / decorative |
|---|---|---|---|---|
| **Wallpaper** | Full-bleed dark gradient with soft lime and blue glows, fixed behind content | Nothing | Sets the macOS "desktop" mood with zero image weight | Decorative |
| **Menu-bar header** | 44 px glass bar: "AS." mark · Work · About · Experience · Skills · Contact … right: `14:32 IST` · **Résumé** button | Links scroll to sections (smooth unless reduced motion) or navigate; active section highlighted while scrolling | Primary navigation in a recognisable macOS form | **Essential** (nav); clock decorative |
| **Hero** | Big "Anubhav Sethi" (Syne), role line, tagline, status pill, CTAs *View work* / *Résumé* / *Contact* | CTAs navigate | 5–10 s test | **Essential** |
| **About This Developer panel** | Floating glass window right of the hero, title bar "About This Developer", key/value rows (Role, Based in, Studying, Focus, Stack, Status) and a "More about me" link | Link scrolls to `#about` | Content-rich macOS homage; quick facts for recruiters | **Essential content**, decorative frame |
| **Featured work** | 3 window-style cards: title bar with decorative traffic lights + project name, screenshot, summary, tags | Whole card is one link → `/projects/[slug]`; hover lifts card, screenshot zooms 1.03 | Proof of work, one click to depth | **Essential** |
| **Project page** | Breadcrumb, title, meta, Live/Source buttons, large framed screenshot, sections, prev/next | Normal links; optional view-transition from card | Shareable depth | **Essential** |
| **Experience** | Glass panel with vertical timeline (left 7 cols) + Education & Certifications (right 5 cols) | None (static) | Credibility | **Essential** |
| **Skills** | 3-column grid of glass group cards with chips; "core" chips accent-tinted | Optional: chip links to `/projects?tag=` | Fit check | **Essential** |
| **Contact** | Compose-window-style panel: "To: aanubhavsethi2405@gmail.com" + Copy, buttons for Email / LinkedIn / GitHub / Behance / Résumé | Copy shows "Copied" (aria-live); links open | Conversion | **Essential** |
| **Dock** | Glass dock bottom-centre with GitHub, LinkedIn, Behance, Email, Résumé, divider, ↑ Top. Hidden while the hero is in view; slides up after | Hover magnifies neighbours (max 1.35×) with tooltip; click opens link | Signature macOS element giving persistent quick access to the conversion links | Decorative form, **useful but non-essential** (everything is also in header/contact/footer) |
| **Footer** | Links, socials, © | Links | Wayfinding | Essential |
| **404** | Centred alert dialog with the "Compiler Error" joke | Go home / View projects | Personality off the main path | Decorative |

Dock rules: never overlaps the footer (hide when footer is in view or add bottom padding = dock height + 24 px); never covers focused elements (scroll-padding-bottom); hidden for `pointer: coarse`.

## 4. Mobile experience (< 768 px)

A normal, high-quality mobile site with macOS *styling*.

| Element | Mobile behaviour |
|---|---|
| Header | 56 px compact glass bar: "AS." · (spacer) · **Résumé** pill · Menu button (44×44, `aria-expanded`). No clock. |
| Menu | Full-height glass sheet (`100dvh`), large tap rows (≥ 52 px) for sections + All projects, socials row, Résumé button. Focus trapped, Esc/close button, background `inert`, body scroll locked. |
| Hero | Single column. Name ≥ 44 px (clamp), role, tagline, status pill, CTAs stacked full-width (primary first). About This Developer panel below as a full-width card. No 100vh lock. |
| Featured work | Single column cards; title bar slimmer (28 px) with smaller decorative dots; whole card tappable; `sizes="100vw"` images. |
| Experience | Single column timeline; education/certifications below. |
| Skills | Single column groups; chips wrap. |
| Contact | Email shown in full (wraps, `overflow-wrap:anywhere`), Copy + Email buttons full-width; socials as a 2-column grid of 48 px buttons. |
| Dock | **Not shown.** Its links live in the menu, contact and footer. (A bottom bar would collide with iOS Safari's toolbar and the home indicator.) |
| Glass | Lighter blur (`--blur-md`), opaque cards for project grids to save GPU. |
| Motion | Entrance animations shorter (250 ms) and fewer; no hover effects. |

**Banned on mobile:** draggable anything, traffic lights as buttons, magnification, hover-only content, horizontal scroll containers for primary content, fixed elements taller than 64 px.

## 5. Breakpoint-by-breakpoint behaviour

| Width | Gutter | Header | Hero | Featured / project grid | Experience | Skills | Dock | Notes |
|---|---|---|---|---|---|---|---|---|
| **320** | 16 | compact (logo, Résumé icon-only + visually-hidden label, menu) | 1 col; name clamps to ~40 px; CTAs full-width stacked | 1 col | 1 col | 1 col | hidden | Smallest supported; verify email wraps, no overflow, tags wrap |
| **375** | 16 | compact; Résumé shows text | 1 col | 1 col | 1 col | 1 col | hidden | Primary mobile QA size |
| **390** | 24 | compact | 1 col | 1 col | 1 col | 1 col | hidden | iPhone 12–15 |
| **430** | 24 | compact | 1 col; CTAs: primary full-width, Résumé + Contact side-by-side | 1 col | 1 col | 1 col | hidden | Large phones |
| **768** | 32 | **full menu bar** (items may condense: Work · About · Experience · Contact; Skills moves to footer) — no clock | 1 col, panel beside text only if ≥ 900; else below | 2 col | 1 col timeline + 2-col education/certs | 2 col | hidden | Tablet portrait; touch-first |
| **1024** | 32 | full menu bar + clock | 2 col (text 55 / panel 45) | 2 col (featured: 1 large spanning 2 rows + 2 stacked) | 2 col (7/5) | 2 col | shown if `pointer: fine` | Tablet landscape / small laptop |
| **1280+** | 48 | full | 2 col, container 1200 | 3 col on `/projects`; featured layout as 1024 | 2 col | 3 col | shown | Primary desktop QA size (1440) |
| **Ultrawide (≥ 1920)** | auto | header content constrained to container; bar itself full-bleed | content max 1200 (grids up to 1360) centred; wallpaper fills | 3–4 col on `/projects` (max 4) | — | 3 col | shown | Never stretch text past 68ch; wallpaper glows scale with `vmax` |

Height-based rules: if `max-height: 700px` and desktop, hero min-height drops to auto; dock hidden if `max-height: 560px`.

Orientation: landscape phones (e.g. 844×390) use the < 768 height rules + tablet-ish width — header remains compact if `max-height < 500px`.

## 6. Touch & input

- Touch targets ≥ 44×44 px (WCAG 2.5.8 needs 24 px; we use Apple's 44 pt), spacing ≥ 8 px.
- No `onMouseEnter`-driven styles (V1 `AboutApp.jsx` uses JS hovers) — CSS `:hover` inside `@media (hover:hover)`.
- `touch-action: manipulation` on buttons; no 300 ms delay concerns.
- Tap highlight replaced by visible `:active` state.

## 7. Overflow guarantees (tested in Phase 7)

`document.documentElement.scrollWidth <= window.innerWidth` at 320/375/390/430/768/1024/1280/1440/1920. Long words (email, URLs, project titles like "Appointment-Scheduling-System-Using-Decentralized-BlockChain") use `overflow-wrap: anywhere`. Images `max-width:100%; height:auto`. Code/mono chips wrap.
