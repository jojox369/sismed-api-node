import { MigrationInterface, QueryRunner } from 'typeorm';

const TriggersData = [
	{
		name: 'trigger_employee_health_insurance_type',
		when: 'AFTER INSERT',
		table: 'ON employee',
		sql:
			'IF(NEW.profile_id <> 3) THEN INSERT INTO employee_health_insurance_type(health_insurance_type_id, employee_id) VALUES(1, NEW.id); END IF',
	},
	{
		name: 'trigger_lab_health_insurance_type',
		when: 'AFTER INSERT',
		table: 'ON lab',
		sql:
			'INSERT INTO lab_health_insurance_type (health_insurance_type_id, lab_id) VALUES (1, NEW.id)',
	},

	{
		name: 'trigger_reverse_cascade_employee',
		when: 'AFTER DELETE',
		table: 'ON employee',
		sql: 'DELETE FROM address WHERE ID = OLD.address_id',
	},

	{
		name: 'trigger_reverse_cascade_health_Insurance',
		when: 'AFTER DELETE',
		table: 'ON health_insurance',
		sql: 'DELETE FROM bankData WHERE id = OLD.bank_data_id',
	},

	{
		name: 'trigger_reverse_cascade_lab',
		when: 'AFTER DELETE',
		table: 'ON lab',
		sql: 'DELETE FROM address WHERE id = OLD.address_id',
	},

	{
		name: 'trigger_reverse_cascade_patient',
		when: 'AFTER DELETE',
		table: 'ON patient',
		sql: 'DELETE FROM address WHERE id = OLD.address_id',
	},

	{
		name: 'trigger_verify_log ',
		when: 'AFTER INSERT',
		table: 'ON LOG',
		sql:
			'IF((SELECT COUNT(id) FROM log) > 50 ) THEN DELETE FROM log ORDER BY id LIMIT 1; END IF',
	},
];

export class CreateTriggers1614631229273 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		TriggersData.map(async (trigger) => {
			return await queryRunner.query(
				'CREATE TRIGGER ' +
				`${trigger.name} ${trigger.when} ${trigger.table}` +
				' FOR EACH ROW' +
				' BEGIN ' +
				`${trigger.sql};` +
				'	END'
			);
		});
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;'
		);
		await queryRunner.query(
			'DROP TRIGGER IF EXISTS trigger_employee_health_insurance_type;'
		);
		await queryRunner.query(
			'DROP TRIGGER IF EXISTS trigger_lab_health_insurance_type;'
		);
		await queryRunner.query(
			'DROP TRIGGER IF EXISTS trigger_reverse_cascade_employee;'
		);
		await queryRunner.query(
			'DROP TRIGGER IF EXISTS trigger_reverse_cascade_health_insurance;'
		);
		await queryRunner.query(
			'DROP TRIGGER IF EXISTS trigger_reverse_cascade_lab;'
		);
		await queryRunner.query(
			'DROP TRIGGER IF EXISTS trigger_reverse_cascade_patient;'
		);
		await queryRunner.query('DROP TRIGGER IF EXISTS trigger_verify_log;');
		await queryRunner.query('SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;');
	}
}
