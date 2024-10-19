import { MigrationInterface, QueryRunner } from "typeorm";

export class Backend1003UpdateAssignmentEntity1729337541287 implements MigrationInterface {
    name = 'Backend1003UpdateAssignmentEntity1729337541287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignments" DROP COLUMN "answerOptions"`);
        await queryRunner.query(`ALTER TABLE "assignments" DROP COLUMN "correctAnswer"`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignments" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD "correctAnswer" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD "answerOptions" text NOT NULL`);
    }

}
