import type { Knex } from 'knex';

/**
 * Boilerplate Knex db setup for MySQL
 */
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST || '',
      port: Number(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER || '',
      password: process.env.MYSQL_PASS || '',
      database: process.env.MYSQL_NAME || '',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
  },
};

export default config;
