import { QueryBuilderType } from 'objection';
import { PodcastModel } from 'src/db/models/Podcast.model';
import { GetPodcastsDto } from '../dto/podcasts.dto';
import { mapRegionToCountry } from '../../constants';

/**
 * Build Knex/objection ORM for supported query params from Dto.
 * QueryBuilder modifies passed object in place and does note return a value.
 * @param queryBuilder PodcastModel Objection QueryBuilder
 * @param query
 */
export function applyDomainFilters(
  queryBuilder: QueryBuilderType<PodcastModel>,
  query: GetPodcastsDto,
): void {
  if (query?.safe_mode) {
    queryBuilder.where('explicit_content', query.safe_mode);
  }
  if (query?.region && Object.keys(mapRegionToCountry).includes(query.region)) {
    queryBuilder.where('country', mapRegionToCountry[query.region].value);
  }
  if (query?.genre_id) {
    queryBuilder.whereRaw('JSON_CONTAINS(genre_ids, CAST(? AS JSON))', [
      query?.genre_id,
    ]);
  }
}
