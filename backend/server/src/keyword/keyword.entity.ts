import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { KeywordHistory } from './keyword-history.entity';
import { AnalysisComment } from '../analysis-comment/entity/analysis-comment.entity';

/**
 * 데이터 수집 대상이 되는 키워드
 */
@Entity()
@Unique(['name'])
export class Keyword {
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * 키워드 이름
   */
  @Column()
  name: string;
  /**
   * 키워드에 대한 간단한 설명
   */
  @Column()
  description: string;
  /**
   * 키워드가 활성화 되었는지 여부. 초기 상태는 false
   */
  @Column()
  isActive: boolean;

  @OneToMany(() => KeywordHistory, (history) => history.keyword)
  histories?: KeywordHistory[];
  @OneToMany(() => AnalysisComment, (comment) => comment.keyword)
  comments?: AnalysisComment[];

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
