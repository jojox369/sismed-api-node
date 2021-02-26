import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateHealthInsurance1614368675233 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'health_insurance',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'name',
						type: 'varchar',
						length: '45',
					},
					{
						name: 'accessionDate',
						type: 'date',
						isNullable: true,
						default: 'now()',
					},
					{
						name: 'cnpj',
						type: 'varchar',
						length: '14',
						isNullable: true,
						isUnique: true,
					},
					{
						name: 'ansRegister',
						type: 'varchar',
						length: '6',
						isNullable: true,
						isUnique: true,
					},
					{
						name: 'bank_data_id',
						type: 'int',
						isNullable: true,
					},
				],
				foreignKeys: [
					{
						name: 'FK_HealthInsurance_BankData',
						referencedTableName: 'bank_data',
						referencedColumnNames: ['id'],
						columnNames: ['bank_data_id'],
						onDelete: 'NO ACTION',
						onUpdate: 'CASCADE',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('health_insurance');
	}
}
