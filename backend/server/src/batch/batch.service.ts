import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { SearchService } from 'src/search/search.service';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);
  constructor(private searchService: SearchService) {}

  @Cron('0 0 0 * * *')
  async runSchedule() {
    try {
      const result = await this.searchService.clearPopularKeywords();
      this.logger.log(`clear popular keyword list. delete count: ${result}`);
    } catch (e) {
      this.logger.error('wrong with clearPopKeywords', e);
    }
  }
}
