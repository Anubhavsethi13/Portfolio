import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Window from './Window';
import Dock from './Dock';
import AboutApp from './apps/AboutApp';
import ProjectsApp from './apps/ProjectsApp';
import ContactApp from './apps/ContactApp';
import ErrorApp from './apps/ErrorApp';
import TrashApp from './apps/TrashApp';
import { projects } from '../data/projects';
import { AboutIcon, ProjectsIcon, ContactIcon, TrashIcon } from './AppIcons';

export default function Desktop() {
  const desktopRef = useRef(null);
  
  // App state: list of open window IDs
  const [openApps, setOpenApps] = useState(['about']);
  // Minimized app IDs
  const [minimizedApps, setMinimizedApps] = useState([]);
  // Currently active app (highest z-index / focus)
  const [activeApp, setActiveApp] = useState('about');
  // Stacking order (last item is highest z-index)
  const [appStack, setAppStack] = useState(['projects', 'contact', 'error', 'trash', 'about']);
  
  // Selected project for the ProjectsApp detail view
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenApp = (id) => {
    if (!openApps.includes(id)) {
      setOpenApps((prev) => [...prev, id]);
    }
    // Remove from minimized list if it was there
    setMinimizedApps((prev) => prev.filter(appId => appId !== id));
    // Focus app
    handleFocusApp(id);
  };

  const handleCloseApp = (id) => {
    setOpenApps((prev) => prev.filter(appId => appId !== id));
    setMinimizedApps((prev) => prev.filter(appId => appId !== id));
    // Set next active app if available
    const remainingOpen = openApps.filter(appId => appId !== id && !minimizedApps.includes(appId));
    if (remainingOpen.length > 0) {
      // Find the one that was highest in the stack
      const nextActive = [...appStack]
        .reverse()
        .find(appId => remainingOpen.includes(appId));
      if (nextActive) {
        setActiveApp(nextActive);
      }
    } else {
      setActiveApp(null);
    }
  };

  const handleMinimizeApp = (id) => {
    if (!minimizedApps.includes(id)) {
      setMinimizedApps((prev) => [...prev, id]);
    }
    // Set next active app
    const remainingOpen = openApps.filter(appId => appId !== id && !minimizedApps.includes(appId) && appId !== id);
    const nextActive = [...appStack]
      .reverse()
      .find(appId => remainingOpen.includes(appId));
    setActiveApp(nextActive || null);
  };

  const handleFocusApp = (id) => {
    setActiveApp(id);
    setAppStack((prev) => {
      const filtered = prev.filter(appId => appId !== id);
      return [...filtered, id];
    });
  };

  // Launch a project shortcut directly
  const handleLaunchProject = (project) => {
    setSelectedProject(project);
    handleOpenApp('projects');
  };

  // System shortcut definition
  const shortcuts = [
    {
      id: 'about',
      label: 'About & CV',
      icon: (
        <div className="shortcut-icon-wrapper" style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
          <AboutIcon />
        </div>
      ),
      action: () => handleOpenApp('about')
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: (
        <div className="shortcut-icon-wrapper" style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
          <ProjectsIcon />
        </div>
      ),
      action: () => {
        setSelectedProject(null);
        handleOpenApp('projects');
      }
    },
    {
      id: 'contact',
      label: 'Contact Me',
      icon: (
        <div className="shortcut-icon-wrapper" style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
          <ContactIcon />
        </div>
      ),
      action: () => handleOpenApp('contact')
    },
    {
      id: 'trash',
      label: 'Bin of Ideas',
      icon: (
        <div className="shortcut-icon-wrapper" style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
          <TrashIcon />
        </div>
      ),
      action: () => handleOpenApp('trash')
    }
  ];

  // Get featured projects for direct desktop shortcuts
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <div ref={desktopRef} className="desktop-container w-screen h-screen overflow-hidden">
      {/* Blurred Wallpaper */}
      <div className="desktop-bg" />
      <img
        src="/images/profile.jpg"
        alt="Background Wallpaper"
        className="desktop-wallpaper-img"
      />
      <div className="desktop-grid-overlay" />

      {/* Desktop Grid of Shortcut Icons */}
      <div className="desktop-grid">
        {/* System Apps */}
        {shortcuts.map((shortcut) => (
          <motion.div
            key={shortcut.id}
            drag
            dragMomentum={false}
            dragConstraints={desktopRef}
            onClick={shortcut.action}
            className="desktop-shortcut"
            whileTap={{ scale: 0.95 }}
          >
            {shortcut.icon}
            <span className="shortcut-label">
              {shortcut.label}
            </span>
          </motion.div>
        ))}

        {/* Featured Project Direct Shortcuts */}
        {featuredProjects.map((project) => (
          <motion.div
            key={project.id}
            drag
            dragMomentum={false}
            dragConstraints={desktopRef}
            onClick={() => handleLaunchProject(project)}
            className="desktop-shortcut"
            whileTap={{ scale: 0.95 }}
          >
            <div className="shortcut-icon-wrapper">
              <img
                src={project.image}
                alt={project.title}
                className="shortcut-icon-img"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60';
                }}
              />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(23, 23, 23, 0.1)' }} />
            </div>
            <span className="shortcut-label">
              {project.title.split(' ')[0]}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Render Active Draggable Windows */}
      <AnimatePresence>
        {openApps.map((appId) => {
          const zIndex = 10 + appStack.indexOf(appId);
          const isMinimized = minimizedApps.includes(appId);
          
          if (isMinimized) return null;

          let title = '';
          let width = 700;
          let height = 500;
          let content = null;
          let defaultX = 140;
          let defaultY = 90;

          if (appId === 'about') {
            title = 'Information about: Anubhav Sethi';
            width = 720;
            height = 540;
            content = <AboutApp />;
            defaultX = 100;
            defaultY = 60;
          } else if (appId === 'projects') {
            title = 'Projects Browser';
            width = 820;
            height = 580;
            content = (
              <ProjectsApp
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
              />
            );
            defaultX = 180;
            defaultY = 80;
          } else if (appId === 'contact') {
            title = 'Mail Client: Compose message';
            width = 560;
            height = 500;
            content = <ContactApp />;
            defaultX = 260;
            defaultY = 120;
          } else if (appId === 'error') {
            title = 'System Warning';
            width = 440;
            height = 300;
            content = <ErrorApp onClose={() => handleCloseApp('error')} />;
            defaultX = 350;
            defaultY = 180;
          } else if (appId === 'trash') {
            title = 'Trash Bin: Playground';
            width = 620;
            height = 420;
            content = <TrashApp />;
            defaultX = 220;
            defaultY = 100;
          }

          return (
            <Window
              key={appId}
              id={appId}
              title={title}
              width={width}
              height={height}
              defaultX={defaultX}
              defaultY={defaultY}
              isOpen={true}
              desktopRef={desktopRef}
              zIndex={zIndex}
              onClose={handleCloseApp}
              onMinimize={handleMinimizeApp}
              onFocus={handleFocusApp}
            >
              {content}
            </Window>
          );
        })}
      </AnimatePresence>



      {/* OS Dock Bar */}
      <div className="desktop-dock-wrapper">
        <Dock
          openApps={openApps}
          activeApp={activeApp}
          minimizedApps={minimizedApps}
          onOpenApp={(id) => {
            if (openApps.includes(id) && minimizedApps.includes(id)) {
              // Unminimize
              setMinimizedApps((prev) => prev.filter(appId => appId !== id));
              handleFocusApp(id);
            } else if (openApps.includes(id)) {
              // Toggle minimize if already active
              if (activeApp === id) {
                handleMinimizeApp(id);
              } else {
                handleFocusApp(id);
              }
            } else {
              // Open new
              handleOpenApp(id);
            }
          }}
        />
      </div>
    </div>
  );
}
