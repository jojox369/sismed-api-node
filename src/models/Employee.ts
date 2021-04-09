import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Address from './Address';
import ClinicalRecord from './ClinicalRecord';
import HealthInsuranceType from './HealthInsuranceType';
import Log from './Log';
import Profile from './Profile';
import Schedule from './Schedule';

@Entity('employee')
export default class Employee {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'name', length: 60 })
	name: string;

	@Column('varchar', { name: 'cpf', unique: true, length: 11 })
	cpf: string;

	@Column('varchar', { name: 'rg', unique: true, length: 9 })
	rg: string;

	@Column('varchar', { name: 'emitting_organ', length: 20 })
	emittingOrgan: string;

	@Column('date', { name: 'emitting_date' })
	emittingDate: string;

	@Column('varchar', { name: 'phone', length: 10 })
	phone: string;

	@Column('varchar', { name: 'cell_number', length: 11 })
	cellNumber: string;

	@Column('varchar', { name: 'sex', length: 1 })
	sex: string;

	@Column('date', { name: 'date_birth' })
	dateBirth: string;

	@Column('varchar', { name: 'email', length: 50 })
	email: string;

	@Column('varchar', { name: 'marital_status', length: 1 })
	maritalStatus: string;

	@Column('varchar', { name: 'schooling', length: 3 })
	schooling: string;

	@Column('varchar', { name: 'naturalness', length: 45 })
	naturalness: string;

	@Column('varchar', { name: 'nationality', length: 1 })
	nationality: string;

	@Column('date', { name: 'begin_date' })
	beginDate: string;

	@Column('date', { name: 'dismissal_date', nullable: true })
	dismissalDate: string | null;

	@Column('varchar', { name: 'crm', nullable: true, unique: true, length: 50 })
	crm: string | null;

	@Column('varchar', { name: 'specialty', nullable: true, length: 45 })
	specialty: string | null;

	@Column('varchar', { name: 'recovery_code', nullable: true, length: 16 })
	recoveryCode: string | null;

	@Column('varchar', { name: 'password', length: 255 })
	password: string;

	@Column('int', { name: 'address_id' })
	addressId: number;

	@Column('int', { name: 'profile_id' })
	profileId: number;

	@OneToMany(() => ClinicalRecord, (clinicalRecord) => clinicalRecord.employee)
	clinicalRecords: ClinicalRecord[];

	@ManyToOne(() => Address, (address) => address.employees, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
		cascade: true,
	})
	@JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
	address: Address;

	@ManyToOne(() => Profile, (profile) => profile.employees, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'profile_id', referencedColumnName: 'id' }])
	profile: Profile;

	@ManyToMany(
		() => HealthInsuranceType,
		(healthInsuranceType) => healthInsuranceType.employees
	)
	@JoinTable({
		name: 'employee_health_insurance_type',
		joinColumns: [{ name: 'employee_id', referencedColumnName: 'id' }],
		inverseJoinColumns: [
			{ name: 'health_insurance_type_id', referencedColumnName: 'id' },
		],
		schema: 'sismed',
	})
	healthInsuranceTypes: HealthInsuranceType[];

	@OneToMany(() => Log, (log) => log.employee)
	logs: Log[];

	@OneToMany(() => Schedule, (schedule) => schedule.employee)
	schedules: Schedule[];
}
