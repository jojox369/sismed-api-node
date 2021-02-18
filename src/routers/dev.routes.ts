import { Router } from 'express';

import DevController from '../controllers/Dev';
const Routers = Router();

Routers.post('/patient', DevController.registerPatient);
Routers.post('/schedule', DevController.generateSchedule);

export default Routers;
