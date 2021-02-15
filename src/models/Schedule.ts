import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'

import Employee from './Employee'
import HealthInsuranceType from './HealthInsuranceType'
import Patient from './Patient'
import Procedure from './Procedure'

@Entity('schedule')
export default class {
	@PrimaryGeneratedColumn()
	id: number

	@Column('int', { name: 'employee_id' })
	employeeId: number

	@Column('int', { name: 'patient_id' })
	patientId: number

	@Column('int', { name: 'healthInsuranceType_id' })
	healthInsuranceTypeId: number

	@Column('int', { name: 'procedure_id' })
	procedureId: number

	@Column('date', { name: 'date' })
	date: string

	@Column('time', { name: 'time' })
	time: string

	@Column('tinyint', { name: 'firstTime', default: 1 })
	firstTime: boolean

	@Column('tinyint', { name: 'attended', default: 1 })
	attended: boolean

	@Column('tinyint', { name: 'paid', default: 1 })
	paid: boolean

	@Column('tinyint', { name: 'rescheduled', default: 0 })
	rescheduled: boolean

	@Column('tinyint', { name: 'paid', default: 0 })
	finished: boolean

	@Column('varchar', { name: 'notes', nullable: true })
	notes: string | null

	@ManyToOne(() => Employee, (employee) => employee.schedule)
	@JoinColumn([{ name: 'employee_id', referencedColumnName: 'id' }])
	employee: Employee

	@ManyToOne(() => Patient, (patient) => patient.schedule, { cascade: true })
	@JoinColumn([{ name: 'patient_id', referencedColumnName: 'id' }])
	patient: Patient

	@ManyToOne(
		() => HealthInsuranceType,
		(healthInsuranceType) => healthInsuranceType.schedule
	)
	@JoinColumn([{ name: 'healthInsuranceType_id', referencedColumnName: 'id' }])
	healthInsuranceType: HealthInsuranceType

	@ManyToOne(() => Procedure, (procedure) => procedure.schedule)
	@JoinColumn([{ name: 'procedure_id', referencedColumnName: 'id' }])
	procedure: Procedure
}
