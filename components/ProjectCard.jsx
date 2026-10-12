import { motion } from 'framer-motion'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project, index }) {
  const initials = project.title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

  return (
    <motion.div
      className={`${styles.card} ${project.featured ? styles.featured : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ 
        y: -8, 
        scale: 1.012,
        transition: { type: 'spring', stiffness: 350, damping: 20 }
      }}
    >
      {/* Image area */}
      <div className={styles.imgWrap} style={{ backgroundColor: project.color }}>
        {project.featured && (
          <span className={styles.featuredBadge}>Featured</span>
        )}
        {project.image ? (
          <img src={project.image} alt={project.title} className={styles.projectImg} />
        ) : (
          <div className={styles.imgInner}>{initials}</div>
        )}
        <div className={styles.overlay}>
          <div className={styles.overlayLinks}>
            {project.link && (
              <a href={project.link} className={styles.viewBtn} target="_blank" rel="noopener noreferrer">
                Live Demo →
              </a>
            )}
            {project.github && (
              <a href={project.github} className={styles.githubBtn} target="_blank" rel="noopener noreferrer">
                GitHub Code →
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.desc}>{project.description}</p>
      </div>
    </motion.div>
  )
}
