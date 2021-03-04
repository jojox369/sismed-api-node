import { Router } from 'express';

import ClinicalRegisterController from '../controllers/ClinicalRegister';

const Routers = Router();

Routers.get('/', ClinicalRegisterController.list);
Routers.post('/', ClinicalRegisterController.save);

export default Routers;
