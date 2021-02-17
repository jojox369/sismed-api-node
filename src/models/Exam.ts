import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Lab from './Lab';
import Patient from './Patient';

@Index('fk_exam_patient1_idx', ['patientId'], {})
@Index('fk_exam_lab1_idx', ['labId'], {})
@Entity('exam', { schema: 'sismed' })
export default class Exam {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'name', length: 50 })
	name: string;

	@Column('varchar', { name: 'description', length: 250 })
	description: string;

	@Column('date', { name: 'collectionDate' })
	collectionDate: string;

	@Column('date', { name: 'sendDate' })
	sendDate: string;

	@Column('date', { name: 'returnDate', nullable: true })
	returnDate: string | null;

	@Column('varchar', { name: 'labEmployee', length: 45 })
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
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'lab_id', referencedColumnName: 'id' }])
	lab: Lab;

	@ManyToOne(() => Patient, (patient) => patient.exams, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'patient_id', referencedColumnName: 'id' }])
	patient: Patient;
}
