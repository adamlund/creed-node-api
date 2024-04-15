import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/** Request DTO */
export class GetPodcastsDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({
    example: 1,
    description: 'Page',
    type: 'int',
    required: false,
  })
  page: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    example: 140,
    description: 'Genre from listennotes',
    type: 'int',
    required: false,
  })
  genre_id?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    example: 0,
    description: 'Filter explicit content',
    type: 'int',
    enum: [0, 1],
    required: false,
  })
  safe_mode?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'us',
    description: 'Filter country',
    type: 'string',
    enum: ['us', 'uk', 'ca', 'au'],
    required: false,
  })
  region?: string;

  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(50)
  @ApiProperty({
    example: 10,
    description: 'Number of results per page min 5 max 50',
    type: 'int',
    required: false,
  })
  page_size?: number;
}

/** Response DTO */
export class PodcastResultDto {
  id: number;
  name: string;
  parent_id: number | null;
  podcasts: PodcastDto[];
  total: number;
  has_next: boolean;
  has_previous: boolean;
  page_number: number;
  previous_page_number: number;
  next_page_number: number;
  request_url?: string;
}

export class PodcastDto {
  id: string;
  title: string;
  publisher: string;
  image: string;
  thumbnail: string;
  listennotes_url: string;
  total_episodes: number;
  explicit_content: boolean;
  description: string;
  itunes_id: number;
  rss: string;
  latest_pub_date_ms: number;
  earliest_pub_date_ms: number;
  language: string;
  country: string;
  website: string;
  extra: {
    twitter_handle: string;
    facebook_handle: string;
    instagram_handle: string;
    wechat_handle: string;
    patreon_handle: string;
    youtube_url: string;
    linkedin_url: string;
    spotify_url: string;
    google_url: string;
    url1: string;
    url2: string;
    url3: string;
  };
  is_claimed: boolean;
  email: string;
  type: string;
  looking_for: {
    sponsors: boolean;
    guests: boolean;
    cohosts: boolean;
    cross_promotion: boolean;
  };
  genre_ids: number[];
}
