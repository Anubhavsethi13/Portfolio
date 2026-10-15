import React, { useState } from 'react';
import { socialLinks } from '../data/social';
import { profile } from '../data/profile';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const emailSubject = encodeURIComponent(subject || `Inquiry from ${name}`);
    const emailBody = encodeURIComponent(`Hello Anubhav,\n\n${message}\n\nFrom: ${name} (${email})`);
    const mailtoUrl = `mailto:aanubhavsethi2405@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    window.location.href = mailtoUrl;
    setSent(true);
  };

  return (
    <section id="contact" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 24px 80px',
    }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ width: '28px', height: '2px', background: 'var(--accent)' }} />
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Contact & Professional Destinations
        </span>
      </div>

      <div style={{
        background: 'var(--surface-card)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--border)',
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow: 'var(--window-shadow)',
      }}>
        {/* macOS Window Chrome Header */}
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
            Mail Client — Compose Direct Message
          </div>
        </div>

        <div style={{ padding: '36px 32px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
          }}>
            {/* Left: Contact Info & Action Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  lineHeight: 1.2,
                }}>
                  Let&apos;s build something <span style={{ color: 'var(--accent)' }}>exceptional</span>.
                </h2>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--text-mid)',
                  lineHeight: 1.6,
                  marginTop: '12px',
                }}>
                  Whether discussing a full-time engineering role, an enterprise software architecture, or an AI workflow challenge — my inbox is always open.
                </p>
              </div>

              {/* Direct email card */}
              <div style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Direct Professional Email
                </span>
                <a
                  href="mailto:aanubhavsethi2405@gmail.com"
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    wordBreak: 'break-all',
                  }}
                >
                  aanubhavsethi2405@gmail.com
                </a>
              </div>

              {/* Verified Professional Links */}
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
                  Verified Professional Profiles
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                        textDecoration: 'none',
                        transition: 'background 0.2s, border-color 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 700, fontSize: '14px' }}>{link.label}</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>@{link.handle}</span>
                      </div>
                      <span style={{ color: 'var(--accent)', fontSize: '14px' }}>↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Message Dispatcher */}
            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              padding: '28px',
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '18px',
              }}>
                Dispatch Inquiry to Mail Client
              </h3>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-mid)', marginBottom: '6px' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-mid)', marginBottom: '6px' }}>
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-mid)', marginBottom: '6px' }}>
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Full-Stack Engineering Opportunity / Project Inquiry"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-mid)', marginBottom: '6px' }}>
                    Message Content
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Anubhav, I reviewed your work on OfficeFlow and would like to connect regarding..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '12px 20px',
                    borderRadius: '8px',
                    background: 'var(--accent)',
                    color: 'var(--accent-contrast)',
                    fontWeight: 700,
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'filter 0.2s',
                  }}
                >
                  <span>Open in Mail Client</span>
                  <span>✉</span>
                </button>

                {sent && (
                  <div style={{ fontSize: '12px', color: 'var(--accent)', textAlign: 'center' }}>
                    ✓ Mail client initiated with pre-filled inquiry.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
