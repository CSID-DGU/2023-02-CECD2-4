import { AdminUser } from '../admin.entity';
/**
 * 외부로 노출될 수 있는 유저 타입
 */
export interface IOutAdminUser extends Pick<AdminUser, 'id' | 'name'> {
  id: number;
  name: string;
}
