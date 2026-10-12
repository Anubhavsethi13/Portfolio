# V2 — Information Architecture

> Labels: VERIFIED · INFERRED · RECOMMENDATION · UNKNOWN · USER INPUT REQUIRED (see `V2_PRD.md`).
> Routing decision rationale: `V2_DECISIONS.md` D5.

## 1. Current IA (V1, VERIFIED)

```
/  (only route)
└── Desktop
    ├── About window  (tabs: About Me · Experience · Skills · Interests · Resume PDF)   ← open by default
    ├── Projects window (grid ↔ detail, no URL)
    ├── Contact window (mailto form)
    ├── "System Warning" joke window
    └── "Trash Bin: Playground" (4 code snippets)
```

Problems: Experience, Education and Certifications are hidden inside a tab called "Experience" of a window called "Information about…"; Projects are two clicks deep and have no URLs; the joke and trash windows have equal weight with real content in the dock.

## 2. V2 site map (RECOMMENDATION — hybrid model)

```
/                         Home — one scrolling page with anchored sections
  #work                   Featured work (3 projects) → links to /projects/[slug]
  #about                  About (short bio + "About This Developer" panel)
  #experience             Experience, Education, Certifications
  #skills                 Skills (grouped)
  #contact                Contact
/projects                 All projects (index, optional tag filter)
/projects/[slug]          Project detail / case study (7 at launch)
/resume                   → serves /Anubhav_Sethi_Resume.pdf (redirect, shareable short URL)
/404                      Custom "Compiler Error" alert page
```

### Why hybrid (summary)

| Criterion | A: single page | B: all routes | **C: hybrid** |
|---|---|---|---|
| SEO | 1 indexable page | many thin pages (About/Experience have little content) | home + 1 rich page per project |
| Shareability / deep links | anchors only | full | full where it matters (projects), anchors for the rest |
| Recruiter UX | fast scan | more clicks | fast scan **and** depth on demand |
| Maintainability | one big page | many near-empty pages | sections reused; project pages generated from data |
| Complexity | lowest | medium | low (static generation from `data/projects`) |

Routes **not** created, and why:

| Rejected route | Reason |
|---|---|
| `/about`, `/experience`, `/skills` | 2 jobs, 2–3 education items and ~25 skills do not justify separate pages; splitting would add clicks and thin pages. Anchors on `/` are enough. Revisit if content grows. |
| `/contact` | Contact is one email + 3 links. An anchor plus header/footer access is enough. |
| `/resume` as an HTML page | The PDF is the canonical résumé. An HTML copy would duplicate content and drift. `/resume` is a redirect only. (Optional later: an HTML résumé for SEO.) |
| `/playground`, `/blog`, `/photography` | See §5. |

## 3. Section specifications

Each row: purpose · visitor goal · content · UI representation · priority · desktop · mobile.

### 3.1 Hero (`/` top) — **P0**
- **Purpose:** pass the 5–10 s test.
- **Visitor goal:** "Who is this, is he relevant to me, where do I go next?"
- **Content:** name (`<h1>`), role line, one-sentence value statement, location + status pill, CTAs: *View work* (primary, lime), *Résumé*, *Contact*. Secondary: "About This Developer" panel.
- **UI:** large Syne name on the CSS "wallpaper"; to the right, a floating glass window titled **"About This Developer"** (macOS *About This Mac* homage) listing Role · Based in · Studying · Focus · Stack · Status as a key/value list. It is real content, not decoration.
- **Desktop:** two columns (text left ~55%, panel right ~45%), min-height ≈ 80vh so the top of Featured Work peeks above the fold.
- **Mobile:** single column; panel becomes a full-width glass card *below* the CTAs; hero height = content height (no 100vh lock).

### 3.2 Featured Work (`#work`) — **P0**
- **Purpose:** proof of ability.
- **Visitor goal:** see the best 3 projects and open one.
- **Content:** 3 projects with `featured: true` (currently OfficeFlow, FitMart, FAQ-Assist — VERIFIED in `data/projects.js`; final choice **USER INPUT REQUIRED** Q6): screenshot, title, one-line summary, role/context, 3 tech tags. Link "All projects (7) →" to `/projects`.
- **UI:** window-styled cards (decorative traffic lights, title in title bar, screenshot as window content).
- **Desktop:** 1 large + 2 stacked, or 3-column grid at ≥1280.
- **Mobile:** single column stack; full card is one link target.

### 3.3 About (`#about`) — **P1**
- **Purpose:** personality and context beyond the role line.
- **Content:** 2 short paragraphs (from `AboutApp.jsx`, to be rewritten by owner — Q1), optional photo (Q8), interests (4, condensed into one line or small chips), spoken languages (from résumé, optional). **No stats row** until numbers are verified (`V2_CONTENT_SPEC.md §8`). The "Beliefs & Philosophy" cards: RECOMMENDATION drop or reduce to one line — they read as generic agency copy.
- **Desktop:** text + photo/panel side by side. **Mobile:** stacked.

### 3.4 Experience & Education (`#experience`) — **P0**
- **Purpose:** trajectory and credibility.
- **Content:** work entries (MachinesWale, K.E.C International, + Aarkay Techno Consultants if confirmed — Q5), education (B.Tech Symbiosis if confirmed — Q4; Diploma NIT Polytechnic; Higher Secondary E-Pathshala), certifications (3, issuer/date needed — Q14).
- **UI:** vertical timeline inside a glass panel; each entry: period · role · organisation · location/remote · 2–4 bullets · tech chips. Education and certifications in a second column on desktop.
- **Mobile:** single column; bullets remain visible (no accordions — content is short).

### 3.5 Skills (`#skills`) — **P1**
- **Purpose:** quick technical fit check.
- **Content:** grouped (see `V2_CONTENT_SPEC.md §5`), with an explicit proficiency tier (**Core** / **Working knowledge**) instead of V1's unexplained "green = featured". Each skill ideally linked to the projects that use it (derived from project `technologies`).
- **UI:** 4–5 glass group cards with text chips. **No logo wall.**
- **Desktop:** 2×2 or 3-column grid. **Mobile:** single column.

### 3.6 Contact (`#contact`) — **P0**
- **Purpose:** convert.
- **Content:** short invitation line (+ availability, Q2), email as a visible link with a **Copy** button, LinkedIn, GitHub, Behance, Résumé.
- **UI:** a glass panel styled like a compose window header ("To: …") but **no form** (V1's mailto form adds friction and shows a false "success" state — VERIFIED `ContactApp.jsx` L17–19).
- **Mobile:** buttons full-width, ≥ 48 px tall.

### 3.7 Footer — **P1**
Name, © year, social links, "Back to top", a one-line credit ("Built with Next.js · macOS-inspired"), last-updated date (optional).

### 3.8 `/projects` — **P0**
Header + all projects as window cards; optional tag filter (data from tags; V1 had a `filters` array — VERIFIED dead). Filter must be a set of real buttons/links (`?tag=ai`), not required for discovery. Sort: featured first, then `order`.

### 3.9 `/projects/[slug]` — **P0**
- Breadcrumb "Projects / OfficeFlow".
- Title, summary, meta row (year · role · context · status), action buttons (Live demo, Source code).
- Large screenshot in a window frame (+ gallery if provided).
- Sections (only rendered when data exists): Overview · My role · What I built (highlights) · Tech stack · Outcome / learnings.
- Prev / next project links.
- Today only a 1–2 sentence `description` exists per project → v2.0 pages will be short until the owner writes case-study content (Q6). The template must look complete with only summary + image + links.

### 3.10 404 — **P2**
A centred macOS-style alert dialog: warning icon, "Compiler Error (0x800F0906)" joke (from `ErrorApp.jsx`), buttons **Go home** (primary) and **View projects**. Personality preserved, out of the main path.

## 4. Navigation model (RECOMMENDATION)

| Element | Breakpoint | Items | Behaviour |
|---|---|---|---|
| **Menu-bar header** (primary nav) | ≥ 768 | Logo "AS." (→ `/`), Work, About, Experience, Skills, Contact · right side: local time (IST), **Résumé** button | Sticky, 44–48 px, glass. Active section highlighted via IntersectionObserver (progressive enhancement). On sub-pages, section items link to `/#id`. |
| **Compact header** | < 768 | Logo, Résumé (icon+label), Menu button | Menu opens a full-height glass sheet with the same items + socials. |
| **Dock** (quick links) | ≥ 1024 + `pointer: fine` | GitHub, LinkedIn, Behance, Email, Résumé (+ divider + Back to top) | Fixed bottom-centre, appears after the hero scrolls out (so it never covers the hero CTAs), subtle magnification. **Never the only route to anything.** |
| **Footer** | all | Section links, socials, résumé | — |
| **In-content links** | all | Featured → project page; project page → prev/next | — |

All navigation items come from one registry, `data/navigation.ts` (`V2_TECHNICAL_ARCHITECTURE.md §5`).

## 5. Optional sections — evaluated

| Section | Verdict | Reason |
|---|---|---|
| Playground / Experiments (V1 "Bin of Ideas") | **Not in v2.0**; candidate for v2.1 as `/playground` | 4 short snippets (CRT scanlines CSS, a Solidity stub, an SVG filter, …) are not strong enough to earn nav space. Keep the content in git history. Q16. |
| Achievements | **Merged** into Experience/Education | Only certifications exist; no awards or hackathon results in the repo. Add a list if the owner provides items. |
| Certifications | **Included** inside `#experience` | 3 items exist (VERIFIED). Need issuer/date/link (Q14). |
| Photography / Design work | **Conditional** | Bio, interests and Behance link suggest design/photo work, but the repo has **no** design or photo assets. Add a "Design" strip linking to Behance only if the owner wants the designer positioning (Q1, Q7). |
| Blog | **Not built** | No content exists; an empty blog hurts credibility. |
| Testimonials | **Not built** | None exist; "25+ Happy Clients" is unverified. |
| Stats row | **Removed until verified** | See `V2_CONTENT_SPEC.md §8`. |
