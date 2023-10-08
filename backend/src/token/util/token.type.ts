import { IOutAdminUser } from '../../admin/util/admin.type';

export interface AccessTokenType {
  data: IOutAdminUser;
}

export interface RefreshTokenType {
  data: IOutAdminUser;
  refresh_key: string;
}
