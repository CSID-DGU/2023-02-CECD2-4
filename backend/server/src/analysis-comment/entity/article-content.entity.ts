import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnalysisComment } from './analysis-comment.entity';
/**
 * @description 분석된 댓글과 연관성 높은 상위 N개 문장 목록
 */
@Entity()
export class ArticleContent {
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * 문장 내용
   */
  @Column()
  content: string;

  /**
   * 댓글과 문장 사이의 연관도 점수(-1 ~ 1 사이)
   */
  @Column({ type: 'float' })
  score: number;

  /**
   * 댓글의 ID 값. 따로 지정 X
   */
  @Column()
  comment_id: number;

  @JoinColumn({ name: 'comment_id' })
  @ManyToOne(() => AnalysisComment, (comment) => comment.news_sentences)
  comment?: AnalysisComment;

  constructor(content: string, score: number) {
    this.content = content;
    this.score = score;
  }
}
