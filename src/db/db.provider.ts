import { Global, Module } from '@nestjs/common';
import { knex } from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import { PodcastModel } from './models/Podcast.model';
import { GenreModel } from 'src/db/models/Genre.model';
import config from 'src/knexfile';

const knexConfig = config.development;

const providers = [
  {
    provide: PodcastModel.name,
    useValue: PodcastModel,
  },
  {
    provide: GenreModel.name,
    useValue: GenreModel,
  },
  {
    provide: 'Knex',
    useFactory: () => {
      const knexInstance = knex({
        ...knexConfig,
        ...knexSnakeCaseMappers(),
      });

      Model.knex(knexInstance);  // Associate the knex instance with Objection's Model
      return knexInstance;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
