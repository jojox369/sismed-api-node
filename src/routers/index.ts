import { Router } from 'express';

import AuthenticationMiddleware from '../middleware/Authentication';
import ClinicalRegisterRoutes from './clinical.record.routes';
import DevRoutes from './dev.routes';
import EmployeeRoutes from './employee.routes';
import HealthInsuranceRoutes from './health.insurance.routes';
import HealthInsuranceTypeRoutes from './health.insurance.type.routes';
import PatientRoutes from './patient.routes';
import ProcedureRoutes from './procedure.routes';
import ScheduleRoutes from './schedule.routes';
import UserRoutes from './user.routes';

const Routers = Router();

Routers.use('/user', UserRoutes);
Routers.use('/schedule', AuthenticationMiddleware, ScheduleRoutes);
Routers.use('/patient', AuthenticationMiddleware, PatientRoutes);
Routers.use('/employee', AuthenticationMiddleware, EmployeeRoutes);
Routers.use('/procedure', AuthenticationMiddleware, ProcedureRoutes);
Routers.use(
	'/healthInsurance',
	AuthenticationMiddleware,
	HealthInsuranceRoutes
);
Routers.use(
	'/healthInsuranceType',
	AuthenticationMiddleware,
	HealthInsuranceTypeRoutes
);
Routers.use(
	'/clinicalRegister',
	AuthenticationMiddleware,
	ClinicalRegisterRoutes
);
Routers.use('/dev', DevRoutes);

export default Routers;
