import React from 'react';
import Link from 'next/link';
import { socialLinks } from '../data/social';
import { profile } from '../data/profile';

export default function FooterSection() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)',
      color: 'var(--text-mid)',
      padding: '40px 24px',
      fontSize: '13px',
      fontFamily: 'var(--font-body)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        {/* Top tier: Identity & Quick Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 700,
              fontSize: '16px',
              color: 'var(--text)',
              fontFamily: 'var(--font-display)',
            }}>
              <span></span>
              <span>{profile.name}</span>
              <span style={{ color: 'var(--accent)' }}>.</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {profile.headline} • {profile.location.city}, {profile.location.country}
            </div>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {socialLinks.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  transition: 'color 0.2s',
                }}
              >
                {s.label}
              </a>
            ))}
            <Link
              href="/resume"
              style={{
                color: 'var(--accent)',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              Résumé PDF
            </Link>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border)',
          fontSize: '12px',
          color: 'var(--text-muted)',
        }}>
          <span>
            © {new Date().getFullYear()} Anubhav Sethi. Designed with macOS aesthetic principles & engineering rigor.
          </span>
          <span>
            Nagpur, Maharashtra, India • {profile.location.tzLabel}
          </span>
        </div>
      </div>
    </footer>
  );
}
