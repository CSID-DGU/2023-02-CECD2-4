import { Module } from '@nestjs/common';
import { AnalysisCommentModule } from '../analysis-comment/analysis-comment.module';
import { KeywordModule } from '../keyword/keyword.module';
import { redisProvider } from '../redis/redis.provider';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  imports: [KeywordModule, AnalysisCommentModule],
  providers: [redisProvider, SearchService],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule {}
