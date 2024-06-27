import express from 'express';

import gitUsersRouter from '../routers/gitUsers';

const mainRouter = express.Router();

mainRouter.use('/users', gitUsersRouter);

export default mainRouter;