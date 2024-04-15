import { Injectable } from '@nestjs/common';
import { KnexService } from '../db/db.service';

@Injectable()
export class AppService {
  constructor(private readonly knex: KnexService) {}

  async verifyDatabaseConnection(): Promise<boolean> {
    try {
      await this.knex.getKnex().raw('select 1+1 as result');
      return true;
    } catch (error) {
      console.error('Database connection failed', error);
      return false;
    }
  }
}
