import { BadRequestException, Injectable } from '@nestjs/common';
import { checkPassword, generatePassword } from './util/password';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(private adminService: AdminService) {}

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
    return user;
  }
}
