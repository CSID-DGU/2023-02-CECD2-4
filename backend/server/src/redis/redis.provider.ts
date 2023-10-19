import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const RedisToken = Symbol('redis');

export const redisProvider: FactoryProvider = {
  provide: RedisToken,
  inject: [ConfigService],
  useFactory(config: ConfigService): Redis {
    const port = config.get('REDIS_PORT');
    const host = config.get('REDIS_HOST');
    const redis = new Redis({
      port,
      host,
    });
    return redis;
  },
};
