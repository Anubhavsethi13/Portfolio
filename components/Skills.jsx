import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './Skills.module.css'

const skillGroups = [
  {
    label: 'Frontend & UI',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5 / CSS3', 'Framer Motion', 'Figma Experience'],
    featured: ['React', 'Next.js', 'TypeScript', 'Figma Experience'],
  },
  {
    label: 'Backend & Software',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'SQL', 'C / C++', 'C#', 'Java'],
    featured: ['Node.js', 'C / C++', 'Java'],
  },
  {
    label: 'AI & Web3 Engineering',
    skills: ['Python', 'Solidity', 'Web3.js', 'OpenAI API', 'Machine Learning', 'AI Model Trainer'],
    featured: ['Python', 'AI Model Trainer'],
  },
  {
    label: 'Design, Media & Workflow',
    skills: ['Graphic Design', 'Photoshop Skills', 'Photography & Videography', 'Project Management', 'Git & GitHub', 'Vercel'],
    featured: ['Graphic Design', 'Photoshop Skills', 'Project Management'],
  },
]

export default function Skills() {
  const [ref, isVisible] = useInView({ threshold: 0.1 })

  return (
    <section className={styles.skills} id="skills" ref={ref}>
      <div className={styles.inner}>
        {/* Left */}
        <div>
          <motion.div
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label__line" />
            <span className="section-label__text">Skills</span>
          </motion.div>

          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Tools &<br />craft
          </motion.h2>

          <motion.p
            className={styles.text}
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A focused toolkit honed across years of client work, side projects, and constant iteration.
          </motion.p>
        </div>

        {/* Right */}
        <div className={styles.skillsGrid}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              className={styles.skillCard}
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + gi * 0.08 }}
            >
              <div className={styles.groupLabel}>{group.label}</div>
              <div className={styles.row}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`${styles.pill} ${group.featured.includes(skill) ? styles.featured : ''}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
