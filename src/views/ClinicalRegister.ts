import ClinicalRegister from '../models/ClinicalRegister';

class ClinicalRegisterView {
	previousRegisters(clinicalRegisters: ClinicalRegister[]) {
		return clinicalRegisters.map((clinicalRegister) => ({
			id: clinicalRegister.id,
			date: clinicalRegister.date,
			time: clinicalRegister.time,
			description: clinicalRegister.description,
		}));
	}
}

export default ClinicalRegisterView;
