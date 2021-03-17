import { Router } from 'express';

import EmployeeController from '../controllers/Employee';

const employeeController = new EmployeeController();

const Routes = Router();

Routes.get('/', employeeController.listAll);
Routes.get(
	'/healthInsuranceAccepted/:id',
	employeeController.healthInsuranceAccepted
);
Routes.get(
	'/healthInsuranceNotAccepted/:id',
	employeeController.healthInsuranceNotAccepted
);

Routes.get('/:id', employeeController.getById);

export default Routes;