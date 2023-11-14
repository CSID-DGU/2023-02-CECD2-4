import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { SearchService } from './search.service';
import { Serialize } from '../interceptors/serialize.interceptor';

import {
  PopularKeywordsReqQueryDto,
  PopularKeywordsResDto,
} from './dtos/popular-keyword.dto';
import {
  KeywordWithTopCommentsReqQueryDto,
  KeywordWithTopCommentsResDto,
} from './dtos/keyword-with-top-comments.dto';

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
    type: () => PopularKeywordsResDto,
  })
  @Serialize(PopularKeywordsResDto)
  @Get('popular-keywords')
  async getPopularKeywords(
    @Query() dto: PopularKeywordsReqQueryDto,
  ): Promise<PopularKeywordsResDto[]> {
    const keywords = await this.service.getManyPopularKeywords(dto.count!);
    const results = keywords.map((keyword) => {
      const { id, description, name } = keyword;
      return { id, description, name };
    });

    return results;
  }

  /**
   * 키워드 정보 및 기간 내 감정 별 공감 수 최대 댓글 반환
   */
  @ApiResponse({
    status: 200,
    type: () => KeywordWithTopCommentsResDto,
  })
  // @Serialize(KeywordWithTopCommentsResDto)
  @Get('keyword-search-result')
  async getKeywordWithTopComments(
    @Query() dto: KeywordWithTopCommentsReqQueryDto,
  ) {
    const { name, from, to } = dto;
    return await this.service.getKeywordWithTopCommentsForEmotion(
      name,
      from,
      to,
    );
  }

  /**
   * 선택한 댓글의 정보를 연관 문장과 함께 가져온다
   */
  @ApiResponse({
    status: 200,
  })
  @Get('detail/comment/:id')
  async getCommentWithSentences(@Param('id') id: number) {
    return await this.service.getCommentWithSentences(id);
  }
}
