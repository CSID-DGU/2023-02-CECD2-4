import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
/**
 * access token에서 꺼낸 유저 정보
 */
export const AdminParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return req.user;
  },
);
