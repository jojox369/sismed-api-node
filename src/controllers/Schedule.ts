import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Schedule from '../models/Schedule';
import ScheduleView from '../views/Schedule';

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

			return response.json(ScheduleView.list(schedules));
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
			],
		});
		return response.json(ScheduleView.attendance(scheduling as Schedule));
	}
}

export default new ScheduleController();
