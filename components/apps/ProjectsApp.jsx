import React, { useState } from 'react';
import Link from 'next/link';
import { projects } from '../../data/projects';

export default function ProjectsApp({ selectedProject: propSelectedProject, setSelectedProject: propSetSelectedProject }) {
  const [localSelectedProject, setLocalSelectedProject] = useState(null);

  const selectedProject = propSelectedProject !== undefined ? propSelectedProject : localSelectedProject;
  const setSelectedProject = propSetSelectedProject !== undefined ? propSetSelectedProject : setLocalSelectedProject;

  if (selectedProject) {
    return (
      <div className="project-detail-layout">
        {/* Back navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => setSelectedProject(null)}
            className="project-back-btn"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Gallery</span>
          </button>

          <Link
            href={`/projects/${selectedProject.slug}`}
            style={{
              fontSize: '12px',
              color: 'var(--accent)',
              textDecoration: 'none',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '6px',
              background: 'var(--accent-dim)',
              border: '1px solid var(--border)',
            }}
          >
            Open Standalone Page ↗
          </Link>
        </div>

        {/* Project Header */}
        <div>
          <h2 className="project-detail-title">{selectedProject.title}</h2>
          <div className="project-card-tags" style={{ marginTop: '8px' }}>
            {selectedProject.tags.map((tag) => (
              <span key={tag} className="project-card-tag" style={{ fontSize: '10px', padding: '4px 8px' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Main detail columns */}
        <div className="project-detail-grid">
          {/* Image preview */}
          <div className="project-detail-preview">
            {selectedProject.image ? (
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="project-detail-img"
              />
            ) : (
              <div style={{
                height: '100%',
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                background: 'var(--surface-2)',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
              }}>
                <span style={{ fontSize: '32px' }}>
                  {selectedProject.placeholderType === 'security' ? '🛡️' : '📚'}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-mid)', fontWeight: 500 }}>
                  Active Engineering Staging
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Designed macOS Placeholder
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="project-detail-info-col">
            <div className="project-detail-section">
              <h3 className="project-detail-section-title">
                Overview
              </h3>
              <p className="project-detail-desc">
                {selectedProject.shortDescription || selectedProject.description}
              </p>
            </div>

            {selectedProject.role && (
              <div className="project-detail-section">
                <h3 className="project-detail-section-title">
                  Role & Contribution
                </h3>
                <p className="project-detail-desc" style={{ fontSize: '12px' }}>
                  {selectedProject.role}
                </p>
              </div>
            )}

            {/* Launch links */}
            <div className="project-detail-section">
              <h3 className="project-detail-section-title">
                Links & Repository
              </h3>
              <div className="project-detail-links">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-launch-btn"
                  >
                    <span>Launch Live Application</span>
                    <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }}>
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-source-btn"
                  >
                    <span>Browse Source Code</span>
                    <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }}>
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>
                )}
                {!selectedProject.link && !selectedProject.github && (
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', padding: '6px 0' }}>
                    {selectedProject.sourceNotice || 'Source available upon technical evaluation.'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-layout">
      {/* Projects Photo Grid */}
      <div className="projects-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="project-card"
          >
            {/* Project Image */}
            <div className="project-card-image-wrapper">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card-image"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'var(--surface-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                }}>
                  {project.placeholderType === 'security' ? '🛡️' : '📚'}
                </div>
              )}
              <div className="project-card-overlay">
                <span className="project-open-badge">
                  Inspect Project
                </span>
              </div>
            </div>

            {/* Card details */}
            <div className="project-card-info">
              <h3 className="project-card-title">
                {project.title}
              </h3>
              <p className="project-card-desc">
                {project.shortDescription || project.description}
              </p>
              <div className="project-card-tags">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="project-card-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
