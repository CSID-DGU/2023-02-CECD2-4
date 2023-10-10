import { BadRequestException, Injectable } from '@nestjs/common';
import { checkPassword, generatePassword } from './util/password';
import { AdminService } from '../admin/admin.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private tokenService: TokenService,
  ) {}

  /**
   * 유저를 생성하는 코드
   */
  async signup(login_id: string, password: string, name: string) {
    // 유저 존재 확인
    const adminExist = await this.adminService.isExist(login_id);
    if (adminExist) {
      throw new BadRequestException('user already exist');
    }
    // 비밀번호 해싱
    const stored_password = await generatePassword(password);
    const user = await this.adminService.create(
      login_id,
      stored_password,
      name,
    );

    return user;
  }

  /**
   * 유저 로그인과 관련된 코드.
   */
  async signin(login_id: string, password: string) {
    const errorMessage = 'something wrong with email or password';
    const user = await this.adminService.findByLoginId(login_id);
    if (!user) {
      // 해당되는 유저가 없음
      throw new BadRequestException(errorMessage);
    }
    const passMatch = await checkPassword(password, user.password);
    if (!passMatch) {
      throw new BadRequestException(errorMessage);
    }
    const token_info = await this.tokenService.signTokens(user.id, {
      id: user.id,
      name: user.name,
    });
    return {
      user,
      token_info,
    };
  }
  /**
   * 토큰을 갱신하고, 관련된 정보를 반환한다.
   */
  async refresh(refresh_token: string) {
    const token_info =
      await this.tokenService.refreshAccessToken(refresh_token);
    return token_info;
  }
}
