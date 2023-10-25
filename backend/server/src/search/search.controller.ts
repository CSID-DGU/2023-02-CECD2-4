import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Keyword } from 'src/keyword/keyword.entity';
import { ReqPopularKeywordQueryDto } from './dtos/popular-keyword.dto';
import { SearchService } from './search.service';
import {
  KeywordWithTopCommentsReqQueryDto,
  KeywordWithTopCommentsResDto,
} from './dtos/keyword-with-top-comments.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private service: SearchService) {}
  /**
   * 이슈가 되는 키워드 목록을 반환
   */
  @ApiResponse({
    status: 200,
    description: '중요한 키워드 목록을 반환한다.',
    type: () => Keyword,
  })
  @Get('popular-keyword')
  async getPopularKeywords(
    @Query() dto: ReqPopularKeywordQueryDto,
  ): Promise<Keyword[]> {
    return await this.service.findManyPopularKeyword(dto.count!);
  }

  /**
   * 키워드 정보 및 기간 내 감정 별 공감 수 최대 댓글 반환
   */
  @ApiResponse({
    status: 200,
    type: () => KeywordWithTopCommentsResDto,
  })
  @Serialize(KeywordWithTopCommentsResDto)
  @Get('top-comments')
  async getTopComments(@Query() dto: KeywordWithTopCommentsReqQueryDto) {
    const { keyword, from, to } = dto;
    return await this.service.getKeywordWithTopCommentsForEmotion(
      keyword,
      from,
      to,
    );
  }
}
