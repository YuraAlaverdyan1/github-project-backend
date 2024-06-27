import { getCommitActivityForRepo } from '../utils/functions';

export interface IGithubUser {
    login: string;
    id: string;
    email: string | null;
    avatarUrl: string;
    location: string | null;
    followers: Followers;
    contributionsCollection: {
        totalCommitContributions: number;
        totalPullRequestContributions: number;
        restrictedContributionsCount: number;
        commitContributionsByRepository: ICommitContributionsByRepository[];
    };
}

export interface ICommitContributionsByRepository {
    contributions: IContributions[];
}

export interface IContributions {
    totalCount: number;
    pageIngo: IPageInfo;
    nodes: IContributionNode[];
}

export interface IContributionNode {
    occurredAt: string;
    user: {
        login: string;
    };
    repository: {
        name: string;
    };
}

export interface IPageInfo {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface IGithubCountryUsersResponse {
    search: {
        pageInfo: IPageInfo,
        userCount: number,
        nodes: IGithubUser[]
    };
}

export interface Weather {
    id: string;
    login: string;
    email: string;
    name: string;
    avatarUrl: string;
    location: string;
    contributionsCollection: ContributionsCollection;
    followers: Followers;
}

export interface ContributionsCollection {
    totalCommitContributions: number;
    totalPullRequestContributions: number;
    restrictedContributionsCount: number;
}

export interface Followers {
    pageInfo: IPageInfo;
    totalCount: number;
    nodes: IGithubUser[];
}


export interface ICommitActivityForRepo {
    repo: string;
    weekendDays: any
}

export interface ICommitActivity {
    days: number[];
    total: number;
    week: number;
}