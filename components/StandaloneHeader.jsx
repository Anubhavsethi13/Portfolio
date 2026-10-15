import React from 'react';

// Sticky glass header bar shared by the standalone pages (/resume, /projects/[slug]).
// Each page supplies its own left/right content.
const headerStyle = {
  height: '48px',
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderBottom: '1px solid var(--border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  position: 'sticky',
  top: 0,
  zIndex: 50,
};

export default function StandaloneHeader({ children }) {
  return <header style={headerStyle}>{children}</header>;
}
