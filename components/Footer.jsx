import styles from './Footer.module.css'

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anubhav-sethi13/' },
  { label: 'Behance', href: 'https://www.behance.net/anubhavsethi1' },
  { label: 'GitHub', href: 'https://github.com/Anubhavsethi13' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          <span>🎶 I write code to build solutions • Solving problems and engineering tools that help people do their best work • Coffee, Code, Repeat ☕ • Stay hungry, stay foolish ✨ • 🎶</span>
          <span>🎶 I write code to build solutions • Solving problems and engineering tools that help people do their best work • Coffee, Code, Repeat ☕ • Stay hungry, stay foolish ✨ • 🎶</span>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Anubhav Sethi. All rights reserved.
        </p>
        <div className={styles.social}>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
