import { Module } from '@nestjs/common';
import { DailyKeywordBigEmotionsCntController } from './daily-keyword-big-emotions-cnt.controller';
import { DailyKeywordBigEmotionsCntService } from './daily-keyword-big-emotions-cnt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyKeywordBigEmotionsCnt } from './daily-keyword-big-emotions-cnt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyKeywordBigEmotionsCnt])],
  controllers: [DailyKeywordBigEmotionsCntController],
  providers: [DailyKeywordBigEmotionsCntService],
})
export class DailyKeywordBigEmotionsCntModule {}
