import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { projects, filters } from '../data/projects'
import ProjectCard from './ProjectCard'
import styles from './Projects.module.css'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [ref, isVisible] = useInView({ threshold: 0.05 })

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter))

  return (
    <section className={styles.projects} id="work" ref={ref}>
      <motion.div
        className="section-label"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label__line" />
        <span className="section-label__text">Selected Work</span>
      </motion.div>

      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className={styles.heading}>
          What I&apos;ve<br />been building
        </h2>
        <span className={styles.count}>{filtered.length} Projects</span>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        className={styles.filters}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        {filters.map((f) => (
          <button
            key={f}
            className={`${styles.filterTab} ${activeFilter === f ? styles.active : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
