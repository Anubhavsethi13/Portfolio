# Portfolio V2 - Content Decisions

Status: Phase 0.5 record created during the technical foundation pass.

## Locked Decisions

- macOS is a visual theme only. Portfolio content must not be hidden behind fake OS apps, draggable windows, a boot screen, fake Finder/Terminal/System Settings, a playground, or a custom cursor.
- Primary positioning text is centralized as: "Full-Stack Developer building AI-powered applications and modern web experiences."
- The site supports internships, entry-level/full-time opportunities, and freelance work, but the exact public status copy still needs owner confirmation.
- No profile photo is used in the foundation.
- Behance remains an external link only.
- Social URLs, navigation, projects, experience, education, skills, certifications, and profile copy now have central editable modules.
- Statistics are omitted until evidence supports them.
- Hosting, domain, and analytics remain deferred.

## Verified Content

- Repository root: `D:\Claude\Portfolio - Mac - New`.
- Git was initialized with no commits, no tags, no remotes, and unborn branch `master` before this task.
- Intended production branch has been set to `main`.
- V1 uses Next.js Pages Router, React, JavaScript, global CSS, and a macOS desktop/window-manager interface.
- V1 build passes: `npm run build` generated static `/` and `/404`.
- V1 audit fails before upgrade: `npm audit --omit=dev` reported 4 vulnerabilities, including critical Next.js advisories.
- Public social values verified from source: email, GitHub, LinkedIn, and Behance.
- The résumé source exists at `D:\Claude\Portfolio - Mac - New\resume\Resume.pdf`.
- The original public résumé at `public/Anubhav_Sethi_Resume.pdf` is treated as private because it contains a phone number.
- A separate public-safe résumé copy was created at `public/resume/Anubhav_Sethi_Resume_Public.pdf`.
- Public résumé text extraction after redaction found zero phone-like matches.

## Missing Information

- Exact public status line for internships, full-time roles, and freelance work.
- Project evidence for Security Log Analyzer and Personalized Study Material Generator.
- AI accounting details: whether "machine learning" is accurate or the implementation is OCR/rules-based.
- OfficeFlow ownership/attribution and whether it may be shown as an Aarkay-related project.
- Aarkay internship dates and exact title.
- Skill proficiency tiers: core vs working knowledge.
- Certification issuers, issue dates, credential URLs, certificate images, and verification status.
- Hosting/domain choice and final canonical site URL.
- Whether analytics should be added later.

## Evidence For Numerical Claims

- No verified evidence was found for "4+ years", "40+ projects", or "25+ clients".
- No numerical stats are approved for production at this stage.

## Discrepancies

- V2 task brief specifies featured project order as Security Log Analyzer, AI-Driven Accounting & Intelligent Bookkeeping System, Personalized Study Material Generator.
- Existing V1 project data includes AI accounting but does not include recoverable evidence for Security Log Analyzer or Personalized Study Material Generator.
- Existing specs previously referenced OfficeFlow, FitMart, and FAQ-Assist as candidate featured projects; the task brief supersedes that order.
- Existing V1 public résumé path exposed a phone number; the foundation now points `/resume` to a redacted public-safe copy.

## Recommendations

- Keep the public-safe résumé copy as the only public résumé asset until the owner provides an official replacement PDF.
- Resolve project evidence before rendering featured project cards.
- Keep placeholder certifications out of production UI until real issuer/date/credential data exists.
- Use a real domain before launch; `https://example.com` remains a non-production metadata placeholder.

## Assumptions

- It is acceptable to use a local baseline commit and tag without pushing to a remote.
- It is acceptable to proceed with a foundation skeleton while content details remain unresolved, because placeholders are explicitly marked and the full portfolio UI is not built yet.

## Technical Version Decision

- Next.js selected: `16.4.0`, current latest returned by `npm view next version` during this task.
- React selected: `19.3.0`, current latest returned by `npm view react version`.
- React DOM selected: `19.3.0`, current latest returned by `npm view react-dom version`.
- TypeScript selected: `6.0.3`.
- Motion selected: `14.1.0`, current latest returned by `npm view motion version`.
- Rationale: V2 is a static App Router rebuild, so upgrading Next/React directly avoids known Next 14 advisories and lets the foundation target current React-compatible APIs. TypeScript 7.0.2 was the registry latest, but `eslint-config-next` uses `typescript-eslint`, whose official support window is currently `>=4.8.4 <6.1.0`; TypeScript 6.0.3 is the newest compatible choice that lets lint, typecheck, and build all pass. Motion is installed for future justified client islands but is not used in the foundation UI.
- Image strategy: `next/image` is configured for AVIF/WebP formats. No remote image domains are configured, keeping the pending hosting decision compatible with local/static assets.
