import {
  Controller,
  Post,
  Body,
  HttpCode,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { SignupDto } from './dtos/signup.dto';
import { AuthService } from './auth.service';
import { SigninResDto, SigninReqDto } from './dtos/signin.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { RefreshResDto } from './dtos/refresh.dto';
import { REFRESH_MAX_AGE, REFRESH_TOKEN_NAME } from '../token/util/constant';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
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
    description: '계정을 생성할 수 없는 경우. 에러 반환',
  })
  @ApiResponse({
    status: 401,
    description: '계정 생성 권한을 만족하지 않음',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
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
    description: '로그인 성공, 일부 유저정보 및 토큰 관련 정보 반환',
    type: () => SigninResDto,
  })
  @ApiResponse({
    status: 400,
    description: '로그인 실패(유저 X, 비밀번호 매칭 X 포함)',
  })
  @Serialize(SigninResDto)
  @Post('/signin')
  @HttpCode(200)
  async signin(
    @Body() dto: SigninReqDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SigninResDto> {
    const { login_id, password } = dto;
    const { user, access_token, refresh_token } = await this.authService.signin(
      login_id,
      password,
    );
    //refresh token은 쿠키로 전달
    res.cookie(REFRESH_TOKEN_NAME, refresh_token, {
      maxAge: REFRESH_MAX_AGE,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return {
      user,
      token_info: access_token,
    };
  }

  /**
   * 로그아웃. refresh token을 쿠키에서 지운다.
   */
  @ApiResponse({
    status: 200,
    description: '로그아웃 성공',
  })
  @Get('/signout')
  @HttpCode(200)
  async signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(REFRESH_TOKEN_NAME, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return;
  }

  /**
   * access token을 갱신. 갱신된 토큰 및 만료일 반환. refresh token은 쿠키에서 가져온다.
   */
  @ApiResponse({
    status: 201,
    description: '갱신된 access token 관련 정보',
    type: () => RefreshResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'refresh token이 유효하지 않음',
  })
  @Get('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RefreshResDto> {
    const refresh_token = req.cookies[REFRESH_TOKEN_NAME];
    try {
      return await this.authService.refresh(refresh_token);
    } catch (e) {
      // 토큰이 유효하지 않은 경우 -> 토큰을 삭제하고 에러 메시지 반환
      res.clearCookie(REFRESH_TOKEN_NAME);
      throw e;
    }
  }
}
