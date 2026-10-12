import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Hero.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

const words = ['delightful', 'scalable', 'secure', 'intuitive', 'performant']

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.noise} />
      <div className={styles.grid} />
      <div className={styles.glow} />

      <div className={styles.content}>
        <motion.div
          className={styles.badge}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className={styles.badgeDot} />
          Available for freelance
        </motion.div>

        <motion.h1
          className={styles.name}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Anubhav<br />
          <span className={styles.nameAccent}>Sethi</span>
        </motion.h1>

        <motion.div
          className={styles.bottom}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <p className={styles.tagline}>
            Full-Stack Developer & Designer — engineering clean, highly performant web applications and crafting{' '}
            <span className={styles.wordWrapper}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  className={styles.dynamicWord}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>{' '}
            digital experiences.
          </p>
          <div className={styles.ctas}>
            <a href="#work" className="btn-primary">
              View Work
              <svg className={styles.starIcon} viewBox="0 0 24 24">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" fill="currentColor" />
              </svg>
            </a>
            <a href="#contact" className="btn-ghost">Contact Me</a>
          </div>
        </motion.div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        Scroll to explore
      </div>
    </section>
  )
}
