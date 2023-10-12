import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { TokenInfo } from '../token/tokeninfo/tokeninfo.entity';
import { KeywordHistory } from '../keyword/keyword-history.entity';

@Entity({ name: 'admin' })
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
  keyword_histories?: KeywordHistory[];

  @OneToOne(() => TokenInfo, (token) => token.user)
  token?: TokenInfo;
}
