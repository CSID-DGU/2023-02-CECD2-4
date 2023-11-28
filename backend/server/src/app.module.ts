import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configOption } from './util/options/config.option';
import { typeormAsyncOptions } from './util/options/typeorm.option';

import { AuthModule } from './auth/auth.module';
import { AnalysisCommentModule } from './analysis-comment/analysis-comment.module';
import { BatchModule } from './batch/batch.module';
import { DailyKeywordBigEmotionsCntModule } from './daily-keyword-big-emotions-cnt/daily-keyword-big-emotions-cnt.module';
import { KeywordModule } from './keyword/keyword.module';
import { NewsSourceModule } from './news-source/news-source.module';
import { RedisModule } from './redis/redis.module';
import { SearchModule } from './search/search.module';
import { TokenModule } from './token/token.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(configOption),
    TypeOrmModule.forRootAsync(typeormAsyncOptions),
    KeywordModule,
    NewsSourceModule,
    AnalysisCommentModule,
    AuthModule,
    TokenModule,
    RedisModule,
    SearchModule,
    BatchModule,
    DailyKeywordBigEmotionsCntModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
