import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'

import Address from './Address'
import HealthInsuranceType from './HealthInsuranceType'
import Schedule from './Schedule'

@Entity('employee')
export default class {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number

	@Column('int', { name: 'address_id' })
	addressId: number

	@Column('int', { name: 'perfil_id' })
	perfilId: number

	@Column('varchar', { name: 'name', length: 45 })
	name: string

	@Column('varchar', { name: 'cpf', unique: true, length: 11 })
	cpf: string

	@Column('varchar', { name: 'rg', unique: true, length: 9 })
	rg: string

	@Column('varchar', { name: 'emittingOrgan', length: 45 })
	emittingOrgan: string

	@Column('date', { name: 'emittingDate' })
	emittingDate: string

	@Column('bigint', { name: 'crm', nullable: true, unique: true })
	crm: string | null

	@Column('varchar', { name: 'speciality', nullable: true, length: 45 })
	speciality: string | null

	@Column('varchar', { name: 'phone', length: 10 })
	phone: string

	@Column('varchar', { name: 'cellPhone', length: 11 })
	cellPhone: string

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

	@Column('date', { name: 'beginDate', nullable: true })
	beginDate: string

	@Column('date', { name: 'dismissalDate', nullable: true })
	dismissalDate: string | null

	@Column('varchar', { name: 'nationality', nullable: true, length: 1 })
	nationality: string

	@Column('varchar', { name: 'recoveryCode', nullable: true, length: 16 })
	recoveryCode: string | null

	@Column('varchar', { name: 'password', nullable: true, length: 255 })
	password: string

	@OneToMany(() => Schedule, (schedule) => schedule.employee)
	schedule: Schedule[]

	@ManyToOne(() => Address, (address) => address.employee)
	address: Address

	@ManyToMany(() => HealthInsuranceType)
	@JoinTable()
	healthInsuranceTypes: HealthInsuranceType[]
}
