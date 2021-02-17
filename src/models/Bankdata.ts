import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import HealthInsurance from './HealthInsurance';

@Entity('bankdata', { schema: 'sismed' })
export default class Bankdata {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'bank', length: 45 })
	bank: string;

	@Column('varchar', { name: 'agency', length: 45 })
	agency: string;

	@Column('varchar', { name: 'account', length: 45 })
	account: string;

	@OneToMany(
		() => HealthInsurance,
		(healthinsurance) => healthinsurance.bankData
	)
	healthinsurances: HealthInsurance[];
}
