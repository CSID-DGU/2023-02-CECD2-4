import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Keyword } from '../keyword/keyword.entity';

@Entity()
export class DailyKeywordBigEmotionsCnt {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 키워드를 분석한 날짜
   */
  @Column()
  date: Date;

  @Column()
  positive_cnt: number;

  @Column()
  neutral_cnt: number;

  @Column()
  negative_cnt: number;

  @Column()
  keyword_id: number;

  @JoinColumn({ name: 'keyword_id' })
  @ManyToOne(() => Keyword, (keyword) => keyword.dkbe_cnts)
  keyword?: Keyword;
}
