import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PodcastsModule } from '../podcasts/podcasts.module';
import { DatabaseModule } from '../db/db.module';
import { KnexService } from '../db/db.service';

@Module({
  imports: [PodcastsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly knexService: KnexService) {}

  async onApplicationShutdown(signal?: string) {
    await this.knexService.closeKnex();
  }
}
