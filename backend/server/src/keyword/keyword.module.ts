import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';
import { Keyword } from './keyword.entity';
import { KeywordHistory } from './keyword-history.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Keyword, KeywordHistory]), AuthModule],
  providers: [KeywordService],
  controllers: [KeywordController],
})
export class KeywordModule {}
