import React from 'react';
import Link from 'next/link';
import { experiences, careerInterests } from '../data/experience';

export default function ExperienceSection() {
  return (
    <section id="experience" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 24px 60px',
    }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ width: '28px', height: '2px', background: 'var(--accent)' }} />
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Professional Experience & Career Positioning
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {/* Experience Timeline Panel */}
        <div style={{
          background: 'var(--surface-card)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid var(--border)',
          borderRadius: '18px',
          overflow: 'hidden',
          boxShadow: 'var(--window-shadow)',
        }}>
          {/* Window Chrome Title */}
          <div style={{
            height: '40px',
            background: 'var(--surface-2)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 18px',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <div style={{
              position: 'absolute',
              left: 0,
              right: 0,
              textAlign: 'center',
              fontSize: '13px',
              color: 'var(--text-mid)',
              fontWeight: 500,
              pointerEvents: 'none',
            }}>
              Work & Internship History
            </div>
          </div>

          <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {experiences.map((exp, index) => (
              <div key={exp.id} style={{
                position: 'relative',
                paddingLeft: '28px',
                borderLeft: '2px solid var(--border)',
              }}>
                <span style={{
                  position: 'absolute',
                  left: '-7px',
                  top: '4px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: index === 0 ? 'var(--accent)' : 'var(--surface-2)',
                  border: '2px solid var(--border)',
                  boxShadow: index === 0 ? '0 0 8px var(--accent)' : 'none',
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {exp.period}
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginTop: '2px' }}>
                      {exp.role}
                    </h3>
                    <div style={{ fontSize: '14px', color: 'var(--text-mid)', fontWeight: 600 }}>
                      {exp.company}
                    </div>
                  </div>

                  <span style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                  }}>
                    {exp.dates}
                  </span>
                </div>

                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {exp.location}
                </div>

                <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.5, marginTop: '10px' }}>
                  {exp.summary}
                </p>

                {/* Bullets */}
                <ul style={{
                  marginTop: '10px',
                  paddingLeft: '0',
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '13px',
                  color: 'var(--text-mid)',
                }}>
                  {exp.points.map((pt, pti) => (
                    <li key={pti} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--accent)', marginTop: '2px' }}>▹</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* OfficeFlow connection */}
                {exp.relatedProject === 'officeflow' && (
                  <div style={{
                    marginTop: '14px',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'var(--accent-dim)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}>
                    <span style={{ fontSize: '12px', color: 'var(--text)', fontWeight: 500 }}>
                      Built <strong>OfficeFlow Workspace Suite</strong> during this internship
                    </span>
                    <Link
                      href="/projects/officeflow"
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: 'var(--accent)',
                        textDecoration: 'none',
                      }}
                    >
                      Inspect OfficeFlow Case Study →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Career Interests & Positioning */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{
            background: 'var(--surface-card)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid var(--border)',
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: 'var(--window-shadow)',
          }}>
            <div style={{
              height: '40px',
              background: 'var(--surface-2)',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 18px',
            }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                Target Engineering Domains & Career Interests
              </span>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {careerInterests.map((interest, idx) => (
                <div key={idx} style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '18px',
                }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>
                    {interest.title}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-mid)', marginTop: '6px', lineHeight: 1.5 }}>
                    {interest.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick status card */}
          <div style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>
                Immediate Availability
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.5 }}>
              Actively evaluating full-stack software development opportunities, AI application engineering positions, and collaborative technical challenges.
            </p>
            <div style={{ marginTop: '4px' }}>
              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: 'var(--accent)',
                  color: 'var(--accent-contrast)',
                  fontSize: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                <span>Initiate Contact</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
