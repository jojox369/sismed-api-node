import {
	AgeCalculator,
	CompareDates,
	FormatHealthInsuranceName,
} from '../assets/functions';
import Schedule from '../models/Schedule';

class ScheduleView {
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
				patient: {
					id: scheduling.patientId,
					name: scheduling.patient.name,
					age: AgeCalculator(scheduling.patient.dateBirth),
					cellPhone: scheduling.patient.cellPhone,
				},
				healthInsurance: FormatHealthInsuranceName(
					scheduling.healthInsuranceType.name,
					scheduling.healthInsuranceType.healthInsurance.name
				),
				editable: CompareDates(scheduling.date),
				notes: scheduling.notes,
			};
		});
	}
	attendance(scheduling: Schedule) {
		return {
			id: scheduling.id,
			firstTime: scheduling.firstTime,
			employeeId: scheduling.employeeId,
			notes: scheduling.notes,
			patient: {
				id: scheduling.patientId,
				name: scheduling.patient.name,
				age: AgeCalculator(scheduling.patient.dateBirth),
				cellPhone: scheduling.patient.cellPhone,
			},
		};
	}
}

export default ScheduleView;
