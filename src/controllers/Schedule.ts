import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Schedule from '../models/Schedule';
import ScheduleView from '../views/Schedule';

const scheduleView = new ScheduleView();

class ScheduleController {
	async list(request: Request, response: Response) {
		const { medicId, date } = request.query;
		const repository = getRepository(Schedule);

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
		} else {
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
		}
	}
	async getById(request: Request, response: Response) {
		const { id } = request.params;
		const repository = getRepository(Schedule);
		const scheduling = await repository.findOne({
			where: { id },
			relations: [
				'patient',
				'patient.healthInsuranceType',
				'patient.healthInsuranceType.healthInsurance',
				'employee',
			],
		});
		return response.json(scheduleView.details(scheduling as Schedule));
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
		const data = {
			id,
			date: date || scheduling?.date,
			time: time || scheduling?.time,
			attended: attended || scheduling?.attended,
			paid: paid || scheduling?.paid,
			rescheduled: rescheduled || scheduling?.rescheduled,
			finished: finished || scheduling?.finished,
			notes: notes || scheduling?.notes,
			employeeId: employeeId || scheduling?.employeeId,
			patientId: patientId || scheduling?.patientId,
			healthInsuranceTypeId:
				healthInsuranceTypeId || scheduling?.healthInsuranceTypeId,
			procedureId: procedureId || scheduling?.procedureId,
		};
		const updatedScheduling = repository.create(data);
		try {
			await repository.save(updatedScheduling);
			return response.json({ message: 'Scheduling updated sucesseed ' });
		} catch {
			return response
				.status(500)
				.json({ message: 'Error when trying to update scheduling' });
		}
	}
}

export default ScheduleController;
