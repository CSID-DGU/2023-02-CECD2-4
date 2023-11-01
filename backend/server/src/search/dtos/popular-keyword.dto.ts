import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { OutKeywordDto } from './common/out-keyword.dto';

export class PopularKeywordsReqQueryDto {
  /**
   * 한번에 가져올 키워드 개수
   * @example 3
   */
  @IsInt()
  @IsPositive()
  @IsOptional()
  count?: number = 10;
}

export class PopularKeywordsResDto extends OutKeywordDto {}
