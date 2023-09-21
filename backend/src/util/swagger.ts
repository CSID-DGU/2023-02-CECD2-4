import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
/**
 * @link swagger 파일: http://localhost:3000/api
 * @link json 추출: http://localhost:3000/api-json
 * @param app 동작하고 있는 nest application
 */
export function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('팀바나나 API 목록')
    .setDescription('팀 바나나에서 사용하는 API입니다')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
