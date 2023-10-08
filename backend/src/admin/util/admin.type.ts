import { AdminUser } from '../admin.entity';

export interface IOutAdminUser extends Pick<AdminUser, 'id' | 'name'> {
  id: number;
  name: string;
}
