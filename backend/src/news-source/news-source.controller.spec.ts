import { Test, TestingModule } from '@nestjs/testing';
import { NewsSourceController } from './news-source.controller';

describe('NewsSourceController', () => {
  let controller: NewsSourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsSourceController],
    }).compile();

    controller = module.get<NewsSourceController>(NewsSourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
