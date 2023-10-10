import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { OutAdminDto } from './out-admin.dto';

export class SigninReqDto {
  /**
   * 로그인 ID
   * @example 'admin001'
   */
  @IsString()
  login_id: string;

  /**
   * 비밀번호
   * @example 'admintest123'
   */
  @IsString()
  password: string;
}

class TokenInfoDto {
  @Expose()
  access_token: string;

  @Expose()
  expiration_date: string;

  @Expose()
  refresh_token: string;
}

export class SigninResDto {
  @Expose()
  @Type(() => OutAdminDto)
  user: OutAdminDto;

  @Expose()
  @Type(() => TokenInfoDto)
  token_info: TokenInfoDto;
}
