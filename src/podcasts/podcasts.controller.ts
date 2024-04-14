import {
  Controller,
  Get,
  Headers,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { Response } from 'express';
import { GetPodcastsDto, PodcastResultDto } from './dto/podcasts.dto';

@Controller('podcasts')
export class PodcastsController {
  constructor(private podcastService: PodcastsService) {}

  @Get('best_podcasts')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  async getBestPodcasts(
    @Req() request: Request,
    @Headers() headers,
    @Res() response: Response,
    @Query() query: GetPodcastsDto,
  ): Promise<Response<PodcastResultDto>> {
    const podcasts = await this.podcastService.fetchPodcasts(query);
    return response.status(200).send({
      ...podcasts,
      api_url: `${headers.host}${request.url}`,
    });
  }
}
