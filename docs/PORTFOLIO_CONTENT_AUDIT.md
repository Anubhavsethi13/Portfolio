# Portfolio Content and Architecture Audit

**Date:** October 2026  
**Auditor:** Senior Frontend Engineer & UI/UX Specialist  
**Project:** Anubhav Sethi — macOS-Inspired Personal Portfolio  
**Repository:** `D:\Claude\Portfolio - Mac - New`  
**Current Branch:** `main` (clean baseline preserved)

---

## 1. Executive Summary

The portfolio currently implements a macOS/MacBook-inspired desktop environment using Next.js (Pages Router) and Framer Motion. While the desktop window-manager paradigm, floating Dock, custom icons, and dark glassmorphic styling create a memorable aesthetic, the current architecture suffers from critical limitations:

1. **Content Trapped in Desktop Windows:** Portfolio content is locked inside draggable windows (`AboutApp`, `ProjectsApp`, `ContactApp`, `TrashApp`, `ErrorApp`) with `overflow: hidden` on `html, body`. This prevents normal page scrolling, breaks standard web navigation, and causes severe mobile usability issues (overflow, clipped dock, inaccessible windows).
2. **Missing Key Sections:** Major sections specified in the prompt are either missing or incomplete:
   - Dedicated Education timeline with verified degrees.
   - Distinct Academic Performance data structure (ready for verified marks).
   - Structured & categorized Technical Skills module.
   - Comprehensive Project Showcase with detail pages for all verified projects (including initial featured set: *Security Log Analyzer*, *AI-Driven Accounting & Intelligent Bookkeeping System*, *Personalized Study Material Generator*).
   - Full-Stack Internship Experience details for Aarkay Techno Consultants Pvt Ltd (and OfficeFlow connection).
   - Verified Achievements section (data-ready).
   - macOS-inspired Certificate Gallery with preview/download capability.
   - Contributions, Clubs, Events & Volunteering section.
   - Public-safe Downloadable Résumé route (`/resume`).
   - Theme toggle support for light and dark modes (only dark tokens existed in `:root`).
3. **Privacy Concerns in Existing Assets:** The original `public/Anubhav_Sethi_Resume.pdf` exposed a personal phone number. A sanitized public copy exists at `public/resume/Anubhav_Sethi_Resume_Public.pdf` and must be the sole public asset.

---

## 2. Inventory of Existing Sections & Components

| Component / Section | Current State | Reusability | Assessment & Action Required |
|---|---|---|---|
| **Top Menu Bar (`Navbar`)** | Present as dormant component with basic links | High | Elevate to full macOS Menu Bar: Apple / Logo ("AS."), nav links (About, Experience, Projects, Skills, Certificates, Contact), Live IST Clock, Theme Toggle (Dark/Light), Résumé Quick Link. |
| **Hero Desktop Composition** | Present as desktop wallpaper + icons | High | Retain MacBook wallpaper, ambient glow, desktop shortcuts, and floating dock, but enable smooth scroll down to structured portfolio sections. |
| **Floating Dock (`Dock.jsx`)** | Present with magnification physics | High | Preserve dock magnification and iconic styling; ensure it links smoothly to open sections/windows or jumps to page anchors; fix generic LinkedIn link; full mobile responsive handling. |
| **Desktop Shortcuts (`AppIcons.jsx`)** | Beautiful vector macOS squircles | Very High | Keep desktop shortcuts functional for launching modals/views while ensuring all content is also directly reachable via standard page navigation. |
| **About Section (`AboutApp.jsx` & `About.jsx`)** | Hardcoded inside `AboutApp.jsx` tab and dead `About.jsx` | High (content & copy) | Refactor into central `data/profile.js` and render in both a dedicated responsive portfolio section and in the macOS desktop window. Remove unverified numerical claims ("4+ years", "40+ projects", "25+ clients"). |
| **Education Section** | 2 entries in `AboutApp.jsx` (NIT Polytechnic & E-Pathshala) | Medium | Add verified B.Tech CSE (Batch 2024, Symbiosis Institute of Technology) and Diploma CS (Batch 2021, NIT Polytechnic). Create macOS-styled timeline with central data. |
| **Academic Performance** | Not isolated | Low | Create modular data structure in `data/education.js`. Defer publishing fictional grades; document verified items. |
| **Skills Section (`Skills.jsx` & `AboutApp.jsx`)** | Hardcoded tags in 4 groups | High | Extract into central `data/skills.js`. Structure by clear domains: Languages, Frontend, Backend, Databases, AI/ML & LLM, Dev Tools, Cloud/DevOps. Create macOS glass chips and cards with dark/light support. |
| **Projects Showcase (`ProjectsApp.jsx` & `data/projects.js`)** | 7 projects in `data/projects.js` | High | Update projects dataset with detailed fields: problem, solution, role, tech stack, links, placeholders. Prioritize featured projects: 1) Security Log Analyzer, 2) AI Accounting, 3) Personalized Study Material Generator. Provide project detail views/pages. |
| **Experience Section** | 2 roles (MachinesWale, K.E.C) | High | Add Aarkay Techno Consultants Pvt Ltd (Full Stack Intern), document OfficeFlow connection, and maintain verifiable dates. |
| **Achievements Section** | Missing | New | Build macOS-inspired glass achievement cards backed by central `data/achievements.js`. |
| **Certifications Section** | 3 bullet items in `AboutApp.jsx` | Medium | Build macOS gallery cards with credential info, issuer, and preview modal backed by `data/certifications.js`. |
| **Contributions & Volunteering** | Missing | New | Build structured section for student clubs, hackathons, and event leadership backed by `data/contributions.js`. |
| **Photo Gallery** | Missing | Optional | Implement optional macOS photo preview container; mark as optional until user supplies real photos. |
| **Contact Section (`ContactApp.jsx` & `Contact.jsx`)** | Working mailto generator in window | High | Create responsive macOS glass contact card with verified social links (Email, GitHub, LinkedIn, Behance) and functional mailto composer. Exclude phone number. |
| **Downloadable Résumé (`/resume`)** | Missing route; linked directly to private PDF | High | Create `/resume` route with viewer and download button pointing strictly to `public/resume/Anubhav_Sethi_Resume_Public.pdf`. |

---

## 3. Asset Audit

### 3.1 Existing Assets to Reuse
- `public/images/profile.jpg` (used as high-res blurred macOS wallpaper)
- `public/images/officeflow.png` (OfficeFlow screenshot)
- `public/images/fitmart.png` (FitMart screenshot)
- `public/images/faq-assist.png` (FAQ-Assist screenshot)
- `public/images/enterprise-portal.png` (Enterprise Login Portal screenshot)
- `public/images/ledgerai.png` (AI Accounting screenshot)
- `public/images/money-heist-ctf.png` (Money Heist CTF screenshot)
- `public/images/blockchain-scheduler.png` (Blockchain Scheduler screenshot)
- `public/resume/Anubhav_Sethi_Resume_Public.pdf` (Sanitized public résumé)
- Vector SVGs in `components/AppIcons.jsx` (About, Projects, Contact, Error, Trash, GitHub, LinkedIn, OfficeFlow, FitMart, FAQ, Ledger, CTF, Portal, Blockchain icons)
- App favicons and webmanifest in `public/`

### 3.2 Missing Assets or User Input Required
- Screenshots for *Security Log Analyzer* and *Personalized Study Material Generator* (will use styled macOS window placeholders).
- Verified credentials/certificates documents or verification links for:
  - Advanced C, C++, Java, Python and UI/UX Certification
  - Infosys Springboard Certification
  - RedHat System Administration Certification
- Verified academic transcripts/CGPA for B.Tech CSE (kept data-ready in TODO).
- Real photographs for personal event/hackathon gallery (kept optional).

---

## 4. Proposed Implementation Architecture & Order

### Phase 1: Data Architecture & Centralization
Create modular, centralized data files in `data/`:
- `data/profile.js`: Bio, roles, career interests, contact info.
- `data/education.js`: B.Tech, Diploma, High School, academic distinctions.
- `data/experience.js`: Aarkay Techno Consultants, MachinesWale, K.E.C International.
- `data/skills.js`: Categorized skills (Languages, Frontend, Backend, Databases, AI/ML, Tools, Cloud).
- `data/projects.js`: Complete project catalog with featured 3 (Security Log Analyzer, AI Accounting, Study Material Generator).
- `data/certifications.js`: Verified certifications with preview support.
- `data/achievements.js`: Verified milestones & competition records.
- `data/contributions.js`: Student clubs, community initiatives, events.
- `data/social.js`: Verified public handles (Email, GitHub, LinkedIn, Behance).

### Phase 2: Theme System (Dark & Light Mode)
- Define comprehensive CSS tokens for dark and light modes in `styles/globals.css` using `[data-theme="light"]` and `[data-theme="dark"]`.
- Preserve lime accent `#C8F04E` and its accessible contrast in both themes.
- Add macOS menu-bar theme switcher with instant feedback and persistence in `localStorage`.

### Phase 3: Layout & Responsive Structure
- Transform `Desktop.jsx` into a hybrid macOS experience:
  - Sticky top macOS Menu Bar with logo, nav links, live clock, theme toggle, and résumé action.
  - Desktop workspace with wallpaper, icons, interactive windows, and floating Dock.
  - Seamless downward scroll into dedicated, accessible macOS-styled panels for each section.
  - Responsive adjustments ensuring zero horizontal overflow on screens from 320px to ultrawide.

### Phase 4: Core Sections Implementation
- **About Me**: Professional narrative, CS background, technical focus, and text-based identity presentation.
- **Education & Academic Performance**: macOS timeline showing B.Tech & Diploma; data-ready academic performance slot.
- **Experience**: Timeline featuring Aarkay (OfficeFlow) and internships.
- **Skills**: Glassmorphic categorized grids with subtle hover states.
- **Projects**: Window-chrome cards with live links, source links, detail modals, and responsive grids.
- **Certificates & Credentials**: Gallery cards with preview dialogs.
- **Achievements & Contributions**: Compact glass cards highlighting initiative and leadership.
- **Contact & Résumé**: Direct mailto trigger, social pills, and stable `/resume` route linking to public-safe PDF.

### Phase 5: Verification & Accessibility Pass
- Keyboard navigation, ARIA landmarks, `prefers-reduced-motion` compliance.
- Test across mobile (320px, 375px, 430px), tablet (768px), and desktop (1024px+).
- Verify build, lint, and browser rendering.
