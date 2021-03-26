import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Address from '../models/Address';
import Schedule from '../models/Schedule';
import ScheduleView from '../views/Schedule';

const scheduleView = new ScheduleView();

class ScheduleController {
	async list(request: Request, response: Response) {
		const { medicId, date } = request.query;
		const repository = getRepository(Schedule);
		try {
			if (date) {
				const schedules = await repository.find({
					where: { employeeId: medicId, date },
					relations: [
						'patient',
						'employee',
						'healthInsuranceType',
						'healthInsuranceType.healthInsurance',
					],
				});
				return response.json(schedules);
			}
			const schedules = await repository.find({
				where: { employeeId: medicId },
				relations: [
					'patient',
					'employee',
					'healthInsuranceType',
					'healthInsuranceType.healthInsurance',
				],
			});

			return response.json(scheduleView.list(schedules));
		} catch {
			return response
				.status(500)
				.json({ message: 'Error when try list schedule' });
		}
	}

	async getById(request: Request, response: Response) {
		const { id } = request.params;
		const repository = getRepository(Schedule);
		try {
			const scheduling = await repository.findOne({
				where: { id },
				relations: [
					'employee',
					'patient',
					'healthInsuranceType',
					'healthInsuranceType.healthInsurance',
					'procedure',
				],
			});
			return response.json(scheduleView.details(scheduling as Schedule));
		} catch {
			return response
				.status(500)
				.json({ message: 'Error when try list scheduling data' });
		}
	}

	async update(request: Request, response: Response) {
		const {
			id,
			date,
			time,
			attended,
			paid,
			rescheduled,
			finished,
			notes,
			employeeId,
			patientId,
			healthInsuranceTypeId,
			procedureId,
		} = request.body;
		const repository = getRepository(Schedule);
		const scheduling = await repository.findOne({ id });
		const hasScheduling = await repository.findOne({
			id,
			date,
			time,
			employeeId,
		});
		if (hasScheduling) {
			if (hasScheduling.id !== id) {
				return response.status(409).json({
					message: 'Doctor already have scheduling for this date and time',
				});
			}
		}
		const data = {
			id,
			date: date || scheduling?.date,
			time: time || scheduling?.time,
			attended: attended || scheduling?.attended,
			paid: paid || scheduling?.paid,
			rescheduled: rescheduled || scheduling?.rescheduled,
			finished: finished || scheduling?.finished,
			notes: notes.toUpperCase() || scheduling?.notes,
			employeeId: employeeId || scheduling?.employeeId,
			patientId: patientId || scheduling?.patientId,
			healthInsuranceTypeId:
				healthInsuranceTypeId || scheduling?.healthInsuranceTypeId,
			procedureId: procedureId || scheduling?.procedureId,
		};
		try {
			const updatedScheduling = repository.create(data);
			await repository.save(updatedScheduling);
			const scheduling = await repository.findOne({
				where: { id: updatedScheduling.id },
				relations: [
					'employee',
					'patient',
					'healthInsuranceType',
					'healthInsuranceType.healthInsurance',
					'procedure',
				],
			});
			return response.json(scheduleView.details(scheduling as Schedule));
		} catch {
			return response
				.status(500)
				.json({ message: 'Error when trying to update scheduling' });
		}
	}

	async reschedule(request: Request, response: Response) {
		const {
			id,
			notes,
			date,
			time,
			employeeId,
			healthInsuranceTypeId,
			procedureId,
			patientId,
		} = request.body;
		const repository = getRepository(Schedule);
		const hasScheduling = await repository.find({
			id,
			date,
			time,
			employeeId,
		});
		if (hasScheduling.length > 0) {
			return response.status(409).json({
				message: 'Doctor already have scheduling for this date and time',
			});
		}
		const schedulingData = await repository.findOne({ id });
		const updatedScheduling = repository.create({
			...schedulingData,
			finished: true,
			rescheduled: true,
			attended: false,
			notes: notes.toUpperCase(),
		});

		const newScheduling = repository.create({
			date,
			time,
			healthInsuranceTypeId,
			procedureId,
			patientId,
			employeeId,
		});

		await repository.save(updatedScheduling);
		await repository.save(newScheduling);

		return response.json(scheduleView.details(updatedScheduling as Schedule));
	}

	async delete(request: Request, response: Response) {
		const { id } = request.params;
		const repository = getRepository(Schedule);
		try {
			await repository.delete(id);
			return response.json({ message: 'Scheduling successful deleted' });
		} catch (error) {
			return response
				.status(500)
				.json({ message: 'Error when try delete scheduling' });
		}
	}

	async save(request: Request, response: Response) {
		const {
			date,
			time,
			employeeId,
			patient,
			healthInsuranceTypeId,
			procedureId,
		} = request.body;

		const repository = getRepository(Schedule);

		const hasScheduling = await repository.find({ date, time, employeeId });

		if (hasScheduling.length > 0) {
			return response.status(409).json({
				message: 'Doctor already has an appointment on this date and time',
			});
		}
		if (!patient.address) {
			patient.address = new Address();
		}

		const scheduling = repository.create({
			date,
			time,
			employeeId,
			patient,
			healthInsuranceTypeId,
			procedureId,
		});

		await repository.save(scheduling);

		return response.status(201).json(scheduling);
	}
}

export default ScheduleController;
