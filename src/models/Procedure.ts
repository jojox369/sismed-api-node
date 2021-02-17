import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import HealthInsurance from './HealthInsurance';
import Schedule from './Schedule';

@Index('fk_procedure_healthInsurance1_idx', ['healthInsuranceId'], {})
@Entity('procedure', { schema: 'sismed' })
export default class Procedure {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'name', length: 45 })
	name: string;

	@Column('decimal', { name: 'value', precision: 7, scale: 2 })
	value: string;

	@Column('int', { name: 'healthInsurance_id', nullable: true })
	healthInsuranceId: number | null;

	@ManyToOne(
		() => HealthInsurance,
		(healthinsurance) => healthinsurance.procedures,
		{ onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
	)
	@JoinColumn([{ name: 'healthInsurance_id', referencedColumnName: 'id' }])
	healthInsurance: HealthInsurance;

	@OneToMany(() => Schedule, (schedule) => schedule.procedure)
	schedules: Schedule[];
}
