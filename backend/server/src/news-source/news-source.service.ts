import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsSource } from './news-source.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsSourceService {
  constructor(
    @InjectRepository(NewsSource) private repo: Repository<NewsSource>,
  ) {}

  async create(media_id: string, media_name: string) {
    const newsMedia = this.repo.create();
    newsMedia.media_id = media_id;
    newsMedia.media_name = media_name;
    try {
      return await this.repo.save(newsMedia);
    } catch {
      throw new BadRequestException('media_id는 중복될 수 없습니다');
    }
  }

  async findMany() {
    return await this.repo.find();
  }

  async remove(id: number) {
    if (!id) return null;
    const newsMedia = await this.repo.findOneBy({ id: id });
    if (!newsMedia) return null;

    return await this.repo.remove(newsMedia);
  }
}
