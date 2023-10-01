import { Controller, Body, Get, Post, Put, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateKeywordDto } from './dtos/create-keyword.dto';
import { KeywordService } from './keyword.service';
import { UpdateKeywordDto } from './dtos/update-keyword.dto';
import { Keyword } from './keyword.entity';

@ApiTags('Keyword')
@Controller('keywords')
export class KeywordController {
  constructor(private keywordService: KeywordService) {}
  /**
   * 키워드를 생성. 유저 관련 정보는 쿠키에서 추출.
   */
  @ApiResponse({
    status: 400,
    description: '이미 저장된 키워드를 삽입하는 경우 에러 발생',
  })
  @ApiResponse({
    status: 200,
    description: '정상적으로 키워드 생성',
    type: () => Keyword,
  })
  @Post()
  @HttpCode(200)
  async createKeyword(@Body() dto: CreateKeywordDto) {
    const keyword = await this.keywordService.create(dto, 1);
    return keyword;
  }

  /**
   * 키워드를 갱신. description 및 isActive 수정 가능
   */
  @Put()
  async updateKeyword(@Body() dto: UpdateKeywordDto) {
    const keyword = await this.keywordService.update(dto, 1);
    return keyword;
  }
  /**
   * 키워드 목록을 반환
   */
  @Get()
  async getKeyword() {
    return await this.keywordService.findMany();
  }
}
