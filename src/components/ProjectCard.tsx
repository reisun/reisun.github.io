import type { Project } from '../types/project';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
            {project.name}
          </a>
        </h3>
      </div>

      <p className={styles.description}>
        {project.description || 'No description'}
      </p>

      <div className={styles.meta}>
        {project.language && (
          <span className={styles.language}>{project.language}</span>
        )}
        <span className={styles.stars}>
          <span aria-label="stars">&#9733;</span> {project.stars}
        </span>
        <span className={styles.updated}>
          Updated {formatDate(project.updatedAt)}
        </span>
      </div>

      <div className={styles.links}>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.repoLink}
        >
          Repository
        </a>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.demoLink}
          >
            Demo
          </a>
        )}
      </div>
    </article>
  );
}
