import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import styles from './IntroLoader.module.css'

export default function IntroLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className={styles.overlay}
          initial={{ y: 0 }}
          exit={{ 
            y: '-100vh',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          <div className={styles.container}>
            <motion.div
              className={styles.logo}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              AS<span className={styles.accent}>.</span>
            </motion.div>
            <motion.div 
              className={styles.bar}
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
