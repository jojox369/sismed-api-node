import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { GenerateNewDate, GenerateNewTime } from '../assets/functions';
import ClinicalRecord from '../models/ClinicalRecord';
import ClinicalRecordView from '../views/ClinicalRecord';

const clinicalRecordView = new ClinicalRecordView();

class ClinicalRecordController {
	async list(request: Request, response: Response) {
		const { patientId, medicId, patientName, date, getAll } = request.query;
		const repository = getRepository(ClinicalRecord);
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
				return response.json(clinicalRecordView.previousRegisters(registers));
			}

			if (patientId) {
				if (getAll) {
					const registers = await repository.find({
						where: { patientId },
						relations: ['patient'],
						order: { date: 'DESC' },
					});
					return response.json(
						clinicalRecordView.listPatientRegisters(registers)
					);
				}
				const registers = await repository
					.createQueryBuilder('rc')
					.select([
						'rc.id as id',
						'p.id as patientId',
						'p.name as patientName',
						'rc.date as date',
						'rc.time as time',
						'COUNT(rc.id) AS amount',
					])
					.innerJoin('rc.patient', 'p')
					.where(`p.id = ${patientId} `)
					.groupBy('p.name')
					.getRawMany();
				return response.json(clinicalRecordView.listAll(registers));
			}

			if (patientName) {
				const registers = await repository
					.createQueryBuilder('rc')
					.select([
						'rc.id as id',
						'p.id as patientId',
						'p.name as patientName',
						'rc.date as date',
						'rc.time as time',
						'COUNT(rc.id) AS amount',
					])
					.innerJoin('rc.patient', 'p')
					.where(`p.name LIKE '%${patientName}%' `)
					.groupBy('p.name')
					.getRawMany();
				return response.json(clinicalRecordView.listAll(registers));
			}

			if (date) {
				const registers = await repository
					.createQueryBuilder('rc')
					.select([
						'rc.id as id',
						'p.id as patientId',
						'p.name as patientName',
						'rc.date as date',
						'rc.time as time',
						'COUNT(rc.id) AS amount',
					])
					.innerJoin('rc.patient', 'p')
					.where(`rc.date = '${date}' `)
					.groupBy('p.name')
					.getRawMany();
				return response.json(clinicalRecordView.listAll(registers));
			}

			const registers = await repository.query(
				'(SELECT p.name as patientName, p.id as patientId, r.id, r.date,  r.time,COUNT(*) AS amount ' +
					'FROM clinical_record r INNER JOIN patient p ON r.patient_id = p.id ' +
					'GROUP BY patient_id) ' +
					'UNION' +
					'(SELECT p.name as patientName, p.id as patientId, r.id, r.date, r.time, NULL AS amount ' +
					'FROM patient p LEFT JOIN clinical_record r ON p.id = r.patient_id ' +
					'WHERE r.patient_id IS NULL) ORDER BY date DESC, time DESC'
			);

			return response.json(clinicalRecordView.listAll(registers));
		} catch (error) {
			console.log(error);
			return response
				.status(500)
				.json({ message: 'Error when try list registers' });
		}
	}

	async getById(request: Request, response: Response) {
		const { id } = request.params;
		const repository = getRepository(ClinicalRecord);
		try {
			const clinicalRegister = await repository.findOne({
				where: { id },
				relations: ['patient'],
			});
			return response.json(
				clinicalRecordView.details(clinicalRegister as ClinicalRecord)
			);
		} catch {
			return response
				.status(500)
				.json({ message: 'Error when try get clinical record details' });
		}
	}

	async save(request: Request, response: Response) {
		const { employeeId, patientId, scheduleId, description } = request.body;
		const repository = getRepository(ClinicalRecord);
		const clinicalRecord = repository.create({
			employeeId,
			patientId,
			scheduleId,
			description: description.toUpperCase(),
			date: GenerateNewDate(),
			time: GenerateNewTime(),
		});
		try {
			await repository.save(clinicalRecord);
			return response.status(201).json(ClinicalRecord);
		} catch {
			return response
				.status(500)
				.json({ message: 'Error when try save clinical record' });
		}
	}

	async update(request: Request, response: Response) {
		const { id, description } = request.body;
		const repository = getRepository(ClinicalRecord);
		try {
			const register = await repository.findOne({ where: { id } });
			const updateRecord = repository.create({
				...register,
				description: description.toUpperCase(),
			});

			await repository.save(updateRecord);
			return response.json(updateRecord);
		} catch {
			return response
				.status(500)
				.json({ message: 'Error when try update clinical record' });
		}
	}

	async delete(request: Request, response: Response) {
		const { id } = request.params;
		const repository = getRepository(ClinicalRecord);
		try {
			await repository.delete(id);
			return response.json({
				message: 'Clinical record deleted successfully',
			});
		} catch {
			return response
				.status(500)
				.json({ message: 'Error when try delete clinical record' });
		}
	}
}

export default ClinicalRecordController;
