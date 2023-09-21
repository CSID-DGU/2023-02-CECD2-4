import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisCommentService } from './analysis-comment.service';
import { AnalysisCommentController } from './analysis-comment.controller';
import { AnalysisComment } from './entity/analysis-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnalysisComment])],
  providers: [AnalysisCommentService],
  controllers: [AnalysisCommentController],
})
export class AnalysisCommentModule {}
