import React, { useState } from 'react';

export default function TrashApp() {
  const [selectedFile, setSelectedFile] = useState(null);

  const drafts = [
    {
      name: 'CRT_scanlines.css',
      type: 'CSS Code',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-blue-400 stroke-2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      content: `/* CSS scanline simulation overlay */
.crt-overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;
  z-index: 99999;
  pointer-events: none;
  opacity: 0.15;
  animation: flicker 0.15s infinite;
}`,
    },
    {
      name: 'smart_voting.sol',
      type: 'Solidity Contract',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-purple-400 stroke-2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      content: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartVoting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    
    // Decentralized voting records logic...
}`,
    },
    {
      name: 'wobbly_borders.svg',
      type: 'SVG Filter',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-teal-400 stroke-2">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12a4 4 0 1 1 8 0" />
        </svg>
      ),
      content: `<svg xmlns="http://www.w3.org/2000/svg">
  <filter id="wobble">
    <feTurbulence 
      type="fractalNoise" 
      baseFrequency="0.05" 
      numOctaves="3" 
      result="noise" 
    />
    <feDisplacementMap 
      in="SourceGraphic" 
      in2="noise" 
      scale="8" 
    />
  </filter>
</svg>`,
    },
    {
      name: 'ai_agent_prompt.md',
      type: 'Markdown Document',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-emerald-400 stroke-2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
      content: `# AI Coding Agent Persona

You are an expert system designed to write clean code.
Constraints:
- Maintain pixel-perfect layouts.
- Optimize rendering performance.
- Avoid using Tailwind CSS if not requested.
- Focus on robust backend APIs.`,
    },
  ];

  if (selectedFile) {
    return (
      <div className="trash-viewer-layout">
        {/* Back button */}
        <button
          onClick={() => setSelectedFile(null)}
          className="project-back-btn"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Trash
        </button>

        {/* Header */}
        <div className="trash-viewer-header">
          <h2 className="trash-viewer-title">{selectedFile.name}</h2>
          <span className="trash-viewer-type">{selectedFile.type}</span>
        </div>

        {/* Code/Text Viewer */}
        <div className="trash-viewer-box">
          <pre className="trash-viewer-code">
            {selectedFile.content}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="trash-layout">
      <div>
        <h2 className="trash-title font-display">
          Bin of Ideas
        </h2>
        <p className="trash-desc" style={{ marginTop: '4px' }}>
          A folder for miscellaneous snippets, draft logic, and half-baked prototypes.
        </p>
      </div>

      {/* Grid of files */}
      <div className="trash-grid">
        {drafts.map((file) => (
          <div
            key={file.name}
            onClick={() => setSelectedFile(file)}
            className="trash-file-card"
          >
            {/* File Icon */}
            <div className="trash-file-icon-wrapper">
              {file.icon}
            </div>
            
            {/* File Name */}
            <span className="trash-file-name">
              {file.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
