import type { GitHubUser } from "@/types/github-user";
import { ProfileCard } from "@/components/profile/profile-card";
import { RepositoryList } from "@/components/profile/repository-list";

type ProfileViewProps = {
  user: GitHubUser;
};

export function ProfileView({ user }: ProfileViewProps) {
  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-8 xl:gap-10">
      <div className="lg:sticky lg:top-8">
        <ProfileCard user={user} />
      </div>

      <RepositoryList repositories={user.repositories} />
    </div>
  );
}
