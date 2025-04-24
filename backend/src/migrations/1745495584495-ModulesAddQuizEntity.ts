import { MigrationInterface, QueryRunner } from "typeorm";

export class ModulesAddQuizEntity1745495584495 implements MigrationInterface {
    name = 'ModulesAddQuizEntity1745495584495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "explanation_entity" DROP CONSTRAINT "FK_714901d1f911a2b5e51de1afe64"`);
        await queryRunner.query(`ALTER TABLE "quiz_result" DROP CONSTRAINT "FK_4abf6cd9299375deb44f23f170a"`);
        await queryRunner.query(`ALTER TABLE "quiz" ADD "moduleId" uuid`);
        await queryRunner.query(`ALTER TABLE "quiz_result" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "quiz_result" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "explanation_entity" ADD CONSTRAINT "FK_714901d1f911a2b5e51de1afe64" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz" ADD CONSTRAINT "FK_1df837f733b43da85ba3ad8ac52" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz" DROP CONSTRAINT "FK_1df837f733b43da85ba3ad8ac52"`);
        await queryRunner.query(`ALTER TABLE "explanation_entity" DROP CONSTRAINT "FK_714901d1f911a2b5e51de1afe64"`);
        await queryRunner.query(`ALTER TABLE "quiz_result" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "quiz_result" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "quiz" DROP COLUMN "moduleId"`);
        await queryRunner.query(`ALTER TABLE "quiz_result" ADD CONSTRAINT "FK_4abf6cd9299375deb44f23f170a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "explanation_entity" ADD CONSTRAINT "FK_714901d1f911a2b5e51de1afe64" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
