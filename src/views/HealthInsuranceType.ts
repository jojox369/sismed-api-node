import HealthInsuranceType from '../models/HealthInsuranceType';

class HealthInsuranceTypeView {
	list(insuranceTypes: HealthInsuranceType[]) {
		return insuranceTypes.map((healthInsuranceType) => ({
			id: healthInsuranceType.id,
			name: healthInsuranceType.name,
		}));
	}
}

export default HealthInsuranceTypeView;
