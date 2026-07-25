import { UserRepositoryDto } from './user-repository.dto';

export class UserResponseDto {
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  contributions_last_year: number | null;
  repositories: UserRepositoryDto[];
}
