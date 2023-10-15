import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request as NextRequest } from 'express';
import { TokenService } from '../token/token.service';
// request에서 쿠키 뽑고, 쿠키 내용 기반으로 처리
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<NextRequest>();
    const auth_header = req.headers['authorization'];

    // 헤더가 설정되지 않은 경우 -> 거절
    if (!auth_header)
      throw new UnauthorizedException('no authorization header');

    // Bearer이 아니거나, 토큰이 없는 경우 -> 거절
    const [key, value] = auth_header.split(' ');
    if (key != 'Bearer' || !value)
      throw new UnauthorizedException('invalid authorization header');

    const { data: user } = await this.tokenService.verifyAccessToken(value);
    req.user = user;

    return true;
  }
}
