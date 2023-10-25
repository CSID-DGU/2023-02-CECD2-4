import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ArticleContent } from './article-content.entity';
import { Keyword } from '../../keyword/keyword.entity';
/**
 * @description 분석된 댓글
 */
@Entity()
export class AnalysisComment {
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * 댓글 작성일. 댓글이 DB에 삽입된 시간 아님!
   */
  @Column()
  createdAt: Date;
  /**
   * 댓글 내용
   */
  @Column()
  content: string;
  /**
   * 댓글 공감 수
   */
  @Column()
  sympathy: number;
  /**
   * 댓글 비공감 수
   */
  @Column()
  antipathy: number;
  /**
   * 댓글이 작성된 뉴스 링크
   */
  @Column()
  link: string;
  /**
   * 댓글에 할당된 감정
   */
  @Column()
  emotion: string;

  @Column()
  keyword_id: number;

  @OneToMany(() => ArticleContent, (content) => content.comment)
  news_sentences: ArticleContent[];

  @JoinColumn({ name: 'keyword_id' })
  @ManyToOne(() => Keyword, (keyword) => keyword.comments)
  keyword: Keyword;
}
