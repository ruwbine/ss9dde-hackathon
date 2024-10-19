import { MigrationInterface, QueryRunner } from "typeorm";

export class Backend1003AddCoursesEntity1729243210314 implements MigrationInterface {
    name = 'Backend1003AddCoursesEntity1729243210314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "modules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" text NOT NULL, "courseId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7dbefd488bd96c5bf31f0ce0c95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "modules" ADD CONSTRAINT "FK_83489b37212a5a547bde8f89014" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modules" DROP CONSTRAINT "FK_83489b37212a5a547bde8f89014"`);
        await queryRunner.query(`DROP TABLE "modules"`);
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}
