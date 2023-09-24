import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Keyword } from './keyword.entity';
import { AdminUser } from 'src/admin/admin.entity';

/**
 * 데이터 수집 대상이 되는 키워드
 */
@Entity()
export class KeywordHistory {
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * 해당 action에 대한 설명
   */
  @Column()
  description: string;

  /**
   * 키워드에 대해 수행한 동작 ex) 추가, 수정, 삭제 등
   */
  @Column()
  action: string;
  /**
   * 키워드 관련 동작 수행일
   */
  @CreateDateColumn()
  date: Date;

  /**
   * 키워드를 조작한 관리자
   */
  @Column()
  admin_id: number;
  @JoinColumn({ name: 'admin_id' })
  @ManyToOne(() => AdminUser, (admin) => admin.keyword_histories)
  admin: AdminUser;

  /**
   * 연관된 키워드
   */
  @Column()
  keyword_id: number;
  @JoinColumn({ name: 'keyword_id' })
  @ManyToOne(() => Keyword, (keyword) => keyword.histories)
  keyword: Keyword;
}
