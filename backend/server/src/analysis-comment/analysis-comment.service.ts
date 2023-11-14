import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DataSource, FindOperator, Repository } from 'typeorm';
import { AnalysisComment } from './entity/analysis-comment.entity';
import { CreateCommentReqDto } from './dtos/create-comment.dto';
import { ArticleContent } from './entity/article-content.entity';
import { CommentsQueriesReqDto } from './dtos/get-comments-query.dto';

@Injectable()
export class AnalysisCommentService {
  constructor(
    @InjectRepository(AnalysisComment)
    private comment_repo: Repository<AnalysisComment>,
    @InjectRepository(ArticleContent)
    private article_repo: Repository<ArticleContent>,
    private dataSource: DataSource,
  ) {}

  async create(dtos: CreateCommentReqDto): Promise<AnalysisComment> {
    let comment = this.comment_repo.create();
    comment.createdAt = dtos.createdAt;
    comment.content = dtos.content;
    comment.sympathy = dtos.sympathy;
    comment.antipathy = dtos.antipathy;
    comment.emotion = dtos.emotion;
    comment.big_emotion = dtos.big_emotion;
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

  /**
   * id 기반으로 댓글을 검색한다. 연관 기사 문장과 함께 가져올지 지정할 수 있다.
   */
  async findOneById(id: number, isWithSentences = true) {
    return await this.comment_repo.findOne({
      where: {
        id: id,
      },
      relations: {
        news_sentences: isWithSentences,
      },
    });
  }

  /**
   * commment 정보를 이용하여 연관된 키워드 목록을 가져온다
   */
  async findManyByInfo(info: {
    keyword_id: number;
    emotion: string;
    count: number;
    from?: string;
    to?: string;
  }) {
    const { keyword_id, emotion, count, from, to } = info;
    let between: FindOperator<Date> | undefined;
    if (from && to) {
      between = Between(new Date(from), new Date(to));
    }

    await this.comment_repo.find({
      where: {
        keyword_id: keyword_id,
        emotion: emotion,
        createdAt: between,
      },
      order: {
        sympathy: {
          direction: 'DESC',
        },
      },
      take: count,
    });
  }

  async findManyWithQuery({
    search,
    psize,
    head_id,
    from,
    to,
  }: CommentsQueriesReqDto) {
    if (!search) return [];

    const qb = this.comment_repo.createQueryBuilder();
    qb.select([
      'id',
      'createdAt',
      'content',
      'sympathy',
      'antipathy',
      'emotion',
      'big_emotion',
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
      .select([
        'id',
        'createdAt',
        'content',
        'sympathy',
        'antipathy',
        'emotion',
        'big_emotion',
        'link',
      ])
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
    const data = await qb.getRawMany();
    return data.map((it) => {
      const comment = new AnalysisComment();
      Object.assign(comment, it);
      return comment;
    });
  }
}
