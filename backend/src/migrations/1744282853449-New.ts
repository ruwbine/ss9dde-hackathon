import { MigrationInterface, QueryRunner } from "typeorm";

export class New1744282853449 implements MigrationInterface {
    name = 'New1744282853449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "explanation_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "term" text NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_cbf6681741fd317a7ff3f0b9068" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "isCorrect" boolean NOT NULL, "questionId" uuid, CONSTRAINT "PK_64f8e42188891f2b0610017c8f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "quizId" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text, "isCompleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "question_option" ADD CONSTRAINT "FK_ba19747af180520381a117f5986" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_4959a4225f25d923111e54c7cd2" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_4959a4225f25d923111e54c7cd2"`);
        await queryRunner.query(`ALTER TABLE "question_option" DROP CONSTRAINT "FK_ba19747af180520381a117f5986"`);
        await queryRunner.query(`DROP TABLE "quiz"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "question_option"`);
        await queryRunner.query(`DROP TABLE "explanation_entity"`);
    }

}
