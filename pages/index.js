import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Desktop from '../components/Desktop';
import IntroLoader from '../components/IntroLoader';
import { profile } from '../data/profile';

export default function Home() {
  return (
    <>
      <Head>
        <title>{`${profile.name} — ${profile.headline}`}</title>
        <meta name="description" content={`${profile.name} — Full-Stack Developer & Software Engineer. ${profile.tagline}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no" />
        <meta property="og:title" content={`${profile.name} — ${profile.headline}`} />
        <meta property="og:description" content={profile.tagline} />
        <meta property="og:type" content="website" />
        {/* Favicons, apple-touch-icon and manifest are declared once in pages/_document.js */}
      </Head>

      {/* MacBook Boot Screen Preloader */}
      <IntroLoader />

      {/* macOS Top Menu Bar */}
      <Navbar />

      <main style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed', inset: 0 }}>
        {/* macOS Desktop Workspace (Interactive Desktop Icons, Windows & Dock) */}
        <Desktop />
      </main>
    </>
  );
}
