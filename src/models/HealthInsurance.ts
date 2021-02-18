import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Bankdata from './Bankdata';
import HealthInsuranceType from './HealthInsuranceType';
import Procedure from './Procedure';

@Index('fk_healthInsurance_bankData1_idx', ['bankDataId'], {})
@Entity('healthinsurance', { schema: 'sismed' })
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

	@ManyToOne(() => Bankdata, (bankdata) => bankdata.healthinsurances, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'bankData_id', referencedColumnName: 'id' }])
	bankData: Bankdata;

	@OneToMany(
		() => HealthInsuranceType,
		(healthinsurancetype) => healthinsurancetype.healthInsurance
	)
	healthInsuranceTypes: HealthInsuranceType[];

	@OneToMany(() => Procedure, (procedure) => procedure.healthInsurance)
	procedures: Procedure[];
}
