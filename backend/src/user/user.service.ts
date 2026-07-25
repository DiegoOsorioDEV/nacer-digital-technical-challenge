import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { UserRepositoryDto } from './dto/user-repository.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { GitHubContributionsResponse } from './interfaces/github-contributions-response.interface';
import { GitHubRepositoryResponse } from './interfaces/github-repository-response.interface';
import { GitHubUserResponse } from './interfaces/github-user-response.interface';

@Injectable()
export class UserService {
  private readonly githubApiBaseUrl = 'https://api.github.com';
  private readonly githubGraphqlUrl = 'https://api.github.com/graphql';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getUserByUsername(username: string): Promise<UserResponseDto> {
    const profile = await this.fetchProfile(username);

    const [repositoriesResult, contributionsResult] = await Promise.allSettled([
      this.fetchRepositories(username),
      this.fetchContributionsLastYear(username),
    ]);

    const repositories =
      repositoriesResult.status === 'fulfilled' ? repositoriesResult.value : [];

    const contributionsLastYear =
      contributionsResult.status === 'fulfilled'
        ? contributionsResult.value
        : null;

    return {
      ...this.mapToUserResponse(profile),
      contributions_last_year: contributionsLastYear,
      repositories,
    };
  }

  private async fetchProfile(username: string): Promise<GitHubUserResponse> {
    const url = `${this.githubApiBaseUrl}/users/${encodeURIComponent(username)}`;

    const { data } = await firstValueFrom(
      this.httpService
        .get<GitHubUserResponse>(url, { headers: this.getGitHubHeaders() })
        .pipe(
          catchError((error: AxiosError) => {
            this.handleGitHubAxiosError(error, username);
          }),
        ),
    );

    return data;
  }

  private async fetchRepositories(
    username: string,
  ): Promise<UserRepositoryDto[]> {
    const url = `${this.githubApiBaseUrl}/users/${encodeURIComponent(username)}/repos`;

    const { data } = await firstValueFrom(
      this.httpService
        .get<GitHubRepositoryResponse[]>(url, {
          headers: this.getGitHubHeaders(),
          params: {
            sort: 'updated',
            per_page: 100,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.handleGitHubAxiosError(error, username);
          }),
        ),
    );

    return data.map((repository) => this.mapToRepositoryResponse(repository));
  }

  private async fetchContributionsLastYear(
    username: string,
  ): Promise<number | null> {
    const to = new Date();
    const from = new Date();
    from.setFullYear(from.getFullYear() - 1);

    const query = `
      query ($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `;

    try {
      const { data } = await firstValueFrom(
        this.httpService.post<GitHubContributionsResponse>(
          this.githubGraphqlUrl,
          {
            query,
            variables: {
              username,
              from: from.toISOString(),
              to: to.toISOString(),
            },
          },
          { headers: this.getGitHubHeaders() },
        ),
      );

      if (data.errors?.length || !data.data.user) {
        return null;
      }

      return data.data.user.contributionsCollection.contributionCalendar
        .totalContributions;
    } catch {
      return null;
    }
  }

  private mapToUserResponse(
    data: GitHubUserResponse,
  ): Omit<UserResponseDto, 'contributions_last_year' | 'repositories'> {
    return {
      name: data.name,
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
    };
  }

  private mapToRepositoryResponse(
    repository: GitHubRepositoryResponse,
  ): UserRepositoryDto {
    return {
      name: repository.name,
      description: repository.description,
      html_url: repository.html_url,
      stargazers_count: repository.stargazers_count,
      language: repository.language,
      fork: repository.fork,
      updated_at: repository.updated_at,
    };
  }

  private getGitHubHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
    };

    const token = this.configService.get<string>('GITHUB_TOKEN');

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private handleGitHubAxiosError(error: AxiosError, username: string): never {
    if (error.response?.status === 404) {
      throw new NotFoundException({
        statusCode: 404,
        message: `GitHub user '${username}' was not found`,
        error: 'Not Found',
      });
    }

    throw new InternalServerErrorException({
      statusCode: 500,
      message: 'Failed to fetch user from GitHub',
      error: 'Internal Server Error',
    });
  }
}
