import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Healthinsurance from './HealthInsurance';
import Patient from './Patient';
import Schedule from './Schedule';

@Index('fk_healthInsuranceType_healthInsurance1_idx', ['healthInsuranceId'], {})
@Entity('healthinsurancetype', { schema: 'sismed' })
export default class Healthinsurancetype {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'name', length: 45 })
	name: string;

	@Column('int', { name: 'healthInsurance_id', nullable: true })
	healthInsuranceId: number | null;

	@ManyToOne(
		() => Healthinsurance,
		(healthinsurance) => healthinsurance.healthinsurancetypes,
		{ onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
	)
	@JoinColumn([{ name: 'healthInsurance_id', referencedColumnName: 'id' }])
	healthInsurance: Healthinsurance;

	@OneToMany(() => Patient, (patient) => patient.healthInsuranceType)
	patients: Patient[];

	@OneToMany(() => Schedule, (schedule) => schedule.healthInsuranceType)
	schedules: Schedule[];
}
