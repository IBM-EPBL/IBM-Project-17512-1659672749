import { Controller, Get, Post } from '@nestjs/common';
import { HackathonService } from './hackathon.service';
@Controller('hackathon')
export class HackathonController {
  constructor(private readonly hackathonService: HackathonService) {}

  @Post('/post-hackathon')
  postHackathon() {
    return this.hackathonService.postHackathon();
  }

  @Get('/get-hackathon')
  getHackathon() {
    return this.hackathonService.getHackathon();
  }
}
