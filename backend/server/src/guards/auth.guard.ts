import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request as NextRequest } from 'express';
import { Observable } from 'rxjs';
// request에서 쿠키 뽑고, 쿠키 내용 기반으로 처리
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<NextRequest>();
    console.log(req.cookies['access_token']);
    console.log(req.cookies['refresh_token']);
    return true;
  }
}
