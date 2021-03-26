import { Router } from 'express';

import ClinicalRegisterController from '../controllers/ClinicalRegister';

const clinicalRegisterController = new ClinicalRegisterController();

const Routers = Router();

Routers.get('/', clinicalRegisterController.list);
Routers.get('/:id', clinicalRegisterController.getById);
Routers.post('/', clinicalRegisterController.save);
Routers.put('/', clinicalRegisterController.update);
Routers.delete('/:id', clinicalRegisterController.delete);

export default Routers;
