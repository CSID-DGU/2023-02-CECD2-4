import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';
import { Keyword } from './keyword.entity';
import { KeywordHistory } from './keyword-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Keyword, KeywordHistory])],
  providers: [KeywordService],
  controllers: [KeywordController],
})
export class KeywordModule {}
