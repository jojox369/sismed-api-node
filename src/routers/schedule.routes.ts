import { Router } from 'express';

import ScheduleController from '../controllers/Schedule';

const scheduleController = new ScheduleController();

const Routers = Router();

Routers.get('/', scheduleController.list);
Routers.get('/:id', scheduleController.getById);
Routers.put('/', scheduleController.update);
Routers.put('/reschedule', scheduleController.reschedule);
Routers.delete('/:id', scheduleController.delete);
Routers.post('/', scheduleController.save);

export default Routers;
