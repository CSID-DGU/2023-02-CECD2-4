import { KeywordHistory } from 'src/keyword/keyword-history.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'ADMIN' })
@Unique(['login_id'])
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login_id: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => KeywordHistory, (history) => history.admin)
  keyword_histories: KeywordHistory[];
}
