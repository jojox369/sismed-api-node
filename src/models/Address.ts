import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import Employee from './Employee'
import Patient from './Patient'

@Entity('address')
export default class {
	@PrimaryGeneratedColumn()
	id: number

	@Column('varchar', { name: 'zipCode', nullable: true, length: 10 })
	zipCode: string | null

	@Column('varchar', { name: 'street', nullable: true, length: 255 })
	street: string | null

	@Column('smallint', { name: 'number', nullable: true })
	number: number | null

	@Column('varchar', { name: 'complement', nullable: true, length: 45 })
	complement: string | null

	@Column('varchar', { name: 'district', nullable: true, length: 45 })
	district: string | null

	@Column('varchar', { name: 'city', nullable: true, length: 45 })
	city: string | null

	@Column('varchar', { name: 'state', nullable: true, length: 2 })
	state: string | null

	@OneToMany(() => Employee, (employee) => employee.address)
	employee: Employee[]

	@OneToMany(() => Patient, (patient) => patient.address)
	patient: Patient[]
}
