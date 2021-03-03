import { Router } from 'express';

import ScheduleController from '../controllers/Schedule';

const Routers = Router();

Routers.get('/', ScheduleController.list);
Routers.get('/:id', ScheduleController.getById);

export default Routers;
