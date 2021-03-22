import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { GenerateNewDate, GenerateNewTime } from '../assets/functions';
import ClinicalRegister from '../models/ClinicalRegister';
import ClinicalRegisterView from '../views/ClinicalRegister';

const clinicalRegisterView = new ClinicalRegisterView();

class ClinicalRegisterController {
	async list(request: Request, response: Response) {
		const { patientId, medicId, patientName, date } = request.query;
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
				return response.json(clinicalRegisterView.previousRegisters(registers));
			}

			const registers = await repository.query(
				'(SELECT p.name as patientName, p.id as patientId, r.id, r.date,  r.time,COUNT(*) AS amount ' +
					'FROM clinical_register r INNER JOIN patient p ON r.patient_id = p.id ' +
					'GROUP BY patient_id) ' +
					'UNION' +
					'(SELECT p.name as patientName, p.id as patientId, r.id, r.date, r.time, NULL AS amount ' +
					'FROM patient p LEFT JOIN clinical_register r ON p.id = r.patient_id ' +
					'WHERE r.patient_id IS NULL) ORDER BY date DESC, time DESC'
			);

			return response.json(clinicalRegisterView.listAll(registers));
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
			date: GenerateNewDate(),
			time: GenerateNewTime(),
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
