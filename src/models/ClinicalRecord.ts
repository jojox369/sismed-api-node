import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Employee from './Employee';
import Patient from './Patient';
import Schedule from './Schedule';

@Entity('clinical_record')
export default class ClinicalRecord {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('date', { name: 'date', default: () => "'now()'" })
	date: string;

	@Column('time', { name: 'time', default: () => "'now()'" })
	time: string;

	@Column('longtext', { name: 'description' })
	description: string;

	@Column('int', { name: 'employee_id' })
	employeeId: number;

	@Column('int', { name: 'patient_id' })
	patientId: number;

	@Column('int', { name: 'schedule_id', nullable: true })
	scheduleId: number | null;

	@ManyToOne(() => Employee, (employee) => employee.clinicalRecords, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'employee_id', referencedColumnName: 'id' }])
	employee: Employee;

	@ManyToOne(() => Patient, (patient) => patient.clinicalRecords, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'patient_id', referencedColumnName: 'id' }])
	patient: Patient;

	@ManyToOne(() => Schedule, (schedule) => schedule.clinicalRecords, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'schedule_id', referencedColumnName: 'id' }])
	schedule: Schedule;
}
