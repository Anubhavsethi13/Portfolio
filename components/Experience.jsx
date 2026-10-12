import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './Experience.module.css'

const experiences = [
  {
    role: 'Social Media Manager, Junior Associate Consultant',
    company: 'MachinesWale',
    location: 'Nagpur, IN',
    period: 'Dec 2024 — May 2025',
    points: [
      'Developed engaging content for social media platforms to enhance brand visibility.',
      'Monitored social media trends and competitor activity for strategic insights.',
      'Collaborated with the marketing team to align social media campaigns with business goals.',
      'Created content for platforms including Twitter, Instagram, Facebook, and LinkedIn.'
    ]
  },
  {
    role: 'Intern',
    company: 'K.E.C International',
    location: 'Nagpur, IN',
    period: 'Aug 2024 — Oct 2024',
    points: [
      'Assisted project managers with daily administrative tasks and meeting schedules.',
      'Maintained documentation and updated project records and contracts.',
      'Conducted research on industry trends to support project initiatives.',
      'Helped maintain applicant tracking systems and recruiting metrics.',
      'Prepared reports summarizing project progress and results for management review.'
    ]
  }
]

const education = [
  {
    degree: 'Polytechnic / Diploma',
    school: 'NIT Polytechnic',
    location: 'Nagpur, IN',
    period: '2021 — 2024',
    details: 'GPA: 7.2 / 10.0'
  },
  {
    degree: 'High School',
    school: 'E-Pathshala',
    period: '2017 — 2021'
  }
]

const certifications = [
  'Advanced C, C++, Java, Python and UI/UX Certification',
  'Infosys Springboard Certification',
  'RedHat System Administration Certification'
]

export default function Experience() {
  const [ref, isVisible] = useInView({ threshold: 0.05 })

  return (
    <section className={styles.experience} id="experience" ref={ref}>
      <motion.div
        className="section-label"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label__line" />
        <span className="section-label__text">Experience & Education</span>
      </motion.div>

      <div className={styles.grid}>
        {/* Left Column: Work Experience */}
        <div>
          <motion.h3
            className={styles.subheading}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Work Experience
          </motion.h3>

          <div className={styles.timeline}>
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
              >
                <div className={styles.timelineDot} />
                <span className={styles.period}>{exp.period}</span>
                <h4 className={styles.role}>{exp.role}</h4>
                <div className={styles.companyInfo}>
                  <span className={styles.company}>{exp.company}</span>
                  <span className={styles.location}>{exp.location}</span>
                </div>
                <ul className={styles.points}>
                  {exp.points.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Education & Certifications */}
        <div className={styles.rightCol}>
          <div>
            <motion.h3
              className={styles.subheading}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Education
            </motion.h3>

            <div className={styles.timeline}>
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  className={styles.timelineItem}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <div className={styles.timelineDot} />
                  <span className={styles.period}>{edu.period}</span>
                  <h4 className={styles.role}>{edu.degree}</h4>
                  <div className={styles.companyInfo}>
                    <span className={styles.company}>{edu.school}</span>
                    {edu.location && <span className={styles.location}>{edu.location}</span>}
                  </div>
                  {edu.details && <p className={styles.details}>{edu.details}</p>}
                </motion.div>
              ))}
            </div>
          </div>

          <div className={styles.certSection}>
            <motion.h3
              className={styles.subheading}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Certifications
            </motion.h3>

            <div className={styles.certList}>
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  className={styles.certCard}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + index * 0.08 }}
                >
                  <span className={styles.certIcon}>🏆</span>
                  <span className={styles.certName}>{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
