import React from 'react';

export default function ErrorApp({ onClose }) {
  return (
    <div className="warning-dialog" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
      {/* Exclamation Warning Icon */}
      <svg viewBox="0 0 64 64" style={{ width: '64px', height: '64px', flexShrink: 0 }}>
        <path
          d="M32 8 L58 50 A4 4 0 0 1 54 56 L10 56 A4 4 0 0 1 6 50 Z"
          fill="#eab308"
          stroke="#ca8a04"
          strokeWidth="2"
        />
        <line x1="32" y1="22" x2="32" y2="38" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
        <circle cx="32" cy="46" r="3.5" fill="#000000" />
      </svg>

      {/* Warning message */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
          Compiler Error (0x800F0906)
        </h3>
        <p style={{ fontSize: '12px', color: '#a1a1aa', maxWidth: '384px', lineHeight: 1.5, fontWeight: 300 }}>
          A fatal crash occurred because the developer attempted to center a div using <code style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', color: 'var(--accent)' }}>margin-left: 23%</code>. 
          StackOverflow is currently unreachable.
        </p>
      </div>

      {/* Button */}
      <button
        onClick={onClose}
        className="warning-btn"
        style={{ marginTop: '16px' }}
      >
        Accept fate and cry
      </button>
    </div>
  );
}
