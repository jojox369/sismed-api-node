import { Router } from 'express';

import ClinicalRecordController from '../controllers/ClinicalRecord';

const clinicalRecordController = new ClinicalRecordController();

const Routers = Router();

Routers.get('/', clinicalRecordController.list);
Routers.get('/:id', clinicalRecordController.getById);
Routers.post('/', clinicalRecordController.save);
Routers.put('/', clinicalRecordController.update);
Routers.delete('/:id', clinicalRecordController.delete);

export default Routers;
