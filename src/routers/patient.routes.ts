import { Router } from 'express';

import PatientController from '../controllers/Patient';

const patientController = new PatientController();

const Routes = Router();

Routes.get('/', patientController.listAll);
Routes.get('/:id', patientController.getById);
Routes.get('/nextId', patientController.nextId);
Routes.post('/', patientController.save);
Routes.put('/', patientController.update);

export default Routes;
