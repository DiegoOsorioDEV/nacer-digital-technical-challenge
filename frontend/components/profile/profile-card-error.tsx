type ProfileCardErrorProps = {
  message: string;
};

export function ProfileCardError({ message }: ProfileCardErrorProps) {
  return (
    <article
      role="alert"
      className="w-full max-w-md overflow-hidden rounded-2xl border border-red-200/80 bg-white shadow-xl shadow-red-100/50 dark:border-red-900/60 dark:bg-zinc-950 dark:shadow-black/40"
    >
      <div className="border-b border-red-100 bg-red-50 px-6 py-4 dark:border-red-900/40 dark:bg-red-950/30">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
          >
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </span>
          <div>
            <h2 className="text-base font-semibold text-red-900 dark:text-red-200">
              No se pudo cargar el perfil
            </h2>
            <p className="text-sm text-red-700 dark:text-red-300">
              Ocurrió un problema al consultar el backend.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {message}
        </p>
      </div>
    </article>
  );
}
