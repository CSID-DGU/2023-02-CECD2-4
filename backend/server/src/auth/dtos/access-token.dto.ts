import { Expose } from 'class-transformer';

export class AccessTokenDto {
  @Expose()
  access_token: string;

  @Expose()
  expiration_date: string;
}
