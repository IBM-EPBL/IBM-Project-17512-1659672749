import { Test, TestingModule } from '@nestjs/testing';
import { HackathonController } from './hackathon.controller';

describe('HackathonController', () => {
  let controller: HackathonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HackathonController],
    }).compile();

    controller = module.get<HackathonController>(HackathonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
