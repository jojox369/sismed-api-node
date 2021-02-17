import { Router } from 'express';

import PatientController from '../controllers/Patient';

const Routes = Router();

Routes.get('/', PatientController.listAll);

export default Routes;
