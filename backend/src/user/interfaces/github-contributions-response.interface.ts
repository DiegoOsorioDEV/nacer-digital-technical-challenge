export interface GitHubContributionsResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
        };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
}
