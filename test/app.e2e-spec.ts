import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { KnexService } from '../src/db/db.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.get(KnexService).closeKnex();
    await app.close();
  });

  it('/healthz (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/healthz');
    expect(result.statusCode).toEqual(200);
    expect(result.body.dbConnection).toEqual(true);
  });

  it('/podcasts/best_podcasts (GET)', async () => {
    const result = await request(app.getHttpServer())
      .get('/podcasts/best_podcasts')
      .query({ genre_id: 140, page: 1, page_size: 5 });

    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty('podcasts');
    expect(result.body.podcasts).toBeInstanceOf(Array);
    expect(result.body.podcasts).toHaveLength(5);
  });
});
