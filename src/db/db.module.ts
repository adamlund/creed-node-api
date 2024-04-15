import { Global, Module } from '@nestjs/common';
import { KnexService } from './db.service';
import { Model } from 'objection';
import { PodcastModel } from './models/Podcast.model';
import { GenreModel } from './models/Genre.model';

@Global()
@Module({
  providers: [
    KnexService,
    {
      provide: PodcastModel.name,
      useFactory: (knexService: KnexService) => {
        const knexInstance = knexService.getKnex();
        Model.knex(knexInstance);
        return PodcastModel;
      },
      inject: [KnexService],
    },
    {
      provide: GenreModel.name,
      useFactory: (knexService: KnexService) => {
        const knexInstance = knexService.getKnex();
        Model.knex(knexInstance);
        return GenreModel;
      },
      inject: [KnexService],
    },
  ],
  exports: [KnexService, PodcastModel.name, GenreModel.name],
})
export class DatabaseModule {}
