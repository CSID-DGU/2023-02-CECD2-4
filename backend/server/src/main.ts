import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { swaggerSetup } from './util/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV !== 'production') {
    swaggerSetup(app);
  }

  const frontPath = process.env.FRONT_ORIGIN;
  app.enableCors({
    origin: frontPath,
    credentials: true,
  });
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // dto에 정의 안된 프로퍼티는 제거
      transform: true, // dto에 정의된 타입으로 변경
      transformOptions: {
        enableImplicitConversion: true, // Transform 명시 안해도 알아서 처리해줌
      },
    }),
  );
  //console.log("hello!");
  await app.listen(8080);
}
bootstrap();
