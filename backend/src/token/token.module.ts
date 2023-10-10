import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenInfo } from './tokeninfo/tokeninfo.entity';
import { TokenInfoService } from './tokeninfo/tokenInfo.service';
import { TokenValidator } from './token.validator';

@Module({
  imports: [TypeOrmModule.forFeature([TokenInfo])],
  providers: [TokenService, TokenInfoService, TokenValidator],
  exports: [TokenService],
})
export class TokenModule {}
