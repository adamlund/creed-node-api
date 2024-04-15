import { Injectable } from '@nestjs/common';
import { knex, Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import config from '../knexfile';

@Injectable()
export class KnexService {
  private readonly knexInstance: Knex;

  constructor() {
    this.knexInstance = knex({
      ...config.development,
      ...knexSnakeCaseMappers(),
    });
  }

  getKnex(): Knex {
    return this.knexInstance;
  }

  async closeKnex(): Promise<void> {
    await this.knexInstance.destroy();
  }
}
