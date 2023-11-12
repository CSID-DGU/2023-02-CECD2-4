import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';
/**
 * 댓글 검색에 사용되는 쿼리 목록
 */
export class GetCommentsQueriesReqDto {
  /**
   * 검색어
   * @example 윤석열
   */
  @IsString()
  search: string;

  /**
   * 댓글 검색에 사용되는 id 값
   * @example 10
   */
  @IsNumber()
  @IsOptional()
  head_id?: number;

  /**
   * 댓글 한 페이지 크기
   * @example 10
   */
  @IsNumber()
  @IsOptional()
  psize?: number = 10;

  /**
   * 수집하는 시작 날짜
   * @example '2023-09-25'
   */
  @IsDateString()
  @IsOptional()
  from?: string;

  /**
   * 수집하는 끝 날짜
   * @example '2023-09-26'
   */
  @IsDateString()
  @IsOptional()
  to?: string;
}
