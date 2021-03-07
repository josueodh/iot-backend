import UsersController from 'controllers/UsersController';
import { Router } from 'express';
import ensureAuthenticated from 'middleware/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
usersRouter.use(ensureAuthenticated);
usersRouter.post('/', usersController.create);

export default usersRouter;
