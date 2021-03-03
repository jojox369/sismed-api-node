import { Request, Response } from 'express';
import { getRepository, Not, QueryFailedError } from 'typeorm';

import { USDateFormatter } from '../assets/functions';
import Employee from '../models/Employee';
import Patient from '../models/Patient';
import Schedule from '../models/Schedule';

interface PatientData {
	nome: string;
	idade: number;
	cpf: string;
	rg: string;
	data_nasc: string;
	sexo: string;
	signo: string;
	mae: string;
	pai: string;
	email: string;
	senha: string;
	cep: string;
	endereco: string;
	numero: number;
	bairro: string;
	cidade: string;
	estado: string;
	telefone_fixo: string;
	celular: string;
	altura: string;
	peso: number;
	tipo_sanguineo: string;
	cor: string;
}

class DevController {
	async registerPatient(request: Request, response: Response) {
		const patients: PatientData[] = request.body;
		const repository = getRepository(Patient);
		let hasError = false;

		const patientsFormatted = await Promise.all(
			patients.map(async (patient) => {
				const formattedData = {
					name: patient.nome,
					cpf: patient.cpf,
					rg: patient.rg,
					sex: patient.sexo.charAt(0),
					dateBirth: USDateFormatter(patient.data_nasc),
					phone: patient.telefone_fixo,
					cellPhone: patient.celular,
					healthInsuranceTypeId: 1,
					address: {
						cep: patient.cep,
						street: patient.endereco,
						number: patient.numero,
						district: patient.bairro,
						city: patient.cidade,
						state: patient.estado,
					},
				};
				const savePatient = repository.create(formattedData);
				try {
					await repository.save(savePatient);

					return savePatient;
				} catch (error) {
					hasError = true;
					if (error instanceof QueryFailedError) {
						return { error: error.message };
					}
				}
			})
		);
		if (hasError) {
			return response.status(500).json(patientsFormatted);
		} else {
			return response.json(patientsFormatted);
		}
	}
	async generateSchedule(request: Request, response: Response) {
		const { schedules } = request.body;

		const patientRepository = getRepository(Patient);
		const employeeRepository = getRepository(Employee);
		const scheduleRepository = getRepository(Schedule);
		const patients = await patientRepository.find();

		const medics = await employeeRepository.find({
			where: {
				profileId: Not(3),
			},
			relations: ['healthInsuranceTypes'],
		});

		const schedulesArr: Schedule[] = [];

		if (schedules) {
			for (let i = 0; i < +schedules; i++) {
				const randomPatient =
					patients[Math.floor(Math.random() * patients.length)].id;
				const randomMedic =
					medics[Math.floor(Math.random() * medics.length)].id;
				const time = generateTime();

				const schedulingData = {
					date: USDateFormatter(new Date().toLocaleDateString()),
					time,
					procedureId: 1,
					healthInsuranceTypeId: 1,
					patientId: randomPatient,
					employeeId: randomMedic,
				};
				const scheduling = scheduleRepository.create(schedulingData);

				await scheduleRepository.save(scheduling);

				schedulesArr.push(scheduling);
			}
		}

		return response.json(schedulesArr);
	}
}

const generateTime = () => {
	const random1 = Math.floor(Math.random() * (1 + 1));
	const random2 =
		random1 === 1
			? Math.floor(Math.random() * (9 + 1))
			: Math.floor(Math.random() * (9 - 7 + 1) + 7);
	const arr = [15, 30, 45];

	const time =
		random1 + '' + random2 + ':' + arr[Math.floor(Math.random() * arr.length)];
	return time;
};

export default new DevController();
