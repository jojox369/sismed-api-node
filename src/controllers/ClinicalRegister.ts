import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ClinicalRegister from '../models/ClinicalRegister';

class ClinicalRegisterController {
	async save(request: Request, response: Response) {
		const { employeeId, patientId, scheduleId, description } = request.body;
		const repository = getRepository(ClinicalRegister);
		const clinicalRegister = repository.create({
			employeeId,
			patientId,
			scheduleId,
			description,
		});
		try {
			await repository.save(clinicalRegister);
			return response.status(201).json(clinicalRegister);
		} catch {
			return response
				.status(500)
				.json({ message: 'Erro ao tentar salvar o registro clínico' });
		}
	}
}

export default new ClinicalRegisterController();
