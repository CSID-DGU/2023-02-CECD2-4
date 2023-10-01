import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Keyword } from './keyword.entity';
import { CreateKeywordDto } from './dtos/create-keyword.dto';
import { KeywordHistory } from './keyword-history.entity';
import { UpdateKeywordDto } from './dtos/update-keyword.dto';

@Injectable()
export class KeywordService {
  constructor(
    @InjectRepository(Keyword)
    private keywordRepo: Repository<Keyword>,
    @InjectRepository(KeywordHistory)
    private historyRepo: Repository<KeywordHistory>,
  ) {}
  /**
   * 키워드를 생성하는 동작
   * @param dto 키워드 생성과 관련된 정보를 담고 있는 dto
   * @param admin_id history에 삽입할 관리자 id
   */
  async create(
    { name, description, memo }: CreateKeywordDto,
    admin_id: number,
  ) {
    const keyword = this.keywordRepo.create();
    keyword.name = name;
    keyword.description = description;
    keyword.isActive = false;
    let result: Keyword;
    try {
      result = await this.keywordRepo.save(keyword);
    } catch {
      throw new BadRequestException(`cannot insert keyword name = ${name}`);
    }

    const history = this.historyRepo.create();
    history.action = 'CREATE';
    history.description = memo;
    history.admin_id = admin_id;
    history.keyword_id = result.id;
    await this.historyRepo.save(history);

    return result;
  }
  /**
   * 이름을 기반으로 키워드 검색
   */
  async findByName(name: string) {
    return await this.keywordRepo.findOne({
      where: {
        name: name,
      },
    });
  }

  /**
   * 키워드 목록 검색
   */
  async findMany() {
    return await this.keywordRepo.find();
  }

  async update(
    { id, description, isActive, memo }: UpdateKeywordDto,
    admin_id: number,
  ) {
    const keyword = await this.keywordRepo.findOneBy({ id });
    if (!keyword) throw new NotFoundException(`cannot find keyword id = ${id}`);
    // 키워드 정보 갱신
    keyword.description = description;
    keyword.isActive = isActive;

    // 키워드 히스토리 생성
    const history = this.historyRepo.create();
    history.action = 'UPDATE';
    history.description = memo;
    history.admin_id = admin_id;
    history.keyword_id = id;
    await this.historyRepo.save(history);

    // 키워드 반환
    return await this.keywordRepo.save(keyword);
  }
}
