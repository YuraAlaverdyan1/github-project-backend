import { Request, Response } from 'express';

import { GitUsersService } from '../services/gitUsers';

import constants from '../utils/constants';
import { ResponseHandler } from '../utils/responseHandler';

const getUsersFromCountry = async (req: Request, res: Response) => {
    const country = req.params.country;
    const endCursor = req.query.endCursor as string || null;

    const response = await GitUsersService.getGitUsersFromCountry(country, endCursor);

    return ResponseHandler.sendResponse(res, req, response, 200, constants.MESSAGE_GIT_USERS_COUNTRY_RETRIEVED_SUCCESSFULLY(country));
};

const getGitUserWithLogin = async (req: Request, res: Response) => {
    const login = req.params.login;
    const followersCursor = req.query.cursor as string || null;

    const response = await GitUsersService.getGitUserByLogin(login, followersCursor);

    return ResponseHandler.sendResponse(res, req, response, 200, constants.MESSAGE_GIT_USER_RETRIEVED_SUCCESSFULLY(login));
};

export const GitUsersController = {
    getUsersFromCountry,
    getGitUserWithLogin
};