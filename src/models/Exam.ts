import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Lab from './Lab';
import Patient from './Patient';

@Entity('exam')
export default class Exam {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'name', length: 50 })
	name: string;

	@Column('varchar', { name: 'description', length: 250 })
	description: string;

	@Column('date', { name: 'collection_date' })
	collectionDate: string;

	@Column('date', { name: 'send_date' })
	sendDate: string;

	@Column('date', { name: 'return_date', nullable: true })
	returnDate: string | null;

	@Column('varchar', { name: 'lab_employee', length: 45 })
	labEmployee: string;

	@Column('decimal', {
		name: 'value',
		precision: 7,
		scale: 2,
		default: () => "'0.00'",
	})
	value: string;

	@Column('int', { name: 'patient_id' })
	patientId: number;

	@Column('int', { name: 'lab_id' })
	labId: number;

	@ManyToOne(() => Lab, (lab) => lab.exams, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'lab_id', referencedColumnName: 'id' }])
	lab: Lab;

	@ManyToOne(() => Patient, (patient) => patient.exams, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'patient_id', referencedColumnName: 'id' }])
	patient: Patient;
}
