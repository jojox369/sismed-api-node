import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Address from './Address';
import ClinicalRegister from './ClinicalRegister';
import Exam from './Exam';
import HealthInsuranceType from './HealthInsuranceType';
import Schedule from './Schedule';

@Entity('patient')
export default class Patient {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'name', length: 60 })
	name: string;

	@Column('varchar', { name: 'cpf', nullable: true, unique: true, length: 11 })
	cpf: string | null;

	@Column('varchar', { name: 'rg', nullable: true, unique: true, length: 9 })
	rg: string | null;

	@Column('varchar', { name: 'emitting_organ', nullable: true, length: 20 })
	emittingOrgan: string | null;

	@Column('date', { name: 'emitting_date', nullable: true })
	emittingDate: string | null;

	@Column('varchar', { name: 'phone', nullable: true, length: 10 })
	phone: string | null;

	@Column('varchar', { name: 'job_phone', nullable: true, length: 10 })
	jobPhone: string | null;

	@Column('varchar', { name: 'cell_phone', nullable: true, length: 11 })
	cellPhone: string | null;

	@Column('varchar', { name: 'sex', nullable: true, length: 1 })
	sex: string | null;

	@Column('date', { name: 'date_birth', nullable: true })
	dateBirth: string | null;

	@Column('varchar', { name: 'email', nullable: true, length: 50 })
	email: string | null;

	@Column('varchar', { name: 'marital_status', nullable: true, length: 1 })
	maritalStatus: string | null;

	@Column('varchar', { name: 'schooling', nullable: true, length: 3 })
	schooling: string | null;

	@Column('varchar', { name: 'naturalness', nullable: true, length: 100 })
	naturalness: string | null;

	@Column('varchar', { name: 'nationality', nullable: true, length: 1 })
	nationality: string | null;

	@Column('varchar', { name: 'profession', nullable: true, length: 100 })
	profession: string | null;

	@Column('varchar', {
		name: 'situation',
		nullable: true,
		length: 1,
		default: () => "'A'",
	})
	situation: string | null;

	@Column('varchar', { name: 'recommendation', nullable: true, length: 30 })
	recommendation: string | null;

	@Column('varchar', {
		name: 'health_insurance_number',
		nullable: true,
		unique: true,
		length: 50,
	})
	healthInsuranceNumber: string | null;

	@Column('date', { name: 'validity', nullable: true })
	validity: string | null;

	@Column('int', { name: 'address_id' })
	addressId: number;

	@Column('int', { name: 'health_insurance_type_id' })
	healthInsuranceTypeId: number;

	@OneToMany(
		() => ClinicalRegister,
		(clinicalRegister) => clinicalRegister.patient
	)
	clinicalRegisters: ClinicalRegister[];

	@OneToMany(() => Exam, (exam) => exam.patient)
	exams: Exam[];

	@ManyToOne(() => Address, (address) => address.patients, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
		cascade: true,
	})
	@JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
	address: Address;

	@ManyToOne(
		() => HealthInsuranceType,
		(healthInsuranceType) => healthInsuranceType.patients,
		{ onDelete: 'NO ACTION', onUpdate: 'CASCADE' }
	)
	@JoinColumn([
		{ name: 'health_insurance_type_id', referencedColumnName: 'id' },
	])
	healthInsuranceType: HealthInsuranceType;

	@OneToMany(() => Schedule, (schedule) => schedule.patient)
	schedules: Schedule[];
}
