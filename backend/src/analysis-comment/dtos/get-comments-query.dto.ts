import { IsString, IsNumber, IsOptional } from 'class-validator';
/**
 * 댓글 검색에 사용되는 쿼리 목록
 */
export class GetCommentsQueriesDto {
  /**
   * 검색어
   * @example 윤석열
   */
  @IsString()
  @IsOptional()
  search?: string;

  /**
   * 댓글 페이지 번호
   * @example 0
   */
  @IsNumber()
  @IsOptional()
  pno: number = 0;

  /**
   * 댓글 한 페이지 크기
   * @example 10
   */
  @IsNumber()
  @IsOptional()
  psize?: number = 10;
}
