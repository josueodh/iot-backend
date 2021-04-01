import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreatePatient1614702663737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "patients",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cpf",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "cep",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "street",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "phone",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "number",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "complement",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "neighborhood",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "pathology",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "city",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "state",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "born_date",
            type: "timestamp with time zone",
          },
          {
            name: "smartband",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "start",
            type: "timestamp with time zone",
            default: "now()",
          },
          {
            name: "observation",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("patients");
  }
}
