export interface GitHubRepository {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
}

export interface GitHubUser {
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  contributions_last_year: number | null;
  repositories: GitHubRepository[];
}

export type FetchGitHubUserResult =
  | { ok: true; data: GitHubUser }
  | { ok: false; error: string };
