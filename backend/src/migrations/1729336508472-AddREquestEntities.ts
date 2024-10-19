import { MigrationInterface, QueryRunner } from "typeorm";

export class AddREquestEntities1729336508472 implements MigrationInterface {
    name = 'AddREquestEntities1729336508472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question_option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "isCorrect" boolean NOT NULL, "questionId" uuid, CONSTRAINT "PK_64f8e42188891f2b0610017c8f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "quizId" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text, "isCompleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "explanation_entity" ("id" SERIAL NOT NULL, "term" text NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_cbf6681741fd317a7ff3f0b9068" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "request_simolified_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "simplifiedText" text NOT NULL, CONSTRAINT "PK_9d29e5fdfb23a006557e7378269" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "request_simolified_entity"`);
        await queryRunner.query(`DROP TABLE "explanation_entity"`);
        await queryRunner.query(`DROP TABLE "quiz"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "question_option"`);
    }

}
