import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { IOutAdminUser } from '../admin/util/admin.type';
import { TokenValidator } from './token.validator';
import { TokenInfoService } from './tokeninfo/tokenInfo.service';
import {
  AccessTokenInfo,
  AccessTokenObj,
  RefreshTokenObj,
} from './util/token.type';
import { ACCESS_MAX_AGE_MS, REFRESH_MAX_AGE } from './util/constant';

@Injectable()
export class TokenService {
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    private tokeninfoService: TokenInfoService,
    private tokenValidator: TokenValidator,
  ) {}

  /**
   * access_token을 검증하고, 결과를 반환한다.
   */
  async verifyAccessToken(access_token: string): Promise<AccessTokenObj> {
    const exception_message = 'access token is not valid';
    let payload: AccessTokenObj;
    try {
      // refresh token 인증
      payload = await this.jwtService.verifyAsync(access_token, {
        secret: this.config.get('JWT_ACCESS_SECRET'),
      });
    } catch {
      throw new UnauthorizedException(exception_message);
    }
    // access token 내부 값 검증 -> AccessTokenType
    const isValid = this.tokenValidator.validateAccessToken(payload);
    if (!isValid) {
      throw new UnauthorizedException(exception_message);
    }

    return payload;
  }
  /**
   * refresh_token을 이용하여 access_token을 갱신한다.
   * @param refresh_token 갱신 토큰
   */
  async refreshAccessToken(refresh_token: string): Promise<AccessTokenInfo> {
    const exception_message = 'refresh token is not valid';
    let payload: RefreshTokenObj;

    try {
      // refresh token 인증
      payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException(exception_message);
    }
    // refresh token 내부 값 검증 -> RefreshTokenType
    const isValid = this.tokenValidator.validateRefreshToken(payload);
    if (!isValid) {
      throw new UnauthorizedException(exception_message);
    }

    // refresh key 비교 -> 다르면 이미 만료된 토큰
    const tokenInfo = await this.tokeninfoService.getTokenInfo(payload.data.id);
    if (!tokenInfo || tokenInfo.refresh_key != payload.refresh_key) {
      throw new UnauthorizedException(exception_message);
    }

    // access token 만들어서 반환
    const access_token = await this.signAccessTokenWithExp(payload.data);
    return access_token;
  }

  /**
   * access token을 생성한다. 토큰 서비스 내부적으로만 사용
   */
  async signAccessTokenWithExp(
    payload: IOutAdminUser,
  ): Promise<AccessTokenInfo> {
    const inner_payload: AccessTokenObj = {
      data: payload,
    };
    const access_token = await this.jwtService.signAsync(inner_payload, {
      expiresIn: '5m',
      secret: this.config.get('JWT_ACCESS_SECRET'),
    });
    const expiration_date = new Date(
      Date.now() + ACCESS_MAX_AGE_MS,
    ).toUTCString();

    return { access_token, expiration_date };
  }

  /**
   * refresh token을 생성한다. 토큰 서비스 내부적으로만 사용
   */
  async signRefreshToken(payload: IOutAdminUser): Promise<string> {
    const { refresh_key } = await this.tokeninfoService.updateTokenInfo(
      payload.id,
    );
    const inner_payload: RefreshTokenObj = {
      data: payload,
      refresh_key: refresh_key!,
    };
    const refresh_token = await this.jwtService.signAsync(inner_payload, {
      expiresIn: REFRESH_MAX_AGE,
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });
    return refresh_token;
  }
}
