export interface Project {
  name: string;
  description: string | null;
  repoUrl: string;
  demoUrl: string | null;
  hasDemo: boolean;
  language: string | null;
  topics: string[];
  stars: number;
  updatedAt: string;
}

export interface ProjectsData {
  generatedAt: string;
  items: Project[];
}
