import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { AnalysisComment } from '../../analysis-comment/entity/analysis-comment.entity';
import { Keyword } from '../../keyword/keyword.entity';

export class KeywordWithTopCommentsReqQueryDto {
  /**
   * 검색하는 키워드
   * @example 윤석열
   */
  @IsString()
  name: string;

  /**
   * 검색 시작일
   * @example 2000-01-01
   */
  @IsString()
  @IsOptional()
  from: string;

  /**
   * 검색 끝일
   * @example 2099-01-01
   */
  @IsString()
  @IsOptional()
  to: string;
}

export class OutKeywordDto implements Pick<Keyword, 'id' | 'name'> {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

export class OutCommentDto
  implements
    Omit<
      AnalysisComment,
      'link' | 'keyword_id' | 'news_sentences' | 'keyword' | 'createdAt'
    >
{
  @Expose()
  id: number;
  @Expose()
  content: string;
  @Expose()
  sympathy: number;
  @Expose()
  antipathy: number;
  @Expose()
  emotion: string;
}

export class KeywordWithTopCommentsResDto {
  @Expose()
  keyword: OutKeywordDto;

  @Expose()
  comments: OutCommentDto[];
}
