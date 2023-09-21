import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';

@Module({
  imports: [TypeOrmModule.forFeature()],
  providers: [KeywordService],
  controllers: [KeywordController],
})
export class KeywordModule {}
