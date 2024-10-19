import { MigrationInterface, QueryRunner } from "typeorm";

export class Backend0013AddAssignmentEntity1729327766537 implements MigrationInterface {
    name = 'Backend0013AddAssignmentEntity1729327766537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "assignment_question_option_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "optionText" text NOT NULL, "isCorrect" boolean NOT NULL DEFAULT false, "questionId" uuid, CONSTRAINT "PK_4c873e24254b39f878443937bac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "assignment_question_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "questionText" text NOT NULL, "correctAnswer" character varying NOT NULL, "assignmentId" uuid, CONSTRAINT "PK_0504a02fe3ddb61e1bde520b620" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "assignment_submission_answer_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "questionId" character varying NOT NULL, "selectedOptionId" character varying NOT NULL, "submissionId" uuid, CONSTRAINT "PK_0cfdff561fc77ef83ea7b5952fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "assignment_submission_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" text NOT NULL, "isCompleted" boolean NOT NULL, "correctCount" integer NOT NULL, "incorrectCount" integer NOT NULL, "assignmentId" uuid, CONSTRAINT "PK_df0b5e371531b9f93187ddd1836" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "assignments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "answerOptions" text NOT NULL, "correctAnswer" character varying NOT NULL, "moduleId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c54ca359535e0012b04dcbd80ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assignment_question_option_entity" ADD CONSTRAINT "FK_1f05c3c457c126bac5bb2001e15" FOREIGN KEY ("questionId") REFERENCES "assignment_question_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assignment_question_entity" ADD CONSTRAINT "FK_7ebb8a3e13d94d5542a0aa4529a" FOREIGN KEY ("assignmentId") REFERENCES "assignments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assignment_submission_answer_entity" ADD CONSTRAINT "FK_0c20ee5aae7e15e4241cc6e67d0" FOREIGN KEY ("submissionId") REFERENCES "assignment_submission_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assignment_submission_entity" ADD CONSTRAINT "FK_7abb12cd833602cb12d1e500504" FOREIGN KEY ("assignmentId") REFERENCES "assignments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD CONSTRAINT "FK_e5c7662faf3ee3d5c0519d17017" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignments" DROP CONSTRAINT "FK_e5c7662faf3ee3d5c0519d17017"`);
        await queryRunner.query(`ALTER TABLE "assignment_submission_entity" DROP CONSTRAINT "FK_7abb12cd833602cb12d1e500504"`);
        await queryRunner.query(`ALTER TABLE "assignment_submission_answer_entity" DROP CONSTRAINT "FK_0c20ee5aae7e15e4241cc6e67d0"`);
        await queryRunner.query(`ALTER TABLE "assignment_question_entity" DROP CONSTRAINT "FK_7ebb8a3e13d94d5542a0aa4529a"`);
        await queryRunner.query(`ALTER TABLE "assignment_question_option_entity" DROP CONSTRAINT "FK_1f05c3c457c126bac5bb2001e15"`);
        await queryRunner.query(`DROP TABLE "assignments"`);
        await queryRunner.query(`DROP TABLE "assignment_submission_entity"`);
        await queryRunner.query(`DROP TABLE "assignment_submission_answer_entity"`);
        await queryRunner.query(`DROP TABLE "assignment_question_entity"`);
        await queryRunner.query(`DROP TABLE "assignment_question_option_entity"`);
    }

}
