import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1725477154384 implements MigrationInterface {
    name = 'FirstMigration1725477154384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claim" ALTER COLUMN "dateLost" SET DEFAULT '"2024-09-04T19:12:35.641Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claim" ALTER COLUMN "dateLost" SET DEFAULT '2024-09-04'`);
    }

}
