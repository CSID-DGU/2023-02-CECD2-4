import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenService } from './token.service';
import { TokenInfo } from './tokeninfo/tokeninfo.entity';
import { TokenInfoService } from './tokeninfo/tokenInfo.service';
import { TokenValidator } from './token.validator';

@Module({
  imports: [TypeOrmModule.forFeature([TokenInfo]), JwtModule.register({})],
  providers: [TokenService, TokenInfoService, TokenValidator],
  exports: [TokenService],
})
export class TokenModule {}
