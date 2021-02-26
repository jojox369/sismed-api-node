import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAddress1614362894881 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'address',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'zipCode',
						type: 'varchar',
						length: '10',
						isNullable: true,
					},
					{
						name: 'street',
						type: 'varchar',
						length: '255',
						isNullable: true,
					},
					{
						name: 'number',
						type: 'smallint',
						length: '6',
						isNullable: true,
					},

					{
						name: 'complement',
						type: 'varchar',
						length: '45',
						isNullable: true,
					},

					{
						name: 'district',
						type: 'varchar',
						length: '45',
						isNullable: true,
					},

					{
						name: 'city',
						type: 'varchar',
						length: '45',
						isNullable: true,
					},

					{
						name: 'state',
						type: 'varchar',
						length: '2',
						isNullable: true,
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('address');
	}
}
