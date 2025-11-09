import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateContentTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contents',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['ARTICLE', 'VIDEO', 'PODCAST'],
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


    await queryRunner.createIndex(
      'contents',
      new TableIndex({
        name: 'idx_contents_title',
        columnNames: ['title'],
      })
    );

    await queryRunner.createIndex(
      'contents',
      new TableIndex({
        name: 'idx_contents_type',
        columnNames: ['type'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('contents', 'idx_contents_title');
    await queryRunner.dropIndex('contents', 'idx_contents_type');
    await queryRunner.dropTable('contents');
  }
}
