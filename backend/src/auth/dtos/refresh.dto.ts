import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class RefreshReqDto {
  @IsString()
  refresh_token: string;
}

export class RefreshResDto {
  @Expose()
  access_token: string;

  @Expose()
  expiration_date: string;
}
