import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'

import Address from './Address'
import HealthInsuranceType from './HealthInsuranceType'
import Schedule from './Schedule'

@Entity('patient')
export default class {
	@PrimaryGeneratedColumn({ type: 'int', name: 'prontuario' })
	prontuario: number

	@Column('varchar', { name: 'name', length: 60 })
	name: string

	@Column('int', { name: 'healthInsuranceType_id' })
	healthInsuranceTypeId: number

	@Column('int', { name: 'address_id' })
	addressId: number

	@Column('varchar', { name: 'cpf', unique: true, length: 11 })
	cpf: string

	@Column('varchar', { name: 'rg', unique: true, length: 9 })
	rg: string

	@Column('varchar', { name: 'emittingOrgan', length: 45 })
	emittingOrgan: string

	@Column('date', { name: 'emittingDate' })
	emittingDate: string

	@Column('varchar', { name: 'phone', nullable: true, length: 14 })
	phone: string | null

	@Column('varchar', { name: 'jobPhone', nullable: true, length: 14 })
	jobPhone: string | null

	@Column('varchar', { name: 'cellPhone', nullable: true, length: 16 })
	cellPhone: string | null

	@Column('varchar', { name: 'sex', length: 3 })
	sex: string

	@Column('date', { name: 'dateBirth' })
	dateBirth: string

	@Column('varchar', { name: 'email', length: 45 })
	email: string

	@Column('varchar', { name: 'maritalStatus', length: 1 })
	maritalStatus: string

	@Column('varchar', { name: 'schooling', length: 3 })
	schooling: string

	@Column('varchar', { name: 'naturalness', length: 45 })
	naturalness: string

	@Column('varchar', { name: 'profession', nullable: true, length: 100 })
	profession: string | null

	@Column('varchar', { name: 'recommendation', nullable: true, length: 30 })
	recommendation: string | null

	@Column('varchar', { name: 'nationality', nullable: true, length: 1 })
	nationality: string

	@Column('varchar', { name: 'situation', nullable: true, length: 2 })
	situation: string | null

	@Column('varchar', {
		name: 'healthInsuranceNumber',
		nullable: true,
		length: 50,
	})
	healthInsuranceNumber: string | null

	@Column('date', { name: 'validade', nullable: true })
	validity: string | null

	@OneToMany(() => Schedule, (schedule) => schedule.patient)
	schedule: Schedule[]

	@ManyToOne(() => Address, (address) => address.patient, { cascade: true })
	address: Address

	@ManyToOne(
		() => HealthInsuranceType,
		(healthInsuranceType) => healthInsuranceType.patient
	)
	healthInsuranceType: HealthInsuranceType
}
