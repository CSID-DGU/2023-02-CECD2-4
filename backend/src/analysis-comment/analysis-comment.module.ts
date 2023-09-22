import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisCommentService } from './analysis-comment.service';
import { AnalysisCommentController } from './analysis-comment.controller';
import { AnalysisComment } from './entity/analysis-comment.entity';
import { ArticleContent } from './entity/article-content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnalysisComment, ArticleContent])],
  providers: [AnalysisCommentService],
  controllers: [AnalysisCommentController],
})
export class AnalysisCommentModule {}
