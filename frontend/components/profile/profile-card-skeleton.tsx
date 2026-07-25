function RepositoryCardSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="h-5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-3 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-2 h-4 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 flex gap-3">
        <div className="h-3 w-10 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}

export function ProfileCardSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Cargando perfil de GitHub"
      className="grid grid-cols-1 animate-pulse items-start gap-6 lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-8 xl:gap-10"
    >
      <article className="w-full overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xl shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40">
        <div className="h-24 bg-linear-to-r from-zinc-200 via-zinc-100 to-zinc-200 sm:h-28 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800" />

        <div className="relative px-4 pb-6 sm:px-6">
          <div className="-mt-12 mx-auto size-24 rounded-full border-4 border-white bg-zinc-200 sm:-mt-14 sm:size-28 dark:border-zinc-950 dark:bg-zinc-800" />

          <div className="mt-4 space-y-3 text-center sm:mt-5">
            <div className="mx-auto h-7 w-48 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="mx-auto h-4 w-full max-w-xs rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="mx-auto h-4 w-3/4 max-w-xs rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-2 py-3 sm:px-3 sm:py-4 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mx-auto h-6 w-10 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="mx-auto mt-2 h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            ))}
          </div>

          <div className="mt-6 h-12 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-6 h-11 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </article>

      <section className="min-w-0">
        <div className="mb-5 space-y-2">
          <div className="h-7 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-56 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <RepositoryCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
