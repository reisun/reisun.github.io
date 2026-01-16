import styles from './AboutPage.module.css'

export function AboutPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>About</h1>
        <p className={styles.subtitle}>Learn more about me</p>
      </header>
      <section className={styles.profile}>
        <h2 className={styles.name}>reisun</h2>
        <p className={styles.bio}>
          Software Developer. Building tools and applications with modern web technologies.
        </p>
      </section>
    </div>
  )
}
