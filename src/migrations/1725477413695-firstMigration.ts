import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1725477413695 implements MigrationInterface {
    name = 'FirstMigration1725477413695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."upload_type_enum" AS ENUM('image')`);
        await queryRunner.query(`CREATE TABLE "upload" ("id" SERIAL NOT NULL, "name" character varying(1024) NOT NULL, "path" character varying(1024) NOT NULL, "type" "public"."upload_type_enum" NOT NULL DEFAULT 'image', "mime" character varying(128) NOT NULL, "size" character varying(1024) NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."item_status_enum" AS ENUM('CLAIMED', 'UNCLAIMED', 'PROCESSING')`);
        await queryRunner.query(`CREATE TABLE "item" ("id" SERIAL NOT NULL, "name" character varying(96) NOT NULL, "imageUrl" character varying(1024) NOT NULL, "category" character varying(96) NOT NULL, "description" character varying(96), "status" "public"."item_status_enum" NOT NULL DEFAULT 'UNCLAIMED', "locationFound" character varying(96) NOT NULL, "dateFound" date NOT NULL, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "claimId" integer, CONSTRAINT "REL_c19d2807321be2767b12564bce" UNIQUE ("claimId"), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(96) NOT NULL, "lastName" character varying(96), "email" character varying(96) NOT NULL, "password" character varying(96), "googleId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."claim_status_enum" AS ENUM('SUBMITTED', 'PENDING', 'ACCEPTED', 'DECLINED')`);
        await queryRunner.query(`CREATE TABLE "claim" ("id" SERIAL NOT NULL, "status" "public"."claim_status_enum" NOT NULL DEFAULT 'SUBMITTED', "dateLost" date NOT NULL DEFAULT '"2024-09-04T19:16:54.716Z"', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_466b305cc2e591047fa1ce58f81" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_c19d2807321be2767b12564bce4" FOREIGN KEY ("claimId") REFERENCES "claim"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "claim" ADD CONSTRAINT "FK_fafadc3204e2d2838b035307ed8" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claim" DROP CONSTRAINT "FK_fafadc3204e2d2838b035307ed8"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_c19d2807321be2767b12564bce4"`);
        await queryRunner.query(`DROP TABLE "claim"`);
        await queryRunner.query(`DROP TYPE "public"."claim_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TYPE "public"."item_status_enum"`);
        await queryRunner.query(`DROP TABLE "upload"`);
        await queryRunner.query(`DROP TYPE "public"."upload_type_enum"`);
    }

}
