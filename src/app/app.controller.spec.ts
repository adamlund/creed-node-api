import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const mockKnex = { raw: jest.fn().mockResolvedValue([{ result: 1 }]) };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: 'Knex',
          useValue: mockKnex,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('App controller health routes', () => {
    it('isReady() route should return with a value', async () => {
      const ready = await appController.isReady();
      expect(ready).toEqual({});
    });
    it('Healthy() route should return truthy', async () => {
      const ready = await appController.isHealthy();
      expect(ready).toEqual({ dbConnection: true });
    });
  });
});
