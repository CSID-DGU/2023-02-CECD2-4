import { IsString, IsNumberString } from 'class-validator';

export class PostNewsSourceDto {
  /**
   * 언론사의 id 값. 문자열로 입력 받음.
   */
  @IsNumberString()
  media_id: string;
  /**
   * 언론사 이름
   */
  @IsString()
  media_name: string;
}
