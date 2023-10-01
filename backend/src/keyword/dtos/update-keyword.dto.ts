import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateKeywordDto {
  /**
   * 변경할 키워드의 id 값
   * @example 1
   */
  @IsNumber()
  id: number;
  /**
   * 키워드에 대한 간략한 설명
   * @example '대한민국 제 20대 대통령'
   */
  @IsString()
  description: string;

  /**
   * 키워드 활성화 여부. 키워드를 사용하려면 생성 후 활성화해야 함
   * @example true
   */
  @IsBoolean()
  isActive: boolean;

  /**
   * 현재 키워드를 변경하는 이유를 가볍게 작성
   * @example '묘사가 잘못되어 수정'
   */
  @IsString()
  memo: string;
}
