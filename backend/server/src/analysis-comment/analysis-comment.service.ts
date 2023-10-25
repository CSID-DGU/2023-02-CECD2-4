import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AnalysisComment } from './entity/analysis-comment.entity';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { ArticleContent } from './entity/article-content.entity';
import { GetCommentsQueriesDto } from './dtos/get-comments-query.dto';
@Injectable()
export class AnalysisCommentService {
  constructor(
    @InjectRepository(AnalysisComment)
    private comment_repo: Repository<AnalysisComment>,
    @InjectRepository(ArticleContent)
    private article_repo: Repository<ArticleContent>,
    private dataSource: DataSource,
  ) {}

  async create(dtos: CreateCommentDto): Promise<AnalysisComment> {
    let comment = this.comment_repo.create();
    comment.createdAt = dtos.createdAt;
    comment.content = dtos.content;
    comment.sympathy = dtos.sympathy;
    comment.antipathy = dtos.antipathy;
    comment.emotion = dtos.emotion;
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
  /**
   * 기간 내 감정 별로 최대 공감수를 받은 댓글 목록을 반환한다.
   */
  async findTopSympathyCommentsForEachEmotion(
    keyword_id: number,
    from?: string,
    to?: string,
  ) {
    // 아래 쿼리에 대응된다.
    // select id,content,sympathy,antipathy,emotion
    // from ( select *,
    // ROW_NUMBER() OVER ( PARTITION BY emotion ORDER BY sympathy DESC ) AS ranking FROM analysis_comment ) temp
    // where ranking = 1;

    const qb = this.dataSource
      .createQueryBuilder()
      .select(['id', 'content', 'sympathy', 'antipathy', 'emotion'])
      .from((subQuery) => {
        subQuery
          .select('*')
          .addSelect(
            'ROW_NUMBER() OVER ( PARTITION BY emotion ORDER BY sympathy DESC )',
            'ranking',
          )
          .from(AnalysisComment, 'comments')
          .where('keyword_id = :kid', {
            kid: keyword_id,
          });
        if (from && to)
          subQuery.andWhere('createdAt BETWEEN :from AND :to', { from, to });
        return subQuery;
      }, 'temp')
      .where('ranking = 1');
    return await qb.getRawMany();
  }
}
