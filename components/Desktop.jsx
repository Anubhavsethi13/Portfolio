import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import wallpaperDark from '../public/assets/macos/wallpaper-dark.webp';
import wallpaperLight from '../public/assets/macos/wallpaper-light.webp';
import Window from './Window';
import Dock from './Dock';
import DesktopScene from './DesktopScene';
import AboutApp from './apps/AboutApp';
import ProjectsApp from './apps/ProjectsApp';
import ContactApp from './apps/ContactApp';
import TrashApp from './apps/TrashApp';
import { projects } from '../data/projects';
import { AboutIcon, ProjectsIcon, ContactIcon, TrashIcon, getProjectIcon } from './AppIcons';

export default function Desktop() {
  const desktopRef = useRef(null);
  
  // App state: list of open window IDs
  const [openApps, setOpenApps] = useState(['about']);
  // Minimized app IDs
  const [minimizedApps, setMinimizedApps] = useState([]);
  // Currently active app (highest z-index / focus)
  const [activeApp, setActiveApp] = useState('about');
  // Stacking order (last item is highest z-index)
  const [appStack, setAppStack] = useState(['projects', 'contact', 'trash', 'about']);
  
  // Active tab within AboutApp
  const [aboutTab, setAboutTab] = useState('about');

  // Selected project for the ProjectsApp detail view
  const [selectedProject, setSelectedProject] = useState(null);

  // Active theme (light/dark) for dynamic macOS wallpaper
  const { theme } = useTheme();
  const currentWallpaper = theme === 'light' ? wallpaperLight : wallpaperDark;

  const handleOpenApp = (id, tab) => {
    if (id === 'about' && tab) {
      setAboutTab(tab);
    }
    if (!openApps.includes(id)) {
      setOpenApps((prev) => [...prev, id]);
    }
    // Remove from minimized list if it was there
    setMinimizedApps((prev) => prev.filter(appId => appId !== id));
    // Focus app
    handleFocusApp(id);
  };

  // Latest handler/state for the window-level listeners below, so they are registered
  // once on mount instead of being removed and re-added on every state change.
  const latestRef = useRef({ handleOpenApp, openApps });
  useEffect(() => {
    latestRef.current = { handleOpenApp, openApps };
  });

  useEffect(() => {
    const handleOpenEvent = (e) => {
      const { id, tab, project } = e.detail || {};
      if (id === 'projects' && project) {
        setSelectedProject(project);
      }
      if (id) {
        latestRef.current.handleOpenApp(id, tab);
      }
    };

    const handleShowDesktop = () => {
      const { openApps } = latestRef.current;
      // Minimize all open windows to reveal the clean home desktop
      setMinimizedApps((prev) => {
        const visibleApps = openApps.filter(id => !prev.includes(id));
        if (visibleApps.length > 0) {
          return [...openApps];
        } else {
          // If all already minimized, restore
          return [];
        }
      });
      setActiveApp(null);
    };

    window.addEventListener('open-mac-app', handleOpenEvent);
    window.addEventListener('mac:show-desktop', handleShowDesktop);
    return () => {
      window.removeEventListener('open-mac-app', handleOpenEvent);
      window.removeEventListener('mac:show-desktop', handleShowDesktop);
    };
  }, []);

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
    <div ref={desktopRef} className="desktop-container">
      {/* Dynamic Theme macOS Desktop Wallpaper */}
      <div className="desktop-bg" />
      <div className="desktop-wallpaper-container">
        <Image
          src={currentWallpaper}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="desktop-wallpaper-img"
        />
      </div>
      {/* Decorative 3D wallpaper layer (non-interactive) */}
      <DesktopScene />
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
            <div className="shortcut-icon-wrapper" style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
              {getProjectIcon(project)}
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
            content = <AboutApp selectedTab={aboutTab} onTabChange={setAboutTab} />;
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
