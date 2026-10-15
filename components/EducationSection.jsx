import React from 'react';
import { education, academicDistinctions } from '../data/education';

export default function EducationSection() {
  return (
    <section id="education" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 24px 60px',
    }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ width: '28px', height: '2px', background: 'var(--accent)' }} />
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Educational Details & Academic Timeline
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {/* Education Timeline Panel */}
        <div style={{
          background: 'var(--surface-card)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid var(--border)',
          borderRadius: '18px',
          overflow: 'hidden',
          boxShadow: 'var(--window-shadow)',
          display: 'flex',
          flexDirection: 'column',
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
              Curriculum & Qualifications Timeline
            </div>
          </div>

          <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {education.map((item, index) => (
              <div key={item.id} style={{
                position: 'relative',
                paddingLeft: '28px',
                borderLeft: '2px solid var(--border)',
              }}>
                {/* Timeline Dot */}
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

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {item.batch || item.period}
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginTop: '2px' }}>
                      {item.degree}
                    </h3>
                    <div style={{ fontSize: '14px', color: 'var(--text-mid)', fontWeight: 500 }}>
                      {item.field}
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
                    {item.period}
                  </span>
                </div>

                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>
                  {item.institution} • {item.location}
                </div>

                {item.grade && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '8px',
                    padding: '3px 8px',
                    borderRadius: '5px',
                    background: 'var(--accent-dim)',
                    border: '1px solid var(--border)',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--accent)',
                  }}>
                    <span>Recorded Grade:</span>
                    <span>{item.grade}</span>
                  </div>
                )}

                <ul style={{
                  marginTop: '12px',
                  paddingLeft: '0',
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '13px',
                  color: 'var(--text)',
                }}>
                  {item.highlights.map((h, hi) => (
                    <li key={hi} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--accent)', marginTop: '2px' }}>▹</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Highlights & Verified Distinctions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Distinctions card */}
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
                Academic Coursework Highlights
              </span>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {academicDistinctions.map((dist, idx) => (
                <div key={idx} style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '16px',
                }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>
                    {dist.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--accent)', marginTop: '2px' }}>
                    {dist.institution}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-mid)', marginTop: '6px', lineHeight: 1.5 }}>
                    {dist.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Records Policy Note */}
          <div style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px' }}>📋</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>
                Academic Transcript Verification Notice
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Official semester mark sheets, degree certificates, and graduation transcripts from Symbiosis Institute of Technology and NIT Polytechnic are maintained in verification archives and provided directly to hiring teams upon formal request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
