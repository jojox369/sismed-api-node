import { Router } from 'express';

import AuthenticationMiddleware from '../middleware/Authentication';
import ClinicalRegisterRoutes from './clinical.register.routes';
import DevRoutes from './dev.routes';
import PatientRoutes from './patient.routes';
import ScheduleRoutes from './schedule.routes';
import UserRoutes from './user.routes';

const Routers = Router();

Routers.use('/user', UserRoutes);
Routers.use('/schedule', AuthenticationMiddleware, ScheduleRoutes);
Routers.use('/patient', AuthenticationMiddleware, PatientRoutes);
Routers.use(
	'/clinicalRegister',
	AuthenticationMiddleware,
	ClinicalRegisterRoutes
);
Routers.use('/dev', DevRoutes);

export default Routers;
