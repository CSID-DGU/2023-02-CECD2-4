import { IsDate, IsNumber } from 'class-validator';

export class GetdkbeCountReqDto {
  /**
   * 갯수를 가져 올 키워드의 id 값
   * @example 1
   */
  @IsNumber()
  keyword_id: number;

  /**
   * 개수 정보를 가져오는 시작일
   * @example: '2020-01-01'
   */
  @IsDate()
  from: Date;

  /**
   * 개수 정보를 가져오는 끝일
   * @example '2024-01-01'
   */
  @IsDate()
  to: Date;
}
