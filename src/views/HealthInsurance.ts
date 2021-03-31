import HealthInsurance from '../models/HealthInsurance';

class HealthInsuranceView {
	search(insurances: HealthInsurance[]) {
		return insurances.map((healthInsurance) => ({
			id: healthInsurance.id,
			name: healthInsurance.name,
		}));
	}
	list(insurances: HealthInsurance[]) {
		return insurances.map((healthInsurance) => ({
			id: healthInsurance.id,
			name: healthInsurance.name,
		}));
	}
}

export default HealthInsuranceView;
