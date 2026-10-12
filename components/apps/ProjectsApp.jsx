import React, { useState } from 'react';
import { projects, filters } from '../../data/projects';

export default function ProjectsApp({ selectedProject: propSelectedProject, setSelectedProject: propSetSelectedProject }) {
  const [localSelectedProject, setLocalSelectedProject] = useState(null);

  const selectedProject = propSelectedProject !== undefined ? propSelectedProject : localSelectedProject;
  const setSelectedProject = propSetSelectedProject !== undefined ? propSetSelectedProject : setLocalSelectedProject;

  if (selectedProject) {
    return (
      <div className="project-detail-layout">
        {/* Back navigation */}
        <button
          onClick={() => setSelectedProject(null)}
          className="project-back-btn"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Gallery
        </button>

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
          {/* Image preview (left 7 cols) */}
          <div className="project-detail-preview">
            {selectedProject.image ? (
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="project-detail-img"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60';
                }}
              />
            ) : (
              <div style={{ color: '#4b5563', fontSize: '12px', fontFamily: 'monospace' }}>No preview image</div>
            )}
          </div>

          {/* Details (right 5 cols) */}
          <div className="project-detail-info-col">
            <div className="project-detail-section">
              <h3 className="project-detail-section-title">
                Overview
              </h3>
              <p className="project-detail-desc">
                {selectedProject.description}
              </p>
            </div>

            {/* Launch links */}
            <div className="project-detail-section">
              <h3 className="project-detail-section-title">
                Links
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
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
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
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>
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
              <img
                src={project.image}
                alt={project.title}
                className="project-card-image"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60';
                }}
              />
              <div className="project-card-overlay">
                <span className="project-open-badge">
                  Open Project
                </span>
              </div>
            </div>

            {/* Card details */}
            <div className="project-card-info">
              <h3 className="project-card-title">
                {project.title}
              </h3>
              <p className="project-card-desc">
                {project.description}
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
