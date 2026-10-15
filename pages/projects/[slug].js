import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { projects } from '../../data/projects';
import StandaloneHeader from '../../components/StandaloneHeader';

export default function ProjectDetailPage({ project }) {
  if (!project) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '24px',
        fontFamily: 'var(--font-body)',
      }}>
        <h2>Project Not Found</h2>
        <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
          ← Return to Desktop
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${project.title} — Anubhav Sethi Portfolio`}</title>
        <meta name="description" content={project.shortDescription} />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* macOS Menu Bar Header */}
        <StandaloneHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              href="/#work"
              style={{
                color: 'var(--text)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>← Back to Projects</span>
            </Link>
            <span style={{ color: 'var(--border)', fontSize: '14px' }}>|</span>
            <span style={{ fontSize: '13px', color: 'var(--text-mid)', fontWeight: 500 }}>
              {project.category}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#080808',
                  background: 'var(--accent)',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Live Demo</span>
                <span>↗</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text)',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Source Code</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </StandaloneHeader>

        {/* Main Content Area */}
        <main style={{
          flex: 1,
          maxWidth: '1100px',
          width: '100%',
          margin: '0 auto',
          padding: '40px 20px 80px',
        }}>
          {/* macOS Window Showcase Frame */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: 'var(--window-shadow)',
            marginBottom: '40px',
          }}>
            {/* Title Bar */}
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
                {project.title} — Project Inspection
              </div>
            </div>

            {/* Media Area */}
            <div style={{
              background: 'var(--surface-2)',
              minHeight: '360px',
              maxHeight: '520px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}>
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '520px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              ) : (
                <div style={{
                  padding: '60px 24px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'var(--accent-dim)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    color: 'var(--accent)',
                  }}>
                    {project.placeholderType === 'security' ? '🛡️' : '📚'}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text)' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '420px', lineHeight: 1.5 }}>
                    Designed concept & implementation in active staging. Screenshots and verified live artifacts are in the process of being published.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Project Details Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}>
            {/* Left Column: Problem, Solution & Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h1 style={{
                  fontSize: '32px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.02em',
                  marginBottom: '12px',
                  color: 'var(--text)',
                }}>
                  {project.title}
                </h1>
                <p style={{
                  fontSize: '16px',
                  color: 'var(--text-mid)',
                  lineHeight: 1.6,
                }}>
                  {project.shortDescription}
                </p>
              </div>

              {/* The Challenge / Problem */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '24px',
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '10px',
                }}>
                  The Problem Solved
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.6 }}>
                  {project.problem}
                </p>
              </div>

              {/* The Solution */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '24px',
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '10px',
                }}>
                  Solution Architecture
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.6 }}>
                  {project.solution}
                </p>
              </div>

              {/* Key Features */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '24px',
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '16px',
                }}>
                  Key Features
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}>
                  {project.keyFeatures.map((feature, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '14px',
                        color: 'var(--text)',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ color: 'var(--accent)', marginTop: '2px' }}>▹</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Metadata, Tech Stack & Role */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Project Meta Card */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                    My Role & Contribution
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 500, lineHeight: 1.5 }}>
                    {project.role}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                    Project Status
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', background: 'var(--surface-2)', border: '1px solid var(--border)', fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
                    {project.status}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                    Technology Stack
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: '12px',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          background: 'var(--surface-2)',
                          border: '1px solid var(--border)',
                          color: 'var(--text)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.sourceNotice && (
                  <div style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'var(--accent-dim)',
                    border: '1px solid var(--border)',
                    fontSize: '12px',
                    color: 'var(--text-mid)',
                    lineHeight: 1.5,
                  }}>
                    {project.sourceNotice}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '14px 20px',
                      borderRadius: '10px',
                      background: 'var(--accent)',
                      color: '#080808',
                      fontWeight: 700,
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Launch Live Application</span>
                    <span>↗</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '14px 20px',
                      borderRadius: '10px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontWeight: 600,
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Browse Source on GitHub</span>
                    <span>↗</span>
                  </a>
                )}
                <Link
                  href="/#work"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    color: 'var(--text-muted)',
                    fontSize: '13px',
                    textDecoration: 'none',
                  }}
                >
                  ← Return to all projects
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = projects.map((p) => ({
    params: { slug: p.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = projects.find((p) => p.slug === params.slug) || null;

  return {
    props: {
      project,
    },
  };
}
