import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Employee from './Employee';
import Patient from './Patient';
import Schedule from './Schedule';

@Index('fk_clinicalRegister_employee1_idx', ['employeeId'], {})
@Index('fk_clinicalRegister_patient1_idx', ['patientId'], {})
@Index('fk_clinicalRegister_schedule1_idx', ['scheduleId'], {})
@Entity('clinicalregister', { schema: 'sismed' })
export default class Clinicalregister {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('date', { name: 'date' })
	date: string;

	@Column('time', { name: 'time' })
	time: string;

	@Column('longtext', { name: 'description' })
	description: string;

	@Column('int', { name: 'employee_id' })
	employeeId: number;

	@Column('int', { name: 'patient_id' })
	patientId: number;

	@Column('int', { name: 'schedule_id', nullable: true })
	scheduleId: number | null;

	@ManyToOne(() => Employee, (employee) => employee.clinicalregisters, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'employee_id', referencedColumnName: 'id' }])
	employee: Employee;

	@ManyToOne(() => Patient, (patient) => patient.clinicalregisters, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'patient_id', referencedColumnName: 'id' }])
	patient: Patient;

	@ManyToOne(() => Schedule, (schedule) => schedule.clinicalregisters, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'schedule_id', referencedColumnName: 'id' }])
	schedule: Schedule;
}
