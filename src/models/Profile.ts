import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Employee from './Employee';

@Entity('profile')
export default class Profile {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'type', length: 45 })
	type: string;

	@OneToMany(() => Employee, (employee) => employee.profile)
	employees: Employee[];
}
