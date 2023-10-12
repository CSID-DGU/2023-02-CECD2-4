/**
 * 초 단위로 표현된 refresh token의 유지 기간
 */
export const REFRESH_MAX_AGE = 3 * 24 * 60 * 60;

/**
 * 초 단위로 표현된 access_token의 유지 기간
 */
export const ACCESS_MAX_AGE = 5 * 60;

/**
 * ms 단위로 표현된 access_token의 유지 기간
 */
export const ACCESS_MAX_AGE_MS = ACCESS_MAX_AGE * 1000;

/**
 * refresh token 이름. cookie에 지정된다.
 */

export const REFRESH_TOKEN_NAME = 'refresh_token';
