import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class ReqPopularKeywordQueryDto {
  /**
   * 한번에 가져올 키워드 개수
   * @example 3
   */
  @IsInt()
  @IsPositive()
  @IsOptional()
  count?: number = 10;
}
