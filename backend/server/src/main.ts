import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { swaggerSetup } from './util/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerSetup(app);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // dto에 정의된 타입으로 변경
      transformOptions: {
        enableImplicitConversion: true, // Transform 명시 안해도 알아서 처리해줌
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
