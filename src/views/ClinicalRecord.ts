import { AgeCalculator, CompareDates } from '../assets/functions';
import ClinicalRecord from '../models/ClinicalRecord';

interface ClinicalRecordList {
	id: number;
	date: string;
	time: string;
	amount: string;
	patientId: number;
	patientName: string;
}

class ClinicalRecordView {
	previousRegisters(clinicalRecords: ClinicalRecord[]) {
		return clinicalRecords.map((clinicalRecord) => ({
			id: clinicalRecord.id,
			date: clinicalRecord.date,
			time: clinicalRecord.time,
			description: clinicalRecord.description,
		}));
	}

	listAll(clinicalRecords: ClinicalRecordList[]) {
		return clinicalRecords.map((clinicalRecord) => ({
			id: clinicalRecord.id,
			date: clinicalRecord.date,
			time: clinicalRecord.time,
			amount: clinicalRecord.amount,
			patient: {
				id: clinicalRecord.patientId,
				name: clinicalRecord.patientName,
			},
		}));
	}

	listPatientRegisters(clinicalRecords: ClinicalRecord[]) {
		return clinicalRecords.map((clinicalRecord) => ({
			id: clinicalRecord.id,
			date: clinicalRecord.date,
			time: clinicalRecord.time,
			description: clinicalRecord.description,
			patient: {
				id: clinicalRecord.patient.id,
				name: clinicalRecord.patient.name,
			},
		}));
	}

	details(clinicalRecord: ClinicalRecord) {
		return {
			id: clinicalRecord.id,
			date: clinicalRecord.date,
			time: clinicalRecord.time,
			description: clinicalRecord.description,
			editable: CompareDates(clinicalRecord.date),
			patient: {
				id: clinicalRecord.patientId,
				name: clinicalRecord.patient.name,
				age: AgeCalculator(clinicalRecord.patient.dateBirth),
				cpf: clinicalRecord.patient.cpf
					? clinicalRecord.patient.cpf
					: 'Não Cadastrado',
			},
		};
	}
}

export default ClinicalRecordView;
