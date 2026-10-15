import React from 'react';
import { achievements } from '../data/achievements';
import { contributions } from '../data/contributions';

export default function AchievementsSection() {
  return (
    <section id="achievements" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 24px 60px',
    }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ width: '28px', height: '2px', background: 'var(--accent)' }} />
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Verified Milestones & Extracurricular Contributions
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {/* Achievements Card */}
        <div style={{
          background: 'var(--surface-card)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: 'var(--window-shadow)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            height: '40px',
            background: 'var(--surface-2)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 18px',
          }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>
              🏆 Technical Milestones & Academic Highlights
            </span>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {achievements.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '18px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>
                    {item.title}
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>
                    {item.year}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {item.organization} • {item.category}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-mid)', marginTop: '8px', lineHeight: 1.5 }}>
                  {item.description}
                </p>
                <div style={{
                  marginTop: '10px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: 'var(--accent-dim)',
                  fontSize: '12px',
                  color: 'var(--accent)',
                  fontWeight: 600,
                }}>
                  {item.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contributions & Volunteering Card */}
        <div style={{
          background: 'var(--surface-card)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: 'var(--window-shadow)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            height: '40px',
            background: 'var(--surface-2)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 18px',
          }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>
              🤝 Campus Engagement, Mentoring & Volunteering
            </span>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {contributions.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '18px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>
                      {item.activity}
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600, marginTop: '2px' }}>
                      {item.role} • {item.organization}
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {item.period}
                  </span>
                </div>

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
                  {item.responsibilities.map((r, ri) => (
                    <li key={ri} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--accent)', marginTop: '2px' }}>▹</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', fontStyle: 'italic' }}>
                  Outcome: {item.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
