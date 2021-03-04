import { Router } from 'express';

import DevController from '../controllers/Dev';

const devController = new DevController();

const Routers = Router();

Routers.post('/patient', devController.registerPatient);
Routers.post('/schedule', devController.generateSchedule);

export default Routers;
