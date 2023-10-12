import { Test, TestingModule } from '@nestjs/testing';
import { NewsSourceService } from './news-source.service';

describe('NewsSourceService', () => {
  let service: NewsSourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsSourceService],
    }).compile();

    service = module.get<NewsSourceService>(NewsSourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
