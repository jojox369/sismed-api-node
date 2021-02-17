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
import Clinicalregister from './Clinicalregister';
import HealthInsuranceType from './HealthInsuranceType';
import Log from './Log';
import Perfil from './Perfil';
import Schedule from './Schedule';

@Index('cpf_UNIQUE', ['cpf'], { unique: true })
@Index('rg_UNIQUE', ['rg'], { unique: true })
@Index('crm_UNIQUE', ['crm'], { unique: true })
@Index('fk_employee_address1_idx', ['addressId'], {})
@Index('fk_employee_perfil1_idx', ['perfilId'], {})
@Entity('employee', { schema: 'sismed' })
export default class Employee {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'name', length: 45 })
	name: string;

	@Column('varchar', { name: 'cpf', unique: true, length: 11 })
	cpf: string;

	@Column('varchar', { name: 'rg', unique: true, length: 9 })
	rg: string;

	@Column('varchar', { name: 'emittingOrgan', length: 45 })
	emittingOrgan: string;

	@Column('date', { name: 'emittingDate' })
	emittingDate: string;

	@Column('bigint', { name: 'crm', nullable: true, unique: true })
	crm: string | null;

	@Column('varchar', { name: 'specialty', nullable: true, length: 45 })
	specialty: string | null;

	@Column('varchar', { name: 'phone', length: 10 })
	phone: string;

	@Column('varchar', { name: 'cellPhone', length: 11 })
	cellPhone: string;

	@Column('varchar', { name: 'sex', length: 3 })
	sex: string;

	@Column('date', { name: 'dateBirth' })
	dateBirth: string;

	@Column('varchar', { name: 'email', length: 45 })
	email: string;

	@Column('varchar', { name: 'maritalStatus', length: 1 })
	maritalStatus: string;

	@Column('varchar', { name: 'schooling', length: 3 })
	schooling: string;

	@Column('varchar', { name: 'naturalness', length: 45 })
	naturalness: string;

	@Column('date', { name: 'beginDate' })
	beginDate: string;

	@Column('date', { name: 'dismissalDate', nullable: true })
	dismissalDate: string | null;

	@Column('varchar', { name: 'nationality', length: 1 })
	nationality: string;

	@Column('varchar', { name: 'recoveryCode', nullable: true, length: 16 })
	recoveryCode: string | null;

	@Column('varchar', { name: 'password', length: 255 })
	password: string;

	@Column('int', { name: 'address_id' })
	addressId: number;

	@Column('int', { name: 'perfil_id' })
	perfilId: number;

	@OneToMany(
		() => Clinicalregister,
		(clinicalregister) => clinicalregister.employee
	)
	clinicalregisters: Clinicalregister[];

	@ManyToOne(() => Address, (address) => address.employees, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
	address: Address;

	@ManyToOne(() => Perfil, (perfil) => perfil.employees, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'perfil_id', referencedColumnName: 'id' }])
	perfil: Perfil;

	@ManyToMany(() => HealthInsuranceType)
	@JoinTable({
		name: 'employee_healthinsurancetype',
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
