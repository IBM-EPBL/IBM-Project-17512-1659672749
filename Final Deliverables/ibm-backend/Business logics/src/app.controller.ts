import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { hackathonScrapper } from './utils/scrapper.utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    await hackathonScrapper();
    return 'hello';
  }
}
