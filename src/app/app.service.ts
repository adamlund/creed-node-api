import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class AppService {
  constructor(@Inject('Knex') private readonly knex: Knex) {}

  async verifyDatabaseConnection(): Promise<boolean> {
    try {
      await this.knex.raw('select 1+1 as result');
      return true;
    } catch (error) {
      console.error('Database connection failed', error);
      return false;
    }
  }
}
