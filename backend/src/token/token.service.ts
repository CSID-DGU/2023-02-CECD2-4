import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { randomBytes } from 'crypto';

import { Token } from './token.entity';
import { Repository } from 'typeorm';
import { MAX_AGE } from '../util/constant';
// import { AdminUser } from 'src/admin/admin.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepo: Repository<Token>,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {}

  /**
   * access_token을 검증하고, 결과를 반환한다.
   */
  async verifyAccessToken(access_token: string) {
    return await this.jwtService.verifyAsync(access_token, {
      secret: this.config.get('JWT_ACCESS_SECRET'),
    });
  }
  /**
   * refresh_token을 이용하여 access_token을 갱신한다
   * @param refresh_token 갱신 토큰
   */
  async refreshAccessToken(user_id: number, refresh_token: string) {
    const { refresh_key, expiration_date } = await this.getTokenInfo(user_id);
    // 토큰이 유효하지 않다면
    if (Date.now() > expiration_date.getTime())
      throw new UnauthorizedException('refresh token is not valid');
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: refresh_key,
      });

      const access_token = await this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_ACCESS_SECRET'),
      });
      return access_token;
    } catch {
      throw new UnauthorizedException('refresh token is not valid');
    }
  }

  async signTokens(user_id: number, payload: any) {
    const access_token = await this.signAccessToken(payload);

    const key = randomBytes(32).toString('hex');
    const { refresh_key } = await this.updateTokenInfo(user_id, key);
    const refresh_token = await this.signRefreshToken(payload, refresh_key);

    return {
      access_token,
      refresh_token,
    };
  }

  private async signAccessToken(payload: any) {
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '5m',
      secret: this.config.get('JWT_ACCESS_SECRET'),
    });
    return access_token;
  }

  private async signRefreshToken(payload: any, refresh_key: string) {
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: MAX_AGE,
      secret: refresh_key,
    });
    return refresh_token;
  }
  /**
   * 토큰 정보를 갱신한다.
   */
  async updateTokenInfo(user_id: number, key: string | null) {
    if (!user_id) throw new UnauthorizedException('User Not Defined');

    let tokenInfo = await this.tokenRepo.findOneBy({ user_id });
    if (!tokenInfo) {
      tokenInfo = this.tokenRepo.create();
      tokenInfo.user_id = user_id;
    }
    // 키 갱신
    tokenInfo.refresh_key = key;
    tokenInfo.expiration_date = new Date(Date.now() + MAX_AGE * 1000); //Date는 ms 단위

    return await this.tokenRepo.save(tokenInfo);
  }

  /**
   * RefreshTokenKey를 가져온다.
   */
  async getTokenInfo(user_id: number) {
    if (!user_id) throw new UnauthorizedException(`User Not Defined`);
    const tokenInfo = await this.tokenRepo.findOne({
      where: {
        user_id,
      },
    });
    return tokenInfo;
  }

  // async saveTokenInfo() {
  //   const tokenInfo = await this.tokenRepo.findOneBy({ user_id });
  // }
}
