import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { PopularKeywordsReqQueryDto } from './dtos/popular-keyword.dto';
import { Keyword } from '../keyword/keyword.entity';

jest.mock('./search.service');

describe('SearchController', () => {
  let controller: SearchController;
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [SearchService],
    }).compile();

    controller = module.get<SearchController>(SearchController);
    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPopularKeywords()', () => {
    it('should return {id, description, name}[]', async () => {
      const dummy_query: PopularKeywordsReqQueryDto = {
        count: 1,
      };
      const expected = [{ id: 0, description: 'test', name: 'test' }];

      jest
        .spyOn(service, 'getManyPopularKeywords')
        .mockImplementationOnce(() => {
          return Promise.resolve<Keyword[]>([
            {
              id: 0,
              name: 'test',
              createdAt: new Date(),
              deletedAt: new Date(),
              updatedAt: new Date(),
              isActive: true,
              description: 'test',
            },
          ]);
        });

      const result = await controller.getPopularKeywords(dummy_query);
      expect(service.getManyPopularKeywords).toBeCalled();
      expect(result).toEqual(expected);
    });
  });

  describe('getKeywordWithTopComments()', () => {
    it('should call service.getKeywordWithTopCommentsForEmotion', async () => {
      const dummy_input = {
        name: 'test',
        from: '0000-00-00',
        to: '0000-00-00',
      };

      await controller.getKeywordWithTopComments(dummy_input);

      expect(service.getKeywordWithTopCommentsForEmotion).toBeCalled();
    });
  });

  describe('getKeywordWithTopComments()', () => {
    it('should call service.getCommentWithSentences', async () => {
      const dummy_id = 0;

      await controller.getCommentWithSentences(dummy_id);

      expect(service.getCommentWithSentences).toBeCalled();
    });
  });
});
