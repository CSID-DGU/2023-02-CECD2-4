import { Test, TestingModule } from '@nestjs/testing';
import { DailyKeywordBigEmotionsCntService } from './daily-keyword-big-emotions-cnt.service';

describe('DailyKeywordBigEmotionsCntService', () => {
  let service: DailyKeywordBigEmotionsCntService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyKeywordBigEmotionsCntService],
    }).compile();

    service = module.get<DailyKeywordBigEmotionsCntService>(
      DailyKeywordBigEmotionsCntService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
