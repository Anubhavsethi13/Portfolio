import React, { useState, useEffect } from 'react';

// Live Kolkata Clock Component
function LocalClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setTime(formatter.format(new Date()));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#18181c] border border-white/5 rounded-xl p-4 flex flex-col gap-1 items-start w-full">
      <span className="text-xl font-mono text-[var(--accent)] font-semibold">{time || '12:00:00'}</span>
      <span className="text-xs text-gray-500 font-medium">GMT+5:30 • Kolkata, IN</span>
    </div>
  );
}

export default function AboutApp() {
  const [activeTab, setActiveTab] = useState('about');

  const philosophyCards = [
    { num: '01', title: 'Research First', desc: 'Every decision is grounded in user behavior, context, and real data.' },
    { num: '02', title: 'Intentional Aesthetics', desc: 'Visual choices serve a purpose. Nothing is decorative for decoration\'s sake.' },
    { num: '03', title: 'Systems Thinking', desc: 'Designing with scalability in mind — cohesive design systems.' },
    { num: '04', title: 'Craft Obsession', desc: 'The details matter. Typography, spacing, motion — every pixel has intention.' },
  ];

  const experiences = [
    {
      role: 'Social Media Manager, Junior Associate Consultant',
      company: 'MachinesWale',
      location: 'Nagpur, IN',
      period: 'Dec 2024 — May 2025',
      points: [
        'Developed engaging content for social media platforms to enhance brand visibility.',
        'Monitored social media trends and competitor activity for strategic insights.',
        'Collaborated with the marketing team to align social media campaigns with business goals.',
      ]
    },
    {
      role: 'Intern',
      company: 'K.E.C International',
      location: 'Nagpur, IN',
      period: 'Aug 2024 — Oct 2024',
      points: [
        'Assisted project managers with daily administrative tasks and meeting schedules.',
        'Maintained documentation and updated project records and contracts.',
        'Conducted research on industry trends to support project initiatives.',
      ]
    }
  ];

  const education = [
    {
      degree: 'Polytechnic / Diploma',
      school: 'NIT Polytechnic',
      location: 'Nagpur, IN',
      period: '2021 — 2024',
      details: 'GPA: 7.2 / 10.0'
    },
    {
      degree: 'High School',
      school: 'E-Pathshala',
      period: '2017 — 2021'
    }
  ];

  const certifications = [
    'Advanced C, C++, Java, Python and UI/UX Certification',
    'Infosys Springboard Certification',
    'RedHat System Administration Certification'
  ];

  const skillGroups = [
    {
      label: 'Frontend & UI',
      skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5 / CSS3', 'Framer Motion', 'Figma Experience'],
      featured: ['React', 'Next.js', 'TypeScript', 'Figma Experience'],
    },
    {
      label: 'Backend & Software',
      skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'SQL', 'C / C++', 'C#', 'Java'],
      featured: ['Node.js', 'C / C++', 'Java'],
    },
    {
      label: 'AI & Web3 Engineering',
      skills: ['Python', 'Solidity', 'Web3.js', 'OpenAI API', 'Machine Learning', 'AI Model Trainer'],
      featured: ['Python', 'AI Model Trainer'],
    },
    {
      label: 'Design, Media & Workflow',
      skills: ['Graphic Design', 'Photoshop Skills', 'Photography & Videography', 'Project Management', 'Git & GitHub', 'Vercel'],
      featured: ['Graphic Design', 'Photoshop Skills', 'Project Management'],
    },
  ];

  return (
    <div className="about-layout">
      {/* Sidebar Navigation */}
      <div className="about-sidebar">
        <button
          onClick={() => setActiveTab('about')}
          className={`about-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
        >
          About Me
        </button>
        <button
          onClick={() => setActiveTab('experience')}
          className={`about-tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
        >
          Experience
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`about-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
        >
          Skills
        </button>
        <button
          onClick={() => setActiveTab('interests')}
          className={`about-tab-btn ${activeTab === 'interests' ? 'active' : ''}`}
        >
          Interests
        </button>
        <button
          onClick={() => setActiveTab('resume')}
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
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', color: '#f3f4f6', fontFamily: 'var(--font-display)' }}>
                Anubhav Sethi
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 500, marginTop: '4px' }}>
                Web Developer & Graphics Designer
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: '#d1d5db', lineHeight: 1.6, fontWeight: 300 }}>
              <p>
                I'm Anubhav — a Full-Stack Developer and Designer based in India with a passion for building robust backend APIs, sleek user interfaces, and everything in between.
              </p>
              <p>
                My work spans web application development, blockchain systems, and AI integrations — bridging the gap between clean code and exceptional user experience.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button
                onClick={() => setActiveTab('resume')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#e4e4e7',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>View Original Resume</span>
              </button>
              <a
                href="/Anubhav_Sethi_Resume.pdf"
                download="Anubhav_Sethi_Resume.pdf"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                  background: 'var(--accent)',
                  color: '#080808',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#b8e03e'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
              >
                <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'none', stroke: 'currentColor', strokeWidth: '2.5' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download Resume</span>
              </a>
            </div>

            {/* Stats Block */}
            <div className="stats-grid">
              <div>
                <div className="stat-value">4+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div>
                <div className="stat-value">40+</div>
                <div className="stat-label">Projects Done</div>
              </div>
              <div>
                <div className="stat-value">25+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
            </div>

            {/* Beliefs / Philosophies */}
            <div>
              <h3 style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                Beliefs & Philosophy
              </h3>
              <div className="philosophy-grid">
                {philosophyCards.map((card) => (
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
            {/* Experience */}
            <div>
              <h3 style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                Work Experience
              </h3>
              <div className="timeline-container">
                {experiences.map((exp, i) => (
                  <div key={i} className="timeline-item">
                    {/* Timeline Dot */}
                    <div className="timeline-dot" />
                    <span className="timeline-date">{exp.period}</span>
                    <h4 className="timeline-role">{exp.role}</h4>
                    <p className="timeline-company">{exp.company} • <span className="text-gray-500">{exp.location}</span></p>
                    <ul className="timeline-points">
                      {exp.points.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                Education
              </h3>
              <div className="education-container">
                {education.map((edu, i) => (
                  <div key={i} className="education-item">
                    <div>
                      <h4 className="education-degree">{edu.degree}</h4>
                      <p className="education-school">{edu.school} {edu.location ? `• ${edu.location}` : ''}</p>
                      {edu.details && <p className="education-gpa">{edu.details}</p>}
                    </div>
                    <span className="education-date">{edu.period}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                Certifications
              </h3>
              <ul className="certifications-list">
                {certifications.map((cert, i) => (
                  <li key={i} className="certification-item">
                    <span className="cert-dot" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="about-content-section">
            <div>
              <h3 style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                Technical Toolkit
              </h3>
              <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: 300 }}>
                A collection of languages, frameworks, and methodologies. Green tags represent featured/deep skills.
              </p>
            </div>

            <div className="skills-container">
              {skillGroups.map((group) => (
                <div key={group.label} className="skills-group">
                  <span className="skills-group-title">{group.label}</span>
                  <div className="skills-tag-list">
                    {group.skills.map((skill) => {
                      const isFeatured = group.featured.includes(skill);
                      return (
                        <span
                          key={skill}
                          className={`skill-tag ${isFeatured ? 'featured' : ''}`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'interests' && (
          <div className="about-content-section">
            <h3 style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
              Personal Interests
            </h3>
            <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: 300, marginBottom: '12px' }}>
              What keeps me busy when I'm not coding.
            </p>

            <div className="interests-grid">
              {[
                { title: 'Graphic Design & Layout', desc: 'Creating vectors, posters, and digital identity branding.' },
                { title: 'Photography & Filmmaking', desc: 'Capturing moments, camera setups, and exploring narrative editing.' },
                { title: 'AI Exploration', desc: 'Training custom LLM nodes, testing model integrations, and automation.' },
                { title: 'Web3 & Decentralization', desc: 'Exploring smart contract boundaries, Web3 security, and Solidity ledger setups.' },
              ].map((interest, i) => (
                <div key={i} className="interest-card">
                  <h4 className="interest-title">{interest.title}</h4>
                  <p className="interest-desc">{interest.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resume' && (
          <div className="about-content-section" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <h3 style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                  Original Resume
                </h3>
                <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: 300 }}>
                  View or download the official PDF document.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href="/Anubhav_Sethi_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#e4e4e7',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span>Open Fullscreen</span>
                </a>
                <a
                  href="/Anubhav_Sethi_Resume.pdf"
                  download="Anubhav_Sethi_Resume.pdf"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    background: 'var(--accent)',
                    color: '#080808',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#b8e03e'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
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
            <div style={{ flex: 1, minHeight: '340px', background: '#141416', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)', overflow: 'hidden' }}>
              <iframe
                src="/Anubhav_Sethi_Resume.pdf#toolbar=0"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="Anubhav Sethi Resume PDF"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
