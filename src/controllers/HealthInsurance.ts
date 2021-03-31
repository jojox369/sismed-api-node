import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import HealthInsurance from '../models/HealthInsurance';
import HealthInsuranceView from '../views/HealthInsurance';

const healthInsuranceView = new HealthInsuranceView();

class HealthInsuranceController {
	async list(request: Request, response: Response) {
		const { search } = request.params;
		const repository = getRepository(HealthInsurance);
		const insurances = await repository.find();
		if (search) {
			return response.json(healthInsuranceView.search(insurances));
		}
		return response.json(healthInsuranceView.list(insurances));
	}
}

export default HealthInsuranceController;
