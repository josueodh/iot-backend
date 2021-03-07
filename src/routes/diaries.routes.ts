import DiariesController from 'controllers/DairiesController';
import { Router } from 'express';
import ensureAuthenticated from 'middleware/ensureAuthenticated';

const diariesRouter = Router();
const diariesController = new DiariesController();
diariesRouter.use(ensureAuthenticated);

diariesRouter.get('/', diariesController.index);
diariesRouter.post('/', diariesController.create);
export default diariesRouter;
