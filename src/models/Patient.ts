import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Address from './Address';
import Clinicalregister from './Clinicalregister';
import Exam from './Exam';
import HealthInsuranceType from './HealthInsuranceType';
import Schedule from './Schedule';

@Index('fk_patient_address1_idx', ['addressId'], {})
@Index('fk_patient_healthInsuranceType1_idx', ['healthInsuranceTypeId'], {})
@Entity('patient', { schema: 'sismed' })
export default class Patient {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'name', length: 60 })
	name: string;

	@Column('varchar', { name: 'cpf', nullable: true, length: 14 })
	cpf: string | null;

	@Column('varchar', { name: 'rg', nullable: true, length: 13 })
	rg: string | null;

	@Column('varchar', { name: 'emittingOrgan', nullable: true, length: 20 })
	emittingOrgan: string | null;

	@Column('date', { name: 'emittingDate', nullable: true })
	emittingDate: string | null;

	@Column('varchar', { name: 'phone', nullable: true, length: 14 })
	phone: string | null;

	@Column('varchar', { name: 'jobPhone', nullable: true, length: 14 })
	jobPhone: string | null;

	@Column('varchar', { name: 'cellPhone', nullable: true, length: 16 })
	cellPhone: string | null;

	@Column('char', { name: 'sex', nullable: true, length: 1 })
	sex: string | null;

	@Column('date', { name: 'dateBirth', nullable: true })
	dateBirth: string | null;

	@Column('varchar', { name: 'email', nullable: true, length: 50 })
	email: string | null;

	@Column('varchar', { name: 'maritalStatus', nullable: true, length: 1 })
	maritalStatus: string | null;

	@Column('char', { name: 'schooling', nullable: true, length: 3 })
	schooling: string | null;

	@Column('varchar', { name: 'profession', nullable: true, length: 100 })
	profession: string | null;

	@Column('varchar', { name: 'recommendation', nullable: true, length: 30 })
	recommendation: string | null;

	@Column('varchar', { name: 'naturalness', nullable: true, length: 100 })
	naturalness: string | null;

	@Column('char', { name: 'nationality', nullable: true, length: 1 })
	nationality: string | null;

	@Column('char', {
		name: 'situation',
		nullable: true,
		length: 1,
		default: () => "'A'",
	})
	situation: string | null;

	@Column('varchar', {
		name: 'healthInsuranceNumber',
		nullable: true,
		length: 50,
	})
	healthInsuranceNumber: string | null;

	@Column('date', { name: 'validity', nullable: true })
	validity: string | null;

	@Column('int', { name: 'address_id' })
	addressId: number;

	@Column('int', { name: 'healthInsuranceType_id' })
	healthInsuranceTypeId: number;

	@OneToMany(
		() => Clinicalregister,
		(clinicalregister) => clinicalregister.patient
	)
	clinicalregisters: Clinicalregister[];

	@OneToMany(() => Exam, (exam) => exam.patient)
	exams: Exam[];

	@ManyToOne(() => Address, (address) => address.patients, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
	address: Address;

	@ManyToOne(
		() => HealthInsuranceType,
		(healthinsurancetype) => healthinsurancetype.patients,
		{ onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
	)
	@JoinColumn([{ name: 'healthInsuranceType_id', referencedColumnName: 'id' }])
	healthInsuranceType: HealthInsuranceType;

	@OneToMany(() => Schedule, (schedule) => schedule.patient)
	schedules: Schedule[];
}
