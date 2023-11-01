import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SearchModule } from 'src/search/search.module';

@Module({
  imports: [ScheduleModule.forRoot(), SearchModule],
  providers: [BatchService],
})
export class BatchModule {}
