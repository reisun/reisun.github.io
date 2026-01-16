/**
 * GitHub API から public repositories を取得し、projects.json を生成する
 *
 * Usage:
 *   npx tsx scripts/fetch-projects.ts [username]
 *
 * Environment:
 *   GITHUB_TOKEN - GitHub API token (optional, but recommended for rate limiting)
 *   GITHUB_USERNAME - GitHub username (fallback if not passed as argument)
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, "..", "public", "projects.json");

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
  archived: boolean;
  fork: boolean;
}

interface Project {
  name: string;
  description: string | null;
  repoUrl: string;
  demoUrl: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  updatedAt: string;
}

interface ProjectsData {
  generatedAt: string;
  items: Project[];
}

async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "portfolio-site-builder",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

function filterRepos(repos: GitHubRepo[]): GitHubRepo[] {
  return repos.filter((repo) => {
    // Exclude archived repos
    if (repo.archived) return false;
    // Exclude forks
    if (repo.fork) return false;
    return true;
  });
}

function transformToProject(repo: GitHubRepo): Project {
  return {
    name: repo.name,
    description: repo.description,
    repoUrl: repo.html_url,
    demoUrl: repo.homepage || null,
    language: repo.language,
    topics: repo.topics || [],
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
  };
}

async function main(): Promise<void> {
  // Get username from args or environment
  const username =
    process.argv[2] || process.env.GITHUB_USERNAME || "reisun";

  console.log(`Fetching repositories for: ${username}`);

  try {
    // Fetch repos from GitHub API
    const repos = await fetchRepos(username);
    console.log(`Fetched ${repos.length} repositories`);

    // Filter out archived and forked repos
    const filteredRepos = filterRepos(repos);
    console.log(`After filtering: ${filteredRepos.length} repositories`);

    // Transform to project format
    const projects = filteredRepos.map(transformToProject);

    // Build output data
    const data: ProjectsData = {
      generatedAt: new Date().toISOString(),
      items: projects,
    };

    // Ensure public directory exists
    mkdirSync(dirname(OUTPUT_PATH), { recursive: true });

    // Write to file
    writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2), "utf-8");
    console.log(`Written to: ${OUTPUT_PATH}`);
    console.log(`Total projects: ${projects.length}`);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    process.exit(1);
  }
}

main();
