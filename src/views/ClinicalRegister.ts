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
}

export default ClinicalRegisterView;
