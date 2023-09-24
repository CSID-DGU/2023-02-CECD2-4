import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';
import { Keyword } from './keyword.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Keyword])],
  providers: [KeywordService],
  controllers: [KeywordController],
})
export class KeywordModule {}
