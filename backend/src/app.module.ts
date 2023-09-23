import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormAsyncOptions } from './util/options/typeorm.option';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalysisCommentModule } from './analysis-comment/analysis-comment.module';
import { configOption } from './util/options/config.option';
import { KeywordModule } from './keyword/keyword.module';
import { NewsSourceModule } from './news-source/news-source.module';

@Module({
  imports: [
    AnalysisCommentModule,
    ConfigModule.forRoot(configOption),
    TypeOrmModule.forRootAsync(typeormAsyncOptions),
    KeywordModule,
    NewsSourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
