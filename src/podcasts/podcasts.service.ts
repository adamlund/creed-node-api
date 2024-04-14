import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ModelClass } from 'objection';
import { PodcastModel } from 'src/db/models/Podcast.model';
import { GenreModel } from 'src/db/models/Genre.model';
import { GetPodcastsDto, PodcastResultDto } from './dto/podcasts.dto';
import { GenreDto } from './dto/genre.dto';
import { applyDomainFilters } from './filter/filter.query';
import { pagingResponse, getPageNumber } from '../lib/paging.util';
import { DEFAULT_PAGE_SIZE } from '../constants';

@Injectable()
export class PodcastsService {
  constructor(
    @Inject('PodcastModel') private PodcastClass: ModelClass<PodcastModel>,
    @Inject('GenreModel') private GenreClass: ModelClass<GenreModel>,
  ) {}

  private defaultGenre(): GenreDto {
    return {
      id: 67,
      name: 'Podcasts',
      parent_id: null,
    };
  }

  /**
   * Retrieve Genre from DB by numeric id.
   * @param genreId 
   * @returns 
   */
  async fetchGenre(genreId: number): Promise<GenreDto> {
    // In a production system I would cache then genre array using Redis or Memcached as it rarely changes
    const genre = await this.GenreClass.query().findById(genreId);
    if (!genre) {
      throw new BadRequestException(`Unsupported genre_id provided, genre_id=${genreId}`);
    }
    return genre;
  }

  /**
   * Retrieve podcasts from db based on query parameters.
   * @param query see GetPodcastsDto for params
   * @returns Podcast search result with genre metadata and pagination
   */
  async fetchPodcasts(query: GetPodcastsDto): Promise<Partial<PodcastResultDto>> {
    const genre = query.genre_id ? await this.fetchGenre(query.genre_id) : this.defaultGenre();

    // sanitize page number input
    const pageNumber = getPageNumber(query.page);
    
    // building query object
    const queryBuilder = this.PodcastClass.query();
    applyDomainFilters(queryBuilder, query);

    let queryResult = await queryBuilder.page(pageNumber - 1, DEFAULT_PAGE_SIZE);
    let actualPageNumber = pageNumber;

    const totalPages = Math.ceil(queryResult.total / DEFAULT_PAGE_SIZE);

    // If paged beyond the maximum, provide the data from last page rather than zero results
    if (pageNumber > totalPages) {
      actualPageNumber = Math.max(totalPages, 1);
      queryResult = await queryBuilder.page(actualPageNumber - 1, DEFAULT_PAGE_SIZE);
    }

    const paging = pagingResponse(
      queryResult.total,
      queryResult.results.length,
      actualPageNumber,
      DEFAULT_PAGE_SIZE
    );

    const responseResult = {
      ...genre,
      ...paging,
      podcasts: queryResult.results || [],
    } as PodcastResultDto;

    return responseResult;
  }
}
