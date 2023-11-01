import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  /**
   * 접근 가능한 메인 주소
   */
  @Get()
  sayHello() {
    return `
    <!DOCTYPE html>
<html>
  <head>
    <title>keyword-on</title>
    <meta charset='utf8'>
  </head>
  <body>
    <h1>Keyword-on에 어서 오세요</h1>
    <p>키워드 온 메인 페이지입니다!</p>
  </body>
</html>`;
  }
}
