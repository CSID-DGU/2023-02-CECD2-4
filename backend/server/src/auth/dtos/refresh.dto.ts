import { IsString } from 'class-validator';
import { AccessTokenDto } from './access-token.dto';

export class RefreshReqDto {
  @IsString()
  refresh_token: string;
}

export class RefreshResDto extends AccessTokenDto {}
