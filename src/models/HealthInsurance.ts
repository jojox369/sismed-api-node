import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import BankData from './BankData';
import HealthInsuranceType from './HealthInsuranceType';
import Procedure from './Procedure';

@Entity('health_insurance')
export default class HealthInsurance {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'name', length: 45 })
	name: string;

	@Column('date', { name: 'accessionDate' })
	accessionDate: string;

	@Column('varchar', { name: 'cnpj', nullable: true, length: 14 })
	cnpj: string | null;

	@Column('varchar', { name: 'ansRegister', nullable: true, length: 6 })
	ansRegister: string | null;

	@Column('int', { name: 'bankData_id', nullable: true })
	bankDataId: number | null;

	@ManyToOne(() => BankData, (bankData) => bankData.healthInsurances, {
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'bankData_id', referencedColumnName: 'id' }])
	bankData: BankData;

	@OneToMany(
		() => HealthInsuranceType,
		(healthInsuranceType) => healthInsuranceType.healthInsurance
	)
	healthInsuranceTypes: HealthInsuranceType[];

	@OneToMany(() => Procedure, (procedure) => procedure.healthInsurance)
	procedures: Procedure[];
}
