import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultValues1614621300382 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'INSERT INTO `health_insurance` (`id`, `name`, `accession_date`, `cnpj`, `ans_register`, `bank_data_id`) VALUES (1, "PARTICULAR", "2021-02-26", NULL, NULL, NULL); '
		);

		await queryRunner.query(
			'INSERT INTO `health_insurance_type` (`id`, `name`, `health_insurance_id`) VALUES (1, "PARTICULAR", 1);'
		);

		await queryRunner.query(
			'INSERT INTO `profile` (`id`, `type`) VALUES (1, "Admin");'
		);

		await queryRunner.query(
			'INSERT INTO `profile` (`id`, `type`) VALUES (2, "Médic");'
		);

		await queryRunner.query(
			'INSERT INTO `profile` (`id`, `type`) VALUES (3, "Other");'
		);

		await queryRunner.query(
			'INSERT INTO `event` (`id`, `type`) VALUES (1, "Create");'
		);

		await queryRunner.query(
			'INSERT INTO `event` (`id`, `type`) VALUES (2, "Update");'
		);

		await queryRunner.query(
			'INSERT INTO `event` (`id`, `type`) VALUES (3, "Delete");'
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'DELETE FROM `health_insurance_type` WHERE id = 1 '
		);

		await queryRunner.query('DELETE FROM `health_insurance` WHERE id = 1 ');

		await queryRunner.query('DELETE FROM `profile` WHERE id = 1 ');

		await queryRunner.query('DELETE FROM `profile` WHERE id = 2 ');

		await queryRunner.query('DELETE FROM `profile` WHERE id = 3 ');

		await queryRunner.query('DELETE FROM `event` WHERE id = 1 ');

		await queryRunner.query('DELETE FROM `event` WHERE id = 2 ');

		await queryRunner.query('DELETE FROM `event` WHERE id = 3 ');
	}
}
