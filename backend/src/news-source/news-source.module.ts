import { Module } from '@nestjs/common';
import { NewsSourceController } from './news-source.controller';
import { NewsSourceService } from './news-source.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsSource } from './news-source.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsSource])],
  controllers: [NewsSourceController],
  providers: [NewsSourceService],
})
export class NewsSourceModule {}
