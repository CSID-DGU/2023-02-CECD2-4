import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalysisComment } from './entity/analysis-comment.entity';
import { createCommentDto } from './dtos/create-comment.dto';
import { ArticleContent } from './entity/article-content.entity';
import { GetCommentsQueriesDto } from './dtos/get-comments-query.dto';
@Injectable()
export class AnalysisCommentService {
  constructor(
    @InjectRepository(AnalysisComment)
    private repo: Repository<AnalysisComment>,
  ) {}

  async create(dtos: createCommentDto): Promise<AnalysisComment> {
    const comment = this.repo.create();
    // const {news_sentences, .. other} = dtos;
    // Object.assign(comment, other);
    comment.createdAt = dtos.createdAt;
    comment.content = dtos.content;
    comment.sympathy = dtos.sympathy;
    comment.antipathy = dtos.antipathy;
    comment.link = dtos.link;
    comment.news_sentences = dtos.news_sentences.map(
      (it) => new ArticleContent(it.content, it.score),
    );

    return await this.repo.save(comment);
  }

  async findMany({ search, psize, head_id, from, to }: GetCommentsQueriesDto) {
    if (!search) return [];

    const qb = this.repo.createQueryBuilder();
    qb.select([
      'id',
      'createdAt',
      'content',
      'sympathy',
      'antipathy',
      'emotion',
      'link',
    ]).where(`keyword_id IN (SELECT id FROM keyword WHERE name = :name)`, {
      name: search,
    });
    // head 정보 있는 경우
    if (head_id) qb.andWhere('id < :head_id', { head_id });
    // 기간 정보 있는 경우
    if (from && to)
      qb.andWhere('createdAt BETWEEN :from AND :to', { from, to });

    return await qb.limit(psize).orderBy('id', 'DESC').getRawMany();
  }
}
