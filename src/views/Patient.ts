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
			id: patient.id,
			name: patient.name,
			cellNumber: patient.cellNumber,
			cpf: patient.cpf,
			dateBirth: patient.dateBirth,
			email: patient.email,
			emittingDate: patient.emittingDate,
			emittingOrgan: patient.emittingOrgan,
			healthInsuranceNumber: patient.healthInsuranceNumber,
			jobPhone: patient.jobPhone,
			maritalStatus: patient.maritalStatus,
			nationality: patient.nationality,
			naturalness: patient.naturalness,
			phone: patient.phone,
			profession: patient.profession,
			recommendation: patient.recommendation,
			rg: patient.rg,
			schooling: patient.schooling,
			sex: patient.sex,
			situation: patient.situation,
			validity: patient.validity,
			address: {
				id: patient.address.id,
				zipCode: patient.address.zipCode,
				street: patient.address.street,
				number: patient.address.number,
				complement: patient.address.complement,
				neighborhood: patient.address.neighborhood,
				city: patient.address.city,
				state: patient.address.state,
			},
			healthInsuranceType: {
				id: patient.healthInsuranceType.id,
				name: patient.healthInsuranceType.name,
				healthInsurance: {
					id: patient.healthInsuranceType.healthInsurance.id,
					name: patient.healthInsuranceType.healthInsurance.name,
				},
			},
			age: AgeCalculator(patient.dateBirth),
		};
	}
}

export default PatientView;
