import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { randomBytes } from 'crypto';

import { TokenInfo } from './tokeninfo.entity';
import { Repository } from 'typeorm';
// import { AdminUser } from 'src/admin/admin.entity';

@Injectable()
export class TokenInfoService {
  constructor(
    @InjectRepository(TokenInfo) private tokenRepo: Repository<TokenInfo>,
  ) {}

  /**
   * 토큰 정보를 갱신하고, 갱신된 값을 가져온다. 로그인 시 토큰 갱신에 사용된다.
   */
  async updateTokenInfo(user_id: number) {
    const error_message = 'User Not Defined';
    if (user_id === undefined || user_id === null || isNaN(user_id))
      throw new UnauthorizedException(error_message);

    let tokenInfo = await this.tokenRepo.findOneBy({ user_id });
    if (!tokenInfo) {
      tokenInfo = this.tokenRepo.create();
      tokenInfo.user_id = user_id;
    }

    // 키 갱신
    const refresh_key = randomBytes(32).toString('hex');
    tokenInfo.refresh_key = refresh_key;
    // 토큰 정보 생성할 수 없는 경우 -> user_id 기반으로 생성 불가능
    try {
      tokenInfo = await this.tokenRepo.save(tokenInfo);
    } catch (e) {
      throw new UnauthorizedException(error_message);
    }
    return tokenInfo;
  }

  /**
   * 토큰 정보를 가져온다.
   */
  async getTokenInfo(user_id: number) {
    if (user_id === undefined || user_id === null || isNaN(user_id))
      throw new UnauthorizedException(`User Not Defined`);
    const tokenInfo = await this.tokenRepo.findOneBy({ user_id });
    return tokenInfo;
  }
}
