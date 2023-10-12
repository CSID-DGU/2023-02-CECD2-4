import { Expose } from 'class-transformer';
import { IOutAdminUser } from '../../admin/util/admin.type';

/**
 * 관리자 관련 정보 중 외부에 노출되는 요소
 */
export class OutAdminDto implements IOutAdminUser {
  /**
   * 관리자 id
   */
  @Expose()
  id: number;

  /**
   * 관리자 이름
   */
  @Expose()
  name: string;
}
