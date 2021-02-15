import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'

import Employee from '../models/Employee'
import EmployeeView from '../views/EmployeeView'

export default {
	Authentication: async (request: Request, response: Response) => {
		const { username, password } = request.body
		const repository = getRepository(Employee)
		const employee = await repository.findOne({ cpf: username })
		const secretKey = process.env.SECRET_KEY
		if (employee) {
			if (employee.dismissalDate) {
				return response
					.status(403)
					.json({ message: 'CPF não possui acesso ao sistema' })
			} else {
				const isValidPassword = await bcrypt.compare(
					password,
					employee.password
				)

				if (!isValidPassword) {
					return response.status(401).json({ message: 'Senha inválida' })
				}

				const token = jwt.sign({ id: employee.id }, secretKey || 'secretKey', {
					expiresIn: '1d',
				})

				return response.json(EmployeeView.Authentication(employee, token))
			}
		} else {
			return response.status(500).json({ message: 'CPF não encontrado' })
		}
	},
}
