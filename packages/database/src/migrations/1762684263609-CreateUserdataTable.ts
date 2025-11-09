import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateUserdataTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_data',
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
            name: 'goal_setting',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'progress_tracking',
            type: 'jsonb',
            isNullable: true,
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
      'user_data',
      new TableForeignKey({
        name: 'fk_user_data_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'user_data',
      new TableIndex({
        name: 'idx_user_data_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'user_data',
      new TableIndex({
        name: 'idx_user_data_user_id',
        columnNames: ['user_id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('user_data', 'idx_user_data_user_id');
    await queryRunner.dropForeignKey('user_data', 'fk_user_data_user_id');
    await queryRunner.dropTable('user_data');
  }
}
