import { Request, Response } from 'express';
import { getConnectionOptions, getManager, getRepository, Like } from 'typeorm';

import Patient from '../models/Patient';
import PatientView from '../views/Patient';

const patientView = new PatientView();

class PatientController {
	async listAll(request: Request, response: Response) {
		const { id, name, cell, cpf } = request.query;

		const repository = getRepository(Patient);
		try {
			if (id) {
				const patients = await repository.find({ where: { id } });
				return response.json(patientView.search(patients));
			}

			if (name) {
				const patients = await repository.find({
					where: { name: Like(`%${name}%`) },
				});
				return response.json(patientView.search(patients));
			}

			if (cell) {
				const patients = await repository.find({ where: { cell } });
				return response.json(patientView.search(patients));
			}

			if (cpf) {
				const patients = await repository.find({ where: { cpf } });
				return response.json(patientView.search(patients));
			}

			const patients = await repository.find({ order: { name: 'ASC' } });
			return response.json(patientView.list(patients));
		} catch {
			return response
				.status(500)
				.json({ message: 'Error when try list patients' });
		}
	}

	async getById(request: Request, response: Response) {
		const { id } = request.params;
		const repository = getRepository(Patient);
		try {
			const patient = await repository.findOne({ where: { id } });
			return response.json(patientView.details(patient as Patient));
		} catch {
			return response
				.status(500)
				.json({ message: 'Error when try list patient details' });
		}
	}

	async nextId(request: Request, response: Response) {
		const connection = await getConnectionOptions();

		const database = connection.database;

		const entityManager = getManager();

		const nextId = await entityManager.query(
			`SELECT AUTO_INCREMENT AS nextId FROM information_schema.tables ` +
				`WHERE table_name = 'patient' AND table_schema = '${database}'`
		);
		return response.json(nextId[0]);
	}
}

export default PatientController;
