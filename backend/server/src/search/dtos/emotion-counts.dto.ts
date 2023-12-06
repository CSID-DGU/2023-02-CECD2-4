import { IsDateString, IsNumber } from 'class-validator';

export class GetEmotionCountsReqDto {
  @IsNumber()
  keyword_id: number;
  @IsDateString()
  from: string;
  @IsDateString()
  to: string;
}
