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
    private comment_repo: Repository<AnalysisComment>,
    @InjectRepository(ArticleContent)
    private article_repo: Repository<ArticleContent>,
  ) {}

  async create(dtos: createCommentDto): Promise<AnalysisComment> {
    let comment = this.comment_repo.create();
    comment.createdAt = dtos.createdAt;
    comment.content = dtos.content;
    comment.sympathy = dtos.sympathy;
    comment.antipathy = dtos.antipathy;
    comment.link = dtos.link;
    comment.keyword_id = dtos.keyword_id;

    comment = await this.comment_repo.save(comment);
    const sentences: Omit<ArticleContent, 'id'>[] = dtos.news_sentences.map(
      (it) => {
        return {
          comment_id: comment.id,
          score: it.score,
          content: it.content,
        };
      },
    );
    await this.article_repo.insert(sentences);

    return comment;
  }

  async findMany({ search, psize, head_id, from, to }: GetCommentsQueriesDto) {
    if (!search) return [];

    const qb = this.comment_repo.createQueryBuilder();
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
