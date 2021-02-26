import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBankData1614363608012 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'bank_data',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'bank',
						type: 'varchar',
						length: '45',
					},
					{
						name: 'agency',
						type: 'varchar',
						length: '45',
					},
					{
						name: 'account',
						type: 'varchar',
						length: '45',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('bank_data');
	}
}
