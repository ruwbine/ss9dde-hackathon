import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTags1745957158689 implements MigrationInterface {
    name = 'AddTags1745957158689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quiz_tag_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tag" character varying NOT NULL, "quizId" uuid, CONSTRAINT "PK_9301d1aadead9c91920c2d7fd4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quiz_tag_entity" ADD CONSTRAINT "FK_4f054f1a75850977c1120faa0fc" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz_tag_entity" DROP CONSTRAINT "FK_4f054f1a75850977c1120faa0fc"`);
        await queryRunner.query(`DROP TABLE "quiz_tag_entity"`);
    }

}
