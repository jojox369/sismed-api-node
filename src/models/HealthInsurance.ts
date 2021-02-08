import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import HealthInsuranceType from './HealthInsuranceType'
import Procedure from './Procedure'

@Entity('healthInsurance')
export default class {
	@PrimaryGeneratedColumn()
	id: number

	@Column('int', { name: 'bankData_id', nullable: true })
	bankDataId: number | null

	@Column('varchar', { name: 'name' })
	name: string

	@Column('date', { name: 'accessionDate', nullable: true })
	accessionDate: string | null

	@Column('varchar', { name: 'cnpj', nullable: true })
	cnpj: string | null

	@Column('varchar', { name: 'ansRegister', nullable: true })
	ansRegister: string | null

	@OneToMany(
		() => HealthInsuranceType,
		(healthInsuranceType) => healthInsuranceType.healthInsurance
	)
	healthInsuranceType: HealthInsuranceType[]

	@OneToMany(() => Procedure, (procedure) => procedure.healthInsurance)
	procedure: Procedure[]
}
