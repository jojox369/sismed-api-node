import { Router } from 'express';

import HealthInsuranceTypeController from '../controllers/HealthInsuranceType';

const healthInsuranceTypeController = new HealthInsuranceTypeController();

const Routes = Router();

Routes.get('/', healthInsuranceTypeController.list);

export default Routes;
