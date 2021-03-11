import Employee from '../models/Employee';

class EmployeeView {
	authentication(employee: Employee, token: string) {
		return {
			id: employee.id,
			perfil: employee.profileId,
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
			cellPhone: employee.cellPhone,
			sex: employee.sex,
			dateBirth: employee.dateBirth,
			email: employee.email,
			maritalStatus: employee.maritalStatus,
			schooling: employee.schooling,
			naturalness: employee.naturalness,
			beginDate: employee.beginDate,
			dismissalDate: employee.dismissalDate,
			nationality: employee.nationality,
			profileId: employee.profileId,
			address: {
				id: employee.address.id,
				zipCode: employee.address.zipCode,
				street: employee.address.street,
				number: employee.address.number,
				complement: employee.address.complement,
				district: employee.address.district,
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

			crm: func.crm,
			specialty: func.specialty,
			phone: func.phone,
			cellPhone: func.cellPhone,

			email: func.email,
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
