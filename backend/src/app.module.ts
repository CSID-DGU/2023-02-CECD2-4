import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configOption } from './util/options/config.option';
import { typeormAsyncOptions } from './util/options/typeorm.option';

import { AnalysisCommentModule } from './analysis-comment/analysis-comment.module';
import { KeywordModule } from './keyword/keyword.module';
import { NewsSourceModule } from './news-source/news-source.module';
import { AuthModule } from './auth/auth.module';

import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOption),
    TypeOrmModule.forRootAsync(typeormAsyncOptions),
    KeywordModule,
    NewsSourceModule,
    AnalysisCommentModule,
    AuthModule,
    TokenModule,
  ],
})
export class AppModule {}
