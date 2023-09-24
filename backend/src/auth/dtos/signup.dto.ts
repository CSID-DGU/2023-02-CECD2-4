import { IsString } from 'class-validator';

export class SignupDto {
  /**
   * 로그인 시 사용할 ID 값
   * @example admin001
   */
  @IsString()
  login_id: string;

  /**
   * 비밀번호
   * @example admintest123
   */
  @IsString()
  password: string;

  /**
   * 관리자 이름
   * @example test
   */
  @IsString()
  name: string;
}
