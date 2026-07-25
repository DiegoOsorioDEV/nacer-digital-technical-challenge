import Image from "next/image";
import type { GitHubUser } from "@/types/github-user";

type ProfileCardProps = {
  user: GitHubUser;
};

type MetricItemProps = {
  label: string;
  value: number;
};

function MetricItem({ label, value }: MetricItemProps) {
  return (
    <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-2 py-3 text-center transition-colors hover:border-zinc-300 hover:bg-zinc-100/80 sm:px-3 sm:py-4 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700 dark:hover:bg-zinc-900">
      <p className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50">
        {value.toLocaleString("es-ES")}
      </p>
      <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-zinc-500 sm:text-xs dark:text-zinc-400">
        {label}
      </p>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}

function ContributionsBadge({
  contributions,
}: {
  contributions: number | null;
}) {
  const message =
    contributions !== null
      ? `${contributions.toLocaleString("es-ES")} contribuciones en el último año`
      : "Contribuciones no disponibles";

  return (
    <div
      className={`mt-6 rounded-xl border px-4 py-3 text-center text-sm ${
        contributions !== null
          ? "border-emerald-200/80 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200"
          : "border-zinc-200/80 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400"
      }`}
    >
      <p className="font-medium">{message}</p>
    </div>
  );
}

export function ProfileCard({ user }: ProfileCardProps) {
  const displayName = user.name ?? "Usuario de GitHub";

  return (
    <article className="w-full overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xl shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40">
      <div
        aria-hidden="true"
        className="h-24 bg-linear-to-r from-zinc-900 via-zinc-800 to-zinc-700 sm:h-28"
      />

      <div className="relative px-4 pb-6 sm:px-6">
        <div className="-mt-12 flex justify-center sm:-mt-14">
          <div className="rounded-full border-4 border-white bg-white p-0.5 shadow-lg dark:border-zinc-950 dark:bg-zinc-950">
            <Image
              src={user.avatar_url}
              alt={`Avatar de ${displayName}`}
              width={112}
              height={112}
              className="size-24 rounded-full object-cover sm:size-28"
              priority
            />
          </div>
        </div>

        <header className="mt-4 text-center sm:mt-5">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50">
            {displayName}
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {user.bio ?? "Sin biografía disponible."}
          </p>
        </header>

        <section
          aria-label="Métricas del perfil"
          className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-3"
        >
          <MetricItem label="Repos" value={user.public_repos} />
          <MetricItem label="Seguidores" value={user.followers} />
          <MetricItem label="Siguiendo" value={user.following} />
        </section>

        <ContributionsBadge contributions={user.contributions_last_year} />

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:focus-visible:outline-zinc-100"
        >
          <GitHubIcon />
          Ver perfil en GitHub
        </a>
      </div>
    </article>
  );
}
