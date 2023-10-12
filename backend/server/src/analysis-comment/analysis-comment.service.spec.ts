import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisCommentService } from './analysis-comment.service';

describe('AnalysisCommentService', () => {
  let service: AnalysisCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalysisCommentService],
    }).compile();

    service = module.get<AnalysisCommentService>(AnalysisCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
