import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PodcastsModule } from 'src/podcasts/podcasts.module';
import { DatabaseModule } from 'src/db/db.provider';
import Knex from 'knex';
import knexConfig from '../knexfile';
import { Model } from 'objection';

@Module({
  imports: [PodcastsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    const knex = Knex(knexConfig.development);
    Model.knex(knex);
  }
}
