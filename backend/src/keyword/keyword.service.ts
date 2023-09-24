import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Keyword } from './keyword.entity';

@Injectable()
export class KeywordService {
  constructor(@InjectRepository(Keyword) private repo: Repository<Keyword>) {}

  async create() {
    const keyword = await this.repo.create();
  }
}
