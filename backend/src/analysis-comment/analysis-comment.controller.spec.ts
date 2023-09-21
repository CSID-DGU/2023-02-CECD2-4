import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisCommentController } from './analysis-comment.controller';

describe('AnalysisCommentController', () => {
  let controller: AnalysisCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalysisCommentController],
    }).compile();

    controller = module.get<AnalysisCommentController>(
      AnalysisCommentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
