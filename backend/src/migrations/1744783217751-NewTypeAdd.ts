import { MigrationInterface, QueryRunner } from "typeorm";

export class NewTypeAdd1744783217751 implements MigrationInterface {
    name = 'NewTypeAdd1744783217751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" ADD "type" character varying(20) NOT NULL DEFAULT 'single'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "type"`);
    }

}
