import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('podcasts', (table) => {
    table.string('id').primary();
    table.text('title');
    table.text('publisher');
    table.text('image');
    table.text('thumbnail');
    table.text('listennotes_url');
    table.integer('total_episodes');
    table.boolean('explicit_content');
    table.text('description');
    table.integer('itunes_id');
    table.text('rss');
    table.bigInteger('latest_pub_date_ms');
    table.bigInteger('earliest_pub_date_ms');
    table.text('language');
    table.text('country');
    table.text('website');
    table.json('extra');
    table.boolean('is_claimed');
    table.text('email');
    table.text('type');
    table.json('looking_for');
    table.json('genre_ids');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('podcasts');
}
