import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import ClinicalRecord from './ClinicalRecord';
import Employee from './Employee';
import HealthInsuranceType from './HealthInsuranceType';
import Patient from './Patient';
import Procedure from './Procedure';

@Entity('schedule')
export default class Schedule {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('date', { name: 'date' })
	date: string;

	@Column('time', { name: 'time' })
	time: string;

	@Column('tinyint', {
		name: 'first_time',
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

	@Column('int', { name: 'health_insurance_type_id' })
	healthInsuranceTypeId: number;

	@Column('int', { name: 'procedure_id' })
	procedureId: number;

	@OneToMany(() => ClinicalRecord, (clinicalRecord) => clinicalRecord.schedule)
	clinicalRecords: ClinicalRecord[];

	@ManyToOne(() => Employee, (employee) => employee.schedules, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'employee_id', referencedColumnName: 'id' }])
	employee: Employee;

	@ManyToOne(
		() => HealthInsuranceType,
		(healthInsuranceType) => healthInsuranceType.schedules,
		{ onDelete: 'NO ACTION', onUpdate: 'CASCADE' }
	)
	@JoinColumn([
		{ name: 'health_insurance_type_id', referencedColumnName: 'id' },
	])
	healthInsuranceType: HealthInsuranceType;

	@ManyToOne(() => Patient, (patient) => patient.schedules, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
		cascade: true,
	})
	@JoinColumn([{ name: 'patient_id', referencedColumnName: 'id' }])
	patient: Patient;

	@ManyToOne(() => Procedure, (procedure) => procedure.schedules, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'procedure_id', referencedColumnName: 'id' }])
	procedure: Procedure;
}
