import { Test, TestingModule } from '@nestjs/testing';
import { PodcastsService } from './podcasts.service';
import { BadRequestException } from '@nestjs/common';

jest.mock('../db/models/Podcast.model');
jest.mock('../db/models/Genre.model');

describe('PodcastsService', () => {
  let service: PodcastsService;

  beforeEach(async () => {
    // Define a mock for the QueryBuilder
    const mockQueryBuilder = {
      findById: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      whereRaw: jest.fn().mockReturnThis(),
      page: jest.fn().mockImplementation((pageNumber, pageSize) =>
        Promise.resolve({
          total: 1,
          results: [{ title: 'Tech Today' }],
        }),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PodcastsService,
        {
          provide: 'PodcastModel',
          useValue: { query: () => mockQueryBuilder },
        },
        { provide: 'GenreModel', useValue: { query: () => mockQueryBuilder } },
      ],
    }).compile();

    service = module.get<PodcastsService>(PodcastsService);
    service.fetchGenre = jest.fn();
  });

  describe('fetchPodcasts', () => {
    it('should return podcasts data with valid genre', async () => {
      const mockGenreDto = { id: 140, name: 'Web Design', parent_id: null };
      const mockQuery = { genre_id: 140, page: 1 };

      jest.spyOn(service, 'fetchGenre').mockResolvedValue(mockGenreDto);
      const result = await service.fetchPodcasts(mockQuery);
      expect(result).toHaveProperty('podcasts');
      expect(result.podcasts.length).toBeGreaterThan(0);
      expect(result.id).toEqual(140);
    });

    it('should handle invalid genre id', async () => {
      const mockQuery = { genre_id: 999, page: 1 };

      jest.spyOn(service, 'fetchGenre').mockImplementation(() => {
        throw new BadRequestException(
          `Unsupported genre_id provided, genre_id=${mockQuery.genre_id}`,
        );
      });

      await expect(service.fetchPodcasts(mockQuery)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
