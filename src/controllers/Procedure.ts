import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Procedure from '../models/Procedure';

class ProcedureController {
	async list(request: Request, response: Response) {
		const { healthInsuranceId } = request.query;
		const repository = getRepository(Procedure);
		try {
			if (healthInsuranceId) {
				const procedures = await repository.find({
					where: { healthInsuranceId },
				});
				return response.json(procedures);
			}
			const procedures = await repository.find();
			return response.json(procedures);
		} catch {
			return response
				.status(500)
				.json({ message: 'Error when try list procedures' });
		}
	}
}

export default ProcedureController;
