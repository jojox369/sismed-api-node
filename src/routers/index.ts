import { Router } from 'express'

import UserController from '../controllers/User'
import AuthenticationMiddleware from '../middleware/Authentication'
import ScheduleRoutes from './schedule.routes'

const Routers = Router()

Routers.use('/user', UserController.Authentication)
Routers.use('/schedule', AuthenticationMiddleware, ScheduleRoutes)

export default Routers
