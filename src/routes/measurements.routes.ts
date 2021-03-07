import MeasurementsController from 'controllers/MeasurementsController';
import { Router } from 'express';
import ensureAuthenticated from 'middleware/ensureAuthenticated';

const measurementsRouter = Router();
const measurementsController = new MeasurementsController();
measurementsRouter.use(ensureAuthenticated);

measurementsRouter.post('/', measurementsController.create);
measurementsRouter.get('/', measurementsController.index);
export default measurementsRouter;
