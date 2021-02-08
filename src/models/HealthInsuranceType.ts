import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'

import HealthInsurance from './HealthInsurance'
import Patient from './Patient'
import Schedule from './Schedule'

@Entity('healthInsuranceType')
export default class {
	@PrimaryGeneratedColumn()
	id: number

	@Column('varchar', { name: 'name', length: 45 })
	name: string

	@Column('int', { name: 'healthInsurance_id' })
	healthInsuranceId: number | null

	@OneToMany(() => Patient, (patient) => patient.healthInsuranceType)
	patient: Patient[]

	@OneToMany(() => Schedule, (schedule) => schedule.healthInsuranceType)
	schedule: Schedule[]

	@ManyToOne(
		() => HealthInsurance,
		(healthInsurance) => healthInsurance.healthInsuranceType
	)
	healthInsurance: HealthInsurance
}
