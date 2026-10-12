# V2 — Design System

> Labels: VERIFIED · INFERRED · RECOMMENDATION · UNKNOWN · USER INPUT REQUIRED.
> Contrast ratios below were **computed** (WCAG relative-luminance formula) on 2026-10-08.

## 1. Existing design system (V1, VERIFIED from `styles/globals.css` and components)

| Category | V1 values | Notes |
|---|---|---|
| Background | `--bg #080808`; desktop radial gradient `#161618 → #09090b`; blurred `profile.jpg` wallpaper (`blur(35px) brightness(.35)`) | Wallpaper is a photo of the owner, blurred into an abstract dark wash |
| Surfaces | `--surface #111`, `--surface-2 #181818`; bypassed by hardcoded `#141416`, `#18181c`, `rgba(13,13,14,.82)` | Tokens exist but are not used consistently |
| Text | `--text #F0EEE8`, `--text-mid #A09A90`, `--text-muted #6B6960`; plus Tailwind greys `#a1a1aa #6b7280 #9ca3af #d1d5db #e4e4e7 #f3f4f6` hardcoded | Two parallel grey systems |
| Accent | `--accent #C8F04E` (lime); hover `#b8e03e` hardcoded; `--accent-dim` 8 %, `--accent-dim2` 14 % | Strong, distinctive identity colour |
| Borders | `rgba(255,255,255,.06)` / `.08` / `.14` | Hairlines |
| Traffic lights | `#ff5f56 #ffbd2e #27c93f` | Functional buttons in V1 |
| Type | Syne (display, 400–800) + DM Sans (body 300/400/500, italic 300) from Google Fonts — **loaded twice** (`@import` in CSS + `<link>` in `_document.js`) | html font-size 18 px, but UI text is 11–14 px |
| Labels | 11 px, uppercase, `letter-spacing .1em`, `#6b7280` — copy-pasted inline ~8× in `AboutApp.jsx` | Fails contrast (see §3.1) |
| Radius | window 14, dock 24, dock icon 16, shortcut 15, buttons/cards 8, pills 100 | No scale |
| Shadows | window `0 25px 65px rgba(0,0,0,.65)` + inset hairline; dock `0 15px 35px rgba(0,0,0,.4)` | Heavy single level |
| Blur | window `blur(24px) saturate(120%)`, dock `blur(20px)`, tooltip `blur(8px)`, wallpaper `blur(35px)` | No fallback, no levels |
| Gradients | app icons (`AppIcons.jsx`) use per-icon linear gradients; desktop radial; dot-grid overlay 30 px | — |
| Motion | springs (window open 0.4 s), dock magnification 60→90 px, intro curtain `[0.76,0,0.24,1]` 0.8 s, CSS hovers 0.2 s | No reduced-motion handling |
| Icons | hand-drawn inline SVG (Feather-like 24×24 stroke icons; colourful gradient app icons) | Some rely on missing Tailwind classes → render as black fills |
| Breakpoints | one: `max-width: 768px` (CSS) vs `innerWidth < 768` (JS) | Off-by-one at exactly 768 |

**What is worth keeping:** the dark base, the lime accent, Syne's character, glass windows with inset hairline, the gradient app-icon style, the "AS." mark. **What must change:** contrast of muted text, token discipline (no hardcoded greys), a real type scale, spacing/radius/shadow scales, reduced-motion support, blur fallbacks.

## 2. macOS-inspired direction

The reference (`https://macos-web.app/`, viewed 2026-10-08) shows: a thin translucent **menu bar** across the top, a full-bleed **gradient wallpaper** (Ventura-style soft shapes), a **centred dock** with rounded-square icons, a boot screen, and windows with traffic lights. V2 takes its *visual vocabulary* and *polish* — not its behaviour.

### 2.1 Visual inspiration

| Element | Status | How it is used in V2 |
|---|---|---|
| Translucent glass surfaces + backdrop blur | **REQUIRED** | Header, panels, cards, dock, mobile menu. Max ~6 blurred surfaces on screen at once. |
| Rounded geometry (continuous-looking corners) | **REQUIRED** | Radius scale §6 |
| Soft layered depth | **REQUIRED** | 3 shadow levels §7 |
| Refined typography with tight display tracking | **REQUIRED** | §4 |
| Wallpaper | **REQUIRED** | Pure CSS layered radial/conic gradients in dark graphite with a faint lime and a cool blue glow — evokes macOS wallpapers without images. Fixed behind content (`position: fixed` layer, not `background-attachment: fixed`, which is janky on iOS). |
| Menu-bar header | **REQUIRED** | Primary navigation, styled like the macOS menu bar (logo at left like the Apple menu, text items, clock at right). |
| Window chrome on cards | **REQUIRED** (projects only) | Title bar with **decorative** traffic-light dots (`aria-hidden`, not buttons), title text, content area. |
| "About This Developer" panel | **REQUIRED** | Content panel in the hero styled like *About This Mac*. |
| App-icon style (gradient rounded squares) | **OPTIONAL** | For dock items and section icons. Re-use/adapt `AppIcons.jsx` (GitHub, LinkedIn) and add Behance/Email/Résumé. |
| Subtle vibrancy (`saturate(150–180%)`) | **OPTIONAL** | On glass only. |
| Light mode | **OPTIONAL / later** | Tokens are semantic so a light theme can be added. v2.0 is dark-only. |

### 2.2 Interaction inspiration

| Interaction | Status | Rule |
|---|---|---|
| Dock magnification on hover | **OPTIONAL** (desktop, `pointer: fine`, motion allowed) | Max scale 1.35, no layout shift of the page, no vertical jump > 4 px. Links work instantly without hover. |
| Window-open feel for project navigation | **OPTIONAL** | Card → project page uses a short scale/fade (≤ 250 ms) or the View Transitions API where supported. Real navigation, real URL. |
| Hover lift on cards | **REQUIRED** | translateY(-2px) + shadow level up, 150 ms. |
| Focus rings in accent | **REQUIRED** | Visible on every interactive element. |
| Tooltips (dock labels) | **REQUIRED where icons have no visible text** | Show on hover **and** focus; the accessible name never depends on the tooltip. |
| Menu-bar active-section highlight | **OPTIONAL** | Progressive enhancement. |
| Live clock in menu bar | **OPTIONAL** | HH:MM IST, updates once per minute, hidden < 1024 px. |
| Command-palette (⌘K) | **SHOULD NOT (v2.0)** | Nice, but not needed for ~6 destinations. |

### 2.3 Should NOT be used

Draggable windows · functional traffic-light buttons · minimise/maximise · desktop icons that must be double-clicked · boot/loading screen · fake Finder/Terminal/Settings/Trash · right-click context menus · custom cursor · Apple logo or Apple trademarks/system icons/SF Pro webfont (licensing — SF Pro may not be embedded as a webfont; use the OS stack instead) · notifications/alerts that interrupt · sound effects · menu-bar dropdown menus that hide primary nav.

## 3. Colour tokens (RECOMMENDATION)

Dark-only for v2.0. Semantic names so a light theme can be added by redefining tokens.

```css
:root {
  /* Base */
  --color-bg:            #08080A;   /* page base under the wallpaper */
  --color-surface:       #111114;   /* opaque surface (fallbacks, footer) */
  --color-surface-raised:#18181C;   /* elevated opaque surface */
  --color-glass:         rgba(22, 22, 26, 0.62);   /* default glass fill */
  --color-glass-strong:  rgba(18, 18, 22, 0.80);   /* header, menus, small text on glass */
  --color-glass-subtle:  rgba(255, 255, 255, 0.04);/* inner wells, chips */

  /* Text */
  --color-text:          #F0EEE8;   /* 17.3:1 on bg */
  --color-text-secondary:#A09A90;   /* 7.2:1 on bg, 5.9:1 on #1E1E23 */
  --color-text-muted:    #8C887E;   /* 5.7:1 on bg, 4.7:1 on #1E1E23 — replaces #6B6960 */
  --color-text-on-accent:#08080A;   /* 15.3:1 on lime */

  /* Lines */
  --color-border:        rgba(255, 255, 255, 0.08);
  --color-border-strong: rgba(255, 255, 255, 0.16);
  --color-highlight:     rgba(255, 255, 255, 0.10);  /* inset top hairline on glass */

  /* Brand */
  --color-accent:        #C8F04E;
  --color-accent-hover:  #D6F77A;   /* lighter on dark (V1 darkened to #b8e03e) */
  --color-accent-soft:   rgba(200, 240, 78, 0.12);
  --color-accent-ring:   rgba(200, 240, 78, 0.55);

  /* Status */
  --color-success:       #28C840;   /* 9.0:1 on bg */
  --color-warning:       #FEBC2E;   /* 11.9:1 */
  --color-error:         #FF5F57;   /* 6.7:1 */

  /* Decorative (traffic lights — never convey meaning) */
  --color-tl-close: #FF5F57; --color-tl-min: #FEBC2E; --color-tl-max: #28C840;

  /* Wallpaper glows */
  --wallpaper-glow-1: rgba(200, 240, 78, 0.10);
  --wallpaper-glow-2: rgba(80, 120, 255, 0.12);
}
```

### 3.1 Evaluation of the lime accent

| Pair | Ratio | Verdict |
|---|---|---|
| `#C8F04E` on `#080808` | 15.3 : 1 | Excellent for text, icons, focus rings |
| `#080808` on `#C8F04E` (button label) | 15.3 : 1 | Excellent |
| `#C8F04E` on glass `#1E1E23` | 12.7 : 1 | Excellent |
| V1 `--text-muted #6B6960` on `#080808` | **3.6 : 1** | **Fails AA** for body text → replaced by `#8C887E` |
| V1 label grey `#6b7280` on `#080808` / `#1E1E23` | **4.1 / 3.4 : 1** | **Fails AA** at 11 px → replaced |

**Decision: keep the lime** (`V2_DECISIONS.md` D8). It is distinctive, has the "AS." favicon set built around it, and passes contrast easily on dark. Rules: use it for one primary CTA per view, focus rings, active nav, small accents — never for large background areas or long text.

## 4. Typography

| Role | Family | Weight | Size (mobile → desktop, `clamp`) | Line height | Tracking |
|---|---|---|---|---|---|
| Display (hero name) | **Syne** | 700–800 | `clamp(2.75rem, 7vw + 1rem, 6rem)` | 0.95 | -0.04em |
| H1 (sub-pages) | Syne | 700 | `clamp(2rem, 3vw + 1rem, 3.25rem)` | 1.05 | -0.03em |
| H2 (section) | Syne | 700 | `clamp(1.5rem, 1.5vw + 1rem, 2.25rem)` | 1.15 | -0.02em |
| H3 (card title) | DM Sans | 600 | `1.125rem` → `1.25rem` | 1.3 | -0.01em |
| Body | **DM Sans** | 400 | `1rem` (16 px) → `1.0625rem` (17 px) | 1.6 | 0 |
| Body large (intro) | DM Sans | 400 | `1.125rem` → `1.25rem` | 1.55 | 0 |
| UI / chrome (menu bar, dock tooltips, window titles, buttons) | **System stack** `-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif` | 500 | `0.8125rem`–`0.875rem` | 1.2 | 0 |
| Caption / eyebrow | DM Sans | 500 | `0.75rem`, uppercase | 1.4 | 0.08em |
| Mono (tags, code, time) | `ui-monospace, "SF Mono", Menlo, Consolas, monospace` | 400–500 | `0.8125rem` | 1.4 | 0 |

- The system stack gives real SF Pro on Apple devices for chrome text — the most authentic macOS cue at zero bytes.
- Load fonts with `next/font/google` (self-hosted, no layout shift). Weights: Syne 700, 800; DM Sans 400, 500, 600 (+ 400 italic only if used). V1 loads 5 Syne + 4 DM Sans variants.
- Minimum body size 16 px; nothing interactive below 13 px. V1's 11 px labels are retired.

## 5. Spacing

4 px base, named scale:

| Token | px | Typical use |
|---|---|---|
| `--space-1` | 4 | icon gaps |
| `--space-2` | 8 | chip padding, tight stacks |
| `--space-3` | 12 | button padding-y, list gaps |
| `--space-4` | 16 | card padding (mobile), page gutter (mobile) |
| `--space-5` | 24 | card padding (desktop), grid gap |
| `--space-6` | 32 | gutter (tablet), group gaps |
| `--space-7` | 48 | gutter (desktop) |
| `--space-8` | 64 | section gap (mobile) |
| `--space-9` | 96 | section gap (desktop) |
| `--space-10` | 128 | hero top padding (large) |

Containers: `--container-max: 1200px` (content), `--container-wide: 1360px` (project grids at ≥1536), `--container-text: 68ch` (prose). Page gutter: 16 / 24 / 32 / 48 px at <390 / ≥390 / ≥768 / ≥1280.

## 6. Radius

| Token | px | Use |
|---|---|---|
| `--radius-sm` | 6 | chips, tags, small buttons, inputs |
| `--radius-md` | 10 | buttons, dock tooltips |
| `--radius-lg` | 14 | cards, windows, panels (V1's window radius retained) |
| `--radius-xl` | 22 | dock, mobile sheet, hero panel |
| `--radius-pill` | 999 | status pills, filter chips |

Nested radius rule: inner = outer − padding (e.g. 14 px card with 6 px inset image → 8 px).

## 7. Shadows / depth

| Level | Token | Value | Use |
|---|---|---|---|
| 0 | — | none + 1 px border | flat chips |
| 1 | `--shadow-1` | `0 1px 2px rgba(0,0,0,.4), 0 4px 12px rgba(0,0,0,.25)` | cards at rest, header |
| 2 | `--shadow-2` | `0 8px 24px rgba(0,0,0,.40), 0 2px 6px rgba(0,0,0,.30)` | hovered cards, dock |
| 3 | `--shadow-3` | `0 24px 64px rgba(0,0,0,.55), 0 4px 12px rgba(0,0,0,.35)` | hero panel, mobile sheet, 404 dialog |
| inset | `--shadow-highlight` | `inset 0 1px 0 var(--color-highlight)` | every glass surface (top edge sheen, V1's best detail) |

## 8. Blur / glass

| Token | Value | Use |
|---|---|---|
| `--blur-sm` | `blur(8px) saturate(140%)` | chips/tooltips over content |
| `--blur-md` | `blur(16px) saturate(160%)` | cards, panels |
| `--blur-lg` | `blur(28px) saturate(180%)` | header, dock, mobile sheet |

Rules:
1. `@supports not (backdrop-filter: blur(1px))` → use `--color-glass-strong` / opaque surface.
2. `@media (prefers-reduced-transparency: reduce)` → opaque surfaces (macOS "Reduce transparency" parity).
3. Mobile (< 768): use `--blur-md` max and fewer blurred layers; project cards use opaque `--color-surface-raised` (GPU cost).
4. Body text on glass must still meet 4.5:1 against the *lightest* point of the wallpaper behind it → glass alpha ≥ 0.6.

## 9. Motion

| Token | Value |
|---|---|
| `--duration-instant` | 100 ms (press) |
| `--duration-fast` | 150 ms (hover, focus) |
| `--duration-base` | 250 ms (menus, tooltips) |
| `--duration-slow` | 400 ms (entrances, sheet) |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-emphasized` | `cubic-bezier(0.32, 0.72, 0, 1)` (macOS-like sheet/dock feel) |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` |
| Spring (motion lib, dock only) | `{ stiffness: 300, damping: 26, mass: 0.2 }` |

| Pattern | Spec |
|---|---|
| Hover | colour/border/shadow 150 ms; card translateY(-2px) |
| Press | scale(0.98) 100 ms |
| Entrance (sections) | opacity 0→1 + translateY(12px→0), 400 ms, once, triggered at 15 % visibility; stagger ≤ 60 ms, max 6 items. Content must be visible without JS (CSS-only or `@starting-style`/IntersectionObserver adds the class). |
| Hero | name + panel fade/rise on load, 400 ms, panel delayed 120 ms. No splash. |
| Exit | 200 ms, `--ease-exit` |
| Mobile menu | sheet slides/fades 250 ms `--ease-emphasized`; backdrop fade |
| Page transitions | Optional View Transitions API cross-fade (≤ 250 ms) for card → project page; no JS animation library required for this. |
| Dock | magnification spring, desktop only |

**Reduced motion** (`prefers-reduced-motion: reduce`): no translate/scale animations; entrances become instant (or 150 ms opacity only); dock magnification disabled; View Transitions disabled; smooth scrolling disabled (`scroll-behavior: auto`). No infinite animations anywhere in V2 (V1's Cursor rAF loop and legacy marquee are removed).

## 10. Iconography

- Line icons: 24×24 grid, 1.75 px stroke, round caps — consistent with V1's Feather-style inline SVGs. Implement as a small local `Icon` component with an internal map; set `fill`/`stroke` via SVG attributes or CSS (never Tailwind classes).
- Brand icons (GitHub, LinkedIn, Behance): monochrome glyphs in dock/contact; V1's gradient app-icon versions may be kept for the dock (optional).
- Unique SVG gradient IDs per instance (`useId`) — V1 duplicates IDs because each icon renders twice.
- No icon font, no icon library dependency for ~15 icons.

## 11. Component visual specs (summary)

| Component | Spec |
|---|---|
| Button primary | lime bg, `--color-text-on-accent`, 600, radius-md, height 44 (48 on mobile), padding-x 18 |
| Button secondary | glass-subtle bg, border, text colour, same metrics |
| Link button (ghost) | text + arrow icon, underline on hover/focus |
| Tag/chip | mono 13 px, radius-sm, glass-subtle bg, border; *featured/core* variant: accent-soft bg + accent text |
| Status pill | radius-pill, 8 px success dot + text ("Open to internships" — wording Q2) |
| Window card | radius-lg, glass, shadow-1 → shadow-2 on hover, 36 px title bar with 3 × 12 px decorative dots + centered title, 16:10 media |
| Panel | radius-xl, glass, shadow-3, highlight inset |
| Menu bar | height 44, blur-lg, border-bottom, system font 13–14 px |
| Dock | radius-xl, blur-lg, padding 8, item 48 px (→ 64 magnified), gap 8, tooltip above |
| Timeline | 1 px border-left line, 9 px accent dot (current role) / muted dot (past) |
