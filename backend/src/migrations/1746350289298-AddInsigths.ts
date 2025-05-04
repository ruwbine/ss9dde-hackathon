import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInsigths1746350289298 implements MigrationInterface {
    name = 'AddInsigths1746350289298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "insights_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "summary" character varying NOT NULL, "strongTopics" text array NOT NULL, "weakTopics" text array NOT NULL, "improvingTopics" text array NOT NULL, "decliningTopics" text array NOT NULL, "scoreHistory" jsonb NOT NULL, "recommendations" jsonb NOT NULL, "nextStep" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2b0a66df70381368fb6f42f9b01" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "insights_entity"`);
    }

}
