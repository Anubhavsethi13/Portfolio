import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  AboutIcon,
  ProjectsIcon,
  ContactIcon,
  ErrorIcon,
  TrashIcon,
  GitHubIcon,
  LinkedInIcon
} from './AppIcons';

export default function Dock({ openApps, activeApp, minimizedApps = [], onOpenApp }) {
  const mouseX = useMotionValue(Infinity);
  const dockRef = useRef(null);

  const apps = [
    {
      id: 'about',
      label: 'About Me',
      color: 'bg-yellow-500/20 border-yellow-500/40',
      icon: <AboutIcon />,
    },
    {
      id: 'projects',
      label: 'Projects Gallery',
      color: 'bg-blue-500/20 border-blue-500/40',
      icon: <ProjectsIcon />,
    },
    {
      id: 'contact',
      label: 'Mail / Contact',
      color: 'bg-teal-500/20 border-teal-500/40',
      icon: <ContactIcon />,
    },
    {
      id: 'error',
      label: 'System Error',
      color: 'bg-red-500/20 border-red-500/40',
      icon: <ErrorIcon />,
    },
    {
      id: 'trash',
      label: 'Trash Bin',
      color: 'bg-gray-500/20 border-gray-500/40',
      icon: <TrashIcon />,
    },
    {
      id: 'github',
      label: 'GitHub Profile',
      color: 'bg-zinc-800/50 border-zinc-700/60',
      isLink: true,
      url: 'https://github.com/Anubhavsethi13',
      icon: <GitHubIcon />,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      isLink: true,
      url: 'https://linkedin.com',
      icon: <LinkedInIcon />,
    },
  ];

  return (
    <div
      ref={dockRef}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="os-dock-container"
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        padding: '10px 18px',
        background: 'rgba(20, 20, 22, 0.45)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
      }}
    >
      {apps.map((app) => {
        const isRunning = openApps.includes(app.id);
        const isActive = activeApp === app.id;
        const isMinimized = minimizedApps.includes(app.id);

        return (
          <DockIcon
            key={app.id}
            app={app}
            mouseX={mouseX}
            isRunning={isRunning}
            isActive={isActive}
            isMinimized={isMinimized}
            onClick={() => {
              if (app.isLink) {
                window.open(app.url, '_blank');
              } else {
                onOpenApp(app.id);
              }
            }}
          />
        );
      })}
    </div>
  );
}

function DockIcon({ app, mouseX, isRunning, isActive, isMinimized, onClick }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  // calculate distance of mouse pointer from the center of this icon
  const distance = useTransform(mouseX, (val) => {
    if (!ref.current) return Infinity;
    const bounds = ref.current.getBoundingClientRect();
    const centerX = bounds.x + bounds.width / 2;
    return val - centerX;
  });

  // map distance to scaling factor: close => 90px, far => 60px
  const sizeTransform = useTransform(distance, [-120, 0, 120], [60, 90, 60]);
  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 220, damping: 18 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      {/* Tooltip */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            bottom: '105px',
            background: 'rgba(15, 15, 17, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '4px 10px',
            borderRadius: '8px',
            fontSize: '11px',
            color: '#e4e4e7',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 1000,
          }}
        >
          {app.label}
        </div>
      )}

      {/* Dock Item Button */}
      <motion.button
        ref={ref}
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '16px',
          position: 'relative',
          border: 'none',
          background: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -10 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="dock-icon-inner">
          {app.icon}
        </div>

        {/* Active state overlay */}
        {isActive && (
          <div style={{
            position: 'absolute',
            inset: 0,
            border: '1px solid rgba(200, 240, 78, 0.4)',
            borderRadius: '16px',
            pointerEvents: 'none',
          }} />
        )}

        {/* Indicator dot under app if running */}
        {isRunning && (
          <span
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#C8F04E',
              boxShadow: isMinimized ? 'none' : '0 0 6px #C8F04E',
              opacity: isMinimized ? 0.3 : 1,
              position: 'absolute',
              bottom: '-8px',
              left: 'calc(50% - 2px)',
            }}
          />
        )}
      </motion.button>
    </div>
  );
}
