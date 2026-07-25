import { Suspense } from "react";
import { ProfileCardContainer } from "@/components/profile/profile-card-container";
import { ProfileCardSkeleton } from "@/components/profile/profile-card-skeleton";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 items-start justify-center bg-linear-to-br from-zinc-100 via-zinc-50 to-zinc-200 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 dark:from-zinc-950 dark:via-zinc-900 dark:to-black">
      <main className="w-full max-w-6xl">
        <div className="mb-6 text-center sm:mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 sm:text-sm dark:text-zinc-400">
            GitHub Profile
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Perfil profesional
          </h2>
        </div>

        <Suspense fallback={<ProfileCardSkeleton />}>
          <ProfileCardContainer />
        </Suspense>
      </main>
    </div>
  );
}
