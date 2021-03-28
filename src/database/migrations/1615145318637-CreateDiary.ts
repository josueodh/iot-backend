import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateDiary1615145318637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "diaries",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "date",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "walk",
            type: "integer",
          },
          {
            name: "sleep",
            type: "time",
          },
          {
            name: "patient_id",
            type: "uuid",
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
        foreignKeys: [
          {
            name: "DiaryPatient",
            columnNames: ["patient_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "patients",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("diaries");
  }
}
