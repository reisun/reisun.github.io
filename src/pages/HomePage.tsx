import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'
import Logo from '../assets/logo.svg?react'

export function HomePage() {
  return (
    <section className={styles.hero}>
      <Logo aria-label="REISUN logo" className={styles.logo} />
      <h1 className={styles.title}>REISUN</h1>
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
