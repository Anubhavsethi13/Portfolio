import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './Contact.module.css'

const links = [
  { label: 'LinkedIn', icon: 'in', href: 'https://www.linkedin.com/in/anubhav-sethi13/' },
  { label: 'Behance', icon: 'Be', href: 'https://www.behance.net/anubhavsethi1' },
  { label: 'GitHub', icon: 'GH', href: 'https://github.com/Anubhavsethi13' },
]

export default function Contact() {
  const [ref, isVisible] = useInView({ threshold: 0.15 })

  return (
    <section className={styles.contact} id="contact" ref={ref}>
      <div className={styles.inner}>
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label__line" />
          <span className="section-label__text">Contact</span>
        </motion.div>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Let&apos;s work<br />
          <span className={styles.headingAccent}>together.</span>
        </motion.h2>

        <motion.p
          className={styles.text}
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Open to freelance projects, full-time roles, and creative collaborations. If you&apos;ve got an interesting problem to solve, let&apos;s talk.
        </motion.p>

        <motion.div
          className={styles.links}
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href="mailto:aanubhavsethi2405@gmail.com" className={`${styles.link} ${styles.linkPrimary}`}>
            <span className={styles.linkIcon}>✉</span>
            Contact Me!
          </a>
          {links.map((l) => (
            <a key={l.label} href={l.href} className={styles.link} target="_blank" rel="noopener noreferrer">
              <span className={styles.linkIcon}>{l.icon}</span>
              {l.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
