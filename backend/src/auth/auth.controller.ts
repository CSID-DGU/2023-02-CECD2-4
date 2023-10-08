import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  HttpCode,
} from '@nestjs/common';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { SignupDto } from './dtos/signup.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize.interceptor';
import { OutAdminDto } from './dtos/out-admin.dto';

@ApiTags('auth')
@Controller('auth')
@Serialize(OutAdminDto)
export class AuthController {
  constructor(private authService: AuthService) {}
  /**
   * 계정을 생성한다.
   */
  @ApiResponse({
    status: 201,
    description: '계정 생성 성공. 아무것도 반환 안함',
  })
  @ApiResponse({
    status: 400,
    description: '계정을 생성할 수 없는 경우, 에러 반환',
  })
  @Post('/signup')
  async signup(@Body() dto: SignupDto) {
    const { login_id, password, name } = dto;
    await this.authService.signup(login_id, password, name);
    return;
  }

  /**
   * 계정에 로그인한다.
   */
  @ApiResponse({
    status: 200,
    description: '로그인 성공, 일부 유저 정보 반환',
    type: () => OutAdminDto,
  })
  @ApiResponse({
    status: 400,
    description: '로그인 실패(유저 X, 비밀번호 매칭 X 포함)',
  })
  @Post('/signin')
  @HttpCode(200)
  async signin(@Body() dto: SigninDto) {
    const { login_id, password } = dto;
    const admin = await this.authService.signin(login_id, password);
    return admin;
  }

  /**
   * 계정을 로그아웃한다.
   */
  @Get('/signout')
  @HttpCode(200)
  async signout(
    @Req() req: ExpressRequest,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    return;
  }

  // @Get('/refresh')
  // async refresh(
  //   @Req() req: ExpressRequest,
  //   @Res({ passthrough: true }) res: ExpressResponse,
  // ) {
  //   return;
  // }
}
