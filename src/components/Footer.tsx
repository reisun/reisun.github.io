import styles from './Footer.module.css'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          &copy; {currentYear} REISUN
        </p>
        <a
          href="https://github.com/reisun/reisun.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.sourceLink}
        >
          Source
        </a>
      </div>
    </footer>
  )
}
