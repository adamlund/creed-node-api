import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexService } from '../db/db.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const mockKnexService = {
      getKnex: jest.fn(() => ({
        raw: jest.fn().mockResolvedValue([{ dbConnection: true }])
      })),
      closeKnex: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: KnexService,
          useValue: mockKnexService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('App controller health routes', () => {
    it('Healthy() route should return truthy', async () => {
      const ready = await appController.isHealthy();
      expect(ready).toEqual({ dbConnection: true });
    });
  });
});
