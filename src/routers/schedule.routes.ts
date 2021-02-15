import { Router } from 'express'

import ScheduleController from '../controllers/Schedule'

const Routers = Router()

Routers.get('/', ScheduleController.List)

export default Routers
