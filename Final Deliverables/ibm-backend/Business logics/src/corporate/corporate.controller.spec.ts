import { Test, TestingModule } from '@nestjs/testing';
import { CorporateController } from './corporate.controller';

describe('CorporateController', () => {
  let controller: CorporateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorporateController],
    }).compile();

    controller = module.get<CorporateController>(CorporateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
