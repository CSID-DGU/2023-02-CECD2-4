import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdminUser } from '../admin/admin.entity';

/**
 * 비밀번호 토큰을 관리하는 엔티티. 유저 정보에 직접 저장하기에는 유저와 관련 없는 부분이 있어 분리함.
 */
@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * 관리자 id
   */
  @Column()
  user_id: number;

  /**
   * refresh token에 사용되는 키. 현재 시스템은 refresh token을 각 유저별로 관리함.
   */
  @Column()
  refresh_key: string;

  /**
   * 토큰 만료일. 해당 날짜 이후에는 토큰 사용 불가능.
   */
  expiration_date: Date;

  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => AdminUser, (user) => user.token, {
    onDelete: 'CASCADE', //유저 삭제하면 토큰도 함께 삭제
  })
  user: AdminUser;
}
