import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthz')
  @Header('Access-Control-Allow-Origin', '*')
  async isHealthy(): Promise<object> {
    const connected = await this.appService.verifyDatabaseConnection();
    return {
      dbConnection: connected,
    };
  }

  @Get('ready')
  @Header('Access-Control-Allow-Origin', '*')
  async isReady(): Promise<object> {
    return {};
  }
}
