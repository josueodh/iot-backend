import { Router } from 'express';
import usersRouter from './users.routes';
import patientsRouter from './patients.routes';
import sessionsRouter from './sessions.routes';
import measurementsRouter from './measurements.routes';
import diariesRouter from './diaries.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/patients', patientsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/measurements', measurementsRouter);
routes.use('/diaries', diariesRouter);

export default routes;
