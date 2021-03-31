import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Employee from './Employee';
import Lab from './Lab';
import Patient from './Patient';

@Entity('address')
export default class Address {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'zip_code', nullable: true, length: 10 })
	zipCode: string | null;

	@Column('varchar', { name: 'street', nullable: true, length: 255 })
	street: string | null;

	@Column('smallint', { name: 'number', nullable: true })
	number: number | null;

	@Column('varchar', { name: 'complement', nullable: true, length: 45 })
	complement: string | null;

	@Column('varchar', { name: 'neighborhood', nullable: true, length: 45 })
	neighborhood: string | null;

	@Column('varchar', { name: 'city', nullable: true, length: 45 })
	city: string | null;

	@Column('varchar', { name: 'state', nullable: true, length: 2 })
	state: string | null;

	@OneToMany(() => Employee, (employee) => employee.address)
	employees: Employee[];

	@OneToMany(() => Lab, (lab) => lab.address)
	labs: Lab[];

	@OneToMany(() => Patient, (patient) => patient.address)
	patients: Patient[];
}
