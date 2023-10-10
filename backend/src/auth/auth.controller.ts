import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { AuthService } from './auth.service';
import { SigninResDto, SigninReqDto } from './dtos/signin.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize.interceptor';
import { RefreshReqDto, RefreshResDto } from './dtos/refresh.dto';

@ApiTags('auth')
@Controller('auth')
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
    description: '로그인 성공, 일부 유저정보 및 토큰 관련  정보 반환',
    type: () => SigninResDto,
  })
  @ApiResponse({
    status: 400,
    description: '로그인 실패(유저 X, 비밀번호 매칭 X 포함)',
  })
  @Post('/signin')
  @HttpCode(200)
  @Serialize(SigninResDto)
  async signin(@Body() dto: SigninReqDto): Promise<SigninResDto> {
    const { login_id, password } = dto;
    const login_info = await this.authService.signin(login_id, password);
    console.log(login_info);
    return login_info;
  }

  @ApiResponse({
    status: 200,
    description: 'access token을 갱신. 갱신된 토큰 및 만료일 반환',
    type: () => RefreshResDto,
  })
  @Post('/refresh')
  async refresh(@Body() dto: RefreshReqDto) {
    return await this.authService.refresh(dto.refresh_token);
  }
}
