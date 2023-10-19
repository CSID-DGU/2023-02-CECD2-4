import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import Redis from 'ioredis';
import { randomBytes } from 'crypto';

import { RedisToken } from '../../redis/redis.provider';
import { REFRESH_MAX_AGE } from '../util/constant';

@Injectable()
export class TokenInfoService {
  constructor(@Inject(RedisToken) private redisStore: Redis) {}

  /**
   * 토큰 정보를 갱신하고, 갱신된 값을 가져온다. 로그인 시 토큰 갱신에 사용된다.
   */
  async updateTokenInfo(user_id: number) {
    const token_key = this.getTokenKey(user_id);
    const refresh_key = randomBytes(32).toString('hex');
    const result = await this.redisStore.set(
      token_key,
      refresh_key,
      'EX',
      REFRESH_MAX_AGE,
    );

    if (result == 'OK') return refresh_key;
  }

  /**
   * 토큰 정보를 가져온다.
   * @returns {string} refresh_key
   */
  async getTokenInfo(user_id: number) {
    const key = this.getTokenKey(user_id);
    const refresh_key = await this.redisStore.get(key);
    return refresh_key;
  }

  /**
   * 토큰 이름을 가져온다.
   * @returns {string} refresh_key
   */
  private getTokenKey(user_id: number) {
    if (user_id === undefined || user_id === null || isNaN(user_id))
      throw new UnauthorizedException('User Not Defined');
    return `refresh:uid:${user_id}`;
  }
}
