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
				const patients = await repository.find({
					where: { cpf: Like(`%${cpf}%`) },
				});
				return response.json(patientView.search(patients));
			}

			const patients = await repository.find({ order: { name: 'ASC' } });
			return response.json(patientView.search(patients));
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

	async save(request: Request, response: Response) {
		const {
			name,
			cellNumber,
			cpf,
			dateBirth,
			email,
			emittingDate,
			emittingOrgan,
			healthInsuranceNumber,
			jobPhone,
			maritalStatus,
			nationality,
			naturalness,
			phone,
			profession,
			recommendation,
			rg,
			schooling,
			sex,
			situation,
			validity,
			address,
			healthInsuranceTypeId,
		} = request.body;
		const repository = getRepository(Patient);

		const data = {
			name: name.toUpperCase(),
			cellNumber: cellNumber.replace(/\D/g, ''),
			cpf: cpf ? cpf.replace(/\D/g, '') : null,
			dateBirth: dateBirth ? dateBirth : null,
			email: email ? email.toUpperCase() : null,
			emittingDate: emittingDate ? emittingDate : null,
			emittingOrgan: emittingOrgan ? emittingOrgan.toUpperCase() : null,
			healthInsuranceNumber: healthInsuranceNumber
				? healthInsuranceNumber
				: null,
			jobPhone: jobPhone ? jobPhone.replace(/\D/g, '') : null,
			maritalStatus: maritalStatus ? maritalStatus.toUpperCase() : null,
			nationality: nationality ? nationality.toUpperCase() : null,
			naturalness: naturalness ? naturalness.toUpperCase() : null,
			phone: phone ? phone.replace(/\D/g, '') : null,
			profession: profession ? profession.toUpperCase() : null,
			recommendation: recommendation ? recommendation.toUpperCase() : null,
			rg: rg ? rg.replace(/\D/g, '') : null,
			schooling: schooling ? schooling.toUpperCase() : null,
			sex: sex ? sex.toUpperCase() : null,
			situation: situation ? situation.toUpperCase() : null,
			validity: validity ? validity : null,
			address: {
				zipCode: address.zipCode.replace(/\D/g, ''),
				street: address.street.toUpperCase(),
				number: +address.number,
				complement: address.complement.toUpperCase(),
				neighborhood: address.neighborhood.toUpperCase(),
				city: address.city.toUpperCase(),
				state: address.state.toUpperCase(),
			},
			healthInsuranceTypeId,
		};
		const patient = repository.create(data);
		await repository.save(patient);
		return response.status(201).json(patient);
	}
}

export default PatientController;
