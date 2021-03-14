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
	details(scheduling: Schedule) {
		return {
			id: scheduling.id,
			date: scheduling.date,
			time: scheduling.time,
			paid: scheduling.paid,
			attended: scheduling.attended,
			notes: scheduling.notes,
			healthInsuranceType: {
				id: scheduling.healthInsuranceType.id,
				name: scheduling.healthInsuranceType.name,
				healthInsurance: {
					id: scheduling.healthInsuranceType.healthInsurance.id,
					name: scheduling.healthInsuranceType.healthInsurance.name,
				},
			},
			procedure: {
				id: scheduling.procedure.id,
				name: scheduling.procedure.name,
			},
			employee: {
				id: scheduling.employee.id,
				name: scheduling.employee.name,
				crm: scheduling.employee.crm,
				specialty: scheduling.employee.specialty,
			},
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
