import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import HealthInsuranceType from '../models/HealthInsuranceType';
import HealthInsuranceTypeView from '../views/HealthInsuranceType';

const healthInsuranceTypeView = new HealthInsuranceTypeView();

class HealthInsuranceTypeController {
	async list(request: Request, response: Response) {
		const { healthInsuranceId } = request.params;
		const repository = getRepository(HealthInsuranceType);
		const insuranceTypes = await repository.find({
			where: { healthInsuranceId },
		});
		return response.json(healthInsuranceTypeView.list(insuranceTypes));
	}
}

export default HealthInsuranceTypeController;
