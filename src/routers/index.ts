import { Router } from 'express';

import UserController from '../controllers/User';
import AuthenticationMiddleware from '../middleware/Authentication';
import DevRoutes from './dev.routes';
import PatientRoutes from './patient.routes';
import ScheduleRoutes from './schedule.routes';

const Routers = Router();

Routers.use('/user', UserController.Authentication);
Routers.use('/schedule', AuthenticationMiddleware, ScheduleRoutes);
Routers.use('/patient', AuthenticationMiddleware, PatientRoutes);
Routers.use('/dev', DevRoutes);

export default Routers;
