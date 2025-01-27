import { MigrationInterface, QueryRunner } from "typeorm";

export class FoodProducts1737484358831 implements MigrationInterface {
    name = 'FoodProducts1737484358831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "food_products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "unit" character varying NOT NULL, "emissionCO2eInKgPerUnit" double precision, "ingredients" json NOT NULL, CONSTRAINT "PK_3aca8796e89325904061ed18b12" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "food_products"`);
    }

}
