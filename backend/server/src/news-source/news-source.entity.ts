import {
  Column,
  Entity,
  CreateDateColumn,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * 뉴스 기사를 수집할 언론사. media_id 값을 이용하여 뉴스를 수집한다.
 */
@Entity()
@Unique(['media_id'])
export class NewsSource {
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * 언론사의 id 값. 네이버 뉴스 상세 검색 옵션 참고
   */
  @Column()
  media_id: string;
  /**
   * 언론사 이름
   */
  @Column()
  media_name: string;

  @CreateDateColumn()
  createdAt: Date;
}
