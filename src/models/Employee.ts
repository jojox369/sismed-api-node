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

import { Address } from './Address';
import { ClinicalRegister } from './ClinicalRegister';
import { HealthInsuranceType } from './HealthInsuranceType';
import { Log } from './Log';
import { Perfil } from './Perfil';
import { Schedule } from './Schedule';

@Index('cpf_UNIQUE', ['cpf'], { unique: true })
@Index('rg_UNIQUE', ['rg'], { unique: true })
@Index('crm_UNIQUE', ['crm'], { unique: true })
@Index('fk_employee_address1_idx', ['addressId'], {})
@Index('fk_employee_perfil1_idx', ['perfilId'], {})
@Entity('employee', { schema: 'sismed' })
export class Employee {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'name', length: 60 })
	name: string;

	@Column('varchar', { name: 'cpf', unique: true, length: 11 })
	cpf: string;

	@Column('varchar', { name: 'rg', unique: true, length: 9 })
	rg: string;

	@Column('varchar', { name: 'emittingOrgan', length: 20 })
	emittingOrgan: string;

	@Column('date', { name: 'emittingDate' })
	emittingDate: string;

	@Column('varchar', { name: 'phone', length: 10 })
	phone: string;

	@Column('varchar', { name: 'cellPhone', length: 11 })
	cellPhone: string;

	@Column('varchar', { name: 'sex', length: 1 })
	sex: string;

	@Column('date', { name: 'dateBirth' })
	dateBirth: string;

	@Column('varchar', { name: 'email', length: 50 })
	email: string;

	@Column('varchar', { name: 'maritalStatus', length: 1 })
	maritalStatus: string;

	@Column('varchar', { name: 'schooling', length: 3 })
	schooling: string;

	@Column('varchar', { name: 'naturalness', length: 45 })
	naturalness: string;

	@Column('varchar', { name: 'nationality', length: 1 })
	nationality: string;

	@Column('date', { name: 'beginDate' })
	beginDate: string;

	@Column('date', { name: 'dismissalDate', nullable: true })
	dismissalDate: string | null;

	@Column('varchar', { name: 'crm', nullable: true, unique: true, length: 50 })
	crm: string | null;

	@Column('varchar', { name: 'specialty', nullable: true, length: 45 })
	specialty: string | null;

	@Column('varchar', { name: 'recoveryCode', nullable: true, length: 16 })
	recoveryCode: string | null;

	@Column('varchar', { name: 'password', length: 255 })
	password: string;

	@Column('int', { name: 'address_id' })
	addressId: number;

	@Column('int', { name: 'perfil_id' })
	perfilId: number;

	@OneToMany(
		() => ClinicalRegister,
		(clinicalRegister) => clinicalRegister.employee
	)
	clinicalRegisters: ClinicalRegister[];

	@ManyToOne(() => Address, (address) => address.employees, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
	address: Address;

	@ManyToOne(() => Perfil, (perfil) => perfil.employees, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'perfil_id', referencedColumnName: 'id' }])
	perfil: Perfil;

	@ManyToMany(
		() => HealthInsuranceType,
		(healthInsuranceType) => healthInsuranceType.employees
	)
	@JoinTable({
		name: 'employee_health_insurance_type',
		joinColumns: [{ name: 'employee_id', referencedColumnName: 'id' }],
		inverseJoinColumns: [
			{ name: 'healthInsuranceType_id', referencedColumnName: 'id' },
		],
		schema: 'sismed',
	})
	healthInsuranceTypes: HealthInsuranceType[];

	@OneToMany(() => Log, (log) => log.employee)
	logs: Log[];

	@OneToMany(() => Schedule, (schedule) => schedule.employee)
	schedules: Schedule[];
}
