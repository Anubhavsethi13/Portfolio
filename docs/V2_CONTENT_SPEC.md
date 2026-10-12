# V2 — Content Specification

> Labels: VERIFIED · INFERRED · RECOMMENDATION · UNKNOWN · USER INPUT REQUIRED.
> Rule: **no content is invented.** Missing values are written as `TODO: USER INPUT REQUIRED`.
> Sensitive values are masked (phone number).

## 1. Current content map (VERIFIED)

| Content | V1 location | Duplicates |
|---|---|---|
| Name, headline "Web Developer & Graphics Designer", 2 bio paragraphs | `components/apps/AboutApp.jsx` L157–171 | `pages/index.js` `<title>`/meta; legacy `Hero.jsx` uses "Full-Stack Developer & Designer" |
| Stats 4+ yrs / 40+ projects / 25+ clients | `AboutApp.jsx` L239–252 | legacy `About.jsx` L14–16 |
| Philosophy cards (4) | `AboutApp.jsx` L35–40 | legacy `About.jsx` L7–10 |
| Experience (2) | `AboutApp.jsx` L42–65 (3 bullets each) | legacy `Experience.jsx` (4–5 bullets each) |
| Education (2) | `AboutApp.jsx` L67–80 | legacy `Experience.jsx` |
| Certifications (3) | `AboutApp.jsx` L82–86 | legacy `Experience.jsx` |
| Skills (4 groups) | `AboutApp.jsx` L88–109 | legacy `Skills.jsx` (identical) |
| Interests (4) | `AboutApp.jsx` L377–382 | — |
| Projects (7) | `data/projects.js` | — |
| Email `aanubhavsethi2405@gmail.com` | `ContactApp.jsx` L14, L35 | legacy `Contact.jsx` |
| LinkedIn `linkedin.com/in/anubhav-sethi13`, Behance `behance.net/anubhavsethi1`, GitHub `github.com/Anubhavsethi13` | `ContactApp.jsx` L22–26 | `Dock.jsx` (GitHub ✓, LinkedIn ✗ generic), legacy `Footer.jsx`, `Contact.jsx` |
| Résumé | `public/Anubhav_Sethi_Resume.pdf` (1.8 MB) | linked 3× in `AboutApp.jsx` |
| Local time "Kolkata, IN" | `AboutApp.jsx` `LocalClock` | — |
| Jokes: Compiler Error dialog; Bin of Ideas snippets | `ErrorApp.jsx`, `TrashApp.jsx` | — |
| Legacy-only: FAQ (4 Q&A), "Available for freelance", rotating hero words, footer marquee | `About.jsx`, `Hero.jsx`, `Footer.jsx` | not rendered |
| SEO title/description | `pages/index.js` | — |

**Résumé PDF (VERIFIED via `pdftotext`; text extraction is partly garbled, so dates marked ⚠ need confirmation):**
headline "Computer Science Engineering Student | AI & Machine Learning Enthusiast | Full Stack Developer | Prompt Engineering | LLM Research"; Nagpur, Maharashtra; phone `+91-*****-*****` (masked); same email and LinkedIn; B.Tech CSE — Symbiosis Institute of Technology, Nagpur (⚠ dates); Diploma in Computer Engineering — NIT Polytechnic, CGPA ?.2/10 (⚠); Higher Secondary — E-Pathshala; MachinesWale — Junior Associate Consultant & Social Media Manager, Dec 2024–May 2025; K.E.C International — Project Management Intern, Aug–Oct 2024; **Aarkay Techno Consultants Pvt. Ltd. — Full Stack Developer Intern, ⚠ May 2026–Jun 2026** (developed OfficeFlow; React, Node, Express, PostgreSQL, Prisma, Vercel, Render); projects incl. AI accounting (OCR-based), Enterprise Login Portal (Node/Express/PostgreSQL/Prisma, RBAC), OfficeFlow, **AI Agent using LangChain & LangGraph**, Blockchain appointment scheduling, **Student Exam Chatbot, FinTech Platform, FAQ Chatbot, CTF Platform**; skills incl. PostgreSQL, MySQL, Prisma, Streamlit, Postman, LLMs, prompt engineering, NLP; languages English, Hindi, Odia (INFERRED from "?dia"), Spanish (basic), Marathi (basic).

## 2. Data files (RECOMMENDATION)

```
data/
  site.ts            siteUrl, title template, default description, OG image path, locale
  profile.ts         identity, positioning, bio, status, location, timezone, photo, resume
  social.ts          email + external profiles
  navigation.ts      nav registry (see V2_TECHNICAL_ARCHITECTURE.md §5)
  projects.ts        Project[]
  experience.ts      Experience[]
  education.ts       Education[]
  certifications.ts  Certification[]
  skills.ts          SkillGroup[]
```

Types live in `lib/types.ts`; `lib/validate.ts` runs at build (imported by `app/sitemap.ts` or a `prebuild` script) and fails the build on: duplicate slugs, missing images, `featured` count ≠ 3, non-https URLs, empty required fields, any string containing `TODO:` in production builds.

## 3. Schemas

### 3.1 Profile (minimal)

```ts
export type Profile = {
  name: string;                 // "Anubhav Sethi" (VERIFIED)
  shortName: string;            // "Anubhav"
  initials: string;             // "AS" (VERIFIED: logo/favicons)
  role: string;                 // one line for the hero — TODO: USER INPUT REQUIRED (Q1)
  tagline: string;              // one sentence value statement — TODO: USER INPUT REQUIRED
  bio: string[];                // 1–2 short paragraphs
  location: { city: string; region?: string; country: string }; // Nagpur, Maharashtra, India (VERIFIED résumé)
  timeZone: string;             // "Asia/Kolkata" (IST) — label shown as "IST", not "Kolkata"
  status?: { label: string; available: boolean };  // TODO: USER INPUT REQUIRED (Q2)
  currently?: string;           // e.g. "B.Tech CSE @ Symbiosis Institute of Technology" — TODO: confirm (Q4)
  focusAreas: string[];         // e.g. ["Full-stack web", "AI / LLM apps"] — TODO: confirm (Q1)
  photo?: { src: StaticImageData; alt: string };   // profile.jpg? (Q8)
  resume: { href: '/resume'; file: '/Anubhav_Sethi_Resume.pdf'; sizeLabel: string; updated: string };
  languages?: { name: string; level: 'Native' | 'Fluent' | 'Basic' }[]; // optional, from résumé
  interests?: string[];
};
```

### 3.2 Social

```ts
export type SocialLink = {
  id: 'email' | 'github' | 'linkedin' | 'behance';
  label: string;
  href: string;          // mailto: or https:
  handle?: string;       // shown text, e.g. "anubhav-sethi13"
  icon: IconName;
  placements: Array<'dock' | 'contact' | 'footer' | 'mobileMenu'>;
};
```

Values (VERIFIED): email `aanubhavsethi2405@gmail.com`; GitHub `https://github.com/Anubhavsethi13`; LinkedIn `https://www.linkedin.com/in/anubhav-sethi13/`; Behance `https://www.behance.net/anubhavsethi1`.

### 3.3 Project

```ts
export type Project = {
  slug: string;                         // URL key, kebab-case, stable forever
  title: string;
  summary: string;                      // ≤ 140 chars, card text
  description: string;                  // 1–3 paragraphs, detail page
  category: 'web-app' | 'ai-ml' | 'web3' | 'ui-design' | 'other';
  context: 'personal' | 'internship' | 'academic' | 'hackathon' | 'freelance' | 'TODO';
  role: string;                         // "Solo full-stack developer", "Frontend" …
  year: number | 'TODO';
  status: 'live' | 'archived' | 'in-progress' | 'prototype';
  technologies: string[];               // must match names used in data/skills.ts
  highlights?: string[];                // 2–5 bullets: what *he* built
  outcome?: string;                     // results / learnings
  image: { src: StaticImageData; alt: string };   // card + hero (16:10 crop)
  gallery?: { src: StaticImageData; alt: string; caption?: string }[];
  links: { live?: string; source?: string; caseStudy?: string };
  featured: boolean;                    // exactly 3
  order: number;                        // sort key
};
```

**Migration of the 7 existing projects** (fields from `data/projects.js` — VERIFIED; everything else TODO):

| id | slug (proposed) | title | image | live | source | featured | year/role/context |
|---|---|---|---|---|---|---|---|
| 1 | `officeflow` | OfficeFlow Workspace Suite | officeflow.png | officeflow-murex.vercel.app | Anubhavsethi13/officeflow-frontend | ✅ | TODO (résumé ties it to the Aarkay internship) |
| 2 | `fitmart` | FitMart Fitness E-Commerce | fitmart.png (1572×4096 — needs crop) | fitmart-omega.vercel.app | Anubhavsethi13/FitMart | ✅ | TODO |
| 3 | `faq-assist` | FAQ-Assist AI Support | faq-assist.png | faq-assistant.vercel.app | Anubhavsethi13/FAQ-Assist | ✅ | TODO |
| 4 | `enterprise-login-portal` | Enterprise Login Portal | enterprise-portal.png | enterprise-login-portal.vercel.app | Anubhavsethi13/Enterprise-Login-Portal | — | TODO |
| 5 | `money-heist-ctf` | Money Heist CTF Theme | money-heist-ctf.png | money-heist-ctf.vercel.app | Anubhavsethi13/money-heist-ctf | — | TODO |
| 6 | `blockchain-appointment-scheduler` | Blockchain Appointment Scheduler | blockchain-scheduler.png | html-wvy-19827395.codehs.me | Anubhavsethi13/Appointment-Scheduling-System-Using-Decentralized-BlockChain | — | TODO |
| 7 | `ai-accounting` | AI-Driven Accounting & Bookkeeping | ledgerai.png | ledger-ai.streamlit.app | Anubhavsethi13/AI-Driven-Accounting---Bookkeeping | — | TODO |

`tags` → `technologies` (rename); `color` → **dropped** (only used by dead `ProjectCard.jsx`); `link` → `links.live`; `github` → `links.source`; numeric `id` → `slug`. Live/source URLs were **not** fetched in this task — link health is checked in Phase 7.

Candidate additions from the résumé (not on site; **USER INPUT REQUIRED** Q6): AI Agent (LangChain & LangGraph), Student Exam Chatbot, FinTech Platform, FAQ Chatbot (same as FAQ-Assist?), CTF Platform (same as Money Heist CTF?).

### 3.4 Experience

```ts
export type Experience = {
  id: string;
  organisation: string;
  organisationUrl?: string;
  role: string;
  employmentType: 'internship' | 'full-time' | 'part-time' | 'contract' | 'freelance';
  location: string;                 // "Nagpur, IN" | "Remote"
  start: string;                    // ISO "2024-12"
  end: string | 'present';          // ISO "2025-05"
  summary?: string;
  responsibilities: string[];       // 2–4 bullets, strongest first
  achievements?: string[];          // measurable results only
  technologies?: string[];
  relatedProjects?: string[];       // project slugs
};
```

Entries: MachinesWale (2024-12 → 2025-05), K.E.C International (2024-08 → 2024-10) — VERIFIED on site and résumé. Aarkay Techno Consultants — résumé only, ⚠ dates → **USER INPUT REQUIRED** (Q5). Display periods are formatted from ISO dates (`Dec 2024 — May 2025`), so they can't drift.

### 3.5 Education & certifications

```ts
export type Education = {
  id: string; institution: string; qualification: string; field?: string;
  location?: string; start: string; end: string | 'present' | 'expected-YYYY';
  grade?: string;  // "CGPA 7.2 / 10" — confirm digits (Q4)
  notes?: string[];
};
export type Certification = {
  id: string; name: string; issuer: string | 'TODO'; date?: string; credentialUrl?: string;
};
```

### 3.6 Skills — grouped, tiered, evidence-linked

```ts
export type SkillGroup = {
  id: string;
  label: string;
  skills: { name: string; level: 'core' | 'working'; }[];
};
```

Proposed grouping (RECOMMENDATION; derived from site + résumé, levels **USER INPUT REQUIRED** Q11):

| Group | Skills (union of site + résumé) |
|---|---|
| Languages | JavaScript, TypeScript*, Python, Java, C, C++, C#, SQL |
| Frontend | React, Next.js, HTML, CSS, Framer Motion |
| Backend & data | Node.js, Express, REST APIs, PostgreSQL†, MySQL†, Prisma†, MongoDB* |
| AI / ML | LLMs & prompt engineering†, LangChain/LangGraph†, NLP†, OpenAI API*, Machine learning, Streamlit† |
| Web3 | Solidity*, Web3.js* |
| Design & tools | Figma, Photoshop, Git & GitHub, Postman†, Vercel, Render† |

`*` on site but **not** in résumé · `†` in résumé but **not** on site. Each skill page-section can show "Used in: OfficeFlow, FitMart" by deriving from `Project.technologies` (`lib/content.ts getSkillUsage()`), which turns the skills list into evidence rather than an icon wall.

Removed from skills: "AI Model Trainer", "Photoshop Skills", "Figma Experience", "Project Management" as tech skills (wording) — reword or move to About (Q11). Emoji "skills" from legacy (`Night Owl 🦉`) are not carried over.

## 4. Copy that is preserved verbatim (personality)

- 404: "Compiler Error (0x800F0906)" + "A fatal crash occurred because the developer attempted to center a div using `margin-left: 23%`. StackOverflow is currently unreachable." + button "Accept fate and cry" (secondary, beside "Go home").
- The "AS." mark.

## 5. Copy that needs owner rewrite

Hero role + tagline (Q1); bio (currently "Full-Stack Developer and Designer … building robust backend APIs, sleek user interfaces, and everything in between" — keep or update); project descriptions (claims to verify, §8); status line (Q2).

## 6. Where content must NOT live

No strings of portfolio content inside components (except UI micro-copy like "View project"). No content in CSS. No duplicated email/URLs — always import from `data/social.ts`.

## 7. Résumé handling

- Keep `/Anubhav_Sethi_Resume.pdf` path (external links may exist — UNKNOWN). Add `/resume` redirect for sharing.
- Show file type and size next to every résumé link: "Résumé (PDF, 1.8 MB)". Recommend re-exporting the PDF smaller (1.8 MB for 1–2 pages is heavy — INFERRED it contains embedded fonts/images).
- **The public PDF contains a phone number.** Decide whether to publish a web version without it (Q9).
- Keep `profile.resume.updated` (date) visible in the About section so recruiters know it is current.
- No inline iframe viewer (V1's `#toolbar=0` iframe is poor on mobile and duplicates the browser's PDF viewer).

## 8. CONTENT_VERIFICATION_REQUIRED

Claims that appear inconsistent or unverifiable. **None of these have been rewritten** — the owner must confirm, correct or remove each.

| # | Claim | Where | Problem | Evidence |
|---|---|---|---|---|
| C1 | "4+ Years Experience" | `AboutApp.jsx` L241–242; legacy `About.jsx` | Earliest listed role starts **Aug 2024**; résumé positions him as a student | VERIFIED dates in `AboutApp.jsx` L48, L57 |
| C2 | "40+ Projects Done" | `AboutApp.jsx` L245–246 | 7 projects on site; ~10 named in résumé | VERIFIED |
| C3 | "25+ Happy Clients" | `AboutApp.jsx` L249–250 | No client/freelance work is listed anywhere; roles are employee/intern | VERIFIED absence |
| C4 | Headline "Web Developer & Graphics Designer" | `AboutApp.jsx` L161, `pages/index.js` title | Résumé: "Computer Science Engineering Student · AI & ML Enthusiast · Full Stack Developer · Prompt Engineering · LLM Research"; bio says "Full-Stack Developer and Designer" | VERIFIED — three different positionings |
| C5 | Location "Kolkata, IN" on clock | `AboutApp.jsx` L27 | He is in Nagpur; `Asia/Kolkata` is just the IST timezone ID | VERIFIED |
| C6 | Education shows Diploma + High School only | `AboutApp.jsx` L67–80 | Résumé lists a **B.Tech CSE at Symbiosis Institute of Technology, Nagpur** | VERIFIED (dates garbled) |
| C7 | Diploma GPA "7.2 / 10.0" | `AboutApp.jsx` L73 | Résumé text extracts as "CGPA ?.2 / 10" — likely the same, confirm | INFERRED |
| C8 | Experience list has 2 roles | `AboutApp.jsx` | Résumé adds **Aarkay Techno Consultants, Full Stack Developer Intern (⚠ 2026)** | VERIFIED (dates garbled) |
| C9 | K.E.C role "Intern" | `AboutApp.jsx` L55 | Résumé: "Project Management Intern" | VERIFIED |
| C10 | MachinesWale location "Nagpur, IN" | `AboutApp.jsx` L46 | Résumé bullets say "collaborative remote environment" | VERIFIED |
| C11 | Enterprise Login Portal: "highly secure corporate authentication gateway… multi-tenant routing"; tags React, JavaScript | `data/projects.js` L38–40 | Résumé: Node.js/Express/PostgreSQL/Prisma with RBAC; "multi-tenant" not mentioned; "highly secure" is unqualified | VERIFIED mismatch |
| C12 | OfficeFlow: "real-time slot telemetry" | `data/projects.js` L5 | Not mentioned in résumé; résumé says it was built during the Aarkay internship (ownership/attribution of a work project) | VERIFIED mismatch; ownership UNKNOWN |
| C13 | FitMart: "secure payment checkout pipeline. Built for scalability." | `data/projects.js` L16 | Unverifiable; is payment real or mocked? | UNKNOWN |
| C14 | FAQ-Assist tagged "AI" | `data/projects.js` L29 | Description mentions no AI technique | UNKNOWN |
| C15 | Blockchain scheduler: "smart contracts… tamper-proof booking logs" | `data/projects.js` L60 | Live demo is a CodeHS static HTML page; confirm on-chain component exists | INFERRED risk |
| C16 | AI Accounting: "powered by machine learning" | `data/projects.js` L71 | Résumé says "OCR-based processing"; clarify ML vs OCR/rules | VERIFIED mismatch |
| C17 | Skills TypeScript, MongoDB, Solidity, Web3.js, OpenAI API | `AboutApp.jsx` skillGroups | Not in résumé; TypeScript is tagged on 2 projects | VERIFIED absence in résumé |
| C18 | "AI Model Trainer", "Training custom LLM nodes" | `AboutApp.jsx` L101, L380 | Vague/unclear wording; what was trained? | UNKNOWN |
| C19 | Certification "Advanced C, C++, Java, Python and UI/UX Certification" | `AboutApp.jsx` L83 | No issuer, date or credential link (all 3 certs) | VERIFIED absence |
| C20 | Philosophy cards ("Research First… every pixel has intention") | `AboutApp.jsx` L35–40 | Generic agency-style claims; not supported by case studies | INFERRED |
| C21 | "Available for freelance"; FAQ "I frequently collaborate with founders, creative agencies…" | legacy `Hero.jsx`, `About.jsx` (not rendered) | Client work not evidenced; do not revive without confirmation | VERIFIED (dead code) |
| C22 | Résumé phone number publicly downloadable | `public/Anubhav_Sethi_Resume.pdf` | Privacy decision, not a factual error | VERIFIED |
