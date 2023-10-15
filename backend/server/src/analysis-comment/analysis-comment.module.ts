import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisCommentService } from './analysis-comment.service';
import { AnalysisCommentController } from './analysis-comment.controller';
import { AnalysisComment } from './entity/analysis-comment.entity';
import { ArticleContent } from './entity/article-content.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnalysisComment, ArticleContent]),
    AuthModule,
  ],
  providers: [AnalysisCommentService],
  controllers: [AnalysisCommentController],
})
export class AnalysisCommentModule {}
