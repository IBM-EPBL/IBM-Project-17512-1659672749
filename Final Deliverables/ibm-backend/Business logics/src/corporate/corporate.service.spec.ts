import { Test, TestingModule } from '@nestjs/testing';
import { CorporateService } from './corporate.service';

describe('CorporateService', () => {
  let service: CorporateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorporateService],
    }).compile();

    service = module.get<CorporateService>(CorporateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
