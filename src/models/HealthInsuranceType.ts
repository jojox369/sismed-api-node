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
import Patient from './Patient';
import Schedule from './Schedule';

@Index('fk_healthInsuranceType_healthInsurance1_idx', ['healthInsuranceId'], {})
@Entity('healthinsurancetype', { schema: 'sismed' })
export default class HealthInsuranceType {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'name', length: 45 })
	name: string;

	@Column('int', { name: 'healthInsurance_id', nullable: true })
	healthInsuranceId: number | null;

	@ManyToOne(
		() => HealthInsurance,
		(healthInsurance) => healthInsurance.healthInsuranceTypes,
		{ onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
	)
	@JoinColumn([{ name: 'healthInsurance_id', referencedColumnName: 'id' }])
	healthInsurance: HealthInsurance;

	@OneToMany(() => Patient, (patient) => patient.healthInsuranceType)
	patients: Patient[];

	@OneToMany(() => Schedule, (schedule) => schedule.healthInsuranceType)
	schedules: Schedule[];
}
