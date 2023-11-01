import { Expose } from 'class-transformer';
import { Keyword } from '../../../keyword/keyword.entity';

export class OutKeywordDto
  implements Pick<Keyword, 'id' | 'name' | 'description'>
{
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
