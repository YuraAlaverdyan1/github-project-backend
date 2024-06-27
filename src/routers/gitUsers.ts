import express from 'express';

import { GitUsersController } from '../controllers/gitUsers';

const gitUsersRouter = express.Router();

gitUsersRouter.get('/country/:country', GitUsersController.getUsersFromCountry);

gitUsersRouter.get('/getWithLogin/:login', GitUsersController.getGitUserWithLogin);

export default gitUsersRouter;