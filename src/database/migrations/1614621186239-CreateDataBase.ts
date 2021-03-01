import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDataBase1614621186239 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE `bank_data` (`id` int NOT NULL AUTO_INCREMENT, `bank` varchar(45) NOT NULL, `agency` varchar(45) NOT NULL, `account` varchar(45) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
		);
		await queryRunner.query(
			"CREATE TABLE `schedule` (`id` int NOT NULL AUTO_INCREMENT, `date` date NOT NULL, `time` time NOT NULL, `first_time` tinyint(1) NULL DEFAULT '1', `attended` tinyint(1) NULL DEFAULT '1', `paid` tinyint(1) NULL DEFAULT '1', `rescheduled` tinyint(1) NULL DEFAULT '0', `finished` tinyint(1) NULL DEFAULT '0', `notes` varchar(255) NULL, `employee_id` int NOT NULL, `patient_id` int NOT NULL, `health_insurance_type_id` int NOT NULL, `procedure_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
		);
		await queryRunner.query(
			'CREATE TABLE `procedure` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(45) NOT NULL, `value` decimal(7,2) NOT NULL, `health_insurance_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
		);
		await queryRunner.query(
			'CREATE TABLE `health_insurance` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(45) NOT NULL, `accession_date` date NOT NULL, `cnpj` varchar(14) NULL, `ans_register` varchar(6) NULL, `bank_data_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
		);
		await queryRunner.query(
			'CREATE TABLE `health_insurance_type` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(45) NOT NULL, `health_insurance_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
		);
		await queryRunner.query(
			'CREATE TABLE `lab` (`id` int NOT NULL AUTO_INCREMENT, `cnpj` varchar(14) NOT NULL, `name` varchar(45) NOT NULL, `responsible` varchar(45) NOT NULL, `phone` varchar(10) NOT NULL, `email` varchar(45) NULL, `address_id` int NOT NULL, UNIQUE INDEX `IDX_4e00a2f7c5e1f8860ef91bc511` (`cnpj`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
		);
		await queryRunner.query(
			"CREATE TABLE `exam` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, `description` varchar(250) NOT NULL, `collection_date` date NOT NULL, `send_date` date NOT NULL, `return_date` date NULL, `lab_employee` varchar(45) NOT NULL, `value` decimal(7,2) NOT NULL DEFAULT '0.00', `patient_id` int NOT NULL, `lab_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
		);
		await queryRunner.query(
			"CREATE TABLE `patient` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(60) NOT NULL, `cpf` varchar(11) NULL, `rg` varchar(9) NULL, `emitting_organ` varchar(20) NULL, `emitting_date` date NULL, `phone` varchar(10) NULL, `job_phone` varchar(10) NULL, `cell_phone` varchar(11) NULL, `sex` varchar(1) NULL, `date_birth` date NULL, `email` varchar(50) NULL, `marital_status` varchar(1) NULL, `schooling` varchar(3) NULL, `naturalness` varchar(100) NULL, `nationality` varchar(1) NULL, `profession` varchar(100) NULL, `situation` varchar(1) NULL DEFAULT 'A', `recommendation` varchar(30) NULL, `health_insurance_number` varchar(50) NULL, `validity` date NULL, `address_id` int NOT NULL, `health_insurance_type_id` int NOT NULL, UNIQUE INDEX `IDX_d1206b00842f789e35c7c5baf6` (`cpf`), UNIQUE INDEX `IDX_2d70d584020cc1effd1de094cd` (`rg`), UNIQUE INDEX `IDX_3482032e859a66801bcbed83d2` (`health_insurance_number`), PRIMARY KEY (`id`)) ENGINE=InnoDB"
		);
		await queryRunner.query(
			'CREATE TABLE `clinical_register` (`id` int NOT NULL AUTO_INCREMENT, `date` date NOT NULL, `time` time NOT NULL, `description` longtext NOT NULL, `employee_id` int NOT NULL, `patient_id` int NOT NULL, `schedule_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
		);
		await queryRunner.query(
			'CREATE TABLE `event` (`id` int NOT NULL AUTO_INCREMENT, `type` varchar(45) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
		);
		await queryRunner.query(
			'CREATE TABLE `log` (`id` int NOT NULL AUTO_INCREMENT, `date` date NOT NULL, `time` time NOT NULL, `description` varchar(255) NULL, `employee_id` int NOT NULL, `event_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
		);
		await queryRunner.query(
			'CREATE TABLE `profile` (`id` int NOT NULL AUTO_INCREMENT, `type` varchar(45) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
		);
		await queryRunner.query(
			'CREATE TABLE `employee` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(60) NOT NULL, `cpf` varchar(11) NOT NULL, `rg` varchar(9) NOT NULL, `emitting_organ` varchar(20) NOT NULL, `emitting_date` date NOT NULL, `phone` varchar(10) NOT NULL, `cell_phone` varchar(11) NOT NULL, `sex` varchar(1) NOT NULL, `date_birth` date NOT NULL, `email` varchar(50) NOT NULL, `marital_status` varchar(1) NOT NULL, `schooling` varchar(3) NOT NULL, `naturalness` varchar(45) NOT NULL, `nationality` varchar(1) NOT NULL, `begin_date` date NOT NULL, `dismissal_date` date NULL, `crm` varchar(50) NULL, `specialty` varchar(45) NULL, `recovery_code` varchar(16) NULL, `password` varchar(255) NOT NULL, `address_id` int NOT NULL, `perfil_id` int NOT NULL, `profile_id` int NULL, UNIQUE INDEX `IDX_cc5bc3cbcb7312fbc898749c5b` (`cpf`), UNIQUE INDEX `IDX_733ef14870ef56a82761d2fa47` (`rg`), UNIQUE INDEX `IDX_887b54402180f09ae830aa37dd` (`crm`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
		);
		await queryRunner.query(
			'CREATE TABLE `address` (`id` int NOT NULL AUTO_INCREMENT, `zipCode` varchar(10) NULL, `street` varchar(255) NULL, `number` smallint NULL, `complement` varchar(45) NULL, `district` varchar(45) NULL, `city` varchar(45) NULL, `state` varchar(2) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
		);
		await queryRunner.query(
			'CREATE TABLE `lab_health_insurance_type` (`health_insuranceType_id` int NOT NULL, `lab_id` int NOT NULL, INDEX `IDX_08e8875bb42ccf5e7b4835ceb4` (`health_insuranceType_id`), INDEX `IDX_f8f6f6547cc88e138876d315d5` (`lab_id`), PRIMARY KEY (`health_insuranceType_id`, `lab_id`)) ENGINE=InnoDB'
		);
		await queryRunner.query(
			'CREATE TABLE `employee_health_insurance_type` (`employee_id` int NOT NULL, `healthInsuranceType_id` int NOT NULL, INDEX `IDX_93fd4f1b80934562d6cd7ebfe3` (`employee_id`), INDEX `IDX_41e47831dc1b91a1cc914a2806` (`healthInsuranceType_id`), PRIMARY KEY (`employee_id`, `healthInsuranceType_id`)) ENGINE=InnoDB'
		);
		await queryRunner.query(
			'ALTER TABLE `schedule` ADD CONSTRAINT `FK_c37456a306af86b238b6839b1c9` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `schedule` ADD CONSTRAINT `FK_7fe8337b2f5053e59b9dfa708ae` FOREIGN KEY (`health_insurance_type_id`) REFERENCES `health_insurance_type`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `schedule` ADD CONSTRAINT `FK_2390a191e9a9b2de3bfc002bf12` FOREIGN KEY (`patient_id`) REFERENCES `patient`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `schedule` ADD CONSTRAINT `FK_ebe6f374747ed850c6361cdd27b` FOREIGN KEY (`procedure_id`) REFERENCES `procedure`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `procedure` ADD CONSTRAINT `FK_ed3c683ec3f007a3725b316dc09` FOREIGN KEY (`health_insurance_id`) REFERENCES `health_insurance`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `health_insurance` ADD CONSTRAINT `FK_a4039d58248341178c75db49384` FOREIGN KEY (`bank_data_id`) REFERENCES `bank_data`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `health_insurance_type` ADD CONSTRAINT `FK_3c1066b5454845fdd7b3c0b40d1` FOREIGN KEY (`health_insurance_id`) REFERENCES `health_insurance`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `lab` ADD CONSTRAINT `FK_959ca05284be099866933617624` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `exam` ADD CONSTRAINT `FK_01f9c5f9ed59fd2b664e5168779` FOREIGN KEY (`lab_id`) REFERENCES `lab`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `exam` ADD CONSTRAINT `FK_0636040fa5b6974471c3cabb53e` FOREIGN KEY (`patient_id`) REFERENCES `patient`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `patient` ADD CONSTRAINT `FK_f7f56b3710d99961ab06012bbbc` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `patient` ADD CONSTRAINT `FK_5d259af2c14ee500d4eada0fac3` FOREIGN KEY (`health_insurance_type_id`) REFERENCES `health_insurance_type`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `clinical_register` ADD CONSTRAINT `FK_77096136ff554d315645b69fd40` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `clinical_register` ADD CONSTRAINT `FK_1ccfc30fd55ae28cf2cb5a9e7c8` FOREIGN KEY (`patient_id`) REFERENCES `patient`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `clinical_register` ADD CONSTRAINT `FK_4f9be9124a187ff9ff59d1fb895` FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `log` ADD CONSTRAINT `FK_7d61e44b0c92794c16325c8f07c` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `log` ADD CONSTRAINT `FK_ed45fbe61de6fbe3f984f324126` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `employee` ADD CONSTRAINT `FK_2a4f5082f1be346e2b8cdec2194` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `employee` ADD CONSTRAINT `FK_ff6fbb46f0a78351950c41a5e66` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE'
		);
		await queryRunner.query(
			'ALTER TABLE `lab_health_insurance_type` ADD CONSTRAINT `FK_08e8875bb42ccf5e7b4835ceb48` FOREIGN KEY (`health_insuranceType_id`) REFERENCES `health_insurance_type`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION'
		);
		await queryRunner.query(
			'ALTER TABLE `lab_health_insurance_type` ADD CONSTRAINT `FK_f8f6f6547cc88e138876d315d5d` FOREIGN KEY (`lab_id`) REFERENCES `lab`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION'
		);
		await queryRunner.query(
			'ALTER TABLE `employee_health_insurance_type` ADD CONSTRAINT `FK_93fd4f1b80934562d6cd7ebfe35` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION'
		);
		await queryRunner.query(
			'ALTER TABLE `employee_health_insurance_type` ADD CONSTRAINT `FK_41e47831dc1b91a1cc914a28066` FOREIGN KEY (`healthInsuranceType_id`) REFERENCES `health_insurance_type`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION'
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE `employee_health_insurance_type` DROP FOREIGN KEY `FK_41e47831dc1b91a1cc914a28066`'
		);
		await queryRunner.query(
			'ALTER TABLE `employee_health_insurance_type` DROP FOREIGN KEY `FK_93fd4f1b80934562d6cd7ebfe35`'
		);
		await queryRunner.query(
			'ALTER TABLE `lab_health_insurance_type` DROP FOREIGN KEY `FK_f8f6f6547cc88e138876d315d5d`'
		);
		await queryRunner.query(
			'ALTER TABLE `lab_health_insurance_type` DROP FOREIGN KEY `FK_08e8875bb42ccf5e7b4835ceb48`'
		);
		await queryRunner.query(
			'ALTER TABLE `employee` DROP FOREIGN KEY `FK_ff6fbb46f0a78351950c41a5e66`'
		);
		await queryRunner.query(
			'ALTER TABLE `employee` DROP FOREIGN KEY `FK_2a4f5082f1be346e2b8cdec2194`'
		);
		await queryRunner.query(
			'ALTER TABLE `log` DROP FOREIGN KEY `FK_ed45fbe61de6fbe3f984f324126`'
		);
		await queryRunner.query(
			'ALTER TABLE `log` DROP FOREIGN KEY `FK_7d61e44b0c92794c16325c8f07c`'
		);
		await queryRunner.query(
			'ALTER TABLE `clinical_register` DROP FOREIGN KEY `FK_4f9be9124a187ff9ff59d1fb895`'
		);
		await queryRunner.query(
			'ALTER TABLE `clinical_register` DROP FOREIGN KEY `FK_1ccfc30fd55ae28cf2cb5a9e7c8`'
		);
		await queryRunner.query(
			'ALTER TABLE `clinical_register` DROP FOREIGN KEY `FK_77096136ff554d315645b69fd40`'
		);
		await queryRunner.query(
			'ALTER TABLE `patient` DROP FOREIGN KEY `FK_5d259af2c14ee500d4eada0fac3`'
		);
		await queryRunner.query(
			'ALTER TABLE `patient` DROP FOREIGN KEY `FK_f7f56b3710d99961ab06012bbbc`'
		);
		await queryRunner.query(
			'ALTER TABLE `exam` DROP FOREIGN KEY `FK_0636040fa5b6974471c3cabb53e`'
		);
		await queryRunner.query(
			'ALTER TABLE `exam` DROP FOREIGN KEY `FK_01f9c5f9ed59fd2b664e5168779`'
		);
		await queryRunner.query(
			'ALTER TABLE `lab` DROP FOREIGN KEY `FK_959ca05284be099866933617624`'
		);
		await queryRunner.query(
			'ALTER TABLE `health_insurance_type` DROP FOREIGN KEY `FK_3c1066b5454845fdd7b3c0b40d1`'
		);
		await queryRunner.query(
			'ALTER TABLE `health_insurance` DROP FOREIGN KEY `FK_a4039d58248341178c75db49384`'
		);
		await queryRunner.query(
			'ALTER TABLE `procedure` DROP FOREIGN KEY `FK_ed3c683ec3f007a3725b316dc09`'
		);
		await queryRunner.query(
			'ALTER TABLE `schedule` DROP FOREIGN KEY `FK_ebe6f374747ed850c6361cdd27b`'
		);
		await queryRunner.query(
			'ALTER TABLE `schedule` DROP FOREIGN KEY `FK_2390a191e9a9b2de3bfc002bf12`'
		);
		await queryRunner.query(
			'ALTER TABLE `schedule` DROP FOREIGN KEY `FK_7fe8337b2f5053e59b9dfa708ae`'
		);
		await queryRunner.query(
			'ALTER TABLE `schedule` DROP FOREIGN KEY `FK_c37456a306af86b238b6839b1c9`'
		);
		await queryRunner.query(
			'DROP INDEX `IDX_41e47831dc1b91a1cc914a2806` ON `employee_health_insurance_type`'
		);
		await queryRunner.query(
			'DROP INDEX `IDX_93fd4f1b80934562d6cd7ebfe3` ON `employee_health_insurance_type`'
		);
		await queryRunner.query('DROP TABLE `employee_health_insurance_type`');
		await queryRunner.query(
			'DROP INDEX `IDX_f8f6f6547cc88e138876d315d5` ON `lab_health_insurance_type`'
		);
		await queryRunner.query(
			'DROP INDEX `IDX_08e8875bb42ccf5e7b4835ceb4` ON `lab_health_insurance_type`'
		);
		await queryRunner.query('DROP TABLE `lab_health_insurance_type`');
		await queryRunner.query('DROP TABLE `address`');
		await queryRunner.query(
			'DROP INDEX `IDX_887b54402180f09ae830aa37dd` ON `employee`'
		);
		await queryRunner.query(
			'DROP INDEX `IDX_733ef14870ef56a82761d2fa47` ON `employee`'
		);
		await queryRunner.query(
			'DROP INDEX `IDX_cc5bc3cbcb7312fbc898749c5b` ON `employee`'
		);
		await queryRunner.query('DROP TABLE `employee`');
		await queryRunner.query('DROP TABLE `profile`');
		await queryRunner.query('DROP TABLE `log`');
		await queryRunner.query('DROP TABLE `event`');
		await queryRunner.query('DROP TABLE `clinical_register`');
		await queryRunner.query(
			'DROP INDEX `IDX_3482032e859a66801bcbed83d2` ON `patient`'
		);
		await queryRunner.query(
			'DROP INDEX `IDX_2d70d584020cc1effd1de094cd` ON `patient`'
		);
		await queryRunner.query(
			'DROP INDEX `IDX_d1206b00842f789e35c7c5baf6` ON `patient`'
		);
		await queryRunner.query('DROP TABLE `patient`');
		await queryRunner.query('DROP TABLE `exam`');
		await queryRunner.query(
			'DROP INDEX `IDX_4e00a2f7c5e1f8860ef91bc511` ON `lab`'
		);
		await queryRunner.query('DROP TABLE `lab`');
		await queryRunner.query('DROP TABLE `health_insurance_type`');
		await queryRunner.query('DROP TABLE `health_insurance`');
		await queryRunner.query('DROP TABLE `procedure`');
		await queryRunner.query('DROP TABLE `schedule`');
		await queryRunner.query('DROP TABLE `bank_data`');
	}
}
