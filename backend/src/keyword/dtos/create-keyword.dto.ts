import { IsString } from 'class-validator';

export class CreateKeywordDto {
  /**
   * 키워드 명
   * @example 윤석열
   */
  @IsString()
  name: string;

  /**
   * 키워드에 대한 간략한 설명
   * @example '대한민국 제 20대 대통령'
   */
  @IsString()
  description: string;

  /**
   * 현재 키워드를 추가하는 이유를 가볍게 작성
   * @example '현재 주목받고 있음'
   */
  @IsString()
  memo: string;
}
