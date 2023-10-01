import { IsString } from 'class-validator';

export class SigninDto {
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
