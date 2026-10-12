import React from 'react';

// 1. About / CV App Icon
export function AboutIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aboutBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="paperBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1F5F9" />
        </linearGradient>
        <linearGradient id="avatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <filter id="aboutShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Base Squircle */}
      <rect x="6" y="6" width="52" height="52" rx="14" fill="url(#aboutBg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" filter="url(#aboutShadow)" />
      
      {/* Glossy reflection */}
      <path d="M 6,20 A 14,14 0 0,1 20,6 L 44,6 A 14,14 0 0,1 58,20 L 58,28 L 6,28 Z" fill="rgba(255, 255, 255, 0.15)" />
      
      {/* Document Sheet */}
      <rect x="14" y="13" width="36" height="38" rx="4" fill="url(#paperBg)" filter="url(#aboutShadow)" />
      
      {/* Document Header Line */}
      <rect x="18" y="17" width="28" height="5" rx="1.5" fill="#D97706" opacity="0.85" />
      
      {/* Avatar Badge */}
      <rect x="18" y="26" width="10" height="10" rx="2.5" fill="url(#avatarBg)" />
      <circle cx="23" cy="29" r="2" fill="#FFFFFF" />
      <path d="M 19.5,35 C 19.5,32.5 26.5,32.5 26.5,35 Z" fill="#FFFFFF" />
      
      {/* Text lines */}
      <line x1="31" y1="28" x2="43" y2="28" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <line x1="31" y1="33" x2="40" y2="33" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
      
      <line x1="18" y1="40" x2="43" y2="40" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="44" x2="35" y2="44" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 2. Projects App Icon
export function ProjectsIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="projectsBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="screenBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="bracketGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <filter id="projectsShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Base Squircle */}
      <rect x="6" y="6" width="52" height="52" rx="14" fill="url(#projectsBg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" filter="url(#projectsShadow)" />
      
      {/* Glossy reflection */}
      <path d="M 6,20 A 14,14 0 0,1 20,6 L 44,6 A 14,14 0 0,1 58,20 L 58,28 L 6,28 Z" fill="rgba(255, 255, 255, 0.15)" />
      
      {/* Monitor Display */}
      <rect x="12" y="13" width="40" height="30" rx="4" fill="url(#screenBg)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" filter="url(#projectsShadow)" />
      
      {/* Traffic Lights */}
      <circle cx="17" cy="17" r="1.5" fill="#EF4444" />
      <circle cx="21" cy="17" r="1.5" fill="#F59E0B" />
      <circle cx="25" cy="17" r="1.5" fill="#10B981" />
      
      {/* Code Brackets </ > */}
      <path d="M 23,23 L 18,27 L 23,31" fill="none" stroke="url(#bracketGlow)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 41,23 L 46,27 L 41,31" fill="none" stroke="url(#bracketGlow)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="34" y1="21" x2="30" y2="33" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
      
      {/* Keyboard/Stand Shelf */}
      <path d="M 20,43 L 44,43 L 46,49 C 46,50 44,51 43,51 L 21,51 C 20,51 18,50 18,49 Z" fill="#E2E8F0" filter="url(#projectsShadow)" />
      <rect x="24" y="45" width="16" height="3" rx="1" fill="#94A3B8" />
    </svg>
  );
}

// 3. Contact App Icon
export function ContactIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="contactBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="50%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#115E59" />
        </linearGradient>
        <linearGradient id="envelopeBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <linearGradient id="envelopeFold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <filter id="contactShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Base Squircle */}
      <rect x="6" y="6" width="52" height="52" rx="14" fill="url(#contactBg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" filter="url(#contactShadow)" />
      
      {/* Glossy reflection */}
      <path d="M 6,20 A 14,14 0 0,1 20,6 L 44,6 A 14,14 0 0,1 58,20 L 58,28 L 6,28 Z" fill="rgba(255, 255, 255, 0.15)" />
      
      {/* Envelope Back */}
      <rect x="13" y="19" width="38" height="27" rx="3.5" fill="url(#envelopeFold)" filter="url(#contactShadow)" />
      
      {/* Letter sheet sticking out */}
      <rect x="17" y="15" width="30" height="12" rx="1.5" fill="#FFFFFF" />
      <line x1="21" y1="19" x2="33" y2="19" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="23" x2="27" y2="23" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Envelope Bottom Flap */}
      <path d="M 13,46 L 32,31 L 51,46 Z" fill="url(#envelopeBody)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" />
      
      {/* Envelope Side Flaps */}
      <path d="M 13,19 L 28,32.5 L 13,46 Z" fill="rgba(226, 232, 240, 0.92)" />
      <path d="M 51,19 L 36,32.5 L 51,46 Z" fill="rgba(226, 232, 240, 0.92)" />
      
      {/* Envelope Top Flap (Open) */}
      <path d="M 13,19 L 32,31 L 51,19 Z" fill="rgba(248, 250, 252, 0.96)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
      
      {/* Wax Seal */}
      <circle cx="32.5" cy="32.5" r="5" fill="#EF4444" filter="url(#contactShadow)" />
      <path d="M 32.5,31 C 32.5,31 31.2,29.8 30.2,30.6 C 29.2,31.4 31,33.5 32.5,34.8 C 34,33.5 35.8,31.4 34.8,30.6 C 33.8,29.8 32.5,31 32.5,31 Z" fill="#FFFFFF" />
    </svg>
  );
}

// 4. System Error App Icon
export function ErrorIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="errorBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id="cautionBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <filter id="errorShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Base Squircle */}
      <rect x="6" y="6" width="52" height="52" rx="14" fill="url(#errorBg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" filter="url(#errorShadow)" />
      
      {/* Glossy reflection */}
      <path d="M 6,20 A 14,14 0 0,1 20,6 L 44,6 A 14,14 0 0,1 58,20 L 58,28 L 6,28 Z" fill="rgba(255, 255, 255, 0.15)" />
      
      {/* Caution Triangle */}
      <path d="M 32,13 L 50,44 C 51,46 50,48 48,48 L 16,48 C 14,48 13,46 14,44 Z" fill="url(#cautionBg)" stroke="#D97706" strokeWidth="1.2" filter="url(#errorShadow)" />
      
      {/* Exclamation point */}
      <rect x="30.5" y="24" width="3" height="11" rx="1.5" fill="#451A03" />
      <circle cx="32" cy="41" r="2" fill="#451A03" />
    </svg>
  );
}

// 5. Trash Bin App Icon
export function TrashIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trashBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A1A1AA" />
          <stop offset="50%" stopColor="#52525B" />
          <stop offset="100%" stopColor="#27272A" />
        </linearGradient>
        <linearGradient id="glassBin" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="paperBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="paperTeal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4FD1C5" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <filter id="trashShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Base Squircle */}
      <rect x="6" y="6" width="52" height="52" rx="14" fill="url(#trashBg)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" filter="url(#trashShadow)" />
      
      {/* Glossy reflection */}
      <path d="M 6,20 A 14,14 0 0,1 20,6 L 44,6 A 14,14 0 0,1 58,20 L 58,28 L 6,28 Z" fill="rgba(255, 255, 255, 0.08)" />
      
      {/* Crumpled papers */}
      <path d="M 22,21 L 28,14 L 33,20 Z" fill="url(#paperBlue)" opacity="0.95" />
      <path d="M 31,18 L 38,13 L 42,19 Z" fill="url(#paperTeal)" opacity="0.95" />
      <circle cx="30" cy="18" r="2" fill="#F87171" />
      
      {/* Trash Lid */}
      <rect x="18" y="21" width="28" height="3" rx="1.5" fill="#E4E4E7" filter="url(#trashShadow)" />
      <path d="M 28,21 L 29,18 L 35,18 L 36,21 Z" fill="#E4E4E7" />
      
      {/* Trash Can Body */}
      <path d="M 20,26 L 44,26 L 40,50 C 40,52 38,53 36,53 L 28,53 C 26,53 24,52 24,50 Z" fill="url(#glassBin)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" filter="url(#trashShadow)" />
      
      {/* Metal mesh lines */}
      <line x1="25" y1="29" x2="27" y2="48" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <line x1="32" y1="29" x2="32" y2="48" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <line x1="39" y1="29" x2="37" y2="48" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    </svg>
  );
}

// 6. GitHub Profile App Icon
export function GitHubIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="githubBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#52525B" />
          <stop offset="50%" stopColor="#18181B" />
          <stop offset="100%" stopColor="#09090B" />
        </linearGradient>
        <linearGradient id="octocatColor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E4E4E7" />
        </linearGradient>
        <filter id="githubShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* Base Squircle */}
      <rect x="6" y="6" width="52" height="52" rx="14" fill="url(#githubBg)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" filter="url(#githubShadow)" />
      
      {/* Glossy reflection */}
      <path d="M 6,20 A 14,14 0 0,1 20,6 L 44,6 A 14,14 0 0,1 58,20 L 58,28 L 6,28 Z" fill="rgba(255, 255, 255, 0.08)" />
      
      {/* Octocat Silhouette */}
      <path d="M32 14 C21.4 14 12.8 22.6 12.8 33.2 C12.8 41.7 18.3 48.9 26.0 51.5 C27.0 51.7 27.3 51.1 27.3 50.5 C27.3 50.0 27.3 48.7 27.3 47.0 C21.9 48.2 20.8 44.5 20.8 44.5 C19.9 42.2 18.6 41.6 18.6 41.6 C16.9 40.4 18.8 40.4 18.8 40.4 C20.7 40.6 21.7 42.4 21.7 42.4 C23.5 45.4 26.3 44.5 27.4 44.0 C27.6 42.7 28.1 41.8 28.7 41.3 C24.4 40.8 19.9 39.1 19.9 31.8 C19.9 29.7 20.6 27.9 21.9 26.5 C21.7 26.0 21.0 24.1 22.0 21.5 C22.0 21.5 23.7 21.0 27.4 23.5 C29.0 23.1 30.5 22.9 32 22.9 C33.5 22.9 35.0 23.1 36.6 23.5 C40.3 21.0 42.0 21.5 42.0 21.5 C43.0 24.1 42.3 26.0 42.1 26.5 C43.4 27.9 44.1 29.7 44.1 31.8 C44.1 39.2 39.6 40.8 35.3 41.3 C36.0 41.9 36.6 43.1 36.6 44.9 C36.6 47.5 36.6 49.7 36.6 50.3 C36.6 50.9 37.0 51.5 38.0 51.3 C45.7 48.7 51.2 41.5 51.2 33.2 C51.2 22.6 42.6 14 32 14 Z" fill="url(#octocatColor)" filter="url(#githubShadow)" />
    </svg>
  );
}

// 7. LinkedIn Profile App Icon
export function LinkedInIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="linkedinBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="inColor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F3F4F6" />
        </linearGradient>
        <filter id="linkedinShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Base Squircle */}
      <rect x="6" y="6" width="52" height="52" rx="14" fill="url(#linkedinBg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" filter="url(#linkedinShadow)" />
      
      {/* Glossy reflection */}
      <path d="M 6,20 A 14,14 0 0,1 20,6 L 44,6 A 14,14 0 0,1 58,20 L 58,28 L 6,28 Z" fill="rgba(255, 255, 255, 0.15)" />
      
      {/* 'i' vertical line */}
      <rect x="18" y="24" width="7" height="21" rx="1" fill="url(#inColor)" filter="url(#linkedinShadow)" />
      {/* 'i' dot */}
      <circle cx="21.5" cy="17.5" r="4.5" fill="url(#inColor)" filter="url(#linkedinShadow)" />
      {/* 'n' shape */}
      <path d="M30 24 L30 45 M30 31 C30 27 32.5 24 36.5 24 C40.5 24 42.5 27 42.5 31 L42.5 45" fill="none" stroke="url(#inColor)" strokeWidth="7" strokeLinecap="round" filter="url(#linkedinShadow)" />
    </svg>
  );
}
