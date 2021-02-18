import {
	AgeCalculator,
	CompareDates,
	FormatHealthInsuranceName,
} from '../assets/functions';
import Schedule from '../models/Schedule';

export default {
	list(schedule: Schedule[]) {
		return schedule.map((scheduling) => {
			return {
				id: scheduling.id,
				date: scheduling.date,
				time: scheduling.time,
				medic: scheduling.employee.name,
				paid: scheduling.paid,
				firstTime: scheduling.firstTime,
				finished: scheduling.finished,
				rescheduled: scheduling.rescheduled,
				attended: scheduling.attended,
				patientId: scheduling.patientId,
				patientName: scheduling.patient.name,
				patientAge: AgeCalculator(scheduling.patient.dateBirth),
				patientCellPhone: scheduling.patient.cellPhone,
				healthInsurance: FormatHealthInsuranceName(
					scheduling.healthInsuranceType.name,
					scheduling.healthInsuranceType.healthInsurance.name
				),
				editable: CompareDates(scheduling.date),
				notes: scheduling.notes,
			};
		});
	},
};
