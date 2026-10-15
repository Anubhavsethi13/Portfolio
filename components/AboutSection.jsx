import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { socialLinks } from '../data/social';

export default function AboutSection() {
  return (
    <section id="about" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '80px 24px 60px',
    }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ width: '28px', height: '2px', background: 'var(--accent)' }} />
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Personal Introduction
        </span>
      </div>

      {/* Main Glass Panel */}
      <div style={{
        background: 'var(--surface-card)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
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
            About This Developer — System Identity
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '36px 32px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '36px',
            alignItems: 'start',
          }}>
            {/* Left: Text-Based Profile Presentation matching MacBook Theme */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  marginBottom: '16px',
                }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)' }} />
                  {profile.status.label}
                </div>

                <h2 style={{
                  fontSize: '34px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  lineHeight: 1.2,
                }}>
                  {profile.name}
                </h2>
                <p style={{
                  fontSize: '17px',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  marginTop: '6px',
                }}>
                  {profile.headline}
                </p>
              </div>

              {/* Bio Paragraphs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '15px', color: 'var(--text)', lineHeight: 1.7, fontWeight: 300 }}>
                {profile.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                <Link
                  href="/resume"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 18px',
                    borderRadius: '9px',
                    background: 'var(--accent)',
                    color: 'var(--accent-contrast)',
                    fontWeight: 700,
                    fontSize: '13px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px var(--accent-dim2)',
                  }}
                >
                  <span>View Public Résumé</span>
                  <span>→</span>
                </Link>
                <a
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 18px',
                    borderRadius: '9px',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontWeight: 600,
                    fontSize: '13px',
                    textDecoration: 'none',
                  }}
                >
                  <span>Get in Touch</span>
                  <span>✉</span>
                </a>
              </div>
            </div>

            {/* Right: Technical Areas of Focus & Principles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '24px',
              }}>
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '16px',
                }}>
                  Primary Technical Focus
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {profile.focusAreas.map((area) => (
                    <div key={area.title} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>
                        {area.title}
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.5 }}>
                        {area.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Approach */}
              <div style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '24px',
              }}>
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '16px',
                }}>
                  Approach to Building Software
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                  {profile.philosophy.map((item) => (
                    <div key={item.num} style={{ padding: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)', fontFamily: 'monospace' }}>
                        {item.num}
                      </span>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginTop: '2px' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4, marginTop: '4px' }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
