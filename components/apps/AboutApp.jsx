import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import profileAvatar from '../../public/images/anubhav-profile.jpg';
import { profile } from '../../data/profile';
import { experiences } from '../../data/experience';
import { education } from '../../data/education';
import { certifications } from '../../data/certifications';
import { skillCategories } from '../../data/skills';
import { achievements } from '../../data/achievements';
import { contributions } from '../../data/contributions';

const clockFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

// Live Kolkata Clock Component
function LocalClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      setTime(clockFormatter.format(new Date()));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#18181c] border border-white/5 rounded-xl p-4 flex flex-col gap-1 items-start w-full" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px' }}>
      <span className="text-xl font-mono text-[var(--accent)] font-semibold" style={{ fontSize: '18px', fontFamily: 'monospace', color: 'var(--accent)', fontWeight: 700 }}>
        {time || '12:00:00'}
      </span>
      <span className="text-xs text-gray-500 font-medium" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
        {profile.location.tzLabel} • {profile.location.city}, IN
      </span>
    </div>
  );
}

export default function AboutApp({ selectedTab, onTabChange }) {
  const [internalTab, setInternalTab] = useState('about');
  const activeTab = selectedTab || internalTab;
  const handleTabClick = (tab) => {
    if (onTabChange) onTabChange(tab);
    setInternalTab(tab);
  };

  return (
    <div className="about-layout">
      {/* Sidebar Navigation */}
      <div className="about-sidebar">
        <button
          onClick={() => handleTabClick('about')}
          className={`about-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
        >
          About Me
        </button>
        <button
          onClick={() => handleTabClick('experience')}
          className={`about-tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
        >
          Experience
        </button>
        <button
          onClick={() => handleTabClick('education')}
          className={`about-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
        >
          Education
        </button>
        <button
          onClick={() => handleTabClick('skills')}
          className={`about-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
        >
          Skills
        </button>
        <button
          onClick={() => handleTabClick('certificates')}
          className={`about-tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
        >
          Certificates
        </button>
        <button
          onClick={() => handleTabClick('milestones')}
          className={`about-tab-btn ${activeTab === 'milestones' ? 'active' : ''}`}
        >
          Milestones & Impact
        </button>
        <button
          onClick={() => handleTabClick('interests')}
          className={`about-tab-btn ${activeTab === 'interests' ? 'active' : ''}`}
        >
          Interests
        </button>
        <button
          onClick={() => handleTabClick('resume')}
          className={`about-tab-btn ${activeTab === 'resume' ? 'active' : ''}`}
        >
          Resume PDF
        </button>

        {/* Local Clock */}
        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
          <LocalClock />
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="about-content">
        {activeTab === 'about' && (
          <div className="about-content-section">
            {/* macOS Profile Header Card with Photo */}
            <div
              style={{
                display: 'flex',
                gap: '18px',
                alignItems: 'center',
                flexWrap: 'wrap',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '16px',
              }}
            >
              {/* Profile Photo */}
              <div
                style={{
                  width: '120px',
                  height: '144px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                }}
              >
                <Image
                  src={profileAvatar || profile.avatar || '/images/anubhav-profile.jpg'}
                  alt={profile.name}
                  width={120}
                  height={144}
                  priority
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 20%',
                    display: 'block',
                  }}
                />
              </div>

              {/* Profile Details & CTA */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  flex: '1 1 240px',
                  minWidth: '200px',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: 'var(--text)',
                      fontFamily: 'var(--font-display)',
                      margin: 0,
                    }}
                  >
                    {profile.name}
                  </h2>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--accent)',
                      fontWeight: 600,
                      margin: '3px 0 0',
                    }}
                  >
                    {profile.headline}
                  </p>
                </div>

                {/* Location & Status Tag */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    marginTop: '2px',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#22c55e',
                      boxShadow: '0 0 6px rgba(34, 197, 94, 0.5)',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  <span>
                    {profile.status.label} • {profile.location.city}, {profile.location.country}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
                  <Link
                    href="/resume"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                  >
                    <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                    <span>View Résumé</span>
                  </Link>
                  <a
                    href={profile.resume.publicPdf}
                    download={profile.resume.filename}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      textDecoration: 'none',
                      background: 'var(--accent)',
                      color: 'var(--accent-contrast)',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'none', stroke: 'currentColor', strokeWidth: '2.5' }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text)', lineHeight: 1.6, fontWeight: 300 }}>
              {profile.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Core Competencies Matrix instead of unverified numerical stats */}
            <div className="stats-grid">
              {profile.focusAreas.map((area) => (
                <div key={area.title} style={{ padding: '8px' }}>
                  <div className="stat-value" style={{ fontSize: '15px', color: 'var(--accent)', fontWeight: 700 }}>
                    {area.title}
                  </div>
                  <div className="stat-label" style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                    {area.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Engineering Beliefs / Philosophies */}
            <div>
              <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                Engineering Principles
              </h3>
              <div className="philosophy-grid">
                {profile.philosophy.map((card) => (
                  <div key={card.num} className="philosophy-card">
                    <span className="philosophy-num">{card.num}</span>
                    <h4 className="philosophy-title">{card.title}</h4>
                    <p className="philosophy-desc">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="about-content-section">
            <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              Work Experience & Internships
            </h3>
            <div className="timeline-container">
              {experiences.map((exp) => (
                <div key={exp.id} className="timeline-item">
                  <div className="timeline-dot" />
                  <span className="timeline-date">{exp.dates}</span>
                  <h4 className="timeline-role">{exp.role}</h4>
                  <p className="timeline-company">{exp.company} • <span style={{ color: 'var(--text-muted)' }}>{exp.location}</span></p>
                  <ul className="timeline-points">
                    {exp.points.map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="about-content-section">
            <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              Academic Background
            </h3>
            <div className="education-container">
              {education.map((edu) => (
                <div key={edu.id} className="education-item">
                  <div>
                    <h4 className="education-degree">{edu.degree} — {edu.field}</h4>
                    <p className="education-school">{edu.institution} {edu.location ? `• ${edu.location}` : ''}</p>
                    {edu.grade && <p className="education-gpa">{edu.grade}</p>}
                    <ul style={{ marginTop: '8px', paddingLeft: '16px', fontSize: '12px', color: 'var(--text-mid)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {edu.highlights.map((h, hi) => (
                        <li key={hi}>{h}</li>
                      ))}
                    </ul>
                  </div>
                  <span className="education-date">{edu.period}</span>
                </div>
              ))}
            </div>

            {/* Certifications inside Education tab */}
            <div style={{ paddingTop: '16px', marginTop: '16px', borderTop: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                Verified Certifications
              </h3>
              <ul className="certifications-list">
                {certifications.map((cert) => (
                  <li key={cert.id} className="certification-item">
                    <span className="cert-dot" />
                    <div>
                      <span style={{ fontWeight: 600 }}>{cert.title}</span>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {cert.issuer} • {cert.issueDate}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="about-content-section">
            <div>
              <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                Technical Toolkit
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 300 }}>
                Categorized programming languages, application frameworks, and operational developer tools.
              </p>
            </div>

            <div className="skills-container">
              {skillCategories.map((group) => (
                <div key={group.id} className="skills-group">
                  <span className="skills-group-title">{group.label}</span>
                  <div className="skills-tag-list">
                    {group.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`skill-tag ${skill.core ? 'featured' : ''}`}
                        title={skill.note}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="about-content-section">
            <div>
              <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                Verified Credentials & Certifications
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 300 }}>
                Formal certifications completed across computer architecture, systems programming, and modern software design.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>
                      {cert.title}
                    </h4>
                    <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'var(--accent-dim)', color: 'var(--accent)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {cert.category}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-mid)', margin: 0 }}>
                    {cert.issuer}
                  </p>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                    {cert.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--border)', fontSize: '10px', color: 'var(--text-muted)' }}>
                    <span>Issued {cert.issueDate}</span>
                    <span style={{ fontFamily: 'monospace' }}>{cert.credentialId}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'milestones' && (
          <div className="about-content-section">
            <div>
              <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                Technical Milestones & Extracurricular Impact
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 300 }}>
                Engineering milestones, capstone achievements, and departmental leadership contributions.
              </p>
            </div>

            {/* Achievements */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Key Engineering Milestones
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
                {achievements.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 600 }}>{item.category}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.year}</span>
                    </div>
                    <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', margin: '2px 0' }}>{item.title}</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>{item.description}</p>
                    <p style={{ fontSize: '10px', color: 'var(--text-mid)', fontStyle: 'italic', marginTop: '4px', margin: 0 }}>
                      ✓ {item.highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contributions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Extracurricular & Community Contributions
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {contributions.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
                      <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)' }}>
                        {c.role} — <span style={{ color: 'var(--accent)' }}>{c.organization}</span>
                      </h4>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{c.period}</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--text-mid)', marginTop: '2px', marginBottom: '6px' }}>{c.activity}</p>
                    <ul style={{ paddingLeft: '16px', fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {c.responsibilities.map((r, ri) => (
                        <li key={ri}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interests' && (
          <div className="about-content-section">
            <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
              Personal Interests
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 300, marginBottom: '12px' }}>
              Creative outlets, design experiments, and technical explorations outside core development.
            </p>

            <div className="interests-grid">
              {profile.outsideInterests.map((interest) => (
                <div key={interest.title} className="interest-card">
                  <h4 className="interest-title">{interest.title}</h4>
                  <p className="interest-desc">{interest.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resume' && (
          <div className="about-content-section" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                  Public Résumé (PDF)
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 300 }}>
                  Sanitized public curriculum vitae — phone number omitted for privacy.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link
                  href="/resume"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  <span>Open Fullscreen</span>
                  <span>↗</span>
                </Link>
                <a
                  href={profile.resume.publicPdf}
                  download={profile.resume.filename}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    background: 'var(--accent)',
                    color: 'var(--accent-contrast)',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <span>Download PDF</span>
                  <span>↓</span>
                </a>
              </div>
            </div>
            <div style={{ flex: 1, minHeight: '340px', background: 'var(--surface-2)', borderRadius: '8px', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <object
                data={`${profile.resume.publicPdf}#toolbar=0`}
                type="application/pdf"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              >
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                  <p>Previewing PDF document.</p>
                  <a href={profile.resume.publicPdf} download style={{ color: 'var(--accent)' }}>Click to download directly</a>
                </div>
              </object>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
