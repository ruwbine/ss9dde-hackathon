import { MigrationInterface, QueryRunner } from "typeorm";

export class AddREquestEntities1729340447119 implements MigrationInterface {
    name = 'AddREquestEntities1729340447119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request_simolified_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request_simolified_entity" DROP COLUMN "createdAt"`);
    }

}
