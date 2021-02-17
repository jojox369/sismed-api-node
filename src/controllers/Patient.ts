import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Patient from '../models/Patient';

export default {
	listAll: async (request: Request, response: Response) => {
		const repository = getRepository(Patient);
		const patients = repository.find();
		return response.json(patients);
	},
};
