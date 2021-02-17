import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Clinicalregister from './Clinicalregister';
import Employee from './Employee';
import HealthInsuranceType from './HealthInsuranceType';
import Patient from './Patient';
import Procedure from './Procedure';

@Index('fk_schedule_employee_idx', ['employeeId'], {})
@Index('fk_schedule_patient1_idx', ['patientId'], {})
@Index('fk_schedule_healthInsuranceType1_idx', ['healthInsuranceTypeId'], {})
@Index('fk_schedule_procedure1_idx', ['procedureId'], {})
@Entity('schedule', { schema: 'sismed' })
export default class Schedule {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('date', { name: 'date' })
	date: string;

	@Column('time', { name: 'time' })
	time: string;

	@Column('tinyint', {
		name: 'firstTime',
		nullable: true,
		width: 1,
		default: () => "'1'",
	})
	firstTime: boolean | null;

	@Column('tinyint', {
		name: 'attended',
		nullable: true,
		width: 1,
		default: () => "'1'",
	})
	attended: boolean | null;

	@Column('tinyint', {
		name: 'paid',
		nullable: true,
		width: 1,
		default: () => "'1'",
	})
	paid: boolean | null;

	@Column('tinyint', {
		name: 'rescheduled',
		nullable: true,
		width: 1,
		default: () => "'0'",
	})
	rescheduled: boolean | null;

	@Column('tinyint', {
		name: 'finished',
		nullable: true,
		width: 1,
		default: () => "'0'",
	})
	finished: boolean | null;

	@Column('varchar', { name: 'notes', nullable: true, length: 255 })
	notes: string | null;

	@Column('int', { name: 'employee_id' })
	employeeId: number;

	@Column('int', { name: 'patient_id' })
	patientId: number;

	@Column('int', { name: 'healthInsuranceType_id' })
	healthInsuranceTypeId: number;

	@Column('int', { name: 'procedure_id' })
	procedureId: number;

	@OneToMany(
		() => Clinicalregister,
		(clinicalregister) => clinicalregister.schedule
	)
	clinicalregisters: Clinicalregister[];

	@ManyToOne(() => Employee, (employee) => employee.schedules, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'employee_id', referencedColumnName: 'id' }])
	employee: Employee;

	@ManyToOne(
		() => HealthInsuranceType,
		(healthinsurancetype) => healthinsurancetype.schedules,
		{ onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
	)
	@JoinColumn([{ name: 'healthInsuranceType_id', referencedColumnName: 'id' }])
	healthInsuranceType: HealthInsuranceType;

	@ManyToOne(() => Patient, (patient) => patient.schedules, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'patient_id', referencedColumnName: 'id' }])
	patient: Patient;

	@ManyToOne(() => Procedure, (procedure) => procedure.schedules, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'procedure_id', referencedColumnName: 'id' }])
	procedure: Procedure;
}
