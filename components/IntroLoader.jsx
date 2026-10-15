import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './IntroLoader.module.css';

export default function IntroLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Authentic macOS boot progress timing: ~1.6s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: 'easeInOut' },
          }}
        >
          <div className={styles.container}>
            {/* Name's Initial 'AS' Monogram */}
            <motion.div
              className={styles.initialsLogo}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <span>AS</span>
              <span className={styles.accentDot}>.</span>
            </motion.div>

            {/* MacBook Boot Progress Bar Track */}
            <div className={styles.progressTrack}>
              <motion.div
                className={styles.progressBar}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: 1.4,
                  ease: [0.25, 0.1, 0.25, 1], // macOS boot progress acceleration curve
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
