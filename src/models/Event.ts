import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Log from './Log';

@Entity('event', { schema: 'sismed' })
export default class Event {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'type', length: 45 })
	type: string;

	@OneToMany(() => Log, (log) => log.event)
	logs: Log[];
}
