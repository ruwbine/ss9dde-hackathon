import { MigrationInterface, QueryRunner } from "typeorm";

export class AddREquestEntities1729338570239 implements MigrationInterface {
    name = 'AddREquestEntities1729338570239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "explanation_entity" DROP CONSTRAINT "PK_cbf6681741fd317a7ff3f0b9068"`);
        await queryRunner.query(`ALTER TABLE "explanation_entity" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "explanation_entity" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "explanation_entity" ADD CONSTRAINT "PK_cbf6681741fd317a7ff3f0b9068" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "question_option" ADD CONSTRAINT "FK_ba19747af180520381a117f5986" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_4959a4225f25d923111e54c7cd2" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_4959a4225f25d923111e54c7cd2"`);
        await queryRunner.query(`ALTER TABLE "question_option" DROP CONSTRAINT "FK_ba19747af180520381a117f5986"`);
        await queryRunner.query(`ALTER TABLE "explanation_entity" DROP CONSTRAINT "PK_cbf6681741fd317a7ff3f0b9068"`);
        await queryRunner.query(`ALTER TABLE "explanation_entity" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "explanation_entity" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "explanation_entity" ADD CONSTRAINT "PK_cbf6681741fd317a7ff3f0b9068" PRIMARY KEY ("id")`);
    }

}
