import UsersController from 'controllers/UsersController';
import { Router } from 'express';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);