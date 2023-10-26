import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { KeywordService } from '../keyword/keyword.service';
import { Keyword } from '../keyword/keyword.entity';
import { Redis } from 'ioredis';
import { RedisToken } from '../redis/redis.provider';
import { AnalysisCommentService } from 'src/analysis-comment/analysis-comment.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SearchService {
  constructor(
    private config: ConfigService,
    private keywordService: KeywordService,
    private commentService: AnalysisCommentService,
    @Inject(RedisToken) private redisStore: Redis,
  ) {}

  /**
   * 인기 있는 키워드 목록을 반환한다. 메인 화면에서 사용됨.
   */
  async findManyPopularKeyword(count: number): Promise<Keyword[]> {
    const key = this.config.get('POPULAR_KEYWORDS_KEY');
    const keyword_ids = (await this.redisStore.zrevrange(key, 0, count)).map(
      (it) => parseInt(it),
    );

    if (keyword_ids.length === 0) return [];
    return await this.keywordService.findManyById(keyword_ids);
  }

  /**
   * 주어진 기간 내 감정 별로 추천 수 최대의 댓글들을 가져온다.
   */
  async getKeywordWithTopCommentsForEmotion(
    keyword_name: string,
    from?: string,
    to?: string,
  ) {
    const keyword = await this.keywordService.findOneByName(keyword_name);
    if (!keyword) throw new NotFoundException('keyword not found');
    // redis로 순위 따지기!
    const key = this.config.get('POPULAR_KEYWORDS_KEY');
    await this.redisStore.zincrby(key, 1, keyword.id);
    const comments =
      await this.commentService.findTopSympathyCommentsForEachEmotion(
        keyword.id,
        from,
        to,
      );
    const { id, name } = keyword;
    return {
      keyword: {
        id,
        name,
      },
      comments,
    };
  }
}
