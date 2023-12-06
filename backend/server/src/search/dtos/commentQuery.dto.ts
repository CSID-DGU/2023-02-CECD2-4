import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCommentQueryReqDto {
  @IsNumber()
  keyword_id: number;

  @IsString()
  @IsOptional()
  emotion?: string;

  @IsNumber()
  count: number;

  @IsDateString()
  @IsOptional()
  from?: string;

  @IsDateString()
  @IsOptional()
  to?: string;
}
