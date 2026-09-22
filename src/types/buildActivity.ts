export interface GitHubUser {
  login: string;
  name: string | null;
  html_url: string;
  avatar_url: string;
  public_repos: number;
  bio: string | null;
  created_at: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  default_branch?: string;
}

export interface LanguageShare {
  name: string;
  share: number;
  color: string;
}

export interface GitHubActivityEvent {
  repo: string;
  type: string;
  date: string;
  message: string;
}

export interface GitHubTelemetryResponse {
  status: 'live' | 'fallback' | 'fallback_rate_limited' | 'fallback_error';
  user: GitHubUser;
  repos: GitHubRepository[];
  languages: LanguageShare[];
  recentActivity: GitHubActivityEvent[];
  cached?: boolean;
}

export interface LeetCodeLiveData {
  ranking: number | null;
  solved: {
    all: number;
    easy: number;
    medium: number;
    hard: number;
  };
}

export interface LeetCodeTelemetryResponse {
  status: 'success' | 'unavailable';
  username: string;
  profileUrl: string;
  liveData: LeetCodeLiveData | null;
  cached?: boolean;
}
