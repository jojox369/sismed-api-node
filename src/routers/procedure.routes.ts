import { Router } from 'express';

import ProcedureController from '../controllers/Procedure';

const Routes = Router();
const procedureController = new ProcedureController();

Routes.get('/', procedureController.list);

export default Routes;
