import { useState, useEffect, useMemo } from 'react';
import type { Project } from '../types/project';
import { ProjectCard } from '../components/ProjectCard';
import { SearchInput } from '../components/SearchInput';
import { SortSelect, type SortOption } from '../components/SortSelect';
import { FilterToggle } from '../components/FilterToggle';
import styles from './ProjectsPage.module.css';

type Status = 'loading' | 'success' | 'error' | 'rate-limited';

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  has_pages: boolean;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
  archived: boolean;
  fork: boolean;
}

function toProject(repo: GitHubRepo): Project {
  const demoUrl =
    repo.homepage || (repo.has_pages ? `https://reisun.github.io/${repo.name}/` : null);
  return {
    name: repo.name,
    description: repo.description,
    repoUrl: repo.html_url,
    demoUrl,
    hasDemo: demoUrl !== null,
    language: repo.language,
    topics: repo.topics,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
  };
}

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('updated');
  const [demoOnly, setDemoOnly] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(
          'https://api.github.com/users/reisun/repos?per_page=100',
        );
        if (response.status === 403 || response.status === 429) {
          setStatus('rate-limited');
          return;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const repos: GitHubRepo[] = await response.json();
        const fetched = repos
          .filter((repo) => !repo.archived && !repo.fork)
          .map(toProject);
        setProjects(fetched);
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
      // Demo filter
      if (demoOnly && !project.hasDemo) return false;
      // Search filter
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
  }, [projects, search, sort, demoOnly]);

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

  if (status === 'rate-limited') {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>Browse my open source projects</p>
        </header>
        <p className={styles.error}>
          GitHub API rate limit exceeded. Please try again in a few minutes.
        </p>
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
        <FilterToggle
          label="Demo only"
          checked={demoOnly}
          onChange={setDemoOnly}
        />
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
