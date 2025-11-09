import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateActivityTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'activities',
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
            name: 'activity_type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'duration',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
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
      'activities',
      new TableForeignKey({
        name: 'fk_activities_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'activities',
      new TableIndex({
        name: 'idx_activities_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'activities',
      new TableIndex({
        name: 'idx_activities_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'activities',
      new TableIndex({
        name: 'idx_activities_activity_type',
        columnNames: ['activity_type'],
      })
    );

    await queryRunner.createIndex(
      'activities',
      new TableIndex({
        name: 'idx_activities_date',
        columnNames: ['date'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('activities', 'idx_activities_user_id');
    await queryRunner.dropIndex('activities', 'idx_activities_activity_type');
    await queryRunner.dropIndex('activities', 'idx_activities_date');
    await queryRunner.dropForeignKey('activities', 'fk_activities_user_id');
    await queryRunner.dropTable('activities');
  }
}
