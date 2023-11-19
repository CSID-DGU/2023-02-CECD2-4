import { Test, TestingModule } from '@nestjs/testing';
import { DailyKeywordBigEmotionsCntController } from './daily-keyword-big-emotions-cnt.controller';

describe('DailyKeywordBigEmotionsCntController', () => {
  let controller: DailyKeywordBigEmotionsCntController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyKeywordBigEmotionsCntController],
    }).compile();

    controller = module.get<DailyKeywordBigEmotionsCntController>(
      DailyKeywordBigEmotionsCntController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
