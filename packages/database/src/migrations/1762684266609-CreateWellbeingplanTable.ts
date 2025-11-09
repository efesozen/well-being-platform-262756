import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateWellbeingplanTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'well_being_plans',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'plan_details',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'well_being_plans',
      new TableForeignKey({
        name: 'fk_well_being_plans_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'well_being_plans',
      new TableIndex({
        name: 'idx_well_being_plans_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'well_being_plans',
      new TableIndex({
        name: 'idx_well_being_plans_user_id',
        columnNames: ['user_id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('well_being_plans', 'idx_well_being_plans_user_id');
    await queryRunner.dropForeignKey('well_being_plans', 'fk_well_being_plans_user_id');
    await queryRunner.dropTable('well_being_plans');
  }
}
