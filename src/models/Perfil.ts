import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Employee from './Employee';

@Entity('perfi', { schema: 'sismed' })
export default class Perfil {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'type', length: 45 })
	type: string;

	@OneToMany(() => Employee, (employee) => employee.perfil)
	employees: Employee[];
}
