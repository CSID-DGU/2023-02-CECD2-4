import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { OutAdminDto } from './out-admin.dto';
import { AccessTokenDto } from './access-token.dto';

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

export class SigninResDto {
  @Expose()
  @Type(() => OutAdminDto)
  user: OutAdminDto;

  @Expose()
  @Type(() => AccessTokenDto)
  token_info: AccessTokenDto;
}
