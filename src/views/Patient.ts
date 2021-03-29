import { AgeCalculator } from '../assets/functions';
import Patient from '../models/Patient';

class PatientView {
	search(patients: Patient[]) {
		return patients.map((patient) => {
			return {
				id: patient.id,
				name: patient.name,
				cpf: patient.cpf,
				age: AgeCalculator(patient.dateBirth),
			};
		});
	}

	details(patient: Patient) {
		return {
			...patient,
			age: AgeCalculator(patient.dateBirth),
		};
	}

	list(patients: Patient[]) {
		return patients.map((patient) => ({
			id: patient.id,
			name: patient.name,
			age: AgeCalculator(patient.dateBirth),
			cellNumber: patient.cellNumber,
		}));
	}
}

export default PatientView;
