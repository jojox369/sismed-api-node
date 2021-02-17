import {
	Column,
	Entity,
	Index,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Address from './Address';
import Exam from './Exam';
import HealthInsuranceType from './HealthInsuranceType';

@Index('cnpj', ['cnpj'], { unique: true })
@Index('fk_lab_address1_idx', ['addressId'], {})
@Entity('lab', { schema: 'sismed' })
export default class Lab {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'cnpj', unique: true, length: 14 })
	cnpj: string;

	@Column('varchar', { name: 'name', length: 45 })
	name: string;

	@Column('varchar', { name: 'responsible', length: 45 })
	responsible: string;

	@Column('varchar', { name: 'phone', length: 10 })
	phone: string;

	@Column('varchar', { name: 'email', nullable: true, length: 45 })
	email: string | null;

	@Column('int', { name: 'address_id' })
	addressId: number;

	@OneToMany(() => Exam, (exam) => exam.lab)
	exams: Exam[];

	@ManyToOne(() => Address, (address) => address.labs, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
	address: Address;

	@ManyToMany(() => HealthInsuranceType)
	@JoinTable({
		name: 'lab_healthinsurancetype',
		joinColumns: [{ name: 'lab_id', referencedColumnName: 'id' }],
		inverseJoinColumns: [
			{ name: 'healthInsuranceType_id', referencedColumnName: 'id' },
		],
		schema: 'sismed',
	})
	healthinsurancetypes: HealthInsuranceType[];
}
