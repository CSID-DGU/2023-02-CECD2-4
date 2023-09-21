import { Column } from 'typeorm';
/**
 * @description 분석된 댓글과 연관성 높은 상위 N개 문장 목록
 */
export class ArticleContent {
  /**
   * 문장 내용
   */
  @Column()
  content: string;

  /**
   * 댓글과 문장 사이의 연관도 점수(-1 ~ 1 사이)
   */
  @Column()
  score: number;

  constructor(content: string, score: number) {
    this.content = content;
    this.score = score;
  }
}
