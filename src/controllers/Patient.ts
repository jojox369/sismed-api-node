import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Patient from '../models/Patient';

class PatientController {
	async listAll(request: Request, response: Response) {
		const repository = getRepository(Patient);
		try {
			const patients = repository.find();
			return response.json(patients);
		} catch {
			return response
				.status(500)
				.json({ message: 'Error when try list patients' });
		}
	}
}

export default PatientController;
