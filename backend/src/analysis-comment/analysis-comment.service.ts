import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalysisComment } from './entity/analysis-comment.entity';
import { createCommentDto } from './dtos/create-comment.dto';
import { ArticleContent } from './entity/article-content.entity';
@Injectable()
export class AnalysisCommentService {
  constructor(
    @InjectRepository(AnalysisComment)
    private repo: Repository<AnalysisComment>,
  ) {}

  async create(dtos: createCommentDto) {
    const comment = this.repo.create();
    // const {news_sentences, .. other} = dtos;
    // Object.assign(comment, other);
    comment.createdAt = dtos.createdAt;
    comment.content = dtos.content;
    comment.sympathy = dtos.sympathy;
    comment.antipathy = dtos.antipathy;
    comment.news_link = dtos.news_link;
    comment.news_sentences = dtos.news_sentences.map(
      (it) => new ArticleContent(it.content, it.score),
    );

    return await this.repo.save(comment);
  }

  async findMany(search?: string, page?: number, size?: number) {
    // 없는 정보라면 무시
    if (!search) return [];
    return await this.repo.find({
      skip: page * size,
      take: size,
    });
  }
}
