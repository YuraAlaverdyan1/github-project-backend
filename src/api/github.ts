import { GraphQLClient } from 'graphql-request';
import { Octokit } from '@octokit/rest';

import logger from '../utils/logger';
import constants from '../utils/constants';
import { CustomError } from '../utils/customError';
import { GraphQlRequests } from '../utils/graphQLRequests';

import { getSixMonthsAgoDateTime } from '../utils/dataHelper';
import { IGithubCountryUsersResponse, IGithubUser } from './github.types';

class GithubAPI {
    private readonly token: string;
    private readonly graphql: GraphQLClient;
    private octokit: Octokit;

    constructor(token: string) {
        this.token = token;
        this.graphql = new GraphQLClient(constants.GITHUB_GRAPHQL_API_LINK, {
            headers: {
                authorization: `token ${this.token}`
            }
        });
        this.octokit = new Octokit({ auth: token });
    }

    async getUsersFromCountry(country: string, endCursor: string | null) {
        try {
            logger.debug(`GITHUB_API: Starting to get users from country ${country}`);
            const fromDate = getSixMonthsAgoDateTime();
            const toDate = new Date().toISOString();

            const response = await this.graphql.request<IGithubCountryUsersResponse>(GraphQlRequests.GET_USERS_FROM_COUNTRY(country, fromDate, toDate), {
                endCursor
            });
            logger.info(`GITHUB_API: Finished getting users from country ${country}`);

            return response;
        } catch (error) {
            logger.error(`GITHUB_API: Error getting git users from country ${country} \n ${error}`);
            if (error.response.data.errors.some((err: { type: string }) => err.type === 'NOT_FOUND')) {
                return new CustomError('User not found', 400, true);
            }
            return new CustomError('Internal Server Error', 500, true);
        }
    }

    async getUserWithLogin(login: string, followersCursor: string | null) {
        const fromDate = getSixMonthsAgoDateTime();
        const toDate = new Date().toISOString();
        try {
            logger.debug(`GITHUB_API: Starting to get user with login ${login}`);
            const response = await this.graphql.request<IGithubUser>(GraphQlRequests.GET_USER_BY_LOGIN(fromDate, toDate), {
                login,
                followersCursor
            });
            logger.info(`GITHUB_API: Finished getting user with login ${login}`);

            return response;
        } catch (error) {
            logger.error(`GITHUB_API: Error getting git user with login ${login} \n ${error}`);
            return new CustomError('Internal Server Error', 500, true);
        }
    }
}

export default GithubAPI;