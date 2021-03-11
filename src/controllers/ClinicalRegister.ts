import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ClinicalRegister from '../models/ClinicalRegister';
import ClinicalRegisterView from '../views/ClinicalRegister';

const clinicalRegister = new ClinicalRegisterView();

class ClinicalRegisterController {
	async list(request: Request, response: Response) {
		const { patientId, medicId } = request.query;
		const repository = getRepository(ClinicalRegister);
		try {
			if (patientId && medicId) {
				const registers = await repository.find({
					where: {
						patientId,
						employeeId: medicId,
					},
					order: {
						date: 'DESC',
						time: 'DESC',
					},
				});
				return response.json(clinicalRegister.previousRegisters(registers));
			}
			const registers = await repository.find();
			return response.json(registers);
		} catch {
			return response
				.status(500)
				.json({ message: 'Error when try list registers' });
		}
	}

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
				.json({ message: 'Error when try save register' });
		}
	}
}

export default new ClinicalRegisterController();
