import styles from './AboutPage.module.css'

export function AboutPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About</h1>
      <section className={styles.profile}>
        <h2 className={styles.name}>reisun</h2>
        <p className={styles.bio}>
          Software Developer. Building tools and applications with modern web technologies.
        </p>
      </section>
    </div>
  )
}
