import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisCommentController } from './analysis-comment.controller';
import { AnalysisCommentService } from './analysis-comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { AuthGuard } from '../auth/auth.guard';

jest.mock('./analysis-comment.service');
jest.mock('../auth/auth.guard');

describe('AnalysisCommentController', () => {
  let controller: AnalysisCommentController;
  let service: AnalysisCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalysisCommentController],
      providers: [AnalysisCommentService, AuthGuard],
    }).compile();

    controller = module.get<AnalysisCommentController>(
      AnalysisCommentController,
    );
    service = module.get<AnalysisCommentService>(AnalysisCommentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createComment()', () => {
    it('call commentService.create', async () => {
      // dummy data
      const dummyDto: CreateCommentDto = {
        antipathy: 0,
        sympathy: 0,
        content: '',
        createdAt: new Date(),
        emotion: '',
        keyword_id: 0,
        link: '',
        news_sentences: [],
      };
      // action
      await controller.createComment(dummyDto);
      // assert
      expect(service.create).toBeCalled();
    });
  });

  describe('getComments()', () => {
    it('call commentService.getComments', async () => {
      // dummy data
      const comment_id = 1;
      // action
      await controller.getComment(comment_id);
      // assert
      expect(service.findManyWithQuery).toBeCalled();
    });
  });
});
