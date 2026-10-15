import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '../hooks/useTheme';
import styles from './Navbar.module.css';

const clockFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export default function Navbar() {
  const router = useRouter();
  const [time, setTime] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let timer;
    // The menu bar shows HH:MM only, so update just after each minute boundary
    // instead of every second. IST is a whole-minute offset from UTC.
    const updateTime = () => {
      clearTimeout(timer);
      const now = new Date();
      setTime(clockFormatter.format(now));
      timer = setTimeout(updateTime, 60000 - (now.getTime() % 60000) + 50);
    };
    // Background tabs may delay timers; refresh as soon as the tab is visible again.
    const onVisibility = () => {
      if (!document.hidden) updateTime();
    };

    updateTime();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'About', appId: 'about', tab: 'about' },
    { label: 'Education', appId: 'about', tab: 'education' },
    { label: 'Experience', appId: 'about', tab: 'experience' },
    { label: 'Projects', appId: 'projects' },
    { label: 'Skills', appId: 'about', tab: 'skills' },
    { label: 'Certificates', appId: 'about', tab: 'certificates' },
    { label: 'Contact', appId: 'contact' },
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (router.pathname !== '/') {
      router.push('/').then(() => {
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent('open-mac-app', {
              detail: { id: item.appId, tab: item.tab },
            })
          );
        }, 150);
      });
    } else {
      window.dispatchEvent(
        new CustomEvent('open-mac-app', {
          detail: { id: item.appId, tab: item.tab },
        })
      );
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    if (router.pathname !== '/') {
      // If on /resume or /projects/[slug], navigate directly to home desktop
      router.push('/');
    } else {
      e.preventDefault();
      // On home desktop, clear/minimize windows to show the clean desktop
      window.dispatchEvent(
        new CustomEvent('mac:show-desktop')
      );
    }
  };

  return (
    <header className={`${styles.menuBar} ${scrolled ? styles.scrolled : ''}`}>
      {/* Left section: Logo & Nav items */}
      <div className={styles.leftGroup}>
        <Link
          href="/"
          onClick={handleLogoClick}
          className={styles.logo}
          aria-label="Home Desktop"
          title="Home Desktop"
        >
          {/* Apple Logo SVG ensuring cross-platform rendering (Windows/Linux/Mac) without broken glyphs */}
          <svg
            viewBox="0 0 170 170"
            width="13"
            height="13"
            fill="currentColor"
            style={{ display: 'inline-block', opacity: 0.9, flexShrink: 0 }}
            aria-hidden="true"
          >
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.71-11.64-14.01-6.19-9.5-11.05-20.2-14.58-32.1-3.53-11.9-5.3-23.2-5.3-33.9 0-14.15 3.53-26.07 10.59-35.75 7.06-9.68 16.03-14.6 26.91-14.76 4.35 0 9.29 1.14 14.83 3.42 5.54 2.28 9.38 3.48 11.53 3.59 1.85 0 5.79-1.25 11.83-3.75 6.04-2.5 11.14-3.64 15.3-3.42 13.92.76 24.58 5.65 31.98 14.68-12.18 7.39-18.17 17.51-17.96 30.34.22 10.22 4.13 18.81 11.75 25.77 7.61 6.96 16.53 11.09 26.75 12.39-2.39 7.39-5.11 14.79-8.17 22.2zM119.22 31.84c0-7.72 2.76-14.89 8.28-21.53 5.53-6.63 12.4-10.31 20.62-11.04.22 1.09.33 2.07.33 2.94 0 7.61-2.88 14.9-8.64 21.86-5.76 6.96-12.83 10.65-21.2 11.09-.22-1.09-.33-2.18-.33-3.32z" />
          </svg>
          <span>AS</span>
          <span className={styles.logoAccent}>.</span>
        </Link>

        {/* Desktop menu links */}
        <nav className={styles.navLinks} aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={(e) => handleNavClick(e, item)}
              className={styles.navItem}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Right section: Clock, Theme Toggle & Resume */}
      <div className={styles.rightGroup}>
        {/* Live IST Clock */}
        <div className={styles.menuClock} title="Kolkata, India (IST)">
          <span>{time || '12:00'}</span>
          <span className={styles.clockTz}>IST</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={styles.themeToggleBtn}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          aria-label={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {theme === 'dark' ? (
            /* Sun icon */
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            /* Moon icon */
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Downloadable Resume button */}
        <Link href="/resume" className={styles.resumeBtn} aria-label="View and Download Résumé">
          <span>Résumé</span>
          <span className={styles.resumeArrow}>↗</span>
        </Link>

        {/* Mobile menu trigger */}
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={styles.mobileDrawerItem}
              onClick={(e) => handleNavClick(e, item)}
              style={{ textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              {item.label}
            </button>
          ))}
          <Link
            href="/resume"
            className={styles.mobileDrawerResume}
            onClick={() => setMobileMenuOpen(false)}
          >
            Download Résumé (PDF)
          </Link>
        </div>
      )}
    </header>
  );
}
