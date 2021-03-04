import { Router } from 'express';

import PatientController from '../controllers/Patient';

const patientController = new PatientController();

const Routes = Router();

Routes.get('/', patientController.listAll);

export default Routes;
