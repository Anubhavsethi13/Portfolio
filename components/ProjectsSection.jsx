import React, { useState } from 'react';
import Link from 'next/link';
import { projects, projectFilters } from '../data/projects';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured') return project.featured;
    return project.tags.includes(activeFilter) || project.category.includes(activeFilter);
  });

  return (
    <section id="work" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 24px 60px',
    }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '28px', height: '2px', background: 'var(--accent)' }} />
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Featured Engineering & Selected Projects
          </span>
        </div>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {filteredProjects.length} Projects Shown
        </span>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '16px',
        marginBottom: '24px',
      }}>
        {projectFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              background: activeFilter === filter ? 'var(--accent)' : 'var(--surface-2)',
              color: activeFilter === filter ? 'var(--accent-contrast)' : 'var(--text)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Projects Grid of macOS Window-Chrome Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '28px',
      }}>
        {filteredProjects.map((project) => (
          <div
            key={project.id}
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
              transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
            }}
          >
            {/* macOS Window Title Bar */}
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
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-mid)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                {project.slug}.app
              </div>
              {project.featured ? (
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  ★ Featured
                </span>
              ) : (
                <span style={{ width: '10px' }} />
              )}
            </div>

            {/* Media Image Area (Consistent 16:9 ratio) */}
            <div style={{
              position: 'relative',
              width: '100%',
              paddingTop: '54%', // ~16:9 ratio
              background: 'var(--surface-2)',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: 'var(--surface-2)',
                    padding: '16px',
                    textAlign: 'center',
                  }}>
                    <span style={{ fontSize: '32px' }}>
                      {project.placeholderType === 'security' ? '🛡️' : '📚'}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                      {project.title}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--accent)', padding: '2px 8px', borderRadius: '4px', background: 'var(--accent-dim)' }}>
                      Active Staging Stored
                    </span>
                  </div>
                )}
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
              <div>
                {/* Tech tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '11px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-mid)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
                  {project.title}
                </h3>

                <p style={{ fontSize: '13px', color: 'var(--text-mid)', marginTop: '8px', lineHeight: 1.5 }}>
                  {project.shortDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid var(--border)',
                gap: '8px',
                flexWrap: 'wrap',
              }}>
                <Link
                  href={`/projects/${project.slug}`}
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>Project Details</span>
                  <span>→</span>
                </Link>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'var(--accent-contrast)',
                        background: 'var(--accent)',
                        padding: '4px 8px',
                        borderRadius: '5px',
                        textDecoration: 'none',
                      }}
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '11px',
                        fontWeight: 500,
                        color: 'var(--text)',
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                        padding: '4px 8px',
                        borderRadius: '5px',
                        textDecoration: 'none',
                      }}
                    >
                      Code ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
