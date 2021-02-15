import { Router } from 'express'

import UserController from '../controllers/User'

const Routers = Router()

Routers.post('/auth', UserController.Authentication)

export default Routers
