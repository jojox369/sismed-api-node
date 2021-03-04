import { Router } from 'express';

import UserController from '../controllers/User';

const userController = new UserController();

const Routers = Router();

Routers.post('/auth', userController.authentication);

export default Routers;
