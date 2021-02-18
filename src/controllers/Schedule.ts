import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Schedule from '../models/Schedule';
import ScheduleView from '../views/Schedule';

export default {
	List: async (request: Request, response: Response) => {
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
	},
};
