import { Expose } from 'class-transformer';

/**
 * 관리자 관련 정보 중 외부에 노출되는 요소
 */
export class OutAdminDto {
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
