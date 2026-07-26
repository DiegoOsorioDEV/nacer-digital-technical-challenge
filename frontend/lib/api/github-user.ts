import type {
  FetchGitHubUserResult,
  GitHubRepository,
  GitHubUser,
} from "@/types/github-user";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://nacer-digital-technical-challenge.onrender.com";

export const GITHUB_USERNAME = "DiegoOsorioDEV";

function isGitHubRepository(value: unknown): value is GitHubRepository {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const repo = value as Record<string, unknown>;

  return (
    typeof repo.name === "string" &&
    (repo.description === null || typeof repo.description === "string") &&
    typeof repo.html_url === "string" &&
    typeof repo.stargazers_count === "number" &&
    (repo.language === null || typeof repo.language === "string") &&
    typeof repo.fork === "boolean" &&
    typeof repo.updated_at === "string"
  );
}

function isGitHubUser(value: unknown): value is GitHubUser {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const user = value as Record<string, unknown>;

  return (
    (user.name === null || typeof user.name === "string") &&
    (user.bio === null || typeof user.bio === "string") &&
    typeof user.public_repos === "number" &&
    typeof user.followers === "number" &&
    typeof user.following === "number" &&
    typeof user.avatar_url === "string" &&
    typeof user.html_url === "string" &&
    (user.contributions_last_year === null ||
      typeof user.contributions_last_year === "number") &&
    Array.isArray(user.repositories) &&
    user.repositories.every(isGitHubRepository)
  );
}

export async function fetchGitHubUser(
  username: string = GITHUB_USERNAME,
): Promise<FetchGitHubUserResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${username}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return {
        ok: false,
        error: `El backend respondió con un error (${response.status}).`,
      };
    }

    const data: unknown = await response.json();

    if (!isGitHubUser(data)) {
      return {
        ok: false,
        error: "La respuesta del backend no tiene el formato esperado.",
      };
    }

    return { ok: true, data };
  } catch {
    return {
      ok: false,
      error:
        "No se pudo conectar con el backend. Verifica que NestJS esté corriendo en el puerto 3001.",
    };
  }
}
