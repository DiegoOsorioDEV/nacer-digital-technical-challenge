import type { GitHubRepository } from "@/types/github-user";

type RepositoryListProps = {
  repositories: GitHubRepository[];
};

function formatUpdatedAt(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-3.5 shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function RepositoryCard({ repository }: { repository: GitHubRepository }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md sm:p-5 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="min-w-0 text-base font-semibold leading-snug sm:text-lg">
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-zinc-900 underline-offset-4 transition-colors hover:text-zinc-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:text-zinc-50 dark:hover:text-zinc-300 dark:focus-visible:outline-zinc-100"
          >
            {repository.name}
          </a>
        </h3>

        {repository.fork && (
          <span className="shrink-0 rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
            Fork
          </span>
        )}
      </div>

      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {repository.description ?? "Sin descripción disponible."}
      </p>

      <footer className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="inline-flex items-center gap-1 font-medium">
          <StarIcon />
          {repository.stargazers_count.toLocaleString("es-ES")}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="size-2.5 rounded-full bg-emerald-500"
          />
          {repository.language ?? "Desconocido"}
        </span>

        <span className="w-full sm:w-auto sm:ml-auto">
          Actualizado {formatUpdatedAt(repository.updated_at)}
        </span>
      </footer>
    </article>
  );
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  if (repositories.length === 0) {
    return (
      <section
        aria-label="Repositorios públicos"
        className="rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-6 text-center dark:border-zinc-700 dark:bg-zinc-950/70"
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          No hay repositorios públicos para mostrar.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Repositorios públicos">
      <header className="mb-4 flex flex-col gap-1 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50">
            Repositorios
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Proyectos públicos recientes en GitHub
          </p>
        </div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {repositories.length}{" "}
          {repositories.length === 1 ? "repositorio" : "repositorios"}
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
        {repositories.map((repository) => (
          <li key={repository.name} className="min-w-0">
            <RepositoryCard repository={repository} />
          </li>
        ))}
      </ul>
    </section>
  );
}
