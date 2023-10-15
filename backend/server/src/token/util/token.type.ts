import type { IOutAdminUser } from '../../admin/util/admin.type';
/**
 * access token에 들어가는 객체 타입
 */
export interface AccessTokenObj {
  data: IOutAdminUser;
}

/**
 * refresh token을 구성하는 객체 타입
 */
export interface RefreshTokenObj {
  data: IOutAdminUser;
  refresh_key: string;
}

/**
 * access token을 구성하는 정보들. 토큰 및 만료 시간
 */
export interface AccessTokenInfo {
  access_token: string;
  expiration_date: string;
}
