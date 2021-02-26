import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Employee } from './Employee';

@Entity('perfil', { schema: 'sismed' })
export class Perfil {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'type', length: 45 })
	type: string;

	@OneToMany(() => Employee, (employee) => employee.perfil)
	employees: Employee[];
}
