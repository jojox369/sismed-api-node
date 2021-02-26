import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { Employee } from './Employee';
import { Event } from './Event';

@Index('fk_log_employee1_idx', ['employeeId'], {})
@Index('fk_log_event1_idx', ['eventId'], {})
@Entity('log', { schema: 'sismed' })
export class Log {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('date', { name: 'date' })
	date: string;

	@Column('time', { name: 'time' })
	time: string;

	@Column('varchar', { name: 'description', nullable: true, length: 255 })
	description: string | null;

	@Column('int', { name: 'employee_id' })
	employeeId: number;

	@Column('int', { name: 'event_id' })
	eventId: number;

	@ManyToOne(() => Employee, (employee) => employee.logs, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'employee_id', referencedColumnName: 'id' }])
	employee: Employee;

	@ManyToOne(() => Event, (event) => event.logs, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'event_id', referencedColumnName: 'id' }])
	event: Event;
}
