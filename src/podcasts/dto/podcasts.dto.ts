import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { PodcastInterface } from '../interface/podcast.interface';

/** Request DTO */
export class GetPodcastsDto {
  
  @IsOptional()
  @IsInt()
  @Min(0)
  page: number;

  @IsOptional()
  @IsInt()
  genre_id?: number;

  @IsOptional()
  @IsInt()
  safe_mode?: number;

  @IsOptional()
  @IsString()
  region?: string;
}

/** Response DTO */
export class PodcastResultDto {
  id: number;
  name: string;
  parent_id: number | null;
  podcasts: PodcastInterface[];
  total: number;
  has_next: boolean;
  has_previous: boolean;
  page_number: number;
  previous_page_number: number;
  next_page_number: number;
  request_url?: string;
}
