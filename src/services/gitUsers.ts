import GithubAPI from '../api/github';

import { GIT_TOKENS } from '../config/environments';

import logger from '../utils/logger';
import { CustomError } from '../utils/customError';

const Github = new GithubAPI(GIT_TOKENS.TOKEN || '');

const getGitUsersFromCountry = async (country: string, endCursor: string | null) => {
    try {
        return await Github.getUsersFromCountry(country, endCursor);
    } catch (error) {
        logger.error(`GIT_USERS: Error rejecting request \n ${error}`);
        return new CustomError('Internal Server Error', 500, true);
    }
};

const getGitUserByLogin = async (login: string, followersCursor: string | null) => {
    try {
        return await Github.getUserWithLogin(login, followersCursor);
    } catch (error) {
        logger.error(`GIT_USERS: Error rejecting request \n ${error}`);
        return new CustomError('Internal Server Error', 500, true);
    }
};

export const GitUsersService = {
    getGitUsersFromCountry,
    getGitUserByLogin
};