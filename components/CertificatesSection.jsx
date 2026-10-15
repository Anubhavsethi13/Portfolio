import React from 'react';
import { certifications } from '../data/certifications';

export default function CertificatesSection() {
  return (
    <section id="certificates" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 24px 60px',
    }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ width: '28px', height: '2px', background: 'var(--accent)' }} />
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Certificates & Professional Credentials
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {certifications.map((cert) => (
          <div
            key={cert.id}
            style={{
              background: 'var(--surface-card)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--window-shadow)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            {/* macOS Card Title Bar */}
            <div style={{
              height: '36px',
              background: 'var(--surface-2)',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 14px',
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {cert.category}
              </span>
            </div>

            {/* Preview Banner */}
            <div style={{
              padding: '24px 20px',
              background: 'var(--surface-2)',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'var(--accent-dim)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: 'var(--accent)',
              }}>
                📜
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
                  {cert.title}
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--accent)', marginTop: '2px', fontWeight: 600 }}>
                  {cert.issuer}
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <p style={{ fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.5 }}>
                {cert.description}
              </p>

              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                  Competencies Covered
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {cert.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: '11px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status footer */}
              <div style={{
                paddingTop: '12px',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {cert.verificationStatus}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>
                  {cert.issueDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
