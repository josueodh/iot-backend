import { Router } from 'express';
import usersRouter from './user.routes';
import patientsRouter from './patient.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/patients', patientsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
