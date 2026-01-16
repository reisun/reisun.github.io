import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>reisun</h1>
      <p className={styles.subtitle}>Software Developer</p>
      <div className={styles.cta}>
        <Link to="/projects" className={styles.primaryButton}>
          View Projects
        </Link>
        <a
          href="https://github.com/reisun"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.secondaryButton}
        >
          GitHub Profile
        </a>
      </div>
    </section>
  )
}
