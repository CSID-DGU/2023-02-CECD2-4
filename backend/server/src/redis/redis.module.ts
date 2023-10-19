import { Module } from '@nestjs/common';
import { RedisToken, redisProvider } from './redis.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [redisProvider],
  exports: [RedisToken],
})
export class RedisModule {}
