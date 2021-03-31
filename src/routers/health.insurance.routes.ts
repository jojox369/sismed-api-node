import { Router } from 'express';

import HealthInsuranceController from '../controllers/HealthInsurance';

const healthInsuranceController = new HealthInsuranceController();

const Routes = Router();

Routes.get('/', healthInsuranceController.list);

export default Routes;
