import { IsString, ValidateNested } from 'class-validator';

export class CreateKeywordDto {
  /**
   * 키워드 자체에 대한 정보(이름, 설명)
   */
  @ValidateNested()
  keyword: KeywordDto;
  @ValidateNested()
  history: KeywordHistoryDto;
}

class KeywordDto {
  /**
   * 키워드 명
   * @example 윤석열
   */
  @IsString()
  name: string;

  /**
   * 키워드에 대한 간략한 설명
   * @example 대한민국 제 20대 대통령
   */
  @IsString()
  description: string;
}

/**
 * 키워드 히스토리와 관련된 Dto ex) 키워드 작성 이유, 작성자 ID
 */
class KeywordHistoryDto {
  
}