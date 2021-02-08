import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'

import HealthInsurance from './HealthInsurance'
import Schedule from './Schedule'

@Entity('procedure')
export default class {
	@PrimaryGeneratedColumn()
	id: number

	@Column('int', { name: 'healthInsurance_id', nullable: true })
	healthInsuranceid: number | null

	@Column('varchar', { name: 'name' })
	name: string

	@Column('decimal', { name: 'value' })
	value: number

	@OneToMany(() => Schedule, (schedule) => schedule.procedure)
	schedule: Schedule[]

	@ManyToOne(
		() => HealthInsurance,
		(healthInsurance) => healthInsurance.procedure
	)
	healthInsurance: HealthInsurance
}
