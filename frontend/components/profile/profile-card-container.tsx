import { fetchGitHubUser } from "@/lib/api/github-user";
import { ProfileCardError } from "@/components/profile/profile-card-error";
import { ProfileView } from "@/components/profile/profile-view";

export async function ProfileCardContainer() {
  const result = await fetchGitHubUser();

  if (!result.ok) {
    return <ProfileCardError message={result.error} />;
  }

  return <ProfileView user={result.data} />;
}
