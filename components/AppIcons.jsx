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

// 8. OfficeFlow Suite App Icon
export function OfficeFlowIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ofBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="ofGloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0F9FF" />
        </linearGradient>
        <filter id="ofShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.32" />
        </filter>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#ofBg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" filter="url(#ofShadow)" />
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#ofGloss)" />
      <rect x="12" y="14" width="40" height="36" rx="5" fill="url(#cardGrad)" />
      <path d="M 12,19 C 12,16.24 14.24,14 17,14 L 47,14 C 49.76,14 52,16.24 52,19 L 52,23 L 12,23 Z" fill="#0284C7" />
      <circle cx="20" cy="18.5" r="1.8" fill="#FFFFFF" />
      <circle cx="27" cy="18.5" r="1.8" fill="#FFFFFF" />
      <rect x="17" y="27" width="8" height="7" rx="2" fill="#BAE6FD" />
      <rect x="28" y="27" width="8" height="7" rx="2" fill="#0EA5E9" />
      <rect x="39" y="27" width="8" height="7" rx="2" fill="#BAE6FD" />
      <rect x="17" y="37" width="8" height="7" rx="2" fill="#0EA5E9" />
      <rect x="28" y="37" width="8" height="7" rx="2" fill="#0369A1" />
      <rect x="39" y="37" width="8" height="7" rx="2" fill="#38BDF8" />
      <circle cx="44" cy="44" r="5.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M 42,44 L 43.5,45.5 L 46.5,42.5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 9. FitMart App Icon
export function FitMartIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fitBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="50%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#9F1239" />
        </linearGradient>
        <linearGradient id="fitGloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="metalChrome" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <filter id="fitShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.32" />
        </filter>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#fitBg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" filter="url(#fitShadow)" />
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#fitGloss)" />
      <path d="M 23,26 C 23,17 41,17 41,26" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
      <rect x="14" y="27" width="5.5" height="15" rx="2.5" fill="url(#metalChrome)" />
      <rect x="44.5" y="27" width="5.5" height="15" rx="2.5" fill="url(#metalChrome)" />
      <rect x="20.5" y="29" width="4.5" height="11" rx="2" fill="url(#metalChrome)" />
      <rect x="39" y="29" width="4.5" height="11" rx="2" fill="url(#metalChrome)" />
      <rect x="23" y="32.5" width="18" height="4" rx="2" fill="#FFFFFF" />
      <circle cx="32" cy="46" r="3" fill="#FFE4E6" />
      <circle cx="32" cy="46" r="1.5" fill="#E11D48" />
    </svg>
  );
}

// 10. FAQ-Assist AI Support App Icon
export function FAQAssistIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="faqBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4338CA" />
        </linearGradient>
        <linearGradient id="faqGloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EEF2FF" />
        </linearGradient>
        <filter id="faqShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.32" />
        </filter>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#faqBg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" filter="url(#faqShadow)" />
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#faqGloss)" />
      <path d="M 24,17 L 46,17 C 50,17 53,20 53,24 L 53,32 C 53,36 50,39 46,39 L 42,39 L 38,44 L 38,39 L 24,39 C 20,39 17,36 17,32 L 17,24 C 17,20 20,17 24,17 Z" fill="rgba(255,255,255,0.3)" />
      <path d="M 18,22 L 40,22 C 43.5,22 46,24.5 46,28 L 46,36 C 46,39.5 43.5,42 40,42 L 27,42 L 21,47 L 22,42 L 18,42 C 14.5,42 12,39.5 12,36 L 12,28 C 12,24.5 14.5,22 18,22 Z" fill="url(#bubbleGrad)" filter="url(#faqShadow)" />
      <path d="M 29,26 C 29,29.5 31.5,32 35,32 C 31.5,32 29,34.5 29,38 C 29,34.5 26.5,32 23,32 C 26.5,32 29,29.5 29,26 Z" fill="#6366F1" />
      <circle cx="38" cy="27" r="1.5" fill="#38BDF8" />
      <circle cx="21" cy="36" r="1" fill="#818CF8" />
    </svg>
  );
}

// 11. Security Log Analyzer App Icon
export function SecurityLogIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="secBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="50%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="secGloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <filter id="secShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.32" />
        </filter>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#secBg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" filter="url(#secShadow)" />
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#secGloss)" />
      <path d="M 32,13 L 47,18 C 47,31 38,44 32,49 C 26,44 17,31 17,18 Z" fill="#FFFFFF" opacity="0.95" />
      <path d="M 32,16 L 44,20 C 44,30.5 36.5,41.5 32,45.5 C 27.5,41.5 20,30.5 20,20 Z" fill="url(#shieldGrad)" />
      <path d="M 27,25 L 30,28 L 27,31" fill="none" stroke="#E0F2FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="32" y1="31" x2="37" y2="31" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      <rect x="28" y="34" width="8" height="6" rx="1.5" fill="#FFFFFF" />
      <path d="M 29.5,34 L 29.5,32 C 29.5,30.6 30.6,29.5 32,29.5 C 33.4,29.5 34.5,30.6 34.5,32 L 34.5,34" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
    </svg>
  );
}

// 12. AI-Driven Accounting & Bookkeeping App Icon
export function AccountingIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="accBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>
        <linearGradient id="accGloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="paperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#ECFDF5" />
        </linearGradient>
        <filter id="accShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.32" />
        </filter>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#accBg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" filter="url(#accShadow)" />
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#accGloss)" />
      <rect x="13" y="13" width="38" height="38" rx="4" fill="url(#paperGrad)" />
      <line x1="18" y1="20" x2="32" y2="20" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="18" y1="25" x2="26" y2="25" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="41" cy="22" r="4.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
      <text x="41" y="24.5" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">$</text>
      <rect x="19" y="37" width="6" height="8" rx="1.5" fill="#A7F3D0" />
      <rect x="29" y="33" width="6" height="12" rx="1.5" fill="#34D399" />
      <rect x="39" y="29" width="6" height="16" rx="1.5" fill="#059669" />
      <path d="M 22,35 L 32,30 L 42,26" fill="none" stroke="#047857" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="39,26 42,26 42,29" fill="none" stroke="#047857" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 13. Personalized Study Material Generator App Icon
export function StudyMaterialIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="studyBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="50%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#9A3412" />
        </linearGradient>
        <linearGradient id="studyGloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
        <filter id="studyShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.32" />
        </filter>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#studyBg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" filter="url(#studyShadow)" />
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#studyGloss)" />
      <path d="M 32,36 C 37,33 46,33 49,35 L 49,49 C 46,47 37,47 32,50 C 27,47 18,47 15,49 L 15,35 C 18,33 27,33 32,36 Z" fill="#FFFFFF" />
      <line x1="32" y1="36" x2="32" y2="50" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="20" y1="39" x2="28" y2="38" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="20" y1="43" x2="27" y2="42" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="36" y1="38" x2="44" y2="39" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="37" y1="42" x2="44" y2="43" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="32" cy="22" r="7.5" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1.2" />
      <path d="M 29,27.5 L 35,27.5 L 34,30.5 L 30,30.5 Z" fill="#94A3B8" />
      <path d="M 30,22 C 30,20.5 34,20.5 34,22" fill="none" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="32" y1="11" x2="32" y2="13" stroke="#FEF08A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="23" y1="15" x2="24.5" y2="16.5" stroke="#FEF08A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="41" y1="15" x2="39.5" y2="16.5" stroke="#FEF08A" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// Project Icon Resolver Helper
export function getProjectIcon(project) {
  if (!project) return <ProjectsIcon />;
  const title = (project.title || '').toLowerCase();
  if (title.includes('officeflow')) return <OfficeFlowIcon />;
  if (title.includes('fitmart')) return <FitMartIcon />;
  if (title.includes('faq')) return <FAQAssistIcon />;
  if (title.includes('security') || title.includes('log')) return <SecurityLogIcon />;
  if (title.includes('accounting') || title.includes('bookkeeping') || title.includes('ledger')) return <AccountingIcon />;
  if (title.includes('study') || title.includes('material')) return <StudyMaterialIcon />;
  return <ProjectsIcon />;
}

