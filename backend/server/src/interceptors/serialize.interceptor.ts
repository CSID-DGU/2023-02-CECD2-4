import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private ctor: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((item) => {
        return plainToInstance(this.ctor, item, {
          excludeExtraneousValues: true, // 이외의 값이 존재하면 지우고 내보낸다
        });
      }),
    );
  }
}

export function Serialize<T>(ctor: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(ctor));
}