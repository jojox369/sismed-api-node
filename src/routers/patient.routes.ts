import { Router } from 'express';

import PatientController from '../controllers/Patient';

const patientController = new PatientController();

const Routes = Router();

Routes.get('/', patientController.listAll);
Routes.get('/:id', patientController.getById);
Routes.get('/nextId', patientController.nextId);

export default Routes;
