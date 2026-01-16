import { useState, useEffect, useMemo } from 'react';
import type { Project, ProjectsData } from '../types/project';
import { ProjectCard } from '../components/ProjectCard';
import { SearchInput } from '../components/SearchInput';
import { SortSelect, type SortOption } from '../components/SortSelect';
import styles from './ProjectsPage.module.css';

type Status = 'loading' | 'success' | 'error';

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('updated');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/projects.json');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data: ProjectsData = await response.json();
        setProjects(data.items);
        setStatus('success');
      } catch {
        setStatus('error');
      }
    }
    fetchProjects();
  }, []);

  const filteredAndSorted = useMemo(() => {
    const searchLower = search.toLowerCase();

    const filtered = projects.filter((project) => {
      if (!search) return true;
      const nameMatch = project.name.toLowerCase().includes(searchLower);
      const descMatch = project.description?.toLowerCase().includes(searchLower);
      return nameMatch || descMatch;
    });

    return filtered.sort((a, b) => {
      switch (sort) {
        case 'updated':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'stars':
          return b.stars - a.stars;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [projects, search, sort]);

  if (status === 'loading') {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>Browse my open source projects</p>
        </header>
        <p className={styles.message}>Loading...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>Browse my open source projects</p>
        </header>
        <p className={styles.error}>Failed to load projects. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>Browse my open source projects</p>
      </header>

      <div className={styles.controls}>
        <SearchInput value={search} onChange={setSearch} />
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {filteredAndSorted.length === 0 ? (
        <p className={styles.message}>No projects found</p>
      ) : (
        <div className={styles.grid}>
          {filteredAndSorted.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
