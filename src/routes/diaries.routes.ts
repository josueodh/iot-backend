import ChartDiariesPatientController from 'controllers/ChartDiariesPatientController';
import DiariesController from 'controllers/DairiesController';
import { Router } from 'express';
import ensureAuthenticated from 'middleware/ensureAuthenticated';

const diariesRouter = Router();
const diariesController = new DiariesController();
const chartDiariesPatientController = new ChartDiariesPatientController();

diariesRouter.use(ensureAuthenticated);

diariesRouter.get('/', diariesController.index);
diariesRouter.post('/', diariesController.create);
diariesRouter.get('/chart/:patient_id', chartDiariesPatientController.index);
export default diariesRouter;
