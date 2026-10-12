import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './About.module.css'

const philosophyCards = [
  { num: '01', title: 'Research First', desc: 'Every decision is grounded in user behavior, context, and real data — not assumptions.' },
  { num: '02', title: 'Intentional Aesthetics', desc: 'Visual choices serve a purpose. Nothing is decorative for decoration\'s sake.' },
  { num: '03', title: 'Systems Thinking', desc: 'Designing with scalability in mind — cohesive design systems over one-off components.' },
  { num: '04', title: 'Craft Obsession', desc: 'The details matter. Typography, spacing, motion — every pixel has intention.' },
]

const stats = [
  { num: '4+', label: 'Years Experience' },
  { num: '40+', label: 'Projects Done' },
  { num: '25+', label: 'Happy Clients' },
]

function LocalClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateClock = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      const formatter = new Intl.DateTimeFormat('en-US', options)
      setTime(formatter.format(new Date()))
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.clockWrap}>
      <span className={styles.clockTime}>{time || '12:00:00'}</span>
      <span className={styles.clockTz}>GMT+5:30 • Kolkata, IN</span>
    </div>
  )
}

export default function About() {
  const [ref, isVisible] = useInView({ threshold: 0.05 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics setup for smooth lag/inertia
  const springConfig = { damping: 30, stiffness: 90 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Translate mouse coordinate range [-0.5, 0.5] to 3D translate and rotate outputs
  const bgTranslateX = useTransform(x, [-0.5, 0.5], [-35, 35])
  const bgTranslateY = useTransform(y, [-0.5, 0.5], [-35, 35])
  const bgRotateX = useTransform(y, [-0.5, 0.5], [10, -10])
  const bgRotateY = useTransform(x, [-0.5, 0.5], [-10, 10])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(relativeX)
    mouseY.set(relativeY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section
      className={styles.about}
      id="about"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
    >
      {/* 3D Background Image */}
      <motion.div
        className={styles.bgImageContainer}
        style={{
          x: bgTranslateX,
          y: bgTranslateY,
          rotateX: bgRotateX,
          rotateY: bgRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src="/images/about-bg.jpg"
          alt=""
          className={styles.bgImage}
          draggable="false"
        />
      </motion.div>

      <motion.div
        className="section-label"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label__line" />
        <span className="section-label__text">About & Beliefs</span>
      </motion.div>

      <div className={styles.bentoGrid}>
        {/* Card 1: Profile Image (spans 1 column) */}
        <motion.div
          className={`${styles.bentoCard} ${styles.profileCard}`}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <img
            src="/images/profile.jpg"
            alt="Anubhav Sethi"
            className={styles.profileImg}
            draggable="false"
          />
        </motion.div>

        {/* Card 2: Bio (spans 3 columns) */}
        <motion.div
          className={`${styles.bentoCard} ${styles.span3} ${styles.bioCard}`}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <h2 className={styles.heading}>
            Design is <em>intention</em> made visible.
          </h2>
          <p className={styles.text}>
            I&apos;m Anubhav — a Full-Stack Developer and Designer based in India with a passion for building robust backend APIs, sleek user interfaces, and everything in between.
          </p>
          <p className={styles.text}>
            My work spans web application development, blockchain systems, and AI integrations — bridging the gap between clean code and exceptional user experience.
          </p>
        </motion.div>

        {/* Card 3: Live Clock & Status (spans 1 column) */}
        <motion.div
          className={`${styles.bentoCard} ${styles.clockCard}`}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <div className={styles.statusHeader}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>Active & Available</span>
          </div>
          <LocalClock />
          <div className={styles.clockLabel}>Currently working on web, AI, and smart contract projects.</div>
        </motion.div>

        {/* Card 4: Philosophy 1 */}
        <motion.div
          className={styles.bentoCard}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <div className={styles.philNum}>{philosophyCards[0].num}</div>
          <h3 className={styles.philTitle}>{philosophyCards[0].title}</h3>
          <p className={styles.philDesc}>{philosophyCards[0].desc}</p>
        </motion.div>

        {/* Card 5: Philosophy 2 */}
        <motion.div
          className={styles.bentoCard}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <div className={styles.philNum}>{philosophyCards[1].num}</div>
          <h3 className={styles.philTitle}>{philosophyCards[1].title}</h3>
          <p className={styles.philDesc}>{philosophyCards[1].desc}</p>
        </motion.div>

        {/* Card 6: Philosophy 3 */}
        <motion.div
          className={styles.bentoCard}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <div className={styles.philNum}>{philosophyCards[2].num}</div>
          <h3 className={styles.philTitle}>{philosophyCards[2].title}</h3>
          <p className={styles.philDesc}>{philosophyCards[2].desc}</p>
        </motion.div>

        {/* Card 7: Philosophy 4 */}
        <motion.div
          className={styles.bentoCard}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <div className={styles.philNum}>{philosophyCards[3].num}</div>
          <h3 className={styles.philTitle}>{philosophyCards[3].title}</h3>
          <p className={styles.philDesc}>{philosophyCards[3].desc}</p>
        </motion.div>

        {/* Card 8: Stats (spans 3 columns) */}
        <motion.div
          className={`${styles.bentoCard} ${styles.span3} ${styles.statsCard}`}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <div className={styles.statsGrid}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* FAQ Accordion Section */}
      <FaqAccordion />

      {/* Drifting Marquee Tickers */}
      <div className={styles.tickerContainer}>
        <div className={styles.tickerRow}>
          <div className={`${styles.tickerTrack} ${styles.marqueeLeft}`}>
            {tickerItemsRow1.map((item, idx) => (
              <span key={`r1-${idx}`} className={styles.tickerItem}>{item}</span>
            ))}
            {tickerItemsRow1.map((item, idx) => (
              <span key={`r1-dup-${idx}`} className={styles.tickerItem}>{item}</span>
            ))}
          </div>
        </div>
        <div className={styles.tickerRow}>
          <div className={`${styles.tickerTrack} ${styles.marqueeRight}`}>
            {tickerItemsRow2.map((item, idx) => (
              <span key={`r2-${idx}`} className={styles.tickerItem}>{item}</span>
            ))}
            {tickerItemsRow2.map((item, idx) => (
              <span key={`r2-dup-${idx}`} className={styles.tickerItem}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      q: 'What creative & development services do you provide?',
      a: 'I specialize in building full-stack web applications, designing scalable API backend systems, writing decentralized smart contracts (Solidity/Web3), and creating clean, high-conversion UI/UX graphics.'
    },
    {
      q: 'What is your core stack & toolkit?',
      a: 'For engineering, I leverage React, Next.js, TypeScript, Node.js, Express, SQL, and Python. For design and asset generation, I work with Figma, Photoshop, Illustrator, and various AI model trainer nodes.'
    },
    {
      q: 'Do you partner with design agencies and startups?',
      a: 'Yes, absolutely. I frequently collaborate with founders, creative agencies, and product teams to turn static ideas into interactive, high-performance web products.'
    },
    {
      q: 'How do you approach starting a new project?',
      a: 'My workflow begins with a detail-oriented discovery phase to align on goals. Then, I design the UI system in Figma, build the codebase, run automated verification testing, and deploy to production.'
    }
  ]

  return (
    <div className={styles.faqSection}>
      <h3 className={styles.faqHeading}>Frequently Asked Questions</h3>
      <div className={styles.faqList}>
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i
          return (
            <div key={i} className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ''}`}>
              <button 
                className={styles.faqQuestion} 
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span>{faq.q}</span>
                <span className={styles.faqIcon}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className={styles.faqAnswerContainer}
              >
                <div className={styles.faqAnswer}>
                  <p>{faq.a}</p>
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const tickerItemsRow1 = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'REST APIs',
  'Framer Motion', 'Postman', 'Figma (UI/UX)', 'UI Design Nerd 🎨', 'Night Owl 🦉'
]

const tickerItemsRow2 = [
  'Python', 'Solidity', 'Web3.js', 'Smart Contracts ⛓️', 'AI Integrations 🤖',
  'Machine Learning', 'Git & GitHub', 'Vercel', 'Espresso Lover ☕', 'Detail Obsessed ✨'
]
