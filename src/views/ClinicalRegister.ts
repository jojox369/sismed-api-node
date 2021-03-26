import { AgeCalculator, CompareDates } from '../assets/functions';
import ClinicalRegister from '../models/ClinicalRegister';

interface ClinicalRegisterList {
	id: number;
	date: string;
	time: string;
	amount: string;
	patientId: number;
	patientName: string;
}

class ClinicalRegisterView {
	previousRegisters(clinicalRegisters: ClinicalRegister[]) {
		return clinicalRegisters.map((clinicalRegister) => ({
			id: clinicalRegister.id,
			date: clinicalRegister.date,
			time: clinicalRegister.time,
			description: clinicalRegister.description,
		}));
	}

	listAll(clinicalRegisters: ClinicalRegisterList[]) {
		return clinicalRegisters.map((clinicalRegister) => ({
			id: clinicalRegister.id,
			date: clinicalRegister.date,
			time: clinicalRegister.time,
			amount: clinicalRegister.amount,
			patient: {
				id: clinicalRegister.patientId,
				name: clinicalRegister.patientName,
			},
		}));
	}

	listPatientRegisters(clinicalRegisters: ClinicalRegister[]) {
		return clinicalRegisters.map((clinicalRegister) => ({
			id: clinicalRegister.id,
			date: clinicalRegister.date,
			time: clinicalRegister.time,
			description: clinicalRegister.description,
			patient: {
				id: clinicalRegister.patient.id,
				name: clinicalRegister.patient.name,
			},
		}));
	}

	details(clinicalRegister: ClinicalRegister) {
		return {
			id: clinicalRegister.id,
			date: clinicalRegister.date,
			time: clinicalRegister.time,
			description: clinicalRegister.description,
			editable: CompareDates(clinicalRegister.date),
			patient: {
				id: clinicalRegister.patientId,
				name: clinicalRegister.patient.name,
				age: AgeCalculator(clinicalRegister.patient.dateBirth),
				cpf: clinicalRegister.patient.cpf
					? clinicalRegister.patient.cpf
					: 'Não Cadastrado',
			},
		};
	}
}

export default ClinicalRegisterView;
