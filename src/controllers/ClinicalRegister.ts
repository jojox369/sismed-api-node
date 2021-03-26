import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { GenerateNewDate, GenerateNewTime } from '../assets/functions';
import ClinicalRegister from '../models/ClinicalRegister';
import ClinicalRegisterView from '../views/ClinicalRegister';

const clinicalRegisterView = new ClinicalRegisterView();

class ClinicalRegisterController {
	async list(request: Request, response: Response) {
		const { patientId, medicId, patientName, date, getAll } = request.query;
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

			if (patientId) {
				if (getAll) {
					const registers = await repository.find({
						where: { patientId },
						relations: ['patient'],
						order: { date: 'DESC' },
					});
					return response.json(registers);
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
				return response.json(clinicalRegisterView.listAll(registers));
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
				return response.json(clinicalRegisterView.listAll(registers));
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
				return response.json(clinicalRegisterView.listAll(registers));
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
		} catch (error) {
			console.log(error);
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
