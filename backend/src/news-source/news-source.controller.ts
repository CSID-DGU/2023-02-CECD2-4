import { Body, Controller, Get, Post } from '@nestjs/common';
import { NewsSourceService } from './news-source.service';
import { PostNewsSourceDto } from './dtos/post-news-source.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('News Source')
@Controller('news-sources')
export class NewsSourceController {
  constructor(private nsService: NewsSourceService) {}
  /**
   * 현재 크롤링 대상인 뉴스 언론사 목록을 가져온다
   */
  @Get()
  async getAllNewsSource() {
    return await this.nsService.findMany();
  }
  /**
   * 뉴스 언론사를 추가. ID 값은 중복X
   */
  @Post()
  async postNewsSource(@Body() dto: PostNewsSourceDto) {
    const { media_id, media_name } = dto;
    return await this.nsService.create(media_id, media_name);
  }
}
