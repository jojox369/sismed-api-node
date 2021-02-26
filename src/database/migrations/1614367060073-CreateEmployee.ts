import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmployee1614367060073 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'employee',
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
						length: '60',
					},
					{
						name: 'cpf',
						type: 'varchar',
						length: '11',
						isUnique: true,
					},
					{
						name: 'rg',
						type: 'varchar',
						length: '9',
						isUnique: true,
					},
					{
						name: 'emittingOrgan',
						type: 'varchar',
						length: '20',
					},
					{
						name: 'emittingDate',
						type: 'date',
					},
					{
						name: 'phone',
						type: 'varchar',
						length: '10',
					},
					{
						name: 'cellPhone',
						type: 'varchar',
						length: '11',
					},
					{
						name: 'sex',
						type: 'varchar',
						length: '1',
					},
					{
						name: 'dateBirth',
						type: 'date',
					},
					{
						name: 'email',
						type: 'varchar',
						length: '50',
					},
					{
						name: 'maritalStatus',
						type: 'varchar',
						length: '1',
					},
					{
						name: 'schooling',
						type: 'varchar',
						length: '3',
					},
					{
						name: 'naturalness',
						type: 'varchar',
						length: '45',
					},
					{
						name: 'nationality',
						type: 'varchar',
						length: '1',
					},
					{
						name: 'beginDate',
						type: 'date',
					},
					{
						name: 'dismissalDate',
						type: 'date',
					},
					{
						name: 'crm',
						type: 'varchar',
						length: '50',
						isNullable: true,
						isUnique: true,
					},
					{
						name: 'specialty',
						type: 'varchar',
						length: '45',
						isNullable: true,
					},

					{
						name: 'recoveryCode',
						type: 'varchar',
						length: '16',
						isNullable: true,
					},
					{
						name: 'password',
						type: 'varchar',
						length: '255',
					},
					{
						name: 'address_id',
						type: 'int',
					},

					{
						name: 'profile_id',
						type: 'int',
					},
				],
				foreignKeys: [
					{
						name: 'FK_Employee_Address',
						referencedTableName: 'address',
						referencedColumnNames: ['id'],
						columnNames: ['address_id'],
						onDelete: 'NO ACTION',
						onUpdate: 'CASCADE',
					},
					{
						name: 'FK_Employee_Profile',
						referencedTableName: 'address',
						referencedColumnNames: ['id'],
						columnNames: ['profile_id'],
						onDelete: 'NO ACTION',
						onUpdate: 'CASCADE',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('employee');
	}
}
