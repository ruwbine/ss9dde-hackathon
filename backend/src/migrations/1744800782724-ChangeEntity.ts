import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeEntity1744800782724 implements MigrationInterface {
    name = 'ChangeEntity1744800782724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quiz_result" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "score" integer NOT NULL, "totalQuestions" integer NOT NULL, "percentage" double precision NOT NULL, "completedAt" TIMESTAMP NOT NULL, "userId" uuid, "quizId" uuid, CONSTRAINT "PK_87b85729df5cb6f6e136daeea4b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quiz_result" ADD CONSTRAINT "FK_4abf6cd9299375deb44f23f170a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_result" ADD CONSTRAINT "FK_9220c1b7b2ecc84d5edb11abd88" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz_result" DROP CONSTRAINT "FK_9220c1b7b2ecc84d5edb11abd88"`);
        await queryRunner.query(`ALTER TABLE "quiz_result" DROP CONSTRAINT "FK_4abf6cd9299375deb44f23f170a"`);
        await queryRunner.query(`DROP TABLE "quiz_result"`);
    }

}
