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

import Employee from './Employee';
import HealthInsurance from './HealthInsurance';
import Lab from './Lab';
import Patient from './Patient';
import Schedule from './Schedule';

@Entity('health_insurance_type')
export default class HealthInsuranceType {
	@PrimaryGeneratedColumn({ type: 'int', name: 'id' })
	id: number;

	@Column('varchar', { name: 'name', length: 45 })
	name: string;

	@Column('int', { name: 'healthInsurance_id', nullable: true })
	healthInsuranceId: number | null;

	@ManyToMany(() => Employee, (employee) => employee.healthInsuranceTypes)
	employees: Employee[];

	@ManyToOne(
		() => HealthInsurance,
		(healthInsurance) => healthInsurance.healthInsuranceTypes,
		{ onDelete: 'NO ACTION', onUpdate: 'CASCADE' }
	)
	@JoinColumn([{ name: 'healthInsurance_id', referencedColumnName: 'id' }])
	healthInsurance: HealthInsurance;

	@ManyToMany(() => Lab, (lab) => lab.healthInsuranceTypes)
	@JoinTable({
		name: 'lab_health_insurance_type',
		joinColumns: [
			{ name: 'healthInsuranceType_id', referencedColumnName: 'id' },
		],
		inverseJoinColumns: [{ name: 'lab_id', referencedColumnName: 'id' }],
		schema: 'sismed',
	})
	labs: Lab[];

	@OneToMany(() => Patient, (patient) => patient.healthInsuranceType)
	patients: Patient[];

	@OneToMany(() => Schedule, (schedule) => schedule.healthInsuranceType)
	schedules: Schedule[];
}
