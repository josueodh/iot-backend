import ChartMeasurementsPatientController from 'controllers/ChartMeasurementsPatientController';
import MeasurementsController from 'controllers/MeasurementsController';
import { Router } from 'express';
import ensureAuthenticated from 'middleware/ensureAuthenticated';

const measurementsRouter = Router();
const measurementsController = new MeasurementsController();
const chartMeasurementsPatientController = new ChartMeasurementsPatientController();
measurementsRouter.use(ensureAuthenticated);

measurementsRouter.post('/', measurementsController.create);
measurementsRouter.get('/', measurementsController.index);
measurementsRouter.get(
  '/chart/:patient_id',
  chartMeasurementsPatientController.index,
);
export default measurementsRouter;
