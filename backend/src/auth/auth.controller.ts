import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { OutAdminDto } from './dtos/out-admin.dto';

@ApiTags('auth')
@Controller('auth')
@Serialize(OutAdminDto)
export class AuthController {
  constructor(private authService: AuthService) {}
  /**
   * 계정 생성
   */
  @ApiResponse({
    status: 201,
    description: '계정 생성 성공, 일부 유저 정보 반환',
    type: () => OutAdminDto,
  })
  @ApiResponse({
    status: '4XX',
    description: '계정을 생성할 수 없는 경우. 에러 반환',
  })
  @Post('/signup')
  async signup(@Body() dto: SignupDto) {
    const { login_id, password, name } = dto;
    const admin = this.authService.signup(login_id, password, name);
    return admin;
  }
  /**
   * 계정 로그인
   */
  @ApiResponse({
    status: 200,
    description: '로그인 성공, 일부 유저 정보 반환',
    type: () => OutAdminDto,
  })
  @ApiResponse({
    status: '4XX',
    description: '로그인 실패(유저 X, 비밀번호 매칭 X 포함)',
  })
  @Post('/signin')
  @HttpCode(200)
  async signin(@Body() dto: SigninDto) {
    const { login_id, password } = dto;
    const admin = await this.authService.signin(login_id, password);
    return admin;
  }
}
