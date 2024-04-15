import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { createMock } from '@golevelup/ts-jest';
import { PodcastsController } from './podcasts.controller';
import { PodcastsService } from './podcasts.service';

const mockPodcastData = {
  id: 140,
  name: 'Web Design',
  parent_id: 127,
  total: 37,
  result_count: 15,
  page_number: 1,
  previous_page_number: 0,
  next_page_number: 2,
  has_next: true,
  has_previous: false,
  podcasts: [
    {
      id: '0087e50929614250aac999207c1d33aa',
      title: 'Developer Tea',
      publisher: 'Jonathan Cutrell',
      image:
        'https://production.listennotes.com/podcasts/developer-tea-spec-jonathan-cutrell--cxSbfBI1pz-Yh5ar9JNDvE.300x300.jpg',
      thumbnail:
        'https://production.listennotes.com/podcasts/developer-tea-spec-jonathan-cutrell--cxSbfBI1pz-Yh5ar9JNDvE.300x300.jpg',
      listennotes_url:
        'https://www.listennotes.com/c/0087e50929614250aac999207c1d33aa/',
      total_episodes: 958,
      explicit_content: 0,
      description: '',
      itunes_id: 955596067,
      rss: '',
      latest_pub_date_ms: 1712732400000,
      earliest_pub_date_ms: 1467905400598,
      language: 'English',
      country: 'United States',
      website:
        'http://www.developertea.com?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website',
      extra: {
        url1: '',
        url2: '',
        url3: '',
        google_url: '',
        spotify_url: '',
        youtube_url: '',
        linkedin_url: '',
        wechat_handle: '',
        patreon_handle: '',
        twitter_handle: '',
        facebook_handle: '',
        amazon_music_url: '',
        instagram_handle: '',
      },
      is_claimed: 1,
      email: '',
      type: 'episodic',
      looking_for: {
        guests: true,
        cohosts: true,
        sponsors: true,
        cross_promotion: true,
      },
      genre_ids: [67, 93, 94, 122, 128, 140, 143, 105, 157, 173, 127],
    },
    {
      id: '04d38776bc6f4de1a3f38bde7187b761',
      title: 'Sprint',
      publisher: 'SprintUXPodcast.com',
      image:
        'https://production.listennotes.com/podcasts/sprint-sprintuxpodcastcom-8wIKDg79ZsS-Ln4QoU7iYTs.300x300.jpg',
      thumbnail:
        'https://production.listennotes.com/podcasts/sprint-sprintuxpodcastcom-8wIKDg79ZsS-Ln4QoU7iYTs.300x300.jpg',
      listennotes_url:
        'https://www.listennotes.com/c/04d38776bc6f4de1a3f38bde7187b761/',
      total_episodes: 75,
      explicit_content: 1,
      description:
        'Each week Michael Dusing, Alex Hoffman, and Jesse Weaver sit down for Sprint, a UX podcast. Listen as they drink and converse their way through UX, product and tech news.',
      itunes_id: 1185717395,
      rss: '',
      latest_pub_date_ms: 1625065106000,
      earliest_pub_date_ms: 1481501588160,
      language: 'English',
      country: 'United States',
      website:
        'http://sprintuxpodcast.com?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website',
      extra: {
        url1: '',
        url2: '',
        url3: '',
        google_url: '',
        spotify_url: '',
        youtube_url: '',
        linkedin_url: '',
        wechat_handle: '',
        patreon_handle: '',
        twitter_handle: '',
        facebook_handle: '',
        amazon_music_url: '',
        instagram_handle: '',
      },
      is_claimed: 0,
      email: '',
      type: 'episodic',
      looking_for: {
        guests: false,
        cohosts: false,
        sponsors: false,
        cross_promotion: false,
      },
      genre_ids: [67, 100, 140, 157],
    },
  ],
};

describe('PodcastsController', () => {
  let controller: PodcastsController;

  const mockPodcastsService = {
    fetchPodcasts: jest.fn(() => Promise.resolve(mockPodcastData)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PodcastsController],
      providers: [
        {
          provide: PodcastsService,
          useValue: mockPodcastsService,
        },
      ],
    }).compile();

    controller = module.get<PodcastsController>(PodcastsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getBestPodcasts should return expected data', async () => {
    const mockRequest = createMock<Request>({
      url: '/podcasts/best_podcasts?genre_id=140&region=us&page=1',
    });
    const mockHeaders = {
      host: 'localhost:3000',
    };
    const mockResponse = createMock<Response>();
    mockResponse.status = jest.fn().mockReturnThis(); // Chainable response functions
    mockResponse.send = jest.fn().mockReturnValue({
      ...mockPodcastData,
      api_url:
        'localhost:3000/podcasts/best_podcasts?genre_id=140&region=us&page=1',
    });

    const mockQuery = { genre_id: 140, region: 'us', page: 1 };
    const expectedResult = {
      ...mockPodcastData,
      api_url:
        'localhost:3000/podcasts/best_podcasts?genre_id=140&region=us&page=1',
    };

    // Mock service method
    mockPodcastsService.fetchPodcasts.mockResolvedValue(mockPodcastData);

    // Call the controller method
    const result = await controller.getBestPodcasts(
      // @ts-ignore
      mockRequest,
      mockHeaders,
      mockResponse,
      mockQuery,
    );

    expect(mockResponse.send).toHaveBeenCalledWith(expectedResult);
    expect(result).toEqual(expectedResult);
  });
});
