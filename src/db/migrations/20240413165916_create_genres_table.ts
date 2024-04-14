import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('genres', (table) => {
    table.bigInteger('id').primary();
    table.text('name');
    table.bigInteger('parent_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('genres');
}
