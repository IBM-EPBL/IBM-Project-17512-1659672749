import { Test, TestingModule } from '@nestjs/testing';
import { HackathonService } from './hackathon.service';

describe('HackathonService', () => {
  let service: HackathonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HackathonService],
    }).compile();

    service = module.get<HackathonService>(HackathonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
