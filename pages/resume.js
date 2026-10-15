import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import StandaloneHeader from '../components/StandaloneHeader';

export default function ResumePage() {
  const resumeUrl = '/resume/Anubhav_Sethi_Resume_Public.pdf';

  return (
    <>
      <Head>
        <title>Anubhav Sethi — Résumé (Curriculum Vitae)</title>
        <meta name="description" content="Official public résumé for Anubhav Sethi — Full-Stack Developer & Software Engineer." />
        <meta name="robots" content="index, follow" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)',
      }}>
        {/* Top Bar matching macOS Menu Bar */}
        <StandaloneHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              href="/"
              style={{
                color: 'var(--text)',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '15px',
                fontFamily: 'var(--font-display)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>← Back to Desktop</span>
            </Link>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>|</span>
            <span style={{ fontSize: '13px', color: 'var(--text-mid)', fontWeight: 500 }}>
              Anubhav_Sethi_Resume_Public.pdf
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text)',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                transition: 'all 0.2s',
              }}
            >
              Open Fullscreen ↗
            </a>
            <a
              href={resumeUrl}
              download="Anubhav_Sethi_Resume.pdf"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#080808',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'var(--accent)',
                transition: 'all 0.2s',
              }}
            >
              Download PDF ↓
            </a>
          </div>
        </StandaloneHeader>

        {/* Content Container */}
        <main style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px 16px',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}>
          <div style={{
            width: '100%',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: 'var(--window-shadow)',
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 110px)',
            minHeight: '600px',
          }}>
            {/* macOS Window Title bar */}
            <div style={{
              height: '38px',
              background: 'var(--surface-2)',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              position: 'relative',
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
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
                Curriculum Vitae Preview — Public Version
              </div>
            </div>

            {/* Embedded PDF Object with Fallback */}
            <div style={{ flex: 1, position: 'relative' }}>
              <object
                data={`${resumeUrl}#toolbar=1&navpanes=0`}
                type="application/pdf"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              >
                <div style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  gap: '16px',
                }}>
                  <p style={{ fontSize: '16px', color: 'var(--text-mid)' }}>
                    Your browser does not support inline PDF viewing.
                  </p>
                  <a
                    href={resumeUrl}
                    download="Anubhav_Sethi_Resume.pdf"
                    style={{
                      padding: '10px 20px',
                      background: 'var(--accent)',
                      color: '#080808',
                      fontWeight: 700,
                      borderRadius: '8px',
                      textDecoration: 'none',
                    }}
                  >
                    Click here to download the PDF
                  </a>
                </div>
              </object>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
