import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from './token.service';
import { TokenInfoService } from './tokeninfo/tokenInfo.service';
import { TokenValidator } from './token.validator';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [JwtModule.register({}), RedisModule],
  providers: [TokenService, TokenInfoService, TokenValidator],
  exports: [TokenService],
})
export class TokenModule {}
