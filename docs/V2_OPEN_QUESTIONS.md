# V2 — Open Questions (owner input required)

> Only things that **cannot** be answered from the repository. Each has a recommended default so work can continue if you're unsure; the defaults are marked ★.
> Question numbers (Q1–Q17) are referenced across the other V2 docs.

## A. Positioning & content (needed before Phase 2 finishes)

**Q1. How should the site position you?**
The site says "Web Developer & Graphics Designer", the bio says "Full-Stack Developer and Designer", and the résumé says "Computer Science Engineering Student | AI & ML Enthusiast | Full Stack Developer | Prompt Engineering | LLM Research".
Options: ★ (a) *Full-stack developer · AI/LLM applications* (matches the résumé and project list) · (b) *Web developer & designer* (matches the current site and Behance) · (c) something else.
Please also give a one-sentence tagline, or approve one I draft from your answer.

**Q2. Who are you trying to reach, and what's your status?**
Internships, full-time roles, freelance clients, or a mix? This drives the status pill ("Open to internships · 2027"?) and the contact copy. The old legacy hero said "Available for freelance". ★ Default: "Open to internships and entry-level roles" — **only if true**.

**Q3. The stats "4+ Years Experience / 40+ Projects / 25+ Happy Clients".**
They conflict with the timeline (first listed role Aug 2024) and with the 7 projects on the site. ★ Default: remove the stats row. Or give accurate numbers you can stand behind.

**Q4. Education.** The résumé lists a **B.Tech in CSE at Symbiosis Institute of Technology, Nagpur**, which the site doesn't show. Please confirm: start year, expected graduation, current year of study, and whether to show it. Also confirm the Diploma grade (site says 7.2/10) and years (2021–2024) and the Higher Secondary years (2017–2021).

**Q5. Aarkay Techno Consultants internship.** The résumé lists *Full Stack Developer Intern* (dates extract as roughly May–Jun 2026). Confirm exact dates, title, and whether to show it. Also confirm: K.E.C title ("Intern" vs "Project Management Intern") and whether MachinesWale was remote or in Nagpur.

**Q6. Projects.**
- Which 3 should be featured? (Currently OfficeFlow, FitMart, FAQ-Assist.)
- For each project: year, your role (solo? team? which part?), context (personal / internship / academic / hackathon).
- OfficeFlow: the résumé says it was built during the Aarkay internship — are you allowed to show it, and should it say so?
- Please confirm or correct the claims flagged C11–C16 in `V2_CONTENT_SPEC.md §8` (e.g. "multi-tenant routing", "real-time slot telemetry", "secure payment checkout", "smart contracts" on a CodeHS demo, "machine learning" vs OCR).
- Should any résumé-only projects be added (LangChain/LangGraph agent, Student Exam Chatbot, FinTech platform)? Are "FAQ Chatbot" and "CTF Platform" the same as FAQ-Assist and Money Heist CTF? If added, I need screenshots and links.
- Optional: 3–5 bullet "What I built" highlights per featured project.

**Q7. Design / photography work.** Your bio, interests and Behance link suggest design work, but the repo has no design or photo assets. Should V2 include a small "Design work" strip linking to Behance? ★ Default: Behance link only, no section.

**Q8. Profile photo.** Can `public/images/profile.jpg` (768×1024) be shown as a photo of you in the About section? (V1 only uses it heavily blurred as wallpaper.) ★ Default: yes, if it's a recent photo of you.

**Q9. Phone number in the public résumé.** `Anubhav_Sethi_Resume.pdf` is publicly downloadable and contains your phone number. Keep it, or provide a web version without the phone number? Also: can you re-export the PDF smaller (it's 1.8 MB)? ★ Default: web version without phone number.

**Q11. Skills.** Confirm which skills are **core** vs **working knowledge**, and resolve the mismatches: on the site but not the résumé — TypeScript, MongoDB, Solidity, Web3.js, OpenAI API; on the résumé but not the site — PostgreSQL, MySQL, Prisma, LangChain/LangGraph, Streamlit, Postman, Render. What does "AI Model Trainer" mean (job, platform, or skill)?

**Q14. Certifications.** For each of the 3, give the issuer, date, and a credential link if one exists. ("Advanced C, C++, Java, Python and UI/UX Certification" has no issuer.)

## B. Infrastructure & publishing

**Q10. Domain and hosting.** Is the V1 site deployed anywhere today, and at what URL? Which domain should V2 use (needed for canonical URLs, sitemap and OG tags)? Is Vercel the host (the README suggests it)? ★ Default: Vercel, static.

**Q12. Git remote.** May I create the first commit and push to a new **private** GitHub repository (e.g. `Anubhavsethi13/portfolio`)? Which branch name for production — `main` or `master`?

**Q13. Keep V1 reachable?** After launch, should the old macOS-desktop version stay online (e.g. a "classic" subdomain), or only live in git history? ★ Default: git history only.

**Q15. Analytics.** Do you want visit/click analytics (e.g. Vercel Web Analytics, cookieless)? ★ Default: none in v2.0.

## C. Housekeeping

**Q16. "Bin of Ideas" playground.** OK to drop it from v2.0 (the code stays in git) and maybe bring it back later as `/playground`? ★ Default: yes, drop.

**Q17. `public/images/dashboard.png`** (1296×1752, unused). What is it, and is it a project that should be on the site? ★ Default: leave it out of V2.

*(Also, for your information only, no answer needed: `temp_impeccable/` (258 MB) will be git-ignored in Phase 0. Deleting it from disk is up to you.)*
