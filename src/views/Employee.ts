import Employee from '../models/Employee';

class EmployeeView {
	authentication(employee: Employee, token: string) {
		return {
			id: employee.id,
			profile: employee.profileId,
			name: employee.name,
			token,
		};
	}

	details(employee: Employee) {
		return {
			id: employee.id,
			name: employee.name,
			cpf: employee.cpf,
			rg: employee.rg,
			emittingOrgan: employee.emittingOrgan,
			emittingDate: employee.emittingDate,
			crm: employee.crm,
			specialty: employee.specialty,
			phone: employee.phone,
			cellNumber: employee.cellNumber,
			sex: employee.sex,
			dateBirth: employee.dateBirth,
			email: employee.email,
			maritalStatus: employee.maritalStatus,
			schooling: employee.schooling,
			naturalness: employee.naturalness,
			beginDate: employee.beginDate,
			dismissalDate: employee.dismissalDate,
			nationality: employee.nationality,
			profile: {
				id: employee.profileId,
				type: employee.profile.type,
			},
			address: {
				id: employee.address.id,
				zipCode: employee.address.zipCode,
				street: employee.address.street,
				number: employee.address.number,
				complement: employee.address.complement,
				neighborhood: employee.address.neighborhood,
				city: employee.address.city,
				state: employee.address.state,
			},
		};
	}

	employees(employee: Employee[]) {
		return employee.map((func) => ({
			id: func.id,
			name: func.name,
			cpf: func.cpf,
			profile: func.profileId,
		}));
	}

	medics(medics: Employee[]) {
		return medics.map((medic) => ({ id: medic.id, name: medic.name }));
	}

	medic(medic: Employee) {
		return {
			id: medic.id,
			name: medic.name,
			crm: medic.crm,
			specialty: medic.specialty,
		};
	}

	healthInsurances(employee: Employee) {
		return employee.healthInsuranceTypes.map((healthInsuranceType) => {
			return {
				id: healthInsuranceType.id,
				name: healthInsuranceType.name,
				healthInsurance: {
					id: healthInsuranceType.healthInsurance.id,
					name: healthInsuranceType.healthInsurance.name,
				},
			};
		});
	}
}

export default EmployeeView;
