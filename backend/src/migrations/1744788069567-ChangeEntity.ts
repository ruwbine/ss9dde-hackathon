import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeEntity1744788069567 implements MigrationInterface {
    name = 'ChangeEntity1744788069567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "explanation_entity" ADD "quizId" uuid`);
        await queryRunner.query(`ALTER TABLE "explanation_entity" ADD CONSTRAINT "FK_714901d1f911a2b5e51de1afe64" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "explanation_entity" DROP CONSTRAINT "FK_714901d1f911a2b5e51de1afe64"`);
        await queryRunner.query(`ALTER TABLE "explanation_entity" DROP COLUMN "quizId"`);
    }

}
