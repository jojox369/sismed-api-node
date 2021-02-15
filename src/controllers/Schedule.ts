import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Schedule from '../models/Schedule'

export default {
	List: async (request: Request, response: Response) => {
		const { id, date } = request.query

		const repository = getRepository(Schedule)

		if (date) {
			const schedules = await repository.find({
				where: { employeeId: id, date },
			})
			return response.json(schedules)
		} else {
			const schedules = await repository.find({
				where: { employeeId: id },
			})
			return response.json(schedules)
		}
	},
}
