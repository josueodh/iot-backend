import PatientsController from 'controllers/PatientsController';
import UsersController from 'controllers/UsersController';
import { Router } from 'express';

const patientsRouter = Router();
const patientsController = new PatientsController();

patientsRouter.get('/', patientsController.index);
patientsRouter.post('/', patientsController.create);
patientsRouter.get('/:id', patientsController.show);
patientsRouter.put('/:id', patientsController.update);
patientsRouter.delete('/:id', patientsController.delete);

export default patientsRouter;
