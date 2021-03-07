import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMeasurement1615144419666
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'measurements',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'temperature',
            type: 'float',
          },
          {
            name: 'heart_rate',
            type: 'integer',
          },
          {
            name: 'arterial_frequency_min',
            type: 'integer',
          },
          {
            name: 'arterial_frequency_max',
            type: 'integer',
          },
          {
            name: 'blood_saturation',
            type: 'integer',
          },
          {
            name: 'time',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'patient_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'MeasurementPatient',
            columnNames: ['patient_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'patients',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('measurements');
  }
}
