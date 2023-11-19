import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { DailyKeywordBigEmotionsCnt } from './daily-keyword-big-emotions-cnt.entity';

@Injectable()
export class DailyKeywordBigEmotionsCntService {
  constructor(
    @InjectRepository(DailyKeywordBigEmotionsCnt)
    private repo: Repository<DailyKeywordBigEmotionsCnt>,
  ) {}

  async getdkbmCounts(keyword_id: number, from: Date, to: Date) {
    return await this.repo.find({
      where: {
        keyword_id: keyword_id,
        date: Between(from, to),
      },
    });
  }
}
